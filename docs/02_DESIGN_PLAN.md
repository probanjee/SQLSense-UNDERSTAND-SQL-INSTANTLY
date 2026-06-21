# SQLSense — Design Plan

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This Design Plan translates the Design Brief into actionable page-by-page layout specifications, component inventories, and responsive behavior definitions. It is the bridge between visual direction and engineering implementation — every developer working on SQLSense should reference this document when building pages and components.

**Related Documents:**
- [01_DESIGN_BRIEF.md](./01_DESIGN_BRIEF.md)
- [03_UI_UX_BRIEF.md](./03_UI_UX_BRIEF.md)
- [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md)
- [10_APP_FLOW.md](./10_APP_FLOW.md)

---

## 1. Global Layout Structure

### 1.1 Page Shell

Every page in SQLSense follows a consistent shell structure:

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (sticky, glassmorphic, 64px height)              │
│  ┌──────────────────────────────────────────────────────┐│
│  │ Logo    Nav Links              Auth Actions          ││
│  └──────────────────────────────────────────────────────┘│
├──────────────────────────────────────────────────────────┤
│                                                          │
│  MAIN CONTENT                                            │
│  (min-height: calc(100vh - 64px - footer))               │
│  (max-width: 1280px, centered)                           │
│                                                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  FOOTER                                                  │
│  (Author info, CTA button, copyright)                    │
└──────────────────────────────────────────────────────────┘
```

### 1.2 Header Specification

| Property | Value |
|---|---|
| Height | 64px |
| Position | Sticky, top: 0 |
| Z-index | `--z-sticky` (20) |
| Background | `rgba(5, 8, 22, 0.8)` with `backdrop-filter: blur(12px)` |
| Border-bottom | `1px solid rgba(30, 41, 59, 0.5)` |
| Max content width | 1280px, centered |
| Padding | 0 24px (mobile), 0 48px (desktop) |

#### Header Content — Desktop (≥ 1024px)

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]  [Home] [Examples] [About]     [Sign In] [CTA] │
└─────────────────────────────────────────────────────────┘
```

- **Logo:** "SQLSense" text in Inter Bold, 20px, `--color-text`, with a small icon (e.g., `<Database />` from Lucide) in `--color-primary`.
- **Nav Links:** Inter Medium 14px, `--color-muted`, hover → `--color-text`.
- **Auth Actions (Guest):** "Sign In" as ghost button, "Get Started" as primary button.
- **Auth Actions (Authenticated):** "Dashboard" link, "History" link, User avatar/initial with dropdown.

#### Header Content — Mobile (< 1024px)

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                                   [Menu Button] │
└─────────────────────────────────────────────────────────┘
```

Mobile menu opens as a full-screen overlay with slide-in animation from right:

```
┌─────────────────────────────────────────────────────────┐
│                                            [Close (X)]  │
│                                                         │
│    Home                                                 │
│    Examples                                             │
│    About                                                │
│    ─────────                                            │
│    Sign In                                              │
│    Get Started                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 1.3 Footer Specification

| Property | Value |
|---|---|
| Background | `--color-surface` |
| Border-top | `1px solid --color-border` |
| Padding | 48px 24px (mobile), 64px 48px (desktop) |
| Max content width | 1280px, centered |

#### Footer Layout — Desktop

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  SQLSense                      Pages         Legal      │
│  Understand SQL Instantly      Home           Privacy   │
│                                Examples       Terms     │
│  Prosun Banerjee               About                    │
│  prosunbanerjee8@gmail.com     Dashboard                │
│                                                         │
│  ───────────────────────────────────────────────────    │
│                                                         │
│  © 2026 SQLSense              [ Built for Digital Heroes ]  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Page-by-Page Design Plan

### 2.1 Landing Page (`/`)

The landing page is the most important page. It must immediately communicate what SQLSense does, look stunning, and get the user to paste a SQL query.

#### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  [Header]                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ░░░░░░░ HERO GLOW EFFECT (background) ░░░░░░░        │
│                                                         │
│          Understand SQL Instantly                       │
│    Paste any SQL query and get a plain-English           │
│    explanation, clause breakdown, complexity analysis,   │
│    and optimization suggestions.                         │
│                                                         │
│    [ Try It Now ]   [ View Examples ]                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────────────┐ ┌────────────────────────┐  │
│  │                        │ │                        │  │
│  │  SQL INPUT EDITOR      │ │  ANALYSIS OUTPUT       │  │
│  │  (monospace textarea)  │ │  (tabbed results)      │  │
│  │                        │ │                        │  │
│  │  [Analyze Query ▶]     │ │  [Explanation]         │  │
│  │                        │ │  [Clauses]             │  │
│  │                        │ │  [Complexity]          │  │
│  │                        │ │  [Optimization]        │  │
│  │                        │ │  [Flow]                │  │
│  └────────────────────────┘ └────────────────────────┘  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  FEATURE CARDS (3-column grid)                          │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ 📝       │ │ 🔍       │ │ ⚡       │               │
│  │ Explain  │ │ Analyze  │ │ Optimize │               │
│  │ ...desc  │ │ ...desc  │ │ ...desc  │               │
│  └──────────┘ └──────────┘ └──────────┘               │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ 🔒       │ │ 📊       │ │ 💾       │               │
│  │ Secure   │ │ Visual   │ │ Save     │               │
│  │ ...desc  │ │ ...desc  │ │ ...desc  │               │
│  └──────────┘ └──────────┘ └──────────┘               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CTA SECTION                                            │
│  Ready to understand SQL?                               │
│  [ Get Started Free ]                                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Footer]                                               │
└─────────────────────────────────────────────────────────┘
```

#### Hero Section Details

| Element | Specification |
|---|---|
| Heading | "Understand SQL Instantly" — `--text-hero`, `--gradient-text`, centered |
| Subheading | Description text — `--text-body`, `--color-muted`, max-width 600px, centered |
| Primary CTA | "Try It Now" — Primary button, scrolls to SQL input section |
| Secondary CTA | "View Examples" — Secondary button, links to `/examples` |
| Background | Radial gradient glow (purple/indigo) with pulse animation |
| Spacing | 80px top padding, 64px bottom padding |

#### SQL Input Section Details

| Element | Specification |
|---|---|
| Layout | Two-column on desktop (50/50), stacked on mobile |
| Left Panel | SQL input textarea with JetBrains Mono font, line numbers, syntax-aware |
| Right Panel | Analysis output with tabs: Explanation, Clauses, Complexity, Optimization, Flow |
| Analyze Button | Primary button below input: "Analyze Query ▶" |
| Empty State | Right panel shows subtle message: "Paste a query and click Analyze" |
| Loading State | Skeleton loading animation in output panel |
| Save Button | Appears in output panel for authenticated users only |

#### Feature Cards Section

Six feature cards in a 3×2 grid (desktop), 2×3 (tablet), 1×6 (mobile):

| Card | Icon | Title | Description |
|---|---|---|---|
| 1 | `FileText` | Plain English | Get human-readable explanations of any SQL query |
| 2 | `Search` | Clause Breakdown | Every clause explained individually with context |
| 3 | `Zap` | Optimization Tips | Actionable suggestions to improve query performance |
| 4 | `Shield` | Secure by Design | Your SQL is never executed — only parsed and analyzed |
| 5 | `BarChart3` | Complexity Analysis | Understand the complexity level of any query |
| 6 | `Save` | Save & Review | Save explanations and build your learning history |

Each card uses the glassmorphic card style with hover animation (translateY -2px, border glow).

---

### 2.2 Sign In Page (`/sign-in`)

```
┌─────────────────────────────────────────────────────────┐
│  [Header]                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              ┌──────────────────────────┐               │
│              │                          │               │
│              │    Welcome Back          │               │
│              │    Sign in to SQLSense   │               │
│              │                          │               │
│              │    Email                 │               │
│              │    [_________________]   │               │
│              │                          │               │
│              │    Password              │               │
│              │    [_________________]   │               │
│              │                          │               │
│              │    [ Sign In        ]    │               │
│              │                          │               │
│              │    ──── or ────          │               │
│              │                          │               │
│              │    [ Google ] (future)   │               │
│              │    [ GitHub ] (future)   │               │
│              │                          │               │
│              │    Don't have an account?│               │
│              │    Sign Up               │               │
│              │                          │               │
│              └──────────────────────────┘               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Footer]                                               │
└─────────────────────────────────────────────────────────┘
```

| Element | Specification |
|---|---|
| Card | Glassmorphic, max-width 420px, centered vertically and horizontally |
| Title | "Welcome Back" — `--text-h2`, `--color-text` |
| Subtitle | "Sign in to SQLSense" — `--text-body-sm`, `--color-muted` |
| Inputs | Standard input style per Design Brief; email + password |
| Submit | Primary button, full-width within card |
| OAuth (future) | Google and GitHub buttons, grayed out with "Coming Soon" tooltip |
| Link | "Don't have an account? Sign Up" — links to `/sign-up` |
| Validation | Real-time Zod validation; error messages below inputs in `--color-error` |
| Loading | Button shows spinner during auth request |

---

### 2.3 Sign Up Page (`/sign-up`)

Identical layout to Sign In with the following differences:

| Difference | Sign In | Sign Up |
|---|---|---|
| Title | "Welcome Back" | "Create Account" |
| Subtitle | "Sign in to SQLSense" | "Start understanding SQL today" |
| Fields | Email, Password | Email, Password, Confirm Password |
| Submit | "Sign In" | "Create Account" |
| Link | "Don't have an account? Sign Up" | "Already have an account? Sign In" |

---

### 2.4 Dashboard Page (`/dashboard`)

**Access:** Protected — requires authentication.

```
┌─────────────────────────────────────────────────────────┐
│  [Header — with authenticated nav]                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome back, [User Name / Email]                      │
│                                                         │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐             │
│  │ 📊        │ │ 💾        │ │ ⚡        │             │
│  │ Queries   │ │ Saved     │ │ Most      │             │
│  │ Analyzed  │ │ Queries   │ │ Complex   │             │
│  │   47      │ │   12      │ │   8/10    │             │
│  └───────────┘ └───────────┘ └───────────┘             │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Quick Actions                                    │   │
│  │                                                   │   │
│  │  [ Analyze New Query ]  [ View History ]          │   │
│  │  [ Browse Examples ]    [ View About ]            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Recent Saved Queries                             │   │
│  │                                                   │   │
│  │  ┌──────────────────────────────────────────┐     │   │
│  │  │  SELECT u.name, COUNT(o.id)...           │     │   │
│  │  │  Complexity: 6/10  •  Saved 2h ago       │     │   │
│  │  └──────────────────────────────────────────┘     │   │
│  │                                                   │   │
│  │  ┌──────────────────────────────────────────┐     │   │
│  │  │  SELECT * FROM products WHERE...          │     │   │
│  │  │  Complexity: 3/10  •  Saved 1d ago       │     │   │
│  │  └──────────────────────────────────────────┘     │   │
│  │                                                   │   │
│  │  [ View All History → ]                           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Footer]                                               │
└─────────────────────────────────────────────────────────┘
```

#### Dashboard Components

| Component | Description |
|---|---|
| **Welcome Banner** | Greeting with user's display name or email |
| **Stats Cards** | 3-column grid showing key metrics (queries analyzed, saved, highest complexity) |
| **Quick Actions** | 2×2 button grid for common actions |
| **Recent Saved** | Last 3 saved queries with truncated SQL, complexity badge, and timestamp |
| **View All Link** | Links to `/history` |

---

### 2.5 History Page (`/history`)

**Access:** Protected — requires authentication.

```
┌─────────────────────────────────────────────────────────┐
│  [Header]                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Saved Queries                        [Search input]    │
│  Your learning history                                  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  SELECT u.name, u.email, COUNT(o.id) AS order... │   │
│  │                                                   │   │
│  │  📝 Explanation: This query retrieves user names  │   │
│  │  and email addresses along with their total...    │   │
│  │                                                   │   │
│  │  Complexity: ██████░░░░ 6/10 — Moderate           │   │
│  │  Saved: June 21, 2026 at 2:30 PM                 │   │
│  │                                                   │   │
│  │  [ View Full Analysis ]    [ 🗑️ Delete ]          │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  SELECT * FROM products WHERE price > 100 AND... │   │
│  │  ...                                              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  Empty State (when no saved queries):                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │           📋                                      │   │
│  │    No saved queries yet                           │   │
│  │    Start analyzing SQL queries and save them      │   │
│  │    to build your learning history.                │   │
│  │    [ Analyze Your First Query ]                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Footer]                                               │
└─────────────────────────────────────────────────────────┘
```

#### History Card Components

| Element | Description |
|---|---|
| SQL Preview | First 2 lines of the query in JetBrains Mono, truncated |
| Explanation Preview | First 2 lines of the plain-English explanation |
| Complexity Badge | Visual bar + numeric score + classification label |
| Timestamp | Relative time ("2h ago") or absolute date |
| View Button | Opens full analysis in a modal or expanded view |
| Delete Button | Destructive ghost button with confirmation dialog |

#### Delete Confirmation Dialog

```
┌─────────────────────────────────────────┐
│                                         │
│  Delete Saved Query?                    │
│                                         │
│  This action cannot be undone. The      │
│  saved query and its explanation will   │
│  be permanently removed.               │
│                                         │
│  [ Cancel ]       [ Delete Query ]      │
│                                         │
└─────────────────────────────────────────┘
```

---

### 2.6 Examples Page (`/examples`)

**Access:** Public

```
┌─────────────────────────────────────────────────────────┐
│  [Header]                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Example Queries                                        │
│  Learn from curated SQL examples                        │
│                                                         │
│  [ All ] [ Beginner ] [ Intermediate ] [ Advanced ]     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  🟢 Beginner                                      │   │
│  │  Basic SELECT with WHERE                          │   │
│  │                                                   │   │
│  │  SELECT name, email                               │   │
│  │  FROM users                                       │   │
│  │  WHERE active = true;                             │   │
│  │                                                   │   │
│  │  [ Try This Query ]                               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  🟡 Intermediate                                  │   │
│  │  JOIN with GROUP BY                               │   │
│  │  ...                                              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  🔴 Advanced                                      │   │
│  │  Window Functions with CTE                        │   │
│  │  ...                                              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Footer]                                               │
└─────────────────────────────────────────────────────────┘
```

#### Difficulty Level Indicators

| Level | Color | Icon | Badge |
|---|---|---|---|
| Beginner | `--color-success` (#10B981) | 🟢 | Green pill badge |
| Intermediate | `--color-warning` (#F59E0B) | 🟡 | Yellow pill badge |
| Advanced | `--color-error` (#EF4444) | 🔴 | Red pill badge |

#### "Try This Query" Behavior

Clicking "Try This Query" navigates to `/` with the example query pre-filled in the SQL input editor, ready for analysis.

---

### 2.7 About Page (`/about`)

**Access:** Public

```
┌─────────────────────────────────────────────────────────┐
│  [Header]                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  About SQLSense                                         │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  What is SQLSense?                                │   │
│  │                                                   │   │
│  │  SQLSense is a free developer education tool...   │   │
│  │  [detailed description of the project]            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  How It Works                                     │   │
│  │                                                   │   │
│  │  1. Paste your SQL query                          │   │
│  │  2. Click "Analyze Query"                         │   │
│  │  3. Get instant results                           │   │
│  │                                                   │   │
│  │  [visual step diagram]                            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Technology Stack                                 │   │
│  │                                                   │   │
│  │  [Grid of tech logos/badges]                      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  About the Author                                 │   │
│  │                                                   │   │
│  │  Prosun Banerjee                                  │   │
│  │  prosunbanerjee8@gmail.com                        │   │
│  │                                                   │   │
│  │  [GitHub link] [Email link]                       │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Footer]                                               │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Responsive Behavior Matrix

### 3.1 Breakpoint-Specific Layouts

| Component | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---|---|---|---|
| Header nav | Hamburger menu | Hamburger menu | Inline links |
| Hero heading | 32px / 2rem | 40px / 2.5rem | 48px / 3rem |
| SQL Input/Output | Stacked (column) | Stacked (column) | Side-by-side (row) |
| Feature cards | 1 column | 2 columns | 3 columns |
| Dashboard stats | 1 column, horizontal scroll | 3 columns | 3 columns |
| History cards | Full width | Full width | Max-width 800px, centered |
| Example cards | 1 column | 2 columns | 2 columns |
| Footer | Single column, stacked | 2 columns | 3 columns |

### 3.2 Touch Target Sizes

All interactive elements must have minimum touch targets on mobile:

| Element | Minimum Size |
|---|---|
| Buttons | 44px × 44px |
| Links | 44px touch area (padding if needed) |
| Menu items | 48px height |
| Input fields | 48px height |

---

## 4. Component Inventory

### 4.1 Layout Components

| Component | Used On | Description |
|---|---|---|
| `Header` | All pages | Sticky navigation bar |
| `Footer` | All pages | Author info, links, CTA |
| `PageContainer` | All pages | Max-width wrapper with padding |
| `MobileMenu` | All pages (mobile) | Slide-in navigation overlay |

### 4.2 Form Components

| Component | Used On | Description |
|---|---|---|
| `Input` | Sign In, Sign Up | Text input with label and validation |
| `PasswordInput` | Sign In, Sign Up | Password input with show/hide toggle |
| `SQLEditor` | Landing | Monospace textarea for SQL input |
| `SearchInput` | History | Search/filter input |

### 4.3 Display Components

| Component | Used On | Description |
|---|---|---|
| `FeatureCard` | Landing | Feature description card with icon |
| `StatsCard` | Dashboard | Metric display card |
| `HistoryCard` | History, Dashboard | Saved query preview card |
| `ExampleCard` | Examples | Example query card with difficulty badge |
| `ComplexityBadge` | Multiple | Visual complexity score indicator |
| `DifficultyBadge` | Examples | Beginner/Intermediate/Advanced pill |
| `EmptyState` | History, Dashboard | Empty state illustration and CTA |

### 4.4 Analysis Components

| Component | Used On | Description |
|---|---|---|
| `AnalysisTabs` | Landing | Tabbed output container |
| `ExplanationTab` | Landing | Plain-English explanation output |
| `ClauseBreakdown` | Landing | Individual clause explanations |
| `ComplexityAnalysis` | Landing | Score visualization and breakdown |
| `OptimizationTips` | Landing | List of optimization suggestions |
| `QueryFlowDiagram` | Landing | Visual execution order diagram |

### 4.5 Auth Components

| Component | Used On | Description |
|---|---|---|
| `SignInForm` | Sign In | Email/password sign-in form |
| `SignUpForm` | Sign Up | Email/password registration form |
| `AuthGuard` | Dashboard, History | Route protection wrapper |
| `UserMenu` | Header | Authenticated user dropdown |

### 4.6 Feedback Components

| Component | Used On | Description |
|---|---|---|
| `Toast` | Global | Success/error notifications |
| `ConfirmDialog` | History | Delete confirmation modal |
| `LoadingSkeleton` | Multiple | Loading state placeholder |
| `Spinner` | Multiple | Inline loading indicator |

---

## 5. Animation Choreography

### 5.1 Landing Page Load Sequence

| Step | Element | Animation | Delay |
|---|---|---|---|
| 1 | Background glow | Fade in | 0ms |
| 2 | Hero heading | Fade up | 100ms |
| 3 | Hero subheading | Fade up | 200ms |
| 4 | CTA buttons | Fade up | 300ms |
| 5 | SQL input panel | Fade up | 400ms |
| 6 | Feature cards | Staggered fade up | 100ms between each |

### 5.2 Analysis Output Sequence

| Step | Element | Animation | Delay |
|---|---|---|---|
| 1 | Loading skeleton | Appear instantly | 0ms |
| 2 | Tab content | Fade in, replace skeleton | When ready |
| 3 | Explanation text | Type-writer-style reveal | 0ms |
| 4 | Clause items | Staggered fade in | 50ms between each |
| 5 | Complexity bar | Width animation 0→score | 200ms |
| 6 | Optimization items | Staggered fade in | 50ms between each |

### 5.3 Page Transition Sequence

All page transitions use a simple fade-up:

| Property | Value |
|---|---|
| Duration | 300ms |
| Easing | ease-out |
| Transform | translateY(10px) → translateY(0) |
| Opacity | 0 → 1 |

---

## 6. Dark Theme Details

SQLSense is dark-first. The entire design is optimized for dark backgrounds.

### 6.1 Surface Hierarchy

| Layer | Background | Usage |
|---|---|---|
| **Base** | `#050816` | Page background |
| **Surface 1** | `#0A0F1E` | Cards, panels |
| **Surface 2** | `#111827` | Hover states, nested elements |
| **Surface 3** | `#1E293B` | Active states, selected items |

### 6.2 Text on Dark Backgrounds

| Text Role | Color | Opacity |
|---|---|---|
| Primary text | `#F8FAFC` | 100% |
| Secondary text | `#94A3B8` | 100% |
| Disabled text | `#94A3B8` | 50% |
| Placeholder text | `#94A3B8` | 60% |

---

## 7. Implementation Priorities

### Phase 1: Foundation
1. Global CSS with all design tokens
2. Tailwind configuration
3. Font loading
4. Header component
5. Footer component
6. PageContainer component

### Phase 2: Landing Page
1. Hero section with glow effect
2. SQL input editor
3. Analysis output tabs
4. Feature cards grid
5. Bottom CTA section

### Phase 3: Auth Pages
1. Auth card layout
2. SignInForm
3. SignUpForm
4. Form validation states

### Phase 4: Protected Pages
1. Dashboard layout
2. Stats cards
3. History page layout
4. History cards
5. Delete confirmation dialog
6. Empty states

### Phase 5: Content Pages
1. Examples page
2. Example cards with difficulty badges
3. About page
4. "Try This Query" flow

### Phase 6: Polish
1. Animation choreography
2. Loading skeletons
3. Toast notifications
4. Mobile responsiveness audit
5. Accessibility audit

---

## 8. Future Design Considerations

| Feature | Design Impact |
|---|---|
| Light theme toggle | New surface hierarchy, text colors, and shadow values |
| Syntax highlighting | Integrate a code highlighter (e.g., Prism.js) into the SQL editor |
| Real-time analysis | Remove the "Analyze" button; analyze as user types (debounced) |
| Query diffing | Side-by-side diff view with highlighted differences |
| Sharing | Share modal with copy-to-clipboard URL |

---

*This Design Plan translates the visual direction from the Design Brief into concrete page layouts and component specifications. All UI development should follow these layouts as the primary reference.*
