import React from 'react'
import { Address } from '../../types/company'
import { MapPin, Edit, Trash2 } from 'lucide-react'

interface AddressCardProps {
  address: Address
  onEdit: () => void
  onDelete: () => void
}

export const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete }) => {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-white font-semibold">{address.title}</h4>
            <p className="text-gray-400 text-sm mt-1">
              {address.streetAddress}<br />
              {address.addressLine2 && <>{address.addressLine2}<br /></>}
              {address.city}, {address.state} {address.zipCode}<br />
              {address.country}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}