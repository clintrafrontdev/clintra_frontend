import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CompanyState, CompanyDetails, Address, TeamMember } from '../types/company'
import { companyService } from '../services/companyService'

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      companyDetails: null,
      addresses: [],
      teamMembers: [],
      isLoading: false,
      error: null,
      success: null,

      setCurrentStep: (step: number) => set({ currentStep: step }),

      saveCompanyDetails: async (details: CompanyDetails) => {
        set({ isLoading: true, error: null })
        try {
          const response = await companyService.saveCompanyDetails(details)
          set({ 
            companyDetails: details, 
            isLoading: false, 
            success: 'Company details saved successfully',
            currentStep: 2
          })
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to save company details', isLoading: false })
        }
      },

      addAddress: async (address: Address) => {
        set({ isLoading: true, error: null })
        try {
          const response = await companyService.saveAddress(address)
          set((state) => ({ 
            addresses: [...state.addresses, { ...address, id: response.data?.id || Date.now().toString() }],
            isLoading: false,
            success: 'Address added successfully'
          }))
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to add address', isLoading: false })
        }
      },

      updateAddress: async (id: string, address: Address) => {
        set({ isLoading: true, error: null })
        try {
          set((state) => ({ 
            addresses: state.addresses.map(addr => addr.id === id ? { ...address, id } : addr),
            isLoading: false,
            success: 'Address updated successfully'
          }))
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to update address', isLoading: false })
        }
      },

      deleteAddress: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          await companyService.deleteAddress(id)
          set((state) => ({ 
            addresses: state.addresses.filter(addr => addr.id !== id),
            isLoading: false,
            success: 'Address deleted successfully'
          }))
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete address', isLoading: false })
        }
      },

      addTeamMember: async (member: TeamMember) => {
        set({ isLoading: true, error: null })
        try {
          const response = await companyService.saveTeamMember(member)
          set((state) => ({ 
            teamMembers: [...state.teamMembers, { ...member, id: response.data?.id || Date.now().toString() }],
            isLoading: false,
            success: 'Team member added successfully'
          }))
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to add team member', isLoading: false })
        }
      },

      updateTeamMember: async (id: string, member: TeamMember) => {
        set({ isLoading: true, error: null })
        try {
          set((state) => ({ 
            teamMembers: state.teamMembers.map(m => m.id === id ? { ...member, id } : m),
            isLoading: false,
            success: 'Team member updated successfully'
          }))
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to update team member', isLoading: false })
        }
      },

      deleteTeamMember: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          await companyService.deleteTeamMember(id)
          set((state) => ({ 
            teamMembers: state.teamMembers.filter(m => m.id !== id),
            isLoading: false,
            success: 'Team member deleted successfully'
          }))
          setTimeout(() => set({ success: null }), 3000)
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete team member', isLoading: false })
        }
      },

      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    {
      name: 'company-storage',
      partialize: (state) => ({ 
        companyDetails: state.companyDetails, 
        addresses: state.addresses, 
        teamMembers: state.teamMembers,
        currentStep: state.currentStep 
      }),
    }
  )
)