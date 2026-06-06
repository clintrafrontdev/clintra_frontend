import { create } from 'zustand'
import { PasswordState } from '../types/forgotPassword'
import { passwordService } from '../services/passwordService'

export const usePasswordStore = create<PasswordState>((set, get) => ({
  step: 'email',
  email: '',
  isLoading: false,
  error: null,
  success: null,
  otpSent: false,
  resendTimer: 0,

  sendOtp: async (email: string) => {
    set({ isLoading: true, error: null, email })
    try {
      const response = await passwordService.sendOtp(email)
      if (response.success) {
        set({ 
          otpSent: true, 
          step: 'otp',
          success: response.message,
          isLoading: false 
        })
        get().startResendTimer()
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to send OTP', isLoading: false })
    }
  },

  verifyOtp: async (otp: string) => {
    set({ isLoading: true, error: null })
    const { email } = get()
    try {
      const response = await passwordService.verifyOtp(email, otp)
      if (response.success) {
        set({ 
          success: response.message,
          isLoading: false,
          step: 'email'
        })
        // Redirect to reset-password page with email
        setTimeout(() => {
          window.location.href = `/reset-password?email=${encodeURIComponent(email)}`
        }, 1000)
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'OTP verification failed', isLoading: false })
    }
  },

  resetPassword: async (newPassword: string, confirmPassword: string) => {
    set({ isLoading: true, error: null })
    const { email } = get()
    
    if (newPassword !== confirmPassword) {
      set({ error: 'Passwords do not match', isLoading: false })
      return
    }
    
    try {
      const response = await passwordService.resetPassword(email, '', newPassword)
      if (response.success) {
        set({ 
          success: response.message,
          isLoading: false,
          step: 'email'
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Password reset failed', isLoading: false })
    }
  },

  resendOtp: async () => {
    const { email, resendTimer } = get()
    if (resendTimer > 0) return
    
    set({ isLoading: true, error: null })
    try {
      const response = await passwordService.sendOtp(email)
      if (response.success) {
        set({ 
          success: 'OTP resent successfully',
          isLoading: false 
        })
        get().startResendTimer()
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to resend OTP', isLoading: false })
    }
  },

  startResendTimer: () => {
    set({ resendTimer: 60 })
    const timer = setInterval(() => {
      const currentTimer = get().resendTimer
      if (currentTimer <= 1) {
        clearInterval(timer)
        set({ resendTimer: 0 })
      } else {
        set({ resendTimer: currentTimer - 1 })
      }
    }, 1000)
  },

  setStep: (step) => set({ step }),
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}))