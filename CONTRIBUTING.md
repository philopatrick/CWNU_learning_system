# Contributing

This repository is intended to be contributed to by students. Keep the workflow simple, reviewable, and safe.

## Start Here

Read these first:

- [README.md](./README.md)
- [docs/student-contribution-guide.md](./docs/student-contribution-guide.md)
- [docs/slides/student-contribution-workshop.html](./docs/slides/student-contribution-workshop.html)

## Default Workflow

1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Add the main repository as `upstream`.
4. Sync your local `main`.
5. Create a new branch for one task only.
6. Make the change.
7. Run the relevant checks.
8. Commit with a clear message.
9. Push your branch to your fork.
10. Open a pull request.

## Branch Rules

- Do not work directly on `main`.
- Use one branch per task.
- Keep PRs small and focused.

Examples:

- `docs/student-onboarding`
- `fix/attendance-response-shape`
- `feature/homework-filter`

## Commit Rules

Use short, clear commit messages.

Examples:

- `docs: add contribution guide`
- `fix: normalize attendance service response`
- `feat: add teacher dashboard summary`

## Pull Request Rules

Every PR should explain:

- what changed
- why it changed
- how it was tested

For UI changes, add screenshots when possible.

## Before Opening A PR

Run the checks that match your change:

```bash
npm run typecheck
npm run lint
npm run build
```

If your change is docs-only, say that clearly in the PR.

## Safety Rules

- Do not commit `.env` files, tokens, or private keys.
- Do not merge your own PR unless a maintainer asked you to.
- Do not open one PR for many unrelated changes.
- Do not submit AI-generated code you do not understand.

## Questions

If you are unsure how to contribute, open a GitHub issue using the question template or ask the maintainer before starting a large change.
