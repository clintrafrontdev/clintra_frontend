import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import {
  User, Mail, Shield, Bell, Zap, Users, FileText,
  Puzzle, Layout, Save, Toggle3dOff, Check, ChevronRight,
  Phone, MapPin, Building2, Globe, Moon, Sun, Monitor,
  AlertTriangle, Lock, Eye, EyeOff, Plus, Trash2,
} from 'lucide-react'

// ─── Shared UI ─────────────────────────────────────────────
const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-200'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
  </button>
)

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {children}
  </div>
)

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props}
    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition" />
)

const Card: React.FC<{ title: string; sub?: string; children: React.ReactNode }> = ({ title, sub, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
    <div className="mb-5">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
    {children}
  </div>
)

const SaveBtn: React.FC<{ label?: string }> = ({ label = 'Save Changes' }) => (
  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm shadow-cyan-200 active:scale-95">
    <Save className="w-4 h-4" />{label}
  </button>
)

// ─── Tabs ───────────────────────────────────────────────────
const TABS = [
  { id: 'general',       label: 'General',       icon: <User    className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell    className="w-4 h-4" /> },
  { id: 'ai',            label: 'AI Automation', icon: <Zap     className="w-4 h-4" /> },
  { id: 'team',          label: 'Team',          icon: <Users   className="w-4 h-4" /> },
  { id: 'logs',          label: 'Logs',          icon: <FileText className="w-4 h-4" /> },
  { id: 'integrations',  label: 'Integrations',  icon: <Puzzle  className="w-4 h-4" /> },
  { id: 'templates',     label: 'Templates',     icon: <Layout  className="w-4 h-4" /> },
]

// ─── Tab Content ────────────────────────────────────────────
const GeneralTab: React.FC = () => {
  const { user } = useAuth()
  const [form, setForm] = useState({
    fullName: `${user?.firstName ?? 'Demo'} ${user?.lastName ?? 'User'}`,
    email: user?.email ?? 'user@clintra.com',
    role: 'Admin',
    phone: '+1 (555) 000-0000',
    location: 'New York, United States',
    company: 'Clintra Inc.',
    website: 'https://clintra.com',
  })
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')

  return (
    <>
      <Card title="General Settings" sub="Update your basic account information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <FormField label="Full Name">
            <Input value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
          </FormField>
          <FormField label="Email">
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </FormField>
          <FormField label="Role">
            <Input value={form.role} readOnly className="cursor-not-allowed opacity-70" />
          </FormField>
          <FormField label="Phone">
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </FormField>
          <FormField label="Location">
            <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          </FormField>
          <FormField label="Company">
            <Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Website">
          <Input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
        </FormField>
        <div className="mt-5 flex justify-end"><SaveBtn /></div>
      </Card>

      <Card title="Appearance" sub="Choose your preferred theme">
        <div className="grid grid-cols-3 gap-3">
          {([
            { id: 'light', icon: <Sun className="w-5 h-5" />, label: 'Light' },
            { id: 'dark',  icon: <Moon className="w-5 h-5" />, label: 'Dark' },
            { id: 'system', icon: <Monitor className="w-5 h-5" />, label: 'System' },
          ] as const).map(t => (
            <button key={t.id} onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 text-sm font-medium transition-all ${
                theme === t.id ? 'border-cyan-400 bg-cyan-50 text-cyan-600' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}>
              {t.icon}{t.label}
              {theme === t.id && <span className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></span>}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Password" sub="Update your account password">
        <div className="space-y-3">
          <FormField label="Current Password"><Input type="password" placeholder="••••••••" /></FormField>
          <FormField label="New Password"><Input type="password" placeholder="••••••••" /></FormField>
          <FormField label="Confirm New Password"><Input type="password" placeholder="••••••••" /></FormField>
        </div>
        <div className="mt-5 flex justify-end"><SaveBtn label="Update Password" /></div>
      </Card>
    </>
  )
}

const NotificationsTab: React.FC = () => {
  const [n, setN] = useState({ email: true, push: true, sms: false, updates: false, marketing: false, weekly: true, security: true })
  const toggle = (k: keyof typeof n) => setN(p => ({ ...p, [k]: !p[k] }))

  const groups = [
    {
      title: 'Channels', items: [
        { key: 'email' as const, label: 'Email Notifications', sub: 'Get notified via email' },
        { key: 'push'  as const, label: 'Push Notifications',  sub: 'Browser push alerts' },
        { key: 'sms'   as const, label: 'SMS Notifications',   sub: 'Text message alerts' },
      ]
    },
    {
      title: 'Updates', items: [
        { key: 'updates'   as const, label: 'Product Updates',  sub: 'New features & releases' },
        { key: 'marketing' as const, label: 'Marketing Emails', sub: 'Promotions & offers' },
        { key: 'weekly'    as const, label: 'Weekly Digest',    sub: 'Summary every Monday' },
        { key: 'security'  as const, label: 'Security Alerts',  sub: 'Login & security events' },
      ]
    },
  ]

  return (
    <>
      {groups.map(g => (
        <Card key={g.title} title={g.title}>
          <div className="space-y-1">
            {g.items.map(item => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <Toggle checked={n[item.key]} onChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </>
  )
}

const AiTab: React.FC = () => {
  const [s, setS] = useState({ autoReply: true, smartSuggest: true, sentiment: false, summarize: true, autoTag: false })
  const toggle = (k: keyof typeof s) => setS(p => ({ ...p, [k]: !p[k] }))

  return (
    <Card title="AI Automation" sub="Configure intelligent automation features">
      {[
        { key: 'autoReply'    as const, label: 'Auto Reply',          sub: 'AI generates automatic responses to common queries', badge: 'Beta' },
        { key: 'smartSuggest' as const, label: 'Smart Suggestions',   sub: 'Get AI-powered suggestions while composing messages' },
        { key: 'sentiment'    as const, label: 'Sentiment Analysis',  sub: 'Automatically analyze customer sentiment in messages', badge: 'New' },
        { key: 'summarize'    as const, label: 'Auto Summarize',      sub: 'Summarize long conversations automatically' },
        { key: 'autoTag'      as const, label: 'Auto Tagging',        sub: 'Automatically categorize and tag incoming data' },
      ].map(item => (
        <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-600">{item.badge}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
          </div>
          <Toggle checked={s[item.key]} onChange={() => toggle(item.key)} />
        </div>
      ))}
    </Card>
  )
}

const TeamTab: React.FC = () => {
  const members = [
    { name: 'Sameer Kumar',  email: 'sameer@clintra.com',  role: 'Admin',  status: 'Active'  },
    { name: 'Rahul Sharma',  email: 'rahul@clintra.com',   role: 'Editor', status: 'Active'  },
    { name: 'Priya Singh',   email: 'priya@clintra.com',   role: 'Viewer', status: 'Pending' },
  ]

  return (
    <Card title="Team Members" sub="Manage who has access to your workspace">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition">
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>
      <div className="space-y-2">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              {m.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{m.name}</p>
              <p className="text-xs text-gray-400">{m.email}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${m.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
              {m.status}
            </span>
            <select defaultValue={m.role}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 bg-gray-50">
              <option>Admin</option><option>Editor</option><option>Viewer</option>
            </select>
            <button className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}

const LogsTab: React.FC = () => {
  const logs = [
    { action: 'Login successful',       time: '2 min ago',  type: 'success', user: 'Sameer Kumar'  },
    { action: 'Settings updated',       time: '1 hr ago',   type: 'info',    user: 'Sameer Kumar'  },
    { action: 'New member invited',     time: '3 hrs ago',  type: 'info',    user: 'Sameer Kumar'  },
    { action: 'Failed login attempt',   time: '1 day ago',  type: 'warning', user: 'Unknown'       },
    { action: 'Password changed',       time: '2 days ago', type: 'success', user: 'Sameer Kumar'  },
    { action: 'Integration connected',  time: '3 days ago', type: 'info',    user: 'Rahul Sharma'  },
  ]
  const colors = { success: 'bg-green-50 text-green-600', info: 'bg-blue-50 text-blue-600', warning: 'bg-yellow-50 text-yellow-600' }

  return (
    <Card title="Activity Logs" sub="Recent actions in your workspace">
      <div className="space-y-1">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
            <div className={`w-2 h-2 rounded-full shrink-0 ${l.type === 'success' ? 'bg-green-500' : l.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{l.action}</p>
              <p className="text-xs text-gray-400">{l.user}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${colors[l.type as keyof typeof colors]}`}>
              {l.type}
            </span>
            <p className="text-xs text-gray-400 shrink-0">{l.time}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

const IntegrationsTab: React.FC = () => {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    slack: true, google: false, github: true, zapier: false,
    facebook: false, instagram: false, linkedin: false, twitter: false,
    whatsapp: false, mailchimp: true, stripe: false, dropbox: false,
  })
  const toggle = (id: string) => setConnected(p => ({ ...p, [id]: !p[id] }))

  const groups = [
    {
      title: '🔧 Productivity',
      items: [
        { id: 'slack',    name: 'Slack',     desc: 'Send notifications to Slack channels',    color: 'bg-purple-100', text: 'text-purple-600', letter: 'S' },
        { id: 'google',   name: 'Google',    desc: 'Sync with Google Workspace & Calendar',   color: 'bg-red-100',    text: 'text-red-500',    letter: 'G' },
        { id: 'github',   name: 'GitHub',    desc: 'Link repositories and track issues',      color: 'bg-gray-100',   text: 'text-gray-700',   letter: 'G' },
        { id: 'zapier',   name: 'Zapier',    desc: 'Automate workflows with 5000+ apps',      color: 'bg-orange-100', text: 'text-orange-600', letter: 'Z' },
        { id: 'dropbox',  name: 'Dropbox',   desc: 'Sync and share files from Dropbox',       color: 'bg-blue-100',   text: 'text-blue-600',   letter: 'D' },
      ]
    },
    {
      title: '📱 Social Media',
      items: [
        { id: 'facebook',  name: 'Facebook',   desc: 'Manage pages, ads & lead forms',          color: 'bg-blue-100',   text: 'text-blue-700',   letter: 'f' },
        { id: 'instagram', name: 'Instagram',  desc: 'Schedule posts & track engagement',        color: 'bg-pink-100',   text: 'text-pink-600',   letter: 'In' },
        { id: 'linkedin',  name: 'LinkedIn',   desc: 'Share updates & sync contacts',            color: 'bg-sky-100',    text: 'text-sky-700',    letter: 'Li' },
        { id: 'twitter',   name: 'X (Twitter)','desc': 'Post tweets & monitor mentions',         color: 'bg-gray-100',   text: 'text-gray-800',   letter: 'X' },
        { id: 'whatsapp',  name: 'WhatsApp',   desc: 'Send messages via WhatsApp Business API',  color: 'bg-green-100',  text: 'text-green-600',  letter: 'W' },
      ]
    },
    {
      title: '💳 Payments & Marketing',
      items: [
        { id: 'stripe',    name: 'Stripe',     desc: 'Accept payments & manage subscriptions',   color: 'bg-violet-100', text: 'text-violet-600', letter: 'S' },
        { id: 'mailchimp', name: 'Mailchimp',  desc: 'Sync contacts & run email campaigns',      color: 'bg-yellow-100', text: 'text-yellow-700', letter: 'M' },
      ]
    },
  ]

  return (
    <div className="space-y-5">
      {groups.map(group => (
        <Card key={group.title} title={group.title} sub="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.items.map(app => (
              <div key={app.id}
                className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-sm transition bg-white">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${app.color} ${app.text}`}>
                  {app.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{app.name}</p>
                  <p className="text-xs text-gray-400 truncate">{app.desc}</p>
                </div>
                <button
                  onClick={() => toggle(app.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    connected[app.id]
                      ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                      : 'bg-cyan-50 text-cyan-600 border border-cyan-200 hover:bg-cyan-100'
                  }`}>
                  {connected[app.id] ? '✓ Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

const TemplatesTab: React.FC = () => {
  const templates = [
    { name: 'Welcome Email',     category: 'Email',   status: 'Active'  },
    { name: 'Invoice Template',  category: 'Finance', status: 'Active'  },
    { name: 'Follow-up Message', category: 'CRM',     status: 'Draft'   },
    { name: 'HR Onboarding',     category: 'HR',      status: 'Active'  },
    { name: 'Project Kickoff',   category: 'Project', status: 'Draft'   },
  ]

  return (
    <Card title="Templates" sub="Manage reusable message and document templates">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-600 transition">
          <Plus className="w-4 h-4" /> New Template
        </button>
      </div>
      <div className="space-y-2">
        {templates.map((t, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition border border-gray-50">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
              <Layout className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{t.name}</p>
              <p className="text-xs text-gray-400">{t.category}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${t.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
              {t.status}
            </span>
            <div className="flex gap-1">
              <button className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Edit</button>
              <button className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Main ───────────────────────────────────────────────────
const TAB_CONTENT: Record<string, React.FC> = {
  general: GeneralTab, notifications: NotificationsTab, ai: AiTab,
  team: TeamTab, logs: LogsTab, integrations: IntegrationsTab, templates: TemplatesTab,
}

export const SettingsPage: React.FC = () => {
  const [active, setActive] = useState('general')
  const Content = TAB_CONTENT[active]

  return (
    <div className="min-h-full" style={{ background: '#f0f2f5' }}>
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                active === tab.id
                  ? 'bg-cyan-50 text-cyan-600 border border-cyan-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-3xl">
        <Content />
      </div>
    </div>
  )
}
