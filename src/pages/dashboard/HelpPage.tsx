import React, { useState } from 'react'
import { HelpCircle, Search, ChevronDown, ChevronRight, MessageSquare, Mail, Phone, BookOpen, Video, Zap } from 'lucide-react'

const faqs = [
  { q: 'How do I add a new team member?',         a: 'Go to Settings → Team tab → click "Invite Member" button. Enter their email and assign a role. They will receive an invitation email.' },
  { q: 'How do I reset my password?',             a: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your inbox.' },
  { q: 'How can I upgrade my plan?',              a: 'Navigate to License Section from the sidebar, review the available plans, and click "Switch Plan" on the desired plan.' },
  { q: 'How do I connect social media integrations?', a: 'Go to Settings → Integrations tab. Find the platform you want and click "Connect". Follow the OAuth prompts to authorize.' },
  { q: 'Can I export my reports?',               a: 'Yes! On the Reporting & Analytics page, click the "Export" button in the top right corner to download data as CSV or PDF.' },
  { q: 'How do I enable two-factor authentication?', a: 'Go to Settings → General → Security section, or Security & Compliance from the sidebar. Toggle on "Two-Factor Auth".' },
]

const resources = [
  { icon: <BookOpen className="w-5 h-5 text-blue-600" />,   bg: 'bg-blue-100',   title: 'Documentation',  desc: 'Full guides and API reference',    link: '#' },
  { icon: <Video     className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-100', title: 'Video Tutorials', desc: 'Step-by-step video walkthroughs',  link: '#' },
  { icon: <Zap       className="w-5 h-5 text-yellow-600" />, bg: 'bg-yellow-100', title: 'Quick Start',    desc: 'Get up and running in 5 minutes',  link: '#' },
]

export const HelpPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-400 text-sm mt-0.5">Find answers and get in touch with us</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search for help..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm" />
      </div>

      {/* Resources */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {resources.map((r, i) => (
          <a key={i} href={r.link}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-cyan-200 hover:shadow-md transition group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${r.bg}`}>{r.icon}</div>
            <p className="text-sm font-bold text-gray-800 group-hover:text-cyan-600 transition">{r.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-cyan-500 font-semibold">View <ChevronRight className="w-3 h-3" /></div>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-800">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400 text-sm">No results found for "{search}"</div>
          ) : filtered.map((faq, i) => (
            <div key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition text-left">
                <p className="text-sm font-semibold text-gray-800">{faq.q}</p>
                {openFaq === i
                  ? <ChevronDown className="w-4 h-4 text-cyan-500 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Contact Support</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <MessageSquare className="w-5 h-5 text-cyan-600" />,   bg: 'bg-cyan-100',   title: 'Live Chat',   desc: 'Chat with us now',       action: 'Start Chat',  color: 'bg-cyan-500 hover:bg-cyan-600'    },
            { icon: <Mail          className="w-5 h-5 text-blue-600" />,   bg: 'bg-blue-100',   title: 'Email Us',    desc: 'support@clintra.com',    action: 'Send Email',  color: 'bg-blue-500 hover:bg-blue-600'    },
            { icon: <Phone         className="w-5 h-5 text-green-600" />,  bg: 'bg-green-100',  title: 'Call Us',     desc: '+1 (800) 123-4567',      action: 'Call Now',    color: 'bg-green-500 hover:bg-green-600'  },
          ].map((c, i) => (
            <div key={i} className="text-center p-4 rounded-2xl border border-gray-100 hover:border-cyan-200 transition">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${c.bg}`}>{c.icon}</div>
              <p className="text-sm font-bold text-gray-800">{c.title}</p>
              <p className="text-xs text-gray-400 mb-3">{c.desc}</p>
              <button className={`w-full py-2 rounded-xl text-white text-xs font-semibold transition ${c.color}`}>{c.action}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
