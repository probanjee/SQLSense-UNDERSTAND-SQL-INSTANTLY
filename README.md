# SQLSense — Understand SQL Instantly

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?logo=nextdotjs)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20RLS-3FCF8E.svg?logo=supabase)](https://supabase.com/)
[![Cost](https://img.shields.io/badge/Cost-%240-success.svg)](#cost)

SQLSense is a client-side SQL education tool that turns `SELECT` queries into plain-English explanations, clause breakdowns, complexity classifications, optimization tips, and logical query-flow views. User SQL is parsed in the browser and is never executed against a database.

## Problem statement

SQL learners often need to understand unfamiliar queries without creating sample schemas, exposing data, or running potentially unsafe statements. SQLSense provides immediate, structured feedback using a deterministic parser and rule-based explanation engine.

## Features

- Client-side SQL parsing with clean validation errors
- Plain-English query explanations
- Clause-by-clause breakdowns
- Simple, Intermediate, and Advanced complexity classification
- Rule-based optimization guidance
- Logical query-flow visualization
- Supabase email/password and OAuth authentication
- Per-user saved-query history protected by PostgreSQL Row-Level Security
- Dashboard statistics derived from saved queries
- Responsive Neo-Brutalist interface

## Tech stack

- Next.js 15 App Router, React 19, and TypeScript
- Tailwind CSS v4 and shadcn/ui primitives
- `node-sql-parser` for AST generation
- Zod for runtime validation
- Supabase Auth and PostgreSQL with RLS
- Vitest for unit tests
- Vercel for deployment

## Screenshots

> Add production screenshots here before the final public submission.

- Homepage and SQL explanation
- Authentication pages
- Dashboard
- Saved-query history

## Repository structure

```text
.
├── docs/                 # Product, technical, security, and deployment docs
├── sqlsense-ui/          # Deployable Next.js application
│   ├── src/app/          # App Router pages
│   ├── src/features/     # Auth, SQL analysis, and history logic
│   └── .env.example      # Public environment template
├── supabase/schema.sql   # saved_queries table and RLS policies
├── LICENSE
└── README.md
```

## Local setup

Prerequisites: Node.js 20+, pnpm 10+, Git, and a Supabase project.

```bash
git clone <repository-url>
cd SQL/sqlsense-ui
pnpm install
Copy-Item .env.example .env.local
pnpm run dev
```

On macOS/Linux, use `cp .env.example .env.local`. Open
`http://localhost:3000`.

Run verification:

```bash
pnpm run lint
pnpm run build
npx vitest run
```

## Supabase setup

1. Create a free Supabase project.
2. Open the SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Confirm RLS is enabled on `saved_queries`.
4. Confirm SELECT, INSERT, and DELETE policies restrict rows to
   `auth.uid() = user_id`.
5. Enable the desired Auth providers.
6. Configure the local and production Site URL/redirect URLs.

The application uses only the public project URL and anon/publishable key. A
Supabase service-role key is neither required nor used.

## Environment variables

Create `sqlsense-ui/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

`.env.local` is ignored by Git. Never commit real credentials.

## Vercel deployment

Import the GitHub repository into Vercel and configure:

| Setting | Value |
|---|---|
| Framework | Next.js |
| Root Directory | `sqlsense-ui` |
| Install Command | `pnpm install` |
| Build Command | `pnpm run build` |
| Output Directory | Next.js default |

Add both environment variables to Production, Preview, and Development. After
deployment, add the Vercel URL to Supabase Auth Site URL and redirect URLs.

## Security model

- SQL input is limited to 5,000 characters and parsed only in the browser.
- Only `SELECT` statements are accepted by the explanation engine.
- User SQL is rendered as escaped React text and is never executed.
- Saved-query payloads and identifiers are validated with Zod.
- Supabase RLS provides per-user data isolation.
- Provider/database details are not exposed in public error messages.
- No service-role key or privileged database client exists in the application.

## Digital Heroes requirement

Every standard application page uses the shared footer containing:

- Prosun Banerjee
- prosunbanerjee8@gmail.com
- Button text exactly: **Built for Digital Heroes**

## Cost

**$0** using the free tiers of Vercel and Supabase plus open-source libraries.

## Author

**Prosun Banerjee**
[prosunbanerjee8@gmail.com](mailto:prosunbanerjee8@gmail.com)

## License

Licensed under the [MIT License](LICENSE).
