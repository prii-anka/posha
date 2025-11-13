// NEW FEATURE UPDATE – Phase 9 Overhaul with Auth & Profile
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Auth from './components/Auth.jsx'
import Onboarding from './components/Onboarding.jsx'
import MainLayout from './components/MainLayout.jsx'
import Shell from './components/Shell.jsx'
import FashionChat from './components/FashionChat.jsx'
import InsightsGrid from './components/insights/InsightsGrid.jsx'
import Planner from './pages/Planner.jsx'
import Closet from './pages/Closet.jsx'
import LearnStudio from './pages/LearnStudio.jsx'
import ShopStudio from './pages/ShopStudio.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  // Check authentication and onboarding status
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('poshaIsAuthenticated') === 'true'
  })

  const [showOnboarding, setShowOnboarding] = useState(() => {
    const hasCompletedOnboarding = localStorage.getItem('poshaOnboardingComplete')
    return !hasCompletedOnboarding
  })

  const [isSkipFlow, setIsSkipFlow] = useState(false)
  const [userData, setUserData] = useState(null)

  // Handle auth completion (signup/login)
  const handleAuthComplete = (user) => {
    setUserData(user)
    setIsAuthenticated(true)
    setIsSkipFlow(false)
  }

  // Handle skip flow
  const handleSkip = () => {
    setIsAuthenticated(false)
    setIsSkipFlow(true)
    // Skip users still go through onboarding to complete profile
  }

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    localStorage.setItem('poshaOnboardingComplete', 'true')
    setShowOnboarding(false)
    setIsSkipFlow(false)
  }

  // User flow logic:
  // 1. Not authenticated & not skip flow -> Show Auth
  // 2. Authenticated OR skip flow, but onboarding incomplete -> Show Onboarding
  // 3. Onboarding complete -> Show main app routes

  if (!isAuthenticated && !isSkipFlow) {
    return <Auth onComplete={handleAuthComplete} onSkip={handleSkip} />
  }

  if (showOnboarding) {
    return (
      <Onboarding
        onComplete={handleOnboardingComplete}
        isSkipFlow={isSkipFlow}
        userData={userData}
      />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<MainLayout><FashionChat /></MainLayout>} />
        <Route path="/insights" element={<MainLayout><InsightsGrid /></MainLayout>} />
        <Route path="/planner" element={<MainLayout><Planner /></MainLayout>} />
        <Route path="/closet" element={<MainLayout><Closet /></MainLayout>} />
        <Route path="/learn" element={<MainLayout><LearnStudio /></MainLayout>} />
        <Route path="/shop" element={<MainLayout><ShopStudio /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><ProfileSettings /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
