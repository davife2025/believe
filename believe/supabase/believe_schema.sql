-- ============================================================
-- BELIEVE PLATFORM — SUPABASE SCHEMA
-- Personal Knowledge Command Center
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- CORE LOOKUP TABLES
-- ============================================================

create table categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  icon text,
  color text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table subcategories (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now(),
  unique(category_id, slug)
);

-- ============================================================
-- RESOURCES TABLE
-- ============================================================

create table resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  url text not null,
  description text,
  category_id uuid references categories(id) on delete set null,
  subcategory_id uuid references subcategories(id) on delete set null,
  type text check (type in (
    'course', 'book', 'documentation', 'tool',
    'video', 'article', 'github', 'tutorial',
    'roadmap', 'podcast', 'newsletter', 'framework'
  )) not null,
  platform text,             -- e.g. Coursera, YouTube, GitHub
  author text,               -- creator or institution
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced', 'all_levels')),
  is_free boolean default true,
  duration text,             -- e.g. "40 hours", "3 months"
  language text default 'English',
  tags text[],
  has_certificate boolean default false,
  is_featured boolean default false,
  is_official boolean default false,  -- official docs / from the org itself
  rating numeric(2,1),       -- community rating out of 5
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_resources_category on resources(category_id);
create index idx_resources_subcategory on resources(subcategory_id);
create index idx_resources_type on resources(type);
create index idx_resources_difficulty on resources(difficulty);
create index idx_resources_is_free on resources(is_free);
create index idx_resources_tags on resources using gin(tags);

-- ============================================================
-- OPPORTUNITIES TABLE
-- ============================================================

create table opportunities (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  url text not null,
  description text,
  type text check (type in (
    'hackathon', 'grant', 'bounty', 'job',
    'fellowship', 'accelerator', 'competition'
  )) not null,
  organizer text,
  ecosystem text[],          -- e.g. ['Ethereum', 'Solana']
  prize_pool text,           -- e.g. "$50,000"
  deadline date,
  is_active boolean default true,
  is_recurring boolean default false,
  location text,             -- 'online', 'in-person', 'hybrid'
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_opportunities_type on opportunities(type);
create index idx_opportunities_is_active on opportunities(is_active);
create index idx_opportunities_ecosystem on opportunities using gin(ecosystem);

-- ============================================================
-- PERSONAL LAYER
-- ============================================================

create table progress (
  id uuid primary key default uuid_generate_v4(),
  resource_id uuid references resources(id) on delete cascade,
  status text check (status in ('not_started', 'in_progress', 'completed', 'paused')) default 'not_started',
  progress_percent int check (progress_percent between 0 and 100) default 0,
  started_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  resource_id uuid references resources(id) on delete cascade,
  opportunity_id uuid references opportunities(id) on delete cascade,
  note text,
  created_at timestamptz default now(),
  check (
    (resource_id is not null and opportunity_id is null) or
    (resource_id is null and opportunity_id is not null)
  )
);

create table notes (
  id uuid primary key default uuid_generate_v4(),
  resource_id uuid references resources(id) on delete cascade,
  title text,
  content text not null,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- DAILY GOALS
-- ============================================================

create table daily_goals (
  id uuid primary key default uuid_generate_v4(),
  date date not null default current_date,
  goal_text text not null,
  is_completed boolean default false,
  resource_id uuid references resources(id) on delete set null,
  created_at timestamptz default now()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger resources_updated_at before update on resources
  for each row execute function update_updated_at();

create trigger opportunities_updated_at before update on opportunities
  for each row execute function update_updated_at();

create trigger progress_updated_at before update on progress
  for each row execute function update_updated_at();

create trigger notes_updated_at before update on notes
  for each row execute function update_updated_at();

-- ============================================================
-- VIEWS
-- ============================================================

create view v_resources_with_progress as
select
  r.*,
  c.name as category_name,
  c.slug as category_slug,
  c.color as category_color,
  s.name as subcategory_name,
  p.status as progress_status,
  p.progress_percent,
  case when b.id is not null then true else false end as is_bookmarked
from resources r
left join categories c on r.category_id = c.id
left join subcategories s on r.subcategory_id = s.id
left join progress p on p.resource_id = r.id
left join bookmarks b on b.resource_id = r.id;

create view v_stats as
select
  (select count(*) from resources) as total_resources,
  (select count(*) from resources where is_free = true) as free_resources,
  (select count(*) from opportunities where is_active = true) as active_opportunities,
  (select count(*) from progress where status = 'completed') as completed_resources,
  (select count(*) from progress where status = 'in_progress') as in_progress_resources,
  (select count(*) from bookmarks) as bookmarks_count,
  (select count(*) from notes) as notes_count;
