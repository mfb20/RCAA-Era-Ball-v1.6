-- v1.6 quick-fix rating sync
update public.rcaa_players set adp=98, player_data=jsonb_set(jsonb_set(player_data,'{adp}','98'::jsonb),'{defense,rating}','97'::jsonb) where card_key='1-kys-summrs';
update public.rcaa_players set adp=96, player_data=jsonb_set(jsonb_set(jsonb_set(player_data,'{adp}','96'::jsonb),'{offense,rating}','99'::jsonb),'{defense,rating}','93'::jsonb) where card_key='3-ybt-blonde';
update public.rcaa_players set adp=97.5, player_data=jsonb_set(jsonb_set(player_data,'{adp}','97.5'::jsonb),'{offense,rating}','97'::jsonb) where card_key='4-ob-perko';
update public.rcaa_players set adp=95.5, player_data=jsonb_set(jsonb_set(player_data,'{adp}','95.5'::jsonb),'{offense,rating}','98'::jsonb) where card_key='6-cjsu-cj';
