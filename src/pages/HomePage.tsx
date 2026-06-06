import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/common/Card'
import {
  BarChart3, Users, FileText, Clock,
  Cloud, LayoutDashboard, ShoppingCart, Briefcase,
} from 'lucide-react'

const features = [
  { icon: BarChart3,       title: 'CRM',                  description: 'Manage customer relationships effectively' },
  { icon: ShoppingCart,    title: 'Sales & Distribution', description: 'Streamline your sales process' },
  { icon: LayoutDashboard, title: 'Project Management',   description: 'Track projects and tasks efficiently' },
  { icon: Users,           title: 'Social Intranet',      description: 'Connect your team members' },
  { icon: Briefcase,       title: 'HR Management',        description: 'Manage your workforce' },
  { icon: FileText,        title: 'Invoice Management',   description: 'Handle billing and invoices' },
  { icon: Clock,           title: 'Timesheet Management', description: 'Track working hours' },
  { icon: Cloud,           title: 'Many More...',         description: 'And growing everyday' },
]

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '500+', label: 'Companies' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: '#4a4a4a' }}>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-[72px]">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row items-center min-h-[520px]">

          {/* Left — Text */}
          <div className="flex-1 py-16 lg:py-24">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              One{' '}
              <span className="text-cyan-400">PLATFORM,</span>
            </h1>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-1">
              For Entire Business
            </h1>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-1 mb-6">
              Management
            </h1>

            <p className="text-gray-300 text-base leading-relaxed max-w-lg">
              CRM | Sales &amp; Distribution | Project Management |{' '}
              Social Intranet | HR Management | Invoice Management |{' '}
              Timesheet Management | Many More...
            </p>

            <div className="flex gap-4 mt-8">
              <Link to="/signup">
                <button className="px-7 py-3 rounded-full bg-cyan-500 text-white font-bold text-sm hover:bg-cyan-600 transition shadow-lg">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="px-7 py-3 rounded-full border border-gray-300 text-gray-200 font-semibold text-sm hover:bg-white/10 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Right — CRM illustration */}
          <div className="flex-1 flex justify-center lg:justify-end py-10 lg:py-0">
            {/* Placeholder illustration — replace src with actual CRM image if available */}
            <img
              src="https://clintra.com/wp-content/uploads/2022/02/clintra-hero.png"
              alt="CRM Platform"
              className="w-full max-w-[520px] object-contain drop-shadow-2xl"
              onError={(e) => {
                // Hide broken image gracefully
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-10" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold text-cyan-400">{stat.value}</div>
                <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to run your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="hover:scale-105 transition-transform duration-300 cursor-default">
                <f.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-6 text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Join thousands of businesses already using Clintra to manage their operations.
        </p>
        <Link to="/signup">
          <button className="px-10 py-3.5 rounded-full bg-cyan-500 text-white font-bold text-base hover:bg-cyan-600 transition shadow-xl">
            Start Free Trial
          </button>
        </Link>
      </section>
    </div>
  )
}
