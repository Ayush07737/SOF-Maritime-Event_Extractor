import { supabase } from '../lib/supabase';

class AuthService {
  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase?.auth?.getSession();
    if (error) {
      console.error('Session error:', error);
      return null;
    }
    return session;
  }

  // Get current user
  async getCurrentUser() {
    const session = await this.getCurrentSession();
    return session?.user || null;
  }

  // Sign in with demo credentials (for testing)
  async signInDemo() {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email: 'demo@maritime.com',
        password: 'demo123'
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Demo sign in error:', error);
      throw error;
    }
  }

  // Sign up new user
  async signUp(email, password, fullName) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();