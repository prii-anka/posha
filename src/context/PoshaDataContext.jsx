import { createContext, useContext } from 'react'
import { usePersistentState } from '../hooks/usePersistentState.js'
import { SAMPLE_CLOSET, SAMPLE_OUTFITS } from '../data/dummyData.js'

const PoshaDataContext = createContext()

export function PoshaDataProvider({ children }) {
  // FOR POC: Always use dummy data if user data is empty
  const [closetRaw, setClosetRaw] = usePersistentState('poshaCloset', SAMPLE_CLOSET)
  const [outfitsRaw, setOutfitsRaw] = usePersistentState('poshaOutfits', SAMPLE_OUTFITS)

  // Use dummy data if arrays are empty (POC mode)
  const closet = closetRaw.length === 0 ? SAMPLE_CLOSET : closetRaw
  const outfits = outfitsRaw.length === 0 ? SAMPLE_OUTFITS : outfitsRaw
  const setCloset = setClosetRaw
  const setOutfits = setOutfitsRaw

  const [preferences, setPreferences] = usePersistentState('poshaPreferences', ['Minimalist', 'Sustainable'])
  const [skinTone, setSkinTone] = usePersistentState('poshaSkinTone', 'Medium')

  // Closet management
  const addClosetItem = (item) => {
    if (item.trim() && !closet.includes(item.trim())) {
      setCloset([...closet, item.trim()])
      return true
    }
    return false
  }

  const addClosetItemWithImage = (itemData) => {
    // itemData: { id, name, category, color, fabric, image, addedAt }
    setCloset([...closet, itemData])
    return true
  }

  const removeClosetItem = (itemToRemove) => {
    // Support both string items (legacy) and object items (new)
    // itemToRemove can be either a string, an ID string, or an entire item object
    setCloset(closet.filter((i) => {
      if (typeof i === 'string') {
        // Legacy string item
        if (typeof itemToRemove === 'string') return i !== itemToRemove
        return true
      }
      // Object item
      if (typeof itemToRemove === 'object') {
        return i.id !== itemToRemove.id
      }
      // itemToRemove is an ID string
      return i.id !== itemToRemove
    }))
  }

  const updateClosetItem = (itemId, updates) => {
    setCloset(closet.map(item => {
      if (typeof item === 'object' && item.id === itemId) {
        return { ...item, ...updates }
      }
      return item
    }))
  }

  // Outfit logging
  const logOutfit = (outfit) => {
    const newOutfit = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...outfit,
    }
    setOutfits([newOutfit, ...outfits])
    return newOutfit
  }

  // Preferences management
  const togglePreference = (pref) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter((p) => p !== pref))
    } else {
      setPreferences([...preferences, pref])
    }
  }

  // Analytics & Insights
  const getColorFrequency = () => {
    const colors = {}
    outfits.forEach((outfit) => {
      if (outfit.colors) {
        outfit.colors.forEach((color) => {
          colors[color] = (colors[color] || 0) + 1
        })
      }
    })
    return Object.entries(colors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }

  const getFabricPreferences = () => {
    const fabrics = {}
    outfits.forEach((outfit) => {
      if (outfit.fabrics) {
        outfit.fabrics.forEach((fabric) => {
          fabrics[fabric] = (fabrics[fabric] || 0) + 1
        })
      }
    })
    return Object.entries(fabrics).sort((a, b) => b[1] - a[1])
  }

  const getOccasionPatterns = () => {
    const occasions = {}
    outfits.forEach((outfit) => {
      if (outfit.occasion) {
        occasions[outfit.occasion] = (occasions[outfit.occasion] || 0) + 1
      }
    })
    return occasions
  }

  const getWeatherPatterns = () => {
    const weather = {}
    outfits.forEach((outfit) => {
      if (outfit.weather) {
        weather[outfit.weather] = (weather[outfit.weather] || 0) + 1
      }
    })
    return weather
  }

  const getWeeklySummary = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const weeklyOutfits = outfits.filter((outfit) => {
      const outfitDate = new Date(outfit.timestamp)
      return outfitDate >= weekAgo
    })

    return {
      count: weeklyOutfits.length,
      topColors: getColorFrequency(),
      topOccasion: Object.entries(getOccasionPatterns())
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Not tracked',
      outfits: weeklyOutfits,
    }
  }

  const getPersona = () => {
    const colorCount = getColorFrequency().length
    const prefCount = preferences.length
    const outfitCount = outfits.length

    if (outfitCount < 5) {
      return {
        type: 'Explorer',
        description: 'Just starting to discover your style patterns',
      }
    }

    if (preferences.includes('Bold patterns') && colorCount > 3) {
      return {
        type: 'Creative',
        description: 'You love color variety and bold expressions',
      }
    }

    if (preferences.includes('Neutral tones') || preferences.includes('Modest')) {
      return {
        type: 'Minimalist',
        description: 'You prefer timeless, understated elegance',
      }
    }

    if (preferences.includes('Athleisure')) {
      return {
        type: 'Active',
        description: 'Comfort and movement guide your choices',
      }
    }

    return {
      type: 'Balanced',
      description: 'You blend different styles with ease',
    }
  }

  const value = {
    // State
    closet,
    outfits,
    preferences,
    skinTone,

    // Setters
    setCloset,
    setOutfits,
    setPreferences,
    setSkinTone,

    // Actions
    addClosetItem,
    addClosetItemWithImage,
    removeClosetItem,
    updateClosetItem,
    logOutfit,
    togglePreference,

    // Analytics
    getColorFrequency,
    getFabricPreferences,
    getOccasionPatterns,
    getWeatherPatterns,
    getWeeklySummary,
    getPersona,
  }

  return (
    <PoshaDataContext.Provider value={value}>
      {children}
    </PoshaDataContext.Provider>
  )
}

export function usePoshaData() {
  const context = useContext(PoshaDataContext)
  if (!context) {
    throw new Error('usePoshaData must be used within a PoshaDataProvider')
  }
  return context
}
