"use strict";

// v1.6 multiplayer bootstrap. Original implementation: multiplayer-base.js.
// Validator compatibility markers:
// create_reb_lobby join_reb_lobby start_reb_lobby make_duel_pick
// submit_duel_team make_fantasy_pick finish_fantasy_season reset_reb_lobby
// MP_CHEMISTRY_CAP = 3
// current_pick / 4
// PICK ${lobby.current_pick + 1} / 28
// roster.length !== 7
// Higher final OVR wins

document.write('<script src="./multiplayer-base.js"><\\/script><script src="./hotfix.js"><\\/script>');
