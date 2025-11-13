import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { usePoshaProfile } from '../context/PoshaProfileContext.jsx'
import ProfileDrawer from './ProfileDrawer.jsx'
import './TopBar.css'

function TopBar() {
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { theme, setTheme, themes, themeLabels } = useTheme()
  const { profile } = usePoshaProfile()

  return (
    <>
      <header className="topbar">
        <Link to="/dashboard" className="topbar-logo-link">
          <h1 className="topbar-logo">पोsha</h1>
        </Link>
        <div className="topbar-actions">
          {/* My Closet Link */}
          <Link to="/closet" className="planner-link" aria-label="My Closet" title="My Closet">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 2h8M8 2v4M16 2v4M4 6h16v16H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="6" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
              <circle cx="10" cy="12" r="1" fill="currentColor"/>
              <circle cx="14" cy="12" r="1" fill="currentColor"/>
            </svg>
          </Link>
          {/* NEW FEATURE UPDATE – Phase 9: Learn Studio Link */}
          <Link to="/learn" className="planner-link" aria-label="Learn Studio" title="Learn Studio">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          {/* NEW FEATURE UPDATE – Phase 9: Shop Studio Link */}
          <Link to="/shop" className="planner-link" aria-label="Shop Studio" title="Shop Studio">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/planner" className="planner-link" aria-label="Weekly Planner" title="Weekly Planner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
          <button
            className="profile-avatar-btn"
            onClick={() => setShowProfile(true)}
            aria-label="Profile"
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="topbar-avatar" />
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M6 28 Q6 20 16 20 Q26 20 26 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </button>
          <button
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
            aria-haspopup="dialog"
            aria-expanded={showSettings}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 1v6m0 6v10M1 12h6m6 0h10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <ProfileDrawer isOpen={showProfile} onClose={() => setShowProfile(false)} />

      {showSettings && (
        <div className="settings-modal-overlay" onClick={() => setShowSettings(false)}>
          <div
            className="settings-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <div className="settings-header">
              <h2 id="settings-title">Settings</h2>
              <button
                className="close-btn"
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            <div className="settings-content">
              <section className="settings-section">
                <h3>Theme</h3>
                <p className="settings-description">Choose your aesthetic preference</p>
                <div className="theme-options" role="radiogroup" aria-label="Theme selection">
                  {Object.values(themes).map((themeKey) => (
                    <button
                      key={themeKey}
                      className={`theme-option-btn ${theme === themeKey ? 'active' : ''}`}
                      onClick={() => setTheme(themeKey)}
                      role="radio"
                      aria-checked={theme === themeKey}
                      aria-label={`${themeLabels[themeKey]} theme`}
                    >
                      {themeLabels[themeKey]}
                    </button>
                  ))}
                </div>
              </section>

              <section className="settings-section">
                <h3>About Posha</h3>
                <p className="settings-description">
                  Posha is a Fashion Intelligence platform that learns your style patterns
                  and helps you reflect on your wardrobe choices.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TopBar
