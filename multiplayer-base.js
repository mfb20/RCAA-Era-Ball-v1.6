/* RCAA ERA BALL v1.6 multiplayer
 * Supabase-backed anonymous lobbies for 1v1 and four-player fantasy.
 */
const REB_SUPABASE_URL = "https://jvvkmzxoqjvtmqcthghg.supabase.co";
const REB_SUPABASE_KEY = "sb_publishable_99tyJDRfgr9YLahsmILzQw_zDNKNtHu";
const MP_CHEMISTRY_CAP = 3;

const mpState = {
  client: null,
  user: null,
  lobby: null,
  members: [],
  duelPicks: [],
  fantasyPicks: [],
  catalog: [],
  channel: null,
  refreshTimer: null,
  submittingDuel: false,
  loading: false,
};

const mp = Object.fromEntries([
  "onlinePage", "onlineReturnButton", "onlineConnect", "onlineAuthStatus", "onlineConnectionDot",
  "onlineDisplayName", "onlineTeamName", "onlineLobbyName", "hostDuelButton", "hostFantasyButton",
  "onlineJoinCode", "joinLobbyButton", "onlineError", "onlineRoom", "onlineRoomMode", "onlineRoomName",
  "onlineRoomStatus", "onlineLobbyCode", "copyLobbyCodeButton", "onlinePlayerStrip", "onlineStartButton",
  "onlineResetButton", "onlineLeaveButton", "duelRoom", "duelRoundLabel", "duelRoundStatus", "duelRollMeta",
  "duelRollPlayers", "duelRosters", "duelResult", "onlineFantasyRoom", "onlineFantasyStatus",
  "onlineFantasyRound", "onlineFantasyPick", "onlineFantasySearch", "onlineFantasyBoard", "onlineFantasyRosters",
  "onlineFantasyLog", "onlineFantasySimButton", "onlineFantasyResults",
].map((id) => [id, document.querySelector(`#${id}`)]));

function mpEscape(value) {
  return typeof escapeHtml === "function" ? escapeHtml(value ?? "") : String(value ?? "").replace(/[&<>"']/g, "");
}

function mpSetError(message = "") {
  if (!mp.onlineError) return;
  mp.onlineError.hidden = !message;
  mp.onlineError.textContent = message;
}

function mpRememberIdentity() {
  try {
    localStorage.setItem("reb-mp-display-name", mp.onlineDisplayName.value.trim());
    localStorage.setItem("reb-mp-team-name", mp.onlineTeamName.value.trim());
  } catch {}
}

function mpLoadIdentity() {
  try {
    mp.onlineDisplayName.value = localStorage.getItem("reb-mp-display-name") || "";
    mp.onlineTeamName.value = localStorage.getItem("reb-mp-team-name") || "";
  } catch {}
}

function mpIdentity() {
  const displayName = mp.onlineDisplayName.value.trim();
  const teamName = mp.onlineTeamName.value.trim();
  if (!displayName) throw new Error("Enter a display name first.");
  if (!teamName) throw new Error("Enter a team name first.");
  mpRememberIdentity();
  return { displayName, teamName };
}

async function mpEnsureAuth() {
  if (mpState.user) return mpState.user;
  if (!window.supabase?.createClient) throw new Error("Supabase failed to load. Refresh and try again.");
  if (!mpState.client) {
    mpState.client = window.supabase.createClient(REB_SUPABASE_URL, REB_SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  const { data: sessionData } = await mpState.client.auth.getSession();
  let user = sessionData?.session?.user || null;
  if (!user) {
    const { data, error } = await mpState.client.auth.signInAnonymously();
    if (error) throw error;
    user = data.user;
  }
  mpState.user = user;
  mp.onlineAuthStatus.textContent = "RCAA ONLINE CONNECTED · GUEST PLAY";
  mp.onlineConnectionDot.classList.add("connected");
  return user;
}

async function openMultiplayerMode() {
  elements.homePage.hidden = true;
  elements.game.hidden = true;
  elements.fantasyPage.hidden = true;
  elements.sandboxPage.hidden = true;
  elements.achievementsPage.hidden = true;
  mp.onlinePage.hidden = false;
  elements.modeSwitch.hidden = false;
  elements.gameViewButton.classList.remove("active");
  elements.achievementsViewButton.classList.remove("active");
  state.currentView = "online";
  document.body.classList.remove("nightmare-mode", "fantasy-mode", "sandbox-mode");
  document.body.classList.add("online-mode");
  syncModeNav();
  mpLoadIdentity();
  mpSetError();
  if (!mpState.lobby) {
    mp.onlineConnect.hidden = false;
    mp.onlineRoom.hidden = true;
  }
  try { await mpEnsureAuth(); }
  catch (error) {
    mp.onlineAuthStatus.textContent = "RCAA ONLINE CONNECTION FAILED";
    mp.onlineConnectionDot.classList.remove("connected");
    mpSetError(error.message || "Could not connect to multiplayer.");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.openMultiplayerMode = openMultiplayerMode;

function mpNormalizeCard(raw) {
  if (!raw) return null;
  return {
    ...raw,
    key: raw.key || raw.id || raw.card_key,
    id: raw.id || raw.key || raw.card_key,
    teamCode: raw.teamCode || raw.team_code || "",
    teamName: raw.teamName || raw.team_name || raw.teamCode || raw.team_code || "",
    teamColor: raw.teamColor || raw.team_color || "#6d8ce8",
    season: Number(raw.season),
    offense: raw.offense || { rating: 0, position: "WR" },
    offenseAlternates: raw.offenseAlternates || [],
    defense: raw.defense || { rating: 0, position: "CB" },
    traits: raw.traits || {},
    championship: Boolean(raw.championship ?? raw.champion),
    image: raw.image || "",
    adp: Number(raw.adp ?? ((Number(raw.offense?.rating || 0) + Number(raw.defense?.rating || 0)) / 2)),
  };
}

function mpChemistry(players) {
  let bonus = 0;
  const links = [];
  for (let i = 0; i < players.length; i += 1) {
    for (let j = i + 1; j < players.length; j += 1) {
      const first = players[i];
      const second = players[j];
      if (!first.teamCode || first.teamCode !== second.teamCode) continue;
      const value = first.season === second.season ? 1 : 0.5;
      bonus += value;
      links.push(`${first.name} + ${second.name} +${value.toFixed(1)}`);
    }
  }
  return { bonus: Math.min(MP_CHEMISTRY_CAP, Math.round(bonus * 10) / 10), links };
}

function mpLineupSummary(metrics) {
  const serialize = (entry) => ({
    playerId: entry.player.key || entry.player.id,
    name: entry.player.name,
    position: entry.position,
    naturalPosition: entry.naturalPosition,
    rating: entry.rating,
    fit: entry.fit,
    multiplier: entry.multiplier,
  });
  return { offense: metrics.offense.map(serialize), defense: metrics.defense.map(serialize) };
}

function mpEvaluateFour(players, { duel = false } = {}) {
  const normalized = players.map(mpNormalizeCard).filter(Boolean);
  const metrics = metricsForPlayers(normalized);
  const chemistry = mpChemistry(normalized);
  const sideAwardImpact = ((metrics.opoyPlayers * OPOY_SIM_BOOST) + (metrics.dpoyPlayers * DPOY_SIM_BOOST)) / 2;
  const clutchImpact = duel ? playoffTraitBoost(metrics) * 10 : 0;
  const effectiveOvr = metrics.overall === null ? null : Math.min(99, Math.round((metrics.overall + chemistry.bonus + sideAwardImpact + clutchImpact) * 10) / 10);
  const simStrength = ((metrics.offenseSimRating + metrics.defenseSimRating) / 2) + chemistry.bonus;
  return { players: normalized, metrics, chemistry, effectiveOvr, simStrength, lineup: mpLineupSummary(metrics) };
}

function mpBestStartingFour(roster) {
  const normalized = roster.map(mpNormalizeCard).filter(Boolean);
  if (normalized.length < 4) return null;
  let best = null;
  combinationsOf(normalized, 4).forEach((group) => {
    const evald = mpEvaluateFour(group);
    const quality = (evald.effectiveOvr || 0) * 100 + evald.simStrength;
    if (!best || quality > best.quality) best = { ...evald, quality };
  });
  return best;
}

function mpTraits(card) {
  const tags = [];
  if (card.championship) tags.push("★");
  if (card.traits?.mvp) tags.push("MVP");
  if (card.traits?.opoy) tags.push("OPOY");
  if (card.traits?.dpoy) tags.push("DPOY");
  if (card.traits?.sbMvp) tags.push("SB MVP");
  return tags.join(" · ");
}

function mpCardImage(card) {
  if (card.image) return card.image;
  try {
    const seasonEntry = SEASONS.find((entry) => entry.number === card.season);
    const teamEntry = seasonEntry?.teams.find((entry) => entry.code === card.teamCode);
    const candidate = teamEntry?.players.find((entry) => entry.name === card.name);
    if (seasonEntry && teamEntry && candidate) return getPlayerDetails(candidate, seasonEntry, teamEntry)?.image || "";
  } catch {}
  return "";
}

async function mpHost(mode) {
  mpSetError();
  try {
    await mpEnsureAuth();
    const { displayName, teamName } = mpIdentity();
    const lobbyName = mp.onlineLobbyName.value.trim() || `${displayName}'s Lobby`;
    const { data, error } = await mpState.client.rpc("create_reb_lobby", {
      p_name: lobbyName,
      p_mode: mode,
      p_display_name: displayName,
      p_team_name: teamName,
    });
    if (error) throw error;
    await mpEnterLobby(data);
  } catch (error) { mpSetError(error.message || "Could not create lobby."); }
}

async function mpJoin() {
  mpSetError();
  try {
    await mpEnsureAuth();
    const { displayName, teamName } = mpIdentity();
    const code = mp.onlineJoinCode.value.trim().toUpperCase();
    if (code.length !== 6) throw new Error("Enter the six-character lobby code.");
    const { data: lobby, error: findError } = await mpState.client.from("lobbies").select("id,status").eq("code", code).maybeSingle();
    if (findError) throw findError;
    if (!lobby) throw new Error("Lobby code not found.");
    const { data, error } = await mpState.client.rpc("join_reb_lobby", {
      p_lobby_id: lobby.id,
      p_display_name: displayName,
      p_team_name: teamName,
    });
    if (error) throw error;
    await mpEnterLobby(data);
  } catch (error) { mpSetError(error.message || "Could not join lobby."); }
}

async function mpEnterLobby(lobbyId) {
  mpState.lobby = { id: lobbyId };
  mp.onlineConnect.hidden = true;
  mp.onlineRoom.hidden = false;
  await mpSubscribe(lobbyId);
  await mpRefresh();
}

async function mpSubscribe(lobbyId) {
  if (mpState.channel) await mpState.client.removeChannel(mpState.channel);
  mpState.channel = mpState.client.channel(`reb-lobby-${lobbyId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "lobbies", filter: `id=eq.${lobbyId}` }, () => mpRefresh())
    .on("postgres_changes", { event: "*", schema: "public", table: "lobby_players", filter: `lobby_id=eq.${lobbyId}` }, () => mpRefresh())
    .on("postgres_changes", { event: "*", schema: "public", table: "duel_picks", filter: `lobby_id=eq.${lobbyId}` }, () => mpRefresh())
    .on("postgres_changes", { event: "*", schema: "public", table: "fantasy_picks", filter: `lobby_id=eq.${lobbyId}` }, () => mpRefresh())
    .subscribe();
  clearInterval(mpState.refreshTimer);
  mpState.refreshTimer = setInterval(() => { if (state.currentView === "online" && mpState.lobby) mpRefresh(); }, 3500);
}

async function mpRefresh() {
  if (!mpState.client || !mpState.lobby?.id || mpState.loading) return;
  mpState.loading = true;
  try {
    const lobbyId = mpState.lobby.id;
    const [lobbyRes, memberRes] = await Promise.all([
      mpState.client.from("lobbies").select("*").eq("id", lobbyId).maybeSingle(),
      mpState.client.from("lobby_players").select("*").eq("lobby_id", lobbyId).order("seat"),
    ]);
    if (lobbyRes.error) throw lobbyRes.error;
    if (!lobbyRes.data) { await mpLeaveLocal(); return; }
    if (memberRes.error) throw memberRes.error;
    mpState.lobby = lobbyRes.data;
    mpState.members = memberRes.data || [];
    if (mpState.lobby.mode === "duel") {
      const { data, error } = await mpState.client.from("duel_picks").select("*").eq("lobby_id", lobbyId).order("round_number");
      if (error) throw error;
      mpState.duelPicks = data || [];
    } else {
      const { data, error } = await mpState.client.from("fantasy_picks").select("*").eq("lobby_id", lobbyId).order("pick_number");
      if (error) throw error;
      mpState.fantasyPicks = data || [];
      if (!mpState.catalog.length) await mpLoadCatalog();
    }
    mpRenderRoom();
  } catch (error) {
    console.error(error);
    mpSetError(error.message || "Multiplayer sync failed.");
  } finally { mpState.loading = false; }
}

async function mpLoadCatalog() {
  // The live draft board is built from the exact same 220-card catalog as single-player.
  // Supabase remains authoritative when a pick is committed, but this prevents stale
  // backend rows from ever appearing as draftable cards in the UI.
  mpState.catalog = buildFantasyPlayerPool().map((candidate, index) => {
    const seasonEntry = SEASONS.find((entry) => entry.number === candidate.season);
    const teamEntry = seasonEntry?.teams.find((entry) => entry.code === candidate.teamCode);
    const sourcePlayer = teamEntry?.players.find((entry) => entry.name === candidate.name);
    const details = seasonEntry && teamEntry && sourcePlayer ? getPlayerDetails(sourcePlayer, seasonEntry, teamEntry) : {};
    return mpNormalizeCard({
      ...candidate,
      id: candidate.key,
      key: candidate.key,
      adp: candidate.fantasyRating,
      image: details?.image || "",
      bio: details?.bio || "",
      teamColor: teamEntry?.color || "#6d8ce8",
      draftRank: index + 1,
    });
  });
}

function mpCurrentMember() { return mpState.members.find((member) => member.user_id === mpState.user?.id); }
function mpIsHost() { return mpState.lobby?.host_id === mpState.user?.id; }

function mpRenderRoom() {
  const lobby = mpState.lobby;
  if (!lobby) return;
  mp.onlineRoomMode.textContent = lobby.mode === "duel" ? "ONLINE · 1v1 ROSTER BATTLE" : "ONLINE · 4-PLAYER FANTASY";
  mp.onlineRoomName.textContent = lobby.name;
  mp.onlineLobbyCode.textContent = lobby.code;
  mp.onlineRoomStatus.textContent = mpStatusText(lobby);
  mp.onlinePlayerStrip.innerHTML = mpState.members.map((member) => {
    const host = member.user_id === lobby.host_id;
    const you = member.user_id === mpState.user?.id;
    return `<article class="online-player-chip${you ? " you" : ""}"><span>#${member.seat}</span><div><strong>${mpEscape(member.display_name)}${you ? " · YOU" : ""}</strong><small>${mpEscape(member.team_name)}</small></div>${host ? '<b>HOST</b>' : ""}</article>`;
  }).join("");
  const full = mpState.members.length === lobby.max_players;
  mp.onlineStartButton.hidden = !(mpIsHost() && lobby.status === "waiting");
  mp.onlineStartButton.disabled = !full;
  mp.onlineStartButton.textContent = full ? (lobby.mode === "duel" ? "START 1v1" : "START 7-ROUND DRAFT") : `WAITING ${mpState.members.length} / ${lobby.max_players}`;
  mp.onlineResetButton.hidden = !(mpIsHost() && lobby.status === "complete");
  mp.duelRoom.hidden = lobby.mode !== "duel" || lobby.status === "waiting";
  mp.onlineFantasyRoom.hidden = lobby.mode !== "fantasy" || lobby.status === "waiting";
  if (lobby.mode === "duel" && lobby.status !== "waiting") mpRenderDuel();
  if (lobby.mode === "fantasy" && lobby.status !== "waiting") mpRenderOnlineFantasy();
}

function mpStatusText(lobby) {
  if (lobby.status === "waiting") return `WAITING FOR PLAYERS · ${mpState.members.length} / ${lobby.max_players}`;
  if (lobby.status === "drafting") return lobby.mode === "duel" ? `ROUND ${lobby.current_round} OF 4` : `LIVE SNAKE DRAFT · PICK ${lobby.current_pick + 1} OF 28`;
  if (lobby.status === "lineup") return lobby.mode === "duel" ? "FINAL TEAMS CALCULATING" : "DRAFT COMPLETE · HOST CAN SIMULATE";
  if (lobby.status === "complete") return "MATCH COMPLETE";
  return lobby.status.toUpperCase();
}

async function mpStartLobby() {
  try {
    mp.onlineStartButton.disabled = true;
    const { error } = await mpState.client.rpc("start_reb_lobby", { p_lobby_id: mpState.lobby.id });
    if (error) throw error;
    await mpRefresh();
  } catch (error) { mpSetError(error.message); }
}

async function mpMakeDuelPick(cardKey) {
  try {
    mpSetError();
    mp.duelRollPlayers.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    const { error } = await mpState.client.rpc("make_duel_pick", { p_lobby_id: mpState.lobby.id, p_card_key: cardKey });
    if (error) throw error;
    await mpRefresh();
  } catch (error) { mpSetError(error.message || "Pick failed."); await mpRefresh(); }
}

function mpRenderDuel() {
  const lobby = mpState.lobby;
  const me = mpCurrentMember();
  mp.duelRoundLabel.textContent = `${Math.max(1, lobby.current_round)} / 4`;
  const pickedThisRound = mpState.duelPicks.some((pick) => pick.user_id === mpState.user?.id && pick.round_number === lobby.current_round);
  if (lobby.status === "drafting") {
    mp.duelRoundStatus.textContent = pickedThisRound
      ? "Your pick is locked. Waiting for the other player before the next roster is revealed."
      : "Both players have different random rosters. Pick one player; the round advances only when both players finish.";
    const roll = (me?.current_roll || []).map(mpNormalizeCard);
    if (roll.length) {
      mp.duelRollMeta.textContent = `S${roll[0].season} · ${roll[0].teamCode} · ${roll[0].teamName}`;
      mp.duelRollPlayers.innerHTML = roll.map((card) => {
        const image = mpCardImage(card);
        return `<button type="button" class="duel-player-card" data-card-key="${mpEscape(card.key)}"><span class="duel-avatar">${image ? `<img src="${mpEscape(image)}" alt="">` : mpEscape(initials(card.name))}</span><span><strong>${mpEscape(card.name)}</strong><small>${card.offense.rating} ${mpEscape(card.offense.position)} · ${card.defense.rating} ${mpEscape(card.defense.position)}</small><em>${mpEscape(mpTraits(card) || "NO AWARD TRAIT")}</em></span><b>PICK</b></button>`;
      }).join("");
      mp.duelRollPlayers.querySelectorAll("button[data-card-key]").forEach((button) => button.addEventListener("click", () => mpMakeDuelPick(button.dataset.cardKey)));
    } else {
      mp.duelRollMeta.textContent = pickedThisRound ? "PICK LOCKED" : "SYNCING ROSTER";
      mp.duelRollPlayers.innerHTML = `<div class="online-waiting">${pickedThisRound ? "Waiting for opponent…" : "Loading your unique roster…"}</div>`;
    }
  } else {
    mp.duelRollMeta.textContent = "ALL FOUR PICKS COMPLETE";
    mp.duelRollPlayers.innerHTML = '<div class="online-waiting">Final lineups use the same position-fit and award rules as the main game.</div>';
  }
  mp.duelRosters.innerHTML = mpState.members.map((member) => mpDuelRosterMarkup(member)).join("");
  if (lobby.status === "lineup" && me && !me.ready && !mpState.submittingDuel) mpSubmitDuelTeam();
  if (lobby.status === "complete") mpRenderDuelResult();
  else mp.duelResult.hidden = true;
}

function mpDuelRosterMarkup(member) {
  const roster = (member.roster || []).map(mpNormalizeCard);
  const evald = roster.length === 4 ? mpEvaluateFour(roster, { duel: true }) : null;
  const picks = Array.from({ length: 4 }, (_, index) => {
    const card = roster[index];
    if (!card) return `<li><span>${index + 1}</span><strong>WAITING</strong><small>ROUND ${index + 1}</small></li>`;
    return `<li><span>${index + 1}</span><strong>${mpEscape(card.name)}</strong><small>S${card.season} ${mpEscape(card.teamCode)} · ${card.offense.rating}/${card.defense.rating}</small></li>`;
  }).join("");
  return `<article class="duel-roster-card${member.user_id === mpState.user?.id ? " you" : ""}"><header><div><span>SEAT ${member.seat}</span><h3>${mpEscape(member.team_name)}</h3></div><strong>${evald ? evald.effectiveOvr.toFixed(1) : "—"}<small>OVR</small></strong></header><ol>${picks}</ol>${evald ? `<p>CHEM +${evald.chemistry.bonus.toFixed(1)} · ${evald.metrics.mvpPlayers} MVP · ${evald.metrics.opoyPlayers} OPOY · ${evald.metrics.dpoyPlayers} DPOY</p>` : ""}</article>`;
}

async function mpSubmitDuelTeam() {
  const me = mpCurrentMember();
  const roster = (me?.roster || []).map(mpNormalizeCard);
  if (roster.length !== 4) return;
  mpState.submittingDuel = true;
  try {
    const evald = mpEvaluateFour(roster, { duel: true });
    const { error } = await mpState.client.rpc("submit_duel_team", {
      p_lobby_id: mpState.lobby.id,
      p_lineup: evald.lineup,
      p_team_ovr: evald.effectiveOvr,
      p_chemistry: evald.chemistry.bonus,
    });
    if (error) throw error;
  } catch (error) { mpSetError(error.message || "Could not finalize your 1v1 team."); }
  finally { mpState.submittingDuel = false; setTimeout(mpRefresh, 250); }
}

function mpRenderDuelResult() {
  const winner = mpState.members.find((member) => member.user_id === mpState.lobby.winner_id);
  const youWon = winner?.user_id === mpState.user?.id;
  mp.duelResult.hidden = false;
  mp.duelResult.innerHTML = `<p class="eyebrow">FINAL 1v1 RESULT</p><h2>${youWon ? "YOU WIN" : `${mpEscape(winner?.display_name || "PLAYER")} WINS`}</h2><p>Higher final OVR wins. Position fit, same-team chemistry, MVP/OPOY/DPOY bonuses, Championship traits, and SB MVP clutch value are included.</p><div class="duel-final-scores">${mpState.members.map((member) => `<span><small>${mpEscape(member.team_name)}</small><strong>${Number(member.team_ovr || 0).toFixed(1)}</strong><em>CHEM +${Number(member.chemistry || 0).toFixed(1)}</em></span>`).join("")}</div>`;
}

function mpFantasyExpectedUser() {
  const lobby = mpState.lobby;
  if (!lobby || lobby.status !== "drafting" || !Array.isArray(lobby.draft_order) || lobby.draft_order.length !== 4) return null;
  const round = Math.floor(lobby.current_pick / 4);
  const offset = lobby.current_pick % 4;
  const index = round % 2 === 0 ? offset : 3 - offset;
  return lobby.draft_order[index];
}

function mpFantasyRosterFor(userId) {
  return mpState.fantasyPicks.filter((pick) => pick.user_id === userId).sort((a, b) => a.pick_number - b.pick_number).map((pick) => mpNormalizeCard(pick.player_snapshot));
}

function mpRenderOnlineFantasy() {
  const lobby = mpState.lobby;
  const complete = lobby.status === "complete";
  const drafting = lobby.status === "drafting";
  const expected = mpFantasyExpectedUser();
  const round = drafting ? Math.floor(lobby.current_pick / 4) + 1 : 7;
  mp.onlineFantasyRound.textContent = `ROUND ${round} / 7`;
  mp.onlineFantasyPick.textContent = drafting ? `PICK ${lobby.current_pick + 1} / 28` : "DRAFT COMPLETE";
  const expectedMember = mpState.members.find((member) => member.user_id === expected);
  mp.onlineFantasyStatus.textContent = drafting
    ? expected === mpState.user?.id ? "YOU'RE ON THE CLOCK" : `${expectedMember?.display_name || "PLAYER"} IS ON THE CLOCK`
    : complete ? "SEASON COMPLETE" : "DRAFT COMPLETE · WAITING FOR HOST";
  mpRenderOnlineFantasyBoard();
  mpRenderOnlineFantasyRosters();
  mpRenderOnlineFantasyLog();
  mp.onlineFantasySimButton.hidden = !(mpIsHost() && lobby.status === "lineup");
  mp.onlineFantasySimButton.disabled = false;
  if (complete) mpRenderOnlineFantasyResults();
  else mp.onlineFantasyResults.hidden = true;
}

function mpRenderOnlineFantasyBoard() {
  const lobby = mpState.lobby;
  const expected = mpFantasyExpectedUser();
  const yourTurn = lobby.status === "drafting" && expected === mpState.user?.id;
  const drafted = new Set(mpState.fantasyPicks.map((pick) => pick.card_key));
  const query = mp.onlineFantasySearch.value.trim().toLowerCase();
  const available = mpState.catalog.filter((card) => !drafted.has(card.key) && (!query || `${card.name} ${card.teamName} ${card.teamCode} season ${card.season}`.toLowerCase().includes(query)));
  mp.onlineFantasyBoard.innerHTML = available.map((card) => {
    const image = mpCardImage(card);
    return `<button class="fantasy-player-row" type="button" data-card-key="${mpEscape(card.key)}" ${yourTurn ? "" : "disabled"}><span class="fantasy-adp">#${card.draftRank}</span><span class="fantasy-avatar">${image ? `<img src="${mpEscape(image)}" alt="" loading="lazy">` : mpEscape(initials(card.name))}</span><span class="fantasy-player-main"><strong>${mpEscape(card.name)}</strong><small>S${card.season} ${mpEscape(card.teamCode)} · ${mpEscape(card.teamName)}</small></span><span class="fantasy-rating"><strong>${card.adp.toFixed(1)}</strong><small>ADP OVR</small></span><span class="fantasy-side-rating"><strong>${card.offense.rating}</strong><small>${mpEscape(card.offense.position)}</small></span><span class="fantasy-side-rating"><strong>${card.defense.rating}</strong><small>${mpEscape(card.defense.position)}</small></span></button>`;
  }).join("") || '<div class="fantasy-empty">No available players match that search.</div>';
  mp.onlineFantasyBoard.querySelectorAll("button[data-card-key]").forEach((button) => button.addEventListener("click", () => mpMakeFantasyPick(button.dataset.cardKey)));
}

async function mpMakeFantasyPick(cardKey) {
  try {
    mpSetError();
    mp.onlineFantasyBoard.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    const card = mpState.catalog.find((entry) => entry.key === cardKey);
    if (!card) throw new Error("That player is no longer available.");
    const snapshot = {
      id: card.key, key: card.key, adp: card.adp, name: card.name, image: card.image || "", bio: card.bio || "",
      season: card.season, teamCode: card.teamCode, teamName: card.teamName, teamColor: card.teamColor || "#6d8ce8",
      championship: Boolean(card.championship), champion: Boolean(card.championship), traits: card.traits || {},
      offense: card.offense, offenseAlternates: card.offenseAlternates || [], defense: card.defense,
    };
    const { error } = await mpState.client.rpc("make_fantasy_pick", {
      p_lobby_id: mpState.lobby.id,
      p_card_key: cardKey,
      p_player_snapshot: snapshot,
    });
    if (error) throw error;
    await mpRefresh();
  } catch (error) { mpSetError(error.message || "Fantasy pick failed."); await mpRefresh(); }
}

function mpRenderOnlineFantasyRosters() {
  mp.onlineFantasyRosters.innerHTML = mpState.members.map((member) => {
    const roster = mpFantasyRosterFor(member.user_id);
    const best = mpBestStartingFour(roster);
    const starterKeys = new Set(best?.players.map((card) => card.key) || []);
    const lines = Array.from({ length: 7 }, (_, index) => {
      const card = roster[index];
      if (!card) return `<li class="empty"><span>${index + 1}</span><strong>OPEN</strong><small>—</small></li>`;
      return `<li${starterKeys.has(card.key) ? ' class="starter"' : ""}><span>${index + 1}</span><strong>${mpEscape(card.name)}</strong><small>S${card.season} ${mpEscape(card.teamCode)} · ${card.adp.toFixed(1)}</small></li>`;
    }).join("");
    return `<section class="fantasy-roster-card${member.user_id === mpState.user?.id ? " user" : ""}"><header><div><span>SEAT ${member.seat}</span><h3>${mpEscape(member.team_name)}</h3></div><strong>${best ? best.effectiveOvr.toFixed(1) : "—"}<small>OVR</small></strong></header><ol>${lines}</ol>${best ? `<p class="mp-roster-bonus">CHEM +${best.chemistry.bonus.toFixed(1)} · FIT + AWARDS ACTIVE</p>` : ""}</section>`;
  }).join("");
}

function mpRenderOnlineFantasyLog() {
  mp.onlineFantasyLog.innerHTML = [...mpState.fantasyPicks].reverse().map((pick) => {
    const member = mpState.members.find((entry) => entry.user_id === pick.user_id);
    const card = mpNormalizeCard(pick.player_snapshot);
    return `<div class="fantasy-log-row"><span>${pick.pick_number}</span><strong>${mpEscape(member?.team_name || "TEAM")}</strong><b>${mpEscape(card.name)}</b><small>S${card.season} ${mpEscape(card.teamCode)} · ${card.adp.toFixed(1)}</small></div>`;
  }).join("") || '<div class="fantasy-empty">The live draft log will appear here.</div>';
}

function mpFantasyTeamObjects() {
  return mpState.members.map((member) => {
    const roster = mpFantasyRosterFor(member.user_id);
    const best = mpBestStartingFour(roster);
    return { userId: member.user_id, seat: member.seat, name: member.display_name, teamName: member.team_name, roster, best };
  });
}

function mpFantasyGame(teamA, teamB, label, playoff = false) {
  const a = teamA.best; const b = teamB.best;
  const boostA = playoff ? playoffTraitBoost(a.metrics) * 18 : 0;
  const boostB = playoff ? playoffTraitBoost(b.metrics) * 18 : 0;
  const strengthA = a.simStrength + boostA;
  const strengthB = b.simStrength + boostB;
  const chanceA = clamp(0.5 + (strengthA - strengthB) * 0.028, 0.08, 0.92);
  const aWon = Math.random() < chanceA;
  let scoreA = clamp(Math.round(39 + (a.metrics.offenseSimRating + a.chemistry.bonus - b.metrics.defenseSimRating) * 1.25 + randomNormal() * 10), 10, 84);
  let scoreB = clamp(Math.round(39 + (b.metrics.offenseSimRating + b.chemistry.bonus - a.metrics.defenseSimRating) * 1.25 + randomNormal() * 10), 10, 84);
  if (aWon && scoreA <= scoreB) {
    if (scoreB >= 78) { scoreA = 84; scoreB = Math.min(scoreB, 77); }
    else scoreA = Math.min(84, scoreB + randomItem([3, 4, 6, 7, 10]));
  }
  if (!aWon && scoreB <= scoreA) {
    if (scoreA >= 78) { scoreB = 84; scoreA = Math.min(scoreA, 77); }
    else scoreB = Math.min(84, scoreA + randomItem([3, 4, 6, 7, 10]));
  }
  return { label, teamA: teamA.userId, teamB: teamB.userId, scoreA, scoreB, winner: aWon ? teamA.userId : teamB.userId };
}

async function mpSimFantasySeason() {
  try {
    const teams = mpFantasyTeamObjects();
    if (teams.length !== 4 || teams.some((team) => team.roster.length !== 7 || !team.best)) throw new Error("All four seven-player rosters must be complete.");
    mp.onlineFantasySimButton.disabled = true;
    mp.onlineFantasySimButton.textContent = "SIMULATING…";
    const games = [];
    for (let first = 0; first < teams.length; first += 1) {
      for (let second = first + 1; second < teams.length; second += 1) {
        games.push(mpFantasyGame(teams[first], teams[second], "Regular Season"));
        games.push(mpFantasyGame(teams[second], teams[first], "Regular Season"));
      }
    }
    const standings = teams.map((team) => ({ userId: team.userId, teamName: team.teamName, displayName: team.name, wins: 0, losses: 0, pf: 0, pa: 0, diff: 0, ovr: team.best.effectiveOvr, chemistry: team.best.chemistry.bonus }));
    const row = (id) => standings.find((entry) => entry.userId === id);
    games.forEach((game) => {
      const a = row(game.teamA); const b = row(game.teamB);
      a.pf += game.scoreA; a.pa += game.scoreB; b.pf += game.scoreB; b.pa += game.scoreA;
      if (game.winner === game.teamA) { a.wins += 1; b.losses += 1; } else { b.wins += 1; a.losses += 1; }
    });
    standings.forEach((entry) => { entry.diff = entry.pf - entry.pa; });
    standings.sort((a, b) => b.wins - a.wins || b.diff - a.diff || b.pf - a.pf || a.teamName.localeCompare(b.teamName));
    standings.forEach((entry, index) => { entry.seed = index + 1; });
    const byId = (id) => teams.find((team) => team.userId === id);
    const semifinal = mpFantasyGame(byId(standings[1].userId), byId(standings[2].userId), "Semifinal", true);
    const bowl = mpFantasyGame(byId(standings[0].userId), byId(semifinal.winner), "RCAA Bowl", true);
    const results = { version: "1.6", games, standings, semifinal, bowl, winnerId: bowl.winner, generatedAt: new Date().toISOString(), rules: { chemistry: "same historical team +1.0; same team code across seasons +0.5; max +3.0", fit: true, awards: true } };
    const { error } = await mpState.client.rpc("finish_fantasy_season", { p_lobby_id: mpState.lobby.id, p_results: results, p_winner_id: bowl.winner });
    if (error) throw error;
    await mpRefresh();
  } catch (error) {
    mpSetError(error.message || "Could not simulate fantasy season.");
    mp.onlineFantasySimButton.disabled = false;
    mp.onlineFantasySimButton.textContent = "HOST: SIMULATE SEASON";
  }
}

function mpRenderOnlineFantasyResults() {
  const results = mpState.lobby.season_results;
  if (!results) return;
  const member = (id) => mpState.members.find((entry) => entry.user_id === id);
  const winner = member(results.winnerId || mpState.lobby.winner_id);
  mp.onlineFantasyResults.hidden = false;
  mp.onlineFantasyResults.innerHTML = `<div class="fantasy-season-title"><p class="eyebrow">MULTIPLAYER FANTASY RESULTS</p><h2>${mpEscape(winner?.team_name || "CHAMPION")}</h2><p>${mpEscape(winner?.display_name || "Player")} wins the RCAA fantasy season.</p></div><div class="fantasy-result-card"><h3>FINAL STANDINGS</h3><div class="fantasy-standings"><table class="fantasy-standings-table"><thead><tr><th>SEED</th><th>TEAM</th><th>W-L</th><th>PF</th><th>PA</th><th>DIFF</th><th>OVR</th><th>CHEM</th></tr></thead><tbody>${results.standings.map((entry) => `<tr><td>${entry.seed}</td><td>${mpEscape(entry.teamName)}</td><td>${entry.wins}-${entry.losses}</td><td>${entry.pf}</td><td>${entry.pa}</td><td>${entry.diff >= 0 ? "+" : ""}${entry.diff}</td><td>${Number(entry.ovr).toFixed(1)}</td><td>+${Number(entry.chemistry).toFixed(1)}</td></tr>`).join("")}</tbody></table></div></div><div class="fantasy-result-grid"><div class="fantasy-result-card"><h3>12-GAME SCHEDULE</h3>${results.games.map((game, index) => `<div class="fantasy-game-row"><span>GAME ${index + 1}</span><strong>${mpEscape(member(game.teamA)?.team_name || "TEAM")} ${game.scoreA}–${game.scoreB} ${mpEscape(member(game.teamB)?.team_name || "TEAM")}</strong></div>`).join("")}</div><div class="fantasy-result-card"><h3>PLAYOFFS</h3><div class="fantasy-playoff-card"><span>SEMIFINAL · #2 vs #3</span><strong>${mpEscape(member(results.semifinal.teamA)?.team_name || "TEAM")} ${results.semifinal.scoreA}–${results.semifinal.scoreB} ${mpEscape(member(results.semifinal.teamB)?.team_name || "TEAM")}</strong></div><div class="fantasy-playoff-card bowl"><span>RCAA BOWL</span><strong>${mpEscape(member(results.bowl.teamA)?.team_name || "TEAM")} ${results.bowl.scoreA}–${results.bowl.scoreB} ${mpEscape(member(results.bowl.teamB)?.team_name || "TEAM")}</strong></div></div></div>`;
}

async function mpResetLobby() {
  try {
    const { error } = await mpState.client.rpc("reset_reb_lobby", { p_lobby_id: mpState.lobby.id });
    if (error) throw error;
    await mpRefresh();
  } catch (error) { mpSetError(error.message); }
}

async function mpLeaveLobby() {
  try {
    if (mpState.client && mpState.lobby?.id) await mpState.client.rpc("leave_reb_lobby", { p_lobby_id: mpState.lobby.id });
  } catch {}
  await mpLeaveLocal();
}

async function mpLeaveLocal() {
  clearInterval(mpState.refreshTimer);
  mpState.refreshTimer = null;
  if (mpState.channel && mpState.client) await mpState.client.removeChannel(mpState.channel);
  mpState.channel = null;
  mpState.lobby = null;
  mpState.members = [];
  mpState.duelPicks = [];
  mpState.fantasyPicks = [];
  mp.onlineRoom.hidden = true;
  mp.onlineConnect.hidden = false;
}

mp.hostDuelButton?.addEventListener("click", () => mpHost("duel"));
mp.hostFantasyButton?.addEventListener("click", () => mpHost("fantasy"));
mp.joinLobbyButton?.addEventListener("click", mpJoin);
mp.onlineJoinCode?.addEventListener("input", () => { mp.onlineJoinCode.value = mp.onlineJoinCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6); });
mp.onlineStartButton?.addEventListener("click", mpStartLobby);
mp.onlineResetButton?.addEventListener("click", mpResetLobby);
mp.onlineLeaveButton?.addEventListener("click", mpLeaveLobby);
mp.onlineReturnButton?.addEventListener("click", showHome);
mp.onlineFantasySearch?.addEventListener("input", mpRenderOnlineFantasyBoard);
mp.onlineFantasySimButton?.addEventListener("click", mpSimFantasySeason);
mp.copyLobbyCodeButton?.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(mpState.lobby?.code || ""); mp.copyLobbyCodeButton.textContent = "COPIED"; setTimeout(() => { mp.copyLobbyCodeButton.textContent = "COPY"; }, 1200); } catch {}
});
