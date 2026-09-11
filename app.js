"use strict";

// -----------------------------------------------------------------------------
// PLAYER CARD EDITOR — v1.6 (card system carried forward from v1.052)
// -----------------------------------------------------------------------------
// Every historical player VERSION has its own exact entry below.
// To add/change an image, put the image file in ./images/players/ and paste the
// path into `image`. To change that version's biography, edit `bio`.
//
// Example:
// "17-ice-rac": {
//   image: "./images/players/rac-s17.png",
//   bio: "Write Season 17 Rac's unique bio here."
// },
//
// Leaving image as "" shows the initials fallback. No other code needs editing.
const PLAYER_CARDS = {
  "1-lgu-rac": { image: "", bio: "S1 LGU Rac. Edit this bio in PLAYER_CARDS." },
  "1-lgu-goose": { image: "", bio: "S1 LGU Goose. Edit this bio in PLAYER_CARDS." },
  "1-lgu-siashi": { image: "", bio: "S1 LGU Siashi. Edit this bio in PLAYER_CARDS." },
  "1-lgu-rex": { image: "", bio: "S1 LGU Rex. Edit this bio in PLAYER_CARDS." },
  "1-std-sawoo": { image: "./images/players/sawoo-s1-2.webp", bio: "S1 STD Sawoo. Edit this bio in PLAYER_CARDS." },
  "1-std-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S1 STD Kuhdd. Edit this bio in PLAYER_CARDS." },
  "1-std-perko": { image: "./images/players/perko-s1.webp", bio: "S1 STD Perko. Edit this bio in PLAYER_CARDS." },
  "1-std-buzzer": { image: "./images/players/buzzer-s1-2.webp", bio: "S1 STD Buzzer. Edit this bio in PLAYER_CARDS." },
  "1-ybt-yoboy": { image: "./images/players/yoboy-s1-8.webp", bio: "S1 YBT Yoboy. Edit this bio in PLAYER_CARDS." },
  "1-ybt-cj": { image: "./images/players/cj-s1-2.webp", bio: "S1 YBT CJ. Edit this bio in PLAYER_CARDS." },
  "1-ybt-blonde": { image: "./images/players/blonde-s1-2.webp", bio: "S1 YBT Blonde. Edit this bio in PLAYER_CARDS." },
  "1-ybt-pillow": { image: "./images/players/pillow-s1-5.webp", bio: "S1 YBT Pillow. Edit this bio in PLAYER_CARDS." },
  "1-kys-kanyuri": { image: "./images/players/kanyuri-s1-2.webp", bio: "S1 KYS KanYuri. Edit this bio in PLAYER_CARDS." },
  "1-kys-summrs": { image: "", bio: "S1 KYS Summrs. Edit this bio in PLAYER_CARDS." },
  "1-kys-flacco": { image: "", bio: "S1 KYS Flacco. Edit this bio in PLAYER_CARDS." },
  "1-kys-starz": { image: "", bio: "S1 KYS Starz. Edit this bio in PLAYER_CARDS." },
  "2-kys-kanyuri": { image: "./images/players/kanyuri-s1-2.webp", bio: "S2 KYS KanYuri. Edit this bio in PLAYER_CARDS." },
  "2-kys-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S2 KYS Kuhdd. Edit this bio in PLAYER_CARDS." },
  "2-kys-starz": { image: "", bio: "S2 KYS Starz. Edit this bio in PLAYER_CARDS." },
  "2-kys-jude": { image: "./images/players/jude.webp", bio: "S2 KYS Jude. Edit this bio in PLAYER_CARDS." },
  "2-std-sawoo": { image: "./images/players/sawoo-s1-2.webp", bio: "S2 STD Sawoo. Edit this bio in PLAYER_CARDS." },
  "2-std-rac": { image: "", bio: "S2 STD Rac. Edit this bio in PLAYER_CARDS." },
  "2-std-blonde": { image: "./images/players/blonde-s1-2.webp", bio: "S2 STD Blonde. Edit this bio in PLAYER_CARDS." },
  "2-urla-noir": { image: "./images/players/noir-s2-5.webp", bio: "S2 URLA Noir. Edit this bio in PLAYER_CARDS." },
  "2-urla-cj": { image: "./images/players/cj-s1-2.webp", bio: "S2 URLA CJ. Edit this bio in PLAYER_CARDS." },
  "2-urla-quan": { image: "", bio: "S2 URLA Quan. Edit this bio in PLAYER_CARDS." },
  "2-urla-garf": { image: "", bio: "S2 URLA Garf. Edit this bio in PLAYER_CARDS." },
  "2-ybt-yoboy": { image: "./images/players/yoboy-s1-8.webp", bio: "S2 YBT Yoboy. Edit this bio in PLAYER_CARDS." },
  "2-ybt-buzzer": { image: "./images/players/buzzer-s1-2.webp", bio: "S2 YBT Buzzer. Edit this bio in PLAYER_CARDS." },
  "2-ybt-pillow": { image: "./images/players/pillow-s1-5.webp", bio: "S2 YBT Pillow. Edit this bio in PLAYER_CARDS." },
  "2-ybt-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "3-ice-rac": { image: "", bio: "S3 ICE Rac. Edit this bio in PLAYER_CARDS." },
  "3-ice-cj": { image: "", bio: "S3 ICE CJ. Edit this bio in PLAYER_CARDS." },
  "3-ice-perko": { image: "", bio: "S3 ICE Perko. Edit this bio in PLAYER_CARDS." },
  "3-ice-ladiesman": { image: "", bio: "S3 ICE Ladiesman. Edit this bio in PLAYER_CARDS." },
  "3-std-sawoo": { image: "", bio: "S3 STD Sawoo. Edit this bio in PLAYER_CARDS." },
  "3-std-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S3 STD Kuhdd. Edit this bio in PLAYER_CARDS." },
  "3-std-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "3-std-jude": { image: "./images/players/jude.webp", bio: "S3 STD Jude. Edit this bio in PLAYER_CARDS." },
  "3-ybt-yoboy": { image: "./images/players/yoboy-s1-8.webp", bio: "S3 YBT Yoboy. Edit this bio in PLAYER_CARDS." },
  "3-ybt-kacper": { image: "", bio: "S3 YBT Kacper. Edit this bio in PLAYER_CARDS." },
  "3-ybt-blonde": { image: "", bio: "S3 YBT Blonde. Edit this bio in PLAYER_CARDS." },
  "3-ybt-pillow": { image: "./images/players/pillow-s1-5.webp", bio: "S3 YBT Pillow. Edit this bio in PLAYER_CARDS." },
  "3-naa-noir": { image: "./images/players/noir-s2-5.webp", bio: "S3 NAA Noir. Edit this bio in PLAYER_CARDS." },
  "3-naa-buzzer": { image: "", bio: "S3 NAA Buzzer. Edit this bio in PLAYER_CARDS." },
  "4-ob-yoboy": { image: "./images/players/yoboy-s1-8.webp", bio: "S4 OB Yoboy. Edit this bio in PLAYER_CARDS." },
  "4-ob-perko": { image: "", bio: "S4 OB Perko. Edit this bio in PLAYER_CARDS." },
  "4-ob-blonde": { image: "", bio: "S4 OB Blonde. Edit this bio in PLAYER_CARDS." },
  "4-ob-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "4-ice-rac": { image: "", bio: "S4 ICE Rac. Edit this bio in PLAYER_CARDS." },
  "4-ice-sawoo": { image: "", bio: "S4 ICE Sawoo. Edit this bio in PLAYER_CARDS." },
  "4-ice-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S4 ICE Kuhdd. Edit this bio in PLAYER_CARDS." },
  "4-ice-cj": { image: "", bio: "S4 ICE CJ. Edit this bio in PLAYER_CARDS." },
  "4-naa-noir": { image: "./images/players/noir-s2-5.webp", bio: "S4 NAA Noir. Edit this bio in PLAYER_CARDS." },
  "4-naa-buzzer": { image: "", bio: "S4 NAA Buzzer. Edit this bio in PLAYER_CARDS." },
  "4-sum-summrs": { image: "", bio: "S4 SUM Summrs. Edit this bio in PLAYER_CARDS." },
  "4-sum-ryan": { image: "", bio: "S4 SUM Ryan. Edit this bio in PLAYER_CARDS." },
  "4-sum-pillow": { image: "./images/players/pillow-s1-5.webp", bio: "S4 SUM Pillow. Edit this bio in PLAYER_CARDS." },
  "5-naa-noir": { image: "./images/players/noir-s2-5.webp", bio: "S5 NAA Noir. Edit this bio in PLAYER_CARDS." },
  "5-naa-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S5 NAA Kuhdd. Edit this bio in PLAYER_CARDS." },
  "5-naa-jude": { image: "./images/players/jude.webp", bio: "S5 NAA Jude. Edit this bio in PLAYER_CARDS." },
  "5-naa-ryan": { image: "", bio: "S5 NAA Ryan. Edit this bio in PLAYER_CARDS." },
  "5-ice-rac": { image: "", bio: "S5 ICE Rac. Edit this bio in PLAYER_CARDS." },
  "5-ice-blonde": { image: "", bio: "S5 ICE Blonde. Edit this bio in PLAYER_CARDS." },
  "5-ice-pillow": { image: "./images/players/pillow-s1-5.webp", bio: "S5 ICE Pillow. Edit this bio in PLAYER_CARDS." },
  "5-ice-perko": { image: "", bio: "S5 ICE Perko. Edit this bio in PLAYER_CARDS." },
  "5-cjsu-cj": { image: "", bio: "S5 CJSU CJ. Edit this bio in PLAYER_CARDS." },
  "5-cjsu-sawoo": { image: "", bio: "S5 CJSU Sawoo. Edit this bio in PLAYER_CARDS." },
  "5-cjsu-ladiesman": { image: "", bio: "S5 CJSU Ladiesman. Edit this bio in PLAYER_CARDS." },
  "5-cjsu-buzzer": { image: "", bio: "S5 CJSU Buzzer. Edit this bio in PLAYER_CARDS." },
  "5-ybt-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "5-ybt-summrs": { image: "", bio: "S5 YBT Summrs. Edit this bio in PLAYER_CARDS." },
  "5-ybt-yoboy": { image: "./images/players/yoboy-s1-8.webp", bio: "S5 YBT Yoboy. Edit this bio in PLAYER_CARDS." },
  "6-cjsu-cj": { image: "", bio: "S6 CJSU CJ. Edit this bio in PLAYER_CARDS." },
  "6-cjsu-perko": { image: "", bio: "S6 CJSU Perko. Edit this bio in PLAYER_CARDS." },
  "6-cjsu-blonde": { image: "", bio: "S6 CJSU Blonde. Edit this bio in PLAYER_CARDS." },
  "6-cjsu-kanyuri": { image: "./images/players/kanyuri-s1-2.webp", bio: "S6 CJSU KanYuri. Edit this bio in PLAYER_CARDS." },
  "8-rlu-cj": { image: "", bio: "S8 RLU CJ. Edit this bio in PLAYER_CARDS." },
  "8-rlu-ryan": { image: "", bio: "S8 RLU Ryan. Edit this bio in PLAYER_CARDS." },
  "8-rlu-yoboy": { image: "./images/players/yoboy-s1-8.webp", bio: "S8 RLU Yoboy. Edit this bio in PLAYER_CARDS." },
  "8-rlu-kacper": { image: "", bio: "S8 RLU Kacper. Edit this bio in PLAYER_CARDS." },
  "8-naa-noir": { image: "", bio: "S8 NAA Noir. Edit this bio in PLAYER_CARDS." },
  "8-naa-pom": { image: "./images/players/pomenmai.png", bio: "S8 NAA Pom. Edit this bio in PLAYER_CARDS." },
  "8-naa-ladiesman": { image: "", bio: "S8 NAA Ladiesman. Edit this bio in PLAYER_CARDS." },
  "8-naa-buzzer": { image: "", bio: "S8 NAA Buzzer. Edit this bio in PLAYER_CARDS." },
  "8-shit-sawoo": { image: "", bio: "S8 SHIT Sawoo. Edit this bio in PLAYER_CARDS." },
  "8-shit-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "8-shit-silus": { image: "", bio: "S8 SHIT Silus. Edit this bio in PLAYER_CARDS." },
  "8-shit-epikees": { image: "", bio: "S8 SHIT Epikees. Edit this bio in PLAYER_CARDS." },
  "8-lep-bubby": { image: "", bio: "S8 LEP Bubby. Edit this bio in PLAYER_CARDS." },
  "8-lep-rac": { image: "", bio: "S8 LEP Rac. Edit this bio in PLAYER_CARDS." },
  "8-lep-static": { image: "", bio: "S8 LEP Static. Edit this bio in PLAYER_CARDS." },
  "8-lep-pillow": { image: "", bio: "S8 LEP Pillow. Edit this bio in PLAYER_CARDS." },
  "9-shit-sawoo": { image: "", bio: "S9 SHIT Sawoo. Edit this bio in PLAYER_CARDS." },
  "9-shit-blonde": { image: "", bio: "S9 SHIT Blonde. Edit this bio in PLAYER_CARDS." },
  "9-shit-skw": { image: "./images/players/skw.png", bio: "S9 SHIT SKW. Edit this bio in PLAYER_CARDS." },
  "9-shit-pomenmai": { image: "./images/players/pomenmai.png", bio: "S9 SHIT Pomenmai. Edit this bio in PLAYER_CARDS." },
  "9-rlu-cj": { image: "", bio: "S9 RLU CJ. Edit this bio in PLAYER_CARDS." },
  "9-rlu-ryan": { image: "", bio: "S9 RLU Ryan. Edit this bio in PLAYER_CARDS." },
  "9-rlu-yoboy": { image: "", bio: "S9 RLU Yoboy. Edit this bio in PLAYER_CARDS." },
  "9-rlu-buzzer": { image: "", bio: "S9 RLU Buzzer. Edit this bio in PLAYER_CARDS." },
  "9-nau-rac": { image: "", bio: "S9 NAU Rac. Edit this bio in PLAYER_CARDS." },
  "9-nau-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S9 NAU Kuhdd. Edit this bio in PLAYER_CARDS." },
  "9-nau-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "9-nau-goose": { image: "", bio: "S9 NAU Goose. Edit this bio in PLAYER_CARDS." },
  "9-lep-noir": { image: "", bio: "S9 LEP Noir. Edit this bio in PLAYER_CARDS." },
  "9-lep-bubby": { image: "", bio: "S9 LEP Bubby. Edit this bio in PLAYER_CARDS." },
  "9-lep-static": { image: "./images/players/static1.webp", bio: "S9 LEP Static. Edit this bio in PLAYER_CARDS." },
  "9-lep-pillow": { image: "", bio: "S9 LEP Pillow. Edit this bio in PLAYER_CARDS." },
  "10-aw-cj": { image: "", bio: "S10 AW CJ. Edit this bio in PLAYER_CARDS." },
  "10-aw-buzzer": { image: "", bio: "S10 AW Buzzer. Edit this bio in PLAYER_CARDS." },
  "10-aw-jude": { image: "./images/players/jude.webp", bio: "S10 AW Jude. Edit this bio in PLAYER_CARDS." },
  "10-aw-pillow": { image: "", bio: "S10 AW Pillow. Edit this bio in PLAYER_CARDS." },
  "10-ybt-yoboy": { image: "", bio: "S10 YBT Yoboy. Edit this bio in PLAYER_CARDS." },
  "10-ybt-rac": { image: "", bio: "S10 YBT Rac. Edit this bio in PLAYER_CARDS." },
  "10-ybt-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S10 YBT Kuhdd. Edit this bio in PLAYER_CARDS." },
  "10-ybt-ryan": { image: "", bio: "S10 YBT Ryan. Edit this bio in PLAYER_CARDS." },
  "10-b45j-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "10-b45j-noir": { image: "", bio: "S10 B45J Noir. Edit this bio in PLAYER_CARDS." },
  "10-b45j-kacper": { image: "", bio: "S10 B45J Kacper. Edit this bio in PLAYER_CARDS." },
  "10-b45j-blonde": { image: "", bio: "S10 B45J Blonde. Edit this bio in PLAYER_CARDS." },
  "10-lep-sawoo": { image: "", bio: "S10 LEP Sawoo. Edit this bio in PLAYER_CARDS." },
  "10-lep-bubby": { image: "./images/players/bubby.png", bio: "S10 LEP Bubby. Edit this bio in PLAYER_CARDS." },
  "10-lep-static": { image: "./images/players/static1.webp", bio: "S10 LEP Static. Edit this bio in PLAYER_CARDS." },
  "10-lep-rain": { image: "", bio: "S10 LEP Rain. Edit this bio in PLAYER_CARDS." },
  "13-b45j-sawoo": { image: "", bio: "S13 B45J Sawoo. Edit this bio in PLAYER_CARDS." },
  "13-b45j-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "13-b45j-kira": { image: "", bio: "S13 B45J Kira. Edit this bio in PLAYER_CARDS." },
  "13-b45j-jude": { image: "./images/players/jude.webp", bio: "S13 B45J Jude. Edit this bio in PLAYER_CARDS." },
  "13-b45j-kanyuri": { image: "./images/players/kanyuri-s1-2.webp", bio: "S13 B45J KanYuri. Edit this bio in PLAYER_CARDS." },
  "13-pussy-pom": { image: "./images/players/pomenmai.png", bio: "S13 PUSSY Pom. Edit this bio in PLAYER_CARDS." },
  "13-pussy-rac": { image: "", bio: "S13 PUSSY Rac. Edit this bio in PLAYER_CARDS." },
  "13-pussy-static": { image: "./images/players/static2.webp", bio: "S13 PUSSY Static. Edit this bio in PLAYER_CARDS." },
  "13-pussy-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S13 PUSSY Kuhdd. Edit this bio in PLAYER_CARDS." },
  "13-pussy-lucy": { image: "", bio: "S13 PUSSY Lucy. Edit this bio in PLAYER_CARDS." },
  "13-lep-noir": { image: "", bio: "S13 LEP Noir. Edit this bio in PLAYER_CARDS." },
  "13-lep-ryan": { image: "", bio: "S13 LEP Ryan. Edit this bio in PLAYER_CARDS." },
  "13-lep-thragg": { image: "", bio: "S13 LEP Thragg. Edit this bio in PLAYER_CARDS." },
  "13-lep-ladiesman": { image: "", bio: "S13 LEP Ladiesman. Edit this bio in PLAYER_CARDS." },
  "13-lep-kacper": { image: "", bio: "S13 LEP Kacper. Edit this bio in PLAYER_CARDS." },
  "13-cjsu-blonde": { image: "", bio: "S13 CJSU Blonde. Edit this bio in PLAYER_CARDS." },
  "13-cjsu-cj": { image: "", bio: "S13 CJSU CJ. Edit this bio in PLAYER_CARDS." },
  "13-cjsu-pillow": { image: "", bio: "S13 CJSU Pillow. Edit this bio in PLAYER_CARDS." },
  "13-cjsu-yoboy": { image: "", bio: "S13 CJSU Yoboy. Edit this bio in PLAYER_CARDS." },
  "13-cjsu-perko": { image: "", bio: "S13 CJSU Perko. Edit this bio in PLAYER_CARDS." },
  "14-cjsu-cj": { image: "", bio: "S14 CJSU CJ. Edit this bio in PLAYER_CARDS." },
  "14-cjsu-kacper": { image: "", bio: "S14 CJSU Kacper. Edit this bio in PLAYER_CARDS." },
  "14-cjsu-goose": { image: "", bio: "S14 CJSU Goose. Edit this bio in PLAYER_CARDS." },
  "14-cjsu-noir": { image: "", bio: "S14 CJSU Noir. Edit this bio in PLAYER_CARDS." },
  "14-lcu-rac": { image: "", bio: "S14 LCU Rac. Edit this bio in PLAYER_CARDS." },
  "14-lcu-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "14-lcu-blonde": { image: "", bio: "S14 LCU Blonde. Edit this bio in PLAYER_CARDS." },
  "14-lcu-lucy": { image: "", bio: "S14 LCU Lucy. Edit this bio in PLAYER_CARDS." },
  "14-lcu-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S14 LCU Kuhdd. Edit this bio in PLAYER_CARDS." },
  "14-eng-energy": { image: "", bio: "S14 ENG Energy. Edit this bio in PLAYER_CARDS." },
  "14-eng-pom": { image: "./images/players/pomenmai.png", bio: "S14 ENG Pom. Edit this bio in PLAYER_CARDS." },
  "14-eng-pillow": { image: "", bio: "S14 ENG Pillow. Edit this bio in PLAYER_CARDS." },
  "14-eng-thragg": { image: "", bio: "S14 ENG Thragg. Edit this bio in PLAYER_CARDS." },
  "14-eng-kira": { image: "", bio: "S14 ENG Kira. Edit this bio in PLAYER_CARDS." },
  "14-saw-sawoo": { image: "", bio: "S14 SAW Sawoo. Edit this bio in PLAYER_CARDS." },
  "14-saw-kanyuri": { image: "./images/players/kanyuri-s1-2.webp", bio: "S14 SAW KanYuri. Edit this bio in PLAYER_CARDS." },
  "14-saw-ryan": { image: "", bio: "S14 SAW Ryan. Edit this bio in PLAYER_CARDS." },
  "14-saw-yoboy": { image: "", bio: "S14 SAW Yoboy. Edit this bio in PLAYER_CARDS." },
  "14-saw-static": { image: "./images/players/static3.webp", bio: "S14 SAW Static. Edit this bio in PLAYER_CARDS." },
  "15-b45j-sawoo": { image: "", bio: "S15 B45J Sawoo. Edit this bio in PLAYER_CARDS." },
  "15-b45j-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S15 B45J Kuhdd. Edit this bio in PLAYER_CARDS." },
  "15-b45j-cj": { image: "", bio: "S15 B45J CJ. Edit this bio in PLAYER_CARDS." },
  "15-b45j-lucy": { image: "", bio: "S15 B45J Lucy. Edit this bio in PLAYER_CARDS." },
  "15-b45j-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "15-pussy-pom": { image: "./images/players/pomenmai.png", bio: "S15 PUSSY Pom. Edit this bio in PLAYER_CARDS." },
  "15-pussy-energy": { image: "", bio: "S15 PUSSY Energy. Edit this bio in PLAYER_CARDS." },
  "15-pussy-statiq": { image: "./images/players/static3.webp", bio: "S15 PUSSY Statiq. Edit this bio in PLAYER_CARDS." },
  "15-pussy-rac": { image: "", bio: "S15 PUSSY Rac. Edit this bio in PLAYER_CARDS." },
  "15-pussy-yoboy": { image: "", bio: "S15 PUSSY Yoboy. Edit this bio in PLAYER_CARDS." },
  "15-naa-noir": { image: "", bio: "S15 NAA Noir. Edit this bio in PLAYER_CARDS." },
  "15-naa-ryan": { image: "", bio: "S15 NAA Ryan. Edit this bio in PLAYER_CARDS." },
  "15-naa-blonde": { image: "", bio: "S15 NAA Blonde. Edit this bio in PLAYER_CARDS." },
  "15-naa-kira": { image: "", bio: "S15 NAA Kira. Edit this bio in PLAYER_CARDS." },
  "15-lep-ladiesman": { image: "", bio: "S15 LEP Ladiesman. Edit this bio in PLAYER_CARDS." },
  "15-lep-kacper": { image: "", bio: "S15 LEP Kacper. Edit this bio in PLAYER_CARDS." },
  "15-lep-bubby": { image: "./images/players/bubby.png", bio: "S15 LEP Bubby. Edit this bio in PLAYER_CARDS." },
  "15-lep-pillow": { image: "", bio: "S15 LEP Pillow. Edit this bio in PLAYER_CARDS." },
  "15-lep-turbo": { image: "./images/players/turbo.webp", bio: "S15 LEP Turbo. Edit this bio in PLAYER_CARDS." },
  "15-lep-jude": { image: "./images/players/jude.webp", bio: "S15 LEP Jude. Edit this bio in PLAYER_CARDS." },
  "16-cjsu-cj": { image: "", bio: "S16 CJSU CJ. Edit this bio in PLAYER_CARDS." },
  "16-cjsu-blonde": { image: "", bio: "S16 CJSU Blonde. Edit this bio in PLAYER_CARDS." },
  "16-cjsu-kuhdd": { image: "./images/players/kuhdd.webp", bio: "S16 CJSU Kuhdd. Edit this bio in PLAYER_CARDS." },
  "16-cjsu-energy": { image: "", bio: "S16 CJSU Energy. Edit this bio in PLAYER_CARDS." },
  "16-cjsu-lucy": { image: "", bio: "S16 CJSU Lucy. Edit this bio in PLAYER_CARDS." },
  "16-rlu-ryan": { image: "", bio: "S16 RLU Ryan. Edit this bio in PLAYER_CARDS." },
  "16-rlu-sawoo": { image: "", bio: "S16 RLU Sawoo. Edit this bio in PLAYER_CARDS." },
  "16-rlu-pomenmai": { image: "./images/players/pomenmai.png", bio: "S16 RLU Pomenmai. Edit this bio in PLAYER_CARDS." },
  "16-rlu-pillow": { image: "", bio: "S16 RLU Pillow. Edit this bio in PLAYER_CARDS." },
  "16-rlu-ladiesman": { image: "", bio: "S16 RLU Ladiesman. Edit this bio in PLAYER_CARDS." },
  "16-b45j-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "16-b45j-racc": { image: "", bio: "S16 B45J Racc. Edit this bio in PLAYER_CARDS." },
  "16-b45j-kacper": { image: "", bio: "S16 B45J Kacper. Edit this bio in PLAYER_CARDS." },
  "16-b45j-thragg": { image: "", bio: "S16 B45J Thragg. Edit this bio in PLAYER_CARDS." },
  "16-kfbs-kira": { image: "", bio: "S16 KFBS Kira. Edit this bio in PLAYER_CARDS." },
  "16-kfbs-noir": { image: "", bio: "S16 KFBS Noir. Edit this bio in PLAYER_CARDS." },
  "16-kfbs-statiq": { image: "", bio: "S16 KFBS Statiq. Edit this bio in PLAYER_CARDS." },
  "16-kfbs-yoboy": { image: "", bio: "S16 KFBS Yoboy. Edit this bio in PLAYER_CARDS." },
  "16-kfbs-turbo": { image: "./images/players/turbo.webp", bio: "S16 KFBS Turbo. Edit this bio in PLAYER_CARDS." },
  "17-cjsu-cj": { image: "./images/players/cj-s17.jpg", bio: "S17 CJSU CJ. Edit this bio in PLAYER_CARDS." },
  "17-cjsu-b45": { image: "./images/players/b45.png", bio: "Player profile coming soon. Replace this text with B45's biography." },
  "17-cjsu-pom": { image: "./images/players/pomenmai.png", bio: "S17 CJSU Pom. Edit this bio in PLAYER_CARDS." },
  "17-cjsu-blonde": { image: "", bio: "S17 CJSU Blonde. Edit this bio in PLAYER_CARDS." },
  "17-cjsu-perko": { image: "", bio: "S17 CJSU Perko. Edit this bio in PLAYER_CARDS." },
  "17-lep-bubby": { image: "./images/players/bubby.png", bio: "S17 LEP Bubby. Edit this bio in PLAYER_CARDS." },
  "17-lep-kira": { image: "", bio: "S17 LEP Kira. Edit this bio in PLAYER_CARDS." },
  "17-lep-energy": { image: "./images/players/energy-s17.png", bio: "S17 LEP Energy. Edit this bio in PLAYER_CARDS." },
  "17-lep-joker": { image: "", bio: "S17 LEP Joker. Edit this bio in PLAYER_CARDS." },
  "17-ice-rac": { image: "./images/players/rac-s17.png", bio: "S17 ICE Rac. Edit this bio in PLAYER_CARDS." },
  "17-ice-static": { image: "", bio: "S17 ICE Static. Edit this bio in PLAYER_CARDS." },
  "17-ice-lucy": { image: "./images/players/lucy-s17.png", bio: "S17 ICE Lucy. Edit this bio in PLAYER_CARDS." },
  "17-ice-aki": { image: "./images/players/aki.webp", bio: "S17 ICE Aki. Edit this bio in PLAYER_CARDS." },
  "17-naa-noir": { image: "", bio: "S17 NAA Noir. Edit this bio in PLAYER_CARDS." },
  "17-naa-shadow": { image: "", bio: "S17 NAA Shadow. Edit this bio in PLAYER_CARDS." },
  "17-naa-skw": { image: "./images/players/skw.png", bio: "S17 NAA SKW. Edit this bio in PLAYER_CARDS." },
  "17-naa-yoboy": { image: "", bio: "S17 NAA Yoboy. Edit this bio in PLAYER_CARDS." },
};

// Compatibility alias used by the rest of the game and validator.
const PLAYER_DETAILS = PLAYER_CARDS;

const SEASONS = [
  season(1, [
    team("LGU", "Loose Goose University", "#61c7eb", [
      player("Rac", 93, "QB", 84, "CB"), player("Goose", 79, "WR", 94, "RUSH", { dpoy: true }),
      player("Siashi", 83, "WR", 81, "CB"), player("Rex", 88, "WR", 83, "CB"),
    ]),
    team("STD", "Sawoo Tech District", "#ed4b44", [
      player("Sawoo", 92, "QB", 91, "CB"), player("Kuhdd", 95, "WR", 83, "CB"),
      player("Perko", 80, "WR", 82, "CB"), player("Buzzer", 96, "WR", 92, "CB", { opoy: true }),
    ], true),
    team("YBT", "Yoboy Tech", "#a56fe8", [
      player("Yoboy", 78, "QB", 89, "CB"), player("CJ", 84, "WR", 83, "CB"),
      player("Blonde", 94, "WR", 87, "RUSH"), player("Pillow", 74, "WR", 86, "CB"),
    ]),
    team("KYS", "Kanyuri State", "#f7b92f", [
      player("KanYuri", 95, "QB", 92, "CB", { mvp: true }), player("Summrs", 99, "WR", 95, "CB", { sbMvp: true }),
      player("Flacco", 72, "WR", 76, "RUSH"), player("Starz", 83, "WR", 82, "CB"),
    ]),
  ]),
  season(2, [
    team("KYS", "Kanyuri State", "#f7b92f", [
      player("KanYuri", 98, "QB", 98, "CB", { mvp: true, sbMvp: true }), player("Kuhdd", 98, "WR", 86, "RUSH", { opoy: true }),
      player("Starz", 85, "WR", 83, "CB"), player("Jude", 88, "WR", 93, "CB"),
    ], true),
    team("STD", "Sawoo Tech District", "#ed4b44", [
      player("Sawoo", 86, "QB", 88, "CB"), player("Rac", 88, "WR", 89, "CB"), player("Blonde", 93, "WR", 84, "RUSH"),
    ]),
    team("URLA", "University of Rexland Athletics", "#38c6ba", [
      player("Noir", 88, "QB", 88, "RUSH"), player("CJ", 80, "WR", 79, "CB"),
      player("Quan", 93, "WR", 94, "CB"), player("Garf", 85, "WR", 86, "CB"),
    ]),
    team("YBT", "Yoboy Tech", "#a56fe8", [
      player("Yoboy", 82, "QB", 87, "CB"), player("Buzzer", 90, "WR", 91, "CB"),
      player("Pillow", 81, "WR", 84, "CB"), player("B45", 83, "WR", 90, "RUSH", { dpoy: true }),
    ]),
  ]),
  season(3, [
    team("ICE", "ICE", "#62d1df", [
      player("Rac", 92, "QB", 89, "CB"), player("CJ", 88, "WR", 92, "CB"),
      player("Perko", 87, "WR", 95, "CB", { dpoy: true }), player("Ladiesman", 85, "WR", 79, "RUSH"),
    ]),
    team("STD", "Sawoo Tech District", "#ed4b44", [
      player("Sawoo", 90, "QB", 91, "CB", { sbMvp: true }), player("Kuhdd", 96, "WR", 87, "CB", { opoy: true }),
      player("B45", 86, "WR", 90, "RUSH"), player("Jude", 86, "WR", 87, "CB"),
    ], true),
    team("YBT", "Yoboy Tech", "#a56fe8", [
      player("Yoboy", 84, "QB", 89, "CB"), player("Kacper", 86, "WR", 83, "CB"),
      player("Blonde", 99, "WR", 87, "RUSH", { mvp: true }), player("Pillow", 80, "WR", 82, "CB"),
    ]),
    team("NAA", "Noir Athletics Academy", "#56c87a", [player("Noir", 83, "QB", 82, "RUSH"), player("Buzzer", 90, "WR", 86, "CB")]),
  ]),
  season(4, [
    team("OB", "Ole Brunette", "#dd8f4e", [
      player("Yoboy", 87, "QB", 91, "CB"), player("Perko", 95, "WR", 98, "CB", { dpoy: true, mvp: true }),
      player("Blonde", 96, "WR", 88, "RUSH"), player("B45", 86, "WR", 87, "CB"),
    ]),
    team("ICE", "ICE", "#62d1df", [
      player("Rac", 90, "QB", 90, "CB"), player("Sawoo", 94, "WR", 91, "CB"),
      player("Kuhdd", 97, "WR", 85, "RUSH", { opoy: true }), player("CJ", 86, "WR", 89, "CB"),
    ]),
    team("NAA", "Noir Athletics Academy", "#56c87a", [player("Noir", 88, "QB", 87, "RUSH"), player("Buzzer", 90, "WR", 86, "CB")]),
    team("SUM", "Summrs Team", "#d46de2", [player("Summrs", 87, "WR", 83, "CB"), player("Ryan", 85, "WR", 85, "CB"), player("Pillow", 80, "WR", 79, "CB")]),
  ]),
  season(5, [
    team("NAA", "Noir Athletics Academy", "#56c87a", [
      player("Noir", 91, "QB", 90, "RUSH"), player("Kuhdd", 97, "WR", 92, "DB", { opoy: true }),
      player("Jude", 85, "WR", 88, "DB"), player("Ryan", 88, "WR", 89, "DB"),
    ], true),
    team("ICE", "ICE", "#62d1df", [
      player("Rac", 98, "QB", 90, "DB", { mvp: true }), player("Blonde", 93, "WR", 86, "RUSH"),
      player("Pillow", 82, "WR", 71, "DB"), player("Perko", 90, "WR", 96, "DB", { dpoy: true }),
    ]),
    team("CJSU", "CJ State University", "#4c9ff5", [
      player("CJ", 84, "WR", 83, "DB"), player("Sawoo", 92, "QB", 93, "DB"),
      player("Ladiesman", 79, "WR", 75, "RUSH"), player("Buzzer", 88, "WR", 84, "DB"),
    ]),
    team("YBT", "Yoboy Tech", "#a56fe8", [player("B45", 85, "WR", 88, "RUSH"), player("Summrs", 84, "WR", 84, "DB"), player("Yoboy", 83, "QB", 87, "DB")]),
  ]),
  season(6, [
    team("CJSU", "CJ State University", "#4c9ff5", [
      player("CJ", 99, "QB", 93, "DB", { mvp: true, sbMvp: true }), player("Perko", 94, "WR", 98, "DB"),
      player("Blonde", 95, "WR", 90, "RUSH"), player("KanYuri", 91, "WR", 82, "CB"),
    ], true),
  ]),
  season(8, [
    team("RLU", "Ryan Lomas University", "#8b71ff", [
      player("CJ", 96, "QB", 88, "DB", { sbMvp: true }), player("Ryan", 94, "WR", 90, "DB", { opoy: true }),
      player("Yoboy", 82, "WR", 82, "DB"), player("Kacper", 95, "WR", 91, "DB", { mvp: true }),
    ], true),
    team("NAA", "Noir Athletics Academy", "#56c87a", [
      player("Noir", 95, "QB", 87, "DB"), player("Pom", 85, "WR", 95, "RUSH", { dpoy: true }),
      player("Ladiesman", 81, "WR", 75, "RUSH"), player("Buzzer", 84, "WR", 85, "DB"),
    ]),
    team("SHIT", "Sawoo Hits In Practice", "#ef5851", [
      player("Sawoo", 92, "QB", 93, "DB"), player("B45", 87, "WR", 82, "DB"),
      player("Silus", 84, "WR", 84, "RUSH"), player("Epikees", 80, "WR", 80, "DB"),
    ]),
    team("LEP", "Leopards", "#f3a62d", [
      player("Bubby", 75, "QB", 89, "DB"), player("Rac", 90, "WR", 90, "DB"),
      player("Static", 88, "WR", 84, "DB"), player("Pillow", 87, "WR", 79, "RUSH"),
    ]),
  ]),
  season(9, [
    team("SHIT", "Sawoo Hits In Practice", "#ef5851", [
      player("Sawoo", 97, "QB", 94, "CB", { mvp: true }), player("Blonde", 97, "WR", 86, "CB", { opoy: true }),
      player("SKW", 95, "WR", 90, "CB"), player("Pomenmai", 87, "WR", 92, "RUSH"),
    ], true),
    team("RLU", "Ryan Lomas University", "#8b71ff", [player("CJ", 94, "QB", 90, "CB"), player("Ryan", 90, "WR", 88, "CB"), player("Yoboy", 84, "WR", 88, "CB"), player("Buzzer", 88, "WR", 85, "RUSH")]),
    team("NAU", "Not Ass University", "#e3774f", [player("Rac", 97, "QB", 93, "CB"), player("Kuhdd", 96, "WR", 90, "CB"), player("B45", 87, "WR", 91, "RUSH"), player("Goose", 82, "WR", 83, "RUSH")]),
    team("LEP", "Leopards", "#f3a62d", [player("Noir", 83, "WR", 84, "RUSH"), player("Bubby", 78, "QB", 80, "CB"), player("Static", 84, "WR", 83, "CB"), player("Pillow", 80, "WR", 81, "CB")]),
  ]),
  season(10, [
    team("AW", "Apple Warriors", "#f45b69", [player("CJ", 97, "QB", 93, "CB", { sbMvp: true }), player("Buzzer", 94, "WR", 93, "CB"), player("Jude", 87, "WR", 86, "CB"), player("Pillow", 83, "WR", 84, "RUSH")], true),
    team("YBT", "Yoboy Tech", "#a56fe8", [player("Yoboy", 80, "QB", 84, "CB"), player("Rac", 88, "QB", 88, "CB"), player("Kuhdd", 91, "WR", 85, "CB"), player("Ryan", 87, "WR", 83, "CB")]),
    team("B45J", "B45 Jets", "#55b38c", [player("B45", 88, "WR", 86, "CB"), player("Noir", 85, "QB", 83, "RUSH"), player("Kacper", 87, "WR", 84, "CB"), player("Blonde", 90, "WR", 83, "CB", { opoy: true })]),
    team("LEP", "Leopards", "#f3a62d", [player("Sawoo", 99, "QB", 96, "CB", { mvp: true, dpoy: true }), player("Bubby", 84, "WR", 87, "CB"), player("Static", 89, "WR", 88, "CB"), player("Rain", 79, "WR", 82, "RUSH")]),
  ]),
  season(13, [
    team("B45J", "B45 Jets", "#55b38c", [
      player("Sawoo", 99, "QB", 96, "DB", { mvp: true, dpoy: true, sbMvp: true }), player("B45", 85, "WR", 93, "RUSH"),
      player("Kira", 96, "WR", 93, "DB"), player("Jude", 83, "WR", 88, "DB"), player("KanYuri", 84, "WR", 85, "DB"),
    ], true),
    team("PUSSY", "Pussy", "#e868a2", [player("Pom", 84, "WR", 94, "RUSH"), player("Rac", 96, "QB", 94, "DB", { opoy: true }), player("Static", 88, "WR", 89, "DB"), player("Kuhdd", 94, "WR", 90, "DB"), player("Lucy", 82, "WR", 84, "DB")]),
    team("LEP", "Leopards", "#f3a62d", [player("Noir", 88, "WR", 85, "DB"), player("Ryan", 85, "WR", 87, "DB"), player("Thragg", 80, "QB", 79, "DB"), player("Ladiesman", 76, "WR", 77, "RUSH"), player("Kacper", 89, "WR", 91, "DB")]),
    team("CJSU", "CJ State University", "#4c9ff5", [player("Blonde", 90, "WR", 87, "RUSH"), player("CJ", 90, "QB", 86, "DB"), player("Pillow", 81, "WR", 76, "RUSH"), player("Yoboy", 80, "WR", 80, "DB"), player("Perko", 96, "WR", 90, "DB")]),
  ]),
  season(14, [
    team("CJSU", "CJ State University v3", "#4c9ff5", [player("CJ", 90, "QB", 88, "DB"), player("Kacper", 89, "WR", 90, "DB"), player("Goose", 72, "WR", 79, "RUSH"), player("Noir", 85, "WR", 85, "DB")]),
    team("LCU", "Last Chance University", "#d6604d", [player("Rac", 92, "QB", 93, "DB"), player("B45", 85, "WR", 84, "DB"), player("Blonde", 90, "WR", 87, "RUSH"), player("Lucy", 83, "WR", 82, "DB"), player("Kuhdd", 95, "WR", 89, "DB")]),
    team("ENG", "Energy Team", "#6d8ce8", [player("Energy", 80, "WR", 77, "DB"), player("Pom", 84, "WR", 90, "RUSH"), player("Pillow", 77, "WR", 78, "RUSH"), player("Thragg", 76, "QB", 84, "DB"), player("Kira", 97, "WR", 95, "DB", { opoy: true })]),
    team("SAW", "Team Sawoo", "#ef5851", [
      player("Sawoo", 98, "QB", 95, "DB", { mvp: true, dpoy: true, sbMvp: true }), player("KanYuri", 81, "WR", 84, "DB"),
      player("Ryan", 88, "WR", 89, "DB"), player("Yoboy", 81, "QB", 84, "DB", { altOffense: [{ position: "WR", rating: 82 }] }), player("Static", 89, "WR", 91, "DB"),
    ], true),
  ]),
  season(15, [
    team("B45J", "B45 Jets", "#55b38c", [player("Sawoo", 98, "QB", 94, "DB", { mvp: true, dpoy: true, sbMvp: true }), player("Kuhdd", 94, "WR", 89, "DB"), player("CJ", 88, "WR", 86, "DB"), player("Lucy", 80, "WR", 80, "DB"), player("B45", 82, "WR", 98, "RUSH")], true),
    team("PUSSY", "Pussy", "#e868a2", [
      player("Pom", 83, "WR", 84, "RUSH"), player("Energy", 82, "WR", 84, "DB"),
      // The supplied v1.03 roster line ended at "Statiq (90 WR,". Preserve the prior 89 DB value.
      player("Statiq", 90, "WR", 89, "DB"), player("Rac", 92, "QB", 93, "DB"), player("Yoboy", 83, "WR", 83, "DB"),
    ]),
    team("NAA", "Noir Athletics Academy", "#56c87a", [player("Noir", 94, "QB", 85, "DB"), player("Ryan", 94, "WR", 86, "DB", { opoy: true }), player("Blonde", 90, "WR", 84, "RUSH"), player("Kira", 94, "WR", 92, "DB")]),
    team("LEP", "Leopards", "#f3a62d", [player("Ladiesman", 80, "WR", 75, "RUSH"), player("Kacper", 90, "WR", 91, "DB"), player("Bubby", 74, "QB", 82, "DB"), player("Pillow", 80, "WR", 74, "RUSH"), player("Turbo", 70, "QB", 77, "RUSH"), player("Jude", 78, "WR", 83, "DB")]),
  ]),
  season(16, [
    team("CJSU", "CJ State University", "#4c9ff5", [player("CJ", 95, "QB", 95, "DB", { mvp: true, dpoy: true }), player("Blonde", 90, "WR", 92, "RUSH"), player("Kuhdd", 95, "WR", 90, "DB"), player("Energy", 85, "WR", 85, "DB"), player("Lucy", 82, "WR", 84, "DB")], true),
    team("RLU", "Ryan Lomas University", "#8b71ff", [player("Ryan", 85, "WR", 83, "DB"), player("Sawoo", 85, "QB", 90, "DB"), player("Pomenmai", 79, "WR", 86, "RUSH"), player("Pillow", 77, "WR", 70, "RUSH"), player("Ladiesman", 76, "WR", 75, "RUSH")]),
    team("B45J", "B45 Jets", "#55b38c", [player("B45", 98, "WR", 88, "CB", { opoy: true }), player("Racc", 87, "QB", 87, "CB"), player("Kacper", 93, "WR", 92, "CB"), player("Thragg", 82, "WR", 90, "RUSH")]),
    team("KFBS", "Kira's Female Boarding School", "#bd66c7", [player("Kira", 97, "WR", 93, "DB"), player("Noir", 91, "QB", 87, "DB"), player("Statiq", 89, "WR", 88, "DB"), player("Yoboy", 81, "WR", 80, "DB"), player("Turbo", 75, "WR", 79, "RUSH")]),
  ]),
  season(17, [
    team("CJSU", "CJ State University", "#4c9ff5", [player("CJ", 93, "QB", 90, "CB"), player("B45", 96, "WR", 88, "CB", { opoy: true }), player("Pom", 86, "WR", 88, "RUSH"), player("Blonde", 84, "WR", 84, "RUSH"), player("Perko", 97, "WR", 85, "DB")]),
    team("LEP", "Leopards", "#f3a62d", [player("Bubby", 88, "QB", 89, "CB"), player("Kira", 98, "WR", 88, "CB"), player("Energy", 85, "WR", 82, "CB"), player("Joker", 77, "WR", 76, "RUSH")]),
    team("ICE", "ICE", "#62d1df", [player("Rac", 91, "QB", 95, "CB", { mvp: true, dpoy: true }), player("Static", 86, "WR", 88, "CB"), player("Lucy", 87, "WR", 82, "CB"), player("Aki", 84, "WR", 79, "RUSH")]),
    team("NAA", "Noir Athletics Academy", "#56c87a", [player("Noir", 87, "QB", 86, "CB"), player("Shadow", 85, "WR", 80, "RUSH"), player("SKW", 94, "WR", 88, "CB"), player("Yoboy", 82, "WR", 84, "CB")]),
  ]),
];

// v1.03 keeps award traits exactly as supplied in the roster above.
const HISTORICAL_AWARDS = {};

const OFFENSE_POSITIONS = ["QB", "WR", "WR", "WR"];
const DEFENSE_POSITIONS = ["RUSH", "CB", "CB", "CB"];
const MVP_TEAM_OVR_BOOST = 2;
const OPOY_SIM_BOOST = 2.5;
const DPOY_SIM_BOOST = 2.5;
const CHAMPIONSHIP_PLAYOFF_BOOST = 0.04;
const SB_MVP_PLAYOFF_BOOST = 0.08;
const ACHIEVEMENT_STORAGE_KEY = "reb-achievements-v104"; // preserve v1.04 progress on the same origin
const THEME_STORAGE_KEY = "reb-theme-v1051";

const ACHIEVEMENTS = [
  { id: "championship", icon: "🏆", name: "Championship", description: "Win the RCAA Bowl." },
  { id: "missed_playoffs", icon: "🛋️", name: "Missed the Playoffs", description: "The joke award: finish the season below 3–3." },
  { id: "won_playoff", icon: "🔥", name: "Won a Playoff Game", description: "Win either a semifinal or the RCAA Bowl." },
  { id: "team_90", icon: "90", name: "90 OVR Team", description: "Build a team with a 90 or higher overall." },
  { id: "player_99", icon: "99", name: "Collected a 99", description: "Draft any player with a 99 offensive or defensive rating." },
  { id: "team_95", icon: "95", name: "95 OVR Team", description: "Build a truly elite 95 or higher overall roster." },
  { id: "perfect_team", icon: "★", name: "Perfect Possible Team", description: "Match the best roster possible from all of your rolls." },
  { id: "nightmare_championship", icon: "☠", name: "Nightmare Bowl Champion", description: "Win the RCAA Bowl in Nightmare Mode." },
  { id: "nightmare_legend", icon: "✦", name: "LEGENDARY: Nightmare Perfection", description: "Go 6–0 and win the RCAA Bowl in Nightmare Mode.", legendary: true },
];

let HISTORIC_TEAMS = [];
let TEAM_GOAT = null;

const state = {
  mode: "classic",
  drafted: [], currentResult: null, spinning: false, complete: false, rerollUsed: false, teamRerollUsed: false,
  detailSelection: null, rollHistory: [],
  lineups: { offense: [null, null, null, null], defense: [null, null, null, null] },
  selectedSlot: null, seasonResults: null, achievements: {}, toastQueue: [], toastShowing: false,
  fantasy: null,
  sandbox: { seasonNumber: null, teamCode: null },
  currentView: "home",
  returnView: "home",
};

const elements = Object.fromEntries([
  "eraTrack", "reelWindow", "reelSeason", "reelTeam", "reelTeamName", "spinButton", "spinButtonText",
  "rerollButton", "rerollCount", "teamRerollButton", "teamRerollCount", "statusLine", "marketEmpty", "marketContent", "marketMeta", "playerGrid",
  "pickNumber", "offenseSlots", "defenseSlots", "offenseScore", "defenseScore", "teamScore", "teamGrade",
  "swapHint", "resetButton", "rulesButton", "rulesDialog", "closeRulesButton", "playerDialog", "closePlayerButton",
  "profileImage", "profileImageFallback", "profileSeason", "profileTeam", "profileName", "profileTraits", "profileInfo",
  "profileOffense", "profileOffensePosition", "profileDefense", "profileDefensePosition", "profileDraftButton",
  "startSeasonButton", "finishOverlay", "finishGrade", "finishTitle", "finishSummary", "finishOffense", "finishDefense",
  "finishOverall", "finishTrait", "hindsightVerdict", "builtOverall", "perfectOverall", "overallDifference",
  "perfectLineup", "seasonBoost", "regularSeasonGames", "seasonStanding", "semifinalGame", "championshipGame",
  "simulateSeasonButton", "playAgainButton", "closeFinishButton", "game", "achievementsPage", "gameViewButton",
  "achievementsViewButton", "returnGameButton", "brandHome", "achievementCount", "achievementGrid", "achievementToast",
  "achievementToastName",
  "pickTotal", "modeSwitch", "classicModeButton", "iqModeButton", "benchModeButton", "nightmareModeButton", "fantasyModeButton", "onlineModeButton", "offenseFormation", "defenseFormation",
  "statCenter", "seasonStatSummary", "passingStats", "receivingStats", "defenseStats", "seasonAwards",
  "fantasyPage", "fantasyReturnButton", "fantasySpotButtons", "fantasyStartButton", "fantasySetup",
  "fantasyDraftRoom", "fantasyDraftStatus", "fantasyRoundLabel", "fantasyPickLabel", "fantasySearch",
  "fantasyPlayerBoard", "fantasyRosters", "fantasyDraftLog", "fantasySimButton", "fantasySeasonCenter",
  "fantasyStandings", "fantasySchedule", "fantasyPlayoffs", "fantasyChampion",
  "homePage", "onlinePage", "sandboxPage", "sandboxModeButton", "sandboxReturnButton", "sandboxSeasonList", "sandboxTeamList",
  "sandboxPlayerList", "sandboxRoster", "sandboxStatus", "sandboxClearButton", "sandboxStartButton", "gameModeEyebrow",
  "gameStatsDialog", "closeGameStatsButton", "gameStatsTitle", "gameStatsMeta", "gameStatsBody", "hindsightPanel", "themeToggleButton",
].map((id) => [id, document.querySelector(`#${id}`)]));

function loadTheme() {
  try { return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light"; }
  catch { return "light"; }
}

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  if (elements.themeToggleButton) {
    elements.themeToggleButton.textContent = next === "dark" ? "LIGHT MODE" : "DARK MODE";
    elements.themeToggleButton.setAttribute("aria-label", `Switch to ${next === "dark" ? "light" : "dark"} mode`);
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#050907" : "#f4f8ff");
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch {}
}

function player(name, offenseRating, offensePosition, defenseRating, defensePosition, traits = {}) {
  const { altOffense = [], ...awardTraits } = traits;
  return {
    name,
    offense: { position: offensePosition, rating: offenseRating },
    offenseAlternates: altOffense,
    defense: { position: defensePosition, rating: defenseRating },
    traits: awardTraits,
  };
}

function team(code, name, color, players, champion = false) {
  return { code, name, color, players, champion };
}

function season(number, teams) { return { number, teams }; }

function init() {
  state.achievements = loadAchievements();
  applyTheme(loadTheme());
  HISTORIC_TEAMS = buildHistoricTeamPool();
  TEAM_GOAT = buildTeamGoat();
  renderEraTrack();
  renderRoster();
  renderAchievements();
  updateActionButtons();

  elements.spinButton.addEventListener("click", () => spin());
  elements.rerollButton.addEventListener("click", () => spin({ isReroll: true }));
  elements.teamRerollButton.addEventListener("click", () => spin({ isTeamReroll: true }));
  elements.resetButton.addEventListener("click", resetGame);
  elements.startSeasonButton.addEventListener("click", showSeasonCenter);
  elements.simulateSeasonButton.addEventListener("click", simulateSeason);
  elements.rulesButton.addEventListener("click", () => elements.rulesDialog.showModal());
  elements.themeToggleButton.addEventListener("click", toggleTheme);
  elements.closeRulesButton.addEventListener("click", () => elements.rulesDialog.close());
  elements.closePlayerButton.addEventListener("click", () => elements.playerDialog.close());
  elements.profileDraftButton.addEventListener("click", draftFromProfile);
  elements.playAgainButton.addEventListener("click", resetGame);
  elements.closeFinishButton.addEventListener("click", () => { elements.finishOverlay.hidden = true; });
  elements.gameViewButton.addEventListener("click", showHome);
  elements.achievementsViewButton.addEventListener("click", () => showView("achievements"));
  elements.nightmareModeButton.addEventListener("click", () => switchModeFromNav("nightmare"));
  elements.classicModeButton.addEventListener("click", () => switchModeFromNav("classic"));
  elements.iqModeButton.addEventListener("click", () => switchModeFromNav("iq"));
  elements.benchModeButton.addEventListener("click", () => switchModeFromNav("bench"));
  elements.fantasyModeButton.addEventListener("click", () => switchModeFromNav("fantasy"));
  elements.onlineModeButton.addEventListener("click", () => switchModeFromNav("online"));
  elements.sandboxModeButton.addEventListener("click", () => switchModeFromNav("sandbox"));
  elements.fantasyReturnButton.addEventListener("click", showHome);
  elements.fantasyStartButton.addEventListener("click", startFantasyDraft);
  elements.fantasySearch.addEventListener("input", renderFantasyBoard);
  elements.fantasySimButton.addEventListener("click", simulateFantasySeason);
  elements.fantasySpotButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-spot]");
    if (!button) return;
    selectFantasySpot(Number(button.dataset.spot));
  });
  elements.returnGameButton.addEventListener("click", returnFromAchievements);
  elements.sandboxReturnButton.addEventListener("click", showHome);
  elements.sandboxClearButton.addEventListener("click", clearSandboxRoster);
  elements.sandboxStartButton.addEventListener("click", startSandboxSeason);
  elements.sandboxSeasonList.addEventListener("click", handleSandboxSeasonClick);
  elements.sandboxTeamList.addEventListener("click", handleSandboxTeamClick);
  elements.sandboxPlayerList.addEventListener("click", handleSandboxPlayerClick);
  elements.sandboxRoster.addEventListener("click", handleSandboxRosterClick);
  elements.regularSeasonGames.addEventListener("click", handleRegularSeasonGameClick);
  elements.closeGameStatsButton.addEventListener("click", () => elements.gameStatsDialog.close());
  elements.homePage.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-enter-mode]");
    if (button) enterMode(button.dataset.enterMode);
  });
  elements.brandHome.addEventListener("click", (event) => { event.preventDefault(); showHome(); });

  [elements.rulesDialog, elements.playerDialog, elements.gameStatsDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  });

  showHome(false);

  window.addEventListener("keydown", (event) => {
    const modalOpen = elements.rulesDialog.open || elements.playerDialog.open || !elements.finishOverlay.hidden;
    if (event.code === "Space" && !isInteractiveTarget(event.target) && !modalOpen && !elements.game.hidden) {
      event.preventDefault();
      spin();
    }
    if (event.code === "Escape" && !elements.finishOverlay.hidden) elements.finishOverlay.hidden = true;
  });
}

function draftSize() { return state.mode === "bench" ? 5 : 4; }
function lineupPositions(side) {
  const starters = side === "offense" ? OFFENSE_POSITIONS : DEFENSE_POSITIONS;
  return state.mode === "bench" ? [...starters, "BENCH"] : starters;
}

function setMode(mode, { force = false } = {}) {
  if (!force && (state.drafted.length || state.spinning || state.currentResult || state.seasonResults)) return false;
  state.mode = mode;
  state.lineups = { offense: Array(draftSize()).fill(null), defense: Array(draftSize()).fill(null) };
  syncModeNav();
  document.body.classList.toggle("nightmare-mode", mode === "nightmare");
  elements.pickTotal.textContent = draftSize();
  elements.offenseFormation.textContent = mode === "bench" ? "1 QB · 3 WR · 1 BENCH" : "1 QB · 3 WR";
  elements.defenseFormation.textContent = mode === "bench" ? "1 RUSH · 3 CB · 1 BENCH" : "1 RUSH · 3 CB";
  const modeCopy = {
    classic: ["STANDARD MODE", "Roll a season and team, then choose one player."],
    iq: ["RCAA IQ MODE", "Names, teams, and player photos are visible. Ratings and positions reveal only after you draft."],
    bench: ["BENCH MODE", "Draft five players, then choose four starters on each side."],
    nightmare: ["NIGHTMARE MODE", "No rerolls. Elite rolls are removed. TEAM GOAT waits in the Bowl."],
    sandbox: ["SANDBOX MODE", "Browse any season and team directly."],
  };
  const copy = modeCopy[mode] || modeCopy.classic;
  elements.gameModeEyebrow.textContent = copy[0];
  elements.statusLine.textContent = copy[1];
  renderRoster();
  updateActionButtons();
  return true;
}

function syncModeNav() {
  elements.classicModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "classic");
  elements.iqModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "iq");
  elements.benchModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "bench");
  elements.nightmareModeButton.classList.toggle("active", state.currentView === "game" && state.mode === "nightmare");
  elements.fantasyModeButton.classList.toggle("active", state.currentView === "fantasy");
  elements.onlineModeButton.classList.toggle("active", state.currentView === "online");
  elements.sandboxModeButton.classList.toggle("active", state.currentView === "sandbox");
}

function hasActiveRun() {
  return Boolean(state.drafted.length || state.spinning || state.currentResult || state.seasonResults || state.fantasy?.started);
}

function resetCoreRunState() {
  state.drafted = [];
  state.currentResult = null;
  state.spinning = false;
  state.complete = false;
  state.rerollUsed = false;
  state.teamRerollUsed = false;
  state.detailSelection = null;
  state.rollHistory = [];
  state.lineups = { offense: Array(draftSize()).fill(null), defense: Array(draftSize()).fill(null) };
  state.selectedSlot = null;
  state.seasonResults = null;
}

function switchModeFromNav(mode) {
  if ((mode === "fantasy" && state.currentView === "fantasy") || (mode === "online" && state.currentView === "online") || (mode === "sandbox" && state.currentView === "sandbox") || (state.currentView === "game" && state.mode === mode)) return;
  if (hasActiveRun() && !window.confirm("Switch modes? Your current run will reset.")) return;
  resetCoreRunState();
  if (state.fantasy?.started) resetFantasyMode();
  enterMode(mode, { reset: false });
}

function enterMode(mode, { reset = true } = {}) {
  if (reset) {
    resetCoreRunState();
    if (state.fantasy?.started) resetFantasyMode();
  }
  elements.homePage.hidden = true;
  elements.achievementsPage.hidden = true;
  elements.modeSwitch.hidden = false;
  elements.gameViewButton.classList.remove("active");
  elements.achievementsViewButton.classList.remove("active");
  if (mode === "fantasy") { openFantasyMode(true); return; }
  if (mode === "online") { openMultiplayerMode(); return; }
  if (mode === "sandbox") { openSandboxMode(); return; }
  elements.fantasyPage.hidden = true;
  elements.onlinePage.hidden = true;
  elements.sandboxPage.hidden = true;
  elements.game.hidden = false;
  state.currentView = "game";
  setMode(mode, { force: true });
  resetGame({ stayInMode: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome(scroll = true) {
  elements.finishOverlay.hidden = true;
  if (elements.playerDialog.open) elements.playerDialog.close();
  if (elements.gameStatsDialog.open) elements.gameStatsDialog.close();
  elements.homePage.hidden = false;
  elements.game.hidden = true;
  elements.fantasyPage.hidden = true;
  elements.onlinePage.hidden = true;
  elements.sandboxPage.hidden = true;
  elements.achievementsPage.hidden = true;
  elements.modeSwitch.hidden = true;
  elements.gameViewButton.classList.add("active");
  elements.achievementsViewButton.classList.remove("active");
  state.currentView = "home";
  document.body.classList.remove("nightmare-mode", "fantasy-mode", "online-mode", "sandbox-mode", "online-mode");
  syncModeNav();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function isInteractiveTarget(target) {
  return target instanceof HTMLElement && ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function showView(view) {
  if (view === "home") { showHome(); return; }
  if (view === "achievements") {
    state.returnView = state.currentView === "achievements" ? state.returnView : state.currentView;
    elements.homePage.hidden = true;
    elements.game.hidden = true;
    elements.fantasyPage.hidden = true;
    elements.onlinePage.hidden = true;
    elements.sandboxPage.hidden = true;
    elements.achievementsPage.hidden = false;
    elements.modeSwitch.hidden = false;
    elements.gameViewButton.classList.remove("active");
    elements.achievementsViewButton.classList.add("active");
    state.currentView = "achievements";
    document.body.classList.remove("nightmare-mode", "fantasy-mode", "online-mode", "sandbox-mode", "online-mode");
    syncModeNav();
    renderAchievements();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  enterMode(state.mode || "classic", { reset: false });
}

function returnFromAchievements() {
  const target = state.returnView || "home";
  if (target === "game") {
    elements.homePage.hidden = true;
    elements.game.hidden = false;
    elements.fantasyPage.hidden = true;
    elements.onlinePage.hidden = true;
    elements.sandboxPage.hidden = true;
    elements.achievementsPage.hidden = true;
    elements.modeSwitch.hidden = false;
    elements.gameViewButton.classList.remove("active");
    elements.achievementsViewButton.classList.remove("active");
    state.currentView = "game";
    document.body.classList.toggle("nightmare-mode", state.mode === "nightmare");
    document.body.classList.remove("fantasy-mode", "sandbox-mode");
    syncModeNav();
  } else if (target === "fantasy") {
    openFantasyMode(true);
  } else if (target === "online") {
    openMultiplayerMode();
  } else if (target === "sandbox") {
    openSandboxMode();
  } else {
    showHome();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderEraTrack(activeSeason = null) {
  elements.eraTrack.innerHTML = Array.from({ length: 17 }, (_, index) => {
    const number = index + 1;
    const loaded = SEASONS.some((entry) => entry.number === number);
    const active = number === activeSeason;
    return `<span class="era-chip${loaded ? " loaded" : ""}${active ? " active" : ""}" title="Season ${number}${loaded ? " — active" : " — ratings needed"}">${number}</span>`;
  }).join("");
}

function randomItem(items) { return items[Math.floor(Math.random() * items.length)]; }

const NIGHTMARE_EXCLUSIONS = new Set(["6-CJSU", "10-LEP", "2-KYS", "4-OB"]);

function teamAllowedInMode(seasonEntry, teamEntry) {
  return state.mode !== "nightmare" || !NIGHTMARE_EXCLUSIONS.has(`${seasonEntry.number}-${teamEntry.code}`);
}

function teamHasAvailablePlayer(seasonEntry, teamEntry) {
  return teamEntry.players.some((candidate) => {
    const key = createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name);
    return !state.drafted.some((drafted) => drafted.key === key);
  });
}

function availableSeasons(excludedSeason = null) {
  return SEASONS
    .filter((entry) => entry.number !== excludedSeason)
    .map((entry) => ({
      ...entry,
      teams: entry.teams.filter((teamEntry) => teamAllowedInMode(entry, teamEntry) && teamHasAvailablePlayer(entry, teamEntry)),
    }))
    .filter((entry) => entry.teams.length > 0);
}

function teamRerollChoices(result = state.currentResult) {
  if (!result || state.mode === "nightmare") return [];
  const seasonEntry = SEASONS.find((entry) => entry.number === result.season.number);
  if (!seasonEntry) return [];
  return seasonEntry.teams.filter((teamEntry) =>
    teamEntry.code !== result.team.code && teamAllowedInMode(seasonEntry, teamEntry) && teamHasAvailablePlayer(seasonEntry, teamEntry));
}

async function spin({ isReroll = false, isTeamReroll = false } = {}) {
  if (state.spinning || state.complete || (!isReroll && !isTeamReroll && state.currentResult)) return;
  if ((isReroll || isTeamReroll) && state.mode === "nightmare") return;
  if (isReroll && (!state.currentResult || state.rerollUsed)) return;
  if (isTeamReroll && (!state.currentResult || state.teamRerollUsed || !teamRerollChoices().length)) return;

  const previousResult = state.currentResult;
  if (isReroll) { state.rerollUsed = true; state.currentResult = null; }
  if (isTeamReroll) { state.teamRerollUsed = true; state.currentResult = null; }

  let finalSeason;
  let finalTeam;
  if (isTeamReroll) {
    finalSeason = SEASONS.find((entry) => entry.number === previousResult.season.number);
    finalTeam = randomItem(teamRerollChoices(previousResult));
  } else {
    let eligibleSeasons = availableSeasons(isReroll ? previousResult.season.number : null);
    if (!eligibleSeasons.length) eligibleSeasons = availableSeasons();
    finalSeason = randomItem(eligibleSeasons);
    finalTeam = randomItem(finalSeason.teams);
  }

  if (!finalSeason || !finalTeam) return;
  state.spinning = true;
  updateActionButtons();
  elements.spinButtonText.textContent = isTeamReroll ? "REROLLING TEAM" : isReroll ? "REROLLING" : "SPINNING";
  elements.reelWindow.classList.add("spinning");
  elements.marketEmpty.hidden = false;
  elements.marketContent.hidden = true;
  elements.statusLine.textContent = isTeamReroll ? `Staying in Season ${finalSeason.number} and rerolling the team…` : isReroll ? "Using your Era + Team reroll…" : "Traveling through RCAA history…";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ticks = reduceMotion ? 1 : 21;
  for (let index = 0; index < ticks; index += 1) {
    let sampleSeason;
    let sampleTeam;
    if (index === ticks - 1) {
      sampleSeason = finalSeason; sampleTeam = finalTeam;
    } else if (isTeamReroll) {
      sampleSeason = finalSeason;
      const samples = finalSeason.teams.filter((teamEntry) => teamAllowedInMode(finalSeason, teamEntry));
      sampleTeam = randomItem(samples);
    } else {
      const samples = state.mode === "nightmare" ? availableSeasons() : SEASONS;
      sampleSeason = randomItem(samples);
      const teams = state.mode === "nightmare" ? sampleSeason.teams : sampleSeason.teams;
      sampleTeam = randomItem(teams);
    }
    updateReel(sampleSeason, sampleTeam);
    await delay(reduceMotion ? 0 : 48 + index * 4);
  }

  state.currentResult = { season: finalSeason, team: finalTeam };
  state.rollHistory.push({ pickIndex: state.drafted.length, season: finalSeason, team: finalTeam, isReroll, isTeamReroll });
  state.spinning = false;
  elements.reelWindow.classList.remove("spinning");
  elements.spinButtonText.textContent = "TEAM ON THE BOARD";
  if (state.mode === "nightmare") {
    elements.statusLine.textContent = `Season ${finalSeason.number} ${finalTeam.name} is on the board. Nightmare Mode: no rerolls.`;
  } else {
    const options = [];
    if (!state.rerollUsed) options.push("Era + Team reroll");
    if (!state.teamRerollUsed && teamRerollChoices().length) options.push("Team reroll");
    elements.statusLine.textContent = `Season ${finalSeason.number} ${finalTeam.name} is on the board. Choose one player${options.length ? ` or use ${options.join(" / ")}.` : "."}`;
  }
  renderMarket();
  updateActionButtons();
}

function updateReel(seasonEntry, teamEntry) {
  elements.reelSeason.textContent = seasonEntry.number;
  elements.reelTeam.textContent = teamEntry.code;
  elements.reelTeamName.textContent = `${teamEntry.name}${teamEntry.champion ? " • CHAMPIONS" : ""}`.toUpperCase();
  renderEraTrack(seasonEntry.number);
}

function updateActionButtons() {
  elements.spinButton.disabled = state.spinning || state.complete || Boolean(state.currentResult);
  const nightmare = state.mode === "nightmare";
  elements.rerollButton.disabled = nightmare || state.spinning || state.complete || !state.currentResult || state.rerollUsed;
  elements.rerollCount.textContent = nightmare ? "OFF" : state.rerollUsed ? "USED" : "1 / 1";
  elements.teamRerollButton.disabled = nightmare || state.spinning || state.complete || !state.currentResult || state.teamRerollUsed || !teamRerollChoices().length;
  elements.teamRerollCount.textContent = nightmare ? "OFF" : state.teamRerollUsed ? "USED" : !state.currentResult ? "1 / 1" : teamRerollChoices().length ? "1 / 1" : "N/A";
  // v1.052 keeps mode navigation available at all times; switching an active run asks before resetting.
  elements.classicModeButton.disabled = false;
  elements.iqModeButton.disabled = false;
  elements.benchModeButton.disabled = false;
  elements.nightmareModeButton.disabled = false;
  elements.fantasyModeButton.disabled = false;
  elements.sandboxModeButton.disabled = false;
}

function delay(milliseconds) { return new Promise((resolve) => window.setTimeout(resolve, milliseconds)); }

function renderMarket() {
  const { season: seasonEntry, team: teamEntry } = state.currentResult;
  elements.marketEmpty.hidden = true;
  elements.marketContent.hidden = false;
  const historic = getHistoricTeam(seasonEntry.number, teamEntry.code);
  const historicMeta = state.mode === "iq"
    ? " · RATINGS HIDDEN"
    : historic ? ` · TEAM OVR ${historic.overall} · ${historic.category.toUpperCase()}` : "";
  elements.marketMeta.textContent = `SEASON ${seasonEntry.number} · ${teamEntry.code}${teamEntry.champion ? " · 🏆 CHAMPIONS" : ""}${historicMeta}`;
  elements.playerGrid.innerHTML = "";
  teamEntry.players.forEach((candidate) => {
    const key = createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name);
    const alreadyDrafted = state.drafted.some((drafted) => drafted.key === key);
    const card = document.createElement("article");
    card.className = `player-card${alreadyDrafted ? " unavailable" : ""}`;
    card.style.setProperty("--team-color", teamEntry.color);
    const traits = getPlayerTraits(candidate, teamEntry);
    const details = getPlayerDetails(candidate, seasonEntry, teamEntry);
    const iqHidden = state.mode === "iq" && !alreadyDrafted;
    const photo = details.image
      ? `<img src="${escapeHtml(details.image)}" alt="${escapeHtml(candidate.name)}" loading="lazy" onerror="this.remove();this.parentElement.textContent='${escapeHtml(initials(candidate.name))}'">`
      : escapeHtml(initials(candidate.name));
    const traitMarkup = iqHidden
      ? `<span class="trait-mini iq-lock">IQ</span>`
      : traits.map((trait) => `<span class="trait-mini">${trait.short}</span>`).join("");
    const ratingsMarkup = iqHidden
      ? `<div class="rating-pair iq-hidden-stats">${hiddenRatingBox("OFF")}${hiddenRatingBox("DEF")}</div>`
      : `<div class="rating-pair">${ratingBox("OFF", { ...candidate.offense, alternates: candidate.offenseAlternates })}${ratingBox("DEF", candidate.defense)}</div>`;
    card.innerHTML = `
      <button class="player-preview${iqHidden ? " iq-blind" : ""}" type="button" aria-label="View ${escapeHtml(candidate.name)} player card">
        <div class="card-stripe"></div>
        <div class="pick-photo">${photo}</div>
        <div class="card-main">
          <div class="card-name-row"><h3>${escapeHtml(candidate.name)}</h3><span class="mini-traits">${traitMarkup}</span></div>
          ${ratingsMarkup}
          <span class="card-hint">${iqHidden ? "IDENTITY ONLY · DRAFT TO REVEAL STATS" : "VIEW PLAYER CARD"}</span>
        </div>
      </button>
      <button class="draft-label" type="button" ${alreadyDrafted ? "disabled" : ""}>${alreadyDrafted ? "ALREADY DRAFTED" : state.mode === "iq" ? "LOCK IN & REVEAL" : "DRAFT PLAYER"}</button>`;
    card.querySelector(".player-preview").addEventListener("click", () => openPlayerCard(candidate, seasonEntry, teamEntry));
    card.querySelector(".draft-label").addEventListener("click", () => draftPlayer(candidate, seasonEntry, teamEntry));
    elements.playerGrid.appendChild(card);
  });
}

function ratingBox(side, unit) {
  const alternates = side === "OFF" && unit.alternates?.length
    ? ` / ${unit.alternates.map((entry) => `${entry.rating} ${entry.position}`).join(" / ")}`
    : "";
  return `<div class="rating-box"><span>${side}</span><strong>${unit.rating}</strong><small>${unit.position}${alternates}</small></div>`;
}

function hiddenRatingBox(side) {
  return `<div class="rating-box hidden-rating"><span>${side}</span><strong>??</strong><small>POSITION HIDDEN</small></div>`;
}

function getPlayerTraits(candidate, teamEntry) {
  const traits = [];
  if (teamEntry.champion) traits.push({ name: "Championship", short: "CHAMP" });
  if (candidate.traits.mvp) traits.push({ name: "MVP", short: "MVP" });
  if (candidate.traits.opoy) traits.push({ name: "Offensive Player of the Year", short: "OPOY" });
  if (candidate.traits.dpoy) traits.push({ name: "Defensive Player of the Year", short: "DPOY" });
  if (candidate.traits.sbMvp) traits.push({ name: "Super Bowl MVP", short: "SB MVP" });
  return traits;
}

function getPlayerDetails(candidate, seasonEntry, teamEntry) {
  // v1.052: every historical player version has an exact, independently editable card.
  const exact = PLAYER_CARDS[createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name)];
  return exact || {};
}

function openPlayerCard(candidate, seasonEntry, teamEntry) {
  state.detailSelection = { player: candidate, season: seasonEntry, team: teamEntry };
  const key = createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name);
  const details = getPlayerDetails(candidate, seasonEntry, teamEntry);
  const traits = getPlayerTraits(candidate, teamEntry);
  const alreadyDrafted = state.drafted.some((drafted) => drafted.key === key);
  elements.profileSeason.textContent = `SEASON ${seasonEntry.number}`;
  elements.profileTeam.textContent = `${teamEntry.name} · ${teamEntry.code}`;
  elements.profileName.textContent = candidate.name;
  const iqHidden = state.mode === "iq" && !alreadyDrafted;
  if (iqHidden) {
    elements.profileTraits.innerHTML = `<span class="trait-badge iq-hidden-badge">RCAA IQ · HIDDEN</span>`;
    elements.profileInfo.textContent = "Ratings, positions, awards, and the player bio reveal after you officially draft this player.";
    elements.profileOffense.textContent = "??";
    elements.profileOffensePosition.textContent = "POSITION HIDDEN";
    elements.profileDefense.textContent = "??";
    elements.profileDefensePosition.textContent = "POSITION HIDDEN";
  } else {
    elements.profileTraits.innerHTML = traits.map((trait) => `<span class="trait-badge">${trait.name}</span>`).join("");
    elements.profileInfo.textContent = details.bio || "Player profile coming soon. Edit this version in the PLAYER_CARDS section at the top of app.js.";
    elements.profileOffense.textContent = candidate.offense.rating;
    elements.profileOffensePosition.textContent = [candidate.offense, ...(candidate.offenseAlternates || [])]
      .map((unit) => `${unit.position}${unit === candidate.offense ? "" : ` ${unit.rating}`}`).join(" / ");
    elements.profileDefense.textContent = candidate.defense.rating;
    elements.profileDefensePosition.textContent = candidate.defense.position;
  }
  elements.profileDraftButton.disabled = alreadyDrafted;
  elements.profileDraftButton.textContent = alreadyDrafted ? "ALREADY DRAFTED" : iqHidden ? "DRAFT & REVEAL" : "DRAFT PLAYER";
  if (details.image) {
    elements.profileImage.src = details.image;
    elements.profileImage.alt = `${candidate.name} player image`;
    elements.profileImage.hidden = false;
    elements.profileImageFallback.hidden = true;
    elements.profileImage.onerror = () => showProfileFallback(candidate.name);
  } else {
    showProfileFallback(candidate.name);
  }
  elements.playerDialog.showModal();
}

function showProfileFallback(name) {
  elements.profileImage.removeAttribute("src");
  elements.profileImage.hidden = true;
  elements.profileImageFallback.hidden = false;
  elements.profileImageFallback.textContent = initials(name);
}

function draftFromProfile() {
  if (!state.detailSelection) return;
  const selection = state.detailSelection;
  elements.playerDialog.close();
  draftPlayer(selection.player, selection.season, selection.team);
}

function draftPlayer(candidate, seasonEntry, teamEntry) {
  if (!state.currentResult || state.drafted.length >= draftSize()) return;
  const key = createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name);
  if (state.drafted.some((drafted) => drafted.key === key)) return;
  state.drafted.push({
    ...candidate, season: seasonEntry.number, teamCode: teamEntry.code, teamName: teamEntry.name,
    championship: Boolean(teamEntry.champion), key,
  });
  state.currentResult = null;
  state.selectedSlot = null;
  autoArrangeLineups();
  elements.marketContent.hidden = true;
  elements.marketEmpty.hidden = false;
  elements.marketEmpty.querySelector("h2").textContent = "PICK LOCKED IN";
  elements.marketEmpty.querySelector("p").textContent = state.mode === "iq"
    ? `${candidate.name} is locked in. Their ratings and positions are now revealed in your lineup.`
    : `${candidate.name} joins your two-way roster${teamEntry.champion ? " with the Championship trait" : ""}.`;
  elements.startSeasonButton.hidden = true;
  renderRoster();
  if (Math.max(candidate.offense.rating, candidate.defense.rating) === 99) unlockAchievement("player_99");

  if (state.drafted.length === draftSize()) {
    state.complete = true;
    elements.pickNumber.textContent = String(draftSize());
    elements.spinButtonText.textContent = "DRAFT COMPLETE";
    elements.marketEmpty.querySelector("h2").textContent = "ROSTER COMPLETE";
    elements.marketEmpty.querySelector("p").textContent = state.mode === "bench"
      ? "Set four starters and one bench player on each side, then begin the six-game season."
      : "Set your final lineup on the right, then begin the six-game season.";
    elements.startSeasonButton.hidden = false;
    elements.statusLine.textContent = "Your roster is complete. Swap lineup slots or start the season.";
    evaluateDraftAchievements();
  } else {
    elements.pickNumber.textContent = String(state.drafted.length + 1);
    elements.spinButtonText.textContent = "SPIN NEXT PICK";
    elements.statusLine.textContent = state.mode === "iq"
      ? `${candidate.name} drafted from Season ${seasonEntry.number} ${teamEntry.code}. Stats revealed — roll your next pick.`
      : `${candidate.name} drafted from Season ${seasonEntry.number} ${teamEntry.code}.`;
  }
  updateActionButtons();
}

function createPlayerKey(seasonNumber, teamCode, name) { return `${seasonNumber}-${teamCode}-${name}`.toLowerCase(); }
function initials(name) { return name.split(/\s+/).map((part) => part[0]).join("").slice(0, 3).toUpperCase(); }

function permutations(items) {
  if (items.length <= 1) return [items];
  return items.flatMap((item, index) => {
    const rest = [...items.slice(0, index), ...items.slice(index + 1)];
    return permutations(rest).map((permutation) => [item, ...permutation]);
  });
}

function isNaturalPosition(natural, target) {
  return natural === target || (target === "CB" && natural === "DB");
}

function positionValue(candidate, side, targetPosition) {
  const units = side === "offense" ? [candidate.offense, ...(candidate.offenseAlternates || [])] : [candidate.defense];
  if (targetPosition === "BENCH") return { rating: 0, fit: "bench", multiplier: 0, naturalPosition: units[0].position };
  const natural = units.filter((unit) => isNaturalPosition(unit.position, targetPosition)).sort((a, b) => b.rating - a.rating)[0];
  if (natural) return { rating: natural.rating, fit: "natural", multiplier: 1, naturalPosition: natural.position };

  const source = [...units].sort((a, b) => b.rating - a.rating)[0];
  let multiplier = 0.75;
  if (side === "offense" && source.position === "QB" && targetPosition === "WR") multiplier = 0.95;
  if (side === "offense" && source.position === "WR" && targetPosition === "QB") multiplier = 0.5;
  if (side === "defense" && source.position === "RUSH" && targetPosition === "CB") multiplier = 0.92;
  if (side === "defense" && ["CB", "DB"].includes(source.position) && targetPosition === "RUSH") multiplier = 0.92;
  return {
    rating: Math.round(source.rating * multiplier),
    fit: multiplier === 0.5 ? "severe" : "oop",
    multiplier,
    naturalPosition: source.position,
  };
}

function optimizeLineup(players, side, positions) {
  if (!players.length) return [];
  const openPositions = positions.slice(0, players.length);
  let best = null;
  permutations(players).forEach((order) => {
    const entries = order.map((candidate, index) => ({
      player: candidate, position: openPositions[index], slotIndex: index,
      ...positionValue(candidate, side, openPositions[index]),
    }));
    const naturalCount = entries.filter((entry) => entry.fit === "natural").length;
    const total = entries.reduce((sum, entry) => sum + entry.rating, 0);
    const awardTotal = entries.reduce((sum, entry) => {
      if (entry.position === "BENCH") return sum;
      if (side === "offense" && entry.player.traits?.opoy) return sum + OPOY_SIM_BOOST;
      if (side === "defense" && entry.player.traits?.dpoy) return sum + DPOY_SIM_BOOST;
      return sum;
    }, 0);
    const simulationTotal = total + awardTotal;
    if (!best || naturalCount > best.naturalCount || (naturalCount === best.naturalCount && simulationTotal > best.simulationTotal) || (naturalCount === best.naturalCount && simulationTotal === best.simulationTotal && total > best.total)) {
      best = { entries, naturalCount, total, simulationTotal };
    }
  });
  return best.entries;
}

function autoArrangeLineups() {
  state.lineups.offense = padLineup(optimizeLineup(state.drafted, "offense", lineupPositions("offense")).map((entry) => entry.player.key));
  state.lineups.defense = padLineup(optimizeLineup(state.drafted, "defense", lineupPositions("defense")).map((entry) => entry.player.key));
}

function padLineup(keys) { return [...keys, ...Array(Math.max(0, draftSize() - keys.length)).fill(null)]; }

function lineupEntries(side) {
  const positions = lineupPositions(side);
  return state.lineups[side].map((key, index) => {
    if (!key) return null;
    const candidate = state.drafted.find((drafted) => drafted.key === key);
    return { player: candidate, position: positions[index], slotIndex: index, ...positionValue(candidate, side, positions[index]) };
  });
}

function metricsForPlayers(players) {
  const offensePositions = players.length > 4 ? [...OFFENSE_POSITIONS, "BENCH"] : OFFENSE_POSITIONS;
  const defensePositions = players.length > 4 ? [...DEFENSE_POSITIONS, "BENCH"] : DEFENSE_POSITIONS;
  const offense = optimizeLineup(players, "offense", offensePositions);
  const defense = optimizeLineup(players, "defense", defensePositions);
  return calculateMetrics(offense, defense, players);
}

function getTeamMetrics() {
  return calculateMetrics(lineupEntries("offense").filter(Boolean), lineupEntries("defense").filter(Boolean), state.drafted);
}

function calculateMetrics(offense, defense, players) {
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
    overall: rawOverall === null ? null : Math.min(99, rawOverall + mvpBonus),
    offenseSimRating: offenseAverage + mvpBonus + opoyPlayers * OPOY_SIM_BOOST,
    defenseSimRating: defenseAverage + mvpBonus + dpoyPlayers * DPOY_SIM_BOOST,
    championshipPlayers: players.filter((candidate) => candidate.championship).length,
    sbMvpPlayers: players.filter((candidate) => candidate.traits?.sbMvp).length,
  };
}


function combinationsOf(items, size) {
  const results = [];
  function visit(start, chosen) {
    if (chosen.length === size) { results.push([...chosen]); return; }
    for (let index = start; index <= items.length - (size - chosen.length); index += 1) {
      chosen.push(items[index]);
      visit(index + 1, chosen);
      chosen.pop();
    }
  }
  visit(0, []);
  return results;
}

function annotateHistoricPlayer(candidate, seasonEntry, teamEntry) {
  return {
    ...candidate,
    season: seasonEntry.number,
    teamCode: teamEntry.code,
    teamName: teamEntry.name,
    championship: Boolean(teamEntry.champion),
    key: createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name),
  };
}

function isCompleteNaturalFour(players) {
  if (players.length !== 4) return false;
  const offense = optimizeLineup(players, "offense", OFFENSE_POSITIONS);
  const defense = optimizeLineup(players, "defense", DEFENSE_POSITIONS);
  return offense.length === 4 && defense.length === 4
    && offense.every((entry) => entry.fit === "natural")
    && defense.every((entry) => entry.fit === "natural");
}

function bestHistoricStartingFour(seasonEntry, teamEntry) {
  if (teamEntry.players.length < 4) return null;
  const annotated = teamEntry.players.map((candidate) => annotateHistoricPlayer(candidate, seasonEntry, teamEntry));
  let best = null;
  combinationsOf(annotated, 4).forEach((group) => {
    if (!isCompleteNaturalFour(group)) return;
    const metrics = metricsForPlayers(group);
    const simOverall = (metrics.offenseSimRating + metrics.defenseSimRating) / 2;
    const quality = metrics.overall * 100 + simOverall;
    if (!best || quality > best.quality) best = { players: group, metrics, simOverall, quality };
  });
  return best;
}

function historicCategory(overall) {
  if (overall >= 93) return "legendary";
  if (overall >= 89) return "good";
  if (overall >= 85) return "ok";
  return "bad";
}

function buildHistoricTeamPool() {
  return SEASONS.flatMap((seasonEntry) => seasonEntry.teams.map((teamEntry) => {
    const best = bestHistoricStartingFour(seasonEntry, teamEntry);
    if (!best) return null;
    return {
      id: `${seasonEntry.number}-${teamEntry.code}`,
      season: seasonEntry.number,
      code: teamEntry.code,
      name: teamEntry.name,
      champion: Boolean(teamEntry.champion),
      players: best.players,
      metrics: best.metrics,
      overall: best.metrics.overall,
      simOverall: best.simOverall,
      category: historicCategory(best.metrics.overall),
    };
  })).filter(Boolean);
}

function allHistoricalPlayerInstances() {
  return SEASONS.flatMap((seasonEntry) => seasonEntry.teams.flatMap((teamEntry) =>
    teamEntry.players.map((candidate) => annotateHistoricPlayer(candidate, seasonEntry, teamEntry))));
}

function goatRoleScore(candidate) {
  return candidate.offense.rating + candidate.defense.rating
    + (candidate.traits?.mvp ? 8 : 0) + (candidate.traits?.opoy ? 3 : 0) + (candidate.traits?.dpoy ? 3 : 0)
    + (candidate.championship ? 1 : 0) + (candidate.traits?.sbMvp ? 2 : 0);
}

function buildTeamGoat() {
  const all = allHistoricalPlayerInstances();
  const naturalRating = (candidate, side, position) => {
    const value = positionValue(candidate, side, position);
    return value.fit === "natural" ? value.rating : null;
  };
  const top = (items, limit) => [...items].sort((a, b) => goatRoleScore(b) - goatRoleScore(a)).slice(0, limit);
  const qbRush = top(all.filter((c) => naturalRating(c, "offense", "QB") !== null && naturalRating(c, "defense", "RUSH") !== null), 20);
  const qbCb = top(all.filter((c) => naturalRating(c, "offense", "QB") !== null && naturalRating(c, "defense", "CB") !== null), 20);
  const wrRush = top(all.filter((c) => naturalRating(c, "offense", "WR") !== null && naturalRating(c, "defense", "RUSH") !== null), 24);
  const wrCb = top(all.filter((c) => naturalRating(c, "offense", "WR") !== null && naturalRating(c, "defense", "CB") !== null), 34);

  let best = null;
  function directQuality(players, offenseRatings, defenseRatings) {
    if (new Set(players.map((candidate) => candidate.key)).size !== 4) return null;
    const offAvg = Math.round(offenseRatings.reduce((a, b) => a + b, 0) / 4);
    const defAvg = Math.round(defenseRatings.reduce((a, b) => a + b, 0) / 4);
    const mvpBonus = players.filter((candidate) => candidate.traits?.mvp).length * MVP_TEAM_OVR_BOOST;
    const raw = Math.round((offAvg + defAvg) / 2);
    const overall = Math.min(99, raw + mvpBonus);
    const opoy = players.filter((candidate) => candidate.traits?.opoy).length;
    const dpoy = players.filter((candidate) => candidate.traits?.dpoy).length;
    const offSim = offAvg + mvpBonus + opoy * OPOY_SIM_BOOST;
    const defSim = defAvg + mvpBonus + dpoy * DPOY_SIM_BOOST;
    const playoff = players.filter((candidate) => candidate.championship).length * CHAMPIONSHIP_PLAYOFF_BOOST
      + players.filter((candidate) => candidate.traits?.sbMvp).length * SB_MVP_PLAYOFF_BOOST;
    return { overall, simOverall: (offSim + defSim) / 2, playoff, quality: overall * 10000 + (offSim + defSim) * 50 + playoff * 100 };
  }
  function consider(players, offenseRatings, defenseRatings) {
    const result = directQuality(players, offenseRatings, defenseRatings);
    if (!result) return;
    if (!best || result.quality > best.quality) best = { players: [...players], ...result };
  }

  qbRush.forEach((qb) => {
    const qbOff = naturalRating(qb, "offense", "QB"), qbDef = naturalRating(qb, "defense", "RUSH");
    for (let i = 0; i < wrCb.length - 2; i += 1) for (let j = i + 1; j < wrCb.length - 1; j += 1) for (let k = j + 1; k < wrCb.length; k += 1) {
      const a = wrCb[i], b = wrCb[j], c = wrCb[k];
      consider([qb,a,b,c], [qbOff, naturalRating(a,"offense","WR"), naturalRating(b,"offense","WR"), naturalRating(c,"offense","WR")], [qbDef, naturalRating(a,"defense","CB"), naturalRating(b,"defense","CB"), naturalRating(c,"defense","CB")]);
    }
  });
  qbCb.forEach((qb) => wrRush.forEach((rusher) => {
    const qbOff = naturalRating(qb,"offense","QB"), qbDef = naturalRating(qb,"defense","CB");
    const rushOff = naturalRating(rusher,"offense","WR"), rushDef = naturalRating(rusher,"defense","RUSH");
    for (let i = 0; i < wrCb.length - 1; i += 1) for (let j = i + 1; j < wrCb.length; j += 1) {
      const a = wrCb[i], b = wrCb[j];
      consider([qb,rusher,a,b], [qbOff, rushOff, naturalRating(a,"offense","WR"), naturalRating(b,"offense","WR")], [qbDef, rushDef, naturalRating(a,"defense","CB"), naturalRating(b,"defense","CB")]);
    }
  }));

  if (!best) return { id: "GOAT", season: null, code: "GOAT", name: "TEAM GOAT", players: [], overall: 99, simOverall: 103, category: "goat" };
  const metrics = metricsForPlayers(best.players);
  return {
    id: "GOAT", season: null, code: "GOAT", name: "TEAM GOAT", champion: true, players: best.players, metrics,
    overall: metrics.overall, simOverall: (metrics.offenseSimRating + metrics.defenseSimRating) / 2 + 1.5, category: "goat",
  };
}

function getHistoricTeam(seasonNumber, teamCode) {
  return HISTORIC_TEAMS.find((entry) => entry.season === seasonNumber && entry.code === teamCode) || null;
}

function sampleHistoricTeams(category, count, excludedIds = []) {
  const excluded = new Set(excludedIds);
  let pool = HISTORIC_TEAMS.filter((teamEntry) => teamEntry.category === category && !excluded.has(teamEntry.id));
  if (!pool.length) pool = HISTORIC_TEAMS.filter((teamEntry) => !excluded.has(teamEntry.id));
  const shuffled = shuffleArray(pool);
  const picks = shuffled.slice(0, count);
  while (picks.length < count && pool.length) picks.push(randomItem(pool));
  return picks;
}

function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function renderRoster() {
  const metrics = getTeamMetrics();
  renderSlots(elements.offenseSlots, lineupEntries("offense"), lineupPositions("offense"), "offense");
  renderSlots(elements.defenseSlots, lineupEntries("defense"), lineupPositions("defense"), "defense");
  elements.offenseScore.textContent = metrics.offense.length ? metrics.offenseAverage : "—";
  elements.defenseScore.textContent = metrics.defense.length ? metrics.defenseAverage : "—";
  elements.teamScore.textContent = metrics.overall ?? "—";
  const sideBoosts = `${metrics.opoyPlayers ? ` · +${formatBoost(metrics.opoyPlayers * OPOY_SIM_BOOST)} OFF` : ""}${metrics.dpoyPlayers ? ` · +${formatBoost(metrics.dpoyPlayers * DPOY_SIM_BOOST)} DEF` : ""}`;
  elements.teamGrade.textContent = metrics.overall ? `${getGrade(metrics.overall)}${metrics.mvpBonus ? ` · +${metrics.mvpBonus} MVP` : ""}${sideBoosts}` : `${state.drafted.length}/${draftSize()} FILLED`;
  if (state.seasonResults) elements.swapHint.textContent = "The lineup is locked because this season has already been simulated.";
  else if (state.selectedSlot) elements.swapHint.textContent = `Selected ${state.selectedSlot.side.toUpperCase()} ${state.selectedSlot.index + 1}. Choose another ${state.selectedSlot.side} slot to swap.`;
  else elements.swapHint.textContent = state.mode === "bench"
    ? "Select any two slots on the same side—including BENCH—to swap players before the season."
    : "Lineups automatically favor natural positions. Select a player, then select another slot to swap them.";
}

function formatBoost(value) { return Number.isInteger(value) ? String(value) : value.toFixed(1); }

function renderSlots(container, entries, positions, side) {
  container.innerHTML = positions.map((position, index) => {
    const entry = entries[index];
    if (!entry) return `<div class="roster-slot"><span class="slot-position">${position}</span><span class="slot-player"><strong>Open slot</strong><small>Waiting for pick</small></span><span class="slot-rating">—</span></div>`;
    const penalty = position === "BENCH"
      ? `${entry.naturalPosition} · RESTING`
      : entry.fit === "natural" ? `${entry.naturalPosition} · NATURAL` : `${entry.naturalPosition} → ${position} · −${Math.round((1 - entry.multiplier) * 100)}%`;
    const traits = `${entry.player.championship ? "★" : ""}${entry.player.traits?.mvp ? "M" : ""}${entry.player.traits?.opoy ? "O" : ""}${entry.player.traits?.dpoy ? "D" : ""}${entry.player.traits?.sbMvp ? "S" : ""}`;
    const selected = state.selectedSlot?.side === side && state.selectedSlot?.index === index;
    return `<button class="roster-slot filled${selected ? " selected" : ""}" type="button" data-side="${side}" data-index="${index}" ${state.seasonResults ? "disabled" : ""} aria-label="${selected ? "Selected " : "Select "}${escapeHtml(entry.player.name)} in ${position}">
      <span class="slot-position">${position}</span><span class="slot-player"><strong>${escapeHtml(entry.player.name)}${traits ? ` · ${traits}` : ""}</strong><small>S${entry.player.season} ${entry.player.teamCode} · ${penalty}</small></span><span class="slot-rating ${entry.fit}">${position === "BENCH" ? "—" : entry.rating}</span>
    </button>`;
  }).join("");
  container.querySelectorAll("button.roster-slot").forEach((button) => {
    button.addEventListener("click", () => selectLineupSlot(button.dataset.side, Number(button.dataset.index)));
  });
}

function selectLineupSlot(side, index) {
  if (state.seasonResults || !state.lineups[side][index]) return;
  if (!state.selectedSlot) {
    state.selectedSlot = { side, index };
    renderRoster();
    return;
  }
  if (state.selectedSlot.side !== side) {
    state.selectedSlot = { side, index };
    renderRoster();
    return;
  }
  if (state.selectedSlot.index === index) {
    state.selectedSlot = null;
    renderRoster();
    return;
  }
  const lineup = state.lineups[side];
  [lineup[state.selectedSlot.index], lineup[index]] = [lineup[index], lineup[state.selectedSlot.index]];
  state.selectedSlot = null;
  renderRoster();
  if (state.complete) evaluateDraftAchievements();
}

function averageRatings(entries) {
  if (!entries.length) return 0;
  return Math.round(entries.reduce((sum, entry) => sum + entry.rating, 0) / entries.length);
}

function getGrade(overall) {
  if (overall >= 95) return "S";
  if (overall >= 92) return "A+";
  if (overall >= 89) return "A";
  if (overall >= 86) return "A−";
  if (overall >= 83) return "B+";
  if (overall >= 80) return "B";
  if (overall >= 77) return "B−";
  if (overall >= 74) return "C+";
  if (overall >= 70) return "C";
  return "D";
}

function calculatePerfectTeam() {
  const groups = Array.from({ length: draftSize() }, (_, pickIndex) => {
    const candidates = state.rollHistory
      .filter((roll) => roll.pickIndex === pickIndex)
      .flatMap((roll) => roll.team.players.map((candidate) => ({
        ...candidate, season: roll.season.number, teamCode: roll.team.code, teamName: roll.team.name,
        championship: Boolean(roll.team.champion), key: createPlayerKey(roll.season.number, roll.team.code, candidate.name),
      })));
    return [...new Map(candidates.map((candidate) => [candidate.key, candidate])).values()];
  });
  if (groups.some((group) => !group.length)) return null;
  let best = null;
  function search(pickIndex, chosen) {
    if (pickIndex === groups.length) {
      if (new Set(chosen.map((candidate) => candidate.key)).size !== chosen.length) return;
      const metrics = metricsForPlayers(chosen);
      const quality = metrics.offenseSimRating + metrics.defenseSimRating;
      if (!best || metrics.overall > best.metrics.overall || (metrics.overall === best.metrics.overall && quality > best.quality)) {
        best = { players: [...chosen], metrics, quality };
      }
      return;
    }
    groups[pickIndex].forEach((candidate) => search(pickIndex + 1, [...chosen, candidate]));
  }
  search(0, []);
  return best;
}

function evaluateDraftAchievements() {
  if (!state.complete) return;
  const metrics = getTeamMetrics();
  if (metrics.overall >= 90) unlockAchievement("team_90");
  if (metrics.overall >= 95) unlockAchievement("team_95");
  if (state.drafted.some((candidate) => Math.max(candidate.offense.rating, candidate.defense.rating) === 99)) unlockAchievement("player_99");
  const perfect = calculatePerfectTeam();
  if (perfect && isPerfectBuild(metrics, perfect)) unlockAchievement("perfect_team");
}

function isPerfectBuild(metrics, perfect) {
  return metrics.overall === perfect.metrics.overall
    && metrics.offenseSimRating === perfect.metrics.offenseSimRating
    && metrics.defenseSimRating === perfect.metrics.defenseSimRating;
}

function showSeasonCenter() {
  if (!state.complete) return;
  const metrics = getTeamMetrics();
  const perfect = state.mode === "sandbox" ? null : calculatePerfectTeam();
  elements.hindsightPanel.hidden = state.mode === "sandbox";
  elements.finishGrade.textContent = state.seasonResults?.champion ? "🏆" : getGrade(metrics.overall);
  elements.finishTitle.textContent = state.seasonResults?.title || (metrics.overall >= 90 ? "ERA BALL POWERHOUSE" : metrics.overall >= 83 ? "PLAYOFF READY" : "TEAM COMPLETE");
  elements.finishSummary.textContent = `${state.drafted.map((candidate) => candidate.name).join(", ")} enter the season with a ${metrics.overall} team overall.`;
  elements.finishOffense.textContent = metrics.offenseAverage;
  elements.finishDefense.textContent = metrics.defenseAverage;
  elements.finishOverall.textContent = metrics.overall;
  elements.finishTrait.textContent = traitSummary(metrics);
  elements.builtOverall.textContent = metrics.overall;
  elements.perfectOverall.textContent = perfect?.metrics.overall ?? "—";
  const difference = perfect ? metrics.overall - perfect.metrics.overall : 0;
  const perfectMatch = perfect ? isPerfectBuild(metrics, perfect) : false;
  elements.overallDifference.textContent = perfect ? (difference === 0 ? "EVEN" : String(difference)) : "—";
  elements.hindsightVerdict.textContent = perfectMatch
    ? "YOU BUILT IT PERFECTLY"
    : perfect && difference === 0 ? "OVR EVEN · PERFECT TEAM HAS BETTER SIDE BOOSTS" : `${state.rollHistory.length} ROLLS SAVED`;
  elements.perfectLineup.textContent = perfect
    ? `Best picks: ${perfect.players.map((candidate) => `${candidate.name} (S${candidate.season} ${candidate.teamCode})`).join(" · ")}${state.mode === "bench" ? ` · OFF bench: ${perfect.metrics.offense.find((entry) => entry.position === "BENCH")?.player.name || "—"} · DEF bench: ${perfect.metrics.defense.find((entry) => entry.position === "BENCH")?.player.name || "—"}` : ""}`
    : "Complete the draft to calculate the best possible team.";
  elements.seasonBoost.textContent = `${metrics.mvpBonus ? `+${metrics.mvpBonus} MVP · ` : ""}${metrics.opoyPlayers ? `+${formatBoost(metrics.opoyPlayers * OPOY_SIM_BOOST)} OFF · ` : ""}${metrics.dpoyPlayers ? `+${formatBoost(metrics.dpoyPlayers * DPOY_SIM_BOOST)} DEF · ` : ""}${Math.round(playoffTraitBoost(metrics) * 100)}% PLAYOFF BOOST${state.mode === "nightmare" ? " · FINAL BOSS: TEAM GOAT" : ""}`;
  if (state.seasonResults) renderSeasonResults(state.seasonResults);
  else resetSeasonPanel();
  elements.finishOverlay.hidden = false;
}

function traitSummary(metrics) {
  const parts = [];
  if (metrics.mvpPlayers) parts.push(`${metrics.mvpPlayers} MVP`);
  if (metrics.opoyPlayers) parts.push(`${metrics.opoyPlayers} OPOY starter`);
  if (metrics.dpoyPlayers) parts.push(`${metrics.dpoyPlayers} DPOY starter`);
  if (metrics.championshipPlayers) parts.push(`${metrics.championshipPlayers} Championship`);
  if (metrics.sbMvpPlayers) parts.push(`${metrics.sbMvpPlayers} Super Bowl MVP`);
  return parts.length ? `★ ${parts.join(" · ")}` : "No performance traits on this roster";
}

function playoffTraitBoost(metrics) {
  return metrics.championshipPlayers * CHAMPIONSHIP_PLAYOFF_BOOST + metrics.sbMvpPlayers * SB_MVP_PLAYOFF_BOOST;
}

function resetSeasonPanel() {
  elements.regularSeasonGames.innerHTML = "<p>Six opponents are waiting.</p>";
  elements.seasonStanding.textContent = "SEASON NOT STARTED";
  elements.semifinalGame.className = "playoff-game locked";
  elements.semifinalGame.innerHTML = "<span>SEMIFINAL</span><strong>WAITING</strong><small>Seeds 2 and 3 play for the Bowl</small>";
  elements.championshipGame.className = "playoff-game locked";
  elements.championshipGame.innerHTML = "<span>RCAA BOWL</span><strong>WAITING</strong><small>The 1 seed awaits</small>";
  elements.statCenter.hidden = true;
  elements.passingStats.innerHTML = "";
  elements.receivingStats.innerHTML = "";
  elements.defenseStats.innerHTML = "";
  elements.seasonAwards.innerHTML = "";
  elements.simulateSeasonButton.disabled = false;
  elements.simulateSeasonButton.textContent = "SIMULATE THE SEASON";
}

function simulateSeason() {
  if (!state.complete || state.seasonResults) return;
  const metrics = getTeamMetrics();
  const badTeams = sampleHistoricTeams("bad", 2);
  const okTeams = sampleHistoricTeams("ok", 2, badTeams.map((teamEntry) => teamEntry.id));
  const goodTeams = sampleHistoricTeams("good", 2, [...badTeams, ...okTeams].map((teamEntry) => teamEntry.id));
  const opponents = shuffleArray([...badTeams, ...okTeams, ...goodTeams]);
  const regularSeason = opponents.map((opponent, index) => playGame(metrics, opponent, 0, `Week ${index + 1}`));
  const wins = regularSeason.filter((game) => game.won).length;
  const seed = seedForWins(wins);
  let semifinal = null;
  let bowl = null;
  let title = "MISSED THE PLAYOFFS";
  const playoffBoost = playoffTraitBoost(metrics);

  const regularOpponentIds = opponents.map((teamEntry) => teamEntry.id);
  if (!seed) {
    unlockAchievement("missed_playoffs");
  } else if (seed === 1) {
    const bowlOpponent = state.mode === "nightmare" ? TEAM_GOAT : sampleHistoricTeams("legendary", 1, regularOpponentIds)[0];
    bowl = playGame(metrics, bowlOpponent, playoffBoost, "RCAA Bowl");
    if (bowl.won) unlockAchievement("won_playoff");
    title = bowl.won ? "RCAA CHAMPIONS" : "SEASON ENDS IN THE BOWL";
  } else {
    const semifinalOpponent = sampleHistoricTeams("good", 1, regularOpponentIds)[0];
    semifinal = playGame(metrics, semifinalOpponent, playoffBoost, "Semifinal");
    if (semifinal.won) {
      unlockAchievement("won_playoff");
      const bowlOpponent = state.mode === "nightmare" ? TEAM_GOAT : sampleHistoricTeams("legendary", 1, [...regularOpponentIds, semifinalOpponent?.id].filter(Boolean))[0];
      bowl = playGame(metrics, bowlOpponent, playoffBoost, "RCAA Bowl");
      if (bowl.won) unlockAchievement("won_playoff");
      title = bowl.won ? "RCAA CHAMPIONS" : "SEASON ENDS IN THE BOWL";
    } else {
      title = "SEMIFINAL EXIT";
    }
  }

  const champion = Boolean(bowl?.won);
  if (champion) {
    unlockAchievement("championship");
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
}

function renderSeasonResults(results) {
  elements.regularSeasonGames.innerHTML = results.regularSeason.map((game, index) => `
    <button type="button" class="season-game ${game.won ? "win" : "loss"}" data-game-index="${index}">
      <span>WEEK ${index + 1} · S${game.opponentSeason ?? "—"} ${escapeHtml(game.opponentCode || "")}</span>
      <strong>${game.won ? "W" : "L"} ${game.teamScore}–${game.opponentScore}</strong>
      <small>${escapeHtml(game.opponentName || "Historic opponent")} · ${game.opponentOverall} OVR${game.opponentCategory ? ` · ${game.opponentCategory.toUpperCase()}` : ""} · ${game.qb.yards} YDS · ${game.qb.td} TD · ${game.qb.int} INT</small>
      <b>VIEW GAME STATS →</b>
    </button>`).join("");
  elements.seasonStanding.textContent = results.seed
    ? `${results.wins}–${results.losses} · #${results.seed} SEED${results.seed === 1 ? " · BYE TO THE RCAA BOWL" : ""}`
    : `${results.wins}–${results.losses} · MISSED THE PLAYOFFS`;

  if (!results.seed) {
    renderLockedGame(elements.semifinalGame, "SEMIFINAL", "ELIMINATED", "A 3–3 record was required");
    renderLockedGame(elements.championshipGame, "RCAA BOWL", "ELIMINATED", "Season complete");
  } else if (results.seed === 1) {
    renderLockedGame(elements.semifinalGame, "SEMIFINAL", "FIRST-ROUND BYE", "Top seed advances directly to the Bowl");
    renderPlayoffGame(elements.championshipGame, "RCAA BOWL", results.bowl);
  } else {
    renderPlayoffGame(elements.semifinalGame, "SEMIFINAL", results.semifinal);
    if (results.bowl) renderPlayoffGame(elements.championshipGame, "RCAA BOWL", results.bowl);
    else renderLockedGame(elements.championshipGame, "RCAA BOWL", "DID NOT ADVANCE", "The playoff run ends here");
  }
  renderStatCenter(results.stats);
  elements.simulateSeasonButton.disabled = true;
  elements.simulateSeasonButton.textContent = "SEASON COMPLETE";
}

function seedForWins(wins) {
  if (wins >= 5) return 1;
  if (wins === 4) return 2;
  if (wins === 3) return 3;
  return null;
}

function playGame(metrics, opponent, extraWinChance, label) {
  const opponentStrength = typeof opponent === "number" ? opponent : (opponent?.simOverall ?? opponent?.overall ?? 88);
  const opponentDisplayOverall = typeof opponent === "number" ? opponent : (opponent?.overall ?? opponentStrength);
  const opponentName = typeof opponent === "number" ? "RCAA Opponent" : opponent?.name || "RCAA Opponent";
  const opponentSeason = typeof opponent === "number" ? null : opponent?.season ?? null;
  const opponentCode = typeof opponent === "number" ? "" : opponent?.code || "";
  const opponentCategory = typeof opponent === "number" ? "" : opponent?.category || "";
  const opponentPlayers = typeof opponent === "number" ? [] : (opponent?.players || []).map((candidate) => ({ name: candidate.name, season: candidate.season, teamCode: candidate.teamCode }));
  const simOverall = (metrics.offenseSimRating + metrics.defenseSimRating) / 2;
  const chance = clamp(0.5 + (simOverall - opponentStrength) * 0.027 + extraWinChance, 0.08, 0.96);
  const won = Math.random() < chance;
  const offenseEdge = metrics.offenseSimRating - opponentStrength;
  const defenseEdge = metrics.defenseSimRating - opponentStrength;
  const attempts = clamp(Math.round(45 + randomNormal() * 7), 28, 66);
  const completionPct = clamp(Math.round(50 + offenseEdge * 0.38 + randomNormal() * 5.5), 40, 63);
  const completions = clamp(Math.round(attempts * completionPct / 100), 12, attempts);
  const yards = clamp(Math.round(550 + offenseEdge * 7 + randomNormal() * 105), 250, 900);
  const td = clamp(Math.round(5.4 + offenseEdge * 0.1 + randomNormal() * 1.55), 0, 10);
  const interceptions = clamp(Math.round(2.4 - offenseEdge * 0.055 + randomNormal() * 1.05), 0, 7);
  const sacksTaken = clamp(Math.round(2 - offenseEdge * 0.035 + randomNormal() * 0.9), 0, 6);
  const qbEntry = metrics.offenseStarters.find((entry) => entry.position === "QB");
  const receiverEntries = metrics.offenseStarters.filter((entry) => entry.position === "WR");
  const receivers = distributeReceiving(receiverEntries, attempts, completions, yards, td);
  const defense = distributeDefense(metrics.defenseStarters, defenseEdge);
  let teamScore = clamp(td * 7 + randomItem([0, 3, 6, 7, 10]), 10, 84);
  let opponentScore = clamp(Math.round(39 + (opponentStrength - metrics.defenseSimRating) * 1.5 + randomNormal() * 11), 10, 84);
  if (won && teamScore <= opponentScore) teamScore = Math.min(84, opponentScore + randomItem([3, 4, 6, 7, 10]));
  if (!won && teamScore >= opponentScore) opponentScore = Math.min(84, teamScore + randomItem([3, 4, 6, 7, 10]));
  return {
    label, won, opponentOverall: Math.round(opponentDisplayOverall), opponentSimOverall: Math.round(opponentStrength), opponentName, opponentSeason, opponentCode, opponentCategory, opponentPlayers, chance, teamScore, opponentScore,
    qb: { key: qbEntry.player.key, name: qbEntry.player.name, completions, attempts, yards, td, int: interceptions, sacks: sacksTaken },
    receivers, defense,
  };
}

function distributeReceiving(entries, attempts, completions, yards, touchdowns) {
  const weights = entries.map((entry) => Math.max(1, entry.rating - 62 + (entry.player.traits?.opoy ? 12 : 0) + Math.random() * 12));
  const receptions = allocateInteger(completions, weights);
  const incompletions = allocateInteger(Math.max(0, attempts - completions), weights.map((weight) => weight * (0.8 + Math.random() * 0.4)));
  const yardWeights = weights.map((weight, index) => weight * Math.max(1, receptions[index]) * (0.75 + Math.random() * 0.5));
  const tdWeights = weights.map((weight, index) => weight * (1 + receptions[index] / 10));
  const yardShares = allocateInteger(yards, yardWeights);
  const tdShares = allocateInteger(touchdowns, tdWeights);
  return entries.map((entry, index) => ({
    key: entry.player.key, name: entry.player.name, rec: receptions[index], targets: receptions[index] + incompletions[index],
    yards: yardShares[index], td: tdShares[index],
  }));
}

function distributeDefense(entries, defenseEdge) {
  const teamInterceptions = clamp(Math.round(2.3 + defenseEdge * 0.065 + randomNormal() * 1.1), 0, 7);
  const teamSacks = clamp(Math.round(2.1 + defenseEdge * 0.065 + randomNormal() * 1.05), 0, 7);
  const teamForcedFumbles = clamp(Math.round(0.8 + defenseEdge * 0.025 + randomNormal() * 0.65), 0, 3);
  const base = entries.map((entry) => Math.max(1, entry.rating - 62 + (entry.player.traits?.dpoy ? 14 : 0)));
  const intShares = allocateInteger(teamInterceptions, base.map((weight, index) => weight * (entries[index].position === "CB" ? 1.65 : 0.45) * (0.8 + Math.random() * 0.4)));
  const sackShares = allocateInteger(teamSacks, base.map((weight, index) => weight * (entries[index].position === "RUSH" ? 2.2 : 0.45) * (0.8 + Math.random() * 0.4)));
  const ffShares = allocateInteger(teamForcedFumbles, base.map((weight) => weight * (0.8 + Math.random() * 0.4)));
  return entries.map((entry, index) => ({ key: entry.player.key, name: entry.player.name, int: intShares[index], sacks: sackShares[index], ff: ffShares[index] }));
}

function allocateInteger(total, weights) {
  if (!weights.length) return [];
  const result = Array(weights.length).fill(0);
  const safeWeights = weights.map((weight) => Math.max(0.001, weight));
  for (let count = 0; count < total; count += 1) {
    const weightTotal = safeWeights.reduce((sum, weight) => sum + weight, 0);
    let roll = Math.random() * weightTotal;
    let selected = safeWeights.length - 1;
    for (let index = 0; index < safeWeights.length; index += 1) {
      roll -= safeWeights[index];
      if (roll <= 0) { selected = index; break; }
    }
    result[selected] += 1;
  }
  return result;
}

function randomNormal() {
  const first = Math.max(Number.EPSILON, Math.random());
  const second = Math.max(Number.EPSILON, Math.random());
  return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
}

function aggregateGameStats(games) {
  const passing = new Map();
  const receiving = new Map();
  const defense = new Map();
  games.forEach((game) => {
    addStatLine(passing, game.qb, ["completions", "attempts", "yards", "td", "int", "sacks"]);
    game.receivers.forEach((line) => addStatLine(receiving, line, ["rec", "targets", "yards", "td"]));
    game.defense.forEach((line) => addStatLine(defense, line, ["int", "sacks", "ff"]));
  });
  return {
    gamesPlayed: games.length,
    passing: [...passing.values()],
    receiving: [...receiving.values()].sort((a, b) => b.yards - a.yards),
    defense: [...defense.values()].sort((a, b) => (b.int * 5 + b.sacks * 4 + b.ff * 4) - (a.int * 5 + a.sacks * 4 + a.ff * 4)),
  };
}

function determineSeasonAwards(regularStats, regularWins, champion) {
  const quarterbackScores = regularStats.passing.map((line) => ({
    name: line.name,
    score: line.yards / 95 + line.td * 3.4 - line.int * 2 + regularWins * 1.4 + (champion ? 3 : 0),
    remarkable: line.yards >= 3000 || line.td >= 28,
  })).sort((a, b) => b.score - a.score);

  const receiverScores = regularStats.receiving.map((line) => ({
    name: line.name,
    score: line.yards / 70 + line.td * 3.8 + line.rec / 8,
    remarkable: line.yards >= 700 || line.td >= 7 || line.rec >= 32,
  })).sort((a, b) => b.score - a.score);

  const defenseScores = regularStats.defense.map((line) => ({
    name: line.name,
    score: line.int * 5 + line.sacks * 4 + line.ff * 4,
  })).sort((a, b) => b.score - a.score);

  const bestQb = quarterbackScores[0];
  const bestWr = receiverScores[0];
  const anyRemarkableReceiver = receiverScores.some((entry) => entry.remarkable);
  let opoy = bestWr?.name || bestQb?.name;
  if (bestQb?.remarkable && !anyRemarkableReceiver) opoy = bestQb.name;

  const twoWayScores = new Map();
  quarterbackScores.forEach((entry) => twoWayScores.set(entry.name, (twoWayScores.get(entry.name) || 0) + entry.score));
  receiverScores.forEach((entry) => twoWayScores.set(entry.name, (twoWayScores.get(entry.name) || 0) + entry.score));
  defenseScores.forEach((entry) => twoWayScores.set(entry.name, (twoWayScores.get(entry.name) || 0) + entry.score * 0.6));
  const mvp = [...twoWayScores.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || bestQb?.name || bestWr?.name;

  return { mvp, opoy, dpoy: defenseScores[0]?.name };
}

function aggregateSeasonStats(regularGames, playoffGames, metrics, regularWins, champion) {
  const regular = aggregateGameStats(regularGames);
  const playoffs = aggregateGameStats(playoffGames);
  return {
    regular,
    playoffs,
    awards: determineSeasonAwards(regular, regularWins, champion),
  };
}

function addStatLine(map, line, fields) {
  if (!map.has(line.key)) map.set(line.key, { key: line.key, name: line.name, ...Object.fromEntries(fields.map((field) => [field, 0])) });
  const total = map.get(line.key);
  fields.forEach((field) => { total[field] += line[field]; });
}

function periodPassingTable(periodName, stats) {
  if (!stats.passing.length) return statTable(`${periodName} · PASSING`, ["PLAYER", "CMP/ATT", "CMP%", "YDS", "TD", "INT", "SCK"], [["NO GAMES", "—", "—", "—", "—", "—", "—"]]);
  const rows = stats.passing.map((line) => [
    line.name, `${line.completions}/${line.attempts}`, `${line.attempts ? Math.round(line.completions / line.attempts * 100) : 0}%`,
    line.yards.toLocaleString(), line.td, line.int, line.sacks,
  ]);
  const total = totalFields(stats.passing, ["completions", "attempts", "yards", "td", "int", "sacks"]);
  rows.push(["TEAM TOTAL", `${total.completions}/${total.attempts}`, `${total.attempts ? Math.round(total.completions / total.attempts * 100) : 0}%`, total.yards.toLocaleString(), total.td, total.int, total.sacks]);
  return statTable(`${periodName} · PASSING`, ["PLAYER", "CMP/ATT", "CMP%", "YDS", "TD", "INT", "SCK"], rows);
}

function periodReceivingTable(periodName, stats) {
  if (!stats.receiving.length) return statTable(`${periodName} · RECEIVING`, ["PLAYER", "REC/TGT", "YDS", "TD"], [["NO GAMES", "—", "—", "—"]]);
  const rows = stats.receiving.map((line) => [line.name, `${line.rec}/${line.targets}`, line.yards.toLocaleString(), line.td]);
  const total = totalFields(stats.receiving, ["rec", "targets", "yards", "td"]);
  rows.push(["TEAM TOTAL", `${total.rec}/${total.targets}`, total.yards.toLocaleString(), total.td]);
  return statTable(`${periodName} · RECEIVING`, ["PLAYER", "REC/TGT", "YDS", "TD"], rows);
}

function periodDefenseTable(periodName, stats) {
  if (!stats.defense.length) return statTable(`${periodName} · DEFENSE`, ["PLAYER", "INT", "SCK", "FF"], [["NO GAMES", "—", "—", "—"]]);
  const rows = stats.defense.map((line) => [line.name, line.int, line.sacks, line.ff]);
  const total = totalFields(stats.defense, ["int", "sacks", "ff"]);
  rows.push(["TEAM TOTAL", total.int, total.sacks, total.ff]);
  return statTable(`${periodName} · DEFENSE`, ["PLAYER", "INT", "SCK", "FF"], rows);
}

function renderStatCenter(stats) {
  if (!stats) return;
  elements.statCenter.hidden = false;
  elements.seasonStatSummary.textContent = `REGULAR SEASON: ${stats.regular.gamesPlayed} G · PLAYOFFS: ${stats.playoffs.gamesPlayed} G`;
  elements.passingStats.innerHTML = periodPassingTable("REGULAR SEASON", stats.regular) + periodPassingTable("PLAYOFFS", stats.playoffs);
  elements.receivingStats.innerHTML = periodReceivingTable("REGULAR SEASON", stats.regular) + periodReceivingTable("PLAYOFFS", stats.playoffs);
  elements.defenseStats.innerHTML = periodDefenseTable("REGULAR SEASON", stats.regular) + periodDefenseTable("PLAYOFFS", stats.playoffs);
  elements.seasonAwards.innerHTML = `<div class="award-period-label">REGULAR SEASON AWARDS</div>` + [
    ["MVP", stats.awards.mvp], ["OPOY", stats.awards.opoy], ["DPOY", stats.awards.dpoy],
  ].map(([award, name]) => `<div class="award-winner"><span>${award}</span><strong>${escapeHtml(name || "—")}</strong></div>`).join("");
}

function totalFields(rows, fields) {
  return rows.reduce((totals, row) => {
    fields.forEach((field) => { totals[field] = (totals[field] || 0) + row[field]; });
    return totals;
  }, {});
}

function statTable(title, headings, rows) {
  return `<h4>${title}</h4><div class="stat-table-scroll"><table class="stat-table"><thead><tr>${headings.map((heading) => `<th>${heading}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr${row[0] === "TEAM TOTAL" ? " class=\"total-row\"" : ""}>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function renderPlayoffGame(container, label, game) {
  container.className = `playoff-game ${game.won ? "win" : "loss"}`;
  const opponent = game.opponentName ? `${escapeHtml(game.opponentName)}${game.opponentSeason ? ` · S${game.opponentSeason} ${escapeHtml(game.opponentCode)}` : ""}${game.opponentCategory ? ` · ${game.opponentCategory.toUpperCase()}` : ""}` : `vs ${game.opponentOverall} OVR`;
  const goatRoster = game.opponentCategory === "goat" && game.opponentPlayers?.length ? ` · ${game.opponentPlayers.map((candidate) => escapeHtml(candidate.name)).join(" / ")}` : "";
  container.innerHTML = `<span>${label}</span><strong>${game.won ? "WIN" : "LOSS"} · ${game.teamScore}–${game.opponentScore}</strong><small>${opponent} · ${game.opponentOverall} OVR${goatRoster} · ${game.qb.yards} YDS · ${game.qb.td} TD · ${game.qb.int} INT</small>`;
}

function renderLockedGame(container, label, result, note) {
  container.className = "playoff-game locked";
  container.innerHTML = `<span>${label}</span><strong>${result}</strong><small>${note}</small>`;
}


function handleRegularSeasonGameClick(event) {
  const button = event.target.closest("button[data-game-index]");
  if (!button || !state.seasonResults) return;
  showRegularSeasonGameStats(Number(button.dataset.gameIndex));
}

function showRegularSeasonGameStats(index) {
  const game = state.seasonResults?.regularSeason?.[index];
  if (!game) return;
  const single = aggregateGameStats([game]);
  elements.gameStatsTitle.textContent = `WEEK ${index + 1} · ${game.won ? "WIN" : "LOSS"} ${game.teamScore}–${game.opponentScore}`;
  elements.gameStatsMeta.textContent = `${game.opponentName}${game.opponentSeason ? ` · Season ${game.opponentSeason} ${game.opponentCode}` : ""} · ${game.opponentOverall} OVR`;
  elements.gameStatsBody.innerHTML = periodPassingTable("GAME", single) + periodReceivingTable("GAME", single) + periodDefenseTable("GAME", single);
  elements.gameStatsDialog.showModal();
}

function openSandboxMode() {
  state.currentView = "sandbox";
  state.mode = "sandbox";
  document.body.classList.remove("nightmare-mode", "fantasy-mode", "online-mode");
  document.body.classList.add("sandbox-mode");
  elements.homePage.hidden = true;
  elements.game.hidden = true;
  elements.fantasyPage.hidden = true;
  elements.onlinePage.hidden = true;
  elements.achievementsPage.hidden = true;
  elements.sandboxPage.hidden = false;
  elements.modeSwitch.hidden = false;
  elements.gameViewButton.classList.remove("active");
  elements.achievementsViewButton.classList.remove("active");
  if (!state.sandbox.seasonNumber) state.sandbox.seasonNumber = SEASONS[0].number;
  const seasonEntry = SEASONS.find((entry) => entry.number === state.sandbox.seasonNumber) || SEASONS[0];
  if (!seasonEntry.teams.some((teamEntry) => teamEntry.code === state.sandbox.teamCode)) state.sandbox.teamCode = seasonEntry.teams[0]?.code || null;
  state.lineups = { offense: Array(4).fill(null), defense: Array(4).fill(null) };
  if (state.drafted.length) autoArrangeLineups();
  syncModeNav();
  renderSandbox();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSandbox() {
  const seasonEntry = SEASONS.find((entry) => entry.number === state.sandbox.seasonNumber) || SEASONS[0];
  const teamEntry = seasonEntry.teams.find((entry) => entry.code === state.sandbox.teamCode) || seasonEntry.teams[0];
  state.sandbox.seasonNumber = seasonEntry.number;
  state.sandbox.teamCode = teamEntry?.code || null;
  elements.sandboxSeasonList.innerHTML = SEASONS.map((entry) => `<button type="button" data-sandbox-season="${entry.number}" class="${entry.number === seasonEntry.number ? "active" : ""}"><strong>S${entry.number}</strong><small>${entry.teams.length} TEAMS</small></button>`).join("");
  elements.sandboxTeamList.innerHTML = seasonEntry.teams.map((entry) => {
    const historic = getHistoricTeam(seasonEntry.number, entry.code);
    return `<button type="button" data-sandbox-team="${escapeHtml(entry.code)}" class="${entry.code === teamEntry?.code ? "active" : ""}"><span class="team-dot" style="--team-color:${entry.color}"></span><div><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.code)} · ${entry.players.length} PLAYERS${historic ? ` · ${historic.overall} OVR` : ""}</small></div></button>`;
  }).join("");
  if (!teamEntry) { elements.sandboxPlayerList.innerHTML = ""; return; }
  elements.sandboxPlayerList.innerHTML = teamEntry.players.map((candidate) => {
    const key = createPlayerKey(seasonEntry.number, teamEntry.code, candidate.name);
    const selected = state.drafted.some((entry) => entry.key === key);
    const image = getPlayerDetails(candidate, seasonEntry, teamEntry).image || "";
    return `<button type="button" class="sandbox-player-card${selected ? " selected" : ""}" data-sandbox-player="${escapeHtml(candidate.name)}" ${selected || state.drafted.length >= 4 ? "disabled" : ""}>
      <span class="sandbox-avatar">${image ? `<img src="${escapeHtml(image)}" alt="" />` : `<b>${initials(candidate.name)}</b>`}</span>
      <span class="sandbox-player-copy"><strong>${escapeHtml(candidate.name)}</strong><small>${candidate.offense.position} ${candidate.offense.rating} · ${candidate.defense.position} ${candidate.defense.rating}</small></span><em>${selected ? "ADDED" : "+"}</em>
    </button>`;
  }).join("");
  const metrics = state.drafted.length ? metricsForPlayers(state.drafted) : null;
  elements.sandboxRoster.innerHTML = state.drafted.length ? state.drafted.map((candidate, index) => `<button type="button" data-remove-key="${escapeHtml(candidate.key)}"><span>${index + 1}</span><div><strong>${escapeHtml(candidate.name)}</strong><small>S${candidate.season} ${escapeHtml(candidate.teamCode)} · OFF ${candidate.offense.rating} / DEF ${candidate.defense.rating}</small></div><b>×</b></button>`).join("") : `<div class="sandbox-empty-roster">Choose four player versions from the browser.</div>`;
  elements.sandboxStatus.textContent = `${state.drafted.length} / 4 PLAYERS SELECTED${metrics?.overall ? ` · ${metrics.overall} TEAM OVR` : ""}`;
  elements.sandboxStartButton.disabled = state.drafted.length !== 4;
  elements.sandboxStartButton.textContent = state.drafted.length === 4 ? `LOCK ${metrics.overall} OVR ROSTER & PLAY` : `SELECT ${4 - state.drafted.length} MORE`;
}

function playerImageFor(name, seasonNumber, teamCode = "") {
  const exact = PLAYER_CARDS[createPlayerKey(seasonNumber, teamCode, name)];
  return exact?.image || "";
}

function handleSandboxSeasonClick(event) {
  const button = event.target.closest("button[data-sandbox-season]");
  if (!button) return;
  state.sandbox.seasonNumber = Number(button.dataset.sandboxSeason);
  const seasonEntry = SEASONS.find((entry) => entry.number === state.sandbox.seasonNumber);
  state.sandbox.teamCode = seasonEntry?.teams[0]?.code || null;
  renderSandbox();
}

function handleSandboxTeamClick(event) {
  const button = event.target.closest("button[data-sandbox-team]");
  if (!button) return;
  state.sandbox.teamCode = button.dataset.sandboxTeam;
  renderSandbox();
}

function handleSandboxPlayerClick(event) {
  const button = event.target.closest("button[data-sandbox-player]");
  if (!button || state.drafted.length >= 4) return;
  const seasonEntry = SEASONS.find((entry) => entry.number === state.sandbox.seasonNumber);
  const teamEntry = seasonEntry?.teams.find((entry) => entry.code === state.sandbox.teamCode);
  const candidate = teamEntry?.players.find((entry) => entry.name === button.dataset.sandboxPlayer);
  if (!candidate) return;
  const annotated = annotateHistoricPlayer(candidate, seasonEntry, teamEntry);
  if (state.drafted.some((entry) => entry.key === annotated.key)) return;
  state.drafted.push(annotated);
  autoArrangeLineups();
  renderSandbox();
}

function handleSandboxRosterClick(event) {
  const button = event.target.closest("button[data-remove-key]");
  if (!button || state.complete) return;
  state.drafted = state.drafted.filter((candidate) => candidate.key !== button.dataset.removeKey);
  autoArrangeLineups();
  renderSandbox();
}

function clearSandboxRoster() {
  if (state.complete || state.seasonResults) { resetCoreRunState(); } else { state.drafted = []; state.lineups = { offense: Array(4).fill(null), defense: Array(4).fill(null) }; }
  state.complete = false;
  elements.finishOverlay.hidden = true;
  renderSandbox();
}

function startSandboxSeason() {
  if (state.drafted.length !== 4) return;
  state.mode = "sandbox";
  state.complete = true;
  autoArrangeLineups();
  evaluateDraftAchievements();
  showSeasonCenter();
}

function buildFantasyPlayerPool() {
  const players = SEASONS.flatMap((seasonEntry) => seasonEntry.teams.flatMap((teamEntry) =>
    teamEntry.players.map((candidate) => {
      const annotated = annotateHistoricPlayer(candidate, seasonEntry, teamEntry);
      return {
        ...annotated,
        fantasyRating: Math.round(((candidate.offense.rating + candidate.defense.rating) / 2) * 10) / 10,
      };
    })));
  players.sort((first, second) =>
    second.fantasyRating - first.fantasyRating
    || Math.max(second.offense.rating, second.defense.rating) - Math.max(first.offense.rating, first.defense.rating)
    || first.season - second.season
    || first.name.localeCompare(second.name));
  return players.map((candidate, index) => ({ ...candidate, adp: index + 1 }));
}

function fantasyDraftOrder() {
  const order = [];
  for (let round = 0; round < 7; round += 1) {
    const spots = round % 2 === 0 ? [0, 1, 2, 3] : [3, 2, 1, 0];
    spots.forEach((teamIndex) => order.push(teamIndex));
  }
  return order;
}

function openFantasyMode(force = false) {
  if (!force && (state.drafted.length || state.spinning || state.currentResult || state.seasonResults)) return;
  elements.homePage.hidden = true;
  elements.game.hidden = true;
  elements.sandboxPage.hidden = true;
  elements.onlinePage.hidden = true;
  elements.achievementsPage.hidden = true;
  elements.fantasyPage.hidden = false;
  elements.modeSwitch.hidden = false;
  elements.gameViewButton.classList.remove("active");
  elements.achievementsViewButton.classList.remove("active");
  state.currentView = "fantasy";
  document.body.classList.remove("nightmare-mode", "sandbox-mode", "online-mode");
  document.body.classList.add("fantasy-mode");
  if (!state.fantasy) resetFantasyMode();
  syncModeNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeFantasyMode() { showHome(); }

function resetFantasyMode() {
  state.fantasy = {
    selectedSpot: 1,
    started: false,
    complete: false,
    simComplete: false,
    pool: [],
    order: [],
    pickIndex: 0,
    teams: [],
    log: [],
    season: null,
  };
  elements.fantasySetup.hidden = false;
  elements.fantasyDraftRoom.hidden = true;
  elements.fantasySeasonCenter.hidden = true;
  elements.fantasySimButton.hidden = true;
  elements.fantasySimButton.disabled = false;
  elements.fantasySimButton.textContent = "SIMULATE FANTASY SEASON";
  elements.fantasySearch.value = "";
  selectFantasySpot(1);
}

function selectFantasySpot(spot) {
  if (!state.fantasy || state.fantasy.started || spot < 1 || spot > 4) return;
  state.fantasy.selectedSpot = spot;
  elements.fantasySpotButtons.querySelectorAll("button[data-spot]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.spot) === spot);
  });
  elements.fantasyStartButton.textContent = `START DRAFT FROM PICK ${spot}`;
}

function startFantasyDraft() {
  if (!state.fantasy || state.fantasy.started) return;
  const userIndex = state.fantasy.selectedSpot - 1;
  let cpuNumber = 1;
  state.fantasy.teams = Array.from({ length: 4 }, (_, index) => ({
    index,
    name: index === userIndex ? "YOUR TEAM" : `CPU ${cpuNumber++}`,
    roster: [],
  }));
  state.fantasy.userIndex = userIndex;
  state.fantasy.pool = buildFantasyPlayerPool();
  state.fantasy.order = fantasyDraftOrder();
  state.fantasy.pickIndex = 0;
  state.fantasy.started = true;
  state.fantasy.complete = false;
  state.fantasy.log = [];
  elements.fantasySetup.hidden = true;
  elements.fantasyDraftRoom.hidden = false;
  elements.fantasySeasonCenter.hidden = true;
  advanceFantasyCPUs();
}

function currentFantasyTeamIndex() {
  if (!state.fantasy?.started || state.fantasy.pickIndex >= state.fantasy.order.length) return null;
  return state.fantasy.order[state.fantasy.pickIndex];
}

function fantasyRoundNumber() {
  return Math.floor(state.fantasy.pickIndex / 4) + 1;
}

function cpuFantasySelection() {
  const remaining = state.fantasy.pool;
  const windowSize = Math.min(12, remaining.length);
  const window = remaining.slice(0, windowSize);
  if (!window.length) return null;
  const weights = window.map((_, index) => Math.pow(windowSize - index, 1.7));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;
  for (let index = 0; index < window.length; index += 1) {
    roll -= weights[index];
    if (roll <= 0) return window[index];
  }
  return window[0];
}

function recordFantasyPick(teamIndex, candidate) {
  const team = state.fantasy.teams[teamIndex];
  team.roster.push(candidate);
  state.fantasy.pool = state.fantasy.pool.filter((entry) => entry.key !== candidate.key);
  const overallPick = state.fantasy.pickIndex + 1;
  const round = Math.floor(state.fantasy.pickIndex / 4) + 1;
  state.fantasy.log.push({ overallPick, round, teamIndex, teamName: team.name, player: candidate });
  state.fantasy.pickIndex += 1;
}

function advanceFantasyCPUs() {
  if (!state.fantasy?.started) return;
  while (state.fantasy.pickIndex < state.fantasy.order.length && currentFantasyTeamIndex() !== state.fantasy.userIndex) {
    const teamIndex = currentFantasyTeamIndex();
    const candidate = cpuFantasySelection();
    if (!candidate) break;
    recordFantasyPick(teamIndex, candidate);
  }
  if (state.fantasy.pickIndex >= state.fantasy.order.length) {
    state.fantasy.complete = true;
    elements.fantasySimButton.hidden = false;
  }
  renderFantasyDraft();
}

function fantasyMakePick(key) {
  if (!state.fantasy?.started || state.fantasy.complete || currentFantasyTeamIndex() !== state.fantasy.userIndex) return;
  const candidate = state.fantasy.pool.find((entry) => entry.key === key);
  if (!candidate) return;
  recordFantasyPick(state.fantasy.userIndex, candidate);
  advanceFantasyCPUs();
}

function renderFantasyDraft() {
  if (!state.fantasy?.started) return;
  const complete = state.fantasy.complete;
  const currentIndex = currentFantasyTeamIndex();
  const round = complete ? 7 : fantasyRoundNumber();
  elements.fantasyRoundLabel.textContent = `ROUND ${round} / 7`;
  elements.fantasyPickLabel.textContent = complete ? "DRAFT COMPLETE" : `OVERALL PICK ${state.fantasy.pickIndex + 1} / 28`;
  elements.fantasyDraftStatus.textContent = complete
    ? "All four seven-player rosters are complete. Simulate the six-game league season."
    : currentIndex === state.fantasy.userIndex
      ? `YOU'RE ON THE CLOCK · PICK ${state.fantasy.pickIndex + 1}`
      : `${state.fantasy.teams[currentIndex]?.name || "CPU"} IS PICKING`;
  renderFantasyBoard();
  renderFantasyRosters();
  renderFantasyLog();
}

function fantasyPlayerImage(candidate) {
  const seasonEntry = SEASONS.find((entry) => entry.number === candidate.season);
  const teamEntry = seasonEntry?.teams.find((entry) => entry.code === candidate.teamCode);
  if (!seasonEntry || !teamEntry) return "";
  return getPlayerDetails(candidate, seasonEntry, teamEntry).image || "";
}

function renderFantasyBoard() {
  if (!state.fantasy?.started) return;
  const query = elements.fantasySearch.value.trim().toLowerCase();
  const userTurn = currentFantasyTeamIndex() === state.fantasy.userIndex && !state.fantasy.complete;
  const filtered = state.fantasy.pool.filter((candidate) => {
    if (!query) return true;
    return `${candidate.name} ${candidate.teamName} ${candidate.teamCode} season ${candidate.season}`.toLowerCase().includes(query);
  });
  const visible = filtered;
  elements.fantasyPlayerBoard.innerHTML = visible.length ? visible.map((candidate) => {
    const image = fantasyPlayerImage(candidate);
    return `<button class="fantasy-player-row" type="button" data-key="${escapeHtml(candidate.key)}" ${userTurn ? "" : "disabled"}>
      <span class="fantasy-adp">#${candidate.adp}</span>
      <span class="fantasy-avatar">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : escapeHtml(initials(candidate.name))}</span>
      <span class="fantasy-player-main"><strong>${escapeHtml(candidate.name)}</strong><small>S${candidate.season} ${escapeHtml(candidate.teamCode)} · ${escapeHtml(candidate.teamName)}</small></span>
      <span class="fantasy-rating"><strong>${candidate.fantasyRating.toFixed(1)}</strong><small>ADP OVR</small></span>
      <span class="fantasy-side-rating"><strong>${candidate.offense.rating}</strong><small>${candidate.offense.position}</small></span>
      <span class="fantasy-side-rating"><strong>${candidate.defense.rating}</strong><small>${candidate.defense.position}</small></span>
    </button>`;
  }).join("") : `<div class="fantasy-empty">No undrafted players match that search.</div>`;
  elements.fantasyPlayerBoard.querySelectorAll("button[data-key]").forEach((button) => {
    button.addEventListener("click", () => fantasyMakePick(button.dataset.key));
  });
}

function bestFantasyStartingFour(roster) {
  if (roster.length < 4) return null;
  let best = null;
  combinationsOf(roster, 4).forEach((group) => {
    const metrics = metricsForPlayers(group);
    if (metrics.overall === null) return;
    const simOverall = (metrics.offenseSimRating + metrics.defenseSimRating) / 2;
    const quality = metrics.overall * 100 + simOverall;
    if (!best || quality > best.quality) best = { players: group, metrics, simOverall, quality };
  });
  return best;
}

function renderFantasyRosters() {
  elements.fantasyRosters.innerHTML = state.fantasy.teams.map((team) => {
    const best = bestFantasyStartingFour(team.roster);
    const starterKeys = new Set(best?.players.map((candidate) => candidate.key) || []);
    const rosterLines = Array.from({ length: 7 }, (_, index) => {
      const candidate = team.roster[index];
      if (!candidate) return `<li class="empty"><span>${index + 1}</span><strong>OPEN</strong><small>—</small></li>`;
      return `<li${starterKeys.has(candidate.key) ? ' class="starter"' : ""}>
        <span>${index + 1}</span><strong>${escapeHtml(candidate.name)}</strong><small>S${candidate.season} ${escapeHtml(candidate.teamCode)} · ${candidate.fantasyRating.toFixed(1)}</small>
      </li>`;
    }).join("");
    return `<section class="fantasy-roster-card${team.index === state.fantasy.userIndex ? " user" : ""}">
      <header><div><span>DRAFT SPOT ${team.index + 1}</span><h3>${escapeHtml(team.name)}</h3></div><strong>${best?.metrics.overall ?? "—"}<small>OVR</small></strong></header>
      <ol>${rosterLines}</ol>
    </section>`;
  }).join("");
}

function renderFantasyLog() {
  const entries = [...state.fantasy.log].reverse();
  elements.fantasyDraftLog.innerHTML = entries.length ? entries.map((entry) =>
    `<div class="fantasy-log-row"><span>${entry.overallPick}</span><strong>${escapeHtml(entry.teamName)}</strong><b>${escapeHtml(entry.player.name)}</b><small>S${entry.player.season} ${escapeHtml(entry.player.teamCode)} · ${entry.player.fantasyRating.toFixed(1)}</small></div>`
  ).join("") : `<div class="fantasy-empty">The draft log will populate as picks are made.</div>`;
}

function fantasyGame(teamA, teamB, label, playoff = false) {
  const lineupA = bestFantasyStartingFour(teamA.roster);
  const lineupB = bestFantasyStartingFour(teamB.roster);
  const metricsA = lineupA.metrics;
  const metricsB = lineupB.metrics;
  const boostA = playoff ? playoffTraitBoost(metricsA) * 18 : 0;
  const boostB = playoff ? playoffTraitBoost(metricsB) * 18 : 0;
  const strengthA = (metricsA.offenseSimRating + metricsA.defenseSimRating) / 2 + boostA;
  const strengthB = (metricsB.offenseSimRating + metricsB.defenseSimRating) / 2 + boostB;
  const chanceA = clamp(0.5 + (strengthA - strengthB) * 0.028, 0.08, 0.92);
  const aWon = Math.random() < chanceA;
  let scoreA = clamp(Math.round(39 + (metricsA.offenseSimRating - metricsB.defenseSimRating) * 1.25 + randomNormal() * 10), 10, 84);
  let scoreB = clamp(Math.round(39 + (metricsB.offenseSimRating - metricsA.defenseSimRating) * 1.25 + randomNormal() * 10), 10, 84);
  if (aWon && scoreA <= scoreB) {
    if (scoreB >= 78) { scoreA = 84; scoreB = Math.min(scoreB, 77); }
    else scoreA = Math.min(84, scoreB + randomItem([3, 4, 6, 7, 10]));
  }
  if (!aWon && scoreB <= scoreA) {
    if (scoreA >= 78) { scoreB = 84; scoreA = Math.min(scoreA, 77); }
    else scoreB = Math.min(84, scoreA + randomItem([3, 4, 6, 7, 10]));
  }
  return { label, teamA, teamB, scoreA, scoreB, winner: aWon ? teamA : teamB, loser: aWon ? teamB : teamA };
}

function simulateFantasySeason() {
  if (!state.fantasy?.complete || state.fantasy.simComplete) return;
  const teams = state.fantasy.teams;
  const games = [];
  for (let first = 0; first < teams.length; first += 1) {
    for (let second = first + 1; second < teams.length; second += 1) {
      games.push(fantasyGame(teams[first], teams[second], "Regular Season"));
      games.push(fantasyGame(teams[second], teams[first], "Regular Season"));
    }
  }

  const standings = teams.map((team) => ({ team, wins: 0, losses: 0, pf: 0, pa: 0, diff: 0 }));
  const rowFor = (team) => standings.find((row) => row.team.index === team.index);
  games.forEach((game) => {
    const rowA = rowFor(game.teamA);
    const rowB = rowFor(game.teamB);
    rowA.pf += game.scoreA; rowA.pa += game.scoreB;
    rowB.pf += game.scoreB; rowB.pa += game.scoreA;
    if (game.winner.index === game.teamA.index) { rowA.wins += 1; rowB.losses += 1; }
    else { rowB.wins += 1; rowA.losses += 1; }
  });
  standings.forEach((row) => { row.diff = row.pf - row.pa; });
  standings.sort((first, second) =>
    second.wins - first.wins || second.diff - first.diff || second.pf - first.pf || first.team.index - second.team.index);
  standings.forEach((row, index) => { row.seed = index + 1; });

  const semifinal = fantasyGame(standings[1].team, standings[2].team, "Semifinal", true);
  const bowl = fantasyGame(standings[0].team, semifinal.winner, "RCAA Bowl", true);
  state.fantasy.season = { games, standings, semifinal, bowl, champion: bowl.winner };
  state.fantasy.simComplete = true;
  elements.fantasySimButton.disabled = true;
  elements.fantasySimButton.textContent = "SEASON COMPLETE";
  renderFantasySeason();
}

function renderFantasySeason() {
  const season = state.fantasy?.season;
  if (!season) return;
  elements.fantasySeasonCenter.hidden = false;
  elements.fantasyStandings.innerHTML = `<table class="fantasy-standings-table">
    <thead><tr><th>SEED</th><th>TEAM</th><th>W-L</th><th>PF</th><th>PA</th><th>DIFF</th><th>OVR</th></tr></thead>
    <tbody>${season.standings.map((row) => {
      const best = bestFantasyStartingFour(row.team.roster);
      return `<tr${row.team.index === state.fantasy.userIndex ? ' class="user-row"' : ""}><td>${row.seed}</td><td>${escapeHtml(row.team.name)}</td><td>${row.wins}-${row.losses}</td><td>${row.pf}</td><td>${row.pa}</td><td>${row.diff >= 0 ? "+" : ""}${row.diff}</td><td>${best.metrics.overall}</td></tr>`;
    }).join("")}</tbody></table>`;

  elements.fantasySchedule.innerHTML = season.games.map((game, index) => {
    const userGame = game.teamA.index === state.fantasy.userIndex || game.teamB.index === state.fantasy.userIndex;
    return `<div class="fantasy-game-row${userGame ? " user-game" : ""}">
      <span>GAME ${index + 1}</span><strong>${escapeHtml(game.teamA.name)} ${game.scoreA}–${game.scoreB} ${escapeHtml(game.teamB.name)}</strong><small>${escapeHtml(game.winner.name)} wins</small>
    </div>`;
  }).join("");

  elements.fantasyPlayoffs.innerHTML = `
    <div class="fantasy-playoff-card"><span>SEMIFINAL · #2 vs #3</span><strong>${escapeHtml(season.semifinal.teamA.name)} ${season.semifinal.scoreA}–${season.semifinal.scoreB} ${escapeHtml(season.semifinal.teamB.name)}</strong><small>${escapeHtml(season.semifinal.winner.name)} advances</small></div>
    <div class="fantasy-playoff-card bowl"><span>RCAA BOWL · #1 vs semifinal winner</span><strong>${escapeHtml(season.bowl.teamA.name)} ${season.bowl.scoreA}–${season.bowl.scoreB} ${escapeHtml(season.bowl.teamB.name)}</strong><small>${escapeHtml(season.bowl.winner.name)} wins the championship</small></div>`;
  elements.fantasyChampion.textContent = `${season.champion.name} — FANTASY DRAFT CHAMPIONS`;
  elements.fantasySeasonCenter.scrollIntoView({ behavior: "smooth", block: "start" });
}

function loadAchievements() {
  try { return JSON.parse(window.localStorage.getItem(ACHIEVEMENT_STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

function saveAchievements() {
  try { window.localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(state.achievements)); }
  catch { /* Progress remains available for this tab. */ }
}

function unlockAchievement(id) {
  if (state.achievements[id]) return;
  state.achievements[id] = true;
  saveAchievements();
  renderAchievements();
  const achievement = ACHIEVEMENTS.find((entry) => entry.id === id);
  if (achievement) {
    state.toastQueue.push(achievement);
    showNextToast();
  }
}

function renderAchievements() {
  const unlocked = ACHIEVEMENTS.filter((achievement) => state.achievements[achievement.id]).length;
  elements.achievementCount.textContent = `${unlocked} / ${ACHIEVEMENTS.length}`;
  elements.achievementGrid.innerHTML = ACHIEVEMENTS.map((achievement) => {
    const isUnlocked = Boolean(state.achievements[achievement.id]);
    return `<article class="achievement-card${isUnlocked ? "" : " locked"}${achievement.legendary ? " legendary" : ""}">
      <span class="achievement-state">${isUnlocked ? "UNLOCKED" : "LOCKED"}</span>
      <span class="achievement-icon">${achievement.icon}</span>
      <h2>${achievement.name}</h2><p>${achievement.description}</p>
    </article>`;
  }).join("");
}

function showNextToast() {
  if (state.toastShowing || !state.toastQueue.length) return;
  state.toastShowing = true;
  const achievement = state.toastQueue.shift();
  elements.achievementToastName.textContent = achievement.name;
  elements.achievementToast.hidden = false;
  window.setTimeout(() => {
    elements.achievementToast.hidden = true;
    state.toastShowing = false;
    showNextToast();
  }, 2400);
}

function randomInteger(minimum, maximum) { return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; }
function clamp(value, minimum, maximum) { return Math.min(maximum, Math.max(minimum, value)); }

function resetGame({ stayInMode = false } = {}) {
  const previousMode = state.mode;
  resetCoreRunState();
  state.mode = previousMode;
  state.lineups = { offense: Array(draftSize()).fill(null), defense: Array(draftSize()).fill(null) };
  elements.finishOverlay.hidden = true;
  if (elements.playerDialog.open) elements.playerDialog.close();
  if (elements.gameStatsDialog.open) elements.gameStatsDialog.close();
  elements.reelSeason.textContent = "—";
  elements.reelTeam.textContent = "REB";
  elements.reelTeamName.textContent = "WAITING FOR THE SPIN";
  elements.pickNumber.textContent = "1";
  elements.pickTotal.textContent = String(draftSize());
  document.body.classList.toggle("nightmare-mode", state.mode === "nightmare");
  elements.offenseFormation.textContent = state.mode === "bench" ? "1 QB · 3 WR · 1 BENCH" : "1 QB · 3 WR";
  elements.defenseFormation.textContent = state.mode === "bench" ? "1 RUSH · 3 CB · 1 BENCH" : "1 RUSH · 3 CB";
  elements.spinButtonText.textContent = "ROLL ROUND 1";
  elements.statusLine.textContent = state.mode === "nightmare" ? "No rerolls. TEAM GOAT waits at the end." : "Roll a season and team, then choose one player.";
  elements.marketContent.hidden = true;
  elements.marketEmpty.hidden = false;
  elements.marketEmpty.querySelector("h2").textContent = "YOUR NEXT PICK STARTS HERE";
  elements.marketEmpty.querySelector("p").textContent = "The roll chooses the history. You choose the player.";
  elements.startSeasonButton.hidden = true;
  elements.startSeasonButton.textContent = "START YOUR SEASON";
  elements.hindsightPanel.hidden = false;
  renderEraTrack();
  renderRoster();
  updateActionButtons();
  if (state.mode === "sandbox") { state.currentView = "sandbox"; renderSandbox(); }
  else { state.currentView = "game"; elements.game.hidden = false; elements.homePage.hidden = true; elements.sandboxPage.hidden = true; elements.fantasyPage.hidden = true; }
  syncModeNav();
  if (!stayInMode && state.currentView === "home") showHome();
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

init();
