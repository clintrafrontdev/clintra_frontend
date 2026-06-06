import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCompanyStore } from '../store/companyStore'
import { GlassCard } from '../components/common/GlassCard'
import { Button } from '../components/common/Button'
import { TeamMemberCard } from '../components/company/TeamMemberCard'
import { AddMemberDialog } from '../components/company/AddMemberDialog'
import { Plus, Users, AlertCircle, CheckCircle, Send } from 'lucide-react'

export const CompanyTeamPage: React.FC = () => {
  const navigate = useNavigate()
  const { teamMembers, addTeamMember, deleteTeamMember, error, success } = useCompanyStore()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingMember, setEditingMember] = React.useState<any>(null)

  const handleSaveMember = async (member: any) => {
    if (editingMember) {
      // Update logic here
      setIsDialogOpen(false)
      setEditingMember(null)
    } else {
      await addTeamMember(member)
    }
  }

  const handleEdit = (member: any) => {
    setEditingMember(member)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deleteTeamMember(id)
  }

  const handleInviteAll = () => {
    alert('Invitations sent to all pending members!')
  }

  const binaryNumbers = Array(20).fill(null).map((_, i) => (
    <div key={i} className="absolute text-white/5 font-mono text-sm whitespace-nowrap">
      {Math.random().toString(2).substring(2, 15)}
    </div>
  ))

  const pendingCount = teamMembers.filter(m => m.status === 'Pending').length

  return (
    <div className="min-h-screen py-12 px-4 bg-custom relative overflow-hidden">
      <div className="absolute inset-0 overlay-dark" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryNumbers.map((num, i) => (
          <div key={i} className="absolute animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, opacity: 0.03 }}>{num}</div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 rounded-lg p-1 w-fit">
          <button className="px-6 py-2 rounded-lg text-gray-400">Details</button>
          <button className="px-6 py-2 rounded-lg text-gray-400">Address</button>
          <button className="px-6 py-2 rounded-lg bg-primary text-white">Team</button>
        </div>

        <GlassCard className="w-full">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Team</h2>
              <p className="text-gray-400 text-sm">Manage your team members</p>
            </div>
            <div className="flex gap-3">
              {pendingCount > 0 && (
                <Button onClick={handleInviteAll} variant="outline" className="gap-2">
                  <Send className="w-4 h-4" />
                  Invite All ({pendingCount})
                </Button>
              )}
              <Button onClick={() => { setEditingMember(null); setIsDialogOpen(true) }} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Team Member
              </Button>
            </div>
          </div>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No team members added yet</p>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="mt-4">
                Add your first team member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onEdit={() => handleEdit(member)}
                  onDelete={() => handleDelete(member.id)}
                />
              ))}
            </div>
          )}

          <div className="flex justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <Button variant="outline" onClick={() => navigate('/company/address')}>
              Back
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Complete Setup
            </Button>
          </div>
        </GlassCard>
      </div>

      <AddMemberDialog
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setEditingMember(null) }}
        onSave={handleSaveMember}
        initialData={editingMember}
      />
    </div>
  )
}