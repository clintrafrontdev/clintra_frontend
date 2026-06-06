export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateName = (name: string): boolean => {
  return name.length >= 2
}

// NAYA FUNCTION - Password Strength Validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean
  hasMinLength: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
  message: string
} => {
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  
  let message = ''
  if (!hasMinLength) message = 'Password must be at least 8 characters'
  else if (!hasUppercase) message = 'Password must contain an uppercase letter'
  else if (!hasLowercase) message = 'Password must contain a lowercase letter'
  else if (!hasNumber) message = 'Password must contain a number'
  else if (!hasSpecialChar) message = 'Password must contain a special character'
  
  return {
    isValid,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    message
  }
}

// NAYA FUNCTION - OTP Validation
export const validateOtp = (otp: string): boolean => {
  return /^\d{6}$/.test(otp)
}