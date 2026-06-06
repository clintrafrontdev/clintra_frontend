import React, { useState } from 'react'
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 12000, expense: 8000 },
  { month: 'Feb', revenue: 15000, expense: 9000 },
  { month: 'Mar', revenue: 13000, expense: 7500 },
  { month: 'Apr', revenue: 18000, expense: 11000 },
  { month: 'May', revenue: 22000, expense: 13000 },
  { month: 'Jun', revenue: 19000, expense: 10000 },
]

const userGrowth = [
  { month: 'Jan', users: 120 }, { month: 'Feb', users: 180 }, { month: 'Mar', users: 210 },
  { month: 'Apr', users: 290 }, { month: 'May', users: 380 }, { month: 'Jun', users: 420 },
]

const channelData = [
  { name: 'Email',   value: 35, color: '#06b6d4' },
  { name: 'Social',  value: 28, color: '#8b5cf6' },
  { name: 'Direct',  value: 20, color: '#10b981' },
  { name: 'Referral',value: 17, color: '#f59e0b' },
]

const PERIODS = ['7D', '1M', '3M', '6M', '1Y']

export const ReportsPage: React.FC = () => {
  const [period, setPeriod] = useState('1M')

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reporting & Analytics</h1>
          <p className="text-gray-400 text-sm mt-0.5">Insights across revenue, users and channels</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {PERIODS.map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${period === p ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}>{p}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue',  value: '$99K',  change: '+18%', up: true,  color: 'text-green-600',  bg: 'bg-green-100'  },
          { label: 'Total Users',    value: '1.6K',  change: '+24%', up: true,  color: 'text-blue-600',   bg: 'bg-blue-100'   },
          { label: 'Conversion',     value: '3.8%',  change: '+0.4%',up: true,  color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Churn Rate',     value: '1.2%',  change: '-0.3%',up: false, color: 'text-orange-600', bg: 'bg-orange-100' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.bg}`}>
                <BarChart3 className={`w-5 h-5 ${k.color}`} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${k.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{k.change}</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-800">{k.value}</p>
            <p className="text-sm text-gray-400">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[6,6,0,0]} />
              <Bar dataKey="expense" fill="#e0f2fe" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Pie */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">Traffic Channels</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="45%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {channelData.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={userGrowth}>
            <defs>
              <linearGradient id="ugGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} fill="url(#ugGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
