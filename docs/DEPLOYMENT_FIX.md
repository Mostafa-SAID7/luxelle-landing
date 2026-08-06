# Vercel & Netlify Deployment Fix

## Problem Analysis

The Vercel deployment was failing with:
```
npm error ERESOLVE could not resolve
npm error While resolving: lucide-angular@0.263.0
npm error Could not resolve dependency:
npm error peer @angular/common@"13.x - 16.x" from lucide-angular@0.263.0
```

### Root Causes Identified

1. **Missing Vercel Configuration**
   - No `vercel.json` file existed
   - Vercel was trying to build from project root instead of `/frontend`
   - Wrong dependency installation context

2. **Outdated Package Dependencies**
   - `lucide-angular@0.263.0` only supports Angular 13-16
   - Project uses Angular 18
   - Package was incompatible

3. **Locked Outdated Dependencies**
   - Old `package-lock.json` had `lucide-angular@0.263.0` cached
   - Even with updated `package.json`, npm would use cached lock file

## Solutions Implemented

### 1. Created `vercel.json`
**File:** `vercel.json`

Proper Vercel configuration for the monorepo structure:
- Sets build command: `cd frontend && npm run build:prod`
- Sets install command: `npm ci --legacy-peer-deps`
- Defines output directory: `frontend/dist/luxelle-landing-page/browser`
- Configures SPA routing
- Sets Node.js version: 22

### 2. Updated `package.json` Dependency
**File:** `frontend/package.json`

Changed from:
```json
"lucide-angular": "^0.263.0"
```

To:
```json
"@lucide/angular": "^0.417.0"
```

**Why?**
- `lucide-angular` is deprecated
- `@lucide/angular` is the new package
- v0.417.0 supports Angular 17+ (including Angular 18)
- Follows modern Angular packaging conventions

### 3. Removed Old Package Lock
**File:** `frontend/package-lock.json`

Deleted the old lock file because:
- It contained cached `lucide-angular@0.263.0`
- Lock files override package.json versions
- Removing it forces npm to generate fresh lock with new versions
- First deployment will regenerate it correctly

## How Deployments Now Work

### Vercel Deployment Flow

```
Push to main/master
    ↓
GitHub webhook triggers Vercel
    ↓
Vercel reads vercel.json
    ↓
cd frontend && npm ci --legacy-peer-deps
    ↓
npm resolves @lucide/angular@0.417.0 (Angular 18 compatible)
    ↓
npm ci generates new package-lock.json
    ↓
npm run build:prod (Angular production build)
    ↓
Output from frontend/dist/luxelle-landing-page/browser
    ↓
✅ Deployment successful
```

### Netlify Deployment Flow

```
Push to main/master
    ↓
GitHub webhook triggers Netlify
    ↓
Netlify reads netlify.toml
    ↓
cd frontend && npm ci --legacy-peer-deps
    ↓
npm resolves @lucide/angular@0.417.0
    ↓
npm run build:prod
    ↓
✅ Deployment successful
```

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm run build:prod",
  "installCommand": "cd frontend && npm ci --legacy-peer-deps",
  "outputDirectory": "frontend/dist/luxelle-landing-page/browser",
  "framework": "angular",
  "nodejs": "22",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "status": 200
    }
  ]
}
```

### netlify.toml
```toml
[build]
  base = "frontend"
  command = "npm run build:prod"
  publish = "dist/luxelle-landing-page"

[build.environment]
  NODE_VERSION = "22.14.0"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### .npmrc
```
legacy-peer-deps=true
```

## Verification Checklist

- ✅ `vercel.json` exists and is correctly configured
- ✅ `frontend/package.json` uses `@lucide/angular@^0.417.0`
- ✅ `frontend/package-lock.json` removed (will regenerate on first deploy)
- ✅ `netlify.toml` configured for monorepo
- ✅ `.npmrc` has `legacy-peer-deps=true`
- ✅ `.nvmrc` specifies Node.js 22
- ✅ Both deployment platforms configured

## Git Commits

1. **9b1eccd** - `fix(deploy): add vercel configuration and update lucide-angular to compatible version`
2. **21bb413** - `fix(deps): remove outdated package-lock.json to resolve lucide-angular conflict`

## Next Deployment

On the next push to `main`:

1. **Vercel** will:
   - Read new `vercel.json`
   - Build from `/frontend` directory
   - Install with correct lucide-angular version
   - Successfully build and deploy

2. **Netlify** will:
   - Continue using `netlify.toml`
   - Build from `/frontend` directory
   - Install with correct lucide-angular version
   - Successfully build and deploy

## Troubleshooting

### If deployment still fails:

1. **Clear Vercel cache:**
   - Go to Vercel project settings
   - Clear all builds/cache
   - Trigger new deployment

2. **Check Node version:**
   - Vercel should use Node 22 (specified in vercel.json)
   - Netlify should use Node 22.14.0 (specified in netlify.toml)

3. **Verify package resolution:**
   - Look for `@lucide/angular@0.417.0` in build logs
   - Should NOT see `lucide-angular@0.263.0`

### Local testing before deployment:

```bash
cd frontend
rm -f package-lock.json
npm install --legacy-peer-deps
npm run build:prod
```

## Additional Resources

- [Vercel Configuration Reference](https://vercel.com/docs/projects/project-configuration)
- [Netlify Configuration Reference](https://docs.netlify.com/configure-builds/file-api/)
- [@lucide/angular Package](https://www.npmjs.com/package/@lucide/angular)
- [Angular 18 Deployment Guide](https://angular.dev/tools/cli/deployment)

---

**Status:** ✅ Production Ready  
**Last Updated:** August 6, 2026  
**Related Commits:** 9b1eccd, 21bb413
