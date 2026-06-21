# SQLSense — Deployment Guide

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This guide provides step-by-step instructions for deploying SQLSense to production on Vercel with Supabase as the backend. It covers prerequisite setup, environment configuration, build verification, deployment execution, and post-deployment verification.

**Related Documents:**
- [07_TRD.md](./07_TRD.md)
- [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md)
- [16_SECURITY_PLAN.md](./16_SECURITY_PLAN.md)

---

## 1. Prerequisites

### 1.1 Accounts Required

| Service | URL | Plan | Purpose |
|---|---|---|---|
| GitHub | github.com | Free | Source code repository |
| Vercel | vercel.com | Hobby (Free) | Application hosting |
| Supabase | supabase.com | Free | Auth + PostgreSQL database |

### 1.2 Local Development Requirements

| Tool | Version | Verification |
|---|---|---|
| Node.js | ≥ 20.x LTS | `node --version` |
| npm | ≥ 10.x | `npm --version` |
| Git | ≥ 2.40 | `git --version` |

---

## 2. Supabase Setup

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **"New Project"**.
3. Configure:
   - **Name:** `sqlsense`
   - **Database Password:** Generate a strong password (save securely).
   - **Region:** Choose closest to target users.
   - **Plan:** Free.
4. Click **"Create new project"**. Wait for provisioning (~2 minutes).

### 2.2 Retrieve Connection Details

Navigate to **Project Settings → API**:

| Key | Where to Find | Environment Variable |
|---|---|---|
| Project URL | Settings → API → Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| Anon Key | Settings → API → Project API keys → `anon` `public` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Service Role Key | Settings → API → Project API keys → `service_role` `secret` | `SUPABASE_SERVICE_ROLE_KEY` |

### 2.3 Run Database Migration

1. Navigate to **SQL Editor** in Supabase Dashboard.
2. Click **"New query"**.
3. Paste the migration SQL from [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md) Section 9.1.
4. Click **"Run"**.
5. Verify:
   - Table `saved_queries` exists (Table Editor → saved_queries).
   - RLS is enabled (green shield icon).
   - Policies exist (Authentication → Policies → saved_queries).

### 2.4 Configure Auth Settings

Navigate to **Authentication → Providers**:

1. **Email:** Ensure "Enable Email provider" is ON.
2. **Confirm email:** Set to OFF for v1.0 (simplifies sign-up flow). Enable in v1.1.
3. **Minimum password length:** Set to 8.
4. **Site URL:** Set to `https://sqlsense.vercel.app` (update after deployment).
5. **Redirect URLs:** Add `https://sqlsense.vercel.app/**`.

---

## 3. GitHub Repository Setup

### 3.1 Create Repository

```bash
# Initialize local repository (if not already done)
git init
git add .
git commit -m "feat: initial project setup"

# Create GitHub repository (via CLI or web)
gh repo create sqlsense --public --source=. --push

# Or manually:
git remote add origin https://github.com/<username>/sqlsense.git
git branch -M main
git push -u origin main
```

### 3.2 Configure GitHub Settings

1. **Branch protection** (optional for solo developer):
   - Settings → Branches → Add rule for `main`.
   - Require status checks to pass (when CI is set up).
2. **Secrets** (for GitHub Actions CI):
   - Settings → Secrets → Actions → Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 4. Vercel Deployment

### 4.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New..." → "Project"**.
3. Select the `sqlsense` repository.
4. Configure:
   - **Framework Preset:** Next.js (auto-detected).
   - **Root Directory:** `./` (default).
   - **Build Command:** `next build` (default).
   - **Output Directory:** `.next` (default).
5. **Environment Variables:** Add the following:

| Name | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |

6. Click **"Deploy"**.

### 4.2 Verify Initial Deployment

1. Wait for the build to complete (~60-120 seconds).
2. Click the deployment URL (e.g., `sqlsense.vercel.app`).
3. Verify the landing page loads correctly.
4. Check the browser console for errors.

### 4.3 Configure Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains.
2. Add your custom domain.
3. Follow DNS configuration instructions.
4. Update Supabase Auth "Site URL" to match.

---

## 5. Environment Configuration

### 5.1 Local Development (.env.local)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Server-side only
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 5.2 Vercel Environment Variables

Set via Vercel Dashboard → Settings → Environment Variables:

| Variable | Environments | Encrypted |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development | No (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development | Yes |

### 5.3 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` is committed with placeholder values
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is **NOT** prefixed with `NEXT_PUBLIC_`
- [ ] No API keys are hardcoded in source code
- [ ] Vercel environment variables are correctly scoped

---

## 6. CI/CD Pipeline

### 6.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  ci:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Test
        run: npm run test
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

### 6.2 Deployment Flow

```
Feature Branch → PR → CI Pipeline (lint + test + build) → Preview Deployment
                        ↓ (on merge to main)
                  Production Deployment (automatic via Vercel)
```

---

## 7. Post-Deployment Verification

### 7.1 Smoke Test Checklist

| Test | URL | Expected Result |
|---|---|---|
| Landing page loads | `/` | Hero section, SQL editor visible |
| Sign-up works | `/sign-up` | Account created, redirect to dashboard |
| Sign-in works | `/sign-in` | Auth successful, redirect to dashboard |
| SQL analysis works | `/` | Paste query → see results |
| Save query works | `/` (authenticated) | Toast: "Query saved!" |
| History loads | `/history` | Saved query visible |
| Delete works | `/history` | Query removed after confirmation |
| Examples page loads | `/examples` | Example cards visible |
| About page loads | `/about` | Content displayed |
| Footer CTA works | Any page | "Built for Digital Heroes" links to external site |
| Mobile layout | Resize browser | Hamburger menu, stacked layout |
| HTTPS enforced | `http://sqlsense.vercel.app` | Redirects to HTTPS |

### 7.2 Security Verification

| Test | How | Expected Result |
|---|---|---|
| Security headers | Visit securityheaders.com | Grade A or above |
| HTTPS | Browser lock icon | Valid SSL certificate |
| RLS | Try accessing other user's data via API | Access denied |
| No console errors | Browser DevTools | No errors in production |

---

## 8. Rollback Procedure

If a deployment introduces critical issues:

1. **Vercel Dashboard → Deployments**.
2. Find the last known-good deployment.
3. Click **"..." → "Promote to Production"**.
4. Verify the rollback resolved the issue.
5. Investigate the root cause on the feature branch.

---

## 9. Monitoring

### 9.1 Vercel Dashboard

| Metric | Where | Alert Threshold |
|---|---|---|
| Deployment status | Deployments tab | Any failed build |
| Bandwidth usage | Usage tab | > 80GB/month |
| Serverless execution | Usage tab | > 80,000/month |
| Web Vitals | Analytics tab | LCP > 3s |

### 9.2 Supabase Dashboard

| Metric | Where | Alert Threshold |
|---|---|---|
| Database size | Database → Usage | > 400MB |
| Auth users | Authentication → Users | Informational |
| API requests | Settings → API | Informational |

---

*This Deployment Guide provides the complete procedure for deploying SQLSense from zero to production. Follow each step in order for a successful deployment.*
