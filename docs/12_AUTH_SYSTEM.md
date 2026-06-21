# SQLSense — Auth System

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document provides the complete technical specification for the authentication system in SQLSense, including Supabase Auth configuration, session management, protected route implementation, middleware design, and future OAuth expansion plans.

**Related Documents:**
- [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md)
- [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md)
- [16_SECURITY_PLAN.md](./16_SECURITY_PLAN.md)

---

## 1. Auth Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │ Auth Forms   │───▶│ Supabase     │                  │
│  │ (SignIn,     │    │ Client SDK   │                  │
│  │  SignUp)     │    │ (@supabase/  │                  │
│  └──────────────┘    │  supabase-js)│                  │
│                      └──────┬───────┘                  │
│  ┌──────────────┐           │                          │
│  │ Zustand      │◄──────────┤                          │
│  │ Auth Store   │           │                          │
│  └──────────────┘           │                          │
│                              │                          │
└──────────────────────────────┼──────────────────────────┘
                               │ HTTPS
┌──────────────────────────────┼──────────────────────────┐
│                    VERCEL                                │
│                              │                          │
│  ┌───────────────────────────▼───────────────────────┐  │
│  │              Next.js Middleware                     │  │
│  │                                                    │  │
│  │  • Read session from cookies                       │  │
│  │  • Refresh expired tokens                          │  │
│  │  • Protect routes (/dashboard, /history)           │  │
│  │  • Redirect authenticated users from /sign-in      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────┐
│                    SUPABASE                              │
│                              │                          │
│  ┌───────────────────────────▼───────────────────────┐  │
│  │              GoTrue Auth Server                    │  │
│  │                                                    │  │
│  │  • User registration (email/password)              │  │
│  │  • Credential verification                         │  │
│  │  • Password hashing (bcrypt, 10 rounds)            │  │
│  │  • JWT token issuance (1 hour expiry)              │  │
│  │  • Refresh token management (60 days expiry)       │  │
│  │  • Session management                              │  │
│  │  • auth.users table (Supabase managed)             │  │
│  └────────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Supabase Client Configuration

### 2.1 Browser Client

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

### 2.2 Server Client (for API Routes & Server Components)

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method is called from a Server Component.
            // This can be ignored if middleware refreshes sessions.
          }
        },
      },
    },
  );
}
```

### 2.3 Middleware Client

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes
  const protectedRoutes = ['/dashboard', '/history'];
  const authRoutes = ['/sign-in', '/sign-up'];
  const currentPath = request.nextUrl.pathname;

  if (!user && protectedRoutes.some((route) => currentPath.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if (user && authRoutes.some((route) => currentPath.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

---

## 3. Authentication Flows

### 3.1 Sign-Up Flow

```typescript
// Sequence:
// 1. User fills form (email, password, confirmPassword)
// 2. Client-side Zod validation
// 3. supabase.auth.signUp({ email, password })
// 4. Supabase creates user in auth.users
// 5. Supabase issues JWT + refresh token
// 6. Session stored in httpOnly cookies
// 7. Zustand auth store updated
// 8. Redirect to /dashboard

async function handleSignUp(email: string, password: string): Promise<void> {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    throw new AuthError(error.message, error.status);
  }
  
  if (data.user) {
    // Session is automatically set via cookies
    authStore.getState().setUser(data.user);
    authStore.getState().setSession(data.session);
  }
}
```

### 3.2 Sign-In Flow

```typescript
async function handleSignIn(email: string, password: string): Promise<void> {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw new AuthError(error.message, error.status);
  }
  
  if (data.user && data.session) {
    authStore.getState().setUser(data.user);
    authStore.getState().setSession(data.session);
  }
}
```

### 3.3 Sign-Out Flow

```typescript
async function handleSignOut(): Promise<void> {
  const supabase = createClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new AuthError(error.message);
  }
  
  authStore.getState().setUser(null);
  authStore.getState().setSession(null);
  
  // Redirect to home
  window.location.href = '/';
}
```

### 3.4 Session Initialization (App Load)

```typescript
// Called once when the app loads (in the root layout or auth provider)
async function initializeAuth(): Promise<void> {
  const supabase = createClient();
  
  authStore.getState().setLoading(true);
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    authStore.getState().setUser(session.user);
    authStore.getState().setSession(session);
  }
  
  // Listen for auth changes (tab switches, token refresh)
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      authStore.getState().setUser(session.user);
      authStore.getState().setSession(session);
    } else {
      authStore.getState().setUser(null);
      authStore.getState().setSession(null);
    }
  });
  
  authStore.getState().setLoading(false);
}
```

---

## 4. Next.js Middleware

### 4.1 Middleware Configuration

```typescript
// src/middleware.ts
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 4.2 Route Protection Matrix

| Route Pattern | Auth Required | Middleware Action |
|---|---|---|
| `/` | No | Pass through |
| `/sign-in` | No (redirect if auth) | If authenticated → redirect to `/dashboard` |
| `/sign-up` | No (redirect if auth) | If authenticated → redirect to `/dashboard` |
| `/dashboard` | Yes | If not authenticated → redirect to `/sign-in` |
| `/history` | Yes | If not authenticated → redirect to `/sign-in` |
| `/examples` | No | Pass through |
| `/about` | No | Pass through |
| `/api/*` | Varies | API-level auth check |

---

## 5. Zustand Auth Store

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  
  get isAuthenticated() {
    return !!get().user;
  },
  
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  
  signOut: async () => {
    // Implementation calls supabase.auth.signOut()
    // Then clears user and session
    set({ user: null, session: null });
  },
  
  initialize: async () => {
    // Implementation calls supabase.auth.getSession()
    // Sets up onAuthStateChange listener
    set({ isLoading: false });
  },
}));
```

---

## 6. Form Validation Schemas

### 6.1 Sign-In Schema

```typescript
import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
```

### 6.2 Sign-Up Schema

```typescript
export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be less than 72 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
```

---

## 7. Token Lifecycle

| Token Type | Issued By | Expiry | Refresh |
|---|---|---|---|
| **Access Token (JWT)** | Supabase GoTrue | 1 hour (3600 seconds) | Auto-refresh via SDK when < 30 seconds remaining |
| **Refresh Token** | Supabase GoTrue | 60 days | Used to obtain new access token |
| **Session Cookie** | Next.js middleware | Matches access token expiry | Updated on every request via middleware |

### 7.1 Token Refresh Sequence

```
1. User makes a request
2. Middleware reads session cookie
3. Middleware calls supabase.auth.getUser()
4. If access token is expired:
   a. SDK automatically uses refresh token
   b. New access token issued
   c. Middleware updates the cookie
5. If refresh token is expired:
   a. User is redirected to /sign-in
   b. All session data is cleared
```

---

## 8. Security Considerations

### 8.1 Cookie Security

| Attribute | Value | Purpose |
|---|---|---|
| `httpOnly` | `true` | Prevents JavaScript access to cookie |
| `secure` | `true` (production) | Cookie only sent over HTTPS |
| `sameSite` | `lax` | CSRF protection while allowing normal navigation |
| `path` | `/` | Cookie available on all paths |
| `maxAge` | `3600` | Matches access token expiry |

### 8.2 Password Security

- Passwords are **never** stored in the application.
- Passwords are sent over HTTPS to Supabase GoTrue.
- Supabase uses **bcrypt** with 10 rounds for hashing.
- Minimum password length: 8 characters (enforced client-side and server-side).
- Maximum password length: 72 characters (bcrypt limitation).

### 8.3 CSRF Protection

- Supabase uses **token-based authentication** (not cookie-based session IDs), which is inherently CSRF-resistant.
- The `sameSite: lax` cookie attribute provides additional protection.
- No state-changing operations are performed via GET requests.

---

## 9. Error Handling

| Error Scenario | Error Code | User Message | Action |
|---|---|---|---|
| Invalid credentials | `invalid_grant` | "Invalid email or password" | Show inline error |
| Email already registered | `user_already_exists` | "An account with this email already exists" | Show inline error |
| Network error | `fetch_error` | "Connection error. Please check your internet." | Show toast error |
| Rate limited | `over_request_rate_limit` | "Too many attempts. Please wait and try again." | Show toast error |
| Server error | `server_error` | "Something went wrong. Please try again." | Show toast error |
| Session expired | `session_expired` | "Your session has expired. Please sign in again." | Redirect to /sign-in |
| Invalid email format | Zod validation | "Please enter a valid email address" | Show inline error |
| Password too short | Zod validation | "Password must be at least 8 characters" | Show inline error |
| Passwords don't match | Zod validation | "Passwords do not match" | Show inline error |

---

## 10. Future OAuth Integration

### 10.1 Google OAuth (v1.1)

```typescript
// Future implementation
async function signInWithGoogle() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}
```

### 10.2 GitHub OAuth (v1.1)

```typescript
// Future implementation
async function signInWithGitHub() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}
```

### 10.3 OAuth Callback Route

```typescript
// src/app/auth/callback/route.ts (future)
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  
  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }
  
  return NextResponse.redirect(new URL('/sign-in?error=auth', request.url));
}
```

### 10.4 Supabase Dashboard Configuration Required

| Provider | Dashboard Setting | Value |
|---|---|---|
| Google | Authentication → Providers → Google | Enable, add Client ID + Secret |
| GitHub | Authentication → Providers → GitHub | Enable, add Client ID + Secret |
| Callback URL | Authentication → URL Configuration | `https://sqlsense.vercel.app/auth/callback` |

---

## 11. Testing Strategy

### 11.1 Auth Unit Tests

| Test Case | Method |
|---|---|
| Sign-up with valid credentials | Mock Supabase SDK |
| Sign-up with existing email | Mock error response |
| Sign-in with valid credentials | Mock Supabase SDK |
| Sign-in with invalid credentials | Mock error response |
| Sign-out clears state | Test Zustand store |
| Form validation (email format) | Test Zod schema |
| Form validation (password length) | Test Zod schema |
| Form validation (password match) | Test Zod schema |

### 11.2 Auth Integration Tests

| Test Case | Method |
|---|---|
| Protected route redirect (unauthenticated) | Next.js testing |
| Auth route redirect (authenticated) | Next.js testing |
| Session persistence across page loads | Browser testing |
| Token refresh on expiry | Mock timer + SDK |

---

*This Auth System document is the complete specification for authentication in SQLSense. All auth implementation must follow the patterns, configurations, and security measures documented here.*
