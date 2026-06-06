import React from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass'
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: 'bg-secondary/50 backdrop-blur-sm border border-white/10',
    glass: 'glass-card',
  }
  
  return (
    <div className={cn('rounded-2xl p-6', variants[variant], className)}>
      {children}
    </div>
  )
}