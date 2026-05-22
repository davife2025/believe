# BELIEVE PLATFORM — Complete Deploy Guide
## From zero to live in under 30 minutes

---

## STEP 1 — Create the Next.js project

```bash
npx create-next-app@latest believe --typescript --tailwind --eslint --app --src-dir
cd believe
```

---

## STEP 2 — Install all dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react
npm install clsx tailwind-merge
```

---

## STEP 3 — Apply session files (in order)

Copy each session's `src/` folder into your project's `src/` folder.
Session files override previous ones where they overlap (that's intentional).

```
Session 1  → base scaffold, all pages, Supabase hooks
Session 2  → dashboard components
Session 3  → AI & ML roadmaps, reading list
Session 4  → AI Agents frameworks, MCP explorer
Session 5  → Blockchain chains, Solidity snippets, gas tracker
Session 6  → Security audit checklist, flashcards, CTF tracker
Session 7  → Opportunities calendar, grants, fellowships
Session 8  → Dev tools, stack recommender, project templates
Session 9  → Global search, bookmarks, notes
Session 10 → Responsive sidebar, keyboard shortcuts, this config
```

Also copy from Session 10:
- `next.config.ts` → project root
- `.env.example`   → project root (rename to `.env.local` and fill in)
- `vercel.json`    → project root

---

## STEP 4 — Supabase Setup

### 4a. Create Supabase project
1. Go to https://supabase.com → New Project → name it "believe"
2. Choose a region close to you (e.g. `eu-west-1` for West Africa/Europe)
3. Set a strong database password and save it

### 4b. Run the SQL files
Go to Supabase Dashboard → SQL Editor → New Query

**First:** paste and run `supabase/believe_schema.sql`
**Second:** paste and run `supabase/believe_seed_data.sql`

Verify with:
```sql
SELECT * FROM v_stats;
-- Should show: total_resources > 60, active_opportunities > 15
```

### 4c. Get your API keys
Supabase Dashboard → Settings → API → copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## STEP 5 — Configure .env.local

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## STEP 6 — Run locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see the Believe dashboard.

**Checklist:**
- [ ] Dashboard loads with stats (shows numbers not dashes)
- [ ] AI & ML page loads resources from DB
- [ ] Blockchain page shows chain cards
- [ ] Opportunities page shows hackathons
- [ ] ⌘K search opens and returns results
- [ ] Bookmarking a resource saves to DB
- [ ] Daily goal can be added and checked off

---

## STEP 7 — Deploy to Vercel

### Option A: Vercel CLI (fastest)
```bash
npm install -g vercel
vercel login
vercel --prod
```
Follow prompts — Vercel auto-detects Next.js.

### Option B: GitHub + Vercel Dashboard
1. Push your project to a GitHub repo (private is fine)
2. Go to https://vercel.com → New Project → Import from GitHub
3. Select your repo → Framework: Next.js → Deploy

### Add environment variables on Vercel
Vercel Dashboard → Your Project → Settings → Environment Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | your supabase url | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | https://your-app.vercel.app | Production |

Click **Redeploy** after adding env vars.

---

## STEP 8 — Supabase Production Config

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: `https://your-app.vercel.app/**`

In Supabase Dashboard → Settings → API:
- Add your Vercel domain to **Allowed Origins** (for CORS)

---

## STEP 9 — Custom Domain (Optional)

In Vercel Dashboard → Your Project → Settings → Domains:
- Add your domain (e.g. `believe.yourdomain.com`)
- Follow DNS instructions
- Update `NEXT_PUBLIC_APP_URL` env var to your new domain

---

## KEYBOARD SHORTCUTS REFERENCE

| Shortcut | Action |
|----------|--------|
| `G` then `H` | Go to Dashboard |
| `G` then `A` | Go to AI & ML |
| `G` then `E` | Go to AI Agents |
| `G` then `B` | Go to Blockchain |
| `G` then `S` | Go to Security |
| `G` then `D` | Go to Build Apps |
| `G` then `O` | Go to Opportunities |
| `G` then `N` | Go to Notes |
| `G` then `K` | Go to Bookmarks |
| `⌘K` | Open global search |
| `?` | Toggle shortcuts panel |
| `ESC` | Close modals/search |

---

## MAINTENANCE

### Adding new resources
```sql
-- In Supabase SQL Editor:
INSERT INTO resources (title, url, description, category_id, type, platform, author, difficulty, is_free, tags, is_featured)
SELECT
  'New Course Title',
  'https://course-url.com',
  'Description here',
  c.id, 'course', 'Platform Name', 'Author Name',
  'beginner', true,
  array['tag1', 'tag2'], false
FROM categories c WHERE c.slug = 'ai-ml';
```

### Adding new opportunities
```sql
INSERT INTO opportunities (title, url, description, type, organizer, ecosystem, prize_pool, is_active, location, tags)
VALUES (
  'New Hackathon', 'https://hackathon.com',
  'Description here', 'hackathon', 'Organizer',
  array['Ethereum'], '$100,000', true, 'online',
  array['ethereum', 'defi']
);
```

---

## PROJECT STRUCTURE (final)

```
believe/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx                      ← Dashboard
│   │   ├── ai-ml/page.tsx
│   │   ├── ai-agents/page.tsx
│   │   ├── blockchain/page.tsx
│   │   ├── blockchain-security/page.tsx
│   │   ├── building-apps/page.tsx
│   │   ├── opportunities/page.tsx
│   │   └── personal/
│   │       ├── bookmarks/page.tsx
│   │       └── notes/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx               ← Responsive (mobile + desktop)
│   │   │   ├── PageHeader.tsx
│   │   │   └── KeyboardShortcuts.tsx
│   │   ├── ui/
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── SubcategoryTabs.tsx
│   │   ├── dashboard/
│   │   │   ├── DailyGoals.tsx
│   │   │   ├── StreakCounter.tsx
│   │   │   ├── ProgressRings.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   └── QuickNotes.tsx
│   │   ├── resources/
│   │   │   ├── ResourceCard.tsx
│   │   │   └── ResourceGrid.tsx
│   │   ├── aiml/
│   │   │   ├── RoadmapPathView.tsx
│   │   │   └── ReadingList.tsx
│   │   ├── agents/
│   │   │   ├── FrameworkCard.tsx
│   │   │   ├── MCPExplorer.tsx
│   │   │   └── AgentProjectBuilder.tsx
│   │   ├── blockchain/
│   │   │   ├── ChainCard.tsx
│   │   │   ├── SoliditySnippets.tsx
│   │   │   └── GasTracker.tsx
│   │   ├── security/
│   │   │   ├── VulnerabilityFlashcards.tsx
│   │   │   ├── AuditChecklist.tsx
│   │   │   └── CTFAndBounties.tsx
│   │   ├── opportunities/
│   │   │   ├── HackathonCalendar.tsx
│   │   │   └── GrantFinder.tsx
│   │   ├── building/
│   │   │   ├── DevToolCard.tsx
│   │   │   └── StackRecommender.tsx
│   │   └── personal/
│   │       ├── GlobalSearch.tsx
│   │       ├── BookmarksManager.tsx
│   │       └── NotesManager.tsx
│   ├── data/
│   │   ├── aiml-roadmaps.ts
│   │   ├── agent-frameworks.ts
│   │   ├── blockchain-chains.ts
│   │   ├── security-data.ts
│   │   ├── opportunities-data.ts
│   │   └── building-apps-data.ts
│   ├── hooks/
│   │   ├── useResources.ts
│   │   └── useOpportunities.ts
│   └── lib/
│       ├── types.ts
│       ├── utils.ts
│       └── supabase/
│           ├── client.ts
│           └── server.ts
├── supabase/
│   ├── believe_schema.sql
│   └── believe_seed_data.sql
├── next.config.ts
├── vercel.json
├── tailwind.config.ts
├── .env.example
└── .env.local               ← NOT committed to git
```
