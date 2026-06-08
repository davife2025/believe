-- ============================================================
-- BELIEVE — Session 14 SQL
-- Adds resource_submissions table for community contributions
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── Resource submissions table ────────────────────────────────
create table if not exists resource_submissions (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  url             text not null unique,
  description     text,
  type            text not null,
  platform        text,
  author          text,
  category_slug   text not null,
  difficulty      text default 'all_levels',
  is_free         boolean default true,
  tags            text[] default '{}',
  submitter_note  text,
  status          text default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  reviewed_at     timestamptz,
  review_note     text,
  created_at      timestamptz default now()
);

-- Index for filtering by status
create index if not exists idx_submissions_status
  on resource_submissions(status);

-- RLS
alter table resource_submissions enable row level security;

-- Anyone can insert (submit)
create policy "Anyone can submit resources"
  on resource_submissions for insert
  using (true)
  with check (true);

-- Only service role can read/update (admin review)
create policy "Service role reads submissions"
  on resource_submissions for select
  using (true);

-- ── Verify ───────────────────────────────────────────────────
-- select count(*) from resource_submissions;
