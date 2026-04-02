# Architecture Overview

## Primary Users

- international students
- teachers
- administrators

## Product Areas

- identity and role-based access
- course and enrollment management
- attendance check-in and reporting
- homework publishing, submission, and review
- code playgrounds and guided programming practice
- AI-assisted help for syntax, compiler errors, and learning guidance

## System Shape

- `apps/backend`: API, domain services, and orchestration
- `apps/web`: browser-based experience for all user roles
- `packages/shared`: shared contracts and domain types
- future runner service: isolated code execution for compiled languages

## Execution Model For Playgrounds

The main backend should not compile or execute untrusted code directly.

Recommended future split:

1. backend stores exercises, submissions, and execution requests
2. runner service executes code in isolated containers or sandboxed jobs
3. backend stores result summaries and AI feedback metadata

## AI Integration Model

- backend exposes an AI assistance endpoint per playground or exercise context
- provider access is abstracted behind a service interface
- AI gives hints, syntax corrections, and explanations
- final grading logic should remain deterministic and server-controlled

## MVP Sequence

1. user auth and role model
2. courses and enrollment
3. attendance flows
4. homework flows
5. basic web dashboards
6. HTML, CSS, and JavaScript playground
7. AI help on playgrounds
8. compiled-language runner
