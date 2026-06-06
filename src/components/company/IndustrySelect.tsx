import React from 'react'
import { Building2, ChevronDown } from 'lucide-react'

interface IndustrySelectProps {
  value: string
  onChange: (value: string) => void
  error?: string
  pillStyle?: boolean
}

const industries = [
  'Marketing and Advertising','Technology and Services','Computer Software',
  'Real Estate','Financial Services','Health, Wellness and Fitness',
  'Education','Consulting','Retail','Sports','Others',
]

export const IndustrySelect: React.FC<IndustrySelectProps> = ({ value, onChange, error, pillStyle }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (pillStyle) {
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white text-left text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Building2 className="w-4 h-4" />
          </span>
          <span className={value ? 'text-gray-700' : 'text-gray-400'}>{value || 'Industry type'}</span>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-52 overflow-y-auto">
            {industries.map((item) => (
              <button key={item} type="button"
                onClick={() => { onChange(item); setIsOpen(false) }}
                className="w-full px-4 py-2.5 text-left text-gray-700 text-sm hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
              >{item}</button>
            ))}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-red-500 pl-3">{error}</p>}
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-gray-300 mb-2">Industry type</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-left text-white focus:outline-none focus:border-primary transition-all duration-200"
      >
        {value || 'Select Industry'}
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-gray-800 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {industries.map((item) => (
            <button key={item} type="button" onClick={() => { onChange(item); setIsOpen(false) }}
              className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >{item}</button>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
