# Git Workflow & Branching Strategy

This document outlines the Git workflow, branching strategy, and commit conventions for the Luxelle Landing Page project. Following this guide ensures code quality, easy collaboration, and professional version control practices.

## 📋 Table of Contents

- [Branching Strategy](#branching-strategy)
- [Commit Conventions](#commit-conventions)
- [Tagging Strategy](#tagging-strategy)
- [Pull Request Workflow](#pull-request-workflow)
- [Release Process](#release-process)
- [Common Workflows](#common-workflows)

---

## Branching Strategy

We follow a **Git Flow** branching model with the following branch structure:

### Main Branches

#### `main` (Production)
- **Purpose**: Production-ready code only
- **Protection**: Requires pull request reviews and status checks
- **Merge From**: Release branches and hotfixes only
- **Deploy Trigger**: Automatic deployment to production
- **Versioning**: Must be tagged with semantic versions

#### `develop` (Integration)
- **Purpose**: Integration branch for features
- **Protection**: Requires pull request reviews and status checks
- **Merge From**: Feature branches and release preparations
- **Deploy Trigger**: Automatic deployment to staging
- **Status**: Bleeding edge, always working but potentially unstable

### Supporting Branches

#### Feature Branches: `feature/*`
```bash
# Format: feature/<feature-name>
# Example: feature/user-authentication, feature/payment-integration
```
- **Created From**: `develop`
- **Merged Back To**: `develop` (via Pull Request)
- **Naming Convention**: Use lowercase, hyphens instead of spaces
- **Lifetime**: Temporary (deleted after merge)

#### Bugfix Branches: `bugfix/*`
```bash
# Format: bugfix/<bug-name>
# Example: bugfix/missing-email-validation, bugfix/mobile-layout
```
- **Created From**: `develop`
- **Merged Back To**: `develop` (via Pull Request)
- **Naming Convention**: Use lowercase, hyphens instead of spaces
- **Lifetime**: Temporary (deleted after merge)

#### Release Branches: `release/*`
```bash
# Format: release/<version>
# Example: release/1.0.0, release/2.1.0
```
- **Created From**: `develop`
- **Merged Back To**: `main` and `develop`
- **Purpose**: Prepare for production release
- **Allowed Changes**: Version bumps, minor bug fixes, documentation updates
- **NO NEW FEATURES**: Only critical bug fixes
- **Lifetime**: Until merged to main and develop

#### Hotfix Branches: `hotfix/*`
```bash
# Format: hotfix/<issue>
# Example: hotfix/payment-gateway-crash, hotfix/sql-injection-fix
```
- **Created From**: `main`
- **Merged Back To**: `main` and `develop`
- **Purpose**: Critical fixes for production
- **Lifetime**: Until merged to both main and develop

---

## Commit Conventions

We follow **Conventional Commits** specification for clear and meaningful commit history.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding tests or updating test configuration
- **ci**: Changes to CI/CD configuration and scripts
- **chore**: Changes to build process, dependencies, or other non-source changes

### Scope (Optional)

Scope specifies what part of the codebase is affected:
- `frontend`
- `backend`
- `auth`
- `payments`
- `ui`
- `performance`
- `deployment`

### Examples

```bash
# Feature commit
feat(frontend): add user dashboard page

# Bug fix
fix(auth): resolve token expiration issue

# Documentation update
docs(setup): update installation instructions

# Performance improvement
perf(frontend): optimize bundle size by lazy loading routes

# Breaking change (include BREAKING CHANGE in footer)
feat(api): redesign authentication endpoint

BREAKING CHANGE: The /auth/login endpoint now requires OAuth2.

# Multiple footer references
fix(payment): handle failed transactions gracefully

Closes #123
Refs #456
```

### Best Practices

1. **Keep commits atomic**: One logical change per commit
2. **Write descriptive messages**: Future you will thank present you
3. **Use imperative mood**: "add feature" not "added feature"
4. **Reference issues**: Link to GitHub issues when relevant
5. **Limit subject line**: Maximum 50 characters
6. **Wrap body at 72 characters**: For better readability in terminals
7. **Never force push to shared branches**: Use `git push` not `git push --force`

---

## Tagging Strategy

We follow **Semantic Versioning** (MAJOR.MINOR.PATCH) for version tags.

### Tag Format

```
v<MAJOR>.<MINOR>.<PATCH>[-<pre-release>][+<build-metadata>]
```

### Examples

```bash
v1.0.0          # Initial release
v1.1.0          # New features (backward compatible)
v1.1.1          # Bug fix (backward compatible)
v2.0.0          # Major breaking changes
v1.0.0-alpha.1  # Pre-release: alpha
v1.0.0-beta.2   # Pre-release: beta
v1.0.0-rc.1     # Pre-release: release candidate
```

### Tagging Rules

1. **Always tag releases on `main`**: Never tag on `develop` or feature branches
2. **Tag after merge to main**: Complete the PR, merge, then tag
3. **Annotated tags for releases**: Use `git tag -a` (includes tagger info and message)
4. **Lightweight tags for development**: Use `git tag` for internal milestones

### Tag Annotation Template

```
v1.0.0

Release: Version 1.0.0 - Initial Production Release

New Features:
- Complete landing page with responsive design
- Payment integration with Stripe
- Email subscription system
- SEO optimization

Bug Fixes:
- Fixed mobile menu alignment
- Resolved form validation issues

Breaking Changes:
- None

Contributors:
- [List contributors]
```

### Creating Tags

```bash
# Annotated tag (recommended for releases)
git tag -a v1.0.0 -m "Release v1.0.0 - Initial production release"

# Lightweight tag (for development)
git tag v1.0.0-dev.1

# Tag a specific commit
git tag -a v1.0.0 <commit-hash> -m "Release message"

# Push tags to remote
git push origin v1.0.0           # Single tag
git push origin --tags            # All tags
```

---

## Pull Request Workflow

### Before Creating a PR

1. **Sync with develop**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **Run local checks**
   ```bash
   npm run lint    # Check code style
   npm run test    # Run tests
   npm run build   # Verify build succeeds
   ```

3. **Squash/organize commits** (if needed)
   ```bash
   git rebase -i HEAD~3  # Interactive rebase last 3 commits
   ```

### Creating a PR

1. **Push your branch**
   ```bash
   git push origin feature/my-feature
   ```

2. **Create PR on GitHub**
   - Use the PR template provided
   - Reference related issues: "Closes #123"
   - Provide clear description of changes
   - Include testing evidence

3. **PR Title Format**
   ```
   feat(scope): brief description
   fix(scope): brief description
   docs: brief description
   ```

### PR Requirements

- ✅ All CI checks pass (tests, build, linting)
- ✅ At least one approved review
- ✅ No conflicting changes
- ✅ Updated documentation (if applicable)
- ✅ Added tests for new features/fixes
- ✅ No breaking changes without discussion

### Merging PRs

- **Use "Squash and merge"** for feature branches: Keeps main history clean
- **Use "Create a merge commit"** for release/hotfix branches: Preserves branch structure

---

## Release Process

### Patch Release (Bug fixes only)
```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create release branch
git checkout -b release/1.0.1

# 3. Update version numbers in package.json
# package.json version: 1.0.1

# 4. Update CHANGELOG.md
# Add release date and changes

# 5. Commit
git add package.json CHANGELOG.md
git commit -m "chore(release): bump version to 1.0.1"

# 6. Push and create PR to main
git push origin release/1.0.1

# 7. After approval and merge to main:
git checkout main
git pull origin main
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1

# 8. Merge back to develop
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

### Minor Release (New features)
```bash
# Same process as patch, but version increment is 1.1.0 instead of 1.0.1
```

### Major Release (Breaking changes)
```bash
# Same process as patch, but version increment is 2.0.0 instead of 1.0.0
# IMPORTANT: Document all breaking changes in CHANGELOG and commit messages
```

---

## Common Workflows

### Starting a New Feature

```bash
# 1. Update develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes and commit
git add .
git commit -m "feat(frontend): add new feature description"

# 4. Push branch
git push -u origin feature/new-feature

# 5. Create Pull Request on GitHub
```

### Fixing a Bug

```bash
# 1. From develop branch
git checkout develop
git pull origin develop

# 2. Create bugfix branch
git checkout -b bugfix/bug-description

# 3. Fix the bug and commit
git add .
git commit -m "fix(auth): resolve authentication timeout issue"

# 4. Push and create PR
git push -u origin bugfix/bug-description
```

### Emergency Production Hotfix

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create hotfix branch
git checkout -b hotfix/critical-issue

# 3. Fix the issue
git add .
git commit -m "fix(payment): handle payment gateway crash"

# 4. Push and create PR to main (URGENT)
git push -u origin hotfix/critical-issue

# 5. After merge to main, merge to develop
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

### Updating Feature Branch with Develop Changes

```bash
# If develop has new changes while your feature is in progress:
git fetch origin
git rebase origin/develop

# Or merge if you prefer:
git merge origin/develop
```

### Viewing Commit History

```bash
# Pretty log
git log --oneline --graph --all --decorate

# Show commit details
git show <commit-hash>

# Show commits in specific branch
git log develop..feature/my-feature
```

---

## Branch Protection Rules

The following rules are enforced on `main` and `develop`:

- ✅ Require pull request reviews before merging (minimum 1)
- ✅ Require status checks to pass (CI/CD)
- ✅ Require code review before dismissing reviews
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Include administrators in restrictions

---

## Quick Reference

| Task | Command |
|------|---------|
| Clone repo | `git clone https://github.com/Mostafa-SAID7/luxelle-landing.git` |
| Create feature | `git checkout -b feature/name && git push -u origin feature/name` |
| Sync with remote | `git fetch origin && git rebase origin/develop` |
| View log | `git log --oneline --graph --all` |
| Create tag | `git tag -a v1.0.0 -m "Release message"` |
| Push changes | `git push origin branch-name` |
| Delete branch | `git push origin --delete branch-name` |

---

## Questions?

For additional questions about the git workflow, refer to:
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
