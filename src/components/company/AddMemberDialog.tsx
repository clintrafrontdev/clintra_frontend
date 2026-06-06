import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { X } from 'lucide-react'

interface AddMemberDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (member: any) => void
  initialData?: any
}

const departments = ['HR', 'IT', 'Sales', 'Marketing', 'Finance', 'Operations', 'Development', 'Design']
const roles = ['Admin', 'Manager', 'Team Lead', 'Senior', 'Junior', 'Intern']
const genders = ['Male', 'Female', 'Other']

export const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = React.useState({
    empId: initialData?.empId || `EMP${Math.floor(Math.random() * 10000)}`,
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    mobile: initialData?.mobile || '',
    gender: initialData?.gender || 'Male',
    department: initialData?.department || '',
    empRole: initialData?.empRole || '',
    status: initialData?.status || 'Pending'
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
              {initialData ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
            <Input
              label="Last Name"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>

          <Input
            label="Emp ID"
            placeholder="Employee ID"
            value={formData.empId}
            onChange={(e) => setFormData({...formData, empId: e.target.value})}
            required
          />

          <Input
            label="Email address"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <Input
            label="Mobile"
            placeholder="Mobile number"
            value={formData.mobile}
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="">Select Department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Emp Role</label>
            <select
              value={formData.empRole}
              onChange={(e) => setFormData({...formData, empRole: e.target.value})}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="">Select Role</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
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