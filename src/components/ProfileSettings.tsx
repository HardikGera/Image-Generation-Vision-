'use client';

import { useState, useEffect } from 'react';
import { clientDb } from '@/lib/supabase/db';
import { useAuth } from '@/lib/hooks/useAuth';

type ProfileFormData = {
  username: string;
  full_name: string;
  website: string;
};

export default function ProfileSettings({ userId }: { userId: string }) {
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    full_name: '',
    website: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const profile = await clientDb.getProfile(userId);
        
        if (profile) {
          setFormData({
            username: profile.username || '',
            full_name: profile.full_name || '',
            website: profile.website || '',
          });
        }
      } catch (error: any) {
        console.error('Error loading profile:', error);
        setError(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [userId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setMessage(null);
      
      await clientDb.updateProfile(userId, formData);
      
      setMessage('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
    // The page will redirect to login automatically because of the middleware
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-center">
          <p className="text-red-200">{error}</p>
        </div>
      )}
      
      {message && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg text-center">
          <p className="text-green-200">{message}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-400">
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-purple-500 focus:border-purple-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-400">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="full_name"
              name="full_name"
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-purple-500 focus:border-purple-500"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-400">
            Website
          </label>
          <div className="mt-1">
            <input
              id="website"
              name="website"
              type="url"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-purple-500 focus:border-purple-500"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow ${
              saving ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow"
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
} 