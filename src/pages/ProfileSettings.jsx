import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import Modal from '../components/Modal.jsx'
import './ProfileSettings.css'

const STYLE_VIBES = [
  'Minimalist', 'Maximalist', 'Bohemian', 'Classic', 'Edgy', 'Romantic',
  'Sporty', 'Preppy', 'Streetwear', 'Vintage', 'Modern', 'Eclectic'
]

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

function ProfileSettings() {
  const navigate = useNavigate()
  const { themes, themeLabels, themeDescriptions, setTheme, currentTheme } = useTheme()

  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    styleVibes: [],
    wantsMakeup: null,
    theme: currentTheme,
    darkMode: false,
    accentColor: '#E94B7A'
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '' })

  useEffect(() => {
    // Load existing profile data
    const savedProfile = localStorage.getItem('poshaProfile')
    if (savedProfile) {
      const data = JSON.parse(savedProfile)
      setProfile({
        name: data.name || '',
        gender: data.gender || '',
        styleVibes: data.styleVibes || [],
        wantsMakeup: data.wantsMakeup,
        theme: data.theme || currentTheme,
        darkMode: data.darkMode || false,
        accentColor: data.accentColor || '#E94B7A'
      })

      // Apply dark mode if enabled
      if (data.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark')
      }

      // Apply accent color
      if (data.accentColor) {
        document.documentElement.style.setProperty('--color-accent-custom', data.accentColor)
      }
    }
  }, [currentTheme])

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)

    // Apply dark mode change immediately
    if (field === 'darkMode') {
      if (value) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }

    // Apply accent color change immediately
    if (field === 'accentColor') {
      document.documentElement.style.setProperty('--color-accent-custom', value)
    }
  }

  const toggleStyleVibe = (vibe) => {
    setProfile(prev => ({
      ...prev,
      styleVibes: prev.styleVibes.includes(vibe)
        ? prev.styleVibes.filter(v => v !== vibe)
        : [...prev.styleVibes, vibe]
    }))
    setHasChanges(true)
  }

  const handleThemeChange = (newTheme) => {
    setProfile(prev => ({ ...prev, theme: newTheme }))
    setTheme(newTheme)
    setHasChanges(true)
  }

  const handleSave = () => {
    // Validate required fields
    if (!profile.name.trim()) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Name Required',
        message: 'Please enter your name to continue.'
      })
      return
    }
    if (!profile.gender) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Gender Required',
        message: 'Please select your gender to continue.'
      })
      return
    }
    if (profile.styleVibes.length < 3) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Style Vibes Required',
        message: `Please select at least 3 style vibes. You've selected ${profile.styleVibes.length}.`
      })
      return
    }

    // Save to localStorage
    const savedProfile = JSON.parse(localStorage.getItem('poshaProfile') || '{}')
    const updatedProfile = {
      ...savedProfile,
      ...profile,
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem('poshaProfile', JSON.stringify(updatedProfile))
    localStorage.setItem('poshaTheme', profile.theme)

    setHasChanges(false)
    setModal({
      isOpen: true,
      type: 'success',
      title: 'Profile Updated!',
      message: 'Your profile has been saved successfully.'
    })
  }

  const handleLogoutClick = () => {
    setModal({
      isOpen: true,
      type: 'question',
      title: 'Log Out',
      message: 'Are you sure you want to log out? You\'ll need to sign in again.',
      showCancel: true,
      confirmText: 'Log Out',
      cancelText: 'Cancel',
      onConfirm: handleLogout
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('poshaIsAuthenticated')
    localStorage.removeItem('poshaOnboardingComplete')
    localStorage.removeItem('poshaProfile')
    window.location.reload()
  }

  return (
    <div className="profile-settings">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="profile-title">Profile Settings</h1>
          <div style={{ width: '60px' }} />
        </div>

        {/* Profile Form */}
        <div className="profile-content">
          {/* Name Section */}
          <section className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                className="profile-input"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </section>

          {/* Gender Section */}
          <section className="profile-section">
            <h2 className="section-title">Gender *</h2>
            <div className="gender-grid">
              {GENDERS.map((gender) => (
                <button
                  key={gender}
                  className={`gender-btn ${profile.gender === gender ? 'active' : ''}`}
                  onClick={() => handleChange('gender', gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </section>

          {/* Style Vibes Section */}
          <section className="profile-section">
            <h2 className="section-title">Style Vibes *</h2>
            <p className="section-description">Select at least 3 vibes that match your style</p>
            <div className="vibes-grid">
              {STYLE_VIBES.map((vibe) => (
                <button
                  key={vibe}
                  className={`vibe-btn ${profile.styleVibes.includes(vibe) ? 'active' : ''}`}
                  onClick={() => toggleStyleVibe(vibe)}
                >
                  {vibe}
                </button>
              ))}
            </div>
            <p className="selection-count">
              {profile.styleVibes.length} selected {profile.styleVibes.length < 3 && `(${3 - profile.styleVibes.length} more needed)`}
            </p>
          </section>

          {/* Makeup Preference */}
          <section className="profile-section">
            <h2 className="section-title">Makeup & Beauty</h2>
            <p className="section-description">Would you like makeup and beauty tips?</p>
            <div className="makeup-options">
              <button
                className={`makeup-btn ${profile.wantsMakeup === true ? 'active' : ''}`}
                onClick={() => handleChange('wantsMakeup', true)}
              >
                Yes, include beauty tips
              </button>
              <button
                className={`makeup-btn ${profile.wantsMakeup === false ? 'active' : ''}`}
                onClick={() => handleChange('wantsMakeup', false)}
              >
                No, fashion only
              </button>
            </div>
          </section>

          {/* Theme Selection */}
          <section className="profile-section">
            <h2 className="section-title">App Theme</h2>
            <div className="theme-grid">
              {Object.entries(themes).map(([key, value]) => (
                <button
                  key={key}
                  className={`theme-card ${profile.theme === value ? 'active' : ''}`}
                  onClick={() => handleThemeChange(value)}
                >
                  <div className="theme-preview" data-theme={value}>
                    <div className="theme-color-row">
                      <div className="theme-color-dot primary"></div>
                      <div className="theme-color-dot secondary"></div>
                      <div className="theme-color-dot tertiary"></div>
                    </div>
                  </div>
                  <div className="theme-info">
                    <h3 className="theme-name">{themeLabels[value]}</h3>
                    <p className="theme-desc">{themeDescriptions[value]}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="profile-footer">
          <button
            className="save-button"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
          <button className="logout-button" onClick={handleLogoutClick}>
            Log Out
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={modal.onConfirm}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText || 'OK'}
        cancelText={modal.cancelText || 'Cancel'}
        showCancel={modal.showCancel || false}
      />
    </div>
  )
}

export default ProfileSettings
