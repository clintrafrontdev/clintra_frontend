import React, { useState } from 'react'
import { Search, Send, Paperclip, Smile, MoreHorizontal, Phone, Video } from 'lucide-react'

const contacts = [
  { id: 1, name: 'Rahul Sharma',   role: 'Developer',   avatar: 'RS', color: 'from-blue-400 to-blue-600',    last: 'Sure, I will check it.',        time: '2m',  unread: 3,  online: true  },
  { id: 2, name: 'Priya Singh',    role: 'Designer',    avatar: 'PS', color: 'from-pink-400 to-pink-600',    last: 'The designs are ready!',        time: '15m', unread: 0,  online: true  },
  { id: 3, name: 'Amit Patel',     role: 'Sales Lead',  avatar: 'AP', color: 'from-orange-400 to-red-500',   last: 'Please send the report.',       time: '1h',  unread: 1,  online: false },
  { id: 4, name: 'Neha Gupta',     role: 'HR Manager',  avatar: 'NG', color: 'from-green-400 to-teal-500',   last: 'Meeting at 3pm confirmed.',     time: '2h',  unread: 0,  online: true  },
  { id: 5, name: 'Vijay Mehta',    role: 'Developer',   avatar: 'VM', color: 'from-purple-400 to-purple-600',last: 'Bug has been fixed.',           time: '1d',  unread: 0,  online: false },
]

const chatMessages: Record<number, { from: 'me' | 'them'; text: string; time: string }[]> = {
  1: [
    { from: 'them', text: 'Hey, can you check the new API changes?', time: '10:00 AM' },
    { from: 'me',   text: 'Sure, I will look into it right away.',   time: '10:02 AM' },
    { from: 'them', text: 'Also need the documentation updated.',    time: '10:03 AM' },
    { from: 'me',   text: 'Will do, give me 30 mins.',               time: '10:05 AM' },
    { from: 'them', text: 'Sure, I will check it.',                  time: '10:06 AM' },
  ],
  2: [
    { from: 'them', text: 'Hi! The new dashboard designs are ready.', time: '9:30 AM' },
    { from: 'me',   text: 'Amazing! Sharing with the team.',          time: '9:35 AM' },
    { from: 'them', text: 'The designs are ready!',                   time: '9:36 AM' },
  ],
  3: [
    { from: 'them', text: 'Please send the Q2 sales report.',         time: 'Yesterday' },
    { from: 'me',   text: 'I will send it by EOD.',                   time: 'Yesterday' },
    { from: 'them', text: 'Please send the report.',                  time: '8:00 AM'   },
  ],
  4: [{ from: 'them', text: 'Meeting at 3pm confirmed.', time: '8:45 AM' }],
  5: [{ from: 'them', text: 'Bug has been fixed.', time: 'Yesterday' }],
}

export const MessagesPage: React.FC = () => {
  const [active, setActive] = useState(1)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [messages, setMessages] = useState(chatMessages)

  const activeContact = contacts.find(c => c.id === active)!
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => ({
      ...prev,
      [active]: [...(prev[active] ?? []), { from: 'me', text: input.trim(), time: 'Now' }]
    }))
    setInput('')
  }

  return (
    <div className="p-6 h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-400 text-sm mt-0.5">Chat with your team</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex" style={{ height: 'calc(100vh - 220px)' }}>

        {/* Sidebar */}
        <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition text-left border-b border-gray-50 ${active === c.id ? 'bg-cyan-50' : ''}`}>
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold`}>{c.avatar}</div>
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                    <span className="text-xs text-gray-400 shrink-0 ml-1">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.last}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeContact.color} flex items-center justify-center text-white text-xs font-bold`}>
                {activeContact.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{activeContact.name}</p>
                <p className="text-xs text-gray-400">{activeContact.online ? '🟢 Online' : '⚫ Offline'}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[<Phone className="w-4 h-4" />, <Video className="w-4 h-4" />, <MoreHorizontal className="w-4 h-4" />].map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition">{icon}</button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {(messages[active] ?? []).map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === 'me'
                    ? 'bg-cyan-500 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-cyan-200' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
              <button className="text-gray-400 hover:text-gray-600"><Paperclip className="w-4 h-4" /></button>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none" />
              <button className="text-gray-400 hover:text-gray-600"><Smile className="w-4 h-4" /></button>
              <button onClick={sendMessage} className="w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-xl flex items-center justify-center text-white transition">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
