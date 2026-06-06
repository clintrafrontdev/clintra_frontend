import React from 'react'
import { cn } from '../../utils/cn'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className, children, ...props }) => {
  return (
    <div className={cn("relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props}>
      {src && <img src={src} alt={alt} className="aspect-square h-full w-full" />}
      {!src && fallback && (
        <div className="flex h-full w-full items-center justify-center bg-primary/20 text-primary font-medium">
          {fallback}
        </div>
      )}
      {children}
    </div>
  )
}

export const AvatarImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="aspect-square h-full w-full" />
}

export const AvatarFallback: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={cn("flex h-full w-full items-center justify-center bg-primary/20 text-primary font-medium", className)}>{children}</div>
}