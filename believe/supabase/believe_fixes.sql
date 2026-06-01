-- ============================================================
-- BELIEVE PLATFORM — Session 11 SQL Fixes
-- Run this AFTER believe_schema.sql and believe_seed_data.sql
-- ============================================================

-- ============================================================
-- FIX 1: Unique constraint on progress.resource_id
-- Required for upsert with onConflict: 'resource_id' to work
-- ============================================================

alter table progress
  add constraint progress_resource_id_unique unique (resource_id);


-- ============================================================
-- FIX 2: v_category_progress view
-- Replaces N+1 sequential queries in ProgressRings with 1 call
-- ============================================================

create or replace view v_category_progress as
select
  c.id           as category_id,
  c.slug         as category_slug,
  c.name         as category_name,
  c.color        as color,
  c.icon         as icon,
  c.sort_order   as sort_order,
  count(r.id)                                             as total,
  count(p.id) filter (where p.status = 'completed')      as completed,
  count(p.id) filter (where p.status = 'in_progress')    as in_progress,
  count(p.id) filter (where p.status = 'paused')         as paused
from categories c
left join resources r    on r.category_id = c.id
left join progress p     on p.resource_id = r.id
group by c.id, c.slug, c.name, c.color, c.icon, c.sort_order
order by c.sort_order;


-- ============================================================
-- FIX 3: Row Level Security policies
-- Protects your personal data while keeping public resources readable
-- ============================================================

-- Enable RLS on all tables
alter table resources        enable row level security;
alter table opportunities    enable row level security;
alter table categories       enable row level security;
alter table subcategories    enable row level security;
alter table progress         enable row level security;
alter table bookmarks        enable row level security;
alter table notes            enable row level security;
alter table daily_goals      enable row level security;

-- Public read: resources, opportunities, categories (shared knowledge base)
create policy "Public read resources"
  on resources for select using (true);

create policy "Public read opportunities"
  on opportunities for select using (true);

create policy "Public read categories"
  on categories for select using (true);

create policy "Public read subcategories"
  on subcategories for select using (true);

-- Full access: personal tables (anon key = you, single-user app)
create policy "Full access progress"
  on progress for all using (true) with check (true);

create policy "Full access bookmarks"
  on bookmarks for all using (true) with check (true);

create policy "Full access notes"
  on notes for all using (true) with check (true);

create policy "Full access daily_goals"
  on daily_goals for all using (true) with check (true);


-- ============================================================
-- VERIFY — run these to confirm fixes applied correctly
-- ============================================================

-- Should return 1 row with constraint name
-- select conname from pg_constraint where conname = 'progress_resource_id_unique';

-- Should return 5-6 rows (one per category) with total/completed counts
-- select * from v_category_progress;

-- Should return all tables with rls enabled = true
-- select tablename, rowsecurity from pg_tables
-- where schemaname = 'public'
-- order by tablename;
