# Vercel Deployment Setup - Action Steps

## ⚡ Quick Setup (2 minutes)

### Step 1: Go to Vercel Project Settings
https://vercel.com/your-team/luxelle-landing/settings

### Step 2: Navigate to "Build & Development Settings"

### Step 3: Update These Fields

| Field | Value |
|-------|-------|
| Root Directory | `frontend` |
| Build Command | `npm run build:prod` |
| Install Command | `npm install --legacy-peer-deps` |
| Output Directory | `dist/luxelle-landing-page/browser` |

### Step 4: Save Settings
Click the **SAVE** button at the top

### Step 5: Redeploy
- Go to "Deployments" tab
- Click the three dots on latest deployment
- Select "Redeploy"

## ✅ What This Does

- ✅ Sets Vercel to build from `/frontend` directory (monorepo support)
- ✅ Uses `npm ci --legacy-peer-deps` to install `@lucide/angular@0.417.0` (Angular 18 compatible)
- ✅ Runs Angular production build
- ✅ Outputs built files to correct location
- ✅ Fixes the ERESOLVE dependency error

## 🔍 How to Verify

After redeployment:

1. **Check Build Logs** (in Vercel Deployments tab)
   - Should NOT see: `lucide-angular@0.263.0`
   - Should see: `@lucide/angular@0.417.0`
   - Should NOT see: ERESOLVE errors

2. **Expected Success**
   - Build completes without errors
   - Website is live and accessible
   - No console errors for missing lucide icons

## 📝 What Changed

| Item | Before | After |
|------|--------|-------|
| Package | `lucide-angular@0.263.0` | `@lucide/angular@0.417.0` |
| Status | ❌ Incompatible with Angular 18 | ✅ Compatible with Angular 18 |
| Build | ❌ ERESOLVE error | ✅ Builds successfully |
| Deployment | ❌ Failed | ✅ Should succeed |

## 🚀 After Setup

Next time you push to `main` branch:
1. Vercel automatically detects changes
2. Runs build with new settings
3. Deploys successfully

**No more manual steps needed!**

## ❓ Still Getting Errors?

### If you see "ERESOLVE could not resolve":

1. Clear Vercel cache:
   - Settings → Project → Caching → Clear All
   - Redeploy

2. Verify Root Directory is set to `frontend` (not blank, not `.`)

3. Check package.json has `@lucide/angular@^0.417.0`

### If build output is wrong:

- Verify Output Directory is exactly: `dist/luxelle-landing-page/browser`
- Note: No leading `./` or trailing `/`

### If Node.js version issues:

- Node.js 22 is automatically available on Vercel
- Specified in `.nvmrc` file in project

## 📚 Related Documentation

- Full details: `docs/DEPLOYMENT_FIX.md`
- Git workflow: `docs/git-workflow.md`
- Netlify setup: `netlify.toml`

---

**Status:** Ready to deploy  
**Last Updated:** August 6, 2026
