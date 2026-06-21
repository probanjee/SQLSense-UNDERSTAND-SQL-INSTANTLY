# SQLSense — Acceptance Criteria

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document defines the acceptance criteria for every user story in SQLSense v1.0. Each acceptance criterion is written in Given/When/Then (GWT) format and is directly testable. QA engineers and developers should use this document to verify feature completeness.

**Related Documents:**
- [05_USER_STORIES.md](./05_USER_STORIES.md)
- [04_PRD.md](./04_PRD.md)
- [19_TEST_PLAN.md](./19_TEST_PLAN.md)

---

## Epic 1: SQL Query Analysis

### AC-SQL-001: Paste SQL Query into Editor

**Story Ref:** US-SQL-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is on the landing page (`/`) | The page loads | A text editor with monospace font (JetBrains Mono) is visible without scrolling on desktop |
| 2 | The SQL editor is visible | The user clicks into the editor | The editor receives focus with a visible focus indicator (primary border glow) |
| 3 | The editor is focused | The user pastes a SQL query | The SQL text appears in the editor with monospace formatting |
| 4 | The editor is focused | The user types a SQL query | Characters appear in real-time with monospace formatting |
| 5 | The editor contains text | The user has typed 4,999 characters | A character count indicator shows "4999 / 5000" |
| 6 | The editor contains text | The user attempts to type beyond 5,000 characters | Additional characters are rejected; the count shows "5000 / 5000" |

### AC-SQL-002: Analyze SQL Query

**Story Ref:** US-SQL-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | A valid SQL query is in the editor | The user clicks "Analyze Query ▶" | A loading skeleton appears in the output panel |
| 2 | The analysis is processing | The client-side parser completes | The loading skeleton is replaced with analysis results in < 500ms |
| 3 | The analysis is complete | Results are displayed | Five tabs are visible: Explanation, Clauses, Complexity, Optimization, Flow |
| 4 | The editor is empty | The user clicks "Analyze Query ▶" | An error message appears: "Please enter a SQL query to analyze" with a shake animation on the button |
| 5 | A valid SQL query is in the editor | The user presses Ctrl+Enter | The analysis is triggered (same as clicking the button) |

### AC-SQL-003: View Plain-English Explanation

**Story Ref:** US-SQL-003

| # | Given | When | Then |
|---|---|---|---|
| 1 | A query has been analyzed | The Explanation tab is active (default) | A plain-English summary of the query's purpose is displayed |
| 2 | The query is `SELECT * FROM users WHERE active = true` | Analysis completes | The explanation includes: selects all columns, from users table, filters for active users |
| 3 | The query contains a JOIN | Analysis completes | The explanation mentions the join and the relationship between tables |
| 4 | The query contains a subquery | Analysis completes | The explanation describes the subquery's role within the outer query |

### AC-SQL-004: View Clause Breakdown

**Story Ref:** US-SQL-004

| # | Given | When | Then |
|---|---|---|---|
| 1 | A query has been analyzed | The user clicks the "Clauses" tab | Each SQL clause is listed with an individual explanation |
| 2 | The query has a SELECT clause | The Clauses tab is active | The SELECT clause is shown with the columns it selects and their purpose |
| 3 | The query has a WHERE clause | The Clauses tab is active | The WHERE clause is shown with the filter conditions explained |
| 4 | The query has a JOIN clause | The Clauses tab is active | The JOIN clause shows the join type, tables involved, and the ON condition |
| 5 | The query has GROUP BY and HAVING | The Clauses tab is active | Both clauses are explained with their aggregation and filter behavior |

### AC-SQL-005: View Complexity Analysis

**Story Ref:** US-SQL-005

| # | Given | When | Then |
|---|---|---|---|
| 1 | A query has been analyzed | The user clicks the "Complexity" tab | A numeric score (1–10) is displayed with a visual progress bar |
| 2 | The score is 1–3 | The Complexity tab is active | The classification label reads "Simple" with `--color-success` styling |
| 3 | The score is 4–6 | The Complexity tab is active | The classification label reads "Moderate" with `--color-warning` styling |
| 4 | The score is 7–8 | The Complexity tab is active | The classification label reads "Complex" with `--color-primary` styling |
| 5 | The score is 9–10 | The Complexity tab is active | The classification label reads "Expert" with `--color-error` styling |
| 6 | A simple `SELECT * FROM users` query | Analysis completes | The complexity score is in the 1–3 range |
| 7 | A query with multiple JOINs, CTEs, and window functions | Analysis completes | The complexity score is in the 7–10 range |

### AC-SQL-006: View Optimization Suggestions

**Story Ref:** US-SQL-006

| # | Given | When | Then |
|---|---|---|---|
| 1 | A query has been analyzed | The user clicks the "Optimization" tab | A list of actionable optimization tips is displayed |
| 2 | The query uses `SELECT *` | Analysis completes | An optimization tip suggests specifying explicit columns |
| 3 | The query has no WHERE clause on a large table reference | Analysis completes | An optimization tip suggests adding filtering conditions |
| 4 | The query has a subquery that could be a JOIN | Analysis completes | An optimization tip suggests rewriting as a JOIN |
| 5 | The query is already well-optimized | Analysis completes | A message indicates "No significant optimization opportunities found" or provides general best practices |

### AC-SQL-007: View Query Flow Visualization

**Story Ref:** US-SQL-007

| # | Given | When | Then |
|---|---|---|---|
| 1 | A query has been analyzed | The user clicks the "Flow" tab | A visual diagram showing the logical execution order is displayed |
| 2 | The query has FROM, WHERE, SELECT clauses | The Flow tab is active | The diagram shows: FROM → WHERE → SELECT in order |
| 3 | The query has GROUP BY, HAVING, ORDER BY | The Flow tab is active | The diagram shows the correct logical execution sequence |

### AC-SQL-008: Handle Invalid SQL

**Story Ref:** US-SQL-008

| # | Given | When | Then |
|---|---|---|---|
| 1 | Invalid SQL is in the editor (e.g., "SELECTT * FORM users") | The user clicks "Analyze Query" | An error message appears in the output panel: "Could not parse this SQL query. Please check the syntax." |
| 2 | An error is displayed | The user corrects the SQL and clicks "Analyze" again | The error is cleared and valid results are displayed |
| 3 | Random non-SQL text is entered | The user clicks "Analyze Query" | An error message appears indicating the input is not valid SQL |

### AC-SQL-009: Clear SQL Input

**Story Ref:** US-SQL-009

| # | Given | When | Then |
|---|---|---|---|
| 1 | The editor contains SQL text | The user clicks the clear ("×") button | The editor is emptied and the output panel shows the empty state |
| 2 | The editor is already empty | The clear button | Is not visible or is disabled |

### AC-SQL-010: Copy Analysis Output

**Story Ref:** US-SQL-010

| # | Given | When | Then |
|---|---|---|---|
| 1 | Analysis results are displayed in any tab | The user clicks the copy button on that tab | The content is copied to the clipboard and a success indicator appears |
| 2 | The content is copied | The user pastes into another application | The pasted content matches the displayed analysis text |

### AC-SQL-011: Switch Analysis Tabs

**Story Ref:** US-SQL-011

| # | Given | When | Then |
|---|---|---|---|
| 1 | Analysis results are displayed | The user clicks a different tab | The content transitions smoothly (crossfade) to the new tab's content |
| 2 | A tab is active | The user presses the → arrow key | The next tab becomes active |
| 3 | A tab is active | The user presses the ← arrow key | The previous tab becomes active |

---

## Epic 2: Authentication

### AC-AUTH-001: Sign Up with Email

**Story Ref:** US-AUTH-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is on `/sign-up` | The page loads | A form with Email, Password, and Confirm Password fields is displayed |
| 2 | Valid email, password (≥8 chars), matching confirm password | The user clicks "Create Account" | A loading spinner appears on the button; text changes to "Creating account..." |
| 3 | Account creation succeeds | Response returns | The user is redirected to `/dashboard` with a success toast: "Account created successfully!" |
| 4 | The email is already registered | The user clicks "Create Account" | An error message appears: "An account with this email already exists" |
| 5 | The password is less than 8 characters | The user clicks "Create Account" or blurs the field | An error appears below the password field: "Password must be at least 8 characters" |
| 6 | Passwords don't match | The user clicks "Create Account" or blurs confirm password | An error appears: "Passwords do not match" |
| 7 | The email format is invalid | The user clicks "Create Account" or blurs the email field | An error appears: "Please enter a valid email address" |

### AC-AUTH-002: Sign In with Email

**Story Ref:** US-AUTH-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is on `/sign-in` | The page loads | A form with Email and Password fields is displayed |
| 2 | Valid credentials are entered | The user clicks "Sign In" | A loading spinner appears; the user is redirected to `/dashboard` |
| 3 | Invalid credentials are entered | The user clicks "Sign In" | An error message appears: "Invalid email or password" |
| 4 | Empty fields | The user clicks "Sign In" | Validation errors appear on all empty required fields |

### AC-AUTH-003: Persistent Session

**Story Ref:** US-AUTH-003

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is signed in | The user closes the browser tab | Upon returning, the user is still signed in |
| 2 | The session token has expired | The user visits any page | The token is automatically refreshed; the user remains signed in |
| 3 | The refresh token has expired | The user visits a protected page | The user is redirected to `/sign-in` with a message: "Session expired. Please sign in again." |

### AC-AUTH-004: Sign Out

**Story Ref:** US-AUTH-004

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is signed in | The user clicks "Sign Out" from the user menu | The session is destroyed; the user is redirected to `/`; navigation shows guest state |
| 2 | The user has signed out | The user tries to access `/dashboard` | The user is redirected to `/sign-in` |

### AC-AUTH-005: Protected Routes

**Story Ref:** US-AUTH-005

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is not signed in | The user navigates to `/dashboard` | The user is redirected to `/sign-in` |
| 2 | The user is not signed in | The user navigates to `/history` | The user is redirected to `/sign-in` |
| 3 | The user is signed in | The user navigates to `/sign-in` | The user is redirected to `/dashboard` |
| 4 | The user is signed in | The user navigates to `/sign-up` | The user is redirected to `/dashboard` |

### AC-AUTH-006: Auth Form Validation

**Story Ref:** US-AUTH-006

| # | Given | When | Then |
|---|---|---|---|
| 1 | Any auth form is displayed | The user submits with an empty email | Error: "Email is required" below the email field |
| 2 | Any auth form is displayed | The user enters "notanemail" | Error: "Please enter a valid email address" |
| 3 | Any auth form is displayed | The user submits with an empty password | Error: "Password is required" below the password field |
| 4 | Sign-up form | The user enters password < 8 chars | Error: "Password must be at least 8 characters" |
| 5 | Sign-up form | Confirm password doesn't match | Error: "Passwords do not match" |
| 6 | Any auth form has errors | The user corrects the input | The error message disappears in real-time |

### AC-AUTH-007: Auth-Aware Navigation

**Story Ref:** US-AUTH-007

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is not signed in | Any page loads | The header shows: Home, Examples, About, Sign In (ghost), Get Started (primary) |
| 2 | The user is signed in | Any page loads | The header shows: Home, Examples, About, Dashboard, History, User avatar with dropdown |
| 3 | The user is signed in | The user opens the user dropdown | Options include: Dashboard, History, Sign Out |

---

## Epic 3: Saved Query History

### AC-HIST-001: Save Query Analysis

**Story Ref:** US-HIST-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is authenticated and analysis results are displayed | The user clicks "Save" | The query, explanation, complexity score, and optimization tips are saved to the database |
| 2 | Save succeeds | Response returns | A success toast appears: "Query saved to your history!" |
| 3 | Save fails (network error) | Response returns | An error toast appears: "Failed to save. Please try again." |
| 4 | The same query is saved again | The user clicks "Save" | A new entry is created (duplicate saves are allowed) |

### AC-HIST-002: View Saved History

**Story Ref:** US-HIST-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is authenticated and has saved queries | The user navigates to `/history` | All saved queries are displayed in reverse chronological order (newest first) |
| 2 | Each history entry | Is displayed | It shows: truncated SQL (first 2 lines), explanation preview, complexity badge, timestamp |
| 3 | The user has no saved queries | The user navigates to `/history` | An empty state is displayed with CTA: "Analyze Your First Query" |

### AC-HIST-003: View Full Saved Analysis

**Story Ref:** US-HIST-003

| # | Given | When | Then |
|---|---|---|---|
| 1 | A history entry is displayed | The user clicks "View Full Analysis" | The complete analysis (query text, full explanation, complexity, optimization tips) is displayed in an expanded view or modal |

### AC-HIST-004: Delete Saved Query

**Story Ref:** US-HIST-004

| # | Given | When | Then |
|---|---|---|---|
| 1 | A history entry is displayed | The user clicks "Delete" | A confirmation dialog appears: "Delete Saved Query? This action cannot be undone." |
| 2 | The confirmation dialog is open | The user clicks "Cancel" | The dialog closes; the entry is not deleted |
| 3 | The confirmation dialog is open | The user clicks "Delete Query" | The entry is deleted; the card is removed with animation; a success toast appears |
| 4 | Delete fails | Response returns error | An error toast appears: "Failed to delete. Please try again." |

### AC-HIST-005: Save Prompt for Guests

**Story Ref:** US-HIST-005

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is not authenticated and analysis results are displayed | The save button area | Shows a message or tooltip: "Sign in to save queries" with a link to `/sign-in` |
| 2 | Alternative: no save button for guests | The output panel for guest users | The "Save" button is not rendered |

### AC-HIST-006: Data Isolation

**Story Ref:** US-HIST-006

| # | Given | When | Then |
|---|---|---|---|
| 1 | User A and User B both have saved queries | User A navigates to `/history` | Only User A's queries are displayed |
| 2 | A malicious API request attempts to access User B's data | The request is processed | Supabase RLS blocks the request; no data is returned |
| 3 | A direct database query without a user session | Is attempted via the API | Returns empty results (RLS enforced) |

---

## Epic 4: Dashboard

### AC-DASH-001: View Dashboard

**Story Ref:** US-DASH-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user is authenticated | The user navigates to `/dashboard` | A personalized dashboard is displayed with welcome banner, stats, quick actions |
| 2 | The welcome banner | Is displayed | It shows "Welcome back, [user email or name]" |

### AC-DASH-002: View Stats

**Story Ref:** US-DASH-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user has saved queries | The dashboard loads | Stats cards show: total saved queries count, highest complexity score |
| 2 | The user has no saved queries | The dashboard loads | Stats cards show "0" for counts and "—" for highest complexity |

### AC-DASH-003: Quick Actions

**Story Ref:** US-DASH-003

| # | Given | When | Then |
|---|---|---|---|
| 1 | The dashboard is displayed | The user clicks "Analyze New Query" | The user is navigated to `/` |
| 2 | The dashboard is displayed | The user clicks "View History" | The user is navigated to `/history` |
| 3 | The dashboard is displayed | The user clicks "Browse Examples" | The user is navigated to `/examples` |

### AC-DASH-004: Recent Queries

**Story Ref:** US-DASH-004

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user has ≥ 3 saved queries | The dashboard loads | The 3 most recent saved queries are displayed with truncated SQL and complexity badges |
| 2 | The user has < 3 saved queries | The dashboard loads | All saved queries are displayed (1 or 2) |
| 3 | The dashboard shows recent queries | The user clicks "View All History →" | The user is navigated to `/history` |

---

## Epic 5: Example Queries

### AC-EX-001: Browse Examples

**Story Ref:** US-EX-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user navigates to `/examples` | The page loads | A grid of example query cards is displayed |
| 2 | Each example card | Is displayed | It shows: difficulty badge (color-coded), title, SQL code preview in monospace |
| 3 | At least 4 beginner, 4 intermediate, and 4 advanced examples | Are present | Total of ≥ 12 examples |

### AC-EX-002: Filter by Difficulty

**Story Ref:** US-EX-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | The examples page is displayed | The "All" filter is active by default | All examples are shown |
| 2 | The user clicks "Beginner" | The filter applies | Only beginner examples are displayed |
| 3 | The user clicks "Intermediate" | The filter applies | Only intermediate examples are displayed |
| 4 | The user clicks "Advanced" | The filter applies | Only advanced examples are displayed |
| 5 | A filter is active | The user clicks "All" | All examples are displayed again |

### AC-EX-003: Try Example Query

**Story Ref:** US-EX-003

| # | Given | When | Then |
|---|---|---|---|
| 1 | An example card is displayed | The user clicks "Try This Query" | The user is navigated to `/` |
| 2 | The user arrives on `/` | From the example redirect | The example's SQL query is pre-filled in the editor, ready for analysis |

---

## Epic 6: About Page

### AC-ABOUT-001: View About Information

**Story Ref:** US-ABOUT-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | The user navigates to `/about` | The page loads | Sections are displayed: What is SQLSense, How It Works, Technology Stack, About the Author |
| 2 | The How It Works section | Is displayed | A 3-step process is shown: Paste query → Analyze → Get results |
| 3 | The About the Author section | Is displayed | "Prosun Banerjee" and "prosunbanerjee8@gmail.com" are displayed |

---

## Epic 7: Navigation & Layout

### AC-NAV-001: Header Navigation

**Story Ref:** US-NAV-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | Any page is loaded | The header is displayed | It is sticky at the top with glassmorphic background |
| 2 | Desktop viewport (≥1024px) | The header is displayed | Navigation links are inline: Home, Examples, About + auth actions |
| 3 | Any nav link | The user clicks it | The user is navigated to the correct page |

### AC-NAV-002: Mobile Navigation

**Story Ref:** US-NAV-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | Mobile viewport (<1024px) | The header is displayed | A hamburger menu icon is shown instead of inline nav links |
| 2 | The hamburger icon | The user clicks it | A full-screen overlay menu slides in from the right |
| 3 | The mobile menu is open | The user clicks a nav link | The menu closes and the user navigates to the page |
| 4 | The mobile menu is open | The user clicks the close (×) button | The menu closes |
| 5 | The mobile menu is open | The user presses Escape | The menu closes |

### AC-NAV-003: Footer

**Story Ref:** US-NAV-003

| # | Given | When | Then |
|---|---|---|---|
| 1 | Any page is loaded | The footer is displayed | It contains: "Prosun Banerjee", "prosunbanerjee8@gmail.com" |
| 2 | The footer is displayed | The "Built for Digital Heroes" button is visible | The button text is exactly "Built for Digital Heroes" |
| 3 | The "Built for Digital Heroes" button | The user clicks it | The user is navigated to the Digital Heroes website (external link, new tab) |

---

## Epic 8: Security

### AC-SEC-001: SQL Not Executed

**Story Ref:** US-SEC-001

| # | Given | When | Then |
|---|---|---|---|
| 1 | Any SQL query is entered | The user clicks "Analyze" | No database connection is established; parsing happens entirely on the client side |
| 2 | A potentially destructive query (e.g., `DROP TABLE users`) | The user clicks "Analyze" | The query is parsed and explained but never executed; the explanation correctly identifies it as a DROP TABLE operation |
| 3 | The application codebase | Is reviewed | No database connection strings or execution commands exist for user-provided SQL |

### AC-SEC-002: Sanitized Output

**Story Ref:** US-SEC-002

| # | Given | When | Then |
|---|---|---|---|
| 1 | SQL input contains `<script>alert('xss')</script>` | The analysis is displayed | The script tags are sanitized; no JavaScript is executed |
| 2 | SQL input contains HTML entities | The analysis is displayed | HTML is escaped and rendered as text, not interpreted |
| 3 | All analysis output | Is rendered in the DOM | It passes through DOMPurify before insertion |

---

## Acceptance Criteria Summary

| Epic | Criteria Count | Critical Criteria |
|---|---|---|
| SQL Query Analysis | 30 | Parse accuracy, error handling, tab navigation |
| Authentication | 24 | Credential validation, session persistence, route protection |
| Saved Query History | 14 | Save/delete operations, RLS enforcement, data isolation |
| Dashboard | 9 | Stats accuracy, quick actions, empty states |
| Example Queries | 9 | Difficulty filtering, "Try This Query" flow |
| About Page | 3 | Content completeness |
| Navigation & Layout | 10 | Responsive header, footer content, mobile menu |
| Security | 5 | No SQL execution, XSS prevention |
| **Total** | **104** | — |

---

*Every acceptance criterion in this document is testable. The QA team should create test cases that directly map to these criteria. See [19_TEST_PLAN.md](./19_TEST_PLAN.md) for the complete testing strategy.*
