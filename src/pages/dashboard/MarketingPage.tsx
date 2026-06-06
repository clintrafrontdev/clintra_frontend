import React, { useState } from 'react'
import { Megaphone, TrendingUp, Users, Mail, Eye, MousePointer, Plus, MoreHorizontal } from 'lucide-react'

const StatCard: React.FC<{ icon: React.ReactNode; iconBg: string; label: string; value: string; change: string; up: boolean }> =
  ({ icon, iconBg, label, value, change, up }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>{icon}</div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {up ? '↑' : '↓'} {change}
        </span>
      </div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-400 mt-0.5">{label}</p>
    </div>
  )

const campaigns = [
  { name: 'Summer Sale Campaign',   status: 'Active',   reach: '24.5K', clicks: '1.2K', conv: '3.4%',  channel: 'Email'    },
  { name: 'Product Launch Q3',      status: 'Active',   reach: '18.2K', clicks: '980',  conv: '2.8%',  channel: 'Social'   },
  { name: 'Newsletter — June',      status: 'Scheduled',reach: '—',     clicks: '—',    conv: '—',     channel: 'Email'    },
  { name: 'Retargeting Ads',        status: 'Paused',   reach: '9.1K',  clicks: '420',  conv: '1.9%',  channel: 'Ads'      },
  { name: 'Referral Program',       status: 'Active',   reach: '6.7K',  clicks: '310',  conv: '5.1%',  channel: 'Referral' },
]

const statusColor: Record<string, string> = {
  Active: 'bg-green-50 text-green-600',
  Scheduled: 'bg-blue-50 text-blue-600',
  Paused: 'bg-yellow-50 text-yellow-600',
}

export const MarketingPage: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'active' | 'scheduled'>('all')

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">Track campaigns, reach and conversions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition shadow-sm">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Megaphone className="w-5 h-5 text-purple-600" />}  iconBg="bg-purple-100" label="Active Campaigns" value="12"       change="2 new"  up={true}  />
        <StatCard icon={<Eye       className="w-5 h-5 text-blue-600"   />}  iconBg="bg-blue-100"   label="Total Reach"      value="58.5K"    change="12.4%"  up={true}  />
        <StatCard icon={<MousePointer className="w-5 h-5 text-cyan-600"/>}  iconBg="bg-cyan-100"   label="Total Clicks"     value="2,910"    change="8.1%"   up={true}  />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-green-600" />}  iconBg="bg-green-100"  label="Avg Conversion"   value="3.2%"     change="0.5%"   up={false} />
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-800">Campaigns</h3>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(['all','active','scheduled'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${tab === t ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
              <th className="text-left px-6 py-3">Campaign</th>
              <th className="text-left px-6 py-3">Channel</th>
              <th className="text-left px-6 py-3">Reach</th>
              <th className="text-left px-6 py-3">Clicks</th>
              <th className="text-left px-6 py-3">Conv.</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr></thead>
            <tbody>
              {campaigns.filter(c => tab === 'all' || c.status.toLowerCase() === tab).map((c, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{c.name}</td>
                  <td className="px-6 py-4"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c.channel}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.reach}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.clicks}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.conv}</td>
                  <td className="px-6 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[c.status]}`}>{c.status}</span></td>
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
