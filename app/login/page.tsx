"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"

// Component that uses search params
function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn, isSupabaseAvailable, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if there's a redirect parameter
  const redirectPath = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    // Add a fallback redirect for already authenticated users
    if (user) {
      console.log("User already authenticated in login page, redirecting to dashboard")
      window.location.href = redirectPath
    }

    // Check for error params in URL
    const errorType = searchParams.get('error')
    if (errorType === 'config') {
      setError('Missing Supabase configuration. Please check environment variables.')
    } else if (errorType === 'auth') {
      setError('Authentication error. Please try again.')
    }
  }, [user, redirectPath, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login form submitted with:", { email, password })
    setLoading(true)
    setError(null)

    if (!isSupabaseAvailable) {
      setError("Supabase connection is not available. Please try again later.")
      setLoading(false)
      return
    }

    try {
      await signIn(email, password)
      // Navigation is now handled by the auth context
    } catch (err: any) {
      // Check for specific Supabase error codes
      if (err.message?.includes('Invalid login credentials')) {
        setError("Invalid email or password. Please try again.")
      } else if (err.message?.includes('Email not confirmed')) {
        setError("Please confirm your email before logging in.")
      } else {
        setError("An error occurred during login. Please try again.")
      }
      console.error("Login error:", err)
      setLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Email changing to:", e.target.value)
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Password changing")
    setPassword(e.target.value)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to TaskFlow</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your tasks
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {!isSupabaseAvailable && !error && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-md text-sm">
                Warning: Supabase connection is not available. Login may not work.
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                key="email-input"
                id="email" 
                name="email"
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                key="password-input"
                id="password" 
                name="password"
                type="password" 
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// Fallback loading state for Suspense
function LoginFormFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    </div>
  )
}

// Main page component with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  )
} 