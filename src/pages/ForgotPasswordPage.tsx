import React from 'react'
import { Link } from 'react-router-dom'
import { usePasswordStore } from '../store/passwordStore'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { OtpInput } from '../components/ui/OtpInput'
import { validateEmail } from '../utils/validators'
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Key, Send } from 'lucide-react'

export const ForgotPasswordPage: React.FC = () => {
  const { 
    step, 
    isLoading, 
    error, 
    success, 
    resendTimer,
    sendOtp, 
    verifyOtp, 
    resendOtp,
    clearError,
    clearSuccess,
    setStep
  } = usePasswordStore()

  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [otp, setOtp] = React.useState('')

  React.useEffect(() => {
    return () => {
      clearError()
      clearSuccess()
    }
  }, [])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    await sendOtp(email)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) return
    await verifyOtp(otp)
  }

  return (
    <AuthLayout 
      title={step === 'email' ? "Lost your password?" : "Enter OTP"}
      subtitle={step === 'email' 
        ? "Please enter your email address. You will receive a link to create a new password via email."
        : "We've sent a 6-digit code to your email"
      }
    >
      {step !== 'email' && (
        <button
          onClick={() => setStep('email')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
      )}

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

      {step === 'email' && (
        <form onSubmit={handleSendOtp} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-4 h-4" />}
            error={emailError}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Reset Link
          </Button>

          <div className="text-center">
            <Link to="/login" className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <OtpInput
            value={otp}
            onChange={setOtp}
            error={error || undefined}
            length={6}
          />

          <div className="text-center">
            <button
              type="button"
              onClick={resendOtp}
              disabled={resendTimer > 0}
              className={`text-sm transition-colors ${
                resendTimer > 0 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-primary hover:text-primary/80'
              }`}
            >
              {resendTimer > 0 
                ? `Resend OTP in ${resendTimer}s` 
                : 'Resend OTP'}
            </button>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Verify OTP
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}