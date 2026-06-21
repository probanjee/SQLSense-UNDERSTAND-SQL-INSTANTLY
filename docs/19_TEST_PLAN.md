# SQLSense — Test Plan

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This Test Plan defines the complete testing strategy for SQLSense v1.0, including unit tests, integration tests, end-to-end manual tests, accessibility tests, performance tests, and security tests.

**Related Documents:**
- [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md)
- [07_TRD.md](./07_TRD.md)
- [17_SECURITY_AUDIT.md](./17_SECURITY_AUDIT.md)

---

## 1. Testing Strategy

| Test Type | Tool | Scope | Coverage Target |
|---|---|---|---|
| **Unit Tests** | Vitest | Individual functions, hooks, utilities | > 80% |
| **Component Tests** | Vitest + React Testing Library | React components in isolation | > 75% |
| **Integration Tests** | Vitest + MSW | API routes, store interactions | > 70% |
| **Manual E2E Tests** | Manual (browser) | Full user flows | All flows |
| **Accessibility Tests** | Lighthouse + axe | WCAG 2.1 AA compliance | Score > 90 |
| **Performance Tests** | Lighthouse | Core Web Vitals | Score > 90 |
| **Security Tests** | Manual + npm audit | XSS, auth, RLS | All security cases |

---

## 2. Unit Test Specifications

### 2.1 SQL Parser Tests

| Test ID | Function | Test Case | Expected Output |
|---|---|---|---|
| UT-P-001 | `analyzeQuery` | Simple SELECT * FROM users | Valid AnalysisResult with explanation |
| UT-P-002 | `analyzeQuery` | SELECT with WHERE clause | Explanation mentions filter condition |
| UT-P-003 | `analyzeQuery` | SELECT with JOIN | Explanation mentions join and tables |
| UT-P-004 | `analyzeQuery` | SELECT with GROUP BY + HAVING | Explanation mentions grouping and filter |
| UT-P-005 | `analyzeQuery` | SELECT with ORDER BY + LIMIT | Explanation mentions sorting and limiting |
| UT-P-006 | `analyzeQuery` | CTE (WITH clause) | Explanation describes the CTE |
| UT-P-007 | `analyzeQuery` | Window function | Explanation describes the window function |
| UT-P-008 | `analyzeQuery` | Subquery | Explanation describes inner and outer queries |
| UT-P-009 | `analyzeQuery` | Empty string | Returns validation error |
| UT-P-010 | `analyzeQuery` | Invalid SQL syntax | Returns parse error |
| UT-P-011 | `analyzeQuery` | SQL exceeding 5000 chars | Returns validation error |
| UT-P-012 | `analyzeQuery` | Multiple SQL statements | Analyzes first statement |

### 2.2 Complexity Scoring Tests

| Test ID | Query Pattern | Expected Score Range |
|---|---|---|
| UT-C-001 | `SELECT * FROM t` | 1 (Simple) |
| UT-C-002 | `SELECT col FROM t WHERE condition` | 2 (Simple) |
| UT-C-003 | `SELECT ... FROM t1 JOIN t2 ...` | 3–4 (Simple/Moderate) |
| UT-C-004 | `SELECT ... GROUP BY ... HAVING ...` | 4–5 (Moderate) |
| UT-C-005 | `SELECT ... FROM t1 JOIN t2 JOIN t3 GROUP BY ...` | 5–6 (Moderate) |
| UT-C-006 | `WITH cte AS (...) SELECT ...` | 6–7 (Moderate/Complex) |
| UT-C-007 | `SELECT ..., ROW_NUMBER() OVER (...)` | 7–8 (Complex) |
| UT-C-008 | Multiple JOINs + CTE + subquery + window function | 9–10 (Expert) |

### 2.3 Optimization Rule Tests

| Test ID | Rule | Input Pattern | Expected Result |
|---|---|---|---|
| UT-O-001 | avoid-select-star | `SELECT * FROM t` | Tip: "Avoid SELECT *" |
| UT-O-002 | missing-where-clause | `SELECT col FROM t` | Tip: "Consider Adding a WHERE Clause" |
| UT-O-003 | limit-without-order | `SELECT col FROM t LIMIT 10` | Tip: "LIMIT Without ORDER BY" |
| UT-O-004 | no-issues | `SELECT col FROM t WHERE id = 1` | Tip: "Query Looks Good" |

### 2.4 Validation Schema Tests

| Test ID | Schema | Input | Expected Result |
|---|---|---|---|
| UT-V-001 | signInSchema | Valid email + password | Pass |
| UT-V-002 | signInSchema | Invalid email format | Fail: "Please enter a valid email address" |
| UT-V-003 | signInSchema | Empty email | Fail: "Email is required" |
| UT-V-004 | signUpSchema | Password < 8 chars | Fail: "Password must be at least 8 characters" |
| UT-V-005 | signUpSchema | Passwords don't match | Fail: "Passwords do not match" |
| UT-V-006 | saveQuerySchema | Valid save data | Pass |
| UT-V-007 | saveQuerySchema | Complexity = 0 | Fail: "Complexity must be at least 1" |
| UT-V-008 | saveQuerySchema | Complexity = 11 | Fail: "Complexity must be at most 10" |
| UT-V-009 | sqlInputSchema | Query > 5000 chars | Fail: max length error |

---

## 3. Component Test Specifications

### 3.1 Layout Components

| Test ID | Component | Test Case | Assertion |
|---|---|---|---|
| CT-L-001 | Header | Renders logo and nav links | Links visible, correct hrefs |
| CT-L-002 | Header | Shows guest actions when unauthenticated | "Sign In" and "Get Started" visible |
| CT-L-003 | Header | Shows user menu when authenticated | User avatar/dropdown visible |
| CT-L-004 | Footer | Renders author info | "Prosun Banerjee" and email visible |
| CT-L-005 | Footer | Renders "Built for Digital Heroes" button | Button with exact text and external link |
| CT-L-006 | AuthGuard | Redirects when unauthenticated | redirects to /sign-in |
| CT-L-007 | AuthGuard | Renders children when authenticated | Children visible |

### 3.2 Analysis Components

| Test ID | Component | Test Case | Assertion |
|---|---|---|---|
| CT-A-001 | SQLEditor | Renders with placeholder | Placeholder text visible |
| CT-A-002 | SQLEditor | Accepts user input | onChange called with text |
| CT-A-003 | SQLEditor | Shows character count | "123 / 5000" visible |
| CT-A-004 | SQLEditor | Ctrl+Enter submits | onSubmit called |
| CT-A-005 | AnalysisOutput | Shows empty state initially | Empty state message visible |
| CT-A-006 | AnalysisOutput | Shows loading skeleton | Skeleton visible when isLoading=true |
| CT-A-007 | AnalysisOutput | Shows tabs with results | 5 tabs visible with content |
| CT-A-008 | AnalysisOutput | Tab switching works | Content changes on tab click |
| CT-A-009 | ComplexityBar | Shows correct score | Bar width matches score |
| CT-A-010 | ComplexityBar | Shows correct label | "Simple"/"Moderate"/"Complex"/"Expert" |

### 3.3 Form Components

| Test ID | Component | Test Case | Assertion |
|---|---|---|---|
| CT-F-001 | SignInForm | Renders email and password fields | Both inputs visible |
| CT-F-002 | SignInForm | Shows validation errors | Error messages appear below fields |
| CT-F-003 | SignInForm | Shows loading state on submit | Button shows spinner |
| CT-F-004 | SignUpForm | Renders 3 fields (email, password, confirm) | All 3 inputs visible |
| CT-F-005 | SignUpForm | Shows password mismatch error | Error below confirm password |

---

## 4. Integration Test Specifications

### 4.1 API Route Tests

| Test ID | Endpoint | Test Case | Expected Result |
|---|---|---|---|
| IT-A-001 | POST /api/queries/save | Valid request with auth | 201 with saved query |
| IT-A-002 | POST /api/queries/save | No auth | 401 Unauthorized |
| IT-A-003 | POST /api/queries/save | Invalid body | 400 Validation error |
| IT-A-004 | GET /api/queries | Valid request with auth | 200 with array |
| IT-A-005 | GET /api/queries | No auth | 401 Unauthorized |
| IT-A-006 | DELETE /api/queries/[id] | Valid request with auth | 200 with deleted id |
| IT-A-007 | DELETE /api/queries/[id] | No auth | 401 Unauthorized |
| IT-A-008 | DELETE /api/queries/[id] | Invalid UUID | 400 Validation error |

### 4.2 Store Integration Tests

| Test ID | Store | Test Case | Expected Result |
|---|---|---|---|
| IT-S-001 | authStore | Initialize with existing session | user and session populated |
| IT-S-002 | authStore | Sign out clears state | user and session null |
| IT-S-003 | queryStore | analyzeQuery with valid SQL | analysisResult populated |
| IT-S-004 | queryStore | analyzeQuery with invalid SQL | analysisError populated |
| IT-S-005 | historyStore | fetchQueries populates list | queries array populated |
| IT-S-006 | historyStore | deleteQuery removes from list | queries array shortened |

---

## 5. Manual E2E Test Plan

### 5.1 Flow: Guest Analysis

| Step | Action | Verification |
|---|---|---|
| 1 | Open homepage | Hero section visible, SQL editor visible |
| 2 | Paste `SELECT * FROM users WHERE active = true` | Text appears in editor with monospace font |
| 3 | Click "Analyze Query" | Loading skeleton → results in < 1 second |
| 4 | Check Explanation tab | Clear explanation of the query |
| 5 | Click Clauses tab | SELECT, FROM, WHERE clauses listed |
| 6 | Click Complexity tab | Score shown with progress bar |
| 7 | Click Optimization tab | "Avoid SELECT *" tip present |
| 8 | Click Flow tab | Execution order diagram shown |

### 5.2 Flow: Sign Up → Save → History

| Step | Action | Verification |
|---|---|---|
| 1 | Click "Get Started" | Navigate to /sign-up |
| 2 | Enter email, password, confirm | Form accepts input |
| 3 | Click "Create Account" | Redirect to /dashboard; success toast |
| 4 | Navigate to / | Header shows authenticated state |
| 5 | Paste and analyze a query | Results appear |
| 6 | Click "Save" | Toast: "Query saved!" |
| 7 | Navigate to /history | Saved query appears in list |
| 8 | Click "Delete" → Confirm | Query removed; toast: "Query deleted" |

### 5.3 Flow: Example → Analyze

| Step | Action | Verification |
|---|---|---|
| 1 | Navigate to /examples | Examples grid visible |
| 2 | Click "Intermediate" filter | Only intermediate examples shown |
| 3 | Click "Try This Query" | Navigate to / with query pre-filled |
| 4 | Click "Analyze Query" | Results appear for the example query |

---

## 6. Accessibility Test Plan

| Test | Tool | Target |
|---|---|---|
| Lighthouse Accessibility | Chrome Lighthouse | Score > 90 |
| Keyboard navigation | Manual | All features accessible via keyboard |
| Screen reader testing | NVDA / VoiceOver | All content announced correctly |
| Color contrast | Chrome DevTools | WCAG AA ratios met |
| Focus indicators | Manual | Visible on all interactive elements |
| Reduced motion | Manual | Animations disabled with prefers-reduced-motion |

---

## 7. Performance Test Plan

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | > 90 | Chrome Lighthouse |
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |
| SQL parse time | < 200ms | Custom timing |
| JavaScript bundle (initial) | < 300KB gzipped | `next build` output |

---

## 8. Security Test Plan

| Test | Method | Target |
|---|---|---|
| XSS with script tags | Manual input | No script execution |
| XSS with event handlers | Manual input | No event handler execution |
| SQL injection (conceptual) | Manual input | No database connection exists |
| Auth bypass on protected routes | Direct URL access | Redirect to /sign-in |
| RLS data isolation | Multi-user manual test | Users see only own data |
| npm audit | `npm audit` CLI | 0 critical/high vulnerabilities |
| Security headers | securityheaders.com | A+ rating target |

---

## 9. Test Data

### 9.1 Test SQL Queries

```sql
-- Simple
SELECT * FROM users;
SELECT name, email FROM users WHERE active = true;

-- Moderate
SELECT u.name, COUNT(o.id) AS orders FROM users u 
INNER JOIN orders o ON u.id = o.user_id GROUP BY u.name;

-- Complex
WITH monthly AS (SELECT DATE_TRUNC('month', date) AS m, SUM(total) AS rev 
FROM orders GROUP BY m) SELECT m, rev FROM monthly WHERE rev > 10000;

-- Invalid
SELECTT * FORM users;
```

### 9.2 Test User Accounts

| Account | Email | Password | Purpose |
|---|---|---|---|
| Test User A | test-a@sqlsense.test | TestPassword1! | Primary test user |
| Test User B | test-b@sqlsense.test | TestPassword2! | RLS isolation testing |

---

## 10. Test Execution Schedule

| Phase | Test Type | When |
|---|---|---|
| Phase 4 | Parser unit tests | During parser development |
| Phase 5–6 | Component tests | During component development |
| Phase 7 | API integration tests | During API development |
| Phase 9 | Manual E2E, accessibility, performance | During polish phase |
| Phase 10 | Security tests, full regression | Before deployment |

---

*This Test Plan covers all testing for SQLSense v1.0. All test cases map to acceptance criteria in [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md).*
