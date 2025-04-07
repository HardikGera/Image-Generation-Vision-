# Setting Up Google Authentication with Supabase

This guide will walk you through the process of setting up Google Authentication for your application using Supabase.

## Prerequisites

1. A Supabase project
2. A Google Cloud Platform account
3. Your Next.js application with the necessary environment variables set up

## Step 1: Configure Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project or select an existing one.

2. In the sidebar, navigate to **APIs & Services** > **OAuth consent screen**.
   - Select the user type (External or Internal)
   - Fill in the required information (App name, User support email, Developer contact information)
   - Under **Authorized domains**, add your Supabase project's domain (`<PROJECT_ID>.supabase.co`)
   - Add the following scopes:
     - `.../auth/userinfo.email`
     - `...auth/userinfo.profile`
     - `openid`
   - Click **Save and Continue** through the remaining screens

3. Navigate to **APIs & Services** > **Credentials**.
   - Click **Create Credentials** and select **OAuth Client ID**
   - For Application type, choose **Web application**
   - Add a name for your OAuth client
   - Under **Authorized JavaScript origins**, add:
     - Your production domain (e.g., `https://your-app.com`)
     - Your local development URL (e.g., `http://localhost:3000`)
   - Under **Authorized redirect URIs**, add the callback URL from the Supabase dashboard:
     - You can find this in the Supabase Dashboard under **Authentication** > **Providers** > **Google**
     - It will look something like: `https://<YOUR_PROJECT_ID>.supabase.co/auth/v1/callback`
   - Click **Create**

4. After creating the client, you'll be shown your **Client ID** and **Client Secret**. Save these for the next step.

## Step 2: Configure Supabase Authentication

1. Go to your Supabase Dashboard and navigate to **Authentication** > **Providers**.

2. Find and enable **Google** from the list of providers.

3. Enter the **Client ID** and **Client Secret** from Google Cloud Console.

4. Save the changes.

## Step 3: Configure Your Next.js Application

1. Create or update your `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   ```

2. Make sure your Supabase client is properly set up to handle authentication.

3. Implement the Google Sign-In component in your application.

4. Set up a callback route in your Next.js application to handle the OAuth flow.

## Testing the Authentication Flow

1. Start your application locally.

2. Navigate to the login page and click the "Sign in with Google" button.

3. You should be redirected to Google's consent screen.

4. After granting consent, you should be redirected back to your application and be signed in.

## Troubleshooting

- **Error: "redirect_uri_mismatch"**: Make sure the redirect URI in Google Cloud Console matches exactly with the one provided by Supabase.

- **Error: "invalid_client"**: Double-check that the Client ID and Client Secret are correctly copied from Google Cloud Console to Supabase.

- **CORS Issues**: Ensure that your application's domain is added to the authorized JavaScript origins in Google Cloud Console.

- **Callback Not Working**: Verify that the auth callback route is correctly set up in your Next.js application.

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Next.js with Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs) 