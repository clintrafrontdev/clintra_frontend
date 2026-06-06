import { api } from './api'
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Mock API call - demo ke liye
      const mockResponse = {
        success: true,
        data: {
          user: {
            id: '1',
            firstName: 'Demo',
            lastName: 'User',
            email: credentials.username,
          },
          token: 'mock-token-123'
        }
      }
      return mockResponse
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const mockResponse = {
        success: true,
        data: {
          user: {
            id: '1',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
          token: 'mock-token-123'
        }
      }
      return mockResponse
    } catch (error: any) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  async logout(): Promise<void> {
    try {
      console.log('Logged out')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      return null
    } catch (error) {
      return null
    }
  }
}