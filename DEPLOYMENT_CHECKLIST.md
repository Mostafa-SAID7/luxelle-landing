# Deployment Checklist ✅

Complete this checklist to deploy Luxelle to production.

## Phase 1: Preparation ✓

- [x] Repository cloned and updated
- [x] Backend configured for Turso database
- [x] Deployment files created (vercel.json, workflows)
- [x] Documentation prepared
- [x] Changes committed and pushed to GitHub

## Phase 2: Netlify Setup (Frontend)

### Account & Repository
- [ ] Create/login to Netlify account (https://netlify.com)
- [ ] Authorize Netlify to access GitHub
- [ ] Select `luxelle-landing` repository

### Build Configuration
- [ ] Set Base directory: `frontend`
- [ ] Set Build command: `npm run build:prod`
- [ ] Set Publish directory: `dist/luxelle-landing-page`
- [ ] Set Node version: 22.x

### Environment Variables (if needed)
- [ ] Add API endpoint variable (after backend is deployed)

### Deploy
- [ ] Click "Deploy site"
- [ ] Wait for build to complete
- [ ] Verify site loads at: https://luxelle-landing.netlify.app

---

## Phase 3: Vercel Setup (Backend)

### Account & Repository
- [ ] Create/login to Vercel account (https://vercel.com)
- [ ] Authorize Vercel to access GitHub
- [ ] Create new project from `luxelle-landing` repository

### Project Configuration
- [ ] Set Root Directory: `backend`
- [ ] Framework: Other (.NET)

### Environment Variables
- [ ] Add `TursoConnection__Url`: `libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io`
- [ ] Add `TursoConnection__AuthToken`: (your Turso token)

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Note the deployment URL (e.g., `https://luxelle-backend.vercel.app`)

---

## Phase 4: GitHub Actions Setup

### Add Secrets to GitHub
1. Go to repository Settings → Secrets and variables → Actions
2. Add the following secrets:

- [ ] `NETLIFY_AUTH_TOKEN` - From Netlify account settings
- [ ] `NETLIFY_SITE_ID` - From Netlify site settings
- [ ] `VERCEL_TOKEN` - From Vercel account settings
- [ ] `VERCEL_ORG_ID` - From Vercel account settings
- [ ] `VERCEL_PROJECT_ID` - From Vercel project settings
- [ ] `TURSO_URL` - `libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io`
- [ ] `TURSO_TOKEN` - Your Turso authentication token

### Test Workflow
- [ ] Make a test commit to `main` branch
- [ ] Go to Actions tab and verify workflow runs
- [ ] Check both Netlify and Vercel deployments complete

---

## Phase 5: Frontend Configuration

### Update API Endpoint
- [ ] Get backend URL from Vercel deployment
- [ ] Update `frontend/src/environments/environment.prod.ts` with backend URL
- [ ] Commit and push changes
- [ ] Verify Netlify redeploys automatically

---

## Phase 6: Testing & Verification

### Frontend Testing
- [ ] Load https://luxelle-landing.netlify.app
- [ ] Check page loads without errors
- [ ] Verify responsive design on mobile
- [ ] Check all images load correctly
- [ ] Test navigation between pages

### Backend Testing
- [ ] Access backend API URL from Vercel
- [ ] Test API endpoints:
  - [ ] GET `/api/services` - Should return 4 services
  - [ ] POST `/api/users` - Create test user
  - [ ] POST `/api/bookings` - Create test booking
- [ ] Verify database connection works
- [ ] Check Swagger UI at `/swagger`

### Integration Testing
- [ ] Load frontend and check API calls work
- [ ] Test booking form submission
- [ ] Verify data persists in Turso database
- [ ] Check CORS headers are correct

### Performance Testing
- [ ] Check frontend load time (target: < 3s)
- [ ] Check API response time (target: < 500ms)
- [ ] Test with slow network (DevTools throttling)

---

## Phase 7: Monitoring & Maintenance

### Set Up Monitoring
- [ ] Enable Netlify analytics
- [ ] Enable Vercel analytics
- [ ] Set up error tracking (optional: Sentry)
- [ ] Configure email notifications for deployment failures

### Documentation
- [ ] Share deployment URLs with team
- [ ] Document any custom configurations
- [ ] Create runbook for common issues
- [ ] Set up team access to Netlify/Vercel

### Backup & Recovery
- [ ] Document database backup procedure
- [ ] Test rollback process
- [ ] Create disaster recovery plan

---

## Deployment URLs

Once deployed, update these URLs:

**Frontend**: https://luxelle-landing.netlify.app

**Backend API**: https://luxelle-backend.vercel.app (replace with actual URL)

**Database**: libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io

---

## Troubleshooting Quick Links

- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [GitHub Secrets Setup](./GITHUB_SECRETS_SETUP.md)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [Turso Docs](https://docs.turso.tech)

---

## Notes

- All changes have been committed to GitHub
- Automated deployment workflow is ready
- Database is configured and ready
- Frontend and backend are production-ready

**Status**: Ready for deployment ✅
