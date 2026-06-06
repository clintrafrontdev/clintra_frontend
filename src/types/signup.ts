export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignUpRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface VerifyEmailRequest {
  email: string
  token: string
}

export interface SignUpResponse {
  success: boolean
  message: string
  data?: {
    email: string
    token?: string
  }
}

export interface SignUpState {
  isLoading: boolean
  error: string | null
  success: string | null
  userEmail: string | null
  signUp: (data: SignUpData) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  resendVerification: (email: string) => Promise<void>
  clearError: () => void
  clearSuccess: () => void
}