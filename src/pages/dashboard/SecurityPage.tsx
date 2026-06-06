import React, { useState } from 'react'
import { Shield, Lock, AlertTriangle, CheckCircle, Eye, Globe, Smartphone } from 'lucide-react'

const sessions = [
  { device: 'Chrome on Windows',  ip: '192.168.1.1',   location: 'Mumbai, IN',    time: 'Now',        current: true  },
  { device: 'Safari on iPhone',   ip: '203.0.113.42',  location: 'Delhi, IN',     time: '2 hrs ago',  current: false },
  { device: 'Firefox on Mac',     ip: '198.51.100.12', location: 'New York, US',  time: '1 day ago',  current: false },
]

const logs = [
  { event: 'Successful login',       ip: '192.168.1.1',   time: '2 min ago',  type: 'success' },
  { event: 'Password changed',       ip: '192.168.1.1',   time: '2 days ago', type: 'info'    },
  { event: 'Failed login attempt',   ip: '45.33.32.156',  time: '3 days ago', type: 'warning' },
  { event: '2FA enabled',            ip: '192.168.1.1',   time: '1 week ago', type: 'success' },
  { event: 'New device login',       ip: '203.0.113.42',  time: '2 weeks ago',type: 'info'    },
]

const logColor: Record<string, string> = {
  success: 'bg-green-50 text-green-600',
  info:    'bg-blue-50 text-blue-600',
  warning: 'bg-red-50 text-red-500',
}

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-200'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
  </button>
)

export const SecurityPage: React.FC = () => {
  const [settings, setSettings] = useState({ twoFA: true, loginAlerts: true, sessionTimeout: false, ipWhitelist: false })
  const toggle = (k: keyof typeof settings) => setSettings(p => ({ ...p, [k]: !p[k] }))

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Security & Compliance</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage account security and access controls</p>
      </div>

      {/* Security Score */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-cyan-100 text-sm">Security Score</p>
            <p className="text-4xl font-extrabold">82<span className="text-2xl text-cyan-200">/100</span></p>
            <p className="text-cyan-100 text-sm mt-1">Good — Enable IP whitelist to reach 100</p>
          </div>
          <div className="ml-auto grid grid-cols-2 gap-3">
            {[
              { label: '2FA',        ok: settings.twoFA      },
              { label: 'Alerts',     ok: settings.loginAlerts},
              { label: 'Timeout',    ok: settings.sessionTimeout},
              { label: 'Whitelist',  ok: settings.ipWhitelist},
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
                {c.ok ? <CheckCircle className="w-3.5 h-3.5 text-green-300" /> : <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />}
                <span className="text-xs font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">Security Settings</h3>
          <div className="space-y-1">
            {[
              { key: 'twoFA' as const,         icon: <Smartphone className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-100', label: 'Two-Factor Auth',    sub: 'Extra layer of login security' },
              { key: 'loginAlerts' as const,   icon: <AlertTriangle className="w-4 h-4 text-yellow-600" />, bg: 'bg-yellow-100', label: 'Login Alerts',  sub: 'Email on new device login' },
              { key: 'sessionTimeout' as const,icon: <Lock className="w-4 h-4 text-blue-600" />,    bg: 'bg-blue-100',   label: 'Session Timeout',   sub: 'Auto logout after 30 min' },
              { key: 'ipWhitelist' as const,   icon: <Globe className="w-4 h-4 text-green-600" />,  bg: 'bg-green-100',  label: 'IP Whitelist',      sub: 'Allow specific IPs only' },
            ].map(item => (
              <div key={item.key} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.bg}`}>{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Active Sessions</h3>
            <button className="text-xs text-red-500 font-semibold hover:underline">Revoke All</button>
          </div>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{s.device}</p>
                  <p className="text-xs text-gray-400">{s.ip} · {s.location} · {s.time}</p>
                </div>
                {s.current
                  ? <span className="text-xs bg-green-50 text-green-600 font-semibold px-2 py-1 rounded-full">Current</span>
                  : <button className="text-xs text-red-400 hover:text-red-600 font-semibold">Revoke</button>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-800">Security Logs</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {logs.map((l, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
              <div className={`w-2 h-2 rounded-full ${l.type === 'success' ? 'bg-green-500' : l.type === 'warning' ? 'bg-red-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{l.event}</p>
                <p className="text-xs text-gray-400">{l.ip}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${logColor[l.type]}`}>{l.type}</span>
              <p className="text-xs text-gray-400 w-20 text-right">{l.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
