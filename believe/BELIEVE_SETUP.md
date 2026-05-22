# BELIEVE PLATFORM — SESSION 1 SETUP GUIDE
## Tech Stack: Next.js 14 + Supabase + Tailwind CSS + TypeScript

---

## 1. CREATE THE PROJECT

```bash
npx create-next-app@latest believe --typescript --tailwind --eslint --app --src-dir
cd believe
```

---

## 2. INSTALL DEPENDENCIES

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react
npm install clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-tooltip
```

---

## 3. ENVIRONMENT VARIABLES

Create `.env.local` in root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: https://supabase.com/dashboard > Your Project > Settings > API

---

## 4. FILE STRUCTURE

```
believe/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx         (root layout)
│   │   ├── page.tsx           (dashboard)
│   │   ├── ai-ml/
│   │   │   └── page.tsx
│   │   ├── ai-agents/
│   │   │   └── page.tsx
│   │   ├── blockchain/
│   │   │   └── page.tsx
│   │   ├── blockchain-security/
│   │   │   └── page.tsx
│   │   ├── building-apps/
│   │   │   └── page.tsx
│   │   └── opportunities/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsGrid.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── resources/
│   │   │   ├── ResourceCard.tsx
│   │   │   ├── ResourceGrid.tsx
│   │   │   └── ResourceFilters.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       └── ProgressBar.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      (browser client)
│   │   │   └── server.ts      (server client)
│   │   ├── types.ts           (all TypeScript types)
│   │   └── utils.ts           (helper functions)
│   └── hooks/
│       ├── useResources.ts
│       └── useOpportunities.ts
├── supabase/
│   ├── believe_schema.sql     (run this first)
│   └── believe_seed_data.sql  (run this second)
└── .env.local
```

---

## 5. RUN SUPABASE SETUP

1. Go to https://supabase.com and create a new project called "believe"
2. Go to SQL Editor in Supabase Dashboard
3. Paste and run `believe_schema.sql`
4. Paste and run `believe_seed_data.sql`
5. Verify: Run `SELECT * FROM v_stats;` — should show resource counts

---

## 6. SESSION ROADMAP

| Session | Focus |
|---------|-------|
| 1 (now) | Schema + Seed + Scaffold |
| 2 | Dashboard home (stats, activity, daily goal) |
| 3 | AI & ML section (resource library, filters) |
| 4 | AI Agents section |
| 5 | Blockchain multi-chain section |
| 6 | Blockchain Security section |
| 7 | Dev Opportunities (hackathons, grants, jobs) |
| 8 | Building Applications section |
| 9 | Progress tracking, bookmarks, notes, search |
| 10 | Polish, responsive, final deploy to Vercel |
