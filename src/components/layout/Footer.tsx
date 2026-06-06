import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            a product of Zonopact, Inc.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-gray-500 text-sm">POWERED BY</span>
            <span className="text-blue-500 font-semibold text-sm">CLINTRA</span>
            <span className="text-gray-500 text-sm">Artificial Intelligence Engine</span>
          </div>
        </div>
      </div>
    </footer>
  )
}