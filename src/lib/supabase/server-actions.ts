'use server';

import { createClient } from '@/lib/supabase/server';

type Image = {
  id: string;
  url: string;
  prompt: string;
  mime_type: string;
  width?: number;
  height?: number;
  user_id: string;
  created_at: string;
  likes_count?: number;
  liked_by_user?: boolean;
};

// Server-side functions
export const serverDb = {
  // Image functions
  async getAllImages(): Promise<Image[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('images')
      .select(`
        *,
        profiles:profiles(username, avatar_url),
        likes_count:likes(count)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  },
  
  async getImageById(id: string): Promise<Image | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('images')
      .select(`
        *,
        profiles:profiles(username, avatar_url),
        likes_count:likes(count)
      `)
      .eq('id', id)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  
  async getImagesByUserId(userId: string): Promise<Image[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('images')
      .select(`
        *,
        profiles:profiles(username, avatar_url),
        likes_count:likes(count)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  }
}; 