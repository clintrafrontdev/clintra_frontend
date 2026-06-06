import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Applications', to: '/applications' },
  { label: 'What is Clintra?', to: '/what-is-clintra' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Features', to: '/features' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact us', to: '/contact' },
]

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-stretch h-[72px] shadow-lg">

      {/* LEFT — White logo box (exact clintra.com style) */}
      <Link
        to="/"
        className="flex flex-col items-center justify-center px-6 shrink-0 min-w-[200px]"
        style={{ background: '#3a3a3a', borderRight: 'none' }}
      >
        <img
          src="/images/logo.png"
          alt="Clintra"
          className="h-10 w-auto object-contain"
        />
        <span className="text-[10px] text-gray-400 mt-0.5 tracking-wide">
          a product of{' '}
          <span className="text-cyan-500 font-medium">Zonopact, Inc.</span>
        </span>
      </Link>

      {/* RIGHT — Dark nav bar */}
      <nav
        className="flex items-center justify-between flex-1 px-6"
        style={{ background: '#3a3a3a' }}
      >
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Login / Dashboard button */}
        <div className="hidden md:flex items-center ml-auto">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <button className="px-5 py-2 rounded-full bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-gray-400 text-gray-200 text-sm font-semibold hover:bg-white/10 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-7 py-2.5 rounded-full bg-cyan-500 text-white text-sm font-bold hover:bg-cyan-600 active:scale-95 transition-all shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white ml-auto"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className="absolute top-[72px] left-0 right-0 z-50 py-4 px-6 flex flex-col gap-4 md:hidden"
          style={{ background: '#3a3a3a' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-200 hover:text-cyan-400 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-full bg-cyan-500 text-white text-sm font-bold"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full py-2.5 rounded-full bg-cyan-500 text-white text-sm font-bold">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
