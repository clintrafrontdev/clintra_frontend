import React from 'react'
import { TopProduct } from '../../types/dashboard'
import { TrendingUp } from 'lucide-react'

interface TopProductCardProps {
  product: TopProduct
  rank: number
}

export const TopProductCard: React.FC<TopProductCardProps> = ({ product, rank }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          #{rank}
        </div>
        <div>
          <p className="text-white font-medium">{product.name}</p>
          <p className="text-xs text-gray-500">${product.revenue.toLocaleString()} revenue</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-semibold">{product.sales.toLocaleString()} units</p>
        <div className="flex items-center gap-1 text-green-500 text-xs">
          <TrendingUp className="w-3 h-3" />
          {product.growth}%
        </div>
      </div>
    </div>
  )
}