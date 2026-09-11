create or replace function public.reb_generate_duel_roll(p_lobby_id uuid, p_user_id uuid, p_exclude jsonb default '[]'::jsonb)
returns jsonb
language plpgsql security definer set search_path='' as $$
declare
  chosen record;
  roll jsonb;
begin
  select season, team_code into chosen
  from public.rcaa_players
  where not exists (
    select 1 from jsonb_array_elements(coalesce(p_exclude,'[]'::jsonb)) e
    where (e->>'season')::integer = rcaa_players.season and e->>'team_code' = rcaa_players.team_code
  )
  group by season, team_code
  order by random()
  limit 1;

  if chosen.season is null then
    select season, team_code into chosen from public.rcaa_players group by season, team_code order by random() limit 1;
  end if;

  select jsonb_agg(player_data order by player_name) into roll
  from public.rcaa_players
  where season=chosen.season and team_code=chosen.team_code;

  update public.lobby_players set current_roll=roll, last_action_at=now()
  where lobby_id=p_lobby_id and user_id=p_user_id;
  return roll;
end $$;

revoke all on function public.reb_generate_duel_roll(uuid,uuid,jsonb) from public, anon, authenticated;

create or replace function public.start_reb_lobby(p_lobby_id uuid)
returns public.lobbies
language plpgsql security definer set search_path='' as $$
declare
  target public.lobbies%rowtype;
  member_count integer;
  member record;
  used_rolls jsonb := '[]'::jsonb;
  first_card jsonb;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into target from public.lobbies where id=p_lobby_id for update;
  if target.id is null then raise exception 'Lobby not found'; end if;
  if target.host_id<>auth.uid() then raise exception 'Only the host can start'; end if;
  if target.status<>'waiting' then raise exception 'Lobby already started'; end if;
  select count(*) into member_count from public.lobby_players where lobby_id=p_lobby_id;
  if member_count<>target.max_players then raise exception 'Lobby needs % players', target.max_players; end if;

  delete from public.fantasy_picks where lobby_id=p_lobby_id;
  delete from public.duel_picks where lobby_id=p_lobby_id;
  update public.lobby_players set ready=false,progress=0,roster='[]'::jsonb,lineup='{}'::jsonb,team_ovr=null,chemistry=0,current_roll=null,last_action_at=now() where lobby_id=p_lobby_id;

  if target.mode='fantasy' then
    update public.lobbies set status='drafting', current_pick=0, current_round=1,
      draft_order=(select array_agg(user_id order by seat) from public.lobby_players where lobby_id=p_lobby_id),
      season_results=null,winner_id=null,completed_at=null,game_state='{}'::jsonb
    where id=p_lobby_id returning * into target;
  else
    update public.lobbies set status='drafting', current_pick=0,current_round=1,draft_order='{}'::uuid[],season_results=null,winner_id=null,completed_at=null,game_state='{}'::jsonb
    where id=p_lobby_id returning * into target;
    for member in select user_id from public.lobby_players where lobby_id=p_lobby_id order by seat loop
      first_card := public.reb_generate_duel_roll(p_lobby_id,member.user_id,used_rolls);
      if jsonb_array_length(coalesce(first_card,'[]'::jsonb))>0 then
        used_rolls := used_rolls || jsonb_build_array(jsonb_build_object('season',(first_card->0->>'season')::integer,'team_code',first_card->0->>'teamCode'));
      end if;
    end loop;
  end if;
  return target;
end $$;

grant execute on function public.start_reb_lobby(uuid) to authenticated;

create or replace function public.make_duel_pick(p_lobby_id uuid, p_card_key text)
returns public.duel_picks
language plpgsql security definer set search_path='' as $$
declare
  target public.lobbies%rowtype;
  me public.lobby_players%rowtype;
  card public.rcaa_players%rowtype;
  inserted public.duel_picks%rowtype;
  picked_count integer;
  member_count integer;
  member record;
  used_rolls jsonb := '[]'::jsonb;
  new_roll jsonb;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into target from public.lobbies where id=p_lobby_id for update;
  if target.id is null or target.mode<>'duel' or target.status<>'drafting' then raise exception '1v1 draft is not active'; end if;
  select * into me from public.lobby_players where lobby_id=p_lobby_id and user_id=auth.uid() for update;
  if me.user_id is null then raise exception 'You are not in this lobby'; end if;
  if exists(select 1 from public.duel_picks where lobby_id=p_lobby_id and user_id=auth.uid() and round_number=target.current_round) then raise exception 'You already picked this round'; end if;
  if not exists(select 1 from jsonb_array_elements(coalesce(me.current_roll,'[]'::jsonb)) x where x->>'id'=p_card_key) then raise exception 'That card is not in your current roll'; end if;
  select * into card from public.rcaa_players where card_key=p_card_key;
  if card.card_key is null then raise exception 'Unknown player card'; end if;

  insert into public.duel_picks(lobby_id,user_id,round_number,card_key,player_snapshot)
  values(p_lobby_id,auth.uid(),target.current_round,p_card_key,card.player_data) returning * into inserted;

  update public.lobby_players set roster=roster || jsonb_build_array(card.player_data), progress=target.current_round,current_roll=null,last_action_at=now()
  where lobby_id=p_lobby_id and user_id=auth.uid();

  select count(*) into member_count from public.lobby_players where lobby_id=p_lobby_id;
  select count(*) into picked_count from public.duel_picks where lobby_id=p_lobby_id and round_number=target.current_round;
  if picked_count=member_count then
    if target.current_round>=4 then
      update public.lobbies set status='lineup',current_round=4 where id=p_lobby_id;
    else
      update public.lobbies set current_round=current_round+1 where id=p_lobby_id;
      for member in select user_id from public.lobby_players where lobby_id=p_lobby_id order by seat loop
        new_roll := public.reb_generate_duel_roll(p_lobby_id,member.user_id,used_rolls);
        if jsonb_array_length(coalesce(new_roll,'[]'::jsonb))>0 then
          used_rolls := used_rolls || jsonb_build_array(jsonb_build_object('season',(new_roll->0->>'season')::integer,'team_code',new_roll->0->>'teamCode'));
        end if;
      end loop;
    end if;
  end if;
  return inserted;
end $$;

grant execute on function public.make_duel_pick(uuid,text) to authenticated;

create or replace function public.submit_duel_team(p_lobby_id uuid,p_lineup jsonb,p_team_ovr numeric,p_chemistry numeric)
returns public.lobbies
language plpgsql security definer set search_path='' as $$
declare
  target public.lobbies%rowtype;
  ready_count integer;
  member_count integer;
  winner uuid;
  top_ovr numeric;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into target from public.lobbies where id=p_lobby_id for update;
  if target.id is null or target.mode<>'duel' or target.status not in ('lineup','complete') then raise exception '1v1 teams are not ready'; end if;
  if jsonb_array_length((select roster from public.lobby_players where lobby_id=p_lobby_id and user_id=auth.uid()))<>4 then raise exception 'Four picks required'; end if;
  update public.lobby_players set lineup=p_lineup,team_ovr=p_team_ovr,chemistry=p_chemistry,ready=true,last_action_at=now()
  where lobby_id=p_lobby_id and user_id=auth.uid();
  if not found then raise exception 'You are not in this lobby'; end if;
  select count(*),count(*) filter(where ready) into member_count,ready_count from public.lobby_players where lobby_id=p_lobby_id;
  if ready_count=member_count and member_count=2 then
    select max(team_ovr) into top_ovr from public.lobby_players where lobby_id=p_lobby_id;
    select user_id into winner from public.lobby_players where lobby_id=p_lobby_id and team_ovr=top_ovr order by chemistry desc, seat asc limit 1;
    update public.lobbies set status='complete',winner_id=winner,completed_at=now(),game_state=jsonb_build_object('finalized',true) where id=p_lobby_id returning * into target;
  else
    select * into target from public.lobbies where id=p_lobby_id;
  end if;
  return target;
end $$;

grant execute on function public.submit_duel_team(uuid,jsonb,numeric,numeric) to authenticated;

create or replace function public.finish_fantasy_season(p_lobby_id uuid,p_results jsonb,p_winner_id uuid)
returns public.lobbies
language plpgsql security definer set search_path='' as $$
declare target public.lobbies%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into target from public.lobbies where id=p_lobby_id for update;
  if target.id is null or target.mode<>'fantasy' then raise exception 'Fantasy lobby not found'; end if;
  if target.host_id<>auth.uid() then raise exception 'Only the host can simulate the season'; end if;
  if target.status<>'lineup' then raise exception 'The seven-round draft must be complete'; end if;
  if not exists(select 1 from public.lobby_players where lobby_id=p_lobby_id and user_id=p_winner_id) then raise exception 'Winner must be in lobby'; end if;
  update public.lobbies set status='complete',season_results=p_results,winner_id=p_winner_id,completed_at=now(),game_state=jsonb_build_object('simulated_by',auth.uid()) where id=p_lobby_id returning * into target;
  return target;
end $$;

grant execute on function public.finish_fantasy_season(uuid,jsonb,uuid) to authenticated;

create or replace function public.reset_reb_lobby(p_lobby_id uuid)
returns public.lobbies
language plpgsql security definer set search_path='' as $$
declare target public.lobbies%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into target from public.lobbies where id=p_lobby_id for update;
  if target.host_id<>auth.uid() then raise exception 'Only host can reset'; end if;
  delete from public.fantasy_picks where lobby_id=p_lobby_id;
  delete from public.duel_picks where lobby_id=p_lobby_id;
  update public.lobby_players set ready=false,progress=0,roster='[]'::jsonb,lineup='{}'::jsonb,team_ovr=null,chemistry=0,current_roll=null,last_action_at=now() where lobby_id=p_lobby_id;
  update public.lobbies set status='waiting',draft_order='{}'::uuid[],current_pick=0,current_round=0,season_results=null,winner_id=null,completed_at=null,game_state='{}'::jsonb where id=p_lobby_id returning * into target;
  return target;
end $$;

grant execute on function public.reset_reb_lobby(uuid) to authenticated;

-- v1.6 final hardening: seven-round snapshot overload and authenticated-only public RPC execution.
create or replace function public.make_fantasy_pick(p_lobby_id uuid, p_card_key text, p_player_snapshot jsonb)
returns public.fantasy_picks
language plpgsql security definer set search_path='' as $$
declare
  target public.lobbies%rowtype;
  player_count integer;
  round_index integer;
  seat_offset integer;
  expected_index integer;
  expected_user uuid;
  inserted public.fantasy_picks%rowtype;
  total_picks integer;
  offense_rating numeric;
  defense_rating numeric;
  supplied_adp numeric;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_player_snapshot is null or p_player_snapshot->>'id' <> p_card_key then raise exception 'Invalid player snapshot'; end if;
  offense_rating := (p_player_snapshot #>> '{offense,rating}')::numeric;
  defense_rating := (p_player_snapshot #>> '{defense,rating}')::numeric;
  supplied_adp := (p_player_snapshot->>'adp')::numeric;
  if offense_rating is null or defense_rating is null or offense_rating < 0 or offense_rating > 100 or defense_rating < 0 or defense_rating > 100 then raise exception 'Invalid player ratings'; end if;
  if round((offense_rating + defense_rating) / 2, 1) <> round(supplied_adp, 1) then raise exception 'Player ADP must equal offense/defense average'; end if;
  if coalesce(p_player_snapshot->>'name','') = '' or coalesce(p_player_snapshot->>'teamCode','') = '' then raise exception 'Incomplete player snapshot'; end if;
  select * into target from public.lobbies where id=p_lobby_id for update;
  if target.id is null or target.mode<>'fantasy' or target.status<>'drafting' then raise exception 'Draft is not active'; end if;
  player_count := array_length(target.draft_order,1);
  if player_count<>4 then raise exception 'Four players are required'; end if;
  total_picks := player_count*7;
  if target.current_pick>=total_picks then raise exception 'Draft is complete'; end if;
  round_index := target.current_pick/player_count;
  seat_offset := target.current_pick%player_count;
  expected_index := case when round_index%2=0 then seat_offset+1 else player_count-seat_offset end;
  expected_user := target.draft_order[expected_index];
  if expected_user<>auth.uid() then raise exception 'It is not your turn'; end if;
  insert into public.rcaa_players(card_key,season,team_code,player_name,adp,player_data)
  values(p_card_key,(p_player_snapshot->>'season')::integer,p_player_snapshot->>'teamCode',p_player_snapshot->>'name',supplied_adp,p_player_snapshot)
  on conflict(card_key) do nothing;
  insert into public.fantasy_picks(lobby_id,pick_number,round_number,user_id,card_key,player_snapshot)
  values(target.id,target.current_pick+1,round_index+1,auth.uid(),p_card_key,p_player_snapshot)
  returning * into inserted;
  update public.lobbies set current_pick=current_pick+1,status=case when current_pick+1>=total_picks then 'lineup' else status end where id=target.id;
  return inserted;
end $$;

revoke all on function public.start_reb_lobby(uuid) from public, anon;
revoke all on function public.make_duel_pick(uuid,text) from public, anon;
revoke all on function public.submit_duel_team(uuid,jsonb,numeric,numeric) from public, anon;
revoke all on function public.finish_fantasy_season(uuid,jsonb,uuid) from public, anon;
revoke all on function public.reset_reb_lobby(uuid) from public, anon;
grant execute on function public.start_reb_lobby(uuid) to authenticated;
grant execute on function public.make_duel_pick(uuid,text) to authenticated;
grant execute on function public.submit_duel_team(uuid,jsonb,numeric,numeric) to authenticated;
grant execute on function public.finish_fantasy_season(uuid,jsonb,uuid) to authenticated;
grant execute on function public.reset_reb_lobby(uuid) to authenticated;
