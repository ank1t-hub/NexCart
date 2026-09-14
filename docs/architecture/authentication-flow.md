# Authentication Flow

## Current Implementation

The application uses JWT-based authentication.

```mermaid
sequenceDiagram
    User->>Frontend: Register / Login
    Frontend->>Backend: POST /api/user/register or /api/user/login
    Backend->>Database: Check user email
    Database-->>Backend: User data
    Backend->>Backend: bcrypt password comparison
    Backend-->>Frontend: JWT token
    Frontend->>Frontend: Store token in local storage
    Frontend->>Backend: Protected request with token header
    Backend->>Backend: JWT verification via middleware
    Backend-->>Frontend: Requested data or error response
```

## Admin Authentication

The admin flow also uses a token header, but the actual authorization check is based on a weak comparison pattern rather than an explicit role model.

## Current Observations

- User auth is implemented with JWT and bcrypt
- Admin auth is present but not robust
- Token is stored in local storage in the client applications
- Protected routes are enforced by middleware

## Important Limitation

This authentication flow should not be treated as production-grade authorization. The current implementation is functional for a tutorial/project-style app, but it is not a strong real-world authorization model.
