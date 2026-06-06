import React from 'react'
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const requirements = [
    { label: 'At least 8 characters', check: password.length >= 8 },
    { label: 'Contains uppercase letter', check: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', check: /[a-z]/.test(password) },
    { label: 'Contains a number', check: /[0-9]/.test(password) },
    { label: 'Contains special character', check: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  const strength = requirements.filter(r => r.check).length
  const strengthPercent = (strength / requirements.length) * 100
  
  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    if (strength <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak'
    if (strength <= 3) return 'Fair'
    if (strength <= 4) return 'Good'
    return 'Strong'
  }

  if (!password) return null

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">Password Strength:</span>
        <span className={`font-semibold ${
          strength <= 2 ? 'text-red-500' : 
          strength <= 3 ? 'text-yellow-500' : 
          strength <= 4 ? 'text-blue-500' : 'text-green-500'
        }`}>
          {getStrengthText()}
        </span>
      </div>
      
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strengthPercent}%` }}
        />
      </div>
      
      <div className="space-y-1.5">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {req.check ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <X className="w-3.5 h-3.5 text-gray-500" />
            )}
            <span className={req.check ? 'text-gray-300' : 'text-gray-500'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}