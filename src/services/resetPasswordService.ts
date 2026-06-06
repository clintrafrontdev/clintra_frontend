import { api } from './api'
import { ResetPasswordResponse } from '../types/resetPassword'

export const resetPasswordService = {
  async resetPassword(password: string, confirmPassword: string, token?: string): Promise<ResetPasswordResponse> {
    try {
      // Demo API call - Replace with actual endpoint
      // const response = await api.post('/auth/reset-password', { password, confirmPassword, token })
      // return response.data
      
      // Mock response for demo
      if (password !== confirmPassword) {
        return {
          success: false,
          message: 'Passwords do not match'
        }
      }
      
      if (password.length < 8) {
        return {
          success: false,
          message: 'Password must be at least 8 characters'
        }
      }
      
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