import React from 'react'
import { cn } from '../../utils/cn'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5" />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  )
}