import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/common/Button'
import { CheckCircle, PartyPopper, ArrowRight } from 'lucide-react'

export const SignupSuccessPopup: React.FC = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem('signupEmail') || ''

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AuthLayout title="Welcome to Clintra!" subtitle="Your account has been created successfully">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-12 h-12 text-white" />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-500 font-semibold">Registration Successful!</span>
          </div>
          <p className="text-gray-300">
            A verification email has been sent to
          </p>
          <p className="text-white font-semibold mt-1">{email || 'your email address'}</p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <p className="text-gray-400 text-sm">
            Please check your inbox and click the verification link to activate your account.
            You'll be redirected to login in a few seconds.
          </p>
        </div>

        <Button onClick={() => navigate('/login')} className="w-full gap-2">
          Go to Login
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </AuthLayout>
  )
}