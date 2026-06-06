import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

export const useWelcomeDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    
    if (isAuthenticated && !hasSeenWelcome && user) {
      setIsOpen(true)
      localStorage.setItem('hasSeenWelcome', 'true')
    }
  }, [isAuthenticated, user])

  const closeDialog = () => {
    setIsOpen(false)
  }

  return { isOpen, closeDialog, userName: user?.firstName || 'User' }
}