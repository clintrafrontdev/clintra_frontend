import { create } from 'zustand'

interface DashboardStats {
  totalRevenue: number
  totalUsers: number
  activeProjects: number
  satisfactionRate: number
}

interface DashboardState {
  stats: DashboardStats
  revenueData: Array<{ month: string; revenue: number; expenses: number }>
  activityData: Array<{ day: string; users: number; sessions: number }>
  isLoading: boolean
  fetchDashboardData: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: {
    totalRevenue: 124590,
    totalUsers: 2847,
    activeProjects: 156,
    satisfactionRate: 98
  },
  revenueData: [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 5000, expenses: 3800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 6890, expenses: 4800 },
    { month: 'Jun', revenue: 8390, expenses: 5800 },
    { month: 'Jul', revenue: 7200, expenses: 5200 },
    { month: 'Aug', revenue: 8900, expenses: 6100 },
    { month: 'Sep', revenue: 9500, expenses: 6800 },
    { month: 'Oct', revenue: 10200, expenses: 7200 },
    { month: 'Nov', revenue: 11800, expenses: 8200 },
    { month: 'Dec', revenue: 13500, expenses: 9100 }
  ],
  activityData: [
    { day: 'Mon', users: 1200, sessions: 3400 },
    { day: 'Tue', users: 1350, sessions: 3800 },
    { day: 'Wed', users: 1480, sessions: 4200 },
    { day: 'Thu', users: 1620, sessions: 4600 },
    { day: 'Fri', users: 1890, sessions: 5100 },
    { day: 'Sat', users: 2100, sessions: 5800 },
    { day: 'Sun', users: 1950, sessions: 5400 }
  ],
  isLoading: false,
  fetchDashboardData: async () => {
    set({ isLoading: true })
    setTimeout(() => {
      set({ isLoading: false })
    }, 1000)
  }
}))