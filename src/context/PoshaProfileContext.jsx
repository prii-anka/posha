import { createContext, useContext } from 'react'
import { usePersistentState } from '../hooks/usePersistentState.js'

const PoshaProfileContext = createContext()

export function PoshaProfileProvider({ children }) {
  // Profile basics
  // NEW FEATURE UPDATE – Phase 9: Extended profile fields
  const [profile, setProfile] = usePersistentState('poshaProfile', {
    name: '',
    pronouns: '',
    styleArchetype: '', // From onboarding quiz
    avatar: null, // Base64 or URL
    createdAt: new Date().toISOString(),
    // NEW: Phase 9 additions
    styleGoals: [], // ['Comfort', 'Statement', 'Eco', etc.]
    inspirationImages: [], // URLs or uploads
    shoppingPreference: '', // 'Love it' / 'Hate it' / 'In between'
    savedLearnCards: [], // Bookmarked learn cards from Learn Studio
  })

  // Mood tracking
  const [moodLog, setMoodLog] = usePersistentState('poshaMoodLog', [])

  // Style board (Pinterest-style)
  const [styleBoard, setStyleBoard] = usePersistentState('poshaStyleBoard', [])

  // Learning insights
  const [insights, setInsights] = usePersistentState('poshaInsights', {
    paletteProgress: [], // Monthly palette trends
    fabricTrends: [], // Recurring fabric preferences
    moodPatterns: {}, // Mood frequency
  })

  // Profile actions
  const updateProfile = (updates) => {
    setProfile({ ...profile, ...updates })
  }

  const uploadAvatar = (imageData) => {
    setProfile({ ...profile, avatar: imageData })
  }

  // Mood tracking
  const logMood = (mood) => {
    const newMoodEntry = {
      id: Date.now(),
      mood,
      timestamp: new Date().toISOString(),
    }
    setMoodLog([newMoodEntry, ...moodLog])

    // Update mood patterns
    const moodPatterns = { ...insights.moodPatterns }
    moodPatterns[mood] = (moodPatterns[mood] || 0) + 1
    setInsights({ ...insights, moodPatterns })
  }

  const getMoodTrend = (days = 7) => {
    const now = new Date()
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    return moodLog.filter(entry => new Date(entry.timestamp) >= cutoff)
  }

  // Style board management
  const addToStyleBoard = (image) => {
    const newImage = {
      id: Date.now(),
      src: image.src,
      colors: image.colors || [], // Extracted colors
      timestamp: new Date().toISOString(),
    }
    setStyleBoard([newImage, ...styleBoard])

    // Update palette progress
    if (image.colors && image.colors.length > 0) {
      const month = new Date().toISOString().slice(0, 7) // YYYY-MM
      const paletteProgress = [...insights.paletteProgress]
      const monthIndex = paletteProgress.findIndex(p => p.month === month)

      if (monthIndex >= 0) {
        paletteProgress[monthIndex].colors.push(...image.colors)
      } else {
        paletteProgress.push({ month, colors: image.colors })
      }

      setInsights({ ...insights, paletteProgress })
    }
  }

  const removeFromStyleBoard = (id) => {
    setStyleBoard(styleBoard.filter(img => img.id !== id))
  }

  // Analytics
  const getPaletteTrends = () => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    const trend = insights.paletteProgress.find(p => p.month === currentMonth)

    if (!trend || !trend.colors.length) return []

    // Count color frequency
    const colorCounts = {}
    trend.colors.forEach(color => {
      colorCounts[color] = (colorCounts[color] || 0) + 1
    })

    return Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color, count]) => ({ color, count }))
  }

  const getMicroInsight = () => {
    const paletteTrends = getPaletteTrends()
    const topMood = Object.entries(insights.moodPatterns || {})
      .sort((a, b) => b[1] - a[1])[0]

    if (paletteTrends.length > 0 && topMood) {
      const topColor = paletteTrends[0].color
      return `You often lean toward ${topColor.toLowerCase()} tones when feeling ${topMood[0].toLowerCase()}.`
    }

    if (paletteTrends.length > 0) {
      const topColors = paletteTrends.slice(0, 2).map(t => t.color.toLowerCase()).join(' and ')
      return `You've been drawn to ${topColors} this month.`
    }

    return null
  }

  const value = {
    // State
    profile,
    moodLog,
    styleBoard,
    insights,

    // Profile actions
    updateProfile,
    uploadAvatar,

    // Mood tracking
    logMood,
    getMoodTrend,

    // Style board
    addToStyleBoard,
    removeFromStyleBoard,

    // Analytics
    getPaletteTrends,
    getMicroInsight,
  }

  return (
    <PoshaProfileContext.Provider value={value}>
      {children}
    </PoshaProfileContext.Provider>
  )
}

export function usePoshaProfile() {
  const context = useContext(PoshaProfileContext)
  if (!context) {
    throw new Error('usePoshaProfile must be used within a PoshaProfileProvider')
  }
  return context
}
