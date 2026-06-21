# SQLSense — Project Overview

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Pre-Development

---

## Purpose

This document provides a comprehensive overview of the SQLSense project — its mission, scope, target audience, technical foundation, and strategic context. It serves as the single source of truth for all stakeholders, contributors, and future maintainers.

**Related Documents:**
- [01_DESIGN_BRIEF.md](./01_DESIGN_BRIEF.md)
- [04_PRD.md](./04_PRD.md)
- [07_TRD.md](./07_TRD.md)
- [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md)

---

## 1. Project Identity

| Attribute | Value |
|---|---|
| **Project Name** | SQLSense |
| **Tagline** | Understand SQL Instantly |
| **Category** | Developer Education Tool |
| **Author** | Prosun Banerjee |
| **Email** | prosunbanerjee8@gmail.com |
| **License** | MIT (Public Repository) |
| **Repository** | Public GitHub |
| **Budget** | $0 (Zero-cost infrastructure) |
| **Deployment Target** | Vercel Hobby Plan |

---

## 2. Problem Statement

### The Gap in SQL Education

SQL is one of the most in-demand technical skills, yet many learners face critical barriers:

1. **Opaque Query Behavior:** SQL queries, especially complex ones with multiple JOINs, subqueries, CTEs, and window functions, are difficult to mentally trace. Learners often cannot predict what a query will do just by reading it.

2. **Fragmented Learning Resources:** Existing SQL learning tools focus on writing queries from scratch but rarely help learners understand existing queries — the kind they encounter in codebases, interviews, and documentation.

3. **No Instant Feedback Loop:** When a student encounters an unfamiliar SQL query in a textbook, interview prep, or open-source project, there is no fast, reliable way to get a plain-English explanation without executing the query against a live database.

4. **Interview Anxiety:** SQL is a staple of technical interviews. Candidates need to quickly read, understand, and explain SQL queries — a skill that requires structured practice with feedback.

5. **Optimization Blindness:** Junior developers often write functional but inefficient SQL. They lack awareness of performance implications of their query patterns.

### The Consequence

Learners spend excessive time struggling with query comprehension, build fragile mental models, and arrive at interviews underprepared. There is no free, dedicated tool that takes a SQL query as input and produces a structured, educational explanation as output.

---

## 3. Solution — SQLSense

SQLSense is a free, web-based developer education tool that helps users understand SQL queries instantly.

### How It Works

1. The user pastes a SQL query into the editor.
2. SQLSense parses the query using `node-sql-parser` (client-side, no execution).
3. SQLSense generates:
   - **Plain-English Explanation** — A natural language summary of what the query does.
   - **Clause Breakdown** — Each SQL clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, LIMIT, etc.) explained individually.
   - **Complexity Analysis** — A complexity score based on the number and type of operations.
   - **Optimization Suggestions** — Actionable tips to improve query performance.
   - **Query Flow Visualization** — A visual diagram showing the logical execution order.

### What It Does NOT Do

- **SQLSense never executes SQL queries.** It is a parser and analyzer, not a database client.
- **SQLSense never connects to any database.** All analysis happens client-side in the browser.
- **SQLSense never stores raw SQL on the server without user consent.** Saving is an explicit, authenticated action.

---

## 4. Target Audience

### Primary Users

| Persona | Description | Key Need |
|---|---|---|
| **CS Students** | Undergraduate/graduate students learning SQL in database courses | Understand textbook queries, prepare for exams |
| **Junior Developers** | Early-career developers encountering SQL in production codebases | Quickly comprehend inherited queries, learn patterns |
| **Interview Candidates** | Engineers preparing for technical interviews involving SQL | Practice reading and explaining queries under time pressure |
| **Bootcamp Learners** | Students in coding bootcamps with limited SQL exposure | Bridge the gap between tutorial SQL and real-world SQL |

### Secondary Users

| Persona | Description | Key Need |
|---|---|---|
| **Teaching Assistants** | TAs who need to explain SQL queries to students | Generate clear explanations for office hours |
| **Technical Writers** | Authors documenting SQL-heavy systems | Produce accurate plain-English query descriptions |
| **Self-Taught Developers** | Developers learning SQL independently | Get structured feedback without a mentor |

---

## 5. Core Feature Set

### 5.1 SQL Query Explainer (Core)

The primary feature. Accepts a SQL query as text input and produces a multi-dimensional analysis.

| Output Component | Description |
|---|---|
| Plain-English Explanation | Human-readable summary of the query's purpose and behavior |
| Clause Breakdown | Individual explanation of each SQL clause with its role |
| Complexity Analysis | Numeric score (1–10) with classification (Simple, Moderate, Complex, Expert) |
| Optimization Suggestions | List of actionable performance improvement tips |
| Query Flow Visualization | Visual diagram showing the logical execution order of operations |

**Supported SQL Dialects (via node-sql-parser):**
- MySQL
- PostgreSQL
- SQLite
- Transact-SQL (SQL Server)
- MariaDB

### 5.2 Authentication System

| Feature | Description |
|---|---|
| Email/Password Sign-Up | New user registration with email and password |
| Email/Password Sign-In | Returning user authentication |
| Session Persistence | Supabase session tokens with automatic refresh |
| Protected Routes | Dashboard and history pages require authentication |
| Guest Access | Explainer and analysis available without sign-in |
| Future: Google OAuth | Planned for v1.1 |
| Future: GitHub OAuth | Planned for v1.1 |

### 5.3 History & Saved Queries

| Feature | Description |
|---|---|
| Save Explanation | Authenticated users can save any analysis result |
| View History | Chronological list of saved queries with explanations |
| Delete History | Users can delete individual saved queries |
| User Isolation | Row-Level Security ensures users see only their own data |

### 5.4 Example Queries

A curated library of example SQL queries spanning difficulty levels, pre-loaded for users to explore and learn from.

| Difficulty | Examples |
|---|---|
| Beginner | Basic SELECT, WHERE, ORDER BY |
| Intermediate | JOINs, GROUP BY, HAVING, subqueries |
| Advanced | CTEs, window functions, complex aggregations |

---

## 6. Technical Foundation

### 6.1 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 | Server-side rendering, routing, API routes |
| **UI Library** | React 19 | Component-based UI |
| **Language** | TypeScript | Type safety, developer experience |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Components** | shadcn/ui | Accessible, customizable component library |
| **Icons** | Lucide React | Consistent iconography |
| **State Management** | Zustand | Lightweight, performant global state |
| **Validation** | Zod | Runtime schema validation |
| **Sanitization** | DOMPurify | XSS prevention for rendered content |
| **SQL Parsing** | node-sql-parser | Client-side SQL AST generation |
| **Authentication** | Supabase Auth | Email/password auth, session management |
| **Database** | Supabase PostgreSQL | Persistent storage with RLS |
| **Testing** | Vitest + React Testing Library | Unit and integration testing |
| **Hosting** | Vercel | Serverless deployment, edge network |

### 6.2 Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   CLIENT (Browser)               │
│                                                   │
│  ┌─────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ React   │  │ node-sql-    │  │ Zustand     │ │
│  │ UI      │──│ parser       │  │ Store       │ │
│  │ (shadcn)│  │ (Client-side)│  │ (State)     │ │
│  └────┬────┘  └──────────────┘  └─────────────┘ │
│       │                                           │
└───────┼───────────────────────────────────────────┘
        │ HTTPS
┌───────┼───────────────────────────────────────────┐
│       ▼           VERCEL (Server)                  │
│  ┌─────────────────────────────────┐               │
│  │  Next.js API Routes            │               │
│  │  (Server-side validation)      │               │
│  └────────────┬────────────────────┘               │
│               │                                    │
└───────────────┼────────────────────────────────────┘
                │ Supabase SDK
┌───────────────┼────────────────────────────────────┐
│               ▼        SUPABASE                    │
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │  Supabase Auth   │  │  PostgreSQL            │  │
│  │  (Sessions)      │  │  (saved_queries + RLS) │  │
│  └──────────────────┘  └────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### 6.3 Key Architectural Decisions

| Decision | Rationale |
|---|---|
| Client-side SQL parsing | Zero server cost for core feature; instant feedback; no security risk from SQL execution |
| Supabase over custom backend | Free tier covers all needs; built-in auth, database, and RLS; reduces development time |
| Vercel Hobby Plan | Free hosting with excellent Next.js integration; automatic deployments from GitHub |
| Zustand over Redux | Simpler API for the scale of this application; less boilerplate; excellent TypeScript support |
| shadcn/ui over Material UI | Owns the code (copy-paste model); better customization; smaller bundle size |
| DOMPurify for sanitization | Industry-standard XSS prevention; critical because user-provided SQL is rendered in the UI |

---

## 7. Pages & Navigation

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | Landing / Explainer | Public | Hero section + SQL input + analysis output |
| `/sign-in` | Sign In | Public (redirect if authenticated) | Email/password sign-in form |
| `/sign-up` | Sign Up | Public (redirect if authenticated) | Email/password registration form |
| `/dashboard` | Dashboard | Protected | User's personalized dashboard with quick actions |
| `/history` | Saved History | Protected | List of saved query explanations |
| `/examples` | Example Queries | Public | Curated library of example SQL queries |
| `/about` | About | Public | Project information, author details |

---

## 8. User Access Matrix

| Feature | Guest User | Authenticated User |
|---|---|---|
| Paste and analyze SQL query | ✅ | ✅ |
| View plain-English explanation | ✅ | ✅ |
| View clause breakdown | ✅ | ✅ |
| View complexity analysis | ✅ | ✅ |
| View optimization suggestions | ✅ | ✅ |
| View query flow visualization | ✅ | ✅ |
| Browse example queries | ✅ | ✅ |
| View about page | ✅ | ✅ |
| Save explanations | ❌ | ✅ |
| View saved history | ❌ | ✅ |
| Delete saved history | ❌ | ✅ |
| Access dashboard | ❌ | ✅ |

---

## 9. Non-Functional Requirements

| Requirement | Target | Rationale |
|---|---|---|
| **Performance** | < 2s for query analysis | Client-side parsing should be near-instant |
| **Accessibility** | WCAG 2.1 AA | Inclusive design for all users |
| **Responsiveness** | Mobile, tablet, desktop | Students use various devices |
| **SEO** | Lighthouse SEO > 90 | Discoverability for students searching for SQL help |
| **Security** | No SQL execution, input sanitization, RLS | Protect users and infrastructure |
| **Availability** | 99.9% (Vercel SLA) | Reliable access for interview prep |
| **Bundle Size** | < 500KB initial load | Fast load times on slow connections |
| **Browser Support** | Chrome, Firefox, Safari, Edge (last 2 versions) | Cover the majority of users |

---

## 10. Constraints

| Constraint | Impact | Mitigation |
|---|---|---|
| $0 budget | No paid APIs, services, or infrastructure | Use Supabase free tier, Vercel hobby plan, open-source libraries |
| Vercel Hobby Plan limits | 100GB bandwidth/month, serverless function limits | Client-side parsing reduces server load significantly |
| Supabase free tier limits | 500MB database, 50,000 monthly active users, 2GB bandwidth | Sufficient for an educational tool; monitor usage |
| No LLM/AI integration (v1) | Explanations are rule-based, not AI-generated | High-quality rule engine; AI planned for future versions |
| Single developer | Development speed limited | Comprehensive documentation enables efficient development |

---

## 11. Success Metrics

| Metric | Target (6 months) | Measurement Method |
|---|---|---|
| Monthly Active Users | 500+ | Vercel Analytics |
| Queries Analyzed | 5,000+/month | Client-side analytics events |
| User Registrations | 200+ | Supabase Auth dashboard |
| Saved Queries | 1,000+ | Database query |
| GitHub Stars | 50+ | GitHub repository |
| Lighthouse Performance | > 90 | Lighthouse CI |
| Lighthouse Accessibility | > 90 | Lighthouse CI |
| Test Coverage | > 80% | Vitest coverage report |

---

## 12. Project Timeline

| Phase | Duration | Milestone |
|---|---|---|
| Phase 1: Documentation | Week 1 | Complete documentation package |
| Phase 2: Project Setup | Week 2 | Next.js project, Supabase setup, CI/CD |
| Phase 3: Core UI | Week 3 | Landing page, layout, navigation, theming |
| Phase 4: SQL Parser | Week 4 | Parser integration, explanation engine |
| Phase 5: Auth System | Week 5 | Sign-up, sign-in, protected routes |
| Phase 6: Database & History | Week 6 | Save, view, delete queries |
| Phase 7: Dashboard & Examples | Week 7 | Dashboard page, example library |
| Phase 8: Polish & Testing | Week 8 | Animations, accessibility, testing |
| Phase 9: Security Audit | Week 9 | Security review, penetration testing |
| Phase 10: Deployment | Week 10 | Production deployment, monitoring |

---

## 13. Future Expansion Considerations

| Feature | Version | Description |
|---|---|---|
| Google OAuth | v1.1 | Sign in with Google |
| GitHub OAuth | v1.1 | Sign in with GitHub |
| AI-Powered Explanations | v2.0 | LLM-generated natural language explanations |
| Query Comparison | v2.0 | Compare two queries side-by-side |
| Collaborative Sharing | v2.0 | Share explanations via unique URLs |
| Embed Widget | v2.0 | Embeddable SQL explainer for blogs and documentation |
| Multi-language Explanations | v3.0 | Explanations in Spanish, Hindi, Mandarin, etc. |
| VS Code Extension | v3.0 | Inline SQL explanations in the editor |
| API Access | v3.0 | Public API for programmatic SQL explanation |

---

## 14. Repository Structure (Planned)

```
sqlsense/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── examples/
│   │   └── about/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Header, Footer, Sidebar
│   │   ├── sql/                 # SQL input, output, visualization
│   │   └── auth/                # Auth forms, guards
│   ├── lib/
│   │   ├── supabase/            # Supabase client, helpers
│   │   ├── parser/              # SQL parser, explanation engine
│   │   ├── validators/          # Zod schemas
│   │   └── utils/               # Utility functions
│   ├── stores/                  # Zustand stores
│   ├── types/                   # TypeScript type definitions
│   └── styles/                  # Global styles
├── docs/                        # This documentation package
├── tests/                       # Test files
├── .env.local                   # Environment variables (gitignored)
├── .env.example                 # Environment variable template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

---

## 15. Glossary

| Term | Definition |
|---|---|
| **AST** | Abstract Syntax Tree — a tree representation of the syntactic structure of SQL |
| **Clause** | A component of a SQL statement (e.g., SELECT, FROM, WHERE) |
| **CTE** | Common Table Expression — a temporary named result set in SQL |
| **DOMPurify** | A library that sanitizes HTML to prevent XSS attacks |
| **node-sql-parser** | An npm package that parses SQL strings into AST objects |
| **RLS** | Row-Level Security — PostgreSQL feature that restricts row access per user |
| **shadcn/ui** | A component library that provides copy-paste React components |
| **Supabase** | An open-source Firebase alternative providing auth, database, and storage |
| **Vercel** | A cloud platform for deploying frontend applications |
| **Zustand** | A lightweight state management library for React |

---

*This document is the foundation of the SQLSense documentation package. All other documents reference and build upon the context established here.*
