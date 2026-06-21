# SQLSense — Backend Schema

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document defines all TypeScript types, Zod validation schemas, and data transfer object (DTO) shapes used across the SQLSense backend (API routes, server components, and database interactions). It is the single source of truth for all data structures flowing through the server side.

**Related Documents:**
- [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md)
- [15_API_SPEC.md](./15_API_SPEC.md)
- [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md)

---

## 1. Core Database Types

### 1.1 Database Row Types

```typescript
// src/types/database.ts

/** Represents a row in the saved_queries table */
export interface SavedQueryRow {
  id: string;           // UUID
  user_id: string;      // UUID — references auth.users(id)
  query_text: string;   // The original SQL query
  explanation: string;  // Plain-English explanation
  complexity: number;   // 1–10 score
  optimization_tips: string | null;  // JSON string or null
  created_at: string;   // ISO 8601 timestamp
}

/** Supabase generated database types */
export interface Database {
  public: {
    Tables: {
      saved_queries: {
        Row: SavedQueryRow;
        Insert: Omit<SavedQueryRow, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<SavedQueryRow, 'id' | 'user_id' | 'created_at'>>;
      };
    };
  };
}
```

### 1.2 Application-Level Types

```typescript
// src/types/index.ts

/** Parsed saved query for frontend consumption */
export interface SavedQuery {
  id: string;
  userId: string;
  queryText: string;
  explanation: string;
  complexity: number;
  optimizationTips: OptimizationTip[] | null;
  createdAt: Date;
}

/** Analysis result produced by the SQL parser */
export interface AnalysisResult {
  explanation: string;
  clauses: ClauseBreakdown[];
  complexity: ComplexityResult;
  optimizationTips: OptimizationTip[];
  flow: QueryFlowStep[];
}

/** Individual clause explanation */
export interface ClauseBreakdown {
  type: string;
  sql: string;
  explanation: string;
}

/** Complexity score result */
export interface ComplexityResult {
  score: number;
  label: 'Simple' | 'Moderate' | 'Complex' | 'Expert';
  factors: string[];
}

/** Single optimization suggestion */
export interface OptimizationTip {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

/** Single step in query execution flow */
export interface QueryFlowStep {
  order: number;
  operation: string;
  description: string;
}

/** SQL example for the examples library */
export interface SQLExample {
  id: string;
  title: string;
  description: string;
  query: string;
  difficulty: DifficultyLevel;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/** User stats for the dashboard */
export interface QueryStats {
  totalSaved: number;
  highestComplexity: number;
  averageComplexity: number;
}
```

---

## 2. Zod Validation Schemas

### 2.1 API Request Schemas

```typescript
// src/lib/validators/schemas.ts
import { z } from 'zod';

/** Schema for saving a query analysis */
export const saveQuerySchema = z.object({
  query_text: z
    .string()
    .min(1, 'Query text is required')
    .max(5000, 'Query text exceeds the 5,000 character limit')
    .trim(),
  explanation: z
    .string()
    .min(1, 'Explanation is required')
    .max(50000, 'Explanation is too long'),
  complexity: z
    .number()
    .int('Complexity must be a whole number')
    .min(1, 'Complexity must be at least 1')
    .max(10, 'Complexity must be at most 10'),
  optimization_tips: z
    .string()
    .max(50000, 'Optimization tips are too long')
    .nullable()
    .optional(),
});

export type SaveQueryInput = z.infer<typeof saveQuerySchema>;

/** Schema for SQL input validation */
export const sqlInputSchema = z.object({
  query: z
    .string()
    .min(1, 'Please enter a SQL query to analyze')
    .max(5000, 'Query exceeds the maximum length of 5,000 characters')
    .trim(),
});

export type SQLInput = z.infer<typeof sqlInputSchema>;

/** Schema for delete operation */
export const deleteQuerySchema = z.object({
  id: z.string().uuid('Invalid query ID format'),
});

export type DeleteQueryInput = z.infer<typeof deleteQuerySchema>;

/** Schema for query params */
export const queryParamsSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().min(1).max(100).optional()),
  offset: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().min(0).optional()),
});

export type QueryParams = z.infer<typeof queryParamsSchema>;
```

### 2.2 Auth Form Schemas

```typescript
// src/lib/validators/auth.ts
import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(72, 'Password is too long'),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address')
      .max(254, 'Email is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(72, 'Password must be less than 72 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
```

---

## 3. API Response Types

```typescript
// src/types/api.ts

/** Successful API response */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

/** Error API response */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

/** Union type for all API responses */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/** Specific API response types */
export type SaveQueryResponse = ApiResponse<SavedQuery>;
export type GetQueriesResponse = ApiResponse<SavedQuery[]>;
export type DeleteQueryResponse = ApiResponse<{ id: string }>;
export type StatsResponse = ApiResponse<QueryStats>;
```

---

## 4. Data Transformers

```typescript
// src/lib/transformers.ts

import type { SavedQueryRow, SavedQuery, OptimizationTip } from '@/types';

/** Convert database row to application type */
export function transformSavedQuery(row: SavedQueryRow): SavedQuery {
  return {
    id: row.id,
    userId: row.user_id,
    queryText: row.query_text,
    explanation: row.explanation,
    complexity: row.complexity,
    optimizationTips: row.optimization_tips
      ? parseOptimizationTips(row.optimization_tips)
      : null,
    createdAt: new Date(row.created_at),
  };
}

/** Parse JSON string to OptimizationTip array */
function parseOptimizationTips(json: string): OptimizationTip[] {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/** Convert application type back to database insert format */
export function toSavedQueryInsert(
  userId: string,
  result: AnalysisResult,
  queryText: string,
): Omit<SavedQueryRow, 'id' | 'created_at'> {
  return {
    user_id: userId,
    query_text: queryText,
    explanation: result.explanation,
    complexity: result.complexity.score,
    optimization_tips: result.optimizationTips.length > 0
      ? JSON.stringify(result.optimizationTips)
      : null,
  };
}
```

---

## 5. Error Types

```typescript
// src/types/errors.ts

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: string) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 'RATE_LIMITED', 429);
    this.name = 'RateLimitError';
  }
}
```

---

## 6. Constants

```typescript
// src/lib/constants.ts

/** Application limits */
export const LIMITS = {
  SQL_MAX_LENGTH: 5000,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 72,
  HISTORY_PAGE_SIZE: 20,
  DASHBOARD_RECENT_COUNT: 3,
  COMPLEXITY_MIN: 1,
  COMPLEXITY_MAX: 10,
} as const;

/** Complexity classifications */
export const COMPLEXITY_LABELS = {
  SIMPLE: { min: 1, max: 3, label: 'Simple' as const, color: 'success' },
  MODERATE: { min: 4, max: 6, label: 'Moderate' as const, color: 'warning' },
  COMPLEX: { min: 7, max: 8, label: 'Complex' as const, color: 'primary' },
  EXPERT: { min: 9, max: 10, label: 'Expert' as const, color: 'error' },
} as const;

/** Route definitions */
export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  EXAMPLES: '/examples',
  ABOUT: '/about',
} as const;

/** Protected route list */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.HISTORY,
] as const;

/** Auth routes (redirect away if authenticated) */
export const AUTH_ROUTES = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
] as const;
```

---

## 7. Implementation Notes

### 7.1 Type Safety Strategy

- All database queries use typed Supabase client with the `Database` type.
- All API request bodies are validated with Zod before processing.
- All API responses conform to the `ApiResponse<T>` type.
- Data transformers convert between database rows and application types.
- Error types extend a base `AppError` class for consistent error handling.

### 7.2 Naming Conventions

| Layer | Convention | Example |
|---|---|---|
| Database columns | `snake_case` | `query_text`, `user_id`, `created_at` |
| TypeScript interfaces | `PascalCase` | `SavedQuery`, `AnalysisResult` |
| TypeScript properties | `camelCase` | `queryText`, `userId`, `createdAt` |
| API request bodies | `snake_case` (matches database) | `query_text`, `optimization_tips` |
| Zod schemas | `camelCase` with `Schema` suffix | `saveQuerySchema`, `signInSchema` |

### 7.3 Serialization Rules

- Dates from the database (`TIMESTAMPTZ`) arrive as ISO 8601 strings and are converted to JavaScript `Date` objects by transformers.
- `optimization_tips` is stored as a JSON string in the database and parsed into `OptimizationTip[]` by the transformer.
- All API responses serialize dates as ISO 8601 strings.

---

*This Backend Schema document defines every data structure in the SQLSense server layer. All API routes, server components, and database operations must use these types and schemas.*
