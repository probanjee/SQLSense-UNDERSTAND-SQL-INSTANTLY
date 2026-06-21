# SQLSense — System Architecture

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document defines the high-level system architecture of SQLSense, including deployment topology, data flow, infrastructure components, and integration patterns. It provides the technical foundation for all engineering decisions regarding how the system's components communicate and where processing occurs.

**Related Documents:**
- [07_TRD.md](./07_TRD.md)
- [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md)
- [12_AUTH_SYSTEM.md](./12_AUTH_SYSTEM.md)
- [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md)
- [15_API_SPEC.md](./15_API_SPEC.md)

---

## 1. Architecture Overview

SQLSense follows a **client-heavy, server-light** architecture. The core feature — SQL parsing and analysis — runs entirely on the client side. The server-side (Vercel serverless functions) handles only authentication proxying and database operations for saving/loading queries.

### 1.1 High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                               │
│                                                                      │
│  ┌──────────────┐  ┌──────────────────┐  ┌────────────────────────┐ │
│  │              │  │                  │  │                        │ │
│  │  React UI    │  │  SQL Parser      │  │  Zustand State Store   │ │
│  │  (Next.js    │◄─│  (node-sql-      │  │                        │ │
│  │   App Router)│  │   parser)        │  │  • Auth state          │ │
│  │              │──│                  │  │  • Query state         │ │
│  │  Pages:      │  │  Runs entirely   │  │  • Analysis results    │ │
│  │  /, /sign-in │  │  in browser.     │  │  • UI state            │ │
│  │  /sign-up    │  │  No network      │  │                        │ │
│  │  /dashboard  │  │  request needed  │  └────────────────────────┘ │
│  │  /history    │  │  for analysis.   │                              │
│  │  /examples   │  │                  │                              │
│  │  /about      │  └──────────────────┘                              │
│  │              │                                                    │
│  └──────┬───────┘                                                    │
│         │                                                            │
└─────────┼────────────────────────────────────────────────────────────┘
          │
          │  HTTPS (TLS 1.3)
          │
┌─────────┼────────────────────────────────────────────────────────────┐
│         │                 VERCEL EDGE NETWORK                        │
│         │                                                            │
│   ┌─────▼──────────────────────────────────────────────────────────┐ │
│   │                    Vercel CDN / Edge Cache                      │ │
│   │                                                                 │ │
│   │  • Static assets (JS, CSS, fonts, images)                      │ │
│   │  • SSR/SSG pages (cached at edge)                              │ │
│   │  • Automatic HTTPS termination                                 │ │
│   └─────┬───────────────────────────────────────────────────────────┘ │
│         │                                                            │
│   ┌─────▼──────────────────────────────────────────────────────────┐ │
│   │              Next.js Serverless Functions                       │ │
│   │                                                                 │ │
│   │  API Routes:                                                    │ │
│   │  ┌──────────────────────────────────────────────────────────┐   │ │
│   │  │  POST /api/queries/save     → Save analysis to DB       │   │ │
│   │  │  GET  /api/queries          → Fetch user's saved queries │   │ │
│   │  │  DELETE /api/queries/[id]   → Delete a saved query       │   │ │
│   │  └──────────────────────────────────────────────────────────┘   │ │
│   │                                                                 │ │
│   │  Middleware:                                                    │ │
│   │  ┌──────────────────────────────────────────────────────────┐   │ │
│   │  │  Auth middleware (validate session, refresh tokens)      │   │ │
│   │  │  Security headers middleware                             │   │ │
│   │  └──────────────────────────────────────────────────────────┘   │ │
│   │                                                                 │ │
│   └─────┬───────────────────────────────────────────────────────────┘ │
│         │                                                            │
└─────────┼────────────────────────────────────────────────────────────┘
          │
          │  Supabase Client SDK (HTTPS)
          │
┌─────────┼────────────────────────────────────────────────────────────┐
│         │                  SUPABASE CLOUD                            │
│         │                                                            │
│   ┌─────▼──────────────────┐  ┌──────────────────────────────────┐  │
│   │                        │  │                                  │  │
│   │  Supabase Auth         │  │  PostgreSQL Database             │  │
│   │                        │  │                                  │  │
│   │  • Email/password      │  │  Tables:                        │  │
│   │  • JWT token issuance  │  │  ┌────────────────────────────┐  │  │
│   │  • Session management  │  │  │  saved_queries             │  │  │
│   │  • Token refresh       │  │  │  ├── id (UUID, PK)         │  │  │
│   │  • Future: OAuth       │  │  │  ├── user_id (UUID, FK)    │  │  │
│   │                        │  │  │  ├── query_text (TEXT)     │  │  │
│   │  GoTrue Server         │  │  │  ├── explanation (TEXT)    │  │  │
│   │  (Supabase managed)    │  │  │  ├── complexity (INT)     │  │  │
│   │                        │  │  │  ├── optimization_tips     │  │  │
│   └────────────────────────┘  │  │  │    (TEXT)               │  │  │
│                               │  │  └── created_at (TSTZ)    │  │  │
│                               │  │                            │  │  │
│                               │  │  RLS Policies:             │  │  │
│                               │  │  • SELECT: user_id = auth  │  │  │
│                               │  │  • INSERT: user_id = auth  │  │  │
│                               │  │  • DELETE: user_id = auth  │  │  │
│                               │  │                            │  │  │
│                               │  └────────────────────────────┘  │  │
│                               │                                  │  │
│                               └──────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Architecture Layers

### 2.1 Layer Definitions

| Layer | Responsibility | Technology | Location |
|---|---|---|---|
| **Presentation** | Renders UI, handles user interactions | React 19, shadcn/ui, Tailwind CSS | Client (Browser) |
| **Client Logic** | SQL parsing, explanation generation, state management | node-sql-parser, Zustand, custom logic | Client (Browser) |
| **Transport** | HTTP requests, authentication tokens | Fetch API, Supabase SDK | Client ↔ Server |
| **API** | Request validation, auth verification, data operations | Next.js API Routes, Zod | Server (Vercel) |
| **Middleware** | Auth session management, security headers | Next.js Middleware | Server (Vercel Edge) |
| **Data** | Persistent storage, row-level security | PostgreSQL, Supabase RLS | Cloud (Supabase) |
| **Auth** | User identity, session tokens, credential verification | Supabase Auth (GoTrue) | Cloud (Supabase) |

### 2.2 Layer Communication Rules

| From | To | Protocol | Data Format |
|---|---|---|---|
| Presentation → Client Logic | Function call | TypeScript interfaces | Typed objects |
| Client Logic → Zustand | Store action | TypeScript interfaces | Typed state |
| Presentation → Transport | Supabase SDK / fetch | HTTPS | JSON |
| Transport → API | HTTPS | JSON | `ApiResponse<T>` |
| API → Data | Supabase SDK | PostgreSQL wire protocol | SQL results |
| API → Auth | Supabase SDK | HTTPS | JWT tokens |

---

## 3. Data Flow Diagrams

### 3.1 SQL Analysis Flow (No Network Required)

```
User Input          Client Processing           Output
─────────          ─────────────────           ──────

┌──────────┐      ┌──────────────────┐      ┌──────────────────┐
│ User     │      │ Input Validation │      │ Explanation      │
│ pastes   │─────▶│ (Zod schema)     │─────▶│ Engine           │
│ SQL      │      │ • Length check   │      │ • Parse AST      │
│ query    │      │ • Sanitize       │      │ • Generate text  │
└──────────┘      └──────────────────┘      │ • Score          │
                                             │   complexity     │
                                             │ • Generate tips  │
                                             │ • Build flow     │
                                             └────────┬─────────┘
                                                      │
                                                      ▼
                                             ┌──────────────────┐
                                             │ Zustand Store    │
                                             │ Update:          │
                                             │ • analysisResult │
                                             │ • isAnalyzing    │
                                             └────────┬─────────┘
                                                      │
                                                      ▼
                                             ┌──────────────────┐
                                             │ React re-render  │
                                             │ • Tabs populate  │
                                             │ • Results show   │
                                             └──────────────────┘
```

**Key Point:** The entire analysis flow is client-side. Zero network requests are needed. The user gets instant results.

### 3.2 Save Query Flow (Network Required)

```
Client                     Server (Vercel)              Supabase
──────                     ───────────────              ────────

┌──────────────┐          ┌─────────────────┐         ┌──────────────┐
│ User clicks  │          │ API Route:      │         │ PostgreSQL   │
│ "Save"       │─────────▶│ POST /api/      │────────▶│              │
│              │  HTTPS   │ queries/save    │  SDK    │ INSERT INTO  │
│ Payload:     │          │                 │         │ saved_queries│
│ {            │          │ • Validate      │         │ (with RLS)   │
│   query_text │          │   session       │         │              │
│   explanation│          │ • Validate body │         │ Returns:     │
│   complexity │          │   (Zod)         │         │ { id, ...}   │
│   tips       │          │ • Insert via    │         │              │
│ }            │          │   Supabase SDK  │         └──────┬───────┘
└──────────────┘          └─────────────────┘                │
                                  │                          │
                                  │◄─────────────────────────┘
                                  │
                          ┌───────▼─────────┐
                          │ Response:       │
                          │ { success: true,│──────────▶ Toast:
                          │   data: {...} } │           "Query saved!"
                          └─────────────────┘
```

### 3.3 Authentication Flow

```
Client                     Supabase Auth              Result
──────                     ──────────────              ──────

┌──────────────┐          ┌─────────────────┐
│ Sign-Up Form │          │ Supabase Auth   │
│ {            │─────────▶│ (GoTrue)        │
│   email,     │  HTTPS   │                 │
│   password   │          │ • Validate email│
│ }            │          │ • Hash password │
│              │          │ • Create user   │
│              │          │ • Issue JWT     │
└──────────────┘          └────────┬────────┘
                                   │
                          ┌────────▼────────┐
                          │ Response:       │
                          │ {               │
                          │   session: {    │
                          │     access_token│──────▶ Store in cookie
                          │     refresh_    │       (httpOnly, secure)
                          │     token       │
                          │   },            │
                          │   user: {...}   │──────▶ Zustand auth store
                          │ }               │
                          └─────────────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │ Redirect to     │
                          │ /dashboard      │
                          └─────────────────┘
```

### 3.4 Session Refresh Flow

```
Client                     Next.js Middleware          Supabase Auth
──────                     ──────────────────          ──────────────

┌──────────────┐          ┌─────────────────┐         ┌──────────────┐
│ User visits  │          │ Middleware runs  │         │              │
│ any page     │─────────▶│ on every request │────────▶│ Verify JWT   │
│              │          │                 │         │              │
│              │          │ • Read session  │         │ If expired:  │
│              │          │   from cookie   │         │ • Refresh    │
│              │          │ • Verify token  │         │   with       │
│              │          │ • Refresh if    │         │   refresh    │
│              │          │   needed        │         │   token      │
│              │          │ • Update cookie │         │ • Issue new  │
│              │          │                 │         │   JWT        │
└──────────────┘          └─────────────────┘         └──────────────┘
```

---

## 4. Infrastructure Architecture

### 4.1 Vercel Infrastructure

```
┌────────────────────────────────────────────────────────────┐
│                     VERCEL PLATFORM                         │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    CDN / Edge Network                │   │
│  │                                                     │   │
│  │  • 100+ global PoPs (Points of Presence)            │   │
│  │  • Static asset caching                             │   │
│  │  • Automatic HTTPS/TLS 1.3                          │   │
│  │  • HTTP/2 + HTTP/3 support                          │   │
│  │  • Brotli compression                               │   │
│  │  • DDoS protection                                  │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                  │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │              Edge Middleware Runtime                  │   │
│  │                                                     │   │
│  │  • Runs at the edge (closest to user)               │   │
│  │  • Auth session verification                        │   │
│  │  • Security headers injection                       │   │
│  │  • Route protection                                 │   │
│  │  • < 1ms added latency                              │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                  │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │           Serverless Functions (Node.js 20)          │   │
│  │                                                     │   │
│  │  • API routes (/api/*)                              │   │
│  │  • Cold start: ~200ms                               │   │
│  │  • Warm execution: ~50ms                            │   │
│  │  • Auto-scaling: 0 to N instances                   │   │
│  │  • Hobby plan: 100GB bandwidth/month                │   │
│  │  • Max execution: 10s (hobby plan)                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Build System                        │   │
│  │                                                     │   │
│  │  • Git-triggered builds from GitHub                 │   │
│  │  • Build cache for fast rebuilds                    │   │
│  │  • Preview deployments for PRs                      │   │
│  │  • Production deployments from main branch          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 4.2 Supabase Infrastructure

```
┌────────────────────────────────────────────────────────────┐
│                    SUPABASE PLATFORM                        │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   API Gateway                        │   │
│  │                                                     │   │
│  │  • Kong-based API gateway                           │   │
│  │  • Rate limiting (Supabase managed)                 │   │
│  │  • JWT validation                                   │   │
│  │  • Request routing                                  │   │
│  └──────────────┬──────────────────┬───────────────────┘   │
│                 │                  │                        │
│  ┌──────────────▼───────┐  ┌──────▼───────────────────┐   │
│  │   GoTrue Auth Server │  │  PostgREST                │   │
│  │                      │  │                           │   │
│  │  • User management   │  │  • Auto-generated REST   │   │
│  │  • Password hashing  │  │    API from PostgreSQL    │   │
│  │  • JWT issuance      │  │  • RLS enforcement        │   │
│  │  • Token refresh     │  │  • CRUD operations        │   │
│  │  • OAuth providers   │  │  • Filtering, ordering    │   │
│  │    (future)          │  │  • Pagination             │   │
│  └──────────────────────┘  └──────┬────────────────────┘   │
│                                   │                        │
│  ┌────────────────────────────────▼────────────────────┐   │
│  │              PostgreSQL 15 Database                  │   │
│  │                                                     │   │
│  │  • Free tier: 500MB storage                         │   │
│  │  • Connection pooling (PgBouncer)                   │   │
│  │  • Automatic backups                                │   │
│  │  • Row-Level Security policies                      │   │
│  │  • Extensions: uuid-ossp                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Deployment Architecture

### 5.1 CI/CD Pipeline

```
Developer         GitHub             GitHub Actions        Vercel
─────────         ──────             ──────────────        ──────

┌──────────┐     ┌──────────┐      ┌──────────────┐     ┌──────────────┐
│ Push to  │────▶│ PR       │─────▶│ CI Pipeline  │     │              │
│ feature  │     │ created  │      │              │     │              │
│ branch   │     │          │      │ 1. Install   │     │              │
└──────────┘     └──────────┘      │ 2. Lint      │     │              │
                                    │ 3. Type check│     │              │
                                    │ 4. Test      │     │              │
                                    │ 5. Build     │     │              │
                                    └──────┬───────┘     │              │
                                           │             │              │
                                    ┌──────▼───────┐     │  Preview     │
                                    │ All checks   │────▶│  Deployment  │
                                    │ pass ✅       │     │  (unique URL)│
                                    └──────────────┘     │              │
                                                         └──────────────┘

┌──────────┐     ┌──────────┐                           ┌──────────────┐
│ Merge    │────▶│ main     │──────────────────────────▶│  Production  │
│ PR       │     │ updated  │                           │  Deployment  │
└──────────┘     └──────────┘                           │  (sqlsense.  │
                                                         │   vercel.app)│
                                                         └──────────────┘
```

### 5.2 Deployment Environments

| Environment | URL | Trigger | Purpose |
|---|---|---|---|
| **Development** | `localhost:3000` | `npm run dev` | Local development |
| **Preview** | `*.vercel.app` (unique per PR) | PR push | Review and testing |
| **Production** | `sqlsense.vercel.app` | Merge to `main` | Live application |

---

## 6. Security Architecture

### 6.1 Security Zones

```
┌─────────────────────────────────────────────────────────────┐
│                   UNTRUSTED ZONE (Internet)                  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 User Browser                          │  │
│  │                                                       │  │
│  │  Security Measures:                                   │  │
│  │  • DOMPurify sanitization of all rendered SQL         │  │
│  │  • Input length validation (5000 char max)            │  │
│  │  • React JSX auto-escaping                            │  │
│  │  • No eval() or dynamic code execution                │  │
│  │  • No database connections from client                │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                  │
│                     TLS 1.3 HTTPS                           │
│                          │                                  │
├──────────────────────────┼──────────────────────────────────┤
│                          │    DMZ (Vercel Edge)              │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Security Middleware                       │  │
│  │                                                       │  │
│  │  • HSTS headers                                       │  │
│  │  • CSP headers                                        │  │
│  │  • X-Frame-Options: DENY                              │  │
│  │  • Session token validation                           │  │
│  │  • Protected route enforcement                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    TRUSTED ZONE (Supabase)                   │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Database Security                        │  │
│  │                                                       │  │
│  │  • Row-Level Security policies active                 │  │
│  │  • All operations scoped to auth.uid()                │  │
│  │  • No public read/write without auth                  │  │
│  │  • Connection pooling with SSL                        │  │
│  │  • Automatic encryption at rest                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Attack Surface Analysis

| Surface | Risk | Mitigation |
|---|---|---|
| SQL input field | XSS via crafted SQL | DOMPurify sanitization before rendering |
| SQL input field | DoS via huge input | 5000 character client + server limit |
| API routes | Unauthorized access | Supabase session validation on every API route |
| Database | Data leakage | RLS policies enforce user_id = auth.uid() |
| Environment variables | Key exposure | .env.local gitignored; Vercel env management |
| Dependencies | Supply chain attack | npm audit; lockfile integrity; minimal dependencies |

---

## 7. Scalability Architecture

### 7.1 Current Capacity (Free Tier)

| Resource | Limit | Expected Usage | Headroom |
|---|---|---|---|
| Vercel bandwidth | 100GB/month | ~5GB/month (est.) | 95% |
| Vercel serverless executions | 100,000/month | ~10,000/month (est.) | 90% |
| Supabase database | 500MB | ~50MB (est.) | 90% |
| Supabase auth | 50,000 MAU | ~500 MAU (est.) | 99% |
| Supabase bandwidth | 2GB/month | ~200MB/month (est.) | 90% |

### 7.2 Scaling Strategy

| Threshold | Action | Cost Impact |
|---|---|---|
| > 50GB/month bandwidth | Optimize asset caching, lazy loading | $0 |
| > 80GB/month bandwidth | Consider Vercel Pro ($20/month) | $20/month |
| > 400MB database | Implement data retention policies | $0 |
| > 25,000 MAU | Consider Supabase Pro ($25/month) | $25/month |
| > 50,000 monthly queries | Add Upstash Redis for rate limiting | $0-10/month |

---

## 8. Monitoring Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    MONITORING STACK                        │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Vercel       │  │ Supabase     │  │ GitHub       │   │
│  │ Analytics    │  │ Dashboard    │  │ Actions      │   │
│  │              │  │              │  │              │   │
│  │ • Page views │  │ • DB size    │  │ • CI status  │   │
│  │ • Web Vitals │  │ • Auth users │  │ • Test       │   │
│  │ • Errors     │  │ • API calls  │  │   results    │   │
│  │ • Latency    │  │ • RLS logs   │  │ • Build time │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │           Client-Side Error Boundary              │    │
│  │                                                   │    │
│  │  • React ErrorBoundary component                  │    │
│  │  • Catches rendering errors                       │    │
│  │  • Logs to console (v1.0)                         │    │
│  │  • Future: Send to error tracking service         │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 9. Disaster Recovery

| Scenario | Impact | Recovery Strategy | RTO |
|---|---|---|---|
| Vercel outage | Application unavailable | Wait for Vercel recovery (99.99% SLA) | < 1 hour |
| Supabase outage | Auth + DB unavailable | Core analysis still works (client-side); save fails gracefully | < 1 hour |
| Database corruption | Saved queries lost | Supabase automatic backups; restore from backup | < 4 hours |
| Security breach | User data compromised | Rotate all keys; notify users; Supabase audit logs | < 2 hours |
| DNS failure | Application unreachable | Vercel managed DNS with automatic failover | < 30 min |

---

## 10. Future Architecture Considerations

### 10.1 AI/LLM Integration (v2.0)

```
Client → API Route → LLM Proxy → OpenAI / Gemini API → Response
                         │
                    Rate Limiter
                    (Upstash Redis)
```

### 10.2 Real-time Features (v2.0)

```
Client ← Supabase Realtime → PostgreSQL NOTIFY/LISTEN
```

### 10.3 Offline Mode (v2.0)

```
Client → Service Worker → Cache API (for static assets)
                       → IndexedDB (for saved queries)
```

---

*This System Architecture document defines the structural foundation of SQLSense. All implementation decisions must align with the architecture described here. Changes to the architecture require this document to be updated first.*
