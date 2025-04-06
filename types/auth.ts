import { User } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface AuthFormValues {
  email: string
  password: string
}

export interface SignupFormValues extends AuthFormValues {
  confirmPassword: string
}

export enum AuthMode {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  RESET_PASSWORD = 'reset_password'
}