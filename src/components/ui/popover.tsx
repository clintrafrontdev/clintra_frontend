import React from 'react'
import { cn } from '../../utils/cn'

export const Popover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === PopoverTrigger) {
          return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) } as any)
        }
        if (React.isValidElement(child) && child.type === PopoverContent && isOpen) {
          return React.cloneElement(child, { onClose: () => setIsOpen(false) } as any)
        }
        return child
      })}
    </div>
  )
}

export const PopoverTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean; onClick?: () => void }> = ({ children, asChild, onClick }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick } as any)
  }
  return <div onClick={onClick}>{children}</div>
}

export const PopoverContent: React.FC<{ children: React.ReactNode; className?: string; onClose?: () => void }> = ({ children, className, onClose }) => {
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (onClose && !(e.target as Element).closest('.popover-content')) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [onClose])

  return (
    <div className={cn("absolute right-0 mt-2 popover-content z-50", className)}>
      {children}
    </div>
  )
}