import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupStore } from '../store/signupStore'
import { validateEmail, validatePasswordStrength } from '../utils/validators'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

// Shared pill input style
const pillInput =
  'w-full pl-5 pr-5 py-3.5 rounded-full text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition'

const pillStyle = {
  background: 'rgba(255,255,255,0.32)',
  border: '1px solid rgba(255,255,255,0.55)',
}

export const SignUpPage: React.FC = () => {
  const { signUp, isLoading, error, success, clearError } = useSignupStore()
  const navigate = useNavigate()

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    return () => clearError()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required'
    const ps = validatePasswordStrength(formData.password)
    if (!ps.isValid) newErrors.password = ps.message
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    await signUp(formData)
    if (success) {
      setTimeout(() => {
        navigate(`/confirm-email?email=${encodeURIComponent(formData.email)}`)
      }, 1500)
    }
  }

  const update = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [field]: e.target.value })

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/auth-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[660px] rounded-3xl shadow-2xl px-10 py-10"
        style={{
          background: 'rgba(160, 160, 170, 0.45)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-7">Sign Up</h2>

        {/* Success / Error alerts */}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-100/60 border border-green-400/40 text-green-800 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100/60 border border-red-400/40 text-red-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* First Name + Last Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={formData.firstName}
                onChange={update('firstName')}
                placeholder="First Name"
                className={pillInput}
                style={pillStyle}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-700 pl-3">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                value={formData.lastName}
                onChange={update('lastName')}
                placeholder="Last Name"
                className={pillInput}
                style={pillStyle}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-700 pl-3">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={update('email')}
              placeholder="Email"
              className={pillInput}
              style={pillStyle}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-700 pl-3">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={update('password')}
                placeholder="Password"
                className={`${pillInput} pr-12`}
                style={pillStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-700 pl-3">{errors.password}</p>
            )}
          </div>

          {/* Re-enter Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={update('confirmPassword')}
                placeholder="Re-enter password"
                className={`${pillInput} pr-12`}
                style={pillStyle}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-700 pl-3">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-white text-cyan-500 font-bold text-base tracking-wide shadow-md hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 mt-1"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-cyan-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing up...
              </span>
            ) : 'Sign up'}
          </button>

          {/* Login link */}
          <div className="text-center pt-1">
            <span className="text-sm text-gray-800">
              already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-gray-900 hover:text-blue-600 transition"
              >
                Login
              </Link>
            </span>
          </div>
        </form>

        {/* Clintra Logo — bottom of card */}
        <div className="flex justify-center mt-8 pt-6 border-t border-white/30">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Clintra"
              className="h-14 w-auto object-contain drop-shadow-md"
            />
            
          </div>
        </div>
      </div>
    </div>
  )
}
