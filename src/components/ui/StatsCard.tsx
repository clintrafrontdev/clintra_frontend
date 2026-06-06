import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../utils/cn'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down'
  color?: 'blue' | 'green' | 'purple' | 'orange'
  className?: string
}

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-500',   text: 'text-blue-600',   ring: 'ring-blue-100'   },
  green:  { bg: 'bg-green-50',  icon: 'bg-green-500',  text: 'text-green-600',  ring: 'ring-green-100'  },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600', ring: 'ring-purple-100' },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-500', text: 'text-orange-600', ring: 'ring-orange-100' },
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title, value, icon, change, changeLabel = 'from last month', trend, color = 'blue', className,
}) => {
  const c = colorMap[color]

  return (
    <div className={cn('bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm', c.icon)}>
          {icon}
        </div>
        {change !== undefined && trend && (
          <div className={cn(
            'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
            trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500',
          )}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}%
          </div>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-800 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {change !== undefined && (
        <p className="text-xs text-gray-400 mt-2">{change}% {changeLabel}</p>
      )}
    </div>
  )
}
