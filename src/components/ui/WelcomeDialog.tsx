import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { Button } from '../common/Button'
import { Sparkles, Rocket } from 'lucide-react'

interface WelcomeDialogProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ isOpen, onClose, userName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-gray-900 to-gray-950 border-white/20">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Welcome to Clintra!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-primary">
            Hello, {userName}!
          </p>
          <p className="text-gray-400">
            Thank you for joining us at Clintra, your ultimate solution for CRM and HRM needs. 
            To get started and make the most out of our platform, we need to complete a few quick steps.
          </p>
          <Button onClick={onClose} className="mt-4 gap-2">
            <Rocket className="w-4 h-4" />
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}