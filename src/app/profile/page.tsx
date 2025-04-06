import { redirect } from 'next/navigation';
import ProfileSettings from '@/components/ProfileSettings';
import { requireAuth } from '@/lib/utils/auth';

export default async function ProfilePage() {
  // Server-side authentication check
  const user = await requireAuth();
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8">
          Profile Settings
        </h1>
        
        <ProfileSettings userId={user.id} />
      </div>
    </div>
  );
} 