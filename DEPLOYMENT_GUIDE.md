# Deployment Guide - Luxelle Landing Page

This guide covers deploying the Luxelle application to Netlify (Frontend) and Vercel (Backend) with Turso database.

## Prerequisites

- GitHub account with the repository access
- Netlify account (https://netlify.com)
- Vercel account (https://vercel.com)
- Turso database already set up at: `libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io`
- Turso authentication token

## Frontend Deployment (Netlify)

### Step 1: Connect Repository to Netlify

1. Go to [Netlify](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize Netlify
4. Choose the `luxelle-landing` repository
5. Configure build settings:
   - **Build command**: `npm run build:prod`
   - **Publish directory**: `dist/luxelle-landing-page`
   - **Base directory**: `frontend`

### Step 2: Configure Environment Variables (if needed)

In Netlify Site Settings → Build & Deploy → Environment:
- Add any API endpoints or configuration variables

### Step 3: Deploy

Netlify will automatically deploy when you push to the `main` branch.

**Frontend URL**: https://luxelle-landing.netlify.app

---

## Backend Deployment (Vercel)

### Step 1: Prepare Backend for Deployment

The backend is configured to use Turso database in production. The `vercel.json` file is already set up.

### Step 2: Connect Repository to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import the GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other (for .NET)
   - **Root Directory**: `backend`

### Step 3: Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
TursoConnection__Url=libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io
TursoConnection__AuthToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyMTczMTgsImlkIjoiMDE5ZTdkMzctZTUwMS03MGYwLTllYTMtMTU0NTQwMDVjM2Q4IiwicmlkIjoiMmQ2MGQ3NDItYTAyNy00YzQ1LTk4YTQtMjMzNDkxODNlMTRlIn0.e8npXzrba9aDKzEaazZSEY5eyF2pK6HAAEBbE6_L9MyEIJ-rLe-B6hCxmvbzI8E0VcK8G2vIAqf-dUBYhnSVBw
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy the .NET backend
3. You'll receive a deployment URL

**Backend API URL**: Will be provided by Vercel after deployment

---

## Frontend Configuration

### Update API Endpoint

Update the frontend to point to the Vercel backend URL:

1. Open `frontend/src/environments/environment.prod.ts`
2. Update the API endpoint:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-vercel-backend-url.vercel.app'
};
```

3. Commit and push to trigger Netlify redeploy

---

## Database Configuration

### Turso Database Details

- **Database URL**: `libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io`
- **Region**: AWS AP Northeast 1 (Tokyo)
- **Type**: LibSQL (SQLite compatible)

### Database Schema

The application uses three main tables:

1. **Users** - Customer information
   - Id, FullName, Email, Phone

2. **Services** - Beauty & wellness services
   - Id, Name, Description, Category, Price, DurationMinutes, IsAvailable

3. **Bookings** - Service bookings
   - Id, UserId, ServiceId, BookingDate, Status

### Initial Data

The database is seeded with 4 sample services:
- Luxury Facial ($120, 60 min)
- Swedish Massage ($90, 60 min)
- Manicure & Pedicure ($75, 90 min)
- Hair Treatment ($85, 75 min)

---

## Verification Checklist

After deployment, verify:

- [ ] Frontend loads at https://luxelle-landing.netlify.app
- [ ] Backend API responds at Vercel URL
- [ ] API endpoints are accessible from frontend
- [ ] Database connection is working
- [ ] Services are displayed correctly
- [ ] Booking functionality works end-to-end
- [ ] CORS is properly configured

---

## Troubleshooting

### Frontend Build Fails

- Check Node.js version: Should be 22.x
- Run `npm install --legacy-peer-deps` locally
- Check for TypeScript errors: `npm run build:prod`

### Backend Deployment Fails

- Verify .NET SDK version compatibility
- Check environment variables are set correctly
- Review Vercel build logs for detailed errors

### Database Connection Issues

- Verify Turso URL and token are correct
- Check network connectivity to Turso
- Ensure database migrations have run

### CORS Errors

- Backend CORS policy allows all origins: `AllowAnyOrigin()`
- If issues persist, update CORS policy in `Program.cs`

---

## Rollback

### Netlify Rollback
1. Go to Netlify Site Settings → Deploys
2. Click on a previous deployment
3. Click "Publish deploy"

### Vercel Rollback
1. Go to Vercel Project → Deployments
2. Click on a previous deployment
3. Click "Promote to Production"

---

## Support

For issues or questions:
- Check GitHub Issues: https://github.com/Mostafa-SAID7/luxelle-landing
- Review deployment logs in Netlify/Vercel dashboards
- Check database status in Turso dashboard
