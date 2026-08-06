# Setting Up Git Workflow for Luxelle Landing Page

This guide will help you set up the proper git workflow, branch naming conventions, commit message validation, and automated hooks for the Luxelle Landing Page project.

## 📋 Prerequisites

- Git 2.9 or higher
- Node.js 20+ (already required for the project)
- npm or yarn

## 🚀 Quick Setup (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/luxelle-landing.git
cd luxelle-landing
```

### 2. Run Setup Script

**On macOS/Linux:**
```bash
chmod +x scripts/setup-git-hooks.sh
./scripts/setup-git-hooks.sh
```

**On Windows (PowerShell):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\scripts\setup-git-hooks.ps1
```

**On Windows (Git Bash):**
```bash
chmod +x scripts/setup-git-hooks.sh
./scripts/setup-git-hooks.sh
```

### 3. Verify Setup

```bash
# Check that hooks are configured
git config core.hooksPath

# Should output: .husky
```

---

## 📚 Understanding the Workflow

### Branch Structure

```
main (production) ←─ merge after testing
  ↑
  └── release/1.0.0 ←─ from develop
        ↑
        └── hotfix/bug-fix (if critical issue)

develop (staging) ←─ merge after review
  ↑
  ├── feature/new-feature ←─ create and work here
  ├── feature/another-feature
  └── bugfix/fix-issue
```

### Commit Format

All commits must follow **Conventional Commits** format:

```
<type>(<scope>): <subject>

<optional body>

<optional footer>
```

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `chore`

**Examples:**
```bash
feat(frontend): add user authentication
fix(auth): resolve session timeout issue
docs(setup): update installation guide
perf(bundle): optimize image loading
```

---

## 🎯 Common Workflows

### Starting New Development

```bash
# 1. Ensure develop is up to date
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat(scope): description of your feature"

# 4. Push to remote
git push -u origin feature/your-feature-name

# 5. Create Pull Request on GitHub
```

### Fixing a Bug

```bash
# Same process, but use bugfix branch
git checkout develop
git pull origin develop
git checkout -b bugfix/bug-description
# ... make fixes ...
git commit -m "fix(scope): description of fix"
git push -u origin bugfix/bug-description
```

### Emergency Production Fix

```bash
# Start from main (production)
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue
# ... fix the issue ...
git commit -m "fix(scope): critical production fix"
git push -u origin hotfix/critical-issue

# After merge to main, merge to develop too
git checkout develop
git merge main
git push origin develop
```

---

## ✅ Git Hooks Explained

### 1. Pre-Commit Hook
**Runs before each commit**
- ✅ Checks code style with linting
- ✅ Ensures code quality before commit
- ❌ Prevents commit if linting fails

**Fix:** Run `npm run lint` to fix issues, then commit again.

### 2. Pre-Push Hook
**Runs before pushing to remote**
- ✅ Validates branch naming conventions
- ✅ Prevents direct pushes to `main` branch
- ✅ Ensures you use feature/bugfix/release/hotfix branches

**Valid branch names:**
- `feature/your-feature`
- `bugfix/bug-fix`
- `release/1.0.0`
- `hotfix/critical-fix`
- `develop`
- `main`

**Fix:** Rename your branch or use a correct naming convention.

### 3. Commit Message Hook
**Validates each commit message**
- ✅ Ensures Conventional Commits format
- ✅ Validates type and scope
- ✅ Enforces meaningful messages

**Fix:** Use proper commit format: `git commit --amend` to fix the message.

---

## 🔧 Manual Hook Setup (If automatic setup doesn't work)

If the scripts don't work in your environment:

1. **Create `.husky` directory:**
   ```bash
   mkdir -p .husky
   ```

2. **Make hook scripts executable:**
   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/pre-push
   chmod +x .husky/commit-msg
   ```

3. **Configure git to use hooks:**
   ```bash
   git config core.hooksPath .husky
   ```

4. **Verify setup:**
   ```bash
   git config core.hooksPath
   # Should output: .husky
   ```

---

## 💡 Tips & Tricks

### Bypass Hooks (Not Recommended)
```bash
# Skip all hooks (use only when absolutely necessary)
git commit --no-verify

# Skip pre-push hook
git push --no-verify
```

### Useful Git Aliases

Add these to your git config for faster workflow:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.log 'log --oneline --graph --all --decorate'
git config --global alias.amend 'commit --amend --no-edit'
git config --global alias.unstage 'reset HEAD --'
```

Then use:
```bash
git co -b feature/new    # checkout -b
git ci -m "feat: ..."    # commit
git st                   # status
git log                  # pretty graph
```

### View Your Commits

```bash
# Pretty log with graph
git log --oneline --graph --all --decorate

# Commits in your branch only
git log develop..feature/my-feature

# Last 5 commits
git log -5

# Search commits
git log --grep="keyword"
```

---

## 🏷️ Tagging Releases

**For Release Managers Only**

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0 - Initial production release"

# Push tag
git push origin v1.0.0

# Push all tags
git push origin --tags

# List all tags
git tag -l

# Show tag details
git show v1.0.0
```

---

## 📊 Checking Your Setup

```bash
# Verify git version (should be 2.9+)
git --version

# Check if hooks are configured
git config core.hooksPath
# Output: .husky

# List configured hooks
ls -la .husky/

# Test a hook manually
.husky/commit-msg

# Check git configuration
git config --list
```

---

## ❌ Troubleshooting

### Hooks Not Running

```bash
# Ensure core.hooksPath is set
git config core.hooksPath .husky

# Check hook file permissions
ls -la .husky/pre-commit
# Should show: -rwxr-xr-x (755 permissions)

# Make executable if needed
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
chmod +x .husky/commit-msg
```

### "Permission Denied" When Pushing

```bash
# Make scripts executable
chmod +x .husky/pre-push

# Or configure git to use .husky
git config core.hooksPath .husky
```

### Commit Message Validation Fails

```bash
# Check your commit message format
git log -1 --format=%B

# Must be: type(scope): message
# Example: feat(frontend): add new feature
```

### Pre-Commit Linting Fails

```bash
# Fix linting issues
npm run lint

# Then commit again
git add .
git commit -m "your message"
```

---

## 📖 Full Documentation

- **[Git Workflow Guide](docs/git-workflow.md)** - Complete branching strategy and process
- **[Quick Start](GIT_WORKFLOW_QUICK_START.md)** - Fast reference for common tasks
- **[Contributing Guidelines](.github/CONTRIBUTING.md)** - Code standards and expectations
- **[Development Guide](docs/development.md)** - Local setup and development

---

## ✨ Next Steps

1. ✅ Complete this setup
2. ✅ Read the [Git Workflow Quick Start](GIT_WORKFLOW_QUICK_START.md)
3. ✅ Review the [Contributing Guidelines](.github/CONTRIBUTING.md)
4. ✅ Start working on features using the workflow

---

## ❓ Questions?

- Check the [Full Git Workflow Guide](docs/git-workflow.md)
- See [Support Guidelines](.github/SUPPORT.md)
- Review examples in [Quick Start](GIT_WORKFLOW_QUICK_START.md)

---

**Last Updated:** August 6, 2026
**Project:** Luxelle Landing Page
**Maintainer:** Mostafa SAID
