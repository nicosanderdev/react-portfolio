import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONFIG } from '../config/supabase'

// Create Supabase client using centralized config
export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)

// Export types for better type safety
export type { User, Session } from '@supabase/supabase-js'