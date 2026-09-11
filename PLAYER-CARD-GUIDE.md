# Editing Player Images and Bios in v1.6

All player-card customization is at the very top of `app.js` inside `PLAYER_CARDS`.

Every historical player version has its own exact key:

```js
"17-ice-rac": {
  image: "./images/players/rac-s17.png",
  bio: "Write Season 17 Rac's unique bio here."
},
```

## To add or replace an image
1. Put the image file in `images/players/`.
2. Find the exact season/team/player entry at the top of `app.js`.
3. Change only the `image` string, for example:

```js
image: "./images/players/my-new-image.png"
```

Use `image: ""` if you want the initials fallback instead.

## To change a bio
Edit only the `bio` string on that exact version. Because each season/team/player combination has its own entry, changing one version will not change the others.

## Key format
`season-teamcode-playername`, all lowercase. Examples:
- `1-lgu-rac`
- `10-aw-cj`
- `17-cjsu-perko`
- `17-ice-rac`

Pomenmai/Pom is already configured to use `./images/players/pomenmai.png` in every loaded season in which she appears.


KanYuri is configured to use `./images/players/kanyuri-s1-2.webp` for every loaded season in which he appears.
