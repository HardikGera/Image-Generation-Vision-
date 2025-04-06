# Supabase Authentication Documentation

This documentation provides information about using Supabase for authentication in our Next.js application.

## Setup

1. Install the Supabase packages:
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

2. Set up environment variables (in `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Implementation Details

### Supabase Client

The Supabase client is implemented in `src/lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Authentication Pages

The application contains the following authentication pages:

- `src/app/login/page.tsx`: Login page
- `src/app/signup/page.tsx`: Signup page
- `src/app/profile/page.tsx`: User profile page

### Authentication Flow

1. **User Signup**:
   - User submits email and password
   - Supabase creates a new user account
   - User is redirected to login page

2. **User Login**:
   - User submits email and password
   - Supabase authenticates the user
   - On successful login, user is redirected to the home page or profile

3. **User Profile**:
   - Protected page that requires authentication
   - Displays user information
   - Allows user to update profile details

### Middleware

Authentication middleware is implemented in `src/middleware.ts` to protect routes that require authentication:

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect to login if accessing protected routes without authentication
  if (!session && req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/profile/:path*'],
};
```

## User Data Schema

In your Supabase project, you can create additional tables to store user-related data:

1. **profiles table**:
   - `id`: UUID (references auth.users.id)
   - `username`: Text
   - `full_name`: Text
   - `avatar_url`: Text (URL to user avatar)
   - `created_at`: Timestamp

## Official Documentation

For more detailed information, refer to the official Supabase documentation:
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs) 