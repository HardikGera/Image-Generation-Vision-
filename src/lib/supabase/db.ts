import { createClient as createClientBrowser } from '@/lib/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

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

type Profile = {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
};

// Client-side functions only
export const clientDb = {
  // Image functions
  async saveGeneratedImage(imageData: { url: string, prompt: string, mimeType: string, userId: string }) {
    const supabase = createClientBrowser();
    
    const { data, error } = await supabase
      .from('images')
      .insert({
        user_id: imageData.userId,
        prompt: imageData.prompt,
        url: imageData.url,
        mime_type: imageData.mimeType
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async getUserImages(userId: string): Promise<Image[]> {
    const supabase = createClientBrowser();
    const { data, error } = await supabase
      .from('images')
      .select('*, likes:likes(count)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  },
  
  async getLikedStatus(imageId: string, userId: string): Promise<boolean> {
    const supabase = createClientBrowser();
    const { data, error } = await supabase
      .from('likes')
      .select('*')
      .eq('image_id', imageId)
      .eq('user_id', userId)
      .maybeSingle();
      
    if (error) throw error;
    return !!data;
  },
  
  async toggleLike(imageId: string, userId: string): Promise<void> {
    const supabase = createClientBrowser();
    const isLiked = await this.getLikedStatus(imageId, userId);
    
    if (isLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('image_id', imageId)
        .eq('user_id', userId);
    } else {
      await supabase
        .from('likes')
        .insert({
          image_id: imageId,
          user_id: userId
        });
    }
  },
  
  // Profile functions
  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClientBrowser();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async updateProfile(userId: string, profile: Partial<Profile>): Promise<Profile> {
    const supabase = createClientBrowser();
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Get images for gallery (client-side version)
  async getAllImages(): Promise<Image[]> {
    const supabase = createClientBrowser();
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
  }
}; 