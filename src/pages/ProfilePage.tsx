import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, Edit3, Check, X } from 'lucide-react'

const Field: React.FC<{ label: string; value: string; icon: React.ReactNode; editable?: boolean; onSave?: (v: string) => void }> =
  ({ label, value, icon, editable, onSave }) => {
    const [editing, setEditing] = useState(false)
    const [val, setVal] = useState(value)

    return (
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-cyan-500 shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">{label}</p>
          {editing ? (
            <input
              autoFocus
              value={val}
              onChange={e => setVal(e.target.value)}
              className="text-sm font-semibold text-gray-800 bg-white border border-cyan-400 rounded-lg px-2 py-1 w-full focus:outline-none"
            />
          ) : (
            <p className="text-sm font-semibold text-gray-800 truncate">{val || '—'}</p>
          )}
        </div>
        {editable && (
          editing ? (
            <div className="flex gap-1">
              <button onClick={() => { onSave?.(val); setEditing(false) }}
                className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 transition">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => { setVal(value); setEditing(false) }}
                className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-cyan-500">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )
        )}
      </div>
    )
  }

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()

  const initials = `${user?.firstName?.charAt(0) ?? 'D'}${user?.lastName?.charAt(0) ?? 'U'}`
  const fullName = `${user?.firstName ?? 'Demo'} ${user?.lastName ?? 'User'}`

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header card */}
      <div className="relative bg-gradient-to-br from-cyan-500 via-cyan-400 to-blue-500 rounded-3xl p-6 mb-6 overflow-hidden shadow-lg">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-gray-50 transition">
              <Camera className="w-3.5 h-3.5 text-cyan-600" />
            </button>
          </div>

          {/* Name & role */}
          <div>
            <h2 className="text-xl font-extrabold text-white">{fullName}</h2>
            <p className="text-cyan-100 text-sm mt-0.5">{user?.email ?? 'user@clintra.com'}</p>
            <span className="inline-block mt-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Administrator
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Projects',  value: '12' },
            { label: 'Tasks',     value: '48' },
            { label: 'Messages',  value: '6'  },
          ].map(s => (
            <div key={s.label} className="bg-white/15 rounded-2xl py-3 text-center">
              <p className="text-white font-extrabold text-lg leading-none">{s.value}</p>
              <p className="text-cyan-100 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mb-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Personal Info</h3>
        <div className="space-y-3">
          <Field label="Full Name"   value={fullName}                      icon={<Briefcase  className="w-4 h-4" />} editable />
          <Field label="Email"       value={user?.email ?? ''}             icon={<Mail       className="w-4 h-4" />} editable />
          <Field label="Phone"       value="+1 (555) 000-0000"             icon={<Phone      className="w-4 h-4" />} editable />
          <Field label="Location"    value="New York, United States"        icon={<MapPin     className="w-4 h-4" />} editable />
          <Field label="Member Since" value="June 2024"                    icon={<Calendar   className="w-4 h-4" />} />
        </div>
      </div>

      {/* Save button */}
      <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98]">
        Save Changes
      </button>
    </div>
  )
}
