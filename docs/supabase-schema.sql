-- Lineup Studio · Supabase schema
-- 跑到 Supabase SQL editor 一次即可

-- 项目表
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default '未命名项目',
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 索引(按用户拉列表常用)
create index if not exists projects_user_id_updated_idx
  on public.projects (user_id, updated_at desc);

-- RLS:用户只能看到/改/删自己的项目
alter table public.projects enable row level security;

drop policy if exists "users see own projects" on public.projects;
create policy "users see own projects"
  on public.projects for select
  using (auth.uid() = user_id);

drop policy if exists "users insert own projects" on public.projects;
create policy "users insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

drop policy if exists "users update own projects" on public.projects;
create policy "users update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

drop policy if exists "users delete own projects" on public.projects;
create policy "users delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- updated_at 自动维护
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute function public.touch_updated_at();
