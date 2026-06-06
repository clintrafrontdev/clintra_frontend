import React, { useState } from 'react'
import { FolderKanban, CheckCircle, Clock, AlertCircle, Plus, MoreHorizontal } from 'lucide-react'

const projects = [
  { name: 'CRM Module Redesign',    team: ['SK','RS','PS'], progress: 75, status: 'On Track',  due: 'Jun 30', priority: 'High'   },
  { name: 'Mobile App Development', team: ['VM','AP'],      progress: 40, status: 'At Risk',   due: 'Jul 15', priority: 'High'   },
  { name: 'API Integration v2',     team: ['RS','NG'],      progress: 90, status: 'On Track',  due: 'Jun 10', priority: 'Medium' },
  { name: 'Dashboard Analytics',    team: ['PS','SK'],      progress: 55, status: 'On Track',  due: 'Jul 5',  priority: 'Medium' },
  { name: 'HR Portal Update',       team: ['NG'],           progress: 20, status: 'Delayed',   due: 'Jun 20', priority: 'Low'    },
]

const statusMap: Record<string, { color: string; icon: React.ReactNode }> = {
  'On Track': { color: 'text-green-600 bg-green-50', icon: <CheckCircle className="w-3 h-3" /> },
  'At Risk':  { color: 'text-yellow-600 bg-yellow-50', icon: <AlertCircle className="w-3 h-3" /> },
  'Delayed':  { color: 'text-red-500 bg-red-50', icon: <Clock className="w-3 h-3" /> },
}

const priorityMap: Record<string, string> = {
  High: 'bg-red-50 text-red-500', Medium: 'bg-yellow-50 text-yellow-600', Low: 'bg-gray-100 text-gray-500',
}

const avatarColors = ['from-cyan-400 to-blue-500','from-purple-400 to-pink-500','from-green-400 to-teal-500','from-orange-400 to-red-500','from-indigo-400 to-purple-500']

export const ProjectsPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'kanban'>('list')

  const kanbanCols = [
    { label: 'To Do',       color: 'bg-gray-100',   items: projects.filter(p => p.progress < 30) },
    { label: 'In Progress', color: 'bg-blue-50',    items: projects.filter(p => p.progress >= 30 && p.progress < 80) },
    { label: 'Done',        color: 'bg-green-50',   items: projects.filter(p => p.progress >= 80) },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">Track all projects and milestones</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {(['list','kanban'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${view === v ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}>{v}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Projects', value: '18', icon: <FolderKanban className="w-5 h-5 text-blue-600" />,   bg: 'bg-blue-100'   },
          { label: 'On Track',       value: '12', icon: <CheckCircle  className="w-5 h-5 text-green-600" />,  bg: 'bg-green-100'  },
          { label: 'At Risk',        value: '4',  icon: <AlertCircle  className="w-5 h-5 text-yellow-600" />, bg: 'bg-yellow-100' },
          { label: 'Delayed',        value: '2',  icon: <Clock        className="w-5 h-5 text-red-500" />,    bg: 'bg-red-100'    },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}>{s.icon}</div>
            <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
            <p className="text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {view === 'list' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-800">All Projects</h3>
          </div>
          <table className="w-full">
            <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
              <th className="text-left px-6 py-3">Project</th>
              <th className="text-left px-6 py-3">Team</th>
              <th className="text-left px-6 py-3">Progress</th>
              <th className="text-left px-6 py-3">Due</th>
              <th className="text-left px-6 py-3">Priority</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr></thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{p.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {p.team.map((t, j) => (
                        <div key={j} className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[j % avatarColors.length]} flex items-center justify-center text-white text-[10px] font-bold border-2 border-white`}>{t}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{p.due}</td>
                  <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityMap[p.priority]}`}>{p.priority}</span></td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusMap[p.status].color}`}>
                      {statusMap[p.status].icon}{p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {kanbanCols.map(col => (
            <div key={col.label} className={`${col.color} rounded-2xl p-4`}>
              <h3 className="font-bold text-gray-700 mb-3 text-sm">{col.label} <span className="text-gray-400 font-normal">({col.items.length})</span></h3>
              <div className="space-y-3">
                {col.items.map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 mb-2">{p.name}</p>
                    <div className="h-1.5 bg-gray-100 rounded-full mb-2">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Due {p.due}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityMap[p.priority]}`}>{p.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
