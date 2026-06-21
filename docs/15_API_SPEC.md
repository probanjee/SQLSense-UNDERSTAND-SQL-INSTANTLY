# SQLSense — API Specification

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document defines the complete REST API specification for SQLSense, including all endpoints, request/response formats, authentication requirements, error codes, and rate limits.

**Related Documents:**
- [14_BACKEND_SCHEMA.md](./14_BACKEND_SCHEMA.md)
- [13_DATABASE_DESIGN.md](./13_DATABASE_DESIGN.md)
- [12_AUTH_SYSTEM.md](./12_AUTH_SYSTEM.md)

---

## 1. API Overview

| Attribute | Value |
|---|---|
| **Base URL** | `https://sqlsense.vercel.app/api` |
| **Protocol** | HTTPS only |
| **Format** | JSON |
| **Authentication** | Supabase JWT via httpOnly cookies |
| **Versioning** | Not versioned in v1.0 (future: URL prefix `/api/v1/`) |

---

## 2. Authentication

All protected endpoints require a valid Supabase session cookie. The cookie is set automatically by the Supabase client SDK and verified by the server using `supabase.auth.getUser()`.

| Header/Cookie | Purpose |
|---|---|
| `sb-*-auth-token` | Supabase session cookies (set by SDK) |

**Authentication Verification Pattern:**

```typescript
const supabase = await createServerSupabaseClient();
const { data: { user }, error } = await supabase.auth.getUser();

if (error || !user) {
  return NextResponse.json(
    { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
    { status: 401 }
  );
}
```

---

## 3. Response Format

### 3.1 Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### 3.2 Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Optional technical details"
  }
}
```

---

## 4. Endpoints

### 4.1 POST `/api/queries/save`

Save a query analysis to the user's history.

| Attribute | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Yes |
| **Rate Limit** | 30 requests/minute |

#### Request Body

```json
{
  "query_text": "SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.name",
  "explanation": "This query retrieves user names along with the count of their orders by joining the users and orders tables and grouping by user name.",
  "complexity": 5,
  "optimization_tips": "[{\"id\":\"OPT-001\",\"title\":\"Consider Adding an Index\",\"description\":\"...\",\"severity\":\"info\"}]"
}
```

| Field | Type | Required | Constraints |
|---|---|---|---|
| `query_text` | string | Yes | 1–5000 characters |
| `explanation` | string | Yes | Non-empty |
| `complexity` | number | Yes | Integer, 1–10 |
| `optimization_tips` | string \| null | No | JSON string or null |

#### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "userId": "user-uuid-here",
    "queryText": "SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.name",
    "explanation": "This query retrieves user names along with the count of their orders...",
    "complexity": 5,
    "optimizationTips": [
      {
        "id": "OPT-001",
        "title": "Consider Adding an Index",
        "description": "...",
        "severity": "info"
      }
    ],
    "createdAt": "2026-06-21T14:30:00.000Z"
  },
  "message": "Query saved successfully"
}
```

#### Error Responses

| Status | Code | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid request body |
| 401 | `UNAUTHORIZED` | No valid session |
| 500 | `INTERNAL_ERROR` | Database insert failed |

#### Implementation

```typescript
// src/app/api/queries/save/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { saveQuerySchema } from '@/lib/validators/schemas';
import { transformSavedQuery } from '@/lib/transformers';

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 },
    );
  }
  
  const body = await request.json();
  const validation = saveQuerySchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(
      { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error.errors[0].message } },
      { status: 400 },
    );
  }
  
  const { data, error } = await supabase
    .from('saved_queries')
    .insert({
      user_id: user.id,
      ...validation.data,
    })
    .select()
    .single();
  
  if (error) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to save query' } },
      { status: 500 },
    );
  }
  
  return NextResponse.json(
    { success: true, data: transformSavedQuery(data), message: 'Query saved successfully' },
    { status: 201 },
  );
}
```

---

### 4.2 GET `/api/queries`

Retrieve the authenticated user's saved queries.

| Attribute | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Yes |
| **Rate Limit** | 60 requests/minute |

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `limit` | number | No | 20 | Max results to return (1–100) |
| `offset` | number | No | 0 | Number of results to skip |

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-...",
      "userId": "user-uuid",
      "queryText": "SELECT * FROM users WHERE active = true",
      "explanation": "This query retrieves all columns from the users table...",
      "complexity": 2,
      "optimizationTips": [
        { "id": "OPT-001", "title": "Avoid SELECT *", "description": "...", "severity": "warning" }
      ],
      "createdAt": "2026-06-21T14:30:00.000Z"
    }
  ]
}
```

#### Error Responses

| Status | Code | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid query parameters |
| 401 | `UNAUTHORIZED` | No valid session |
| 500 | `INTERNAL_ERROR` | Database query failed |

---

### 4.3 DELETE `/api/queries/[id]`

Delete a specific saved query.

| Attribute | Value |
|---|---|
| **Method** | DELETE |
| **Auth Required** | Yes |
| **Rate Limit** | 30 requests/minute |

#### URL Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | UUID | Yes | The saved query ID to delete |

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "message": "Query deleted successfully"
}
```

#### Error Responses

| Status | Code | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid UUID format |
| 401 | `UNAUTHORIZED` | No valid session |
| 404 | `NOT_FOUND` | Query not found or not owned by user |
| 500 | `INTERNAL_ERROR` | Database delete failed |

#### Implementation

```typescript
// src/app/api/queries/[id]/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 },
    );
  }
  
  // RLS ensures user can only delete their own queries
  const { error } = await supabase
    .from('saved_queries')
    .delete()
    .eq('id', id);
  
  if (error) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete query' } },
      { status: 500 },
    );
  }
  
  return NextResponse.json(
    { success: true, data: { id }, message: 'Query deleted successfully' },
    { status: 200 },
  );
}
```

---

## 5. Error Code Reference

| Code | HTTP Status | Description |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body or parameters failed validation |
| `UNAUTHORIZED` | 401 | No valid authentication session |
| `FORBIDDEN` | 403 | Authenticated but not authorized for this action |
| `NOT_FOUND` | 404 | Requested resource does not exist |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## 6. Rate Limiting

Rate limiting is handled at the application level for v1.0 using simple in-memory tracking. Future versions will use Upstash Redis.

| Endpoint | Rate Limit | Window |
|---|---|---|
| `POST /api/queries/save` | 30 requests | Per minute per user |
| `GET /api/queries` | 60 requests | Per minute per user |
| `DELETE /api/queries/[id]` | 30 requests | Per minute per user |

---

## 7. CORS Configuration

| Setting | Value |
|---|---|
| **Allowed Origins** | `https://sqlsense.vercel.app` (production), `http://localhost:3000` (development) |
| **Allowed Methods** | GET, POST, DELETE, OPTIONS |
| **Allowed Headers** | Content-Type, Authorization |
| **Credentials** | true |

---

## 8. Future API Endpoints

| Endpoint | Version | Description |
|---|---|---|
| `GET /api/queries/stats` | v1.1 | Get user's query statistics |
| `GET /api/queries/[id]` | v1.1 | Get a single saved query by ID |
| `POST /api/queries/share` | v2.0 | Generate a shareable link for a query |
| `GET /api/shared/[shareId]` | v2.0 | View a shared query (public) |
| `POST /api/ai/explain` | v2.0 | AI-powered explanation (proxy to LLM) |

---

*This API Specification is the contract between the frontend and backend of SQLSense. All API implementations must conform to the request/response formats defined here.*
