import React, { useState } from 'react'
import { Search, Plus, Star, Trash2, Archive, Reply, Forward, MoreHorizontal, Paperclip, Send } from 'lucide-react'

interface Mail { id: number; from: string; avatar: string; color: string; subject: string; preview: string; time: string; read: boolean; starred: boolean; tag?: string }

const initialMails: Mail[] = [
  { id: 1, from: 'Rahul Sharma',   avatar: 'RS', color: 'from-blue-400 to-blue-600',    subject: 'API documentation update',      preview: 'Hi, I have updated the API docs as requested. Please review...',  time: '10:32 AM', read: false, starred: true,  tag: 'Work'    },
  { id: 2, from: 'Priya Singh',    avatar: 'PS', color: 'from-pink-400 to-pink-600',    subject: 'New dashboard designs ready',   preview: 'The new Figma designs for the dashboard are ready for review...', time: '9:15 AM',  read: false, starred: false, tag: 'Design'  },
  { id: 3, from: 'Clintra System', avatar: 'CS', color: 'from-cyan-400 to-blue-500',    subject: 'Invoice #1042 paid successfully',preview: 'Your invoice for $299 has been paid. Thank you for...',          time: 'Yesterday',read: true,  starred: false, tag: 'Billing' },
  { id: 4, from: 'Amit Patel',     avatar: 'AP', color: 'from-orange-400 to-red-500',   subject: 'Q2 Sales Report',               preview: 'Attaching the Q2 sales report as discussed in the meeting...',   time: 'Yesterday',read: true,  starred: true,  tag: 'Sales'   },
  { id: 5, from: 'Neha Gupta',     avatar: 'NG', color: 'from-green-400 to-teal-500',   subject: 'HR policy update',              preview: 'Please find the updated HR policies attached for your review...',time: 'Jun 4',    read: true,  starred: false, tag: 'HR'      },
  { id: 6, from: 'Support Team',   avatar: 'ST', color: 'from-purple-400 to-purple-600',subject: 'Your support ticket #482',      preview: 'We have resolved your issue. Please let us know if you need...',  time: 'Jun 3',    read: true,  starred: false, tag: 'Support' },
]

const tagColors: Record<string, string> = {
  Work: 'bg-blue-50 text-blue-600', Design: 'bg-pink-50 text-pink-600',
  Billing: 'bg-green-50 text-green-600', Sales: 'bg-orange-50 text-orange-600',
  HR: 'bg-teal-50 text-teal-600', Support: 'bg-purple-50 text-purple-600',
}

export const MailPage: React.FC = () => {
  const [mails, setMails] = useState(initialMails)
  const [selected, setSelected] = useState<Mail | null>(initialMails[0])
  const [composing, setComposing] = useState(false)
  const [search, setSearch] = useState('')
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' })

  const filtered = mails.filter(m =>
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.from.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStar = (id: number) => setMails(p => p.map(m => m.id === id ? { ...m, starred: !m.starred } : m))
  const deleteMail = (id: number) => { setMails(p => p.filter(m => m.id !== id)); if (selected?.id === id) setSelected(null) }
  const markRead = (m: Mail) => { setMails(p => p.map(x => x.id === m.id ? { ...x, read: true } : x)); setSelected(m) }

  return (
    <div className="p-6 h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mail</h1>
          <p className="text-gray-400 text-sm mt-0.5">{mails.filter(m => !m.read).length} unread</p>
        </div>
        <button onClick={() => setComposing(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm">
          <Plus className="w-4 h-4" /> Compose
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex" style={{ height: 'calc(100vh - 220px)' }}>

        {/* Mail List */}
        <div className="w-80 border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-3 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mail..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.map(m => (
              <button key={m.id} onClick={() => markRead(m)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition text-left ${selected?.id === m.id ? 'bg-cyan-50' : ''} ${!m.read ? 'bg-blue-50/30' : ''}`}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>{m.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className={`text-sm truncate ${!m.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{m.from}</p>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-1">{m.time}</span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${!m.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{m.subject}</p>
                  <p className="text-[11px] text-gray-400 truncate">{m.preview}</p>
                  {m.tag && <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block ${tagColors[m.tag]}`}>{m.tag}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mail Detail */}
        {selected ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-base truncate">{selected.subject}</h2>
              <div className="flex gap-1 shrink-0">
                {[
                  { icon: <Star className={`w-4 h-4 ${selected.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />, fn: () => toggleStar(selected.id) },
                  { icon: <Reply className="w-4 h-4" />, fn: () => {} },
                  { icon: <Forward className="w-4 h-4" />, fn: () => {} },
                  { icon: <Archive className="w-4 h-4" />, fn: () => {} },
                  { icon: <Trash2 className="w-4 h-4" />, fn: () => deleteMail(selected.id) },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.fn} className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition">{btn.icon}</button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-sm font-bold`}>{selected.avatar}</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{selected.from}</p>
                  <p className="text-xs text-gray-400">To: me · {selected.time}</p>
                </div>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                <p>Hi,</p>
                <p>{selected.preview}</p>
                <p>Please let me know if you have any questions or need any clarification on the above.</p>
                <p>Best regards,<br />{selected.from}</p>
              </div>
            </div>
            {/* Quick reply */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
                <input placeholder={`Reply to ${selected.from}...`}
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none" />
                <button className="w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white transition">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Select an email to read</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {composing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">New Message</h3>
              <button onClick={() => setComposing(false)} className="text-gray-400 hover:text-gray-600 text-xl font-light">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <input value={composeData.to} onChange={e => setComposeData(p => ({ ...p, to: e.target.value }))}
                placeholder="To" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
              <input value={composeData.subject} onChange={e => setComposeData(p => ({ ...p, subject: e.target.value }))}
                placeholder="Subject" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
              <textarea rows={6} value={composeData.body} onChange={e => setComposeData(p => ({ ...p, body: e.target.value }))}
                placeholder="Write your message..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none" />
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <button className="text-gray-400 hover:text-gray-600"><Paperclip className="w-4 h-4" /></button>
              <button onClick={() => setComposing(false)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition">
                <Send className="w-4 h-4" /> Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
