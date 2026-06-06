import { api } from './api'
import { ApiResponse } from '../types/forgotPassword'

export const passwordService = {
  async sendOtp(email: string): Promise<ApiResponse> {
    try {
      // Demo OTP is 123456
      return {
        success: true,
        message: 'OTP sent successfully to your email',
        data: { otp: '123456' }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to send OTP'
      }
    }
  },

  async verifyOtp(email: string, otp: string): Promise<ApiResponse> {
    try {
      if (otp === '123456') {
        return {
          success: true,
          message: 'OTP verified successfully'
        }
      }
      return {
        success: false,
        message: 'Invalid OTP. Please try again.'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'OTP verification failed'
      }
    }
  },

  async resetPassword(email: string, otp: string, newPassword: string): Promise<ApiResponse> {
    try {
      return {
        success: true,
        message: 'Password reset successfully! Please login with your new password.'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Password reset failed'
      }
    }
  }
}