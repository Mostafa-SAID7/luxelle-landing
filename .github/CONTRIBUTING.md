# Contributing Guidelines

Thank you for your interest in contributing to our project! We welcome contributions from everyone and are grateful for your effort to make our project better.

## 📖 Before You Start

Please read and understand our **[Git Workflow Guide](../docs/git-workflow.md)** before contributing. It covers:
- Branching strategy (Git Flow model)
- Commit conventions (Conventional Commits)
- Tagging strategy (Semantic Versioning)
- Pull request workflow
- Release process

## Development Process

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
   ```bash
   git clone https://github.com/YOUR-USERNAME/luxelle-landing.git
   cd luxelle-landing
   git remote add upstream https://github.com/Mostafa-SAID7/luxelle-landing.git
   ```

3. **Create a feature/bugfix branch** following our naming convention
   ```bash
   git checkout -b feature/your-feature-name
   # or for bugs:
   git checkout -b bugfix/bug-description
   ```

4. **Make your changes** following our code standards
   - Write clear, meaningful commit messages using Conventional Commits format
   - Make atomic commits (one logical change per commit)
   - Reference issues in commit messages when applicable

5. **Test your changes locally**
   ```bash
   npm install
   npm run lint      # Check code style
   npm run test      # Run tests
   npm run build     # Build for production
   ```

6. **Sync with upstream** before pushing
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

7. **Push** your work back up to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Submit a Pull Request** to the `develop` branch
   - Use our PR template
   - Reference related issues: "Closes #123"
   - Describe what your changes do and why
   - Include evidence of testing

## Code Style & Standards

- **Format**: Run `npm run lint` before committing
- **Tests**: Ensure your tests pass using `npm run test`
- **Build**: Verify production build works with `npm run build`
- **Angular**: Follow established Angular coding conventions
- **Commits**: Use Conventional Commits format (see [Git Workflow Guide](../docs/git-workflow.md))

## Conventional Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**
```bash
feat(frontend): add user dashboard page
fix(auth): resolve token expiration issue
docs(setup): update installation instructions
perf(frontend): optimize bundle size
```

See our [Git Workflow Guide](../docs/git-workflow.md) for detailed commit conventions.

## Pull Request Checklist

Before submitting, ensure:
- [ ] My code follows the code style and conventions
- [ ] I have run `npm run lint` and fixed any issues
- [ ] I have run `npm run test` and all tests pass
- [ ] I have run `npm run build` and build succeeds
- [ ] I have added/updated tests for my changes
- [ ] I have updated documentation (if applicable)
- [ ] My branch is up to date with `upstream/develop`
- [ ] My commit messages follow Conventional Commits format
- [ ] I have described my changes clearly in the PR

## Branch Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/<feature-name>` | `feature/user-authentication` |
| Bug Fix | `bugfix/<bug-name>` | `bugfix/mobile-layout` |
| Release | `release/<version>` | `release/1.0.0` |
| Hotfix | `hotfix/<issue>` | `hotfix/critical-bug` |

Use lowercase, hyphens instead of spaces.

## Reporting Issues

If you find a bug or want to suggest a feature:
1. Check existing issues first (might already be reported)
2. Create a new issue with clear title and description
3. Include steps to reproduce (for bugs)
4. Add relevant labels

## Questions?

- Check our **[Support Guidelines](./SUPPORT.md)**
- Join our community discussions
- Review our **[Git Workflow Guide](../docs/git-workflow.md)** for detailed information
- Check the **[Development Guide](../docs/development.md)** for setup help

Thank you for contributing! 🙏
