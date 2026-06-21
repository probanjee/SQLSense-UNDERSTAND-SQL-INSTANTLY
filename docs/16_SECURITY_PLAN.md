# SQLSense — Security Plan

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This Security Plan documents all security measures, threat mitigations, and security-by-design decisions in SQLSense. It serves as the reference for security reviews, audits, and incident response.

**Related Documents:**
- [17_SECURITY_AUDIT.md](./17_SECURITY_AUDIT.md)
- [12_AUTH_SYSTEM.md](./12_AUTH_SYSTEM.md)
- [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md)

---

## 1. Security Architecture Principle

**SQLSense never executes SQL.** This is the foundational security principle. The application is a parser and analyzer — it reads SQL text, generates an Abstract Syntax Tree (AST), and produces educational explanations. At no point does user-provided SQL touch any database engine.

---

## 2. Threat Model

### 2.1 STRIDE Analysis

| Threat | Category | Risk Level | Mitigation |
|---|---|---|---|
| XSS via SQL input | Spoofing/Tampering | **High** | DOMPurify sanitization; React JSX auto-escaping |
| SQL injection (traditional) | Tampering | **None** | No SQL execution — architecturally impossible |
| Credential stuffing | Spoofing | **Medium** | Supabase rate limiting; password validation |
| Session hijacking | Spoofing | **Low** | httpOnly cookies; secure flag; HTTPS only |
| Data leakage (cross-user) | Information Disclosure | **High** | Row-Level Security enforced by PostgreSQL |
| CSRF attacks | Tampering | **Low** | Token-based auth; SameSite cookies |
| DoS via large input | Denial of Service | **Medium** | 5000 character limit; client-side validation |
| Dependency vulnerabilities | Elevation of Privilege | **Medium** | npm audit; minimal dependencies; lockfile |
| Environment variable exposure | Information Disclosure | **High** | .env.local gitignored; Vercel env management |
| Clickjacking | Tampering | **Low** | X-Frame-Options: DENY |

### 2.2 Attack Surface

```
┌──────────────────────────────────────────────────┐
│                ATTACK SURFACE                     │
│                                                  │
│  ┌────────────────┐    Risk: HIGH               │
│  │ SQL Input Field│    Mitigation: DOMPurify,    │
│  │                │    length limit, no exec     │
│  └────────────────┘                              │
│                                                  │
│  ┌────────────────┐    Risk: MEDIUM              │
│  │ Auth Forms     │    Mitigation: Zod, rate     │
│  │ (email, pass)  │    limiting, bcrypt          │
│  └────────────────┘                              │
│                                                  │
│  ┌────────────────┐    Risk: MEDIUM              │
│  │ API Routes     │    Mitigation: Auth check,   │
│  │ (/api/*)       │    input validation, RLS     │
│  └────────────────┘                              │
│                                                  │
│  ┌────────────────┐    Risk: LOW                 │
│  │ Static Pages   │    Mitigation: CSP headers,  │
│  │ (about, etc.)  │    no user input rendered    │
│  └────────────────┘                              │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 3. Security Controls

### 3.1 Input Validation

| Control | Implementation | Scope |
|---|---|---|
| SQL input length limit | Zod schema: max 5000 characters | SQL editor input |
| SQL input sanitization | DOMPurify before rendering | All displayed SQL text |
| Email format validation | Zod email() validator | Auth forms |
| Password length validation | Zod min(8) max(72) | Auth forms |
| API body validation | Zod schemas on all API routes | All POST requests |
| UUID format validation | Zod uuid() validator | Delete operations |

### 3.2 Output Sanitization

| Control | Implementation | Scope |
|---|---|---|
| HTML escaping | React JSX auto-escaping (default) | All rendered text |
| DOMPurify sanitization | DOMPurify.sanitize() before rendering | User-provided SQL in analysis output |
| No dangerouslySetInnerHTML | Prohibited for user content | Codebase-wide rule |

### 3.3 Authentication Security

| Control | Implementation |
|---|---|
| Password hashing | Supabase/GoTrue bcrypt (10 rounds) |
| JWT tokens | 1-hour access token, 60-day refresh token |
| Session cookies | httpOnly, secure, sameSite=lax |
| Session refresh | Automatic via middleware on every request |
| Protected routes | Middleware-enforced redirects |
| Rate limiting | Supabase built-in rate limiting on auth endpoints |

### 3.4 Data Security

| Control | Implementation |
|---|---|
| Row-Level Security | PostgreSQL RLS policies on saved_queries |
| Data isolation | auth.uid() = user_id on SELECT, INSERT, DELETE |
| CASCADE delete | Deleting a user deletes all their saved queries |
| No UPDATE policy | Saved queries are immutable once created |
| Environment variables | .env.local (gitignored), Vercel environment variables |

### 3.5 Network Security

| Control | Implementation |
|---|---|
| HTTPS enforcement | Vercel automatic SSL/TLS |
| HSTS | Strict-Transport-Security header |
| CSP | Content-Security-Policy header |
| X-Frame-Options | DENY (prevent iframe embedding) |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |

### 3.6 Security Headers (next.config.ts)

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];
```

---

## 4. Security Checklist

### Pre-Development
- [x] Security architecture reviewed
- [x] Threat model documented
- [x] Security requirements defined
- [x] Dependency security baseline established

### Development
- [ ] DOMPurify integrated for all user content rendering
- [ ] Zod validation on all API routes
- [ ] RLS policies created and tested
- [ ] Security headers configured in next.config.ts
- [ ] Environment variables properly scoped (NEXT_PUBLIC_ only for safe values)
- [ ] No console.log of sensitive data
- [ ] No hardcoded credentials in source code
- [ ] .env.local in .gitignore
- [ ] .env.example committed with placeholder values

### Pre-Deployment
- [ ] npm audit with 0 critical/high vulnerabilities
- [ ] Security headers verified with securityheaders.com
- [ ] RLS policies tested with multiple users
- [ ] HTTPS enforced on production domain
- [ ] Lighthouse security audit passed
- [ ] Supabase Dashboard: auth settings reviewed
- [ ] Supabase Dashboard: RLS enabled on all tables

### Post-Deployment
- [ ] Security monitoring active (Vercel + Supabase dashboards)
- [ ] Dependency updates schedule established (monthly)
- [ ] Incident response plan documented

---

## 5. Incident Response Plan

### 5.1 Severity Levels

| Level | Description | Response Time | Example |
|---|---|---|---|
| **P0 — Critical** | Data breach, active exploitation | Immediate (< 1 hour) | Unauthorized data access |
| **P1 — High** | Vulnerability with exploit potential | < 4 hours | XSS vulnerability discovered |
| **P2 — Medium** | Vulnerability without known exploit | < 24 hours | Dependency vulnerability |
| **P3 — Low** | Minor security improvement | < 1 week | Missing security header |

### 5.2 Response Procedure

1. **Detect:** Identify the security issue via monitoring, user report, or audit.
2. **Assess:** Determine severity using the matrix above.
3. **Contain:** Immediately mitigate the issue (e.g., revoke keys, disable feature).
4. **Fix:** Develop and test a fix.
5. **Deploy:** Deploy the fix to production.
6. **Review:** Post-incident review; update security plan if needed.

### 5.3 Key Rotation

| Secret | Rotation Trigger | Procedure |
|---|---|---|
| Supabase Anon Key | Key exposure | Regenerate in Supabase Dashboard; update Vercel env |
| Supabase Service Role Key | Key exposure | Regenerate in Supabase Dashboard; update Vercel env |
| GitHub deploy token | Token exposure | Revoke in GitHub; create new token in Vercel |

---

## 6. Compliance Considerations

| Standard | Relevance | Status |
|---|---|---|
| GDPR | User data storage (EU users) | Partially addressed (data deletion supported) |
| OWASP Top 10 | Web application security | Addressed in threat model |
| SOC 2 | Not applicable for v1.0 | N/A |

---

## 7. Future Security Enhancements

| Enhancement | Version | Description |
|---|---|---|
| Rate limiting (Upstash Redis) | v1.1 | Per-user API rate limiting |
| Content Security Policy (strict) | v1.1 | Remove unsafe-inline, use nonces |
| Subresource Integrity (SRI) | v1.1 | Verify integrity of external resources |
| Security audit (third-party) | v2.0 | Professional penetration testing |
| Account deletion | v1.1 | Allow users to delete their account and all data |
| Audit logging | v2.0 | Log all security-relevant events |

---

*This Security Plan documents all security measures in SQLSense. It should be reviewed before every release and updated when new threats or mitigations are identified.*
