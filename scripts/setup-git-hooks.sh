#!/bin/bash

# Setup Git Hooks for Luxelle Landing Page
# This script configures git hooks to enforce workflow standards

echo "🔧 Setting up Git Hooks..."

# Create .husky directory if it doesn't exist
mkdir -p .husky

# Define hook files
hooks=(
  "pre-commit"
  "pre-push"
  "commit-msg"
)

# Make hook scripts executable
for hook in "${hooks[@]}"; do
  if [ -f ".husky/$hook" ]; then
    chmod +x ".husky/$hook"
    echo "✅ $hook hook is ready"
  else
    echo "⚠️  $hook hook not found"
  fi
done

# Setup git core.hooksPath (requires git 2.9+)
git config core.hooksPath .husky

echo ""
echo "✅ Git hooks setup complete!"
echo ""
echo "Git hooks will now run for:"
echo "  • pre-commit    - Validates code style and runs linting"
echo "  • pre-push      - Validates branch naming conventions"
echo "  • commit-msg    - Validates commit message format"
echo ""
echo "To bypass hooks (not recommended): git commit --no-verify"
echo ""
