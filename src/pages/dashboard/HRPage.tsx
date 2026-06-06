import React, { useState } from 'react'
import { Users, UserCheck, UserX, Clock, Plus, Search, MoreHorizontal } from 'lucide-react'

const employees = [
  { name: 'Sameer Kumar',   role: 'Admin',        dept: 'Management', status: 'Active',  joined: 'Jan 2023', avatar: 'SK' },
  { name: 'Rahul Sharma',   role: 'Developer',    dept: 'Engineering', status: 'Active', joined: 'Mar 2023', avatar: 'RS' },
  { name: 'Priya Singh',    role: 'Designer',     dept: 'Design',      status: 'Active', joined: 'Jun 2023', avatar: 'PS' },
  { name: 'Amit Patel',     role: 'Sales Lead',   dept: 'Sales',       status: 'On Leave', joined: 'Aug 2023', avatar: 'AP' },
  { name: 'Neha Gupta',     role: 'HR Manager',   dept: 'HR',          status: 'Active', joined: 'Oct 2023', avatar: 'NG' },
  { name: 'Vijay Mehta',    role: 'Developer',    dept: 'Engineering', status: 'Active', joined: 'Dec 2023', avatar: 'VM' },
]

const deptColors: Record<string, string> = {
  Management: 'bg-purple-100 text-purple-600',
  Engineering: 'bg-blue-100 text-blue-600',
  Design: 'bg-pink-100 text-pink-600',
  Sales: 'bg-orange-100 text-orange-600',
  HR: 'bg-green-100 text-green-600',
}

const statusColor: Record<string, string> = {
  Active: 'bg-green-50 text-green-600',
  'On Leave': 'bg-yellow-50 text-yellow-600',
  Inactive: 'bg-red-50 text-red-500',
}

export const HRPage: React.FC = () => {
  const [search, setSearch] = useState('')

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage employees and departments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Users className="w-5 h-5 text-blue-600" />,     bg: 'bg-blue-100',   label: 'Total Employees', value: '48'  },
          { icon: <UserCheck className="w-5 h-5 text-green-600" />, bg: 'bg-green-100',  label: 'Active',          value: '44'  },
          { icon: <UserX className="w-5 h-5 text-yellow-600" />,    bg: 'bg-yellow-100', label: 'On Leave',        value: '3'   },
          { icon: <Clock className="w-5 h-5 text-purple-600" />,    bg: 'bg-purple-100', label: 'New This Month',  value: '5'   },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}>{s.icon}</div>
            <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
            <p className="text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-800">Employees</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..." className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-50 w-48" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
              <th className="text-left px-6 py-3">Employee</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Department</th>
              <th className="text-left px-6 py-3">Joined</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr></thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">{e.avatar}</div>
                      <span className="text-sm font-semibold text-gray-800">{e.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{e.role}</td>
                  <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${deptColors[e.dept] ?? 'bg-gray-100 text-gray-600'}`}>{e.dept}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-400">{e.joined}</td>
                  <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[e.status]}`}>{e.status}</span></td>
                  <td className="px-6 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
