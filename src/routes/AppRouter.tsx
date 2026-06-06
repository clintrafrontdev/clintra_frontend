import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { ConfirmEmailPage } from '../pages/ConfirmEmailPage'
import { CompanyDetailsPage } from '../pages/CompanyDetailsPage'
import { CompanyAddressPage } from '../pages/CompanyAddressPage'
import { CompanyTeamPage } from '../pages/CompanyTeamPage'
import { useAuth } from '../hooks/useAuth'
import PageLoader from '../components/common/PageLoader'
import { usePageLoader } from '../hooks/usePageLoader'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  // Check if company onboarding is completed
  const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted')
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (hasCompletedOnboarding) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

// Inner wrapper so usePageLoader can access useLocation (inside BrowserRouter)
const RouterContent: React.FC = () => {
  const loading = usePageLoader()

  return (
    <>
      <PageLoader visible={loading} />
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        
        {/* Onboarding Routes */}
        <Route path="/company/details" element={
          <OnboardingRoute>
            <CompanyDetailsPage />
          </OnboardingRoute>
        } />
        <Route path="/company/address" element={
          <OnboardingRoute>
            <CompanyAddressPage />
          </OnboardingRoute>
        } />
        <Route path="/company/team" element={
          <OnboardingRoute>
            <CompanyTeamPage />
          </OnboardingRoute>
        } />
        
        {/* Dashboard */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  )
}