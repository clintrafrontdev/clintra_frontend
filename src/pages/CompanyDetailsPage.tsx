import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCompanyStore } from '../store/companyStore'
import { OnboardingStepper } from '../components/common/OnboardingStepper'
import { IndustrySelect } from '../components/company/IndustrySelect'
import { RoleSelect } from '../components/company/RoleSelect'
import { SizeSelect } from '../components/company/SizeSelect'
import { Building2, Globe, Mail, Phone, Upload, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react'

// Shared pill field style
const pill = 'w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 transition border border-transparent'
const iconWrap = 'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'

export const CompanyDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const { saveCompanyDetails, isLoading, error, success, companyDetails } = useCompanyStore()

  const [formData, setFormData] = React.useState({
    companyName:    companyDetails?.companyName    || '',
    industryType:   companyDetails?.industryType   || '',
    yourRole:       companyDetails?.yourRole       || '',
    industrySize:   companyDetails?.industrySize   || '',
    companyWebsite: companyDetails?.companyWebsite || '',
    companyEmail:   companyDetails?.companyEmail   || '',
    companyPhone:   companyDetails?.companyPhone   || '',
    companyLogo:    companyDetails?.companyLogo    || '',
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const fileRef = React.useRef<HTMLInputElement>(null)

  const set = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [field]: e.target.value })

  const validateForm = () => {
    const e: Record<string, string> = {}
    if (!formData.companyName.trim())   e.companyName  = 'Company name is required'
    if (!formData.industryType)         e.industryType = 'Industry type is required'
    if (!formData.yourRole)             e.yourRole     = 'Your role is required'
    if (!formData.industrySize)         e.industrySize = 'Industry size is required'
    if (formData.companyWebsite && !/^https?:\/\/.+/.test(formData.companyWebsite))
      e.companyWebsite = 'Enter a valid URL (https://...)'
    if (!formData.companyEmail) e.companyEmail = 'Company email is required'
    if (!formData.companyPhone) e.companyPhone = 'Company phone is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    await saveCompanyDetails(formData)
    if (!error) navigate('/company/address')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#f0f0f0' }}>
      <div className="w-full max-w-3xl">

        {/* Stepper */}
        <OnboardingStepper current={0} />

        {/* Card */}
        <div className="bg-white/60 rounded-3xl shadow-lg p-8" style={{ backdropFilter: 'blur(8px)' }}>

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

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Company name + Industry type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <span className={iconWrap}><Building2 className="w-4 h-4" /></span>
                  <input type="text" placeholder="Company  name" value={formData.companyName} onChange={set('companyName')} className={pill} />
                </div>
                {errors.companyName && <p className="mt-1 text-xs text-red-500 pl-3">{errors.companyName}</p>}
              </div>
              <div>
                <IndustrySelect
                  value={formData.industryType}
                  onChange={(val) => setFormData({ ...formData, industryType: val })}
                  error={errors.industryType}
                  pillStyle
                />
              </div>
            </div>

            {/* Row 2: Your role + Industry size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <RoleSelect
                  value={formData.yourRole}
                  onChange={(val) => setFormData({ ...formData, yourRole: val })}
                  error={errors.yourRole}
                  pillStyle
                />
              </div>
              <div>
                <SizeSelect
                  value={formData.industrySize}
                  onChange={(val: string) => setFormData({ ...formData, industrySize: val })}
                  error={errors.industrySize}
                  pillStyle
                />
              </div>
            </div>

            {/* Row 3: Company website + Company Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <span className={iconWrap}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </span>
                  <input type="url" placeholder="Company website" value={formData.companyWebsite} onChange={set('companyWebsite')} className={pill} />
                </div>
                {errors.companyWebsite && <p className="mt-1 text-xs text-red-500 pl-3">{errors.companyWebsite}</p>}
              </div>
              <div>
                <div className="relative">
                  <span className={iconWrap}><Mail className="w-4 h-4" /></span>
                  <input type="email" placeholder="Company Email" value={formData.companyEmail} onChange={set('companyEmail')} className={pill} />
                </div>
                {errors.companyEmail && <p className="mt-1 text-xs text-red-500 pl-3">{errors.companyEmail}</p>}
              </div>
            </div>

            {/* Row 4: Company phone + Company logo */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <span className={iconWrap}><Phone className="w-4 h-4" /></span>
                  <input type="tel" placeholder="Company phone" value={formData.companyPhone} onChange={set('companyPhone')} className={pill} />
                </div>
                {errors.companyPhone && <p className="mt-1 text-xs text-red-500 pl-3">{errors.companyPhone}</p>}
              </div>
              <div>
                <input type="file" accept="image/*" ref={fileRef} className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setFormData({ ...formData, companyLogo: file.name })
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-gray-400 text-sm text-left relative border border-transparent hover:border-cyan-300 transition"
                >
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Upload className="w-4 h-4" />
                  </span>
                  {formData.companyLogo || 'Company logo'}
                </button>
              </div>
            </div>

            {/* Submit — bottom right */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold text-sm transition-all active:scale-95 disabled:opacity-60 shadow-md"
              >
                {isLoading ? 'Saving...' : 'Save And Add Company Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
