# CWNU Learning System Coordination

This file is the shared coordination hub for parallel implementation work.

## Target Product

Monorepo for a CWNU learning system with:

- `apps/backend`: TypeScript backend for auth, courses, attendance, homework, playground metadata, AI assistant endpoints
- `apps/web`: Next.js web frontend for students, teachers, and admins
- `packages/shared`: shared TypeScript types, constants, and API contracts

## Current Architecture Decisions

- Package manager: `npm` workspaces
- Language: TypeScript (ES modules)
- Database: MongoDB (local localhost:27017)
- Backend framework: Custom lightweight HTTP framework with module-based organization
- Web framework: Next.js 15 App Router
- Auth: JWT access tokens (1h) + refresh tokens (30d), bcrypt password hashing
- Mobile: deferred to a later phase after web MVP
- Playground execution: separate runner service in a later phase, not in the main backend process
- AI integration: provider-agnostic service contract, with DeepSeek or other LLM providers behind an adapter

## Ownership

### Main agent

- Root workspace files
- coordination and docs
- repository structure tooling
- merge and integration pass

### Worker A

- Owns `apps/backend/**`
- Must not edit `apps/web/**` or `packages/shared/**`

### Worker B

- Owns `apps/web/**`
- Must not edit `apps/backend/**` or `packages/shared/**`

### Worker C

- Owns `packages/shared/**`
- Must not edit `apps/backend/**` or `apps/web/**`

## Interfaces To Follow

- Shared domain exports live in `packages/shared/src`
- Backend should import shared contracts instead of redefining domain types
- Web should consume shared contracts and target backend route shapes declared in shared package

## Implementation Priority

1. Shared domain models and API contracts
2. Backend module skeleton using those contracts
3. Web route and dashboard skeleton using those contracts
4. Integration review and follow-up TODOs

## Agent Notes

Workers should append concise notes under their section in their own branch or workspace copy if needed and report changed files explicitly in their final response.

## Merge Outcome

### Main agent

- created root workspace files, docs, Docker Mongo setup, and the structure graph generator
- integrated backend and web with `packages/shared`
- normalized backend routes under `/api`
- implemented MongoDB persistence layer
- implemented JWT authentication with password hashing
- added input validation framework
- connected web frontend API client to backend endpoints

### Worker A result

- backend scaffold created under `apps/backend`
- module layout covers auth, users, courses, attendance, homework, playgrounds, and ai

### Worker B result

- web scaffold created under `apps/web`
- landing page plus student, teacher, admin, and playground dashboard routes

### Worker C result

- shared contracts created under `packages/shared`
- domain types, constants, API envelope types, and seed data available for cross-app reuse

## Current Status

### Completed

- Monorepo bootstrap with npm workspaces
- MongoDB persistence layer wired up
- Authentication with JWT tokens and bcrypt password hashing
- Input validation framework
- Web API client with auth token management
- TypeScript type checking passes across all workspaces
- Courses module with MongoDB repository (CRUD + enrollments)
- Attendance module with MongoDB repository (sessions, records, summaries)
- Homework module with MongoDB repository (assignments, submissions, grading)

### Remaining Work

- Web dashboards need to consume real API data instead of mock data
- Integration tests for core modules
- Playground execution needs an isolated runner service
- LLM provider integration needs a live adapter implementation
- Auth middleware for protecting routes (teacher/admin only)
- Seed script to populate initial data
