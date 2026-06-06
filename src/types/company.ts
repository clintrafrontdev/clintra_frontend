export interface CompanyDetails {
  companyName: string
  industryType: string
  yourRole: string
  industrySize: string
  companyWebsite: string
  companyEmail: string
  companyPhone: string
  companyLogo?: string
}

export interface Address {
  id: string
  title: string
  streetAddress: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isPermanent?: boolean
}

export interface TeamMember {
  id: string
  empId: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  gender: 'Male' | 'Female' | 'Other'
  department: string
  empRole: string
  status: 'Pending' | 'Active' | 'Invited'
}

export interface CompanyState {
  currentStep: number
  companyDetails: CompanyDetails | null
  addresses: Address[]
  teamMembers: TeamMember[]
  isLoading: boolean
  error: string | null
  success: string | null
  setCurrentStep: (step: number) => void
  saveCompanyDetails: (details: CompanyDetails) => Promise<void>
  addAddress: (address: Address) => Promise<void>
  updateAddress: (id: string, address: Address) => Promise<void>
  deleteAddress: (id: string) => Promise<void>
  addTeamMember: (member: TeamMember) => Promise<void>
  updateTeamMember: (id: string, member: TeamMember) => Promise<void>
  deleteTeamMember: (id: string) => Promise<void>
  clearError: () => void
  clearSuccess: () => void
}

export interface IndustryOption {
  value: string
  label: string
}

export interface RoleOption {
  value: string
  label: string
}

export interface SizeOption {
  value: string
  label: string
}

export interface DepartmentOption {
  value: string
  label: string
}

export interface GenderOption {
  value: string
  label: string
}