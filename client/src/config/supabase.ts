// Supabase configuration
// This file documents the required environment variables for Supabase integration

export const SUPABASE_CONFIG = {
  // These should be set in your .env.local file
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
} as const;

// Validation - will throw error if environment variables are missing
if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  console.error('Required variables:');
  console.error('  VITE_SUPABASE_URL=your-supabase-project-url');
  console.error('  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key');
}