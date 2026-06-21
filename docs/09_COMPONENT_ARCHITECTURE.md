# SQLSense — Component Architecture

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document defines the React component architecture for SQLSense, including the component hierarchy, props interfaces, state management patterns, and data flow between components. It serves as the blueprint for building the frontend application.

**Related Documents:**
- [02_DESIGN_PLAN.md](./02_DESIGN_PLAN.md)
- [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md)
- [11_APP_LOGIC_SYSTEM.md](./11_APP_LOGIC_SYSTEM.md)

---

## 1. Component Hierarchy

```
RootLayout
├── Header
│   ├── Logo
│   ├── NavLinks
│   ├── AuthButtons (guest)
│   ├── UserMenu (authenticated)
│   └── MobileMenuButton
│       └── MobileMenu
│           ├── NavLinks
│           └── AuthButtons / UserMenu
│
├── Page: Landing (/)
│   ├── HeroSection
│   │   ├── HeroGlow (background effect)
│   │   ├── HeroHeading
│   │   ├── HeroSubheading
│   │   └── HeroCTAs
│   ├── SQLAnalyzer
│   │   ├── SQLEditor
│   │   │   ├── EditorToolbar (clear, char count)
│   │   │   └── MonospaceTextarea
│   │   ├── AnalyzeButton
│   │   └── AnalysisOutput
│   │       ├── AnalysisTabs
│   │       │   ├── ExplanationTab
│   │       │   ├── ClauseBreakdownTab
│   │       │   ├── ComplexityTab
│   │       │   │   └── ComplexityBar
│   │       │   ├── OptimizationTab
│   │       │   │   └── OptimizationTipCard
│   │       │   └── FlowTab
│   │       │       └── QueryFlowDiagram
│   │       ├── SaveButton (authenticated only)
│   │       ├── CopyButton
│   │       ├── LoadingSkeleton
│   │       └── EmptyState
│   ├── FeaturesSection
│   │   └── FeatureCard (×6)
│   └── CTASection
│
├── Page: Sign In (/sign-in)
│   └── AuthCard
│       └── SignInForm
│           ├── Input (email)
│           ├── PasswordInput
│           ├── SubmitButton
│           └── AuthLink
│
├── Page: Sign Up (/sign-up)
│   └── AuthCard
│       └── SignUpForm
│           ├── Input (email)
│           ├── PasswordInput (×2)
│           ├── SubmitButton
│           └── AuthLink
│
├── Page: Dashboard (/dashboard)
│   ├── AuthGuard
│   ├── WelcomeBanner
│   ├── StatsGrid
│   │   └── StatsCard (×3)
│   ├── QuickActions
│   │   └── QuickActionButton (×4)
│   └── RecentQueries
│       ├── HistoryCardCompact (×3)
│       └── ViewAllLink
│
├── Page: History (/history)
│   ├── AuthGuard
│   ├── PageHeader
│   ├── HistoryList
│   │   ├── HistoryCard (×N)
│   │   │   ├── SQLPreview
│   │   │   ├── ExplanationPreview
│   │   │   ├── ComplexityBadge
│   │   │   ├── Timestamp
│   │   │   ├── ViewButton
│   │   │   └── DeleteButton
│   │   └── EmptyState
│   └── ConfirmDialog
│
├── Page: Examples (/examples)
│   ├── PageHeader
│   ├── DifficultyFilter
│   │   └── FilterButton (×4: All, Beginner, Intermediate, Advanced)
│   └── ExamplesGrid
│       └── ExampleCard (×N)
│           ├── DifficultyBadge
│           ├── ExampleTitle
│           ├── SQLPreview
│           └── TryButton
│
├── Page: About (/about)
│   ├── AboutSection
│   ├── HowItWorks
│   │   └── StepCard (×3)
│   ├── TechStack
│   │   └── TechBadge (×N)
│   └── AuthorSection
│
├── Footer
│   ├── FooterBrand
│   ├── FooterLinks
│   ├── FooterAuthor
│   ├── FooterCTA ("Built for Digital Heroes")
│   └── FooterCopyright
│
└── Global Providers
    ├── ToastProvider
    │   └── Toast
    └── ThemeProvider (future)
```

---

## 2. Component Specifications

### 2.1 Layout Components

#### Header

```typescript
interface HeaderProps {
  // No props — reads auth state from Zustand store
}

// State Dependencies:
// - authStore.user (User | null)
// - authStore.isAuthenticated (boolean)
// - Internal: isMenuOpen (local state)

// Behavior:
// - Sticky at top, glassmorphic background
// - Shows guest or authenticated navigation
// - Responsive: inline links on desktop, hamburger on mobile
```

#### Footer

```typescript
interface FooterProps {
  // No props — content is static
}

// Required Content:
// - "Prosun Banerjee"
// - "prosunbanerjee8@gmail.com"
// - Button: "Built for Digital Heroes" → external link
// - "© 2026 SQLSense. All rights reserved."
```

#### AuthGuard

```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string; // defaults to '/sign-in'
}

// Behavior:
// - Reads auth state from Zustand store
// - If not authenticated: redirect to fallbackUrl
// - If authenticated: render children
// - Shows loading skeleton during auth check
```

#### PageContainer

```typescript
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'; // default: 'xl'
}

// Behavior:
// - Centers content with max-width
// - Applies horizontal padding
// - Adds page-enter animation
```

---

### 2.2 SQL Analysis Components

#### SQLEditor

```typescript
interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  maxLength?: number; // default: 5000
  placeholder?: string;
  disabled?: boolean;
}

// Internal state:
// - isFocused (boolean)
// - charCount (derived from value.length)

// Behavior:
// - Monospace textarea (JetBrains Mono)
// - Character count display
// - Clear button (resets value via onChange(''))
// - Ctrl+Enter triggers onSubmit
// - Focus/blur visual feedback
```

#### AnalysisOutput

```typescript
interface AnalysisOutputProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  onSave?: () => void; // only provided for authenticated users
  isSaving?: boolean;
}

interface AnalysisResult {
  explanation: string;
  clauses: ClauseBreakdown[];
  complexity: ComplexityResult;
  optimizationTips: OptimizationTip[];
  flow: QueryFlowStep[];
}

interface ClauseBreakdown {
  type: string; // 'SELECT' | 'FROM' | 'WHERE' | 'JOIN' | etc.
  sql: string;  // The actual SQL for this clause
  explanation: string;
}

interface ComplexityResult {
  score: number; // 1-10
  label: 'Simple' | 'Moderate' | 'Complex' | 'Expert';
  factors: string[]; // What contributed to the score
}

interface OptimizationTip {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

interface QueryFlowStep {
  order: number;
  operation: string;
  description: string;
}
```

#### ComplexityBar

```typescript
interface ComplexityBarProps {
  score: number; // 1-10
  label: string;
  animated?: boolean; // default: true
}

// Behavior:
// - Visual progress bar from 0 to score
// - Color changes based on score range
// - Width animates on mount if animated=true
```

---

### 2.3 Authentication Components

#### SignInForm

```typescript
interface SignInFormProps {
  // No props — handles its own state and submission
}

// Internal state:
// - email (string)
// - password (string)
// - errors (Record<string, string>)
// - isSubmitting (boolean)

// Validation schema (Zod):
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Submission:
// 1. Validate with Zod
// 2. Call supabase.auth.signInWithPassword()
// 3. On success: redirect to /dashboard
// 4. On error: display error message
```

#### SignUpForm

```typescript
interface SignUpFormProps {
  // No props — handles its own state and submission
}

// Internal state:
// - email (string)
// - password (string)
// - confirmPassword (string)
// - errors (Record<string, string>)
// - isSubmitting (boolean)

// Validation schema (Zod):
const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
```

---

### 2.4 History Components

#### HistoryCard

```typescript
interface HistoryCardProps {
  query: SavedQuery;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

interface SavedQuery {
  id: string;
  userId: string;
  queryText: string;
  explanation: string;
  complexity: number;
  optimizationTips: string | null;
  createdAt: string;
}

// Display:
// - Truncated SQL (first 2 lines in monospace)
// - Truncated explanation (first 2 lines)
// - ComplexityBadge component
// - Relative timestamp
// - "View Full Analysis" button
// - "Delete" button (destructive)
```

#### ConfirmDialog

```typescript
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string; // default: 'Confirm'
  cancelLabel?: string;  // default: 'Cancel'
  variant?: 'default' | 'destructive'; // default: 'default'
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}
```

---

### 2.5 Example Components

#### ExampleCard

```typescript
interface ExampleCardProps {
  example: SQLExample;
  onTry: (query: string) => void;
}

interface SQLExample {
  id: string;
  title: string;
  query: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}
```

#### DifficultyFilter

```typescript
interface DifficultyFilterProps {
  activeFilter: DifficultyLevel;
  onChange: (filter: DifficultyLevel) => void;
}

type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';
```

---

### 2.6 Common Components

#### Toast (via shadcn/ui)

```typescript
// Using shadcn/ui's toast system
// Custom wrapper for consistent usage:

function showToast(options: {
  title: string;
  description?: string;
  variant: 'default' | 'success' | 'error';
}): void;
```

#### LoadingSkeleton

```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle';
  width?: string;
  height?: string;
  lines?: number; // for text variant
}
```

#### EmptyState

```typescript
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}
```

---

## 3. State Management Architecture

### 3.1 Zustand Store Structure

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

// stores/queryStore.ts
interface QueryState {
  // Input
  sqlInput: string;
  
  // Analysis
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  analysisError: string | null;
  
  // Save
  isSaving: boolean;
  
  // Actions
  setSqlInput: (sql: string) => void;
  analyzeQuery: () => Promise<void>;
  saveQuery: () => Promise<void>;
  clearAnalysis: () => void;
  loadFromExample: (query: string) => void;
}

// stores/historyStore.ts
interface HistoryState {
  queries: SavedQuery[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchQueries: () => Promise<void>;
  deleteQuery: (id: string) => Promise<void>;
  getRecentQueries: (count: number) => SavedQuery[];
  getStats: () => QueryStats;
}

interface QueryStats {
  totalSaved: number;
  highestComplexity: number;
  averageComplexity: number;
}
```

### 3.2 State Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    ZUSTAND STORES                         │
│                                                          │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   authStore      │  │ queryStore   │  │historyStore│  │
│  │                  │  │              │  │            │  │
│  │ user ───────────────▶ saveQuery() ─────▶ queries   │  │
│  │ isAuthenticated ─┤  │              │  │            │  │
│  │                  │  │ sqlInput     │  │            │  │
│  │                  │  │ analysisResult│  │            │  │
│  └────────┬─────────┘  └──────┬───────┘  └─────┬──────┘  │
│           │                   │                 │         │
└───────────┼───────────────────┼─────────────────┼─────────┘
            │                   │                 │
  ┌─────────▼─────┐  ┌─────────▼──────┐  ┌──────▼────────┐
  │ Header        │  │ SQLAnalyzer    │  │ History Page  │
  │ AuthGuard     │  │ Landing Page   │  │ Dashboard     │
  │ UserMenu      │  │                │  │               │
  └───────────────┘  └────────────────┘  └───────────────┘
```

### 3.3 State Ownership Rules

| State | Owner | Subscribers |
|---|---|---|
| `user`, `session`, `isAuthenticated` | `authStore` | Header, AuthGuard, SaveButton, UserMenu |
| `sqlInput` | `queryStore` | SQLEditor, AnalyzeButton |
| `analysisResult` | `queryStore` | AnalysisOutput, all tabs |
| `isAnalyzing` | `queryStore` | AnalysisOutput (loading state) |
| `queries` (saved) | `historyStore` | HistoryPage, Dashboard |
| `activeTab` | Local state (AnalysisOutput) | Tab components |
| `isMenuOpen` | Local state (Header) | MobileMenu |
| `activeFilter` | Local state (ExamplesPage) | DifficultyFilter, ExamplesGrid |
| Form values | Local state (forms) | Individual form components |

---

## 4. Custom Hooks

### 4.1 Hook Inventory

```typescript
// hooks/useAuth.ts
function useAuth(): {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// hooks/useSQLParser.ts
function useSQLParser(): {
  parse: (sql: string) => AnalysisResult;
  isSupported: (sql: string) => boolean;
  getDialect: (sql: string) => string;
};

// hooks/useClipboard.ts
function useClipboard(): {
  copy: (text: string) => Promise<boolean>;
  isCopied: boolean;
};

// hooks/useMediaQuery.ts
function useMediaQuery(query: string): boolean;

// hooks/useDebounce.ts
function useDebounce<T>(value: T, delay: number): T;
```

---

## 5. Data Flow Patterns

### 5.1 Props Drilling Prevention

Components never drill props more than 2 levels. If data is needed deeper:
1. Use Zustand store for shared application state.
2. Use React Context for scoped provider patterns (e.g., ToastProvider).
3. Use custom hooks for encapsulated logic.

### 5.2 Server/Client Component Boundaries (Next.js App Router)

| Component Type | Examples | Reasoning |
|---|---|---|
| **Server Component** | Layout, PageContainer, static sections | No client-side interactivity; better performance |
| **Client Component** | SQLEditor, forms, tabs, buttons with handlers | Requires useState, useEffect, event handlers |
| **Hybrid** | Pages use server layout + client interactive sections | Maximize SSR with client islands |

**Boundary Rule:** Add `'use client'` only when the component uses:
- `useState`, `useEffect`, `useRef`
- Event handlers (onClick, onChange, etc.)
- Browser APIs (window, document, navigator)
- Zustand store subscriptions

---

## 6. Component Testing Strategy

### 6.1 Test Coverage by Component Type

| Type | Testing Approach | Coverage Target |
|---|---|---|
| Layout components | Snapshot + render tests | 70% |
| Form components | User interaction tests (RTL) | 90% |
| Analysis components | Output verification tests | 85% |
| History components | CRUD operation tests | 85% |
| Utility hooks | Unit tests | 95% |
| Stores (Zustand) | State transition tests | 90% |

### 6.2 Testing Patterns

```typescript
// Example: Testing SQLEditor
import { render, screen, fireEvent } from '@testing-library/react';
import { SQLEditor } from '@/components/sql/SQLEditor';

describe('SQLEditor', () => {
  it('renders with placeholder text', () => {
    render(<SQLEditor value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText(/paste.*sql/i)).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const onChange = vi.fn();
    render(<SQLEditor value="" onChange={onChange} onSubmit={vi.fn()} />);
    await userEvent.type(screen.getByRole('textbox'), 'SELECT');
    expect(onChange).toHaveBeenCalled();
  });

  it('enforces character limit', () => {
    const longSQL = 'S'.repeat(5001);
    render(<SQLEditor value={longSQL} onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByText('5000 / 5000')).toBeInTheDocument();
  });
});
```

---

## 7. Future Component Considerations

| Feature | New Components | Impact |
|---|---|---|
| Syntax highlighting | `CodeEditor` (replaces MonospaceTextarea) | Major — integrates CodeMirror or Monaco |
| AI explanations | `AIBadge`, `AIExplanation` | Minor — visual variant of ExplanationTab |
| Query comparison | `QueryDiff`, `DiffViewer` | Major — new page and component set |
| Sharing | `ShareDialog`, `ShareLink` | Minor — modal component |
| Theme toggle | `ThemeToggle`, `ThemeProvider` | Moderate — global theme context |

---

*This Component Architecture document is the frontend engineering blueprint. All React components must follow the hierarchy, interfaces, and patterns defined here.*
