import React from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { Button } from '../common/Button'

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const options = ['Today', 'This Week', 'This Month', 'Last Month', 'This Quarter', 'This Year']

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="w-4 h-4" />
        <span>{value}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-secondary/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50">
          {options.map(option => (
            <button
              key={option}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}