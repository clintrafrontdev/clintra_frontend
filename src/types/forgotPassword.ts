export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyOtpRequest {
  email: string
  otp: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
  confirmPassword: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

export interface PasswordState {
  step: 'email' | 'otp' | 'reset'
  email: string
  isLoading: boolean
  error: string | null
  success: string | null
  otpSent: boolean
  resendTimer: number
  sendOtp: (email: string) => Promise<void>
  verifyOtp: (otp: string) => Promise<void>
  resetPassword: (newPassword: string, confirmPassword: string) => Promise<void>
  resendOtp: () => Promise<void>
  setStep: (step: 'email' | 'otp' | 'reset') => void
  clearError: () => void
  clearSuccess: () => void
  startResendTimer: () => void
}