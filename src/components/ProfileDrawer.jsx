import { useState } from 'react'
import { usePoshaProfile } from '../context/PoshaProfileContext.jsx'
import { usePoshaData } from '../context/PoshaDataContext.jsx'
import { extractColors } from '../utils/colorExtractor.js'
import './ProfileDrawer.css'

const MOOD_OPTIONS = ['Inspired', 'Confident', 'Playful', 'Calm', 'Bold', 'Minimal']

const SKIN_TONES = [
  { id: 'fair', label: 'Fair', color: '#F5D5C3' },
  { id: 'light', label: 'Light', color: '#E8B89A' },
  { id: 'medium', label: 'Medium', color: '#D4A574' },
  { id: 'tan', label: 'Tan', color: '#C68E6B' },
  { id: 'deep', label: 'Deep', color: '#8D5524' },
  { id: 'dark', label: 'Dark', color: '#5C4033' },
]

const PREFERENCE_OPTIONS = [
  'No heels',
  'Modest',
  'Avoid black',
  'Love pink',
  'Minimal jewelry',
  'Bold patterns',
  'Neutral tones',
  'Athleisure',
]

function ProfileDrawer({ isOpen, onClose }) {
  const {
    profile,
    moodLog,
    styleBoard,
    updateProfile,
    uploadAvatar,
    logMood,
    getMoodTrend,
    addToStyleBoard,
    removeFromStyleBoard,
    getPaletteTrends,
    getMicroInsight,
  } = usePoshaProfile()

  const {
    preferences,
    skinTone,
    togglePreference,
    setSkinTone,
  } = usePoshaData()

  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(profile.name)
  const [uploading, setUploading] = useState(false)

  const weeklyMood = getMoodTrend(7)
  const paletteTrends = getPaletteTrends()
  const microInsight = getMicroInsight()

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      uploadAvatar(event.target.result)
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  // Handle style board image upload
  const handleStyleBoardUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onload = async (event) => {
      const src = event.target.result

      try {
        const colors = await extractColors(file)
        addToStyleBoard({ src, colors })
      } catch (error) {
        console.error('Color extraction failed:', error)
        addToStyleBoard({ src, colors: [] })
      }

      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleNameSave = () => {
    updateProfile({ name: tempName })
    setEditingName(false)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="profile-drawer">
        <div className="drawer-header">
          <h2>Your Profile</h2>
          <button className="close-drawer-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {/* Avatar & Name */}
          <section className="profile-section">
            <div className="avatar-container">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="profile-avatar" />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M10 55 Q10 35 30 35 Q50 35 50 55"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
              <label className="avatar-upload-btn">
                {uploading ? 'Uploading...' : 'Change'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="name-section">
              {editingName ? (
                <div className="name-edit">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Your name"
                    className="name-input"
                  />
                  <button onClick={handleNameSave} className="save-name-btn">Save</button>
                </div>
              ) : (
                <div className="name-display">
                  <h3>{profile.name || 'Set your name'}</h3>
                  <button onClick={() => setEditingName(true)} className="edit-name-btn">
                    Edit
                  </button>
                </div>
              )}
              {profile.pronouns && <p className="pronouns">{profile.pronouns}</p>}
              {profile.styleArchetype && (
                <p className="archetype">{profile.styleArchetype}</p>
              )}
            </div>
          </section>

          {/* Micro Insight */}
          {microInsight && (
            <section className="profile-section insight-section">
              <div className="micro-insight">
                <span className="insight-icon">✨</span>
                <p>{microInsight}</p>
              </div>
            </section>
          )}

          {/* Mood Tracker */}
          <section className="profile-section">
            <h3 className="section-heading">Mood This Week</h3>
            <div className="mood-grid">
              {MOOD_OPTIONS.map((mood) => (
                <button
                  key={mood}
                  className="mood-btn"
                  onClick={() => logMood(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
            {weeklyMood.length > 0 && (
              <div className="mood-timeline">
                {weeklyMood.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="mood-entry">
                    <span className="mood-badge">{entry.mood}</span>
                    <span className="mood-date">
                      {new Date(entry.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Skin Tone Selector */}
          <section className="profile-section">
            <h3 className="section-heading">✨ Your Skin Tone</h3>
            <p className="section-subtext">Get color recommendations that complement you</p>
            <div className="skin-tone-pills">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.id}
                  className={`skin-tone-pill ${skinTone === tone.id ? 'active' : ''}`}
                  onClick={() => setSkinTone(tone.id)}
                  style={{ '--tone-color': tone.color }}
                >
                  <span className="tone-swatch" style={{ backgroundColor: tone.color }} />
                  {tone.label}
                </button>
              ))}
            </div>
          </section>

          {/* Style Preferences */}
          <section className="profile-section">
            <h3 className="section-heading">💫 Style Preferences</h3>
            <p className="section-subtext">Select what matters to you</p>
            <div className="preference-list">
              {PREFERENCE_OPTIONS.map((pref) => (
                <button
                  key={pref}
                  className={`preference-btn ${preferences.includes(pref) ? 'active' : ''}`}
                  onClick={() => togglePreference(pref)}
                >
                  <span className="preference-checkbox">
                    {preferences.includes(pref) && '✓'}
                  </span>
                  {pref}
                </button>
              ))}
            </div>
            {preferences.length > 0 && (
              <div className="preference-count">
                {preferences.length} preference{preferences.length !== 1 ? 's' : ''} selected
              </div>
            )}
          </section>

          {/* Color Trends */}
          {paletteTrends.length > 0 && (
            <section className="profile-section">
              <h3 className="section-heading">Color Trends This Month</h3>
              <div className="color-trend-list">
                {paletteTrends.map((trend) => (
                  <div key={trend.color} className="color-trend-item">
                    <div className="color-trend-bar" style={{
                      width: `${(trend.count / paletteTrends[0].count) * 100}%`,
                      backgroundColor: `var(--color-accent-primary)`
                    }} />
                    <span className="color-trend-label">{trend.color}</span>
                    <span className="color-trend-count">{trend.count}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Style Board */}
          <section className="profile-section">
            <h3 className="section-heading">Style Board</h3>
            <div className="style-board-grid">
              <label className="style-board-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleStyleBoardUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
                <div className="upload-placeholder">
                  <span className="upload-icon">+</span>
                  <span className="upload-text">Add Image</span>
                </div>
              </label>
              {styleBoard.map((image) => (
                <div key={image.id} className="style-board-item">
                  <img src={image.src} alt="Style inspiration" />
                  <button
                    className="remove-style-item"
                    onClick={() => removeFromStyleBoard(image.id)}
                  >
                    ✕
                  </button>
                  {image.colors.length > 0 && (
                    <div className="extracted-colors">
                      {image.colors.map((color, i) => (
                        <div key={i} className="color-dot" title={color}>
                          <span className="color-name">{color}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ProfileDrawer
