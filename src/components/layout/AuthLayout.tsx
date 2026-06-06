import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-y-auto"
      style={{
        backgroundImage: `url('/images/auth-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        
        {/* TOP: Only Title (No Logo) */}
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-3xl font-bold text-white">{title}</h2>
          )}
          {subtitle && (
            <p className="text-gray-300 text-sm mt-2">{subtitle}</p>
          )}
        </div>

        {/* MIDDLE: Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8">
          {children}
        </div>

        {/* BOTTOM: Big Logo + Powered By */}
        <div className="text-center mt-8 pt-6">
          {/* Big Logo */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src="/images/logo.png" 
                alt="Clintra Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          
          {/* Powered By Text */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-500 text-xs">POWERED BY</span>
            <span className="text-blue-500 font-semibold text-xs tracking-wide">CLINTRA</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">Artificial Intelligence Engine</p>
        </div>
      </div>
    </div>
  )
}