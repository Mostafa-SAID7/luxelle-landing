# GitHub Secrets Setup Guide

To enable automated deployment via GitHub Actions, you need to configure the following secrets in your GitHub repository.

## How to Add Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below

---

## Required Secrets

### Netlify Secrets

#### `NETLIFY_AUTH_TOKEN`
- **Description**: Authentication token for Netlify
- **How to get**:
  1. Go to https://app.netlify.com/user/applications
  2. Click "New access token"
  3. Copy the token
- **Value**: `your_netlify_auth_token`

#### `NETLIFY_SITE_ID`
- **Description**: Your Netlify site ID
- **How to get**:
  1. Go to your Netlify site settings
  2. Find "Site ID" in the General tab
  3. Copy the ID
- **Value**: `your_netlify_site_id`

---

### Vercel Secrets

#### `VERCEL_TOKEN`
- **Description**: Authentication token for Vercel
- **How to get**:
  1. Go to https://vercel.com/account/tokens
  2. Click "Create"
  3. Copy the token
- **Value**: `your_vercel_token`

#### `VERCEL_ORG_ID`
- **Description**: Your Vercel organization ID
- **How to get**:
  1. Go to https://vercel.com/account/settings
  2. Find "Team ID" or "Org ID"
  3. Copy the ID
- **Value**: `your_vercel_org_id`

#### `VERCEL_PROJECT_ID`
- **Description**: Your Vercel project ID for the backend
- **How to get**:
  1. Go to your Vercel project settings
  2. Find "Project ID"
  3. Copy the ID
- **Value**: `your_vercel_project_id`

---

### Turso Database Secrets

#### `TURSO_URL`
- **Description**: Turso database URL
- **Value**: `libsql://luxelledb-mostafa-said7.aws-ap-northeast-1.turso.io`

#### `TURSO_TOKEN`
- **Description**: Turso authentication token
- **Value**: `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyMTczMTgsImlkIjoiMDE5ZTdkMzctZTUwMS03MGYwLTllYTMtMTU0NTQwMDVjM2Q4IiwicmlkIjoiMmQ2MGQ3NDItYTAyNy00YzQ1LTk4YTQtMjMzNDkxODNlMTRlIn0.e8npXzrba9aDKzEaazZSEY5eyF2pK6HAAEBbE6_L9MyEIJ-rLe-B6hCxmvbzI8E0VcK8G2vIAqf-dUBYhnSVBw`

---

## Verification

After adding all secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Verify all 7 secrets are listed:
   - ✓ NETLIFY_AUTH_TOKEN
   - ✓ NETLIFY_SITE_ID
   - ✓ VERCEL_TOKEN
   - ✓ VERCEL_ORG_ID
   - ✓ VERCEL_PROJECT_ID
   - ✓ TURSO_URL
   - ✓ TURSO_TOKEN

---

## Testing the Workflow

1. Make a commit to the `main` branch
2. Go to **Actions** tab in GitHub
3. Watch the "Deploy to Production" workflow run
4. Check deployment status in Netlify and Vercel dashboards

---

## Troubleshooting

### Workflow Fails with "Secret not found"
- Verify the secret name matches exactly (case-sensitive)
- Ensure the secret is added to the correct repository

### Netlify Deployment Fails
- Check NETLIFY_AUTH_TOKEN is valid
- Verify NETLIFY_SITE_ID is correct
- Check Netlify site settings

### Vercel Deployment Fails
- Check VERCEL_TOKEN is valid
- Verify VERCEL_ORG_ID and VERCEL_PROJECT_ID are correct
- Check Vercel project settings

### Database Connection Fails
- Verify TURSO_URL and TURSO_TOKEN are correct
- Test connection locally first
- Check Turso dashboard for any issues

---

## Security Notes

⚠️ **Important**: 
- Never commit secrets to the repository
- Rotate tokens periodically
- Use separate tokens for different environments if possible
- Review GitHub Actions logs carefully (they may expose sensitive information)
