# CWNU Learning System Student Contribution Guide

This guide is for students who want to contribute code, documentation, testing, UI improvements, and bug fixes to the CWNU Learning System.

Presentation version:

- `docs/slides/student-contribution-workshop.html`

## Why This Repository Matters

This project is a shared learning platform for:

- international students
- teachers
- administrators

It includes:

- attendance management
- homework management
- course workflows
- code playgrounds
- AI-assisted learning features

Contributing to this repository helps you practice real engineering collaboration, not just isolated homework.

## Core GitHub Terms

### Repository

A repository, or repo, is the project home on GitHub. It stores code, docs, issues, pull requests, and commit history.

### Clone

A clone is your local copy of the repository on your own computer.

### Fork

A fork is your own GitHub copy of someone else's repository. Students usually contribute through forks unless they already have direct write access.

### Branch

A branch is a separate line of work. Create one branch per task, feature, or bug fix.

Examples:

- `docs/github-onboarding`
- `fix/attendance-api-shape`
- `feature/student-homework-filter`

### Commit

A commit is a saved checkpoint with a message describing the change.

Examples:

- `docs: add student contribution guide`
- `fix: return attendance sessions under api envelope`
- `feat: add teacher homework status cards`

### Pull Request

A pull request, or PR, asks maintainers to review and merge your branch into the main project branch.

### Review

A review is feedback on your PR. You may need to update code, improve tests, or explain a design choice before the PR is approved.

### Merge

A merge brings approved changes into the main branch. In this project, students should assume maintainers merge PRs. Do not merge your own PR unless you were explicitly told to do so.

## Recommended Contribution Model

Use this workflow by default:

1. Fork the repository on GitHub.
2. Clone your fork to your computer.
3. Add the original repository as `upstream`.
4. Create a new branch from `main`.
5. Make one focused change.
6. Test your change.
7. Commit and push your branch.
8. Open a PR from your fork branch to the main repository.
9. Respond to review comments.
10. Let a maintainer merge the PR.

## First-Time Setup

Install these tools first:

- Git
- Node.js 20 or newer
- npm
- GitHub account
- a code editor such as VS Code

Optional but recommended:

- GitHub CLI `gh`
- Docker Desktop or Docker Engine
- Codex CLI

## Configure Git Identity

Run these commands once on your computer:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Check the result:

```bash
git config --global --list
```

## Set Up Git SSH Access

SSH lets you push and pull without typing your password every time.

### 1. Check for an existing SSH key

```bash
ls -la ~/.ssh
```

If you already have `id_ed25519.pub`, you can usually reuse it.

### 2. Create a new SSH key if needed

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Accept the default file location unless you have a reason to change it.

### 3. Start the SSH agent and add the key

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 4. Copy the public key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the full output and add it to GitHub:

- GitHub
- Settings
- SSH and GPG keys
- New SSH key

### 5. Test the connection

```bash
ssh -T git@github.com
```

Expected result:

You should see a message saying GitHub authenticated you successfully.

## Set Up GitHub CLI

The GitHub CLI is useful for authentication, repo management, and PR workflows.

### Arch Linux

```bash
sudo pacman -S --needed github-cli
```

### Log in

```bash
gh auth login --hostname github.com --git-protocol ssh --web
```

Recommended choices:

- `GitHub.com`
- `SSH`
- browser login flow
- skip SSH key upload if your current SSH key already works

### Verify

```bash
gh auth status
gh auth setup-git
```

Useful commands:

```bash
gh repo view
gh repo list your-username --limit 10
gh pr create
gh pr view
gh issue list
```

## Fork And Clone The Project

### 1. Fork the repository on GitHub

Create your own copy under your GitHub account.

### 2. Clone your fork

```bash
git clone git@github.com:YOUR_USERNAME/CWNU_learning_system.git
cd CWNU_learning_system
```

### 3. Add the original repository as `upstream`

```bash
git remote add upstream git@github.com:ORIGINAL_OWNER/CWNU_learning_system.git
git remote -v
```

You should see:

- `origin` pointing to your fork
- `upstream` pointing to the main course repository

## Keep Your Fork Updated

Before starting new work:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

If your course workflow prefers rebase:

```bash
git checkout main
git fetch upstream
git rebase upstream/main
git push origin main --force-with-lease
```

Use the policy your instructor asks for. If no special rule is given, `merge` is simpler for beginners.

## Create A Branch

Create a new branch for each task:

```bash
git checkout -b docs/contributing-guide
```

Do not work directly on `main`.

Good branch names:

- `docs/student-onboarding`
- `fix/homework-list-empty-state`
- `feature/playground-language-cards`

## Make Changes Carefully

Keep each branch small and focused.

Good examples:

- one docs improvement
- one bug fix
- one UI improvement
- one API endpoint update

Bad examples:

- docs, backend, frontend, refactor, and deployment changes all mixed together

## Install Project Dependencies

From the repository root:

```bash
npm install
```

If you want local MongoDB through Docker:

```bash
docker-compose up -d
```

## Run The Project Locally

Backend:

```bash
npm run dev:backend
```

Web app:

```bash
npm run dev:web
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

Run the checks relevant to your change before opening a PR.

## Commit Your Work

Stage files:

```bash
git add .
```

Commit with a clear message:

```bash
git commit -m "docs: add student contribution handbook"
```

Recommended prefixes:

- `docs:`
- `feat:`
- `fix:`
- `refactor:`
- `test:`
- `chore:`

## Push Your Branch

```bash
git push -u origin docs/contributing-guide
```

After the first push, future pushes can usually be:

```bash
git push
```

## Open A Pull Request

Use GitHub web UI or GitHub CLI.

### Web

Open your fork on GitHub and click the PR banner for your branch.

### GitHub CLI

```bash
gh pr create
```

PR title should be short and specific.

Examples:

- `docs: add student contribution handbook`
- `fix: normalize backend api response typing`

PR description should explain:

- what changed
- why it changed
- how you tested it
- screenshots if the change is visual

## PR Checklist

Before requesting review, confirm:

- branch is focused on one task
- code builds or typechecks if relevant
- no secrets or private keys are committed
- `.env` files are not committed
- commit messages are readable
- PR description explains the change

## Review And Merge Workflow

What usually happens:

1. You open a PR.
2. Maintainers or instructors review it.
3. You receive comments or approval.
4. You push updates to the same branch if changes are requested.
5. A maintainer merges the PR.

Common merge method:

- squash merge

Squash merge keeps `main` cleaner by combining many small student commits into one final commit.

## Common Git Problems

### I changed the wrong file

Check your status:

```bash
git status --short
```

### My branch is behind `main`

Sync with upstream and update your branch.

### I forgot to create a branch

Create one immediately:

```bash
git checkout -b your-new-branch
```

### I have merge conflicts

Read the conflict markers carefully, fix the file manually, test again, then commit the resolved files.

### I accidentally committed secrets

Stop and tell the maintainer immediately. Do not keep pushing. Secrets must be rotated, not just deleted from one file.

## Set Up Codex CLI

Codex can help with code reading, planning, and implementation. Students should treat it as an assistant, not as a substitute for understanding the code.

### Install Codex CLI

This machine uses the npm package:

```bash
npm install -g @openai/codex
```

Check the install:

```bash
codex --help
```

### Log in

Two common options are available in the local CLI:

#### Use ChatGPT login

```bash
codex login
codex login status
```

#### Use an API key

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

Check the status:

```bash
codex login status
```

### Start Codex In The Project

```bash
cd CWNU_learning_system
codex
```

Useful options from the local CLI:

- `codex --help`
- `codex exec`
- `codex review`
- `codex resume`

### Good Codex Usage

Ask Codex to:

- explain a module
- help plan a small feature
- draft tests
- review a PR branch
- suggest a refactor before you edit

Do not use Codex blindly. You still need to:

- understand the change
- run tests
- read the diff
- explain your own PR

## Classroom Contribution Rules

- do not push directly to `main`
- do not rewrite another student's branch without permission
- do not commit `.env`, tokens, keys, or passwords
- do not open huge PRs for unrelated work
- do not use AI output you do not understand
- do not merge your own PR unless the instructor says so

## Suggested First Contributions

Good first tasks:

- improve docs
- fix typos or labels
- improve empty states in the UI
- add validation messages
- improve test coverage
- clean up component naming
- improve accessibility or responsive layout

## Final Advice

Small, clean, tested contributions are better than large, messy ones.

The goal is not only to get code merged. The real goal is to learn collaborative software engineering:

- version control
- code review
- communication
- ownership
- technical judgment
