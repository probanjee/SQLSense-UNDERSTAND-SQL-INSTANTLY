# SQLSense — Project Risk Register

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved  

---

## Purpose

This Risk Register identifies, analyzes, and plans mitigations for risks that could impact the successful development, deployment, security, and adoption of SQLSense. It is a living document that is reviewed and updated at the beginning of each development phase.

**Related Documents:**
- [00_PROJECT_OVERVIEW.md](./00_PROJECT_OVERVIEW.md)
- [18_TASKS.md](./18_TASKS.md)
- [17_SECURITY_AUDIT.md](./17_SECURITY_AUDIT.md)

---

## 1. Risk Matrix Reference

Risks are evaluated based on their **Likelihood** (probability of occurrence) and **Impact** (severity of consequences on a scale of 1 to 5: 1 = Negligible, 5 = Critical).

The **Risk Score** is calculated as:  
$$\text{Risk Score} = \text{Likelihood} \times \text{Impact}$$

| Score Range | Risk Level | Action Required |
|---|---|---|
| **12–25** | 🔴 **High** | Immediate action required. Mitigation and contingency plans must be active. |
| **6–11** | 🟡 **Medium** | Mitigation plans defined. Regular monitoring during status checks. |
| **1–5** | 🟢 **Low** | Acceptable risk. Tracked and monitored with minimal active mitigation. |

---

## 2. Risk Backlog

### 2.1 Technical Risks

#### R-1.1: AST Parser Incompatibility with Complex SQL Dialects
* **Description:** The open-source `node-sql-parser` library may fail to parse advanced, dialect-specific query syntax (e.g., specific PostgreSQL window functions, JSON operations, or Microsoft T-SQL syntax).
* **Likelihood:** 4 (High)
* **Impact:** 4 (High)
* **Risk Score:** 16 (High) 🔴
* **Mitigation:**
  - Standardize on ANSI SQL support first, with documented limitations for dialect-specific syntax.
  - Implement a fallback parse mode that displays the AST elements it can extract, rather than breaking the application.
  - Gracefully display clear error syntax messages with line highlights when parsing fails, explaining that the specific syntax is not yet supported.
* **Contingency Plan:** If `node-sql-parser` proves too restrictive, migrate to a more flexible parser library (e.g., `pg-query-emscripten` for Postgres and basic regex fallbacks for other dialects).
* **Owner:** Prosun Banerjee

#### R-1.2: Cross-Site Scripting (XSS) via Custom SQL Input
* **Description:** Adversaries paste malicious scripts into the SQL editor, which are then rendered into the plain-English explanation or clause breakdown interface, compromising user browser sessions.
* **Likelihood:** 3 (Medium)
* **Impact:** 5 (Critical)
* **Risk Score:** 15 (High) 🔴
* **Mitigation:**
  - Run all parsed SQL identifiers and generated string components through DOMPurify client-side before rendering in the DOM.
  - Escape HTML characters in all custom SQL code snippets displayed inside analysis panels.
  - Apply a strict Content Security Policy (CSP) blocking external script executions.
* **Contingency Plan:** Lock output formatting to static, plain-text fields instead of parsing text with HTML formatting.
* **Owner:** Prosun Banerjee

#### R-1.3: Supabase Free Tier Limits Exhausted
* **Description:** Database storage (500MB), bandwidth (2GB/month), or monthly active users (50,000 MAU) thresholds are exceeded due to high application traffic.
* **Likelihood:** 2 (Low)
* **Impact:** 3 (Medium)
* **Risk Score:** 6 (Medium) 🟡
* **Mitigation:**
  - Optimize the `saved_queries` schema: store queries in a compressed text format, and restrict each user to a maximum of 50 saved queries to prevent database bloat.
  - Apply clean-up cron jobs to remove anonymous or expired session artifacts.
* **Contingency Plan:** Upgrade to the Supabase Pro plan ($25/month) or migrate to a self-hosted PostgreSQL database on a free-tier virtual machine (e.g., fly.io or Oracle Cloud Free Tier).
* **Owner:** Prosun Banerjee

---

### 2.2 Schedule & Operational Risks

#### R-2.1: Project Delays due to Single-Developer Constraints
* **Description:** Being a solo developer, any health issues, personal emergencies, or work conflicts directly stall project timelines, threatening the estimated 10-week timeline.
* **Likelihood:** 4 (High)
* **Impact:** 3 (Medium)
* **Risk Score:** 12 (High) 🔴
* **Mitigation:**
  - Adopt a strict MVP-first mindset: prioritize the P0 core parser and main explanation UI before adding OAuth or dashboards.
  - Maintain the detailed, comprehensive task backlog in `18_TASKS.md` to pick up work instantly without context-switching costs.
* **Contingency Plan:** Adjust the release roadmap, extending Phase 8–10 timelines, or release a public alpha version focusing exclusively on guest SQL explanations.
* **Owner:** Prosun Banerjee

#### R-2.2: Scope Creep: Adding Complex AI Parser Too Early
* **Description:** Attempting to build or integrate LLMs (Large Language Models) in version 1.0, deviating from the rule-based approach, which would introduce server cost and API key exposure risks.
* **Likelihood:** 3 (Medium)
* **Impact:** 4 (High)
* **Risk Score:** 12 (High) 🔴
* **Mitigation:**
  - Explicitly restrict the v1.0 specification to a client-side, rule-based explanation engine (defined in `11_APP_LOGIC_SYSTEM.md`).
  - Move all AI-related thoughts to the Future Expansion list (v2.0+) in `21_ROADMAP.md`.
* **Contingency Plan:** If rule-based explanations are insufficient for basic users, implement a tiny, static library of 100 common query templates rather than calling a paid API.
* **Owner:** Prosun Banerjee

---

### 2.3 Financial & Resource Risks

#### R-3.1: Server Cost Generation on a $0 Budget
* **Description:** Exceeding serverless execution limits, storage thresholds, or bandwidth, resulting in surprise billing from Vercel or Supabase.
* **Likelihood:** 2 (Low)
* **Impact:** 4 (High)
* **Risk Score:** 8 (Medium) 🟡
* **Mitigation:**
  - Offload execution: keep all parser logic, diagram rendering, and validation on the client.
  - Minimize serverless function invocations: only invoke Vercel serverless routes for saving, fetching, or deleting queries from the database.
* **Contingency Plan:** Set up billing alerts and soft-limits on Vercel and Supabase dashboards to automatically pause services before incurring costs.
* **Owner:** Prosun Banerjee

---

## 3. Risk Monitoring Log

This section tracks active risks during execution. Statuses are categorized as **Open**, **Mitigated**, or **Triggered**.

| ID | Category | Risk Description | Current Score | Status | Active Actions |
|---|---|---|---|---|---|
| **R-1.1** | Technical | AST Parser Incompatibility | 16 | **Open** | Prioritizing comprehensive parser test coverage during Phase 4. |
| **R-1.2** | Technical | XSS injection in query panels | 15 | **Open** | Integrating DOMPurify during Phase 4 implementation. |
| **R-1.3** | Technical | Supabase Free Tier Limits | 6 | **Open** | Implementing limit checks (max 50 queries/user) in Phase 7. |
| **R-2.1** | Schedule | Single-Developer Constraints | 12 | **Open** | Using the tasks list as the primary focus guideline. |
| **R-2.2** | Scope | Premature AI Integration | 12 | **Open** | Enforcing strict boundaries on rule-based logic in specifications. |
| **R-3.1** | Financial | Server Cost Generation | 8 | **Open** | Ensuring client-side parser calculations. |
