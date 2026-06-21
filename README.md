# SQLSense — Understand SQL Instantly

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?style=flat&logo=nextdotjs)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204.0-38B2AC.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment: Vercel](https://img.shields.io/badge/Deployment-Vercel-black.svg?style=flat&logo=vercel)](https://vercel.com)

SQLSense is a free, premium, web-based developer education tool that parses and analyzes SQL queries client-side to generate instant, structured, and easy-to-understand explanations. Designed for computer science students, junior developers, and interview candidates, SQLSense helps users visualize logical execution flows, inspect syntax block-by-block, and learn optimization strategies without connecting to or executing against a live database.

---

## 🌟 Key Features

*   🔍 **Instant SQL Parser:** Parse complex SQL statements (`SELECT`, `JOIN`, `GROUP BY`, Window functions, CTEs) client-side in real-time.
*   📝 **Plain-English Explanations:** Get a high-level, human-readable description of what your query accomplishes.
*   🧩 **Clause-by-Clause Breakdown:** Highlight individual SQL blocks and see exactly how each clause filters, joins, groups, or projects your data.
*   📈 **Complexity Analysis & Scoring:** Learn how complex your query is on a scale of 1–10, with clear category classifications (Simple, Moderate, Complex, Expert).
*   💡 **Optimization Engine:** Receive 10+ rule-based performance optimization suggestions directly in your browser.
*   🗺️ **Query Flow Diagram:** Visualize the logical execution order of SQL operations (e.g., how `FROM` and `JOIN` execute before `WHERE` and `SELECT`).
*   💾 **User Dashboard & History:** Securely sign up via Supabase Auth to save query analyses, review execution histories, and catalog learning examples.

---

## 🛠️ Technology Stack

*   **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (harmonic dark-theme design), [shadcn/ui](https://ui.shadcn.com/) components, [Lucide React](https://lucide.dev/) icons
*   **State & Validation:** [Zustand](https://zustand-demo.pmnd.rs/) (client-side state), [Zod](https://zod.dev/) (runtime validation)
*   **Core Logic:** [node-sql-parser](https://github.com/taoyuan/node-sql-parser) (AST generation), [DOMPurify](https://github.com/cure53/DOMPurify) (XSS prevention)
*   **Backend & Database:** [Supabase Auth](https://supabase.com/auth) & [Supabase PostgreSQL](https://supabase.com/database) with Row-Level Security (RLS)
*   **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
*   **Hosting:** [Vercel Hobby Plan](https://vercel.com/) (zero-cost serverless edge hosting)

---

## 📁 Repository Structure

```text
sqlsense/
├── docs/                        # Comprehensive documentation package
├── public/                      # Static assets (favicons, images, logos)
├── src/
│   ├── app/                     # Next.js page routing and layouts
│   ├── components/              # UI components (shadcn/ui, layouts, custom SQL views)
│   ├── lib/                     # Database utilities, parser logic, validators
│   ├── stores/                  # Zustand state stores
│   ├── styles/                  # Global stylesheet
│   └── types/                   # TypeScript typings
├── tests/                       # Automated unit and integration tests
├── .env.example                 # Environment variables template
├── next.config.ts               # Next.js configurations
├── tailwind.config.ts           # Tailwind custom tokens
├── tsconfig.json                # TypeScript settings
├── vitest.config.ts             # Vitest test framework configuration
└── README.md                    # Project landing documentation (This file)
```

---

## 📖 Complete Documentation Index

SQLSense pre-development phase is fully detailed across 23 specialized markdown files located in the [docs/](./docs/) directory. Together, they form a complete blueprint of the application before coding starts:

### 🌟 Phase 1: Strategy & Overview
*   [00_PROJECT_OVERVIEW.md](./docs/00_PROJECT_OVERVIEW.md) — Mission statement, audience personas, success metrics, and core constraints.
*   [01_DESIGN_BRIEF.md](./docs/01_DESIGN_BRIEF.md) — Creative vision, dark-theme palette selection, typographical scale, and spacing logic.
*   [02_DESIGN_PLAN.md](./docs/02_DESIGN_PLAN.md) — CSS utility rules, Tailwind design token mappings, and responsive viewport guidelines.
*   [03_UI_UX_BRIEF.md](./docs/03_UI_UX_BRIEF.md) — Interface wireframe specs, interactive element transitions, states, and animation curves.

### 📋 Phase 2: Product & Scope
*   [04_PRD.md](./docs/04_PRD.md) — Product Requirements Document mapping functional requirements, constraints, and system limits.
*   [05_USER_STORIES.md](./docs/05_USER_STORIES.md) — User persona definitions and 15 structured user stories with detailed acceptance parameters.
*   [06_ACCEPTANCE_CRITERIA.md](./docs/06_ACCEPTANCE_CRITERIA.md) — Gherkin-syntax (`Given/When/Then`) test criteria for every user story.

### 📐 Phase 3: Architecture & Flow
*   [07_TRD.md](./docs/07_TRD.md) — Technical Requirements Document defining dependencies, performance budgets, and operational limits.
*   [08_SYSTEM_ARCHITECTURE.md](./docs/08_SYSTEM_ARCHITECTURE.md) — Data flow sequences, API middleware structures, and system security boundaries.
*   [09_COMPONENT_ARCHITECTURE.md](./docs/09_COMPONENT_ARCHITECTURE.md) — Component tree diagram, Zustand state structures, and routing matrix.
*   [10_APP_FLOW.md](./docs/10_APP_FLOW.md) — Step-by-step application states matching user interaction paths.
*   [11_APP_LOGIC_SYSTEM.md](./docs/11_APP_LOGIC_SYSTEM.md) — Explanation parsing engine rules, complexity scoring math, and suggestion algorithms.

### 🔐 Phase 4: Authentication & Data
*   [12_AUTH_SYSTEM.md](./docs/12_AUTH_SYSTEM.md) — Supabase sign-up/sign-in flows, session handlers, and page redirect logic.
*   [13_DATABASE_DESIGN.md](./docs/13_DATABASE_DESIGN.md) — PostgreSQL table structures, indexing design, and entity relations (ERD).
*   [14_BACKEND_SCHEMA.md](./docs/14_BACKEND_SCHEMA.md) — Database DDL script, Row-Level Security (RLS) rules, and migration checklist.
*   [15_API_SPEC.md](./docs/15_API_SPEC.md) — OpenAPI specification definitions for save, retrieve, and delete query history endpoints.

### 🛡️ Phase 5: Verification & Deployment
*   [16_SECURITY_PLAN.md](./docs/16_SECURITY_PLAN.md) — Security guardrails, client-side sanitize routines, and threat vectors.
*   [17_SECURITY_AUDIT.md](./docs/17_SECURITY_AUDIT.md) — Design-phase security audit assessing OWASP Top 10 vulnerabilities.
*   [18_TASKS.md](./docs/18_TASKS.md) — Full development task backlog (106 items) divided by phase with time estimates.
*   [19_TEST_PLAN.md](./docs/19_TEST_PLAN.md) — Test strategy and validation checklist for Unit, Integration, E2E, and Accessibility audits.
*   [20_DEPLOYMENT_GUIDE.md](./docs/20_DEPLOYMENT_GUIDE.md) — Complete guide to Vercel production hosting, Supabase setup, and CI/CD pipelines.

### 📈 Phase 6: Roadmap & Governance
*   [21_ROADMAP.md](./docs/21_ROADMAP.md) — Multi-version roadmap mapping out v1.0, v1.1, v2.0, and v3.0 releases.
*   [22_CHANGELOG.md](./docs/22_CHANGELOG.md) — Project version tracker, Semantic Versioning guidelines, and patch history.
*   [23_RISK_REGISTER.md](./docs/23_RISK_REGISTER.md) — Risk matrix outlining technological, schedule, and cost mitigations.

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you will need:
*   [Node.js](https://nodejs.org/) (v20.x or higher)
*   [npm](https://www.npmjs.com/) (v10.x or higher)
*   A free [Supabase Account](https://supabase.com/)

### 🛠️ Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prosu/sqlsense.git
    cd sqlsense
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Copy the sample environment file to create your local copy:
    ```bash
    cp .env.example .env.local
    ```
    Open `.env.local` and add your Supabase credentials:
    ```text
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anonymous-api-key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5.  **Run the test suite:**
    ```bash
    npm run test
    ```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

*   **Author:** Prosun Banerjee
*   **Email:** [prosunbanerjee8@gmail.com](mailto:prosunbanerjee8@gmail.com)
