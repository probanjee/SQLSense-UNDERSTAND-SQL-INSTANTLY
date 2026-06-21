# SQLSense — Changelog

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved  

---

## Purpose

This document records the version history and release notes for the SQLSense project. It tracks all updates, features, bug fixes, performance improvements, and documentation enhancements across the lifecycle of the application.

**Related Documents:**
- [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md)
- [21_ROADMAP.md](./21_ROADMAP.md)
- [18_TASKS.md](./18_TASKS.md)

---

## 1. Version History Summary

| Version | Release Date | Type | Description |
|---|---|---|---|
| **v1.0.0-spec** | 2026-06-21 | Documentation | Initial specification and architectural documentation release |
| **v1.0.0-alpha** | *Planned* | Alpha | Core parser, basic explanation UI, and Supabase integration |
| **v1.0.0-beta** | *Planned* | Beta | Authentication system, dashboard, saved query history, and examples |
| **v1.0.0** | *Planned* | Major | Production-ready initial release on Vercel |

---

## 2. Release Details

### v1.0.0-spec (2026-06-21) — Specification Release

This release establishes the complete theoretical, architectural, and design foundation for SQLSense. No functional code has been written yet. The project is fully defined through 22 specialized documentation artifacts.

#### Added (Documentation Artifacts)
- **Overview & Strategy:**
  - [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md): Executive overview, problem statement, target audience, and repository layout.
  - [01_DESIGN_BRIEF.md](./01_DESIGN_BRIEF.md): Creative vision, typographic scales, harmonious dark-theme UI design system.
  - [02_DESIGN_PLAN.md](./02_DESIGN_PLAN.md): CSS architecture, design tokens, responsive breakpoints, and UI component styling rules.
  - [03_UI_UX_BRIEF.md](./03_UI_UX_BRIEF.md): Layout layouts, component-by-component design specifications, states, and transitions.
- **Product & Requirements:**
  - [04_PRD.md](./04_PRD.md): Product Requirements Document with full functional and non-functional specs.
  - [05_USER_STORIES.md](./05_USER_STORIES.md): User personas, 15 user stories, and acceptance criteria mappings.
  - [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md): Scenario-based Gherkin syntax acceptance criteria for all user stories.
- **Technical Architecture:**
  - [07_TRD.md](./07_TRD.md): Technical Requirements Document with system limits, tech stack choices, and performance budgets.
  - [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md): Structural layout, data flow diagrams, network policies, and runtime environment specifications.
  - [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md): Client-side component tree, Zustand stores, state diagrams, and directory tree.
  - [10_APP_FLOW.md](./10_APP_FLOW.md): Step-by-step user interaction walkthroughs and system state responses.
  - [11_APP_LOGIC_SYSTEM.md](./11_APP_LOGIC_SYSTEM.md): AST tree processing, explanation generation rules, complexity scoring, and suggestion engine algorithms.
- **Data & APIs:**
  - [12_AUTH_SYSTEM.md](./12_AUTH_SYSTEM.md): Supabase authentication flow, middleware route guards, token handling, and OAuth roadmap.
  - [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md): PostgreSQL schema, index choices, entity relationship diagrams (ERD).
  - [14_BACKEND_SCHEMA.md](./14_BACKEND_SCHEMA.md): DDL SQL scripts, Row-Level Security (RLS) policies, and database migration checklists.
  - [15_API_SPEC.md](./15_API_SPEC.md): RESTful OpenAPI endpoints with JSON request/response payloads and error handling.
- **Security & Quality:**
  - [16_SECURITY_PLAN.md](./16_SECURITY_PLAN.md): Security controls, XSS mitigation rules, RLS policies, and environment secret guidelines.
  - [17_SECURITY_AUDIT.md](./17_SECURITY_AUDIT.md): Pre-development threat modeling, OWASP Top 10 analysis, and vulnerability mitigation audit.
  - [18_TASKS.md](./18_TASKS.md): Actionable, prioritized development task backlog (106 items) with time estimates.
  - [19_TEST_PLAN.md](./19_TEST_PLAN.md): Comprehensive testing strategy covering Unit, Integration, E2E, Performance, and Accessibility tests.
- **Deployment & Operations:**
  - [20_DEPLOYMENT_GUIDE.md](./20_DEPLOYMENT_GUIDE.md): Vercel + Supabase production deployment, DNS configuration, and backup plans.
  - [21_ROADMAP.md](./21_ROADMAP.md): Product roadmap outlining v1.0, v1.1, v2.0, and v3.0 features.

#### Changed
- *None (Initial release of the project specification).*

#### Fixed
- *None (Pre-development phase).*

---

## 3. Versioning Strategy

SQLSense adheres strictly to **Semantic Versioning 2.0.0 (SemVer)**:

- **MAJOR (x.0.0):** Incremented for significant structural overhauls, database schema migrations with breaking compatibility, or complete product redesigns.
- **MINOR (0.x.0):** Incremented for new functional features (e.g., adding Google OAuth, multi-dialect support) that do not break existing saved history schemas.
- **PATCH (0.0.x):** Incremented for bug fixes, performance tuning, library security upgrades, documentation adjustments, or style modifications.

---

## 4. Change Process

To update this changelog during development:
1. Every Pull Request (PR) introducing a feature, fix, or dependency update must document the change in the PR description.
2. During the release cycle (release candidate phase), the release driver consolidates these changes and appends them to this document.
3. Pre-releases (Alpha, Beta, RC) will be documented in a nested bullet format under the main planned major/minor version headers.
