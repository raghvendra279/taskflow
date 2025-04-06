import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Only create a Supabase client if both URL and key are available
// This prevents build errors when env vars aren't available
let supabaseInstance: SupabaseClient | null = null

// This check prevents errors during static site generation/build time
if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  // Only create the client if we have the required values
  if (supabaseUrl && supabaseKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey)
  }
}

// Export a function that returns the client or creates one if needed
export const getSupabase = (): SupabaseClient | null => {
  // If we're in a browser context and the client doesn't exist yet
  if (typeof window !== 'undefined' && !supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    
    if (supabaseUrl && supabaseKey) {
      supabaseInstance = createClient(supabaseUrl, supabaseKey)
    } else {
      console.error('Supabase credentials are not available')
    }
  }
  
  return supabaseInstance
}

// For backward compatibility with existing code
export const supabase = (typeof window !== 'undefined') 
  ? getSupabase() 
  : null 