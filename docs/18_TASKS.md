# SQLSense — Development Tasks

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Pre-Development

---

## Purpose

This document breaks down the entire SQLSense v1.0 development effort into actionable tasks organized by phase, with estimated effort, dependencies, and priority. It serves as the project management reference and sprint planning tool.

**Related Documents:**
- [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md)
- [21_ROADMAP.md](./21_ROADMAP.md)
- [07_TRD.md](./07_TRD.md)

---

## Phase 1: Project Setup & Infrastructure

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-1.1 | Initialize Next.js 15 project with TypeScript | P0 | 0.5h | None | ⬜ |
| T-1.2 | Configure Tailwind CSS with design tokens | P0 | 1h | T-1.1 | ⬜ |
| T-1.3 | Set up shadcn/ui and install base components | P0 | 1h | T-1.1 | ⬜ |
| T-1.4 | Configure ESLint, Prettier, and editor settings | P0 | 0.5h | T-1.1 | ⬜ |
| T-1.5 | Configure Vitest and React Testing Library | P0 | 0.5h | T-1.1 | ⬜ |
| T-1.6 | Set up Supabase project (Dashboard) | P0 | 0.5h | None | ⬜ |
| T-1.7 | Create .env.local and .env.example | P0 | 0.25h | T-1.6 | ⬜ |
| T-1.8 | Configure next.config.ts with security headers | P0 | 0.5h | T-1.1 | ⬜ |
| T-1.9 | Set up GitHub repository | P0 | 0.25h | None | ⬜ |
| T-1.10 | Connect Vercel to GitHub repository | P0 | 0.25h | T-1.9 | ⬜ |
| T-1.11 | Configure Google Fonts (Inter + JetBrains Mono) | P0 | 0.25h | T-1.1 | ⬜ |
| T-1.12 | Set up Husky + lint-staged + commitlint | P1 | 0.5h | T-1.4 | ⬜ |

**Phase 1 Total: ~6 hours**

---

## Phase 2: Database & Auth Setup

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-2.1 | Create saved_queries table in Supabase | P0 | 0.5h | T-1.6 | ⬜ |
| T-2.2 | Create indexes on saved_queries | P0 | 0.25h | T-2.1 | ⬜ |
| T-2.3 | Enable RLS and create policies | P0 | 0.5h | T-2.1 | ⬜ |
| T-2.4 | Test RLS policies manually | P0 | 0.5h | T-2.3 | ⬜ |
| T-2.5 | Create Supabase browser client utility | P0 | 0.5h | T-1.7 | ⬜ |
| T-2.6 | Create Supabase server client utility | P0 | 0.5h | T-1.7 | ⬜ |
| T-2.7 | Create Supabase middleware client utility | P0 | 0.5h | T-1.7 | ⬜ |
| T-2.8 | Configure Supabase Auth settings (Dashboard) | P0 | 0.25h | T-1.6 | ⬜ |
| T-2.9 | Create TypeScript database types | P0 | 0.5h | T-2.1 | ⬜ |

**Phase 2 Total: ~4 hours**

---

## Phase 3: Core Layout & Navigation

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-3.1 | Create root layout with fonts and global styles | P0 | 1h | T-1.2, T-1.11 | ⬜ |
| T-3.2 | Build Header component (desktop) | P0 | 2h | T-3.1 | ⬜ |
| T-3.3 | Build Header component (mobile hamburger menu) | P0 | 2h | T-3.2 | ⬜ |
| T-3.4 | Build Footer component with author info and CTA | P0 | 1.5h | T-3.1 | ⬜ |
| T-3.5 | Create PageContainer component | P0 | 0.5h | T-3.1 | ⬜ |
| T-3.6 | Implement page-enter animation | P1 | 0.5h | T-3.5 | ⬜ |
| T-3.7 | Build auth-aware navigation logic | P0 | 1h | T-3.2, T-2.5 | ⬜ |
| T-3.8 | Write Header/Footer tests | P1 | 1h | T-3.2, T-3.4 | ⬜ |

**Phase 3 Total: ~9.5 hours**

---

## Phase 4: SQL Parser & Explanation Engine

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-4.1 | Install and configure node-sql-parser | P0 | 0.5h | T-1.1 | ⬜ |
| T-4.2 | Build SQL input validation (Zod schema) | P0 | 0.5h | T-1.1 | ⬜ |
| T-4.3 | Build explanation generation engine | P0 | 4h | T-4.1 | ⬜ |
| T-4.4 | Build clause breakdown engine | P0 | 3h | T-4.1 | ⬜ |
| T-4.5 | Build complexity scoring algorithm | P0 | 2h | T-4.1 | ⬜ |
| T-4.6 | Build optimization suggestion engine | P0 | 3h | T-4.1 | ⬜ |
| T-4.7 | Build query flow generation | P1 | 2h | T-4.1 | ⬜ |
| T-4.8 | Build dialect detection logic | P1 | 1h | T-4.1 | ⬜ |
| T-4.9 | Integrate DOMPurify for SQL sanitization | P0 | 0.5h | T-1.1 | ⬜ |
| T-4.10 | Write parser unit tests (50+ queries) | P0 | 4h | T-4.3–T-4.7 | ⬜ |
| T-4.11 | Create example queries data file | P0 | 1h | None | ⬜ |

**Phase 4 Total: ~21.5 hours**

---

## Phase 5: Landing Page & SQL Analyzer UI

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-5.1 | Build HeroSection with glow effect | P0 | 2h | T-3.1 | ⬜ |
| T-5.2 | Build SQLEditor component | P0 | 3h | T-3.1 | ⬜ |
| T-5.3 | Build AnalysisOutput container with tabs | P0 | 2h | T-3.1 | ⬜ |
| T-5.4 | Build ExplanationTab component | P0 | 1h | T-5.3 | ⬜ |
| T-5.5 | Build ClauseBreakdownTab component | P0 | 1.5h | T-5.3 | ⬜ |
| T-5.6 | Build ComplexityTab with progress bar | P0 | 1.5h | T-5.3 | ⬜ |
| T-5.7 | Build OptimizationTab component | P0 | 1h | T-5.3 | ⬜ |
| T-5.8 | Build FlowTab with diagram | P1 | 2h | T-5.3 | ⬜ |
| T-5.9 | Build FeatureCards section (6 cards) | P0 | 1.5h | T-3.1 | ⬜ |
| T-5.10 | Build CTASection (bottom) | P0 | 0.5h | T-3.1 | ⬜ |
| T-5.11 | Integrate parser with UI (Zustand store) | P0 | 2h | T-4.3, T-5.2, T-5.3 | ⬜ |
| T-5.12 | Build loading skeleton states | P0 | 1h | T-5.3 | ⬜ |
| T-5.13 | Build empty state component | P0 | 0.5h | T-5.3 | ⬜ |
| T-5.14 | Build copy-to-clipboard functionality | P1 | 0.5h | T-5.3 | ⬜ |
| T-5.15 | Write landing page component tests | P1 | 2h | T-5.1–T-5.14 | ⬜ |

**Phase 5 Total: ~22 hours**

---

## Phase 6: Authentication UI

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-6.1 | Build AuthCard layout component | P0 | 0.5h | T-3.1 | ⬜ |
| T-6.2 | Build SignInForm component | P0 | 2h | T-6.1, T-2.5 | ⬜ |
| T-6.3 | Build SignUpForm component | P0 | 2h | T-6.1, T-2.5 | ⬜ |
| T-6.4 | Build PasswordInput with show/hide toggle | P0 | 0.5h | T-6.1 | ⬜ |
| T-6.5 | Implement Zod form validation with inline errors | P0 | 1.5h | T-6.2, T-6.3 | ⬜ |
| T-6.6 | Build Zustand auth store | P0 | 1h | T-2.5 | ⬜ |
| T-6.7 | Build AuthGuard component | P0 | 1h | T-6.6 | ⬜ |
| T-6.8 | Build UserMenu dropdown | P0 | 1h | T-6.6 | ⬜ |
| T-6.9 | Implement Next.js middleware for auth | P0 | 1.5h | T-2.7 | ⬜ |
| T-6.10 | Build Toast notification system | P0 | 1h | T-3.1 | ⬜ |
| T-6.11 | Write auth flow tests | P0 | 2h | T-6.2–T-6.9 | ⬜ |

**Phase 6 Total: ~14 hours**

---

## Phase 7: API Routes & Database Operations

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-7.1 | Build POST /api/queries/save route | P0 | 1.5h | T-2.6, T-2.9 | ⬜ |
| T-7.2 | Build GET /api/queries route | P0 | 1h | T-2.6, T-2.9 | ⬜ |
| T-7.3 | Build DELETE /api/queries/[id] route | P0 | 1h | T-2.6, T-2.9 | ⬜ |
| T-7.4 | Build data transformers | P0 | 0.5h | T-2.9 | ⬜ |
| T-7.5 | Build Zustand history store | P0 | 1h | T-7.1, T-7.2 | ⬜ |
| T-7.6 | Integrate save button with API | P0 | 1h | T-7.1, T-5.11 | ⬜ |
| T-7.7 | Write API route tests | P0 | 2h | T-7.1–T-7.3 | ⬜ |

**Phase 7 Total: ~8 hours**

---

## Phase 8: Dashboard, History, Examples, About Pages

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-8.1 | Build Dashboard page | P0 | 3h | T-6.7, T-7.5 | ⬜ |
| T-8.2 | Build StatsCard component | P1 | 0.5h | T-8.1 | ⬜ |
| T-8.3 | Build QuickActions component | P0 | 0.5h | T-8.1 | ⬜ |
| T-8.4 | Build History page | P0 | 3h | T-6.7, T-7.5 | ⬜ |
| T-8.5 | Build HistoryCard component | P0 | 1.5h | T-8.4 | ⬜ |
| T-8.6 | Build ConfirmDialog component | P0 | 1h | T-8.4 | ⬜ |
| T-8.7 | Build Examples page | P0 | 2h | T-4.11 | ⬜ |
| T-8.8 | Build ExampleCard component | P0 | 1h | T-8.7 | ⬜ |
| T-8.9 | Build DifficultyFilter component | P0 | 0.5h | T-8.7 | ⬜ |
| T-8.10 | Implement "Try This Query" flow | P0 | 1h | T-8.7, T-5.2 | ⬜ |
| T-8.11 | Build About page | P0 | 2h | T-3.1 | ⬜ |
| T-8.12 | Write page-level tests | P1 | 2h | T-8.1–T-8.11 | ⬜ |

**Phase 8 Total: ~18 hours**

---

## Phase 9: Polish & Animations

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-9.1 | Implement landing page animation choreography | P1 | 2h | T-5.1 | ⬜ |
| T-9.2 | Implement analysis result staggered animations | P1 | 1h | T-5.3 | ⬜ |
| T-9.3 | Add hover effects to all interactive elements | P1 | 1h | All components | ⬜ |
| T-9.4 | Add reduced-motion media query | P0 | 0.5h | T-9.1 | ⬜ |
| T-9.5 | Responsive testing and fixes (mobile) | P0 | 2h | All pages | ⬜ |
| T-9.6 | Responsive testing and fixes (tablet) | P0 | 1h | All pages | ⬜ |
| T-9.7 | Accessibility audit (Lighthouse, manual) | P0 | 2h | All pages | ⬜ |
| T-9.8 | Performance audit (Lighthouse) | P0 | 1h | All pages | ⬜ |
| T-9.9 | SEO meta tags on all pages | P0 | 1h | All pages | ⬜ |
| T-9.10 | Favicon and OG image | P1 | 0.5h | T-1.1 | ⬜ |

**Phase 9 Total: ~12 hours**

---

## Phase 10: Security Audit & Deployment

| ID | Task | Priority | Effort | Dependencies | Status |
|---|---|---|---|---|---|
| T-10.1 | Run npm audit; fix vulnerabilities | P0 | 1h | All | ⬜ |
| T-10.2 | Test XSS prevention (manual) | P0 | 1h | T-4.9 | ⬜ |
| T-10.3 | Test RLS policies (multi-user) | P0 | 1h | T-2.3 | ⬜ |
| T-10.4 | Verify security headers (securityheaders.com) | P0 | 0.5h | T-1.8 | ⬜ |
| T-10.5 | Environment variables audit | P0 | 0.5h | T-1.7 | ⬜ |
| T-10.6 | Set Vercel environment variables | P0 | 0.25h | T-10.5 | ⬜ |
| T-10.7 | Production build test | P0 | 0.5h | All | ⬜ |
| T-10.8 | Deploy to Vercel production | P0 | 0.25h | T-10.7 | ⬜ |
| T-10.9 | Post-deployment smoke test | P0 | 1h | T-10.8 | ⬜ |
| T-10.10 | Update README with live URL | P0 | 0.25h | T-10.8 | ⬜ |
| T-10.11 | Create CHANGELOG entry for v1.0.0 | P0 | 0.25h | T-10.8 | ⬜ |

**Phase 10 Total: ~6.5 hours**

---

## Summary

| Phase | Description | Estimated Hours | Priority Tasks |
|---|---|---|---|
| Phase 1 | Project Setup | 6h | 12 |
| Phase 2 | Database & Auth Setup | 4h | 9 |
| Phase 3 | Core Layout & Navigation | 9.5h | 8 |
| Phase 4 | SQL Parser & Engine | 21.5h | 11 |
| Phase 5 | Landing Page UI | 22h | 15 |
| Phase 6 | Authentication UI | 14h | 11 |
| Phase 7 | API Routes & DB Ops | 8h | 7 |
| Phase 8 | Pages (Dashboard, History, etc.) | 18h | 12 |
| Phase 9 | Polish & Animations | 12h | 10 |
| Phase 10 | Security & Deployment | 6.5h | 11 |
| **Total** | | **~121.5 hours** | **106 tasks** |

---

*This task list represents the complete development effort for SQLSense v1.0. Tasks should be executed in phase order, with all P0 tasks completed before P1 tasks within each phase.*
