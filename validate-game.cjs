const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const assetRoot = fs.existsSync(path.join(projectRoot, "dist", "app.js")) ? path.join(projectRoot, "dist") : projectRoot;
const sourcePath = path.join(assetRoot, "app.js");
const htmlPath = path.join(assetRoot, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(htmlIds).size, htmlIds.length, "Duplicate HTML id found");

[
  "homePage", "classicModeButton", "iqModeButton", "benchModeButton", "nightmareModeButton", "fantasyModeButton", "onlineModeButton", "sandboxModeButton",
  "teamRerollButton", "statCenter", "passingStats", "receivingStats", "defenseStats",
  "fantasyPage", "fantasySpotButtons", "fantasyPlayerBoard", "fantasyRosters",
  "fantasySimButton", "fantasyStandings", "fantasySchedule", "fantasyPlayoffs",
  "sandboxPage", "sandboxSeasonList", "sandboxTeamList", "sandboxPlayerList", "sandboxRoster", "sandboxStartButton",
  "gameStatsDialog", "gameStatsBody", "themeToggleButton",
  "onlinePage", "onlineConnect", "hostDuelButton", "hostFantasyButton", "onlineJoinCode", "joinLobbyButton",
  "onlineRoom", "onlinePlayerStrip", "onlineStartButton", "duelRoom", "duelRollPlayers", "duelRosters",
  "onlineFantasyRoom", "onlineFantasyBoard", "onlineFantasyRosters", "onlineFantasySimButton", "onlineFantasyResults",
].forEach((id) => assert.ok(htmlIds.includes(id), `Missing HTML element #${id}`));

const source = fs.readFileSync(sourcePath, "utf8").replace(/\ninit\(\);\s*$/, "\n") + `
globalThis.REB_TEST = {
  SEASONS, PLAYER_DETAILS, state, player, positionValue, metricsForPlayers, getTeamMetrics,
  playGame, aggregateSeasonStats, determineSeasonAwards, createPlayerKey,
  buildHistoricTeamPool, buildFantasyPlayerPool, fantasyDraftOrder, bestFantasyStartingFour, buildTeamGoat, allHistoricalPlayerInstances,
};`;

const elementBlock = source.match(/const elements = Object\.fromEntries\(\[([\s\S]*?)\]\.map/);
assert.ok(elementBlock, "Could not inspect element registry");
const registeredIds = [...elementBlock[1].matchAll(/"([A-Za-z][A-Za-z0-9]+)"/g)].map((match) => match[1]);
registeredIds.forEach((id) => assert.ok(htmlIds.includes(id), `JavaScript references missing HTML element #${id}`));

const sandbox = {
  console,
  document: { querySelector: () => ({}), body: { classList: { toggle() {}, add() {}, remove() {} } } },
  window: {},
  HTMLElement: function HTMLElement() {},
};
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const api = sandbox.REB_TEST;

Object.values(api.PLAYER_DETAILS).forEach((details) => {
  if (!details.image) return;
  const relativePath = details.image.replace(/^\.\//, "");
  assert.ok(fs.existsSync(path.join(assetRoot, relativePath)), `Missing player image ${details.image}`);
});

assert.deepEqual(Array.from(api.SEASONS, (entry) => entry.number), [1, 2, 3, 4, 5, 6, 8, 9, 10, 13, 14, 15, 16, 17]);

const playerInstances = api.SEASONS.flatMap((season) => season.teams.flatMap((team) => team.players.map((player) => ({ season, team, player }))));
assert.equal(Object.keys(api.PLAYER_DETAILS).length, playerInstances.length, "Every historical player version should have exactly one editable player-card entry");
for (const { season, team, player } of playerInstances) {
  const key = api.createPlayerKey(season.number, team.code, player.name);
  const card = api.PLAYER_DETAILS[key];
  assert.ok(card, `Missing unique player card ${key}`);
  assert.equal(typeof card.image, "string", `Player card ${key} needs an image path field`);
  assert.equal(typeof card.bio, "string", `Player card ${key} needs a unique bio field`);
  if (["pom", "pomenmai"].includes(player.name.toLowerCase())) assert.equal(card.image, "./images/players/pomenmai.png");
  if (player.name.toLowerCase() === "kanyuri") assert.equal(card.image, "./images/players/kanyuri-s1-2.webp");
}

assert.match(html, /RCAA ERA BALL v1\.6/);
assert.match(html, /data-enter-mode="sandbox"/);
assert.match(html, /data-enter-mode="iq"/);
assert.match(html, /data-enter-mode="online"/);
assert.match(html, /supabase-js@2/);
assert.match(html, /multiplayer\.js/);
assert.match(source, /state\.mode === "iq"/);
assert.match(html, /Click any regular-season result/i);
assert.match(source, /data-game-index/);

const multiplayerPath = path.join(assetRoot, "multiplayer.js");
assert.ok(fs.existsSync(multiplayerPath), "Missing multiplayer.js");
const multiplayerSource = fs.readFileSync(multiplayerPath, "utf8");
[
  "create_reb_lobby", "join_reb_lobby", "start_reb_lobby", "make_duel_pick",
  "submit_duel_team", "make_fantasy_pick", "finish_fantasy_season", "reset_reb_lobby",
].forEach((rpc) => assert.ok(multiplayerSource.includes(rpc), `Missing multiplayer RPC ${rpc}`));
assert.match(multiplayerSource, /MP_CHEMISTRY_CAP\s*=\s*3/);
assert.match(multiplayerSource, /current_pick \/ 4/);
assert.match(multiplayerSource, /PICK \${lobby\.current_pick \+ 1} \/ 28/);
assert.match(multiplayerSource, /roster\.length !== 7/);
assert.match(multiplayerSource, /Higher final OVR wins/i);

function findPlayer(seasonNumber, teamCode, name) {
  const season = api.SEASONS.find((entry) => entry.number === seasonNumber);
  const team = season.teams.find((entry) => entry.code === teamCode);
  return team.players.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
}

assert.equal(findPlayer(17, "CJSU", "CJ").offense.rating, 93);
assert.equal(findPlayer(17, "ICE", "Rac").offense.rating, 91);
assert.equal(findPlayer(17, "ICE", "Rac").defense.rating, 95);
assert.equal(findPlayer(17, "ICE", "Rac").traits.mvp, true);
assert.equal(findPlayer(17, "ICE", "Rac").traits.dpoy, true);
assert.equal(findPlayer(17, "CJSU", "B45").offense.rating, 96);
assert.equal(findPlayer(17, "CJSU", "B45").traits.opoy, true);
assert.equal(findPlayer(17, "LEP", "Kira").offense.rating, 98);
assert.equal(findPlayer(10, "AW", "CJ").offense.rating, 97);
assert.equal(findPlayer(10, "AW", "CJ").traits.sbMvp, true);
assert.equal(findPlayer(5, "ICE", "Rac").offense.rating, 98);
assert.equal(findPlayer(5, "ICE", "Rac").traits.mvp, true);
assert.equal(findPlayer(15, "B45J", "Sawoo").offense.rating, 98);
assert.equal(findPlayer(15, "B45J", "Sawoo").traits.mvp, true);
assert.equal(findPlayer(15, "B45J", "Sawoo").traits.dpoy, true);
assert.equal(findPlayer(15, "B45J", "Sawoo").traits.sbMvp, true);
assert.equal(findPlayer(13, "CJSU", "Perko").offense.rating, 96);
assert.equal(findPlayer(13, "CJSU", "Perko").defense.rating, 90);
assert.equal(findPlayer(17, "CJSU", "Perko").offense.rating, 97);
assert.equal(findPlayer(17, "CJSU", "Perko").defense.rating, 85);

const historic = api.buildHistoricTeamPool();
assert.ok(historic.length >= 35, "Too few complete historical teams");
for (const tier of ["bad", "ok", "good", "legendary"]) {
  assert.ok(historic.filter((entry) => entry.category === tier).length >= (tier === "bad" ? 2 : 1), `Missing ${tier} historical teams`);
}
historic.forEach((entry) => {
  assert.equal(entry.players.length, 4);
  assert.ok(Number.isFinite(entry.overall));
});

const fantasyPool = api.buildFantasyPlayerPool();
assert.ok(fantasyPool.length > 200, "Fantasy pool should contain every historical player instance");
assert.equal(fantasyPool[0].adp, 1);

const allHistorical = api.allHistoricalPlayerInstances();
assert.equal(allHistorical.length, fantasyPool.length);
const goat = api.buildTeamGoat();
assert.equal(goat.name, "TEAM GOAT");
assert.equal(goat.category, "goat");
assert.equal(goat.players.length, 4);
assert.ok(goat.overall >= 95);
assert.ok(goat.players.every((player) => allHistorical.some((candidate) => candidate.key === player.key)));
assert.ok(fantasyPool.every((entry, index) => index === 0 || fantasyPool[index - 1].fantasyRating >= entry.fantasyRating));
const order = Array.from(api.fantasyDraftOrder());
assert.equal(order.length, 28);
assert.deepEqual(order.slice(0, 8), [0, 1, 2, 3, 3, 2, 1, 0]);

const sampleRoster = fantasyPool.slice(0, 7);
assert.equal(api.bestFantasyStartingFour(sampleRoster).players.length, 4);

const wrPreferred = api.determineSeasonAwards({
  passing: [{ name: "QB", yards: 2500, td: 22, int: 5 }],
  receiving: [{ name: "WR1", yards: 800, td: 8, rec: 40 }, { name: "WR2", yards: 500, td: 4, rec: 25 }],
  defense: [{ name: "DB", int: 4, sacks: 0, ff: 1 }],
}, 4, false);
assert.equal(wrPreferred.opoy, "WR1");

const qbException = api.determineSeasonAwards({
  passing: [{ name: "QB", yards: 3400, td: 32, int: 4 }],
  receiving: [{ name: "WR1", yards: 500, td: 4, rec: 25 }, { name: "WR2", yards: 430, td: 3, rec: 21 }],
  defense: [{ name: "DB", int: 3, sacks: 1, ff: 1 }],
}, 5, false);
assert.equal(qbException.opoy, "QB");

console.log(JSON.stringify({
  seasons: api.SEASONS.length,
  historicTeams: historic.length,
  tiers: Object.fromEntries(["bad", "ok", "good", "legendary"].map((tier) => [tier, historic.filter((entry) => entry.category === tier).length])),
  fantasyPlayers: fantasyPool.length,
  fantasyRounds: 7,
  teamGoatOverall: goat.overall,
  teamGoatPlayers: goat.players.map((player) => `${player.name} (S${player.season} ${player.teamCode})`),
  modes: 7,
}, null, 2));
