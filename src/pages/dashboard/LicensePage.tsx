import React, { useState } from 'react'
import { CreditCard, CheckCircle, Zap, Shield, Crown, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter', price: '$29', period: '/mo', color: 'border-gray-200', btnColor: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    features: ['5 Users', '10 Projects', 'Basic CRM', 'Email Support', '5GB Storage'],
    current: false,
  },
  {
    name: 'Professional', price: '$79', period: '/mo', color: 'border-cyan-400', btnColor: 'bg-cyan-500 text-white hover:bg-cyan-600',
    features: ['25 Users', 'Unlimited Projects', 'Full CRM', 'HR Module', 'Priority Support', '50GB Storage'],
    current: true,
  },
  {
    name: 'Enterprise', price: '$199', period: '/mo', color: 'border-purple-400', btnColor: 'bg-purple-500 text-white hover:bg-purple-600',
    features: ['Unlimited Users', 'Unlimited Projects', 'All Modules', 'AI Automation', 'Dedicated Support', '500GB Storage', 'Custom Integrations'],
    current: false,
  },
]

const invoices = [
  { id: 'INV-2024-06', date: 'Jun 1, 2024',  amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2024-05', date: 'May 1, 2024',  amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2024-04', date: 'Apr 1, 2024',  amount: '$79.00', status: 'Paid'    },
  { id: 'INV-2024-03', date: 'Mar 1, 2024',  amount: '$79.00', status: 'Paid'    },
]

export const LicensePage: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">License Section</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your subscription and billing</p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Crown className="w-7 h-7 text-yellow-300" />
          </div>
          <div className="flex-1">
            <p className="text-cyan-100 text-sm">Current Plan</p>
            <p className="text-2xl font-extrabold text-white">Professional</p>
            <p className="text-cyan-100 text-sm mt-0.5">Renews on July 1, 2024 · $79/month</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-semibold hover:bg-white/30 transition">
              Cancel Plan
            </button>
            <button className="px-4 py-2 rounded-xl bg-white text-cyan-600 text-sm font-semibold hover:bg-gray-50 transition">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Users',    used: 18,   total: 25,  color: 'bg-cyan-500'   },
          { label: 'Storage',  used: 32,   total: 50,  color: 'bg-purple-500' },
          { label: 'Projects', used: 14,   total: 999, color: 'bg-green-500', unlimited: true },
        ].map((u, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700">{u.label}</p>
              <p className="text-xs text-gray-400">{u.used}{u.unlimited ? '' : `/${u.total}`}{u.label === 'Storage' ? 'GB' : ''}</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${u.color} rounded-full`} style={{ width: u.unlimited ? '14%' : `${(u.used / u.total) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{u.unlimited ? 'Unlimited' : `${u.total - u.used} remaining`}</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-800">Available Plans</h3>
          <div className="flex bg-gray-100 rounded-xl p-1">
            {(['monthly', 'yearly'] as const).map(b => (
              <button key={b} onClick={() => setBilling(b)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${billing === b ? 'bg-white shadow-sm text-cyan-600' : 'text-gray-500'}`}>
                {b} {b === 'yearly' && <span className="text-green-500 ml-1">-20%</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-2xl border-2 p-5 relative ${plan.color} ${plan.current ? 'shadow-lg' : ''}`}>
              {plan.current && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">Current</span>
              )}
              <p className="font-bold text-gray-800 mb-1">{plan.name}</p>
              <p className="text-3xl font-extrabold text-gray-900">{plan.price}<span className="text-sm font-normal text-gray-400">{plan.period}</span></p>
              <ul className="mt-4 space-y-2 mb-5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${plan.btnColor}`}>
                {plan.current ? 'Current Plan' : 'Switch Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Billing History</h3>
          <button className="text-xs text-cyan-500 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <table className="w-full">
          <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
            <th className="text-left px-6 py-3">Invoice</th>
            <th className="text-left px-6 py-3">Date</th>
            <th className="text-left px-6 py-3">Amount</th>
            <th className="text-left px-6 py-3">Status</th>
            <th className="px-6 py-3"></th>
          </tr></thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-mono text-gray-700">{inv.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{inv.amount}</td>
                <td className="px-6 py-4"><span className="text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">{inv.status}</span></td>
                <td className="px-6 py-4"><button className="text-xs text-cyan-500 font-semibold hover:underline">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
