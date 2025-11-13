import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import './Settings.css'

function Settings() {
  const navigate = useNavigate()

  const [settings, setSettings] = useState({
    darkMode: false,
    accentColor: '#E94B7A',
    notifications: true,
    weatherUpdates: true
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '' })

  useEffect(() => {
    // Load existing settings
    const savedProfile = localStorage.getItem('poshaProfile')
    if (savedProfile) {
      const data = JSON.parse(savedProfile)
      setSettings({
        darkMode: data.darkMode || false,
        accentColor: data.accentColor || '#E94B7A',
        notifications: data.notifications !== undefined ? data.notifications : true,
        weatherUpdates: data.weatherUpdates !== undefined ? data.weatherUpdates : true
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
  }, [])

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }))
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

  const handleSave = () => {
    // Save to localStorage
    const savedProfile = JSON.parse(localStorage.getItem('poshaProfile') || '{}')
    const updatedProfile = {
      ...savedProfile,
      darkMode: settings.darkMode,
      accentColor: settings.accentColor,
      notifications: settings.notifications,
      weatherUpdates: settings.weatherUpdates,
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem('poshaProfile', JSON.stringify(updatedProfile))

    setHasChanges(false)
    setModal({
      isOpen: true,
      type: 'success',
      title: 'Settings Saved!',
      message: 'Your settings have been updated successfully.'
    })
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="settings-title">Settings</h1>
          <div style={{ width: '60px' }} />
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Dark Mode & Accent Color */}
          <section className="settings-section">
            <h2 className="section-title">Appearance</h2>
            <p className="section-description">Customize your viewing experience</p>

            <div className="dark-mode-toggle">
              <label className="toggle-label">
                <span>Dark Mode</span>
                <button
                  className={`toggle-switch ${settings.darkMode ? 'active' : ''}`}
                  onClick={() => handleChange('darkMode', !settings.darkMode)}
                  aria-label="Toggle dark mode"
                >
                  <div className="toggle-slider"></div>
                </button>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="accentColor">Accent Color</label>
              <div className="color-picker-wrapper">
                <input
                  id="accentColor"
                  type="color"
                  className="color-picker"
                  value={settings.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                />
                <div className="color-presets">
                  <button
                    className={`color-preset ${settings.accentColor === '#FF1694' ? 'active' : ''}`}
                    style={{ backgroundColor: '#FF1694' }}
                    onClick={() => handleChange('accentColor', '#FF1694')}
                    title="Hot Pink"
                  />
                  <button
                    className={`color-preset ${settings.accentColor === '#E94B7A' ? 'active' : ''}`}
                    style={{ backgroundColor: '#E94B7A' }}
                    onClick={() => handleChange('accentColor', '#E94B7A')}
                    title="Rose Pink"
                  />
                  <button
                    className={`color-preset ${settings.accentColor === '#9B59B6' ? 'active' : ''}`}
                    style={{ backgroundColor: '#9B59B6' }}
                    onClick={() => handleChange('accentColor', '#9B59B6')}
                    title="Purple"
                  />
                  <button
                    className={`color-preset ${settings.accentColor === '#3498DB' ? 'active' : ''}`}
                    style={{ backgroundColor: '#3498DB' }}
                    onClick={() => handleChange('accentColor', '#3498DB')}
                    title="Blue"
                  />
                  <button
                    className={`color-preset ${settings.accentColor === '#1ABC9C' ? 'active' : ''}`}
                    style={{ backgroundColor: '#1ABC9C' }}
                    onClick={() => handleChange('accentColor', '#1ABC9C')}
                    title="Teal"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-section">
            <h2 className="section-title">Notifications</h2>
            <p className="section-description">Manage your notification preferences</p>

            <div className="notification-toggles">
              <label className="toggle-label">
                <span>Push Notifications</span>
                <button
                  className={`toggle-switch ${settings.notifications ? 'active' : ''}`}
                  onClick={() => handleChange('notifications', !settings.notifications)}
                  aria-label="Toggle notifications"
                >
                  <div className="toggle-slider"></div>
                </button>
              </label>

              <label className="toggle-label">
                <span>Weather Updates</span>
                <button
                  className={`toggle-switch ${settings.weatherUpdates ? 'active' : ''}`}
                  onClick={() => handleChange('weatherUpdates', !settings.weatherUpdates)}
                  aria-label="Toggle weather updates"
                >
                  <div className="toggle-slider"></div>
                </button>
              </label>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="settings-footer">
          <button
            className="save-button"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Changes
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

export default Settings
