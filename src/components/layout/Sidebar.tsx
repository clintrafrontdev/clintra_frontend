import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Megaphone, Briefcase, ShoppingCart,
  FolderKanban, BarChart3, Shield,
  CreditCard, Settings, LogOut,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../utils/cn'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: Megaphone,    label: 'Marketing Management', path: '/dashboard/marketing' },
  { icon: Briefcase,    label: 'HR Management',        path: '/dashboard/hr' },
  { icon: ShoppingCart, label: 'Sales Management',     path: '/dashboard/sales' },
  { icon: FolderKanban, label: 'Project Management',   path: '/dashboard/projects' },
  { icon: BarChart3,    label: 'Reporting & Analytics', path: '/dashboard/reports' },
  { icon: Shield,       label: 'Security & Compliance', path: '/dashboard/security' },
  { icon: CreditCard,   label: 'License Section',      path: '/dashboard/license' },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation()
  const { logout, user } = useAuth()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full flex flex-col transition-all duration-300 lg:relative lg:translate-x-0',
          isOpen ? 'w-[230px] translate-x-0' : 'w-[230px] -translate-x-full lg:translate-x-0',
        )}
        style={{ background: '#3d3d3d' }}
      >
        {/* Cyan top accent bar */}
        <div className="h-1.5 w-full bg-cyan-400 shrink-0" />

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group',
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/8',
                    )}
                  >
                    <item.icon className={cn('w-[18px] h-[18px] shrink-0 transition-colors', isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300')} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── Settings + Logout ── */}
        <div className="px-2 pb-4 space-y-1">

          {/* Divider */}
          <div className="mx-2 mb-3 border-t border-white/10" />

          {/* Settings — modern gradient highlight */}
          <Link
            to="/dashboard/settings"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group',
              location.pathname === '/dashboard/settings'
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-300 hover:text-white hover:bg-white/8',
            )}
          >
            <div className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center transition-all',
              location.pathname === '/dashboard/settings'
                ? 'bg-cyan-500 shadow-lg shadow-cyan-500/40'
                : 'bg-white/10 group-hover:bg-white/20',
            )}>
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span>Settings</span>
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
          >
            <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-red-500/20 flex items-center justify-center transition-all">
              <LogOut className="w-4 h-4" />
            </div>
            <span>Logout</span>
          </button>
        </div>

        {/* Clintra logo bottom — only icon */}
        <div className="px-5 py-4 border-t border-white/10 shrink-0">
          <img src="/images/logo.png" alt="Clintra" className="h-10 w-auto object-contain" />
        </div>
      </aside>
    </>
  )
}
