# RCAA ERA BALL v1.6

v1.6 keeps every v1.052 single-player feature and adds real-time multiplayer through Supabase. Players can use guest/anonymous sign-in, host a lobby, share a six-character code, and play from separate devices or browser sessions.

## v1.6 multiplayer

### Online 1v1
- Exactly **2 players** per lobby.
- The host starts only after both seats are filled.
- There are **4 synchronized draft rounds**.
- Each player receives a **different random historical team roster** for that round and picks one player from it.
- A round does not advance until **both players have locked a pick**.
- After four picks, the game automatically builds each player's best two-way lineup.
- The higher final OVR wins. Position fit and multiplayer bonuses are included.

### Online Fantasy Draft
- Exactly **4 human players** per lobby.
- **7-round snake draft / 28 total picks** using the same 220 historical player versions as the main game.
- Turns and picks synchronize in real time for everyone in the lobby.
- Each roster contains 7 players; the game chooses the strongest legal starting four.
- Only the **host** can start the season simulation after the draft finishes.
- Every pair of teams plays twice: **12 league games total / 6 per team**.
- Standings use wins, then point differential, then points scored.
- #1 seed gets the Bowl bye; #2 and #3 play the semifinal; #4 misses the playoffs.

## Multiplayer ratings and bonuses
- Existing position fit applies: QB→WR −5%, WR→QB −50%, RUSH↔CB/DB −8%, plus the game's normal out-of-position handling.
- MVP, OPOY, DPOY, Championship, and SB MVP traits still affect team strength in the same places they do in the main game.
- Multiplayer chemistry rewards historical teammates:
  - same exact historical team/season pair: **+1.0 chemistry**
  - same team code from different seasons: **+0.5 chemistry**
  - chemistry is capped at **+3.0**
- Fantasy playoff games also retain Championship/SB MVP playoff boosts.

## Backend
Multiplayer is already configured against the project's Supabase backend. The browser uses the project's **publishable key**; no service-role secret is included in the site.

Supabase stores and synchronizes:
- lobbies and lobby codes
- lobby membership / seats
- synchronized 1v1 rounds and picks
- 7-round fantasy picks
- final 1v1 team results
- host-generated fantasy season results

The reproducible SQL for the multiplayer schema/RPCs is included under `supabase/migrations/`.

## Everything retained from v1.052
- Standard
- RCAA IQ
- Bench
- single-player Fantasy Draft
- Sandbox
- Nightmare / TEAM GOAT
- light/dark themes
- 14 loaded seasons
- 220 historical player versions
- editable per-version player image and bio paths
- KanYuri S1/S2 PFP used for every loaded KanYuri version
- Pomenmai/Pom global PFP mapping
- S17 ICE Rac at 91 QB / 95 CB
- regular-season box scores, awards, standings, playoffs, achievements, and historical team tiers

## Editing player cards
Open `app.js` and edit the `PLAYER_CARDS` block near the top. Put the image file in `images/players/` and set a path such as:

```js
"17-ice-rac": {
  image: "./images/players/rac-s17.png",
  bio: "Season 17 Rac bio."
},
```

## Run locally
For single-player, opening `index.html` directly generally works. Multiplayer needs internet access for Supabase and the Supabase browser library, so serving the folder from a local HTTP server is recommended.

## GitHub Pages
The included `.github/workflows/pages.yml` validates `app.js`, `multiplayer.js`, and the game database before deploying the repository root to GitHub Pages.
