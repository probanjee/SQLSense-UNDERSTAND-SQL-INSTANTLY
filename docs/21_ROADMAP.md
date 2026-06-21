# SQLSense — Product Roadmap

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This roadmap defines the planned evolution of SQLSense from MVP through future versions. Each release is scoped with specific features, timelines, and success criteria.

**Related Documents:**
- [04_PRD.md](./04_PRD.md)
- [18_TASKS.md](./18_TASKS.md)
- [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md)

---

## 1. Roadmap Overview

```
Q3 2026              Q4 2026              Q1 2027              Q2 2027
────────────────     ────────────────     ────────────────     ────────────────
v1.0 MVP             v1.1 Polish          v1.2 Features        v2.0 AI
────────────────     ────────────────     ────────────────     ────────────────
• SQL parsing        • OAuth (Google,     • Syntax             • AI-powered
• Explanation          GitHub)              highlighting         explanations
• Clause breakdown   • Password reset     • Query comparison   • LLM proxy
• Complexity scoring • Dark/light         • Export analysis     • Smart
• Optimization tips    theme toggle       • Search history       suggestions
• Query flow         • Enhanced           • Query tagging      • Natural
• Auth (email)         animations         • Pagination           language
• Save/delete/       • Error tracking     • Full-text search     to SQL
  history            • Account deletion   • Mobile gestures    • Usage
• Dashboard          • Better examples    • Keyboard             analytics
• Examples library   • Offline support      shortcuts
• About page           (PWA basics)
```

---

## 2. Version Details

### 2.1 v1.0.0 — MVP (Current Target)

**Goal:** Ship a fully functional SQL analysis tool with auth and history.

| Feature | Description | Status |
|---|---|---|
| SQL Parser | Client-side parsing via node-sql-parser | ⬜ Not Started |
| Explanation Engine | Rule-based plain-English explanations | ⬜ Not Started |
| Clause Breakdown | Per-clause analysis with SQL snippets | ⬜ Not Started |
| Complexity Scoring | 1–10 weighted scoring algorithm | ⬜ Not Started |
| Optimization Tips | Pattern-based suggestion engine (10 rules) | ⬜ Not Started |
| Query Flow | Visual execution order diagram | ⬜ Not Started |
| Auth (Email) | Sign up, sign in, sign out via Supabase | ⬜ Not Started |
| Save Queries | Save analysis results to database | ⬜ Not Started |
| Query History | View and delete saved queries | ⬜ Not Started |
| Dashboard | Stats, recent queries, quick actions | ⬜ Not Started |
| Examples Library | 15+ curated SQL examples by difficulty | ⬜ Not Started |
| About Page | Project info, tech stack, author | ⬜ Not Started |
| Responsive Design | Mobile-first responsive layout | ⬜ Not Started |
| Security | RLS, DOMPurify, security headers, HTTPS | ⬜ Not Started |

**Success Criteria:**
- All 9 user flows work end-to-end
- Lighthouse Performance > 90
- Lighthouse Accessibility > 90
- 0 critical/high npm audit vulnerabilities
- Deployed on Vercel with custom domain (optional)

**Estimated Effort:** ~121.5 hours (see [18_TASKS.md](./18_TASKS.md))

---

### 2.2 v1.1.0 — Polish & Auth Enhancement

**Goal:** Improve auth options, user experience, and add error tracking.

| Feature | Description | Effort |
|---|---|---|
| Google OAuth | Sign in with Google via Supabase | 4h |
| GitHub OAuth | Sign in with GitHub via Supabase | 4h |
| Password Reset | "Forgot password" email flow | 3h |
| Theme Toggle | Dark/light mode with system detection | 4h |
| Account Deletion | User-initiated account + data deletion | 3h |
| Error Tracking | Sentry integration for error monitoring | 2h |
| Enhanced Animations | Refined micro-interactions and transitions | 4h |
| More Examples | Expand examples library to 25+ | 2h |
| Offline Detection | Show toast when offline; queue saves | 3h |

**Estimated Effort:** ~29 hours

---

### 2.3 v1.2.0 — Feature Expansion

**Goal:** Add power-user features and better content management.

| Feature | Description | Effort |
|---|---|---|
| Syntax Highlighting | CodeMirror or Monaco for SQL input | 8h |
| Query Comparison | Side-by-side comparison of two queries | 12h |
| Export Analysis | Export as PDF, Markdown, or JSON | 6h |
| Search History | Full-text search across saved queries | 4h |
| Query Tagging | User-defined tags for organization | 6h |
| Pagination | Paginated history with load-more | 3h |
| Keyboard Shortcuts | Power-user shortcuts (Ctrl+K, etc.) | 4h |

**Estimated Effort:** ~43 hours

---

### 2.4 v2.0.0 — AI Integration

**Goal:** Integrate LLM-powered explanations alongside rule-based analysis.

| Feature | Description | Effort |
|---|---|---|
| AI Explanation Mode | LLM-generated explanations via API proxy | 16h |
| Rate Limiting (Redis) | Per-user rate limiting with Upstash Redis | 6h |
| Smart Suggestions | AI-powered optimization suggestions | 8h |
| Natural Language to SQL | Describe what you want → SQL generated | 12h |
| Usage Analytics | Track feature usage (privacy-respecting) | 8h |
| Query Sharing | Public shareable links for analyses | 8h |

**Estimated Effort:** ~58 hours

---

## 3. Non-Functional Roadmap

| Area | v1.0 | v1.1 | v1.2 | v2.0 |
|---|---|---|---|---|
| **Performance** | Lighthouse > 90 | Lighthouse > 95 | Sub-100ms parse | Async AI < 3s |
| **Accessibility** | WCAG 2.1 AA | Full keyboard nav | Screen reader audit | Maintained |
| **Security** | RLS + DOMPurify | CSP strict mode | SRI | Audit (3rd party) |
| **Testing** | > 80% coverage | > 85% coverage | E2E automation | > 90% coverage |
| **Monitoring** | Console logging | Sentry errors | Sentry + analytics | Full observability |
| **Documentation** | This doc package | Updated | Updated | Updated |

---

## 4. Risk-Adjusted Timeline

| Version | Optimistic | Realistic | Pessimistic |
|---|---|---|---|
| v1.0 | 3 weeks | 5 weeks | 7 weeks |
| v1.1 | 1 week | 2 weeks | 3 weeks |
| v1.2 | 2 weeks | 3 weeks | 5 weeks |
| v2.0 | 3 weeks | 5 weeks | 8 weeks |

---

## 5. Parking Lot (Future Consideration)

Features under consideration but not committed to any version:

| Feature | Notes |
|---|---|
| Multi-dialect support | Explicit MySQL, PostgreSQL, SQLite, T-SQL modes |
| Query formatter | Auto-format/prettify SQL |
| Collaborative features | Share and discuss queries with team |
| Gamification | Badges, streaks, complexity challenges |
| Embeddable widget | Embed SQL analyzer on external sites |
| Browser extension | Analyze SQL on any page |
| API access | Public API for programmatic analysis |
| Internationalization | Multi-language support |

---

*This roadmap is a living document that will be updated as priorities evolve. All features are subject to change based on user feedback and resource availability.*
