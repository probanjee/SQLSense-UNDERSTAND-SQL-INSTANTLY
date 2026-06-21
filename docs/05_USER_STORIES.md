# SQLSense — User Stories

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document enumerates all user stories for SQLSense v1.0, organized by epic. Each story follows the standard format: "As a [role], I want [capability], so that [benefit]." Stories are prioritized (P0 = must-have, P1 = should-have, P2 = nice-to-have) and cross-referenced with acceptance criteria in [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md).

**Related Documents:**
- [04_PRD.md](./04_PRD.md)
- [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md)
- [03_UI_UX_BRIEF.md](./03_UI_UX_BRIEF.md)
- [10_APP_FLOW.md](./10_APP_FLOW.md)

---

## Story Format

```
ID:       [EPIC]-[NUMBER]
Title:    [Short descriptive title]
Role:     As a [guest user | authenticated user | developer]
Want:     I want [capability]
Benefit:  So that [benefit / outcome]
Priority: P0 | P1 | P2
AC Ref:   [Link to acceptance criteria]
```

---

## Epic 1: SQL Query Analysis

### US-SQL-001: Paste SQL Query

| Field | Value |
|---|---|
| **ID** | US-SQL-001 |
| **Title** | Paste SQL Query into Editor |
| **Role** | As a guest user |
| **Want** | I want to paste a SQL query into a text editor on the landing page |
| **Benefit** | So that I can submit it for analysis without any setup or sign-up |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-001 |

### US-SQL-002: Analyze SQL Query

| Field | Value |
|---|---|
| **ID** | US-SQL-002 |
| **Title** | Analyze SQL Query |
| **Role** | As a guest user |
| **Want** | I want to click an "Analyze Query" button after entering my SQL |
| **Benefit** | So that the system processes my query and generates an analysis |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-002 |

### US-SQL-003: View Plain-English Explanation

| Field | Value |
|---|---|
| **ID** | US-SQL-003 |
| **Title** | View Plain-English Explanation |
| **Role** | As a guest user |
| **Want** | I want to see a plain-English explanation of what my SQL query does |
| **Benefit** | So that I can understand the query's purpose without deep SQL knowledge |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-003 |

### US-SQL-004: View Clause Breakdown

| Field | Value |
|---|---|
| **ID** | US-SQL-004 |
| **Title** | View Clause Breakdown |
| **Role** | As a guest user |
| **Want** | I want to see each SQL clause (SELECT, FROM, WHERE, etc.) explained individually |
| **Benefit** | So that I can learn what each part of the query contributes |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-004 |

### US-SQL-005: View Complexity Analysis

| Field | Value |
|---|---|
| **ID** | US-SQL-005 |
| **Title** | View Complexity Analysis |
| **Role** | As a guest user |
| **Want** | I want to see a complexity score (1–10) with a classification label |
| **Benefit** | So that I can gauge the difficulty level of the query and track my learning progress |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-005 |

### US-SQL-006: View Optimization Suggestions

| Field | Value |
|---|---|
| **ID** | US-SQL-006 |
| **Title** | View Optimization Suggestions |
| **Role** | As a guest user |
| **Want** | I want to see actionable optimization tips for my query |
| **Benefit** | So that I can learn how to write more efficient SQL |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-006 |

### US-SQL-007: View Query Flow Visualization

| Field | Value |
|---|---|
| **ID** | US-SQL-007 |
| **Title** | View Query Flow Visualization |
| **Role** | As a guest user |
| **Want** | I want to see a visual diagram showing the logical execution order of my query |
| **Benefit** | So that I can understand how the database would process the query step by step |
| **Priority** | P1 |
| **AC Ref** | AC-SQL-007 |

### US-SQL-008: Handle Invalid SQL

| Field | Value |
|---|---|
| **ID** | US-SQL-008 |
| **Title** | Handle Invalid SQL Gracefully |
| **Role** | As a guest user |
| **Want** | I want to see a clear error message when I enter invalid SQL |
| **Benefit** | So that I know the issue and can correct my query without confusion |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-008 |

### US-SQL-009: Clear SQL Input

| Field | Value |
|---|---|
| **ID** | US-SQL-009 |
| **Title** | Clear SQL Input |
| **Role** | As a guest user |
| **Want** | I want to clear the SQL editor with a single click |
| **Benefit** | So that I can quickly start analyzing a new query |
| **Priority** | P1 |
| **AC Ref** | AC-SQL-009 |

### US-SQL-010: Copy Analysis Output

| Field | Value |
|---|---|
| **ID** | US-SQL-010 |
| **Title** | Copy Analysis Output |
| **Role** | As a guest user |
| **Want** | I want to copy the analysis output (explanation, clauses, etc.) to my clipboard |
| **Benefit** | So that I can paste it into my notes, assignments, or documentation |
| **Priority** | P1 |
| **AC Ref** | AC-SQL-010 |

### US-SQL-011: Switch Analysis Tabs

| Field | Value |
|---|---|
| **ID** | US-SQL-011 |
| **Title** | Switch Between Analysis Tabs |
| **Role** | As a guest user |
| **Want** | I want to switch between Explanation, Clauses, Complexity, Optimization, and Flow tabs |
| **Benefit** | So that I can explore different dimensions of the analysis |
| **Priority** | P0 |
| **AC Ref** | AC-SQL-011 |

---

## Epic 2: Authentication

### US-AUTH-001: Sign Up with Email

| Field | Value |
|---|---|
| **ID** | US-AUTH-001 |
| **Title** | Sign Up with Email and Password |
| **Role** | As a guest user |
| **Want** | I want to create an account with my email and password |
| **Benefit** | So that I can save my analysis results and access them later |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-001 |

### US-AUTH-002: Sign In with Email

| Field | Value |
|---|---|
| **ID** | US-AUTH-002 |
| **Title** | Sign In with Email and Password |
| **Role** | As a returning user |
| **Want** | I want to sign in with my existing email and password |
| **Benefit** | So that I can access my saved queries and dashboard |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-002 |

### US-AUTH-003: Persistent Session

| Field | Value |
|---|---|
| **ID** | US-AUTH-003 |
| **Title** | Stay Signed In Across Sessions |
| **Role** | As an authenticated user |
| **Want** | I want my session to persist when I close and reopen the browser |
| **Benefit** | So that I don't have to sign in every time I visit |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-003 |

### US-AUTH-004: Sign Out

| Field | Value |
|---|---|
| **ID** | US-AUTH-004 |
| **Title** | Sign Out |
| **Role** | As an authenticated user |
| **Want** | I want to sign out of my account |
| **Benefit** | So that I can protect my account on shared devices |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-004 |

### US-AUTH-005: Protected Routes

| Field | Value |
|---|---|
| **ID** | US-AUTH-005 |
| **Title** | Protected Routes Redirect |
| **Role** | As a guest user |
| **Want** | I want to be redirected to the sign-in page when I try to access protected pages |
| **Benefit** | So that I understand I need to sign in to use those features |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-005 |

### US-AUTH-006: Auth Form Validation

| Field | Value |
|---|---|
| **ID** | US-AUTH-006 |
| **Title** | Form Validation Feedback |
| **Role** | As a guest user |
| **Want** | I want to see clear validation errors when I fill out auth forms incorrectly |
| **Benefit** | So that I can correct my input and successfully sign in/up |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-006 |

### US-AUTH-007: Auth-Aware Navigation

| Field | Value |
|---|---|
| **ID** | US-AUTH-007 |
| **Title** | Navigation Reflects Auth State |
| **Role** | As a user |
| **Want** | I want the navigation to show different links based on whether I'm signed in |
| **Benefit** | So that I can easily access features relevant to my state |
| **Priority** | P0 |
| **AC Ref** | AC-AUTH-007 |

---

## Epic 3: Saved Query History

### US-HIST-001: Save Query Analysis

| Field | Value |
|---|---|
| **ID** | US-HIST-001 |
| **Title** | Save Query Analysis |
| **Role** | As an authenticated user |
| **Want** | I want to save the current analysis results to my history |
| **Benefit** | So that I can review them later for studying or reference |
| **Priority** | P0 |
| **AC Ref** | AC-HIST-001 |

### US-HIST-002: View Saved History

| Field | Value |
|---|---|
| **ID** | US-HIST-002 |
| **Title** | View Saved Query History |
| **Role** | As an authenticated user |
| **Want** | I want to see a list of all my saved query analyses |
| **Benefit** | So that I can review past queries and track my learning |
| **Priority** | P0 |
| **AC Ref** | AC-HIST-002 |

### US-HIST-003: View Full Saved Analysis

| Field | Value |
|---|---|
| **ID** | US-HIST-003 |
| **Title** | View Full Saved Analysis |
| **Role** | As an authenticated user |
| **Want** | I want to click on a saved query to view the full analysis |
| **Benefit** | So that I can review the complete explanation, clauses, and tips |
| **Priority** | P0 |
| **AC Ref** | AC-HIST-003 |

### US-HIST-004: Delete Saved Query

| Field | Value |
|---|---|
| **ID** | US-HIST-004 |
| **Title** | Delete Saved Query |
| **Role** | As an authenticated user |
| **Want** | I want to delete a saved query from my history |
| **Benefit** | So that I can keep my history clean and relevant |
| **Priority** | P0 |
| **AC Ref** | AC-HIST-004 |

### US-HIST-005: Save Prompt for Guests

| Field | Value |
|---|---|
| **ID** | US-HIST-005 |
| **Title** | Prompt Guest to Sign In When Saving |
| **Role** | As a guest user |
| **Want** | I want to be informed that I need to sign in to save queries |
| **Benefit** | So that I understand why the save feature is unavailable and can choose to sign up |
| **Priority** | P0 |
| **AC Ref** | AC-HIST-005 |

### US-HIST-006: Data Isolation

| Field | Value |
|---|---|
| **ID** | US-HIST-006 |
| **Title** | Only See My Own History |
| **Role** | As an authenticated user |
| **Want** | I want to see only my own saved queries, not other users' data |
| **Benefit** | So that my data is private and the history is relevant to me |
| **Priority** | P0 |
| **AC Ref** | AC-HIST-006 |

---

## Epic 4: Dashboard

### US-DASH-001: View Dashboard

| Field | Value |
|---|---|
| **ID** | US-DASH-001 |
| **Title** | View Personal Dashboard |
| **Role** | As an authenticated user |
| **Want** | I want to see a personalized dashboard when I sign in |
| **Benefit** | So that I have a home base with my stats and quick actions |
| **Priority** | P0 |
| **AC Ref** | AC-DASH-001 |

### US-DASH-002: View Stats

| Field | Value |
|---|---|
| **ID** | US-DASH-002 |
| **Title** | View Usage Statistics |
| **Role** | As an authenticated user |
| **Want** | I want to see how many queries I've saved and my highest complexity score |
| **Benefit** | So that I can track my learning progress |
| **Priority** | P1 |
| **AC Ref** | AC-DASH-002 |

### US-DASH-003: Quick Actions

| Field | Value |
|---|---|
| **ID** | US-DASH-003 |
| **Title** | Access Quick Actions |
| **Role** | As an authenticated user |
| **Want** | I want quick action buttons to analyze a new query, view history, or browse examples |
| **Benefit** | So that I can quickly navigate to the feature I need |
| **Priority** | P0 |
| **AC Ref** | AC-DASH-003 |

### US-DASH-004: Recent Queries

| Field | Value |
|---|---|
| **ID** | US-DASH-004 |
| **Title** | View Recent Saved Queries on Dashboard |
| **Role** | As an authenticated user |
| **Want** | I want to see my 3 most recently saved queries on the dashboard |
| **Benefit** | So that I can quickly revisit recent analyses |
| **Priority** | P1 |
| **AC Ref** | AC-DASH-004 |

---

## Epic 5: Example Queries

### US-EX-001: Browse Examples

| Field | Value |
|---|---|
| **ID** | US-EX-001 |
| **Title** | Browse Example Queries |
| **Role** | As a guest user |
| **Want** | I want to browse a curated library of example SQL queries |
| **Benefit** | So that I can learn from well-structured queries at various difficulty levels |
| **Priority** | P0 |
| **AC Ref** | AC-EX-001 |

### US-EX-002: Filter by Difficulty

| Field | Value |
|---|---|
| **ID** | US-EX-002 |
| **Title** | Filter Examples by Difficulty |
| **Role** | As a guest user |
| **Want** | I want to filter examples by Beginner, Intermediate, or Advanced |
| **Benefit** | So that I can focus on queries appropriate to my skill level |
| **Priority** | P0 |
| **AC Ref** | AC-EX-002 |

### US-EX-003: Try Example Query

| Field | Value |
|---|---|
| **ID** | US-EX-003 |
| **Title** | Try an Example Query |
| **Role** | As a guest user |
| **Want** | I want to click "Try This Query" on an example and have it loaded into the analyzer |
| **Benefit** | So that I can immediately see the analysis without copying and pasting |
| **Priority** | P0 |
| **AC Ref** | AC-EX-003 |

---

## Epic 6: About Page

### US-ABOUT-001: View About Information

| Field | Value |
|---|---|
| **ID** | US-ABOUT-001 |
| **Title** | View About Page |
| **Role** | As a guest user |
| **Want** | I want to learn about what SQLSense is, how it works, and who built it |
| **Benefit** | So that I can trust the tool and understand its capabilities |
| **Priority** | P0 |
| **AC Ref** | AC-ABOUT-001 |

---

## Epic 7: Navigation & Layout

### US-NAV-001: Navigate Between Pages

| Field | Value |
|---|---|
| **ID** | US-NAV-001 |
| **Title** | Navigate Using Header |
| **Role** | As a user |
| **Want** | I want to navigate between all pages using the header navigation |
| **Benefit** | So that I can easily move through the application |
| **Priority** | P0 |
| **AC Ref** | AC-NAV-001 |

### US-NAV-002: Mobile Navigation

| Field | Value |
|---|---|
| **ID** | US-NAV-002 |
| **Title** | Use Mobile Navigation |
| **Role** | As a mobile user |
| **Want** | I want to use a hamburger menu to navigate on small screens |
| **Benefit** | So that I can access all pages on my phone or tablet |
| **Priority** | P0 |
| **AC Ref** | AC-NAV-002 |

### US-NAV-003: View Footer

| Field | Value |
|---|---|
| **ID** | US-NAV-003 |
| **Title** | View Footer with Author Info |
| **Role** | As a user |
| **Want** | I want to see the author's name, email, and the "Built for Digital Heroes" button in the footer |
| **Benefit** | So that I know who built the tool and can contact them |
| **Priority** | P0 |
| **AC Ref** | AC-NAV-003 |

---

## Epic 8: Security & Trust

### US-SEC-001: Trust SQL Safety

| Field | Value |
|---|---|
| **ID** | US-SEC-001 |
| **Title** | Trust That SQL Is Not Executed |
| **Role** | As a guest user |
| **Want** | I want to be assured that my SQL queries are only parsed, never executed |
| **Benefit** | So that I feel safe pasting any query, including ones with sensitive table/column names |
| **Priority** | P0 |
| **AC Ref** | AC-SEC-001 |

### US-SEC-002: Sanitized Output

| Field | Value |
|---|---|
| **ID** | US-SEC-002 |
| **Title** | View Sanitized Analysis Output |
| **Role** | As a guest user |
| **Want** | I want the analysis output to be safe from XSS attacks |
| **Benefit** | So that malicious SQL input cannot compromise my browser |
| **Priority** | P0 |
| **AC Ref** | AC-SEC-002 |

---

## Story Summary

| Epic | P0 Stories | P1 Stories | P2 Stories | Total |
|---|---|---|---|---|
| SQL Query Analysis | 8 | 3 | 0 | 11 |
| Authentication | 7 | 0 | 0 | 7 |
| Saved Query History | 6 | 0 | 0 | 6 |
| Dashboard | 2 | 2 | 0 | 4 |
| Example Queries | 3 | 0 | 0 | 3 |
| About Page | 1 | 0 | 0 | 1 |
| Navigation & Layout | 3 | 0 | 0 | 3 |
| Security & Trust | 2 | 0 | 0 | 2 |
| **Total** | **32** | **5** | **0** | **37** |

---

*All user stories are cross-referenced with acceptance criteria in [06_ACCEPTANCE_CRITERIA.md](./06_ACCEPTANCE_CRITERIA.md). Stories should be implemented in epic order, with all P0 stories completed before P1 stories within each epic.*
