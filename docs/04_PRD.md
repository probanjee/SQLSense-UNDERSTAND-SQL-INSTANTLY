# SQLSense — Product Requirements Document (PRD)

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This Product Requirements Document (PRD) defines the complete product scope, functional requirements, non-functional requirements, and release criteria for SQLSense v1.0. It is the authoritative specification that drives engineering implementation, QA testing, and acceptance validation.

**Related Documents:**
- [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md)
- [05_USER_STORIES.md](./05_USER_STORIES.md)
- [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md)
- [07_TRD.md](./07_TRD.md)

---

## 1. Product Vision

**For** students, junior developers, and interview candidates **who** struggle to understand SQL queries, **SQLSense** is a free developer education tool **that** provides instant plain-English explanations, clause breakdowns, complexity analysis, optimization suggestions, and query flow visualizations. **Unlike** generic SQL tutorials or StackOverflow answers, **SQLSense** provides structured, multi-dimensional analysis of any SQL query the user provides, without executing it against a database.

---

## 2. Scope

### 2.1 In Scope (v1.0)

| Feature Category | Features |
|---|---|
| **SQL Analysis** | Plain-English explanation, clause breakdown, complexity scoring, optimization tips, query flow visualization |
| **Authentication** | Email/password sign-up, email/password sign-in, session persistence, sign-out |
| **History** | Save explanations, view saved history, delete saved entries |
| **Dashboard** | Welcome banner, stats overview, quick actions, recent saved queries |
| **Examples** | Curated example queries at beginner/intermediate/advanced levels |
| **About** | Project description, how-it-works, tech stack, author information |
| **Security** | Input validation, DOM sanitization, RLS, environment variable protection |
| **Infrastructure** | Vercel deployment, Supabase auth + database, CI/CD pipeline |

### 2.2 Out of Scope (v1.0)

| Feature | Planned Version |
|---|---|
| Google OAuth | v1.1 |
| GitHub OAuth | v1.1 |
| AI/LLM-powered explanations | v2.0 |
| Query comparison (diff) | v2.0 |
| Collaborative sharing | v2.0 |
| Embeddable widget | v2.0 |
| Multi-language explanations | v3.0 |
| VS Code extension | v3.0 |
| Public API | v3.0 |
| Light theme | v1.1 |
| Real-time analysis (as-you-type) | v1.1 |

---

## 3. Functional Requirements

### FR-01: SQL Query Input

| ID | Requirement | Priority |
|---|---|---|
| FR-01.1 | The system shall provide a text input area for SQL queries on the landing page | P0 |
| FR-01.2 | The text input shall use a monospace font (JetBrains Mono) | P0 |
| FR-01.3 | The text input shall accept multi-line SQL queries | P0 |
| FR-01.4 | The text input shall enforce a maximum character limit of 5,000 characters | P0 |
| FR-01.5 | The system shall display a character count indicator | P1 |
| FR-01.6 | The text input shall include a clear/reset button | P1 |
| FR-01.7 | The system shall provide a placeholder text with an example query format | P1 |
| FR-01.8 | The text input shall be accessible via keyboard (Tab to focus, Ctrl+Enter to submit) | P0 |

### FR-02: SQL Query Analysis

| ID | Requirement | Priority |
|---|---|---|
| FR-02.1 | The system shall parse SQL queries using `node-sql-parser` on the client side | P0 |
| FR-02.2 | The system shall generate a plain-English explanation of the query's purpose | P0 |
| FR-02.3 | The system shall produce a breakdown of each SQL clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, LIMIT, UNION, subqueries, CTEs, window functions) | P0 |
| FR-02.4 | The system shall calculate a complexity score from 1 to 10 | P0 |
| FR-02.5 | The system shall classify complexity as Simple (1–3), Moderate (4–6), Complex (7–8), or Expert (9–10) | P0 |
| FR-02.6 | The system shall generate optimization suggestions based on query patterns | P0 |
| FR-02.7 | The system shall generate a query flow visualization showing logical execution order | P1 |
| FR-02.8 | The system shall display analysis results in a tabbed interface | P0 |
| FR-02.9 | The system shall handle parse errors gracefully with user-friendly error messages | P0 |
| FR-02.10 | The system shall support MySQL, PostgreSQL, SQLite, and Transact-SQL dialects | P0 |
| FR-02.11 | The system shall NEVER execute any SQL query against any database | P0 |

### FR-03: Analysis Output Display

| ID | Requirement | Priority |
|---|---|---|
| FR-03.1 | Analysis results shall be displayed in five tabs: Explanation, Clauses, Complexity, Optimization, Flow | P0 |
| FR-03.2 | The Explanation tab shall be the default active tab | P0 |
| FR-03.3 | Each tab shall have a copy-to-clipboard button for its content | P1 |
| FR-03.4 | The Complexity tab shall include a visual progress bar showing the score | P1 |
| FR-03.5 | The Optimization tab shall display tips as a numbered list with icons | P1 |
| FR-03.6 | The Flow tab shall display a visual diagram of execution order | P1 |
| FR-03.7 | The system shall show a loading skeleton during analysis | P0 |
| FR-03.8 | The system shall display an empty state before the first analysis | P0 |

### FR-04: Authentication

| ID | Requirement | Priority |
|---|---|---|
| FR-04.1 | The system shall provide email/password sign-up via Supabase Auth | P0 |
| FR-04.2 | The system shall provide email/password sign-in via Supabase Auth | P0 |
| FR-04.3 | The system shall maintain persistent sessions using Supabase session tokens | P0 |
| FR-04.4 | The system shall provide a sign-out action | P0 |
| FR-04.5 | The system shall redirect authenticated users away from `/sign-in` and `/sign-up` | P0 |
| FR-04.6 | The system shall redirect unauthenticated users from protected routes to `/sign-in` | P0 |
| FR-04.7 | The system shall validate email format using Zod | P0 |
| FR-04.8 | The system shall require passwords of at least 8 characters | P0 |
| FR-04.9 | The sign-up form shall include a confirm password field | P0 |
| FR-04.10 | The system shall display inline validation errors below form fields | P0 |
| FR-04.11 | The system shall display a loading state on auth buttons during requests | P0 |
| FR-04.12 | The system shall show success/error toast notifications after auth actions | P0 |

### FR-05: Saved Query History

| ID | Requirement | Priority |
|---|---|---|
| FR-05.1 | Authenticated users shall be able to save analysis results | P0 |
| FR-05.2 | Saved data shall include: query text, explanation, complexity score, optimization tips | P0 |
| FR-05.3 | The history page shall display all saved queries in reverse chronological order | P0 |
| FR-05.4 | Each history entry shall show: truncated SQL, explanation preview, complexity badge, timestamp | P0 |
| FR-05.5 | Users shall be able to view the full analysis of a saved query | P0 |
| FR-05.6 | Users shall be able to delete individual saved queries | P0 |
| FR-05.7 | Delete actions shall require confirmation via a dialog | P0 |
| FR-05.8 | The history page shall display an empty state when no queries are saved | P0 |
| FR-05.9 | Users shall only see their own saved queries (Row-Level Security) | P0 |
| FR-05.10 | The save button shall only be visible to authenticated users | P0 |
| FR-05.11 | Guest users attempting to save shall be prompted to sign in | P0 |

### FR-06: Dashboard

| ID | Requirement | Priority |
|---|---|---|
| FR-06.1 | The dashboard shall display a welcome message with the user's email or display name | P0 |
| FR-06.2 | The dashboard shall show stats cards: total queries saved, highest complexity score | P1 |
| FR-06.3 | The dashboard shall provide quick action buttons: Analyze New Query, View History, Browse Examples | P0 |
| FR-06.4 | The dashboard shall display the 3 most recent saved queries | P1 |
| FR-06.5 | The dashboard shall include a "View All History" link to `/history` | P0 |
| FR-06.6 | The dashboard shall show appropriate empty states for new users | P0 |

### FR-07: Example Queries

| ID | Requirement | Priority |
|---|---|---|
| FR-07.1 | The examples page shall display a curated library of SQL queries | P0 |
| FR-07.2 | Each example shall have a difficulty level: Beginner, Intermediate, or Advanced | P0 |
| FR-07.3 | Users shall be able to filter examples by difficulty level | P0 |
| FR-07.4 | Each example card shall display: difficulty badge, title, SQL code preview | P0 |
| FR-07.5 | Each example shall have a "Try This Query" button | P0 |
| FR-07.6 | Clicking "Try This Query" shall navigate to `/` with the query pre-filled | P0 |
| FR-07.7 | The examples library shall include at least 4 examples per difficulty level | P1 |

### FR-08: About Page

| ID | Requirement | Priority |
|---|---|---|
| FR-08.1 | The about page shall describe what SQLSense is and its purpose | P0 |
| FR-08.2 | The about page shall explain how the tool works (3-step process) | P0 |
| FR-08.3 | The about page shall list the technology stack | P1 |
| FR-08.4 | The about page shall display author information: Prosun Banerjee, prosunbanerjee8@gmail.com | P0 |

### FR-09: Navigation & Layout

| ID | Requirement | Priority |
|---|---|---|
| FR-09.1 | All pages shall include a sticky header with logo and navigation | P0 |
| FR-09.2 | All pages shall include a footer with author info and "Built for Digital Heroes" button | P0 |
| FR-09.3 | The "Built for Digital Heroes" button shall link to the Digital Heroes website | P0 |
| FR-09.4 | Navigation shall show auth-aware links (Dashboard/History for authenticated users) | P0 |
| FR-09.5 | Mobile navigation shall use a hamburger menu with full-screen overlay | P0 |
| FR-09.6 | The footer shall display: Prosun Banerjee, prosunbanerjee8@gmail.com | P0 |

---

## 4. Non-Functional Requirements

### NFR-01: Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-01.1 | Initial page load time | < 2 seconds on 4G connection |
| NFR-01.2 | SQL analysis response time | < 500ms (client-side parsing) |
| NFR-01.3 | Time to Interactive (TTI) | < 3 seconds |
| NFR-01.4 | Lighthouse Performance score | > 90 |
| NFR-01.5 | JavaScript bundle size (initial) | < 500KB gzipped |
| NFR-01.6 | First Contentful Paint (FCP) | < 1.5 seconds |

### NFR-02: Security

| ID | Requirement | Target |
|---|---|---|
| NFR-02.1 | SQL queries must never be executed | Enforced architecturally (no database connection from parser) |
| NFR-02.2 | All user input must be sanitized with DOMPurify before rendering | All rendered content |
| NFR-02.3 | Input length must be limited to prevent DoS | 5,000 character max |
| NFR-02.4 | Supabase RLS must be enabled on saved_queries table | All operations |
| NFR-02.5 | API keys must be stored in environment variables, not source code | All secrets |
| NFR-02.6 | HTTPS must be enforced for all connections | All traffic |
| NFR-02.7 | Content Security Policy headers must be configured | Vercel config |

### NFR-03: Accessibility

| ID | Requirement | Target |
|---|---|---|
| NFR-03.1 | WCAG 2.1 AA compliance | All interactive elements |
| NFR-03.2 | Keyboard navigation for all features | Complete tab order |
| NFR-03.3 | Screen reader compatibility | ARIA labels, roles, and live regions |
| NFR-03.4 | Color contrast ratios | Minimum 4.5:1 for normal text, 3:1 for large text |
| NFR-03.5 | Reduced motion support | `prefers-reduced-motion` media query |
| NFR-03.6 | Focus indicators | Visible on all interactive elements |

### NFR-04: Responsiveness

| ID | Requirement | Target |
|---|---|---|
| NFR-04.1 | Desktop layout | ≥ 1024px |
| NFR-04.2 | Tablet layout | 768px – 1023px |
| NFR-04.3 | Mobile layout | < 768px |
| NFR-04.4 | Minimum supported width | 320px |
| NFR-04.5 | Touch targets on mobile | Minimum 44px × 44px |

### NFR-05: Reliability

| ID | Requirement | Target |
|---|---|---|
| NFR-05.1 | Uptime | 99.9% (aligned with Vercel SLA) |
| NFR-05.2 | Error recovery | Graceful error handling with retry options |
| NFR-05.3 | Offline core feature | SQL parsing works without network (future) |

### NFR-06: Maintainability

| ID | Requirement | Target |
|---|---|---|
| NFR-06.1 | TypeScript strict mode | Enabled |
| NFR-06.2 | Component unit test coverage | > 80% |
| NFR-06.3 | ESLint + Prettier | Configured and enforced |
| NFR-06.4 | Documentation | Comprehensive JSDoc for public APIs |

---

## 5. Data Requirements

### 5.1 User Data

| Field | Type | Source |
|---|---|---|
| User ID | UUID | Supabase Auth |
| Email | String | User input → Supabase Auth |
| Password | Hashed | User input → Supabase Auth |
| Created At | Timestamp | Supabase Auth |
| Session Token | JWT | Supabase Auth |

### 5.2 Saved Query Data

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | Primary key, auto-generated | Unique identifier |
| `user_id` | UUID | Foreign key → auth.users, NOT NULL | Owner of the saved query |
| `query_text` | TEXT | NOT NULL, max 5,000 chars | The original SQL query |
| `explanation` | TEXT | NOT NULL | Plain-English explanation |
| `complexity` | INTEGER | NOT NULL, 1–10 | Complexity score |
| `optimization_tips` | TEXT | NULLABLE | JSON array of optimization suggestions |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | When the query was saved |

### 5.3 Data Retention

| Data Type | Retention Period | Deletion |
|---|---|---|
| User accounts | Indefinite (until user deletes) | Account deletion removes all data |
| Saved queries | Indefinite (until user deletes) | User-initiated deletion |
| Session tokens | 1 hour (Supabase default, auto-refresh) | Automatic |
| Analytics events | 30 days | Automatic (Vercel Analytics) |

---

## 6. Integration Requirements

### 6.1 Supabase Integration

| Integration Point | Purpose | Method |
|---|---|---|
| Supabase Auth | User authentication | `@supabase/supabase-js` client SDK |
| Supabase PostgreSQL | Saved queries storage | `@supabase/supabase-js` client SDK |
| Supabase RLS | Data isolation | PostgreSQL policies |

### 6.2 Vercel Integration

| Integration Point | Purpose | Method |
|---|---|---|
| Vercel Hosting | Application deployment | Git-based deployment |
| Vercel Analytics | Usage tracking | Vercel Analytics SDK |
| Vercel Edge Network | CDN and edge caching | Automatic |

### 6.3 Third-Party Libraries

| Library | Version | Purpose | License |
|---|---|---|---|
| `node-sql-parser` | Latest | SQL → AST parsing | Apache 2.0 |
| `dompurify` | Latest | XSS sanitization | Apache 2.0 / MPL 2.0 |
| `zustand` | Latest | State management | MIT |
| `zod` | Latest | Schema validation | MIT |
| `lucide-react` | Latest | Icon library | ISC |

---

## 7. Release Criteria

### 7.1 Must-Have for v1.0 Release

| Criteria | Verification Method |
|---|---|
| All P0 functional requirements implemented | Manual testing + automated tests |
| SQL analysis produces accurate results for all supported dialects | Test suite with 50+ SQL queries |
| Authentication flow works end-to-end | Manual testing |
| Saved queries with RLS work correctly | Integration tests |
| All pages render correctly on desktop, tablet, and mobile | Manual responsive testing |
| Lighthouse Performance > 90 | Lighthouse CI |
| Lighthouse Accessibility > 90 | Lighthouse CI |
| No critical or high security vulnerabilities | Security audit |
| All text content is reviewed for accuracy | Manual review |
| Footer displays correct author info and CTA | Manual verification |

### 7.2 Nice-to-Have for v1.0 Release

| Criteria | Impact if Missing |
|---|---|
| P1 features implemented | Minor UX degradation |
| Test coverage > 80% | Acceptable at > 60% for v1.0 |
| Lighthouse SEO > 90 | Acceptable at > 80% for v1.0 |
| Animation choreography complete | Acceptable with basic transitions |

---

## 8. Assumptions and Dependencies

### 8.1 Assumptions

| Assumption | Impact if Invalid |
|---|---|
| Supabase free tier will remain available | Need alternative auth/database provider |
| Vercel Hobby Plan limits are sufficient | Need to optimize or upgrade |
| `node-sql-parser` supports required SQL dialects | Need alternative parser or custom parsing |
| Users have modern browsers (Chrome, Firefox, Safari, Edge) | IE11 support not planned |
| Users have JavaScript enabled | Core feature requires JavaScript |

### 8.2 Dependencies

| Dependency | Type | Risk Level |
|---|---|---|
| Supabase service availability | External | Low (99.9% SLA) |
| Vercel service availability | External | Low (99.99% SLA) |
| `node-sql-parser` maintenance | Open source | Medium (active project) |
| Google Fonts CDN | External | Low (Google infrastructure) |
| npm registry | Development | Low |

---

## 9. Future Considerations

### 9.1 Scalability

| Concern | Current Approach | Future Approach |
|---|---|---|
| Traffic spikes | Vercel auto-scaling (free tier limits) | Vercel Pro plan |
| Database size | Supabase free tier (500MB) | Supabase Pro plan |
| Analysis accuracy | Rule-based engine | AI/LLM-powered analysis |
| User accounts | Supabase free tier (50,000 MAU) | Supabase Pro plan |

### 9.2 Internationalization (i18n)

The v1.0 interface is English-only. Future versions should:
- Use `next-intl` for UI string internationalization
- Support explanation output in multiple languages
- Consider RTL layout support for Arabic/Hebrew

### 9.3 Analytics Strategy

| Metric | Tracking Method |
|---|---|
| Page views | Vercel Analytics |
| Feature usage | Client-side custom events |
| Error rates | Error boundary logging |
| User demographics | Supabase Auth metadata |

---

*This PRD is the authoritative product specification for SQLSense v1.0. All engineering, testing, and review activities must reference this document. Changes require version increment and stakeholder review.*
