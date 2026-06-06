export interface ResetPasswordRequest {
  password: string
  confirmPassword: string
  token?: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
  data?: any
}

export interface ResetPasswordState {
  isLoading: boolean
  error: string | null
  success: string | null
  password: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  resetPassword: (password: string, confirmPassword: string, token?: string) => Promise<void>
  setPassword: (password: string) => void
  setConfirmPassword: (confirmPassword: string) => void
  toggleShowPassword: () => void
  toggleShowConfirmPassword: () => void
  clearError: () => void
  clearSuccess: () => void
}