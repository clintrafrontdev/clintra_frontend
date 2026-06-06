import { api } from './api'
import { CompanyDetails, Address, TeamMember } from '../types/company'

export const companyService = {
  async saveCompanyDetails(data: CompanyDetails) {
    try {
      const response = await api.post('/company/details', data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to save company details' }
    }
  },

  async saveAddress(data: Address) {
    try {
      const response = await api.post('/company/address', data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to save address' }
    }
  },

  async deleteAddress(id: string) {
    try {
      const response = await api.delete(`/company/address/${id}`)
      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete address' }
    }
  },

  async saveTeamMember(data: TeamMember) {
    try {
      const response = await api.post('/company/team', data)
      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to save team member' }
    }
  },

  async deleteTeamMember(id: string) {
    try {
      const response = await api.delete(`/company/team/${id}`)
      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to delete team member' }
    }
  },

  async getCompanyData() {
    try {
      const response = await api.get('/company/data')
      return response.data
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch company data' }
    }
  }
}