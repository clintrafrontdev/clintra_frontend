import { create } from 'zustand'
import { SignUpState, SignUpData } from '../types/signup'
import { signupService } from '../services/signupService'

export const useSignupStore = create<SignUpState>((set, get) => ({
  isLoading: false,
  error: null,
  success: null,
  userEmail: null,

  signUp: async (data: SignUpData) => {
    set({ isLoading: true, error: null, success: null })
    
    if (data.password !== data.confirmPassword) {
      set({ error: 'Passwords do not match', isLoading: false })
      return
    }
    
    try {
      const { confirmPassword, ...requestData } = data
      const response = await signupService.signUp(requestData)
      
      if (response.success) {
        set({ 
          success: response.message,
          userEmail: data.email,
          isLoading: false 
        })
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Signup failed', isLoading: false })
    }
  },

  verifyEmail: async (token: string) => {
    set({ isLoading: true, error: null })
    const { userEmail } = get()
    
    if (!userEmail) {
      set({ error: 'No email found', isLoading: false })
      return
    }
    
    try {
      const response = await signupService.verifyEmail(userEmail, token)
      if (response.success) {
        set({ 
          success: response.message,
          isLoading: false 
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Verification failed', isLoading: false })
    }
  },

  resendVerification: async (email: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await signupService.resendVerification(email)
      if (response.success) {
        set({ 
          success: response.message,
          isLoading: false 
        })
      } else {
        set({ error: response.message, isLoading: false })
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to resend', isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}))