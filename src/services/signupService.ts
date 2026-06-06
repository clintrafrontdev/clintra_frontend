import { api } from './api'
import { SignUpRequest, SignUpResponse } from '../types/signup'

export const signupService = {
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      // Demo - Always success with demo token
      return {
        success: true,
        message: 'Account created successfully! Please verify your email.',
        data: {
          email: data.email,
          token: 'demo-verification-token-123'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Signup failed'
      }
    }
  },

  async verifyEmail(email: string, token: string): Promise<SignUpResponse> {
    try {
      if (token === 'demo-verification-token-123') {
        return {
          success: true,
          message: 'Email verified successfully! You can now login.'
        }
      }
      return {
        success: false,
        message: 'Invalid or expired verification token'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Email verification failed'
      }
    }
  },

  async resendVerification(email: string): Promise<SignUpResponse> {
    try {
      return {
        success: true,
        message: 'Verification email resent successfully!'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to resend verification email'
      }
    }
  }
}