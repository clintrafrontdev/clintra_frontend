import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { X } from 'lucide-react'

interface AddAddressDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (address: any) => void
  initialData?: any
}

export const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || '',
    streetAddress: initialData?.streetAddress || '',
    addressLine2: initialData?.addressLine2 || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || '',
    isPermanent: initialData?.isPermanent || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, id: initialData?.id })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-br from-gray-900 to-gray-950 border-white/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">
              {initialData ? 'Edit Address' : 'Add Additional Address'}
            </DialogTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            label="Title"
            placeholder="e.g., Head Office, Branch Office"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          
          <Input
            label="Street Address"
            placeholder="Street address"
            value={formData.streetAddress}
            onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
            required
          />
          
          <Input
            label="Address Line 2 (Optional)"
            placeholder="Apartment, suite, etc."
            value={formData.addressLine2}
            onChange={(e) => setFormData({...formData, addressLine2: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />
            <Input
              label="State"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Zip Code"
              placeholder="Zip code"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              required
            />
            <Input
              label="Country"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Back
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}