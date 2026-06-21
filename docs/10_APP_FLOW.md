# SQLSense — App Flow

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document maps every user-facing flow in SQLSense from start to finish. Each flow is documented with entry conditions, step-by-step sequences, decision points, exit conditions, and error paths. It serves as the definitive reference for QA testing and development of user journeys.

**Related Documents:**
- [03_UI_UX_BRIEF.md](./03_UI_UX_BRIEF.md)
- [05_USER_STORIES.md](./05_USER_STORIES.md)
- [11_APP_LOGIC_SYSTEM.md](./11_APP_LOGIC_SYSTEM.md)

---

## 1. Application Entry Points

| Entry Point | URL | Source | User State |
|---|---|---|---|
| Direct visit | `/` | Typing URL, bookmark, search engine | Unknown |
| Example redirect | `/?query=...` | "Try This Query" from Examples page | Unknown |
| Auth redirect | `/sign-in` | Protected route redirect | Guest |
| Deep link | `/examples`, `/about` | External link, search engine | Unknown |
| Return visit | `/dashboard` | Bookmarked authenticated page | Authenticated (session) |

---

## 2. Flow Diagrams

### 2.1 Master Application Flow

```
                              ┌──────────────┐
                              │   User Lands  │
                              │   on App      │
                              └──────┬───────┘
                                     │
                              ┌──────▼───────┐
                              │  Check Auth   │
                              │  State        │
                              └──────┬───────┘
                                     │
                        ┌────────────┼────────────┐
                        ▼                         ▼
                 ┌─────────────┐          ┌─────────────┐
                 │   GUEST     │          │AUTHENTICATED│
                 │   FLOW      │          │   FLOW      │
                 └──────┬──────┘          └──────┬──────┘
                        │                        │
              ┌─────────┼─────────┐    ┌─────────┼─────────┐
              ▼         ▼         ▼    ▼         ▼         ▼
         ┌────────┐ ┌────────┐ ┌────┐ ┌────────┐ ┌────────┐ ┌────────┐
         │Analyze │ │Examples│ │About│ │Dashboard│ │History │ │Analyze │
         │  (/)   │ │        │ │    │ │         │ │        │ │  (/)   │
         └────────┘ └────────┘ └────┘ └────────┘ └────────┘ └────────┘
              │                                                  │
              ▼                                                  ▼
         ┌────────┐                                         ┌────────┐
         │ Save?  │                                         │ Save ✓ │
         │ → Sign │                                         └────────┘
         │   In   │
         └────────┘
```

### 2.2 Flow F-001: First-Time Guest Analysis

**Preconditions:** User is not authenticated. User has never visited SQLSense.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User visits `/` | Landing page loads with hero section, SQL editor visible | 2 |
| 2 | User reads hero ("Understand SQL Instantly") | CTA buttons visible: "Try It Now", "View Examples" | 3a or 3b |
| 3a | User clicks "Try It Now" | Smooth scroll to SQL editor section | 4 |
| 3b | User scrolls down to editor | SQL editor section becomes visible | 4 |
| 4 | User clicks into SQL editor | Editor receives focus (border glow, cursor active) | 5 |
| 5 | User pastes/types SQL query | Text appears in monospace; character count updates | 6 |
| 6 | User clicks "Analyze Query ▶" | Loading skeleton appears in output panel | 7 |
| 7 | System parses SQL (client-side) | Results appear in tabs (< 500ms) | 8 |
| 8 | User reads Explanation tab (default) | Plain-English explanation displayed | 9 |
| 9 | User explores other tabs | Content transitions smoothly on tab click | 10 |
| 10 | User sees "Save" prompt | Message: "Sign in to save queries" | End or → F-003 |

**Error Paths:**
- Step 6 → Empty editor: Shake animation, error "Please enter a SQL query"
- Step 7 → Invalid SQL: Error in output panel "Could not parse this SQL query"

### 2.3 Flow F-002: Return Authenticated User Analysis + Save

**Preconditions:** User has an active session.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User visits `/` | Landing page loads; header shows authenticated nav | 2 |
| 2 | User pastes SQL into editor | Text appears; character count updates | 3 |
| 3 | User clicks "Analyze Query ▶" or Ctrl+Enter | Loading skeleton → results in tabs | 4 |
| 4 | User reviews analysis | All tabs available with full analysis | 5 |
| 5 | User clicks "Save" button | Button shows spinner; "Saving..." text | 6 |
| 6 | System saves to Supabase | Toast: "Query saved to your history!" ✅ | 7 |
| 7 | User can analyze another query or navigate away | Save button resets to default state | End |

**Error Paths:**
- Step 6 → Network error: Toast "Failed to save. Please try again."
- Step 6 → Session expired: Toast "Session expired. Please sign in again." → redirect to `/sign-in`

### 2.4 Flow F-003: Guest Sign-Up

**Preconditions:** User is not authenticated.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User clicks "Get Started" in header (or "Sign Up" link) | Navigate to `/sign-up` | 2 |
| 2 | Page loads | Sign-up card with form: Email, Password, Confirm Password | 3 |
| 3 | User enters email | Real-time validation on blur (Zod) | 4 |
| 4 | User enters password | Password strength feedback (optional); min 8 chars validation | 5 |
| 5 | User enters confirm password | Match validation on blur | 6 |
| 6 | User clicks "Create Account" | Button shows spinner: "Creating account..." | 7 |
| 7 | Supabase creates account | JWT issued, session established | 8 |
| 8 | System redirects to `/dashboard` | Toast: "Account created successfully!" ✅ | End |

**Error Paths:**
- Step 3 → Invalid email format: Error "Please enter a valid email address"
- Step 4 → Password < 8 chars: Error "Password must be at least 8 characters"
- Step 5 → Passwords don't match: Error "Passwords do not match"
- Step 7 → Email taken: Error "An account with this email already exists"
- Step 7 → Network error: Error "Something went wrong. Please try again."

### 2.5 Flow F-004: Returning User Sign-In

**Preconditions:** User has an existing account. User is not currently signed in.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User clicks "Sign In" in header | Navigate to `/sign-in` | 2 |
| 2 | Page loads | Sign-in card with form: Email, Password | 3 |
| 3 | User enters credentials | Input fields accept text | 4 |
| 4 | User clicks "Sign In" | Button shows spinner: "Signing in..." | 5 |
| 5 | Supabase verifies credentials | JWT issued, session established | 6 |
| 6 | System redirects to `/dashboard` | Toast: "Welcome back!" ✅ | End |

**Error Paths:**
- Step 5 → Wrong credentials: Error "Invalid email or password"
- Step 5 → Network error: Error "Something went wrong. Please try again."

### 2.6 Flow F-005: View and Manage History

**Preconditions:** User is authenticated with saved queries.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User clicks "History" in nav | Navigate to `/history` | 2 |
| 2 | Page loads | List of saved queries (newest first) with loading skeleton | 3 |
| 3 | User scrolls through history cards | Cards show: SQL preview, explanation preview, complexity, timestamp | 4a or 4b |
| 4a | User clicks "View Full Analysis" on a card | Expanded view / modal shows full analysis | 5a |
| 4b | User clicks "Delete" on a card | Confirmation dialog appears | 5b |
| 5a | User reviews full analysis | All analysis details visible | Close modal → 3 |
| 5b | User clicks "Delete Query" in dialog | Query deleted; card removed with animation; toast "Query deleted" | 3 |
| 5c | User clicks "Cancel" in dialog | Dialog closes; no action | 3 |

**Error Paths:**
- Step 2 → Network error: Error state "Failed to load history. Please try again." with retry button
- Step 5b → Delete fails: Toast "Failed to delete. Please try again."

### 2.7 Flow F-006: Browse and Try Examples

**Preconditions:** None (public page).

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User clicks "Examples" in nav | Navigate to `/examples` | 2 |
| 2 | Page loads | Grid of example cards; "All" filter active by default | 3 |
| 3 | User clicks a difficulty filter (e.g., "Intermediate") | Grid filters to show only matching examples | 4 |
| 4 | User finds an interesting example | Card shows: difficulty badge, title, SQL preview | 5 |
| 5 | User clicks "Try This Query" | Navigate to `/?query=encoded_sql` | 6 |
| 6 | Landing page loads with query pre-filled in editor | Editor shows the example SQL | 7 |
| 7 | User clicks "Analyze Query ▶" | Analysis results appear | End → F-001 Step 8 |

### 2.8 Flow F-007: Sign Out

**Preconditions:** User is authenticated.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User opens user dropdown in header | Dropdown shows: Dashboard, History, Sign Out | 2 |
| 2 | User clicks "Sign Out" | Session destroyed; Supabase signOut called | 3 |
| 3 | System redirects to `/` | Header shows guest nav; toast: "Signed out successfully" | End |

### 2.9 Flow F-008: Protected Route Access (Unauthenticated)

**Preconditions:** User is not authenticated.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User navigates to `/dashboard` or `/history` directly | Middleware checks auth state | 2 |
| 2 | No valid session found | Redirect to `/sign-in` | 3 |
| 3 | User signs in successfully | Redirect to originally requested page | End |

### 2.10 Flow F-009: Dashboard Overview

**Preconditions:** User is authenticated.

| Step | Action | System Response | Next Step |
|---|---|---|---|
| 1 | User navigates to `/dashboard` | Dashboard page loads | 2 |
| 2 | System fetches user stats | Stats cards populate: total saved, highest complexity | 3 |
| 3 | System fetches recent queries | Recent queries section populates (last 3) | 4 |
| 4a | User clicks "Analyze New Query" | Navigate to `/` | End |
| 4b | User clicks "View History" | Navigate to `/history` | End |
| 4c | User clicks "Browse Examples" | Navigate to `/examples` | End |
| 4d | User clicks "View All History →" | Navigate to `/history` | End |
| 4e | User clicks a recent query card | Expanded view of that query | End |

---

## 3. Navigation State Machine

```
                                    ┌──────────┐
                                    │   /      │◄─── Default
                                    │ Landing  │
                                    └────┬─────┘
                                         │
                    ┌────────────┬────────┼────────┬───────────┐
                    ▼            ▼        ▼        ▼           ▼
              ┌──────────┐ ┌────────┐ ┌──────┐ ┌──────────┐ ┌──────┐
              │ /sign-in │ │/sign-up│ │/about│ │/examples │ │/dash-│
              │          │ │        │ │      │ │          │ │board │
              └────┬─────┘ └───┬────┘ └──────┘ └────┬─────┘ └──┬───┘
                   │           │                    │          │
                   │    ┌──────▼───────┐     ┌──────▼──┐    ┌──▼─────┐
                   └───▶│ /dashboard   │     │  / with │    │/history│
                        │ (on success) │     │  query  │    │        │
                        └──────────────┘     └─────────┘    └────────┘
```

### 3.1 Route Access Rules

| Route | Guest | Authenticated | Redirect If Wrong State |
|---|---|---|---|
| `/` | ✅ | ✅ | None |
| `/sign-in` | ✅ | ❌ | → `/dashboard` |
| `/sign-up` | ✅ | ❌ | → `/dashboard` |
| `/dashboard` | ❌ | ✅ | → `/sign-in` |
| `/history` | ❌ | ✅ | → `/sign-in` |
| `/examples` | ✅ | ✅ | None |
| `/about` | ✅ | ✅ | None |

---

## 4. Edge Cases and Special Flows

### 4.1 Session Expiry During Active Use

| Scenario | Detection | Response |
|---|---|---|
| Token expires while browsing | Middleware detects on next request | Auto-refresh via refresh token |
| Refresh token expires | API call returns 401 | Toast "Session expired"; redirect to `/sign-in` |
| User is on protected page when session expires | Next API call fails | Graceful redirect with message |

### 4.2 Network Disconnection

| Scenario | Impact | Response |
|---|---|---|
| User loses network during analysis | No impact — client-side | Analysis works normally |
| User loses network during save | Save fails | Toast "Connection error. Please try again." |
| User loses network during page load | Page may not load | Browser's default offline page |

### 4.3 Browser Back/Forward Navigation

| From | Back Action | Expected Behavior |
|---|---|---|
| `/dashboard` (after sign-in) | Press Back | Return to `/sign-in` (redirects back to `/dashboard` since still authenticated) |
| `/` (after analyzing) | Press Back | Browser default; analysis results may persist in Zustand store |
| `/history` | Press Back | Return to previous page |
| `/` (after example redirect) | Press Back | Return to `/examples` |

### 4.4 Multiple Tab Behavior

| Scenario | Behavior |
|---|---|
| User signs out in Tab 1, Tab 2 is on `/dashboard` | Tab 2 continues until next API call, then redirects to `/sign-in` |
| User signs in on Tab 1, Tab 2 is on `/sign-in` | Tab 2 stays on `/sign-in` until refreshed or navigated |
| User saves query in Tab 1, views history in Tab 2 | Tab 2 shows cached data until refreshed |

---

## 5. Flow Testing Checklist

| Flow ID | Flow Name | Test Method | Status |
|---|---|---|---|
| F-001 | First-Time Guest Analysis | Manual + E2E | ⬜ |
| F-002 | Authenticated Analysis + Save | Manual + E2E | ⬜ |
| F-003 | Guest Sign-Up | Manual + Integration | ⬜ |
| F-004 | Returning User Sign-In | Manual + Integration | ⬜ |
| F-005 | View and Manage History | Manual + Integration | ⬜ |
| F-006 | Browse and Try Examples | Manual + E2E | ⬜ |
| F-007 | Sign Out | Manual + Integration | ⬜ |
| F-008 | Protected Route Access | Manual + Unit | ⬜ |
| F-009 | Dashboard Overview | Manual + Integration | ⬜ |

---

*This App Flow document maps every user journey through SQLSense. All flows should be tested end-to-end before release. See [19_TEST_PLAN.md](./19_TEST_PLAN.md) for the complete testing strategy.*
