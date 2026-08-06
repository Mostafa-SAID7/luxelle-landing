# Setup Git Hooks for Luxelle Landing Page
# This script configures git hooks to enforce workflow standards
# Run from PowerShell in the project root directory

Write-Host "🔧 Setting up Git Hooks..." -ForegroundColor Cyan

# Create .husky directory if it doesn't exist
if (-not (Test-Path ".husky")) {
    New-Item -ItemType Directory -Path ".husky" | Out-Null
}

# Define hook files
$hooks = @("pre-commit", "pre-push", "commit-msg")

# Make hook scripts executable (for Git on Windows)
foreach ($hook in $hooks) {
    $hookPath = ".husky\$hook"
    if (Test-Path $hookPath) {
        # Git uses Unix-style paths, even on Windows
        git config --local core.hooksPath .husky
        Write-Host "✅ $hook hook is ready" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  $hook hook not found" -ForegroundColor Yellow
    }
}

# Setup git core.hooksPath (requires git 2.9+)
git config core.hooksPath .husky

Write-Host ""
Write-Host "✅ Git hooks setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Git hooks will now run for:" -ForegroundColor Cyan
Write-Host "  • pre-commit    - Validates code style and runs linting"
Write-Host "  • pre-push      - Validates branch naming conventions"
Write-Host "  • commit-msg    - Validates commit message format"
Write-Host ""
Write-Host "To bypass hooks (not recommended): git commit --no-verify"
Write-Host ""
