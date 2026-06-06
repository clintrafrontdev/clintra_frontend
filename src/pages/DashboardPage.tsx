import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useDashboardStore } from '../store/dashboardStore'
import { useWelcomeDialog } from '../hooks/useWelcomeDialog'
import { Sidebar } from '../components/layout/Sidebar'
import { WelcomeDialog } from '../components/ui/WelcomeDialog'
import { StatsCard } from '../components/ui/StatsCard'
import { RevenueChart } from '../components/ui/RevenueChart'
import { ActivityChart } from '../components/ui/ActivityChart'
import { SettingsPage } from './SettingsPage'
import { ProfilePage } from './ProfilePage'
import {
  DollarSign, Users, FolderKanban, TrendingUp,
  Menu, Bell, Search, ChevronDown,
  MessageSquare, HelpCircle, Settings, Mail,
} from 'lucide-react'

// ── Main dashboard home content ──
const DashboardHome: React.FC = () => {
  const { user } = useAuth()
  const { stats, revenueData, activityData } = useDashboardStore()

  const statsCards = [
    { title: 'Total Revenue',     value: `$${stats.totalRevenue.toLocaleString()}`,  icon: <DollarSign   className="w-5 h-5" />, change: 12.5, trend: 'up'   as const, color: 'blue'   as const },
    { title: 'Total Users',       value: stats.totalUsers.toLocaleString(),           icon: <Users        className="w-5 h-5" />, change:  8.2, trend: 'up'   as const, color: 'green'  as const },
    { title: 'Active Projects',   value: stats.activeProjects.toLocaleString(),       icon: <FolderKanban className="w-5 h-5" />, change:  5.3, trend: 'up'   as const, color: 'purple' as const },
    { title: 'Satisfaction Rate', value: `${stats.satisfactionRate}%`,                icon: <TrendingUp   className="w-5 h-5" />, change:  2.1, trend: 'down' as const, color: 'orange' as const },
  ]

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, <span className="font-semibold text-gray-600">{user?.firstName ?? 'Demo'}</span>! Here's what's happening today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        {statsCards.map((s, i) => <StatsCard key={i} {...s} />)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Monthly Revenue & Expenses</h3>
          <RevenueChart data={revenueData} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Daily Active Users & Sessions</h3>
          <ActivityChart data={activityData} />
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700">Recent Activity</h3>
          <button className="text-xs text-cyan-500 font-semibold hover:underline">View all</button>
        </div>
        <div className="space-y-2">
          {[
            { name: 'New user registered',        time: '2 min ago',   color: 'bg-cyan-100',   text: 'text-cyan-500'   },
            { name: 'Invoice #1042 paid',          time: '15 min ago',  color: 'bg-green-100',  text: 'text-green-500'  },
            { name: 'Project milestone reached',   time: '1 hr ago',    color: 'bg-purple-100', text: 'text-purple-500' },
            { name: 'New team member added',       time: '3 hrs ago',   color: 'bg-blue-100',   text: 'text-blue-500'   },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                <Users className={`w-4 h-4 ${item.text}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main DashboardPage shell ──
export const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth()
  const { fetchDashboardData } = useDashboardStore()
  const { isOpen: isWelcomeOpen, closeDialog: closeWelcome, userName } = useWelcomeDialog()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated) fetchDashboardData()
  }, [isAuthenticated])

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const initials = `${user?.firstName?.charAt(0) ?? 'D'}${user?.lastName?.charAt(0) ?? 'U'}`

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f0f2f5' }}>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Top Header ── */}
        <header className="flex items-center h-[60px] px-4 gap-4 shrink-0" style={{ background: '#3d3d3d' }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-300 hover:text-white transition">
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
          </div>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-1">
            {[
              { icon: <MessageSquare className="w-4 h-4" />, onClick: () => {} },
              { icon: <HelpCircle    className="w-4 h-4" />, onClick: () => {} },
              { icon: <Settings      className="w-4 h-4" />, onClick: () => navigate('/dashboard/settings') },
              { icon: <Mail          className="w-4 h-4" />, onClick: () => {} },
            ].map((btn, i) => (
              <button key={i} onClick={btn.onClick}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition">
                {btn.icon}
              </button>
            ))}

            {/* Bell */}
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-white/15 mx-1" />

            {/* User — click → profile */}
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl hover:bg-white/10 transition group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow">
                {initials}
              </div>
              <div className="hidden md:block leading-tight text-left">
                <p className="text-white text-xs font-semibold">{user?.firstName ?? 'Demo'} {user?.lastName ?? 'User'}</p>
                <p className="text-gray-400 text-[10px]">Company</p>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-white transition" />
            </button>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/"          element={<DashboardHome />} />
            <Route path="/settings"  element={<SettingsPage />} />
            <Route path="/profile"   element={<ProfilePage />} />
            <Route path="*"          element={<DashboardHome />} />
          </Routes>
        </main>
      </div>

      <WelcomeDialog isOpen={isWelcomeOpen} onClose={closeWelcome} userName={userName} />
    </div>
  )
}
