import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ isOpen = false, onClose = () => {}, isMobile = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  // On mobile, use isOpen prop; on desktop, use isExpanded state
  const shouldBeExpanded = isMobile ? isOpen : isExpanded

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(false) // Start collapsed on desktop
    }
  }, [isMobile])

  const isActive = (path) => location.pathname === path

  const handleNavigation = (path) => {
    navigate(path)
    if (isMobile && onClose) {
      onClose() // Close sidebar on mobile after navigation
    }
  }

  const handleToggle = () => {
    if (isMobile && onClose) {
      onClose()
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <aside className={`sidebar ${shouldBeExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Header with Logo and Toggle */}
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-text">पोsha</span>
        </div>
        <button
          className="sidebar-toggle"
          onClick={handleToggle}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobile ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-main" aria-label="Main navigation">
        <div className="nav-section">
          <button
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => handleNavigation('/dashboard')}
            title="Chat with Posha"
            aria-current={isActive('/dashboard') ? 'page' : undefined}
            aria-label="Chat with Posha"
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="nav-text">Chat with Posha</span>
          </button>

          <button
            className={`nav-item ${isActive('/insights') ? 'active' : ''}`}
            onClick={() => handleNavigation('/insights')}
            title="Dashboard"
            aria-current={isActive('/insights') ? 'page' : undefined}
            aria-label="Dashboard"
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span className="nav-text">Dashboard</span>
          </button>

          <button
            className={`nav-item ${isActive('/learn') ? 'active' : ''}`}
            onClick={() => handleNavigation('/learn')}
            title="Learn Studio"
            aria-current={isActive('/learn') ? 'page' : undefined}
            aria-label="Learn Studio"
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="nav-text">Learn Studio</span>
          </button>

          <button
            className={`nav-item ${isActive('/shop') ? 'active' : ''}`}
            onClick={() => handleNavigation('/shop')}
            title="Shop"
            aria-current={isActive('/shop') ? 'page' : undefined}
            aria-label="Shop"
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="nav-text">Shop</span>
          </button>

          <button
            className={`nav-item ${isActive('/closet') ? 'active' : ''}`}
            onClick={() => handleNavigation('/closet')}
            title="Your Closet"
            aria-current={isActive('/closet') ? 'page' : undefined}
            aria-label="Your Closet"
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span className="nav-text">Your Closet</span>
          </button>
        </div>
      </nav>

      {/* Bottom Profile & Settings */}
      <div className="sidebar-footer">
        <button
          className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
          onClick={() => handleNavigation('/settings')}
          title="Settings"
          aria-current={isActive('/settings') ? 'page' : undefined}
          aria-label="Settings"
        >
          <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className="nav-text">Settings</span>
        </button>

        <button
          className={`nav-item profile-btn ${isActive('/profile') ? 'active' : ''}`}
          onClick={() => handleNavigation('/profile')}
          title="Profile"
          aria-current={isActive('/profile') ? 'page' : undefined}
          aria-label="Profile"
        >
          <div className="profile-avatar" aria-hidden="true">
            <span>P</span>
          </div>
          <span className="nav-text">Profile</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
