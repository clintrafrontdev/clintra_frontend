import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, LoginCredentials, RegisterData, User } from '../types/auth'
import { authService } from '../services/authService'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(credentials)
          if (response.success && response.data) {
            localStorage.setItem('auth_token', response.data.token)
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            })
            // Check if onboarding is needed
            const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted')
            if (!hasCompletedOnboarding) {
              window.location.href = '/company/details'
            }
          } else {
            set({ error: response.message || 'Login failed', isLoading: false })
          }
        } catch (error: any) {
          set({ error: error.message || 'Login failed', isLoading: false })
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(data)
          if (response.success && response.data) {
            localStorage.setItem('auth_token', response.data.token)
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
            })
            window.location.href = '/company/details'
          } else {
            set({ error: response.message || 'Registration failed', isLoading: false })
          }
        } catch (error: any) {
          set({ error: error.message || 'Registration failed', isLoading: false })
        }
      },

      logout: () => {
        authService.logout()
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        localStorage.removeItem('hasSeenWelcome')
        localStorage.removeItem('onboardingCompleted')
        set({ user: null, isAuthenticated: false, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)