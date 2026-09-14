# Security Evaluation

## Summary

The project contains a functional JWT authentication flow and password hashing, but the overall security model is not production-grade. The most important concerns are secret exposure, weak admin authorization, unrestricted CORS, and limited input validation.

## Findings

### Critical

#### 1. Secrets committed to repository

- Location: `Backend/.env`
- Issue: Real secrets were found in the environment file, including MongoDB URI, Cloudinary keys, JWT secret, and admin credentials.
- Recommendation: Rotate secrets immediately and do not keep live secrets in version control.

#### 2. Weak admin authorization model

- Location: `Backend/middleware/AdminAuthMidleware.js`
- Issue: Admin access is not implemented through a proper role-based system.
- Recommendation: Issue JWTs with role claims and validate those claims explicitly.

### High

#### 3. Unrestricted CORS

- Location: `Backend/Server.js`
- Issue: `app.use(cors())` is permissive.
- Recommendation: Restrict allowed origins to trusted values.

#### 4. Limited validation and rate limiting

- Location: API routes and controllers
- Issue: Validation is minimal and there is no visible rate limiting.
- Recommendation: Add centralized request validation and rate limiting.

#### 5. File upload validation remains weak

- Location: `Backend/controllers/ProductController.js`
- Issue: No obvious file type and size restrictions are enforced.
- Recommendation: Enforce policies for MIME type, size, and upload sanitization.

### Medium

#### 6. Authorization design is still simplistic

- Location: backend route protection and middleware
- Issue: The app is structured around middleware but not an explicit RBAC design.
- Recommendation: Add clear user/admin roles and authorization checks.

## Security Status

This project is functional, but it should not be described as secure or production-safe. The current state is closer to a learning/prototype implementation than a hardened application.
