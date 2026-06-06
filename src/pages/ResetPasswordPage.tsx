import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useResetPasswordStore } from '../store/resetPasswordStore'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/common/Button'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

export const ResetPasswordPage: React.FC = () => {
  const {
    isLoading,
    error,
    success,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    resetPassword,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    clearError,
    clearSuccess
  } = useResetPasswordStore()

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || undefined

  React.useEffect(() => {
    return () => {
      clearError()
      clearSuccess()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await resetPassword(password, confirmPassword, token)
  }

  const getPasswordStrength = () => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
    
    if (strength <= 2) return { text: 'Weak', color: 'text-red-500', bg: 'bg-red-500' }
    if (strength <= 3) return { text: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500' }
    if (strength <= 4) return { text: 'Good', color: 'text-blue-500', bg: 'bg-blue-500' }
    return { text: 'Strong', color: 'text-green-500', bg: 'bg-green-500' }
  }

  const strength = getPasswordStrength()
  const strengthPercent = (password.length > 0 ? 
    (strength.text === 'Weak' ? 25 : strength.text === 'Fair' ? 50 : strength.text === 'Good' ? 75 : 100) : 0)

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password below">
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            New Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {password && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Password Strength:</span>
                <span className={strength.color}>{strength.text}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${strength.bg}`}
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="w-full"
          disabled={!password || !confirmPassword || password !== confirmPassword}
        >
          Reset Password
        </Button>

        <div className="text-center">
          <Link to="/login" className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}