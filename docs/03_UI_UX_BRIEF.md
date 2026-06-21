# SQLSense — UI/UX Brief

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This UI/UX Brief defines the user experience strategy for SQLSense. It establishes user personas, user journeys, interaction patterns, information architecture, and usability principles. While the Design Brief covers visual appearance, this document covers how users think, feel, and navigate through the application.

**Related Documents:**
- [01_DESIGN_BRIEF.md](./01_DESIGN_BRIEF.md)
- [02_DESIGN_PLAN.md](./02_DESIGN_PLAN.md)
- [05_USER_STORIES.md](./05_USER_STORIES.md)
- [10_APP_FLOW.md](./10_APP_FLOW.md)

---

## 1. UX Principles

### 1.1 Core UX Pillars

| Pillar | Description | Implementation |
|---|---|---|
| **Immediate Value** | Users get value within 10 seconds of landing | SQL input is front-and-center on the landing page; no sign-up required |
| **Zero Friction** | Remove every unnecessary step | Guest access to core feature; no onboarding wizard; one-click analysis |
| **Progressive Disclosure** | Show complexity only when asked | Start with plain explanation; details available via tabs |
| **Trust Through Transparency** | Users know exactly what happens to their SQL | Clear messaging that SQL is parsed, never executed |
| **Encouraging Learning** | The tool educates, not just answers | Clause breakdowns teach SQL patterns; complexity scores motivate improvement |

### 1.2 UX Goals

| Goal | Metric | Target |
|---|---|---|
| Time to first analysis | Seconds from landing to seeing results | < 15 seconds |
| Task completion rate | % of users who successfully analyze a query | > 90% |
| Return rate | % of users who return within 7 days | > 30% |
| Save rate | % of authenticated users who save at least one query | > 50% |
| Error recovery | % of users who recover from errors without leaving | > 85% |

---

## 2. User Personas

### 2.1 Persona: Priya — The CS Student

| Attribute | Detail |
|---|---|
| **Age** | 21 |
| **Role** | Computer Science undergraduate |
| **SQL Level** | Beginner — learned basic SELECT/WHERE in class |
| **Goal** | Understand complex queries in textbooks and assignments |
| **Pain Point** | Textbook queries have no explanation; can't run them without a database |
| **Device** | Laptop (Chrome), occasionally phone |
| **Behavior** | Copies queries from PDFs, pastes into tool, reads explanation |
| **Success Metric** | Can explain the query to a classmate after using SQLSense |

**Priya's Journey:**
1. Finds SQLSense via Google ("explain SQL query online")
2. Lands on homepage, sees "Understand SQL Instantly"
3. Pastes a JOIN query from her textbook
4. Reads the plain-English explanation — "Aha!" moment
5. Explores the clause breakdown to understand each part
6. Creates an account to save explanations for exam review
7. Returns before the exam to review saved queries

### 2.2 Persona: Alex — The Junior Developer

| Attribute | Detail |
|---|---|
| **Age** | 26 |
| **Role** | Junior backend developer at a startup |
| **SQL Level** | Intermediate — writes basic queries, struggles with complex existing ones |
| **Goal** | Quickly understand legacy SQL queries in the codebase |
| **Pain Point** | Inherited a codebase with complex SQL; no documentation |
| **Device** | Desktop (Firefox), dual monitor setup |
| **Behavior** | Copies queries from codebase, analyzes them, uses optimization tips |
| **Success Metric** | Understands legacy queries faster; writes more efficient SQL |

**Alex's Journey:**
1. Discovers SQLSense via a Reddit recommendation
2. Pastes a complex CTE query from the codebase
3. Reads the clause breakdown — identifies a redundant subquery
4. Checks optimization tips — sees suggestion for indexing
5. Signs up to save frequently-referenced queries
6. Uses SQLSense as a daily companion tool

### 2.3 Persona: Mei — The Interview Candidate

| Attribute | Detail |
|---|---|
| **Age** | 28 |
| **Role** | Software engineer preparing for job interviews |
| **SQL Level** | Intermediate — can write SQL but nervous about reading complex queries |
| **Goal** | Practice reading and explaining SQL queries quickly |
| **Pain Point** | Interview questions often show a query and ask "What does this do?" |
| **Device** | Laptop (Chrome) |
| **Behavior** | Uses example queries as practice problems; analyzes her own practice queries |
| **Success Metric** | Can explain any intermediate SQL query in under 60 seconds |

**Mei's Journey:**
1. Searches for "SQL interview practice explain queries"
2. Goes to Examples page, filters by Intermediate and Advanced
3. Tries to mentally explain each query before clicking "Try This Query"
4. Compares her explanation with SQLSense's analysis
5. Saves tricky queries to her history for repeated practice
6. Feels confident going into interviews

### 2.4 Persona: Sam — The Bootcamp Learner

| Attribute | Detail |
|---|---|
| **Age** | 32 |
| **Role** | Career changer in a 12-week coding bootcamp |
| **SQL Level** | Absolute beginner — just started the SQL module |
| **Goal** | Survive the SQL module; understand enough to pass projects |
| **Pain Point** | Limited time; SQL feels alien compared to Python/JavaScript |
| **Device** | Laptop (Chrome), sometimes tablet |
| **Behavior** | Uses beginner examples; reads explanations word by word |
| **Success Metric** | Passes the SQL project; understands SELECT, JOIN, GROUP BY |

---

## 3. Information Architecture

### 3.1 Site Map

```
SQLSense
├── / (Landing + Explainer)
│   ├── Hero Section
│   ├── SQL Input Editor
│   ├── Analysis Output (Tabs)
│   │   ├── Explanation
│   │   ├── Clause Breakdown
│   │   ├── Complexity Analysis
│   │   ├── Optimization Tips
│   │   └── Query Flow
│   ├── Feature Cards
│   └── CTA Section
├── /sign-in
├── /sign-up
├── /dashboard (Protected)
│   ├── Welcome Banner
│   ├── Stats Cards
│   ├── Quick Actions
│   └── Recent Saved Queries
├── /history (Protected)
│   ├── Search/Filter
│   ├── Saved Query Cards
│   └── Delete Confirmation Modal
├── /examples
│   ├── Difficulty Filter (All / Beginner / Intermediate / Advanced)
│   └── Example Cards
└── /about
    ├── What is SQLSense?
    ├── How It Works
    ├── Technology Stack
    └── About the Author
```

### 3.2 Navigation Structure

#### Primary Navigation (Header)

| Label | Route | Visibility |
|---|---|---|
| Home | `/` | Always |
| Examples | `/examples` | Always |
| About | `/about` | Always |
| Dashboard | `/dashboard` | Authenticated only |
| History | `/history` | Authenticated only |

#### Auth Navigation (Header Right)

| State | Elements |
|---|---|
| Guest | "Sign In" (ghost button), "Get Started" (primary button → `/sign-up`) |
| Authenticated | User avatar/initial with dropdown: Dashboard, History, Sign Out |

#### Footer Navigation

| Column | Links |
|---|---|
| Product | Home, Examples, About |
| Account | Dashboard, History, Sign In |
| Author | Prosun Banerjee, Email, "Built for Digital Heroes" button |

---

## 4. User Flows

### 4.1 Core Flow: Analyze a Query (Guest)

```
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Land   │────▶│ Paste SQL   │────▶│ Click        │────▶│ View         │
│  on /   │     │ in editor   │     │ "Analyze"    │     │ results      │
└─────────┘     └─────────────┘     └──────────────┘     └──────┬───────┘
                                                                 │
                                              ┌──────────────────┤
                                              ▼                  ▼
                                     ┌──────────────┐   ┌──────────────┐
                                     │ Browse tabs  │   │ Try to save  │
                                     │ (Explanation,│   │ → prompt to  │
                                     │ Clauses,     │   │ sign in      │
                                     │ Complexity,  │   └──────────────┘
                                     │ Optimize,    │
                                     │ Flow)        │
                                     └──────────────┘
```

**Steps:**
1. User lands on `/`
2. User sees the SQL input editor immediately (no scrolling required on desktop)
3. User pastes or types a SQL query
4. User clicks "Analyze Query ▶"
5. Loading skeleton appears in the output panel
6. Results appear in tabbed output: Explanation (default tab) → Clauses → Complexity → Optimization → Flow
7. If user clicks "Save" → prompt to sign in/sign up

### 4.2 Core Flow: Analyze and Save (Authenticated)

```
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Land   │────▶│ Paste SQL   │────▶│ Click        │────▶│ View         │
│  on /   │     │ in editor   │     │ "Analyze"    │     │ results      │
└─────────┘     └─────────────┘     └──────────────┘     └──────┬───────┘
                                                                 │
                                                                 ▼
                                                        ┌──────────────┐
                                                        │ Click "Save" │
                                                        │ → Toast:     │
                                                        │ "Query saved!"│
                                                        └──────────────┘
```

### 4.3 Auth Flow: Sign Up

```
┌───────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Click     │────▶│ Fill form:   │────▶│ Click        │────▶│ Redirect to  │
│ "Get      │     │ Email,       │     │ "Create      │     │ /dashboard   │
│ Started"  │     │ Password,    │     │  Account"    │     │ with toast   │
└───────────┘     │ Confirm      │     └──────────────┘     └──────────────┘
                  └──────────────┘
                        │
                        ▼ (on error)
                  ┌──────────────┐
                  │ Show error   │
                  │ below field  │
                  │ (red text)   │
                  └──────────────┘
```

### 4.4 Auth Flow: Sign In

```
┌───────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Click     │────▶│ Fill form:   │────▶│ Click        │────▶│ Redirect to  │
│ "Sign In" │     │ Email,       │     │ "Sign In"    │     │ /dashboard   │
└───────────┘     │ Password     │     └──────────────┘     └──────────────┘
                  └──────────────┘
```

### 4.5 History Flow: View and Delete

```
┌───────────┐     ┌──────────────┐     ┌──────────────┐
│ Navigate  │────▶│ Browse saved │────▶│ Click "View  │──── View full analysis
│ to /      │     │ queries      │     │ Full Analysis"│
│ history   │     └──────────────┘     └──────────────┘
                        │
                        ▼
                  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
                  │ Click        │────▶│ Confirm in   │────▶│ Query removed│
                  │ "Delete"     │     │ dialog       │     │ + toast      │
                  └──────────────┘     └──────────────┘     └──────────────┘
```

### 4.6 Example Flow: Try Example Query

```
┌───────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Navigate  │────▶│ Filter by    │────▶│ Click "Try   │────▶│ Redirect to /│
│ to /      │     │ difficulty   │     │ This Query"  │     │ with query   │
│ examples  │     └──────────────┘     └──────────────┘     │ pre-filled   │
└───────────┘                                                └──────────────┘
```

---

## 5. Interaction Patterns

### 5.1 SQL Input Editor

| Interaction | Behavior |
|---|---|
| Click into editor | Focus state with primary border glow |
| Paste SQL | Text appears in JetBrains Mono |
| Type SQL | Standard text input with monospace font |
| Clear button | Small "×" button in top-right corner to clear input |
| Character limit | Show remaining characters near limit (e.g., "2847 / 5000") |
| Empty submit | Shake animation on button; show error: "Please enter a SQL query" |
| Invalid SQL | Show error in output panel: "Could not parse this SQL. Please check the syntax." |

### 5.2 Analysis Output

| Interaction | Behavior |
|---|---|
| Tab switching | Smooth content crossfade transition (150ms) |
| Default tab | "Explanation" tab is selected by default |
| Tab keyboard nav | Arrow keys switch between tabs |
| Copy explanation | Copy button on each output section |
| Save query | "Save" button visible only for authenticated users |
| Save success | Toast: "Query saved to your history!" with check icon |
| Save failure | Toast: "Failed to save. Please try again." with error icon |

### 5.3 Form Interactions

| Interaction | Behavior |
|---|---|
| Empty submit | Highlight all empty required fields; show messages below each |
| Invalid email | "Please enter a valid email address" below email field |
| Short password | "Password must be at least 8 characters" below password field |
| Password mismatch | "Passwords do not match" below confirm password field |
| Server error | Generic error message above form: "Something went wrong. Please try again." |
| Submit loading | Button shows spinner, text changes to "Signing in..." / "Creating account..." |
| Success | Redirect to `/dashboard` with success toast |

### 5.4 Delete Confirmation

| Interaction | Behavior |
|---|---|
| Click delete | Confirmation dialog appears with modal overlay |
| Cancel | Dialog closes, no action taken |
| Confirm | Query deleted, dialog closes, card removed with slide-out animation, success toast |
| Error | Error toast: "Failed to delete. Please try again." |

---

## 6. Error Handling UX

### 6.1 Error Types and Responses

| Error Type | Display Method | Message Pattern | Recovery Action |
|---|---|---|---|
| SQL Parse Error | Inline in output panel | "Could not parse this SQL query. Check the syntax near line X." | User edits query |
| Empty Input | Inline below editor | "Please enter a SQL query to analyze." | User enters query |
| Auth Error | Inline below form | "Invalid email or password." | User corrects credentials |
| Network Error | Toast notification | "Connection error. Please check your internet." | Auto-retry + manual retry button |
| Server Error | Toast notification | "Something went wrong. Please try again." | Manual retry button |
| Rate Limit | Toast notification | "Too many requests. Please wait a moment." | Auto-retry after cooldown |
| Session Expired | Toast + redirect | "Your session has expired. Please sign in again." | Redirect to `/sign-in` |

### 6.2 Error Visual Treatment

- Error messages use `--color-error` (#EF4444) text color
- Error input borders use `--color-error`
- Error toasts have a red left border accent
- Error icons use the `AlertCircle` Lucide icon
- Shake animation (translateX ±4px, 3 cycles, 300ms) for validation errors

---

## 7. Loading States

### 7.1 Loading State Inventory

| Context | Loading State | Duration |
|---|---|---|
| Initial page load | Full-page skeleton | < 1s |
| SQL analysis | Skeleton in output panel | < 500ms |
| Auth form submit | Button spinner + text change | 1-3s |
| History page load | Card skeletons | < 1s |
| Dashboard data | Stats card skeletons | < 1s |
| Delete action | Button spinner | < 1s |

### 7.2 Skeleton Design

Skeletons use a pulsing gradient animation:

```css
@keyframes skeleton-pulse {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(30, 41, 59, 0.3) 0%,
    rgba(30, 41, 59, 0.5) 50%,
    rgba(30, 41, 59, 0.3) 100%
  );
  background-size: 200px 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}
```

---

## 8. Empty States

### 8.1 History — No Saved Queries

| Element | Content |
|---|---|
| Icon | `ClipboardList` (48px, `--color-muted`) |
| Heading | "No saved queries yet" |
| Description | "Start analyzing SQL queries and save them to build your learning history." |
| CTA | "Analyze Your First Query" → navigates to `/` |

### 8.2 Dashboard — New User

| Element | Content |
|---|---|
| Stats Cards | Show "0" for all metrics |
| Recent Queries | Show empty state: "No recent queries" |
| CTA | "Analyze Your First Query" → navigates to `/` |

### 8.3 Analysis Output — Before First Analysis

| Element | Content |
|---|---|
| Icon | `Code2` (48px, `--color-muted`) |
| Heading | "Paste a SQL query to get started" |
| Description | "Your analysis results will appear here." |

---

## 9. Accessibility (UX-Specific)

### 9.1 Keyboard Navigation

| Context | Key | Action |
|---|---|---|
| Global | `Tab` | Move focus to next interactive element |
| Global | `Shift+Tab` | Move focus to previous interactive element |
| Global | `Escape` | Close modal, dropdown, or mobile menu |
| SQL Editor | `Ctrl+Enter` | Submit query for analysis |
| Analysis Tabs | `←` / `→` | Switch between tabs |
| Analysis Tabs | `Home` / `End` | Jump to first/last tab |
| Delete Dialog | `Enter` | Confirm delete |
| Delete Dialog | `Escape` | Cancel delete |

### 9.2 Screen Reader Considerations

| Element | ARIA Treatment |
|---|---|
| SQL Editor | `role="textbox"`, `aria-label="SQL query input"`, `aria-describedby` for character count |
| Analysis Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` |
| Complexity Score | `aria-label="Complexity score 6 out of 10, moderate"` |
| Toast Notifications | `role="alert"`, `aria-live="polite"` |
| Loading States | `aria-busy="true"`, `aria-label="Loading..."` |
| Delete Dialog | `role="alertdialog"`, `aria-labelledby`, `aria-describedby` |

### 9.3 Focus Management

| Event | Focus Behavior |
|---|---|
| Page navigation | Focus moves to main content heading |
| Modal open | Focus moves to first focusable element in modal |
| Modal close | Focus returns to the element that triggered the modal |
| Toast appear | Announced to screen readers but does not steal focus |
| Error on submit | Focus moves to first field with an error |

---

## 10. Content Strategy

### 10.1 Tone of Voice in UI Copy

| Context | Tone | Example |
|---|---|---|
| Headings | Concise, active | "Understand SQL Instantly" |
| Descriptions | Helpful, clear | "Paste any SQL query and get a plain-English explanation" |
| Success messages | Positive, brief | "Query saved to your history!" |
| Error messages | Empathetic, actionable | "Could not parse this query. Please check the syntax." |
| Empty states | Encouraging, directive | "No saved queries yet. Start analyzing to build your history." |
| Buttons | Action-oriented, verb-first | "Analyze Query", "Save", "Delete", "Try This Query" |

### 10.2 Microcopy Standards

| Element | Rule | Example |
|---|---|---|
| Button labels | Use verbs; max 3 words | "Analyze Query", "Create Account" |
| Input labels | Use nouns; sentence case | "Email address", "Password" |
| Placeholder text | Provide example format | "e.g., SELECT * FROM users WHERE..." |
| Help text | Explain constraints | "Must be at least 8 characters" |
| Timestamps | Use relative when < 24h | "2 hours ago", "June 21, 2026" |
| Error messages | State what happened + what to do | "Invalid email. Please enter a valid email address." |

---

## 11. Performance UX

### 11.1 Perceived Performance Targets

| Action | Perceived Time | Strategy |
|---|---|---|
| Page load | Instant | SSR for initial HTML; above-the-fold content renders in < 1s |
| SQL analysis | Instant | Client-side parsing; no network request for core analysis |
| Save query | < 1s | Optimistic UI; show success immediately, sync in background |
| History load | < 500ms | Supabase query with user index |
| Page navigation | Instant | Next.js client-side navigation with prefetching |

### 11.2 Progressive Loading Strategy

1. **Critical Path:** HTML + CSS + fonts load first. The hero and SQL input are visible immediately.
2. **Non-Critical Path:** Analysis tabs, feature cards, and footer load after initial paint.
3. **Lazy Loading:** Images, charts, and the query flow diagram load on demand.
4. **Prefetching:** Next.js prefetches linked pages on hover for instant navigation.

---

## 12. Mobile-Specific UX Considerations

### 12.1 Touch Interactions

| Interaction | Desktop | Mobile |
|---|---|---|
| SQL input | Click to focus | Tap to focus; keyboard appears |
| Tab switching | Click tabs | Swipe between tabs or tap |
| History browsing | Scroll through cards | Scroll through full-width cards |
| Delete action | Click delete icon | Swipe left to reveal delete (future) |
| Copy text | Click copy button | Long-press to copy or tap copy button |

### 12.2 Mobile Layout Adjustments

| Element | Desktop | Mobile |
|---|---|---|
| SQL Input/Output | Side by side | Stacked vertically |
| Feature cards | 3 columns | 1 column |
| Hero heading | 48px | 32px |
| Navigation | Inline links | Hamburger menu |
| Stats cards | 3 columns | Horizontal scroll or 1 column |

---

## 13. Future UX Enhancements

| Feature | UX Impact | Priority |
|---|---|---|
| Real-time analysis | Remove "Analyze" button; analyze as user types (debounced 500ms) | High |
| Syntax highlighting | Color SQL keywords, strings, numbers in the editor | High |
| Query history search | Full-text search across saved queries | Medium |
| Keyboard shortcuts | `Ctrl+K` command palette for power users | Medium |
| Onboarding tour | Guided tour for first-time users highlighting key features | Low |
| Dark/Light toggle | Theme toggle in header | Low |
| Collaborative sharing | Unique URL for each saved explanation | Medium |

---

*This UI/UX Brief ensures that every interaction in SQLSense is intentional, user-centered, and optimized for the learning experience. It should be referenced alongside the Design Brief and Design Plan during all development phases.*
