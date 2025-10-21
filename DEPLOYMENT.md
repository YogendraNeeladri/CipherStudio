# CipherStudio Deployment Guide

This guide will help you deploy CipherStudio to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Vercel account
- Render account
- MongoDB Atlas account

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string

## Step 2: Deploy Backend to Render

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name**: `cipherstudio-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or set to `backend`)

3. **Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
   PORT=10000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://cipherstudio-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://cipherstudio-backend.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note the deployment URL (e.g., `https://cipherstudio.vercel.app`)

## Step 4: Update CORS Settings

Update your backend to allow requests from your Vercel domain:

1. Go to your Render service
2. Update the CORS configuration in `backend/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app'
  ],
  credentials: true
}))
```

3. Redeploy the backend

## Step 5: Test Deployment

1. Visit your Vercel URL
2. Create a new project
3. Add some code
4. Save the project
5. Refresh the page and verify the project loads

## Alternative Deployment Options

### Railway (Backend Alternative)

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Select the backend folder
4. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   ```
5. Deploy

### Netlify (Frontend Alternative)

1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set build settings:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/.next`
4. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=your-backend-url
   ```
5. Deploy

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
PORT=10000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your backend CORS settings include your frontend domain
   - Check that the API URL is correct

2. **MongoDB Connection Issues**
   - Verify your connection string is correct
   - Check that your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

3. **Build Failures**
   - Check that all dependencies are properly installed
   - Verify TypeScript compilation
   - Check for any missing environment variables

4. **API Not Found**
   - Verify the API URL in your frontend environment variables
   - Check that your backend is running and accessible
   - Test the API endpoints directly

### Debugging Steps

1. Check deployment logs in Vercel/Render
2. Test API endpoints with curl or Postman
3. Check browser console for errors
4. Verify environment variables are set correctly

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics for performance monitoring
- Monitor Core Web Vitals
- Track user interactions

### Render Monitoring
- Monitor service health
- Set up alerts for downtime
- Track resource usage

## Scaling Considerations

### Backend Scaling
- Consider upgrading Render plan for better performance
- Implement caching for frequently accessed projects
- Add rate limiting for API endpoints

### Frontend Scaling
- Use Vercel's edge functions for better performance
- Implement CDN for static assets
- Consider server-side rendering for better SEO

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to version control
   - Use strong MongoDB passwords
   - Rotate API keys regularly

2. **CORS Configuration**
   - Only allow necessary origins
   - Avoid using wildcard (*) in production

3. **Input Validation**
   - Validate all user inputs
   - Sanitize file names and content
   - Implement rate limiting

## Cost Optimization

### Vercel
- Use the free tier for small projects
- Consider Pro plan for production apps
- Monitor bandwidth usage

### Render
- Start with the free tier
- Upgrade based on usage
- Monitor resource consumption

### MongoDB Atlas
- Use the free M0 tier for development
- Upgrade based on data size and queries
- Implement data archiving for old projects
