import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSignupStore } from '../store/signupStore'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'

export const ConfirmEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const token = searchParams.get('token')

  const { verifyEmail, resendVerification, isLoading, error, success, clearError, clearSuccess } = useSignupStore()
  const [resendSuccess, setResendSuccess] = React.useState(false)

  React.useEffect(() => {
    if (token) verifyEmail(token)
    return () => { clearError(); clearSuccess() }
  }, [token])

  const handleResend = async () => {
    if (!email) return
    setResendSuccess(false)
    await resendVerification(email)
    setResendSuccess(true)
    setTimeout(() => setResendSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] text-center">

        {/* Pink envelope illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Envelope SVG — matches screenshot exactly */}
            <svg width="130" height="120" viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Blue spark left */}
              <line x1="22" y1="28" x2="14" y2="18" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="16" y1="32" x2="6"  y2="30" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="20" y1="38" x2="10" y2="44" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round"/>
              {/* Orange spark right */}
              <line x1="100" y1="22" x2="110" y2="14" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="108" y1="30" x2="120" y2="26" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round"/>
              {/* Envelope body */}
              <rect x="20" y="35" width="90" height="68" rx="8" fill="#e879a8"/>
              {/* Envelope flap */}
              <path d="M20 43 L65 75 L110 43" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinejoin="round"/>
              {/* White letter */}
              <rect x="36" y="20" width="58" height="55" rx="4" fill="white"/>
              {/* Letter lines */}
              <rect x="44" y="33" width="42" height="4" rx="2" fill="#e5e7eb"/>
              <rect x="44" y="43" width="34" height="4" rx="2" fill="#e5e7eb"/>
              <rect x="44" y="53" width="38" height="4" rx="2" fill="#e5e7eb"/>
              {/* X lines on envelope */}
              <line x1="20" y1="103" x2="65" y2="75" stroke="#1a1a2e" strokeWidth="2.5"/>
              <line x1="110" y1="103" x2="65" y2="75" stroke="#1a1a2e" strokeWidth="2.5"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-cyan-500 mb-4">
          Confirm Your Email Address
        </h1>

        {/* Alerts */}
        {(success || resendSuccess) && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2 text-left">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{success || 'Verification email resent successfully!'}</span>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-base mb-4 leading-relaxed">
          Thank you for signing up with Clintra! We're thrilled to have you on board. Your Email
        </p>

        {/* Email display */}
        <p className="text-gray-700 text-base mb-6">
          Your Email{' '}
          <span className="text-cyan-500 font-medium">{email || 'user@zonopact.com'}</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={handleResend}
          disabled={isLoading || !email}
          className="w-full py-4 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-white font-bold text-base transition-all active:scale-[0.98] disabled:opacity-60 shadow-md mb-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Confirm your email address
            </span>
          )}
        </button>

        {/* Footer note */}
        <p className="text-gray-600 text-sm mb-8">
          Check your inbox for a verification email and click the link to verify
        </p>

        <Link to="/login" className="text-cyan-500 text-sm hover:underline font-medium">
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}
