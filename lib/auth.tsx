'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { getSupabase } from './supabase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  session: Session | null
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  isSupabaseAvailable: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    // Only run this in the browser
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }
    
    const supabase = getSupabase()
    
    if (!supabase) {
      console.error('Supabase client not available in AuthProvider')
      setIsSupabaseAvailable(false)
      setLoading(false)
      return
    }
    
    setIsSupabaseAvailable(true)
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }
        
        setSession(session)
        setUser(session?.user || null)
        console.log("Initial auth session:", session ? "Active" : "None")
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change:", event, session ? "Session exists" : "No session")
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
        
        // If signed in, navigate to dashboard
        if (event === 'SIGNED_IN' && session) {
          console.log("Auth event SIGNED_IN, navigating to dashboard")
          // Use direct navigation instead of router.push for more reliable redirect
          window.location.href = '/dashboard'
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Supabase client not available')
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        throw error
      }
      
      // Immediately update the session and user state
      if (data.session) {
        setSession(data.session)
        setUser(data.user)
        console.log("Sign in successful, user state updated")
        
        // Use direct navigation instead of router.push for more reliable redirect
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Supabase client not available')
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  const signOut = async () => {
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Supabase client not available')
    }
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      // Clear the user and session state immediately
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    loading,
    isSupabaseAvailable
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 