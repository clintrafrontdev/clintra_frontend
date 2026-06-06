import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCompanyStore } from '../store/companyStore'
import { OnboardingStepper } from '../components/common/OnboardingStepper'
import { AlertCircle, CheckCircle, MapPin } from 'lucide-react'

const pill = 'w-full px-5 py-3.5 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 transition border border-transparent'

export const CompanyAddressPage: React.FC = () => {
  const navigate = useNavigate()
  const { addAddress, error, success } = useCompanyStore()

  const [form, setForm] = React.useState({
    title: '', street: '', line2: '',
    city: '', state: '', zip: '', country: '',
  })
  const [saving, setSaving] = React.useState(false)

  const set = (f: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [f]: e.target.value })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await addAddress({
      id: Date.now().toString(),
      title: form.title,
      streetAddress: form.street,
      addressLine2: form.line2,
      city: form.city,
      state: form.state,
      zipCode: form.zip,
      country: form.country,
      isPermanent: true,
    })
    setSaving(false)
    navigate('/company/team')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-3xl">

        {/* Stepper */}
        <OnboardingStepper current={1} />

        {/* Alerts */}
        {success && (
          <div className="mb-5 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /><span>{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Section heading */}
          <h2 className="text-xl text-gray-400 font-normal mb-2">Add Permanent Address</h2>

          {/* Title */}
          <input type="text" placeholder="Title" value={form.title} onChange={set('title')} className={pill} />

          {/* Street Address */}
          <div className="relative">
            <input type="text" placeholder="Street Address" value={form.street} onChange={set('street')} className={`${pill} pr-12`} />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin className="w-4 h-4" />
            </span>
          </div>

          {/* Address Line 2 */}
          <input type="text" placeholder="Address Line 2" value={form.line2} onChange={set('line2')} className={pill} />

          {/* City + State */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City"  value={form.city}  onChange={set('city')}  className={pill} />
            <input type="text" placeholder="State" value={form.state} onChange={set('state')} className={pill} />
          </div>

          {/* Zip + Country */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Zip code" value={form.zip}     onChange={set('zip')}     className={pill} />
            <input type="text" placeholder="Country"  value={form.country} onChange={set('country')} className={pill} />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/company/details')}
              className="px-10 py-3.5 rounded-xl border-2 border-cyan-400 text-cyan-500 font-bold text-base hover:bg-cyan-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-10 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-white font-bold text-base transition-all active:scale-95 disabled:opacity-60 shadow"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
