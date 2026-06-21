# SQLSense — Technical Requirements Document (TRD)

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This Technical Requirements Document (TRD) specifies the complete technical stack, development environment, build configuration, dependency management, coding standards, and technical constraints for SQLSense. It is the primary reference for engineering setup and technical decision-making.

**Related Documents:**
- [04_PRD.md](./04_PRD.md)
- [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md)
- [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md)
- [20_DEPLOYMENT_GUIDE.md](./20_DEPLOYMENT_GUIDE.md)

---

## 1. Technology Stack

### 1.1 Frontend Framework

| Technology | Version | Purpose | Justification |
|---|---|---|---|
| **Next.js** | 15.x | React meta-framework | App Router, SSR/SSG, API routes, file-based routing, built-in optimizations |
| **React** | 19.x | UI component library | Latest stable with concurrent features, improved performance |
| **TypeScript** | 5.x | Type-safe JavaScript | Compile-time error detection, better IDE support, self-documenting code |

### 1.2 Styling & UI

| Technology | Version | Purpose | Justification |
|---|---|---|---|
| **Tailwind CSS** | 4.x | Utility-first CSS framework | Rapid styling, consistent design tokens, tree-shaking for small bundles |
| **shadcn/ui** | Latest | Component library | Accessible components, full code ownership, customizable to design system |
| **Lucide React** | Latest | Icon library | Consistent, minimal icons; tree-shakeable; MIT licensed |
| **Google Fonts** | — | Inter + JetBrains Mono | Professional typography as specified in Design Brief |

### 1.3 State Management & Validation

| Technology | Version | Purpose | Justification |
|---|---|---|---|
| **Zustand** | 5.x | Client-side state management | Minimal API, excellent TypeScript support, no boilerplate |
| **Zod** | 3.x | Schema validation | Runtime type validation for forms and API data |
| **DOMPurify** | 3.x | HTML sanitization | Industry-standard XSS prevention |

### 1.4 SQL Processing

| Technology | Version | Purpose | Justification |
|---|---|---|---|
| **node-sql-parser** | 5.x | SQL to AST parsing | Multi-dialect support (MySQL, PostgreSQL, SQLite, T-SQL), client-side capable |

### 1.5 Backend & Database

| Technology | Version | Purpose | Justification |
|---|---|---|---|
| **Supabase** | Latest | Auth + PostgreSQL database | Free tier, built-in auth, RLS, real-time subscriptions, SDK |
| **@supabase/supabase-js** | 2.x | Supabase client SDK | Official SDK for auth and database operations |
| **@supabase/ssr** | Latest | Server-side Supabase helpers | Cookie-based auth for Next.js App Router |

### 1.6 Testing

| Technology | Version | Purpose | Justification |
|---|---|---|---|
| **Vitest** | 2.x | Unit/integration test runner | Fast, Vite-based, native TypeScript support |
| **React Testing Library** | 16.x | Component testing | Tests user behavior, not implementation details |
| **@testing-library/jest-dom** | 6.x | DOM matchers | Readable assertions for DOM state |
| **MSW** | 2.x | API mocking | Mock Supabase API calls in tests |

### 1.7 Development Tools

| Tool | Version | Purpose |
|---|---|---|
| **ESLint** | 9.x | Code linting |
| **Prettier** | 3.x | Code formatting |
| **Husky** | 9.x | Git hooks |
| **lint-staged** | 15.x | Pre-commit linting |
| **commitlint** | 19.x | Conventional commit messages |

### 1.8 Deployment

| Technology | Purpose | Justification |
|---|---|---|
| **Vercel** | Hosting and CI/CD | Native Next.js support, free hobby plan, automatic deployments |
| **GitHub** | Source control | Public repository, CI/CD integration with Vercel |
| **GitHub Actions** | CI pipeline | Automated testing and linting on PR |

---

## 2. Development Environment

### 2.1 System Requirements

| Requirement | Specification |
|---|---|
| **Node.js** | ≥ 20.x LTS |
| **Package Manager** | npm (included with Node.js) or pnpm ≥ 9.x |
| **Git** | ≥ 2.40 |
| **OS** | macOS, Linux, or Windows (WSL recommended) |
| **IDE** | VS Code (recommended) with extensions |

### 2.2 Recommended VS Code Extensions

| Extension | Purpose |
|---|---|
| ESLint | Inline linting |
| Prettier | Auto-formatting |
| Tailwind CSS IntelliSense | Tailwind autocomplete and hover |
| TypeScript Hero | TypeScript import management |
| Error Lens | Inline error display |
| GitLens | Enhanced Git integration |
| Prisma (optional) | Database schema highlighting |

### 2.3 Environment Variables

| Variable | Description | Required | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous API key | Yes | `eyJhbGciOiJIUzI1NiIs...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | No (v1.0) | `eyJhbGciOiJIUzI1NiIs...` |

**Security Rules:**
- `NEXT_PUBLIC_*` variables are exposed to the browser. Only Supabase URL and anon key (which are safe to expose per Supabase design with RLS).
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER be prefixed with `NEXT_PUBLIC_`. It grants admin access and must only be used server-side.
- All variables must be defined in `.env.local` (gitignored).
- A `.env.example` file must be committed with placeholder values.

### 2.4 `.env.example`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Server-side only (never expose to client)
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 3. Project Configuration

### 3.1 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key Settings:**
- `strict: true` — Enables all strict TypeScript checks.
- `paths: @/*` — Enables clean imports like `@/components/Header`.
- `target: ES2022` — Modern JavaScript output for Vercel's Node.js runtime.

### 3.2 ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "react/no-unescaped-entities": "off",
    "prefer-const": "error"
  }
}
```

### 3.3 Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 3.4 Tailwind CSS Configuration

```typescript
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        primary: '#8B5CF6',
        secondary: '#6366F1',
        foreground: '#F8FAFC',
        muted: '#94A3B8',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        surface: '#0A0F1E',
        'surface-hover': '#111827',
        border: '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'page-enter': 'page-enter 300ms ease-out',
        'shake': 'shake 300ms ease-in-out',
        'skeleton': 'skeleton-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translateX(-50%) scale(1.1)' },
        },
        'page-enter': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        'skeleton-pulse': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 3.5 Vitest Configuration

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        'src/app/layout.tsx',
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 4. Coding Standards

### 4.1 File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `Header.tsx`, `SQLEditor.tsx` |
| Pages (Next.js App Router) | lowercase | `page.tsx`, `layout.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `useSQLParser.ts` |
| Utilities | camelCase | `formatDate.ts`, `sanitize.ts` |
| Types | PascalCase | `types.ts`, `SavedQuery.ts` |
| Constants | UPPER_SNAKE_CASE (in file) | `constants.ts` |
| Test files | Same as source + `.test` | `Header.test.tsx`, `useAuth.test.ts` |
| Stores (Zustand) | camelCase with `Store` suffix | `authStore.ts`, `queryStore.ts` |

### 4.2 Component Structure

Every React component should follow this structure:

```typescript
// 1. Imports (external, then internal, then types)
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from './types';

// 2. Type definitions (if not in separate file)
interface HeaderProps {
  isAuthenticated: boolean;
}

// 3. Component definition (named export preferred)
export function Header({ isAuthenticated }: HeaderProps) {
  // 3a. Hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 3b. Derived state / computed values

  // 3c. Event handlers
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 3d. Render
  return (
    <header>
      {/* JSX */}
    </header>
  );
}
```

### 4.3 Import Order

```typescript
// 1. React / Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { z } from 'zod';
import DOMPurify from 'dompurify';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

// 4. Internal utilities / hooks / stores
import { useAuth } from '@/hooks/useAuth';
import { queryStore } from '@/stores/queryStore';

// 5. Types
import type { SavedQuery } from '@/types';

// 6. Styles / assets (if any)
import './styles.css';
```

### 4.4 TypeScript Rules

1. **No `any` type.** Use `unknown` when the type is truly unknown.
2. **Prefer `interface` over `type` for object shapes.** Use `type` for unions, intersections, and mapped types.
3. **All function parameters must be typed.** No implicit `any`.
4. **All exported functions must have explicit return types.**
5. **Use `as const` for constant arrays and objects.**
6. **Prefer discriminated unions for state modeling.**

### 4.5 Error Handling

```typescript
// ✅ Good: Typed error handling
try {
  const { data, error } = await supabase
    .from('saved_queries')
    .insert(query);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
} catch (error) {
  if (error instanceof Error) {
    console.error('Save failed:', error.message);
    toast.error('Failed to save query. Please try again.');
  }
  throw error;
}
```

---

## 5. Performance Budgets

### 5.1 Bundle Size Budgets

| Metric | Budget | Monitoring |
|---|---|---|
| Total JavaScript (initial) | < 300KB gzipped | `next build` output |
| Total JavaScript (lazy-loaded) | < 200KB gzipped | `next build` output |
| Total CSS | < 50KB gzipped | `next build` output |
| Largest single chunk | < 150KB gzipped | `next build` output |

### 5.2 Runtime Performance Budgets

| Metric | Budget | Monitoring |
|---|---|---|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.0s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |
| SQL parse time | < 200ms | Custom timing |
| Explanation generation time | < 300ms | Custom timing |

### 5.3 Performance Optimization Strategies

| Strategy | Implementation |
|---|---|
| Code splitting | Dynamic imports for analysis tabs, query flow diagram |
| Image optimization | Next.js `<Image>` component with WebP format |
| Font optimization | `next/font` for Inter and JetBrains Mono with `display: swap` |
| Tree shaking | Lucide React named imports; shadcn/ui selective imports |
| Caching | Supabase query caching; Next.js ISR for static pages |
| Preloading | `<Link prefetch>` for Next.js route prefetching |
| Lazy loading | `React.lazy()` for below-the-fold components |

---

## 6. Security Technical Requirements

### 6.1 Input Security

| Requirement | Implementation |
|---|---|
| SQL input sanitization | DOMPurify before rendering any user-provided SQL in the DOM |
| Character limit enforcement | Client-side: maxLength on textarea; Server-side: Zod validation (max 5000) |
| HTML entity encoding | All user text rendered via React's JSX escaping (default) |
| No `dangerouslySetInnerHTML` | Prohibited for any user-provided content; if needed, must pass through DOMPurify |

### 6.2 Authentication Security

| Requirement | Implementation |
|---|---|
| Password hashing | Handled by Supabase Auth (bcrypt) |
| Session tokens | Supabase JWT with automatic refresh |
| CSRF protection | Supabase handles via token-based auth |
| Secure cookies | `httpOnly`, `secure`, `sameSite: lax` cookies for SSR auth |

### 6.3 Data Security

| Requirement | Implementation |
|---|---|
| Row-Level Security | PostgreSQL RLS policies on `saved_queries` table |
| Data isolation | RLS ensures users can only CRUD their own rows |
| API key protection | Environment variables; `NEXT_PUBLIC_` only for safe client keys |
| No server-side SQL execution | Architecturally impossible — no database connection for user SQL |

### 6.4 Network Security

| Requirement | Implementation |
|---|---|
| HTTPS only | Enforced by Vercel (automatic SSL/TLS) |
| Content Security Policy | Configured in `next.config.ts` headers |
| X-Frame-Options | `DENY` — prevent iframe embedding |
| X-Content-Type-Options | `nosniff` — prevent MIME type sniffing |
| Referrer-Policy | `strict-origin-when-cross-origin` |

### 6.5 Next.js Security Headers Configuration

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
```

---

## 7. API Technical Requirements

### 7.1 API Routes (Next.js App Router)

| Route | Method | Purpose | Auth Required |
|---|---|---|---|
| `POST /api/queries/save` | POST | Save a query analysis | Yes |
| `GET /api/queries` | GET | Retrieve user's saved queries | Yes |
| `DELETE /api/queries/[id]` | DELETE | Delete a saved query | Yes |

### 7.2 API Response Format

All API responses follow a consistent structure:

```typescript
// Success response
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
```

### 7.3 HTTP Status Codes

| Code | Usage |
|---|---|
| `200` | Successful GET, DELETE |
| `201` | Successful POST (resource created) |
| `400` | Validation error (invalid input) |
| `401` | Unauthorized (not authenticated) |
| `403` | Forbidden (authenticated but not authorized) |
| `404` | Resource not found |
| `429` | Rate limited |
| `500` | Internal server error |

---

## 8. Browser Support

### 8.1 Supported Browsers

| Browser | Minimum Version | Support Level |
|---|---|---|
| Chrome | Last 2 major versions | Full support |
| Firefox | Last 2 major versions | Full support |
| Safari | Last 2 major versions | Full support |
| Edge | Last 2 major versions | Full support |
| Mobile Chrome | Last 2 major versions | Full support |
| Mobile Safari | Last 2 major versions | Full support |

### 8.2 Not Supported

| Browser | Reason |
|---|---|
| Internet Explorer | End of life; no modern web features |
| Opera Mini | Limited JavaScript support |
| Samsung Internet < 20 | Low market share |

### 8.3 Required Web APIs

| API | Usage | Fallback |
|---|---|---|
| `navigator.clipboard` | Copy to clipboard | `document.execCommand('copy')` |
| `IntersectionObserver` | Lazy loading | Polyfill or eager loading |
| CSS `backdrop-filter` | Glassmorphism | Solid background fallback |
| CSS `@container` | Container queries (future) | Media queries |

---

## 9. Git Workflow

### 9.1 Branching Strategy

| Branch | Purpose | Protection |
|---|---|---|
| `main` | Production-ready code | Protected; requires PR |
| `develop` | Integration branch | Protected; requires PR |
| `feature/*` | Feature development | No protection |
| `fix/*` | Bug fixes | No protection |
| `docs/*` | Documentation updates | No protection |

### 9.2 Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

| Type | Usage |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Code style (no logic change) |
| `refactor` | Code refactoring |
| `test` | Tests |
| `chore` | Tooling, config |
| `perf` | Performance improvement |

### 9.3 PR Requirements

| Requirement | Enforced By |
|---|---|
| All tests pass | GitHub Actions |
| ESLint passes | GitHub Actions |
| TypeScript compiles | GitHub Actions |
| At least 1 review approval | GitHub branch rules (when team grows) |
| Conventional commit message | commitlint |

---

## 10. Monitoring & Observability

### 10.1 Error Tracking

| Tool | Purpose | Implementation |
|---|---|---|
| Vercel Analytics | Page views, performance metrics | Built-in |
| React Error Boundaries | Catch rendering errors | Custom ErrorBoundary component |
| Console logging | Development debugging | Structured logging |

### 10.2 Performance Monitoring

| Metric | Tool | Alert Threshold |
|---|---|---|
| LCP | Vercel Analytics | > 3s |
| FCP | Vercel Analytics | > 2s |
| CLS | Vercel Analytics | > 0.15 |
| Build time | Vercel Dashboard | > 120s |

---

## 11. Future Technical Considerations

| Consideration | Impact | Timeline |
|---|---|---|
| AI/LLM integration | New API route to proxy LLM requests; prompt engineering | v2.0 |
| Real-time collaboration | Supabase Realtime subscriptions | v2.0 |
| Offline mode | Service Worker for client-side parsing without network | v2.0 |
| Rate limiting | Upstash Redis for API rate limiting | v1.1 |
| Syntax highlighting | Integrate Prism.js or CodeMirror for the SQL editor | v1.1 |
| PWA support | Service worker, manifest.json, offline capability | v2.0 |

---

*This TRD defines all technical specifications for SQLSense. All development must adhere to the standards, configurations, and constraints documented here.*
