import React, { useState } from 'react'
import { ShoppingCart, DollarSign, TrendingUp, Package, Plus, MoreHorizontal, Search } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { month: 'Jan', sales: 4000 }, { month: 'Feb', sales: 5200 }, { month: 'Mar', sales: 4800 },
  { month: 'Apr', sales: 6100 }, { month: 'May', sales: 7400 }, { month: 'Jun', sales: 6800 },
]

const orders = [
  { id: '#ORD-001', customer: 'Rahul Sharma',  product: 'CRM Pro',       amount: '$299', status: 'Completed', date: 'Jun 5' },
  { id: '#ORD-002', customer: 'Priya Singh',   product: 'HR Suite',      amount: '$499', status: 'Pending',   date: 'Jun 5' },
  { id: '#ORD-003', customer: 'Amit Patel',    product: 'Sales Basic',   amount: '$149', status: 'Completed', date: 'Jun 4' },
  { id: '#ORD-004', customer: 'Neha Gupta',    product: 'Project Mgr',   amount: '$199', status: 'Processing',date: 'Jun 4' },
  { id: '#ORD-005', customer: 'Vijay Mehta',   product: 'CRM Enterprise',amount: '$899', status: 'Completed', date: 'Jun 3' },
]

const statusColor: Record<string, string> = {
  Completed:  'bg-green-50 text-green-600',
  Pending:    'bg-yellow-50 text-yellow-600',
  Processing: 'bg-blue-50 text-blue-600',
}

export const SalesPage: React.FC = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">Track orders, revenue and performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm">
          <Plus className="w-4 h-4" /> New Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <DollarSign  className="w-5 h-5 text-green-600"  />, bg: 'bg-green-100',  label: 'Total Revenue',  value: '$34.2K', change: '+12.5%', up: true  },
          { icon: <ShoppingCart className="w-5 h-5 text-blue-600"  />, bg: 'bg-blue-100',   label: 'Total Orders',   value: '284',    change: '+8.1%',  up: true  },
          { icon: <Package     className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-100', label: 'Products Sold',  value: '1,240',  change: '+5.3%',  up: true  },
          { icon: <TrendingUp  className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-100', label: 'Avg Order Value','value': '$120', change: '-2.1%',  up: false },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>{s.icon}</div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{s.change}</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
            <p className="text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} fill="url(#salesGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-800">Recent Orders</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 w-48" />
          </div>
        </div>
        <table className="w-full">
          <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
            <th className="text-left px-6 py-3">Order ID</th>
            <th className="text-left px-6 py-3">Customer</th>
            <th className="text-left px-6 py-3">Product</th>
            <th className="text-left px-6 py-3">Amount</th>
            <th className="text-left px-6 py-3">Date</th>
            <th className="text-left px-6 py-3">Status</th>
            <th className="px-6 py-3"></th>
          </tr></thead>
          <tbody>
            {orders.filter(o => !search || o.customer.toLowerCase().includes(search.toLowerCase())).map((o, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-mono text-cyan-600">{o.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{o.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{o.product}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{o.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{o.date}</td>
                <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>{o.status}</span></td>
                <td className="px-6 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
