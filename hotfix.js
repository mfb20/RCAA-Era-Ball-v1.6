"use strict";
(() => {
  const HARD_EXCLUSIONS = new Set(["6-CJSU", "10-LEP", "2-KYS", "4-OB"]);
  function findVersion(seasonNumber, teamCode, playerName) {
    const seasonEntry = SEASONS.find((entry) => entry.number === seasonNumber);
    const teamEntry = seasonEntry?.teams.find((entry) => entry.code === teamCode);
    return teamEntry?.players.find((entry) => entry.name.toLowerCase() === playerName.toLowerCase()) || null;
  }
  function patchRating(seasonNumber, teamCode, playerName, side, rating) {
    const candidate = findVersion(seasonNumber, teamCode, playerName);
    if (candidate?.[side]) candidate[side].rating = rating;
  }
  patchRating(1, "KYS", "Summrs", "defense", 97);
  patchRating(4, "OB", "Perko", "offense", 97);
  patchRating(3, "YBT", "Blonde", "defense", 93);
  patchRating(6, "CJSU", "CJ", "offense", 98);

  calculateMetrics = function patchedCalculateMetrics(offense, defense, players) {
    const offenseStarters = offense.filter((entry) => entry.position !== "BENCH");
    const defenseStarters = defense.filter((entry) => entry.position !== "BENCH");
    const offenseAverage = averageRatings(offenseStarters);
    const defenseAverage = averageRatings(defenseStarters);
    const rawOverall = offenseStarters.length === 4 && defenseStarters.length === 4 ? Math.round((offenseAverage + defenseAverage) / 2) : null;
    const mvpPlayers = players.filter((candidate) => candidate.traits?.mvp).length;
    const mvpBonus = mvpPlayers * MVP_TEAM_OVR_BOOST;
    const opoyPlayers = offenseStarters.filter((entry) => entry.player.traits?.opoy).length;
    const dpoyPlayers = defenseStarters.filter((entry) => entry.player.traits?.dpoy).length;
    return {
      offense, defense, offenseStarters, defenseStarters, offenseAverage, defenseAverage, rawOverall,
      mvpPlayers, mvpBonus, opoyPlayers, dpoyPlayers,
      overall: rawOverall === null ? null : rawOverall + mvpBonus,
      offenseSimRating: offenseAverage + mvpBonus + opoyPlayers * OPOY_SIM_BOOST,
      defenseSimRating: defenseAverage + mvpBonus + dpoyPlayers * DPOY_SIM_BOOST,
      championshipPlayers: players.filter((candidate) => candidate.championship).length,
      sbMvpPlayers: players.filter((candidate) => candidate.traits?.sbMvp).length,
    };
  };

  if (typeof mpEvaluateFour === "function") {
    mpEvaluateFour = function patchedMpEvaluateFour(players, { duel = false } = {}) {
      const normalized = players.map(mpNormalizeCard).filter(Boolean);
      const metrics = metricsForPlayers(normalized);
      const chemistry = mpChemistry(normalized);
      const sideAwardImpact = ((metrics.opoyPlayers * OPOY_SIM_BOOST) + (metrics.dpoyPlayers * DPOY_SIM_BOOST)) / 2;
      const clutchImpact = duel ? playoffTraitBoost(metrics) * 10 : 0;
      const effectiveOvr = metrics.overall === null ? null : Math.round((metrics.overall + chemistry.bonus + sideAwardImpact + clutchImpact) * 10) / 10;
      const simStrength = ((metrics.offenseSimRating + metrics.defenseSimRating) / 2) + chemistry.bonus;
      return { players: normalized, metrics, chemistry, effectiveOvr, simStrength, lineup: mpLineupSummary(metrics) };
    };
  }

  HISTORIC_TEAMS = buildHistoricTeamPool();
  TEAM_GOAT = buildTeamGoat();

  function buildSpecialTeam(id, name, keys) {
    const playerMap = new Map(allHistoricalPlayerInstances().map((candidate) => [candidate.key, candidate]));
    const players = keys.map((key) => playerMap.get(key)).filter(Boolean);
    if (players.length !== keys.length) throw new Error(`Missing Nightmare player for ${name}`);
    const metrics = metricsForPlayers(players);
    return {
      id, season: null, code: id, name, champion: false, players, metrics,
      overall: metrics.overall,
      simOverall: (metrics.offenseSimRating + metrics.defenseSimRating) / 2,
      category: "nightmare",
      buffed: true,
    };
  }

  const NIGHTMARE_WILDCARD = buildSpecialTeam("NIGHTMARE-WC", "NIGHTMARE WILD CARD", ["10-lep-sawoo", "5-naa-kuhdd", "8-rlu-kacper", "6-cjsu-perko"]);
  const NIGHTMARE_FINAL = buildSpecialTeam("NIGHTMARE-FINAL", "NIGHTMARE FINAL BOSS", ["2-kys-kanyuri", "3-ybt-blonde", "1-kys-summrs", "4-ob-perko"]);

  const playerTwoWayAverage = (candidate) => (candidate.offense.rating + candidate.defense.rating) / 2;
  teamAllowedInMode = function patchedTeamAllowedInMode(seasonEntry, teamEntry) {
    if (state.mode === "hard") return !HARD_EXCLUSIONS.has(`${seasonEntry.number}-${teamEntry.code}`);
    if (state.mode !== "nightmare") return true;
    if (teamEntry.champion) return false;
    return teamEntry.players.every((candidate) => playerTwoWayAverage(candidate) <= 95);
  };

  teamRerollChoices = function patchedTeamRerollChoices(result = state.currentResult) {
    if (!result || ["hard", "nightmare"].includes(state.mode)) return [];
    const seasonEntry = SEASONS.find((entry) => entry.number === result.season.number);
    if (!seasonEntry) return [];
    return seasonEntry.teams.filter((teamEntry) => teamEntry.code !== result.team.code && teamAllowedInMode(seasonEntry, teamEntry) && teamHasAvailablePlayer(seasonEntry, teamEntry));
  };

  const originalSpin = spin;
  spin = async function patchedSpin(options = {}) {
    if ((options.isReroll || options.isTeamReroll) && ["hard", "nightmare"].includes(state.mode)) return;
    await originalSpin(options);
    if (state.currentResult && ["hard", "nightmare"].includes(state.mode)) {
      const label = state.mode === "hard" ? "Hard" : "Nightmare";
      elements.statusLine.textContent = `Season ${state.currentResult.season.number} ${state.currentResult.team.name} is on the board. ${label} Mode: no rerolls.`;
    }
  };

  updateActionButtons = function patchedUpdateActionButtons() {
    elements.spinButton.disabled = state.spinning || state.complete || Boolean(state.currentResult);
    const noRerolls = ["hard", "nightmare"].includes(state.mode);
    elements.rerollButton.disabled = noRerolls || state.spinning || state.complete || !state.currentResult || state.rerollUsed;
    elements.rerollCount.textContent = noRerolls ? "OFF" : state.rerollUsed ? "USED" : "1 / 1";
    elements.teamRerollButton.disabled = noRerolls || state.spinning || state.complete || !state.currentResult || state.teamRerollUsed || !teamRerollChoices().length;
    elements.teamRerollCount.textContent = noRerolls ? "OFF" : state.teamRerollUsed ? "USED" : !state.currentResult ? "1 / 1" : teamRerollChoices().length ? "1 / 1" : "N/A";
    [elements.classicModeButton, elements.iqModeButton, elements.benchModeButton, elements.hardModeButton, elements.nightmareModeButton, elements.fantasyModeButton, elements.onlineModeButton, elements.sandboxModeButton].filter(Boolean).forEach((button) => { button.disabled = false; });
  };

  syncModeNav = function patchedSyncModeNav() {
    elements.classicModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "classic");
    elements.iqModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "iq");
    elements.benchModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "bench");
    elements.hardModeButton?.classList.toggle("active", state.currentView === "game" && state.mode === "hard");
    elements.nightmareModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "nightmare");
    elements.fantasyModeButton.classList.toggle("active", state.currentView === "fantasy");
    elements.onlineModeButton.classList.toggle("active", state.currentView === "online");
    elements.sandboxModeButton.classList.toggle("active", state.currentView === "sandbox");
  };

  const originalSetMode = setMode;
  setMode = function patchedSetMode(mode, options = {}) {
    const result = originalSetMode(mode, options);
    if (!result) return result;
    document.body.classList.toggle("hard-mode", mode === "hard");
    if (mode === "hard") {
      elements.gameModeEyebrow.textContent = "HARD MODE";
      elements.statusLine.textContent = "No rerolls. Elite roll teams are removed. TEAM GOAT waits in the Bowl.";
    } else if (mode === "nightmare") {
      elements.gameModeEyebrow.textContent = "NIGHTMARE MODE";
      elements.statusLine.textContent = "No rerolls. No champions or 96+ two-way players can appear in your rolls. Six Legendary teams await.";
    }
    syncModeNav();
    updateActionButtons();
    return result;
  };

  playGame = function patchedPlayGame(metrics, opponent, extraWinChance, label) {
    const baseOpponentStrength = typeof opponent === "number" ? opponent : (opponent?.simOverall ?? opponent?.overall ?? 88);
    const opponentDisplayOverall = typeof opponent === "number" ? opponent : (opponent?.overall ?? baseOpponentStrength);
    const opponentName = typeof opponent === "number" ? "RCAA Opponent" : opponent?.name || "RCAA Opponent";
    const opponentSeason = typeof opponent === "number" ? null : opponent?.season ?? null;
    const opponentCode = typeof opponent === "number" ? "" : opponent?.code || "";
    const opponentCategory = typeof opponent === "number" ? "" : opponent?.category || "";
    const opponentPlayers = typeof opponent === "number" ? [] : (opponent?.players || []).map((candidate) => ({ name: candidate.name, season: candidate.season, teamCode: candidate.teamCode }));
    const opponentPlayoffBoost = typeof opponent === "number" || !opponent?.metrics || !/Semifinal|Wild Card|Bowl/i.test(label) ? 0 : playoffTraitBoost(opponent.metrics);
    const simOverall = (metrics.offenseSimRating + metrics.defenseSimRating) / 2;
    const chance = clamp(0.5 + (simOverall - baseOpponentStrength) * 0.027 + extraWinChance - opponentPlayoffBoost, 0.03, 0.96);
    const won = Math.random() < chance;
    const offenseEdge = metrics.offenseSimRating - baseOpponentStrength;
    const defenseEdge = metrics.defenseSimRating - baseOpponentStrength;
    const attempts = clamp(Math.round(45 + randomNormal() * 7), 28, 66);
    const completionPct = clamp(Math.round(50 + offenseEdge * 0.38 + randomNormal() * 5.5), 40, 63);
    const completions = clamp(Math.round(attempts * completionPct / 100), 12, attempts);
    const yards = clamp(Math.round(550 + offenseEdge * 7 + randomNormal() * 105), 250, 900);
    let touchdowns = clamp(Math.round(5.4 + offenseEdge * 0.1 + randomNormal() * 1.55), 0, 10);
    const interceptions = clamp(Math.round(2.4 - offenseEdge * 0.055 + randomNormal() * 1.05), 0, 7);
    const sacksTaken = clamp(Math.round(2 - offenseEdge * 0.035 + randomNormal() * 0.9), 0, 6);
    const qbEntry = metrics.offenseStarters.find((entry) => entry.position === "QB");
    const receiverEntries = metrics.offenseStarters.filter((entry) => entry.position === "WR");
    const defense = distributeDefense(metrics.defenseStarters, defenseEdge);
    let teamScore = touchdowns * 7;
    let opponentScore = clamp(Math.round(39 + (baseOpponentStrength - metrics.defenseSimRating) * 1.5 + randomNormal() * 11), 10, 84);
    if (won && teamScore <= opponentScore) {
      teamScore = Math.ceil((opponentScore + 1) / 7) * 7;
      touchdowns = teamScore / 7;
    }
    if (!won && teamScore >= opponentScore) opponentScore = teamScore + randomItem([3, 4, 7, 10]);
    const receivers = distributeReceiving(receiverEntries, attempts, completions, yards, touchdowns);
    return {
      label, won, opponentOverall: Math.round(opponentDisplayOverall), opponentSimOverall: Math.round(baseOpponentStrength), opponentName, opponentSeason, opponentCode, opponentCategory, opponentPlayers,
      opponentBuffed: Boolean(opponent?.buffed || opponent?.metrics?.mvpBonus || opponent?.metrics?.opoyPlayers || opponent?.metrics?.dpoyPlayers || opponentPlayoffBoost),
      opponentPlayoffBoost, chance, teamScore, opponentScore,
      qb: { key: qbEntry.player.key, name: qbEntry.player.name, completions, attempts, yards, td: touchdowns, int: interceptions, sacks: sacksTaken },
      receivers, defense,
    };
  };

  renderPlayoffGame = function patchedRenderPlayoffGame(container, label, game) {
    container.className = `playoff-game ${game.won ? "win" : "loss"}`;
    const opponent = game.opponentName ? `${escapeHtml(game.opponentName)}${game.opponentSeason ? ` · S${game.opponentSeason} ${escapeHtml(game.opponentCode)}` : ""}${game.opponentCategory ? ` · ${game.opponentCategory.toUpperCase()}` : ""}` : `vs ${game.opponentOverall} OVR`;
    const roster = ["goat", "nightmare"].includes(game.opponentCategory) && game.opponentPlayers?.length ? ` · ${game.opponentPlayers.map((candidate) => escapeHtml(candidate.name)).join(" / ")}` : "";
    container.innerHTML = `<span>${label}</span><strong>${game.won ? "WIN" : "LOSS"} · ${game.teamScore}–${game.opponentScore}</strong><small>${opponent} · ${game.opponentOverall} OVR${game.opponentBuffed ? " · BUFFED" : ""}${roster} · ${game.qb.yards} YDS · ${game.qb.td} TD · ${game.qb.int} INT</small>`;
  };

  const originalRenderSeasonResults = renderSeasonResults;
  renderSeasonResults = function patchedRenderSeasonResults(results) {
    originalRenderSeasonResults(results);
    elements.regularSeasonGames.querySelectorAll(".season-game").forEach((gameElement, index) => {
      const game = results.regularSeason[index];
      const small = gameElement.querySelector("small");
      if (small && game?.opponentBuffed && !small.textContent.includes("BUFFED")) small.textContent = `${small.textContent} · BUFFED`;
    });
    if (state.mode === "nightmare" && results.seed) {
      elements.seasonStanding.textContent = `${results.wins}–${results.losses} · #${results.seed} SEED · NIGHTMARE GAUNTLET`;
      renderPlayoffGame(elements.semifinalGame, "NIGHTMARE WILD CARD", results.semifinal);
      if (results.bowl) renderPlayoffGame(elements.championshipGame, "RCAA BOWL", results.bowl);
      else renderLockedGame(elements.championshipGame, "RCAA BOWL", "DID NOT ADVANCE", "The nightmare gauntlet ends here");
    }
  };

  ACHIEVEMENTS.splice(0, ACHIEVEMENTS.length,
    { id: "championship", icon: "🏆", name: "Winner", description: "Win a championship." },
    { id: "missed_playoffs", icon: "🛋️", name: "Loser", description: "Miss the playoffs." },
    { id: "zero_six", icon: "0–6", name: "How the hell?", description: "Go 0–6." },
    { id: "won_playoff", icon: "🔥", name: "Taste of victory", description: "Win a playoff game." },
    { id: "team_90", icon: "90", name: "Team Builder", description: "Build a 90 overall team." },
    { id: "team_95", icon: "95", name: "Superteam builder", description: "Build a 95 overall team." },
    { id: "team_99", icon: "99", name: "Dynasty Builder", description: "Build a 99 overall team." },
    { id: "player_99", icon: "🐐", name: "Goat finder", description: "Collect a 99 overall player at any position." },
    { id: "lucky", icon: "🍀", name: "Lucky?", description: "Win a championship in any mode with a team below 82 overall." },
    { id: "standard_perfect", icon: "6–0", name: "Perfect", description: "Go 6–0 and win the Bowl in Standard Mode." },
    { id: "perfect_team", icon: "★", name: "Prodigy of the game", description: "Build the best possible team." },
    { id: "hard_championship", icon: "⚔", name: "Insane", description: "Win a championship on Hard Mode." },
    { id: "hard_legend", icon: "✦", name: "Legendary", description: "Go 6–0 and win a championship on Hard Mode.", legendary: true },
    { id: "nightmare_championship", icon: "☠", name: "No more nightmares", description: "Win a championship on Nightmare Mode." },
    { id: "nightmare_legend", icon: "🌙", name: "Dreamer", description: "Go 6–0 and win a championship on Nightmare Mode. Hardest achievement in the game.", legendary: true }
  );

  evaluateDraftAchievements = function patchedEvaluateDraftAchievements() {
    if (!state.complete) return;
    const metrics = getTeamMetrics();
    if (metrics.overall >= 90) unlockAchievement("team_90");
    if (metrics.overall >= 95) unlockAchievement("team_95");
    if (metrics.overall >= 99) unlockAchievement("team_99");
    if (state.drafted.some((candidate) => Math.max(candidate.offense.rating, candidate.defense.rating) === 99)) unlockAchievement("player_99");
    const perfect = calculatePerfectTeam();
    if (perfect && isPerfectBuild(metrics, perfect)) unlockAchievement("perfect_team");
  };

  simulateSeason = function patchedSimulateSeason() {
    if (!state.complete || state.seasonResults) return;
    const metrics = getTeamMetrics();
    let opponents;
    if (state.mode === "nightmare") opponents = sampleHistoricTeams("legendary", 6);
    else {
      const badTeams = sampleHistoricTeams("bad", 2);
      const okTeams = sampleHistoricTeams("ok", 2, badTeams.map((entry) => entry.id));
      const goodTeams = sampleHistoricTeams("good", 2, [...badTeams, ...okTeams].map((entry) => entry.id));
      opponents = shuffleArray([...badTeams, ...okTeams, ...goodTeams]);
    }
    const regularSeason = opponents.map((opponent, index) => playGame(metrics, opponent, 0, `Week ${index + 1}`));
    const wins = regularSeason.filter((game) => game.won).length;
    const seed = seedForWins(wins);
    let semifinal = null;
    let bowl = null;
    let title = "MISSED THE PLAYOFFS";
    const playoffBoost = playoffTraitBoost(metrics);
    const regularOpponentIds = opponents.map((entry) => entry.id);
    if (wins === 0) unlockAchievement("zero_six");
    if (!seed) unlockAchievement("missed_playoffs");
    else if (state.mode === "nightmare") {
      semifinal = playGame(metrics, NIGHTMARE_WILDCARD, playoffBoost, "Nightmare Wild Card");
      if (semifinal.won) {
        unlockAchievement("won_playoff");
        bowl = playGame(metrics, NIGHTMARE_FINAL, playoffBoost, "RCAA Bowl");
        if (bowl.won) unlockAchievement("won_playoff");
        title = bowl.won ? "RCAA CHAMPIONS" : "NIGHTMARE ENDS IN THE BOWL";
      } else title = "NIGHTMARE WILD CARD EXIT";
    } else if (seed === 1) {
      const bowlOpponent = state.mode === "hard" ? TEAM_GOAT : sampleHistoricTeams("legendary", 1, regularOpponentIds)[0];
      bowl = playGame(metrics, bowlOpponent, playoffBoost, "RCAA Bowl");
      if (bowl.won) unlockAchievement("won_playoff");
      title = bowl.won ? "RCAA CHAMPIONS" : "SEASON ENDS IN THE BOWL";
    } else {
      const semifinalOpponent = sampleHistoricTeams("good", 1, regularOpponentIds)[0];
      semifinal = playGame(metrics, semifinalOpponent, playoffBoost, "Semifinal");
      if (semifinal.won) {
        unlockAchievement("won_playoff");
        const bowlOpponent = state.mode === "hard" ? TEAM_GOAT : sampleHistoricTeams("legendary", 1, [...regularOpponentIds, semifinalOpponent?.id].filter(Boolean))[0];
        bowl = playGame(metrics, bowlOpponent, playoffBoost, "RCAA Bowl");
        if (bowl.won) unlockAchievement("won_playoff");
        title = bowl.won ? "RCAA CHAMPIONS" : "SEASON ENDS IN THE BOWL";
      } else title = "SEMIFINAL EXIT";
    }
    const champion = Boolean(bowl?.won);
    if (champion) {
      unlockAchievement("championship");
      if (metrics.overall < 82) unlockAchievement("lucky");
      if (state.mode === "classic" && wins === 6) unlockAchievement("standard_perfect");
      if (state.mode === "hard") {
        unlockAchievement("hard_championship");
        if (wins === 6) unlockAchievement("hard_legend");
      }
      if (state.mode === "nightmare") {
        unlockAchievement("nightmare_championship");
        if (wins === 6) unlockAchievement("nightmare_legend");
      }
    }
    const playoffGames = [semifinal, bowl].filter(Boolean);
    const stats = aggregateSeasonStats(regularSeason, playoffGames, metrics, wins, champion);
    state.seasonResults = { regularSeason, wins, losses: 6 - wins, seed, semifinal, bowl, champion, title, stats };
    state.selectedSlot = null;
    renderRoster();
    renderSeasonResults(state.seasonResults);
    elements.finishTitle.textContent = title;
    elements.finishGrade.textContent = champion ? "🏆" : getGrade(metrics.overall);
    elements.startSeasonButton.textContent = "VIEW SEASON RESULTS";
  };

  function installHardModeUi() {
    if (!document.getElementById("hardModeButton")) {
      const hardButton = document.createElement("button");
      hardButton.id = "hardModeButton";
      hardButton.className = "hard-mode-button";
      hardButton.type = "button";
      hardButton.innerHTML = "<strong>HARD</strong>";
      elements.nightmareModeButton.before(hardButton);
      elements.hardModeButton = hardButton;
      hardButton.addEventListener("click", () => switchModeFromNav("hard"));
    }
    if (!document.querySelector('[data-enter-mode="hard"]')) {
      const nightmareCard = document.querySelector('[data-enter-mode="nightmare"]');
      if (nightmareCard) {
        const hardCard = document.createElement("button");
        hardCard.className = "mode-card hard-card";
        hardCard.type = "button";
        hardCard.dataset.enterMode = "hard";
        hardCard.innerHTML = '<span class="mode-kicker">OLD NIGHTMARE RULES</span><h3>HARD</h3><p>No rerolls, elite roll teams removed, and TEAM GOAT waits in the Bowl.</p><strong>PLAY HARD →</strong>';
        nightmareCard.before(hardCard);
        nightmareCard.querySelector(".mode-kicker").textContent = "THE ULTIMATE GAUNTLET";
        nightmareCard.querySelector("p").textContent = "No championship teams or 96+ two-way player rolls. Face six Legendary teams, then a custom Wild Card and Final Boss.";
        nightmareCard.querySelector("strong").textContent = "ENTER NIGHTMARE →";
      }
    }
    const gameModeFact = [...document.querySelectorAll(".home-score-strip span")].find((span) => span.textContent.includes("GAME MODES"));
    if (gameModeFact) gameModeFact.innerHTML = "<strong>8</strong> GAME MODES";
    const count = document.getElementById("achievementCount");
    if (count) count.textContent = `${ACHIEVEMENTS.filter((entry) => state.achievements[entry.id]).length} / ${ACHIEVEMENTS.length}`;
    const dialogBody = elements.rulesDialog?.querySelector(".dialog-body");
    if (dialogBody) dialogBody.innerHTML = `<p class="eyebrow">THE FORMAT</p><h2>EIGHT WAYS TO BUILD. ONE RCAA BOWL.</h2><ol><li><strong>Standard:</strong> four random team rolls.</li><li><strong>RCAA IQ:</strong> ratings hidden until draft.</li><li><strong>Bench:</strong> five rolls, four starters.</li><li><strong>Fantasy:</strong> four-team seven-round snake draft.</li><li><strong>Multiplayer:</strong> synchronized 1v1 or fantasy lobbies.</li><li><strong>Sandbox:</strong> choose any four historical versions.</li><li><strong>Hard:</strong> old Nightmare rules — no rerolls, elite rolls removed, TEAM GOAT in the Bowl.</li><li><strong>Nightmare:</strong> no rerolls, no championship-team rolls, no roll with a player above 95 two-way average, six Legendary opponents, then the Nightmare Wild Card and Final Boss.</li></ol><div class="rules-callout">MVP/OPOY/DPOY and playoff traits apply to user and simulated teams. Buffs can push displayed overall above 100.</div><p class="data-note">Nightmare Wild Card: S10 Sawoo, S5 Kuhdd, S8 Kacper (SKW), S6 Perko. Final Boss: S2 KanYuri, S3 Blonde, S1 Summrs, S4 Perko.</p>`;
    if (!document.getElementById("v16QuickFixStyles")) {
      const style = document.createElement("style");
      style.id = "v16QuickFixStyles";
      style.textContent = `.top-mode-nav .hard-mode-button{color:#d97706}.top-mode-nav .hard-mode-button.active{background:#d97706;color:#fff}.hard-card{border-color:#f6c98f;background:linear-gradient(155deg,#fff,#fff7ed)}.hard-card .mode-kicker,.hard-card>strong{color:#d97706}.hard-card h3{color:#b45309}body.hard-mode .spin-button{background:#d97706;box-shadow:0 8px 18px rgba(217,119,6,.18)}body.hard-mode .eyebrow,body.hard-mode h1 em{color:#d97706}body.hard-mode .status-line{background:#fff7ed;color:#9a4d08}body.hard-mode .era-chip.active{background:#d97706;border-color:#d97706}html[data-theme="dark"] .hard-card{background:linear-gradient(155deg,#0a100d,#241b10);border-color:#6b4b1f}`;
      document.head.appendChild(style);
    }
  }

  installHardModeUi();
  renderAchievements();
  syncModeNav();
  updateActionButtons();

  const oldSimButton = elements.simulateSeasonButton;
  const simButton = oldSimButton.cloneNode(true);
  oldSimButton.replaceWith(simButton);
  elements.simulateSeasonButton = simButton;
  simButton.addEventListener("click", simulateSeason);

  elements.startSeasonButton.addEventListener("click", () => {
    const metrics = getTeamMetrics();
    if (state.mode === "hard") elements.seasonBoost.textContent = `${metrics.mvpBonus ? `+${metrics.mvpBonus} MVP · ` : ""}${metrics.opoyPlayers ? `+${formatBoost(metrics.opoyPlayers * OPOY_SIM_BOOST)} OFF · ` : ""}${metrics.dpoyPlayers ? `+${formatBoost(metrics.dpoyPlayers * DPOY_SIM_BOOST)} DEF · ` : ""}${Math.round(playoffTraitBoost(metrics) * 100)}% PLAYOFF BOOST · FINAL BOSS: TEAM GOAT`;
    else if (state.mode === "nightmare") elements.seasonBoost.textContent = `${metrics.mvpBonus ? `+${metrics.mvpBonus} MVP · ` : ""}${metrics.opoyPlayers ? `+${formatBoost(metrics.opoyPlayers * OPOY_SIM_BOOST)} OFF · ` : ""}${metrics.dpoyPlayers ? `+${formatBoost(metrics.dpoyPlayers * DPOY_SIM_BOOST)} DEF · ` : ""}${Math.round(playoffTraitBoost(metrics) * 100)}% PLAYOFF BOOST · NIGHTMARE GAUNTLET`;
  });

  [elements.resetButton, elements.playAgainButton].forEach((button) => button?.addEventListener("click", () => {
    if (state.mode === "hard") {
      document.body.classList.add("hard-mode");
      elements.statusLine.textContent = "No rerolls. Elite roll teams are removed. TEAM GOAT waits in the Bowl.";
    }
    updateActionButtons();
  }));
  elements.gameViewButton?.addEventListener("click", () => document.body.classList.remove("hard-mode"));

  elements.fantasySimButton?.addEventListener("click", () => {
    const fantasy = state.fantasy;
    if (!fantasy?.season) return;
    const userTeam = fantasy.teams[fantasy.userIndex];
    if (fantasy.season.semifinal?.winner?.index === fantasy.userIndex) unlockAchievement("won_playoff");
    if (fantasy.season.champion?.index === fantasy.userIndex) {
      unlockAchievement("championship");
      unlockAchievement("won_playoff");
      const best = bestFantasyStartingFour(userTeam.roster);
      if (best?.metrics?.overall < 82) unlockAchievement("lucky");
    }
  });
})();