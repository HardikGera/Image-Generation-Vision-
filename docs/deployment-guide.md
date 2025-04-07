# Deployment Guide for Vision AI Image Generator

This documentation provides detailed information about deploying the Vision AI Image Generator application to Vercel and other platforms.

## Live Demo

Experience Vision in action: [https://image-generation-vision.vercel.app/](https://image-generation-vision.vercel.app/)

## Vercel Deployment

Vercel is the recommended platform for deploying this Next.js application. It provides seamless integration with Next.js and offers a straightforward deployment process.

### Prerequisites

Before deploying to Vercel, ensure you have:

1. A GitHub, GitLab, or Bitbucket account where your code is hosted
2. A Vercel account (can be created at [vercel.com](https://vercel.com))
3. A Stability AI API key from [DreamStudio](https://beta.dreamstudio.ai/membership?tab=apiKeys)
4. A Supabase project with authentication set up

### Step-by-Step Deployment Guide

1. **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with your account.

2. **Import your repository**:
   - Click "Add New" → "Project"
   - Connect to your Git provider if you haven't already
   - Select the repository containing your Vision AI Image Generator code
   - Vercel will automatically detect that it's a Next.js application

3. **Configure project settings**:
   - Project Name: Choose a name for your deployment (e.g., "vision-ai-generator")
   - Framework Preset: Next.js (should be automatically detected)
   - Root Directory: Leave as is (if your code is in the root directory)

4. **Environment Variables**:
   - Add the following environment variables:
     - `STABILITY_API_KEY`: Your Stability AI API key
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

5. **Deploy**: Click the "Deploy" button and wait for the build to complete.

6. **Custom Domain (Optional)**:
   - After deployment, go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain and follow the instructions to configure DNS

### One-Click Deployment

You can also use the button below for one-click deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHardikGera%2FImage-Generation-Vision-&env=STABILITY_API_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=API%20keys%20required%20for%20the%20application)

## Updating Your Deployment

When you push changes to your repository, Vercel will automatically rebuild and redeploy your application. You can also trigger manual deployments from the Vercel dashboard.

### Deployment Settings

You can customize your deployment settings in the Vercel dashboard:

1. **Build and Development Settings**:
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Development Command: `npm run dev` (default)

2. **Environment Variables**:
   - You can add, edit, or remove environment variables at any time
   - Changes to environment variables will trigger a redeployment

3. **Preview Deployments**:
   - Vercel automatically creates preview deployments for pull requests
   - This allows you to test changes before merging to your main branch

## Troubleshooting Deployment Issues

### Common Errors

1. **Build Failures**:
   - Check the build logs in the Vercel dashboard
   - Ensure all dependencies are properly installed
   - Verify that your code compiles without errors locally

2. **API Key Issues**:
   - Verify that all environment variables are correctly set
   - Check that your Stability AI API key has sufficient credits
   - Ensure your Supabase project is properly configured

3. **Missing Dependencies**:
   - If you've added new dependencies, make sure they're listed in your `package.json`

4. **Image Generation Failures**:
   - Check browser console for detailed error messages
   - Verify your Stability AI account has sufficient credits

## Alternative Deployment Options

### Deploying to Netlify

1. Log in to Netlify and click "Add new site" → "Import an existing project"
2. Connect to your Git repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

### Deploying to a Custom Server

1. Build your application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Use a process manager like PM2 to keep your application running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "vision-ai" -- start
   ```

## Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stability AI API Documentation](https://platform.stability.ai/docs/api-reference) 