import React, { useState } from 'react'
import { Bell, CheckCheck, Trash2, Users, DollarSign, Shield, Zap, MessageSquare, FolderKanban } from 'lucide-react'

type NotifType = 'all' | 'unread'

interface Notif {
  id: number; icon: React.ReactNode; iconBg: string; title: string
  body: string; time: string; read: boolean; category: string
}

const initialNotifs: Notif[] = [
  { id: 1, icon: <Users className="w-4 h-4 text-blue-600" />,       iconBg: 'bg-blue-100',   title: 'New team member',         body: 'Rahul Sharma joined your workspace.',       time: '2 min ago',   read: false, category: 'Team'     },
  { id: 2, icon: <DollarSign className="w-4 h-4 text-green-600" />, iconBg: 'bg-green-100',  title: 'Invoice paid',            body: 'Invoice #1042 for $299 has been paid.',     time: '15 min ago',  read: false, category: 'Billing'  },
  { id: 3, icon: <MessageSquare className="w-4 h-4 text-cyan-600" />,iconBg:'bg-cyan-100',   title: 'New message',             body: 'Priya Singh: The designs are ready!',       time: '1 hr ago',    read: false, category: 'Messages' },
  { id: 4, icon: <FolderKanban className="w-4 h-4 text-purple-600" />,iconBg:'bg-purple-100',title: 'Project milestone',       body: 'CRM Module reached 75% completion.',        time: '2 hrs ago',   read: true,  category: 'Projects' },
  { id: 5, icon: <Shield className="w-4 h-4 text-red-500" />,       iconBg: 'bg-red-100',    title: 'Security alert',          body: 'Failed login attempt from 45.33.32.156.',   time: '3 hrs ago',   read: false, category: 'Security' },
  { id: 6, icon: <Zap className="w-4 h-4 text-yellow-600" />,       iconBg: 'bg-yellow-100', title: 'AI suggestion',           body: 'Smart reply suggestion is now available.',  time: '1 day ago',   read: true,  category: 'AI'       },
  { id: 7, icon: <Users className="w-4 h-4 text-blue-600" />,       iconBg: 'bg-blue-100',   title: 'Role updated',            body: 'Neha Gupta role changed to HR Manager.',    time: '1 day ago',   read: true,  category: 'Team'     },
  { id: 8, icon: <DollarSign className="w-4 h-4 text-green-600" />, iconBg: 'bg-green-100',  title: 'Subscription renewed',    body: 'Professional plan renewed for $79/month.',  time: '2 days ago',  read: true,  category: 'Billing'  },
]

export const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<NotifType>('all')
  const [notifs, setNotifs] = useState(initialNotifs)

  const shown = filter === 'unread' ? notifs.filter(n => !n.read) : notifs
  const unreadCount = notifs.filter(n => !n.read).length

  const markAll = () => setNotifs(p => p.map(n => ({ ...n, read: true })))
  const markOne = (id: number) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteOne = (id: number) => setNotifs(p => p.filter(n => n.id !== id))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-400 text-sm mt-0.5">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {(['all','unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${filter === f ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}>
                {f} {f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-cyan-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
              </button>
            ))}
          </div>
          <button onClick={markAll} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <Bell className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-gray-500 font-semibold">No notifications</p>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {shown.map(n => (
              <div key={n.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition group ${!n.read ? 'bg-cyan-50/30' : ''}`}>
                {/* Unread dot */}
                <div className="mt-1 shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${!n.read ? 'bg-cyan-500' : 'bg-transparent'}`} />
                </div>
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.iconBg}`}>{n.icon}</div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm font-semibold ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                      {!n.read && (
                        <button onClick={() => markOne(n.id)} title="Mark read"
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:border-cyan-300 transition">
                          <CheckCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={() => deleteOne(n.id)} title="Delete"
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{n.category}</span>
                    <span className="text-[10px] text-gray-400">{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
