# CWNU Learning System

A monorepo for the CWNU learning platform serving international students, teachers, and administrators.

## Features

- **Attendance Management** - Session creation, QR/manual check-in, reporting
- **Homework System** - Assignment publishing, submissions, grading
- **Course Management** - Course catalog, enrollment, teacher assignments
- **Code Playgrounds** - HTML, CSS, JavaScript, C++, Java, Kotlin execution
- **AI Assistance** - Syntax help, compiler error explanation, guided learning

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | TypeScript (ES modules, Node.js 20+) |
| Database | MongoDB |
| Auth | JWT access + refresh tokens, bcrypt password hashing |
| Frontend | Next.js 15 App Router, React 19 |
| Package Manager | npm workspaces |

## Quick Start

### Prerequisites

- Node.js 20+
- MongoDB running locally on port 27017

### Install & Run

```bash
# Install dependencies
npm install

# Start backend (port 4000)
npm run dev:backend

# Start web (port 3000) - in another terminal
npm run dev:web
```

Before starting the backend, make sure your local MongoDB service is running on `127.0.0.1:27017`.

### Environment Setup

**Backend** (`apps/backend/.env`):
```bash
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/cwnu_learning_system
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
```

**Web** (`apps/web/.env.local`):
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new student
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user profile

### Health Check
- `GET /api/health` - Service status

## Monorepo Structure

```
├── apps/
│   ├── backend/          # TypeScript backend API
│   └── web/              # Next.js frontend
├── packages/
│   └── shared/           # Shared types and contracts
├── docs/
│   ├── architecture.md   # System architecture
│   └── roadmap.md        # Development roadmap
└── scripts/
```

## Development Commands

```bash
npm install              # Bootstrap all workspaces
npm run dev:backend      # Start backend dev server
npm run dev:web          # Start Next.js dev server
npm run build            # Build all workspaces
npm run typecheck        # Type-check all workspaces
npm run lint             # Lint all workspaces
npm run graph            # Generate file structure graph
```

## Contributor Onboarding

- Student handbook: [docs/student-contribution-guide.md](./docs/student-contribution-guide.md)
- HTML slide deck: [docs/slides/student-contribution-workshop.html](./docs/slides/student-contribution-workshop.html)
- Contribution rules: [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

Internal project for CWNU.
