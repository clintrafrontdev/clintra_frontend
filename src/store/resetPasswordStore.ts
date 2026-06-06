import { create } from 'zustand'
import { ResetPasswordState } from '../types/resetPassword'
import { resetPasswordService } from '../services/resetPasswordService'

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => ({
  isLoading: false,
  error: null,
  success: null,
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,

  resetPassword: async (password: string, confirmPassword: string, token?: string) => {
    set({ isLoading: true, error: null, success: null })
    
    if (password !== confirmPassword) {
      set({ error: 'Passwords do not match', isLoading: false })
      return
    }
    
    try {
      const response = await resetPasswordService.resetPassword(password, confirmPassword, token)
      if (response.success) {
        set({ 
          success: response.message,
          isLoading: false,
          password: '',
          confirmPassword: ''
        })
        // Redirect to login after 2 seconds
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

  setPassword: (password: string) => set({ password }),
  setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleShowConfirmPassword: () => set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}))