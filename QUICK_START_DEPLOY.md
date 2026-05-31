# 🚀 Quick Start Deployment Guide

**Time to Deploy**: ~15 minutes | **Difficulty**: Easy

---

## 📋 What You Need

- GitHub account (already have access)
- Netlify account (free at netlify.com)
- Vercel account (free at vercel.com)
- Turso database credentials (already provided)

---

## ⚡ 3-Step Deployment

### Step 1️⃣: Deploy Frontend to Netlify (5 min)

```
1. Go to https://netlify.com → Sign in
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Authorize → Choose "luxelle-landing"
4. Build settings:
   - Base directory: frontend
   - Build command: npm run build:prod
   - Publish directory: dist/luxelle-landing-page
5. Click "Deploy site"
6. Wait for build ✅
```

**Result**: https://luxelle-landing.netlify.app

---

### Step 2️⃣: Deploy Backend to Vercel (5 min)

```
1. Go to https://vercel.com → Sign in
2. Click "Add New" → "Project"
3. Import "luxelle-landing" from GitHub
4. Root Directory: backend
5. Add Environment Variables:
   TursoConnection__Url = libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io
   TursoConnection__AuthToken = eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyMTczMTgsImlkIjoiMDE5ZTdkMzctZTUwMS03MGYwLTllYTMtMTU0NTQwMDVjM2Q4IiwicmlkIjoiMmQ2MGQ3NDItYTAyNy00YzQ1LTk4YTQtMjMzNDkxODNlMTRlIn0.e8npXzrba9aDKzEaazZSEY5eyF2pK6HAAEBbE6_L9MyEIJ-rLe-B6hCxmvbzI8E0VcK8G2vIAqf-dUBYhnSVBw
6. Click "Deploy"
7. Wait for build ✅
```

**Result**: Vercel provides your backend URL

---

### Step 3️⃣: Connect Frontend to Backend (2 min)

```
1. Copy backend URL from Vercel
2. Edit: frontend/src/environments/environment.prod.ts
3. Update: apiUrl: 'https://your-vercel-url.vercel.app'
4. Commit and push to main
5. Netlify auto-redeploys ✅
```

---

## ✅ Verify It Works

### Frontend
- [ ] Load https://luxelle-landing.netlify.app
- [ ] Page loads without errors
- [ ] Images display correctly
- [ ] Navigation works

### Backend
- [ ] Access Vercel URL
- [ ] Check `/swagger` endpoint
- [ ] Test API endpoints

### Integration
- [ ] Frontend loads services from backend
- [ ] Booking form works
- [ ] Data saves to Turso database

---

## 🎯 Success!

If all checks pass, you're done! 🎉

**Frontend**: https://luxelle-landing.netlify.app
**Backend**: https://your-vercel-url.vercel.app
**Database**: Turso (AWS Tokyo)

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Node 22.x, run `npm install --legacy-peer-deps` |
| API not responding | Verify environment variables in Vercel |
| CORS errors | Backend allows all origins by default |
| Database error | Check Turso URL and token are correct |

---

## 📚 Full Documentation

- [Detailed Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [GitHub Secrets Setup](./GITHUB_SECRETS_SETUP.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [Deployment Summary](./DEPLOYMENT_SUMMARY.md)

---

## 💡 Pro Tips

✨ **Automated Deployment**: Set up GitHub Secrets for auto-deploy on every push
✨ **Monitoring**: Enable analytics in Netlify and Vercel dashboards
✨ **Rollback**: Both platforms support instant rollback to previous versions
✨ **Custom Domain**: Add your domain in Netlify/Vercel settings

---

**Status**: ✅ Ready to Deploy!

**Questions?** Check the full documentation or GitHub Issues.
