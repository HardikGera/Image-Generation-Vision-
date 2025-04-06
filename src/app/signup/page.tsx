import SignUp from '@/components/SignUp';
import { getUser } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  // Check if user is already logged in
  const user = await getUser();
  
  if (user) {
    redirect('/');
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-white mb-8">
          Create an account
        </h1>
        
        <SignUp />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-purple-500 hover:text-purple-400">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
 