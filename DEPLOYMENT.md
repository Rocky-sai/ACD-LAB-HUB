# Deployment Guide

This guide will walk you through deploying the Quantum Valley application to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Vercel account (for frontend)
- Render account (for backend)

---

## Step 1: MongoDB Atlas Setup

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Select "Free" tier (M0)
   - Choose a cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" > "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `quantum-valley`
   - Example: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/quantum-valley?retryWrites=true&w=majority`

---

## Step 2: Backend Deployment (Render)

1. **Create Render Account**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name:** `quantum-valley-backend`
   - **Environment:** Node
   - **Region:** Choose closest to you
   - **Branch:** main (or your branch name)
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables**
   Click "Advanced" and add:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<generate-a-random-secure-string>
   ```

   To generate a secure JWT_SECRET:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://quantum-valley-backend.onrender.com`)

6. **Test Backend**
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Quantum Valley API is running"}`

---

## Step 3: Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Replace with your actual Render backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a URL like `https://quantum-valley.vercel.app`

6. **Configure Custom Domain (Optional)**
   - Go to "Settings" > "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

---

## Step 4: Post-Deployment Configuration

### Update CORS in Backend

Edit `backend/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'https://quantum-valley.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:5173' // for local development
  ],
  credentials: true
}));
```

Commit and push to trigger redeployment.

### Verify Deployment

1. **Test Frontend**
   - Visit your Vercel URL
   - Navigate through the site
   - Check that all pages load

2. **Test Authentication**
   - Sign up with a new account
   - Login with credentials
   - Check dashboard

3. **Test API Integration**
   - View roadmap
   - Mark topics complete
   - Generate certificate
   - Check browser console for errors

---

## Step 5: Monitoring & Maintenance

### Render Monitoring
- View logs in Render dashboard
- Set up health checks
- Configure auto-deploy on git push

### Vercel Monitoring
- View deployment logs
- Check analytics
- Monitor performance

### MongoDB Atlas Monitoring
- Monitor database performance
- Set up alerts
- View metrics

---

## Troubleshooting

### Backend Issues

**Problem:** Backend not connecting to MongoDB
- Check MongoDB URI is correct
- Verify IP whitelist includes 0.0.0.0/0
- Check database user credentials

**Problem:** JWT errors
- Verify JWT_SECRET is set in environment variables
- Check token format in frontend requests

**Problem:** CORS errors
- Update CORS configuration in server.js
- Verify frontend URL is allowed

### Frontend Issues

**Problem:** API calls failing
- Check VITE_API_URL environment variable
- Verify backend is running
- Check browser console for errors

**Problem:** Build fails
- Check all dependencies are installed
- Verify Vite configuration
- Check for syntax errors

### Database Issues

**Problem:** Connection timeout
- Check network access settings
- Verify connection string
- Check firewall settings

**Problem:** Slow queries
- Add indexes to frequently queried fields
- Monitor query performance
- Consider upgrading cluster tier

---

## Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use strong, random JWT secrets
   - Rotate secrets periodically

2. **Database**
   - Use strong passwords
   - Enable audit logs
   - Regular backups
   - Monitor access

3. **API**
   - Implement rate limiting
   - Add request validation
   - Use HTTPS only
   - Monitor for suspicious activity

4. **Frontend**
   - Enable CSP headers
   - Sanitize user inputs
   - Use secure cookies
   - Regular security audits

---

## Updating the Application

### Update Backend
```bash
# Make changes locally
git add .
git commit -m "Update message"
git push origin main
```
Render will automatically redeploy.

### Update Frontend
```bash
# Make changes locally
git add .
git commit -m "Update message"
git push origin main
```
Vercel will automatically redeploy.

---

## Scaling Considerations

### When to Scale

- **Database:** >500 concurrent users
- **Backend:** High CPU/memory usage
- **Frontend:** CDN for global users

### Scaling Options

1. **Database**
   - Upgrade MongoDB Atlas tier
   - Add read replicas
   - Implement caching (Redis)

2. **Backend**
   - Upgrade Render plan
   - Add horizontal scaling
   - Implement load balancing

3. **Frontend**
   - Vercel automatically scales
   - Consider CDN for assets
   - Optimize bundle size

---

## Cost Estimates

### Free Tier (Current Setup)
- MongoDB Atlas: Free (M0)
- Render: Free (with limitations)
- Vercel: Free (hobby plan)
- **Total: $0/month**

### Production Ready
- MongoDB Atlas: ~$57/month (M10)
- Render: ~$7-25/month
- Vercel: ~$20/month (Pro)
- **Total: ~$84-102/month**

---

## Support

For deployment issues:
1. Check platform documentation
2. Review logs for errors
3. Open GitHub issue
4. Contact platform support

---

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure backups
3. Implement analytics
4. Add error tracking (Sentry)
5. Set up CI/CD pipelines
6. Performance optimization
7. SEO improvements
8. User feedback collection

---

**Congratulations! Your Quantum Valley application is now live! 🎉**
