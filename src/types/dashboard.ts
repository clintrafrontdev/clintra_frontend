export interface DashboardStats {
  totalRevenue: number
  activeUsers: number
  growthRate: number
  activityScore: number
  revenueChange: number
  usersChange: number
  growthChange: number
  activityChange: number
}

export interface RevenueData {
  month: string
  revenue: number
  expenses: number
  profit: number
}

export interface SalesData {
  name: string
  sales: number
  target: number
}

export interface ModuleData {
  name: string
  value: number
  color: string
}

export interface ActivityData {
  day: string
  users: number
  sessions: number
}

export interface RecentActivity {
  id: string
  user: string
  avatar: string
  action: string
  module: string
  time: string
  timestamp: Date
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: Date
}