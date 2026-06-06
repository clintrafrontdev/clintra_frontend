import React from 'react'
import { TeamMember } from '../../types/company'
import { User, Mail, Phone, Briefcase, Edit, Trash2, Clock, CheckCircle } from 'lucide-react'

interface TeamMemberCardProps {
  member: TeamMember
  onEdit: () => void
  onDelete: () => void
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onEdit, onDelete }) => {
  const statusColors = {
    Pending: 'bg-yellow-500/20 text-yellow-500',
    Active: 'bg-green-500/20 text-green-500',
    Invited: 'bg-blue-500/20 text-blue-500'
  }

  const statusIcons = {
    Pending: <Clock className="w-3 h-3" />,
    Active: <CheckCircle className="w-3 h-3" />,
    Invited: <Mail className="w-3 h-3" />
  }

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">
                {member.firstName.charAt(0)}{member.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-white font-semibold">{member.firstName} {member.lastName}</h4>
              <p className="text-gray-400 text-xs">Emp ID: {member.empId}</p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColors[member.status]}`}>
              {statusIcons[member.status]}
              <span>{member.status}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="w-4 h-4" />
              <span>{member.mobile}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Briefcase className="w-4 h-4" />
              <span>{member.department} - {member.empRole}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span>{member.gender}</span>
            </div>
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