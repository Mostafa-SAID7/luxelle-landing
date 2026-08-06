# 🚀 Git Workflow Quick Start

Fast reference for developers working on the Luxelle Landing Page project.

## ⚡ First Time Setup

```bash
# Clone the repo
git clone https://github.com/Mostafa-SAID7/luxelle-landing.git
cd luxelle-landing

# Add upstream remote (if you forked it)
git remote add upstream https://github.com/Mostafa-SAID7/luxelle-landing.git

# Verify
git remote -v
```

---

## 🎯 Starting a Feature

```bash
# 1. Make sure you're up to date
git checkout develop
git pull origin develop

# 2. Create and switch to feature branch
git checkout -b feature/my-awesome-feature

# 3. Make changes and commit with proper format
git add .
git commit -m "feat(frontend): add new awesome feature

- Added feature X
- Integrated with component Y"

# 4. Push branch
git push -u origin feature/my-awesome-feature

# 5. Create Pull Request on GitHub (use template)
```

---

## 🐛 Fixing a Bug

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create bugfix branch
git checkout -b bugfix/fix-broken-thing

# 3. Fix the bug and commit
git add .
git commit -m "fix(auth): resolve login timeout issue

Refs #123"

# 4. Push and create PR
git push -u origin bugfix/fix-broken-thing
```

---

## 🔥 Emergency Hotfix (Production Fix)

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create hotfix branch
git checkout -b hotfix/critical-production-bug

# 3. Fix the issue
git add .
git commit -m "fix(payment): fix payment gateway crash

CRITICAL: Production hotfix"

# 4. Push URGENT PR to main
git push -u origin hotfix/critical-production-bug

# 5. After merge to main, merge to develop
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

---

## 📝 Commit Message Format

Keep your commits meaningful:

```
<type>(<scope>): <subject>

<optional body>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `chore`

**Examples:**
```
feat(frontend): add dark mode toggle
fix(auth): resolve token expiration issue
docs(setup): update installation instructions
perf(bundle): optimize image loading
```

---

## 🔍 Before Committing

```bash
# Check for linting issues
npm run lint

# Run tests
npm run test

# Build to verify
npm run build

# Then commit if all pass
git add .
git commit -m "your message"
```

---

## 📤 Pushing Changes

```bash
# Push new branch
git push -u origin feature/my-feature

# Push to existing branch
git push origin feature/my-feature

# Push all tags
git push origin --tags

# Push specific tag
git push origin v1.0.0
```

---

## 🔄 Keeping Your Branch Updated

```bash
# Update your branch with latest develop
git fetch origin
git rebase origin/develop

# If conflicts occur:
# 1. Fix the conflicts in your editor
# 2. git add .
# 3. git rebase --continue
```

---

## 📊 Viewing History

```bash
# See all commits with nice graph
git log --oneline --graph --all --decorate

# See commits in your branch only
git log develop..feature/my-feature

# See changes in specific commit
git show abc1234

# See changes in current branch
git diff develop
```

---

## 🏷️ Creating Tags (Release Manager Only)

```bash
# Create annotated tag (for releases)
git tag -a v1.0.0 -m "Release v1.0.0 - Initial production release"

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# List all tags
git tag -l

# Show tag details
git show v1.0.0
```

---

## ⚠️ Common Issues & Fixes

### "Your branch has diverged"
```bash
git fetch origin
git rebase origin/develop
```

### "Conflicts in rebase"
```bash
# Fix conflicts in your editor, then:
git add .
git rebase --continue
# Or abort:
git rebase --abort
```

### "Accidentally committed to wrong branch"
```bash
# Get the commit hash first
git log

# Reset current branch
git reset --soft HEAD~1

# Switch to correct branch and apply
git checkout correct-branch
git commit -m "message"
```

### "Need to undo last commit"
```bash
# Undo but keep changes
git reset --soft HEAD~1

# Undo and discard changes
git reset --hard HEAD~1
```

---

## 📋 PR Checklist

Before creating a PR:
- ✅ Branch created from correct base (`develop` or `main` for hotfixes)
- ✅ All tests pass: `npm run test`
- ✅ Linting passes: `npm run lint`
- ✅ Build succeeds: `npm run build`
- ✅ Commits use Conventional Commits format
- ✅ Branch is up to date with base branch
- ✅ Description clearly explains changes
- ✅ References any related issues: "Closes #123"

---

## 🔗 Full Documentation

For comprehensive information, see:
- **[Complete Git Workflow Guide](docs/git-workflow.md)** - Full details on branching strategy, tagging, and processes
- **[Contributing Guidelines](.github/CONTRIBUTING.md)** - Code standards and expectations
- **[Development Guide](docs/development.md)** - Setup and local development

---

## 💡 Pro Tips

1. **Set git aliases** for faster work:
   ```bash
   git config --global alias.co checkout
   git config --global alias.br branch
   git config --global alias.ci commit
   git config --global alias.st status
   git config --global alias.unstage 'reset HEAD --'
   git config --global alias.last 'log -1 HEAD'
   git config --global alias.visual 'log --graph --oneline --all --decorate'
   ```

2. **Use `.gitignore`** - Keep sensitive files out of git

3. **Commit often** - Smaller commits are easier to review and debug

4. **Write meaningful messages** - Future you will thank present you

5. **Keep branches short-lived** - Merge within 1-2 weeks to avoid divergence

---

## ❓ Need Help?

- Check the [full Git Workflow Guide](docs/git-workflow.md)
- See [Support Guidelines](.github/SUPPORT.md)
- Review [Development Setup](docs/development.md)
- Open an issue on GitHub
