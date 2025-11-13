import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  SOFT_MUSE: 'soft-muse',
  NEUTRAL_BALANCE: 'neutral-balance',
  BOLD_EDGE: 'bold-edge',
};

export const THEME_LABELS = {
  [THEMES.SOFT_MUSE]: 'Soft Muse',
  [THEMES.NEUTRAL_BALANCE]: 'Neutral Balance',
  [THEMES.BOLD_EDGE]: 'Bold Edge',
};

export const THEME_DESCRIPTIONS = {
  [THEMES.SOFT_MUSE]: 'Cream, Blush, Lavender — gentle and romantic',
  [THEMES.NEUTRAL_BALANCE]: 'Cream, Gold, Slate — balanced and refined',
  [THEMES.BOLD_EDGE]: 'Rose, Ink, Lavender — confident and editorial',
};

const STORAGE_KEY = 'poshaTheme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage or default to SOFT_MUSE
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    return savedTheme && Object.values(THEMES).includes(savedTheme)
      ? savedTheme
      : THEMES.SOFT_MUSE;
  });

  // Auto-detect theme based on user's frequently worn colors
  useEffect(() => {
    const updateThemeBasedOnColors = () => {
      const outfits = JSON.parse(localStorage.getItem('poshaOutfits') || '[]')

      if (outfits.length < 5) return // Need at least 5 outfits for pattern detection

      // Count color frequency
      const colorCounts = {}
      outfits.forEach(outfit => {
        if (outfit.colors && Array.isArray(outfit.colors)) {
          outfit.colors.forEach(color => {
            const colorLower = color.toLowerCase()
            colorCounts[colorLower] = (colorCounts[colorLower] || 0) + 1
          })
        }
      })

      const topColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([color]) => color)

      // Auto-select theme based on dominant colors
      const hasNeutrals = topColors.some(c => ['beige', 'cream', 'white', 'gray', 'black', 'brown'].includes(c))
      const hasBolds = topColors.some(c => ['red', 'purple', 'navy', 'emerald', 'burgundy'].includes(c))
      const hasSofts = topColors.some(c => ['pink', 'lavender', 'blush', 'peach', 'rose'].includes(c))

      let suggestedTheme = theme // Keep current by default

      if (hasSofts && !hasBolds) {
        suggestedTheme = THEMES.SOFT_MUSE
      } else if (hasNeutrals && !hasBolds && !hasSofts) {
        suggestedTheme = THEMES.NEUTRAL_BALANCE
      } else if (hasBolds) {
        suggestedTheme = THEMES.BOLD_EDGE
      }

      // Only auto-update if user hasn't manually set a theme recently
      const manualThemeSet = localStorage.getItem('poshaManualThemeSet')
      if (!manualThemeSet && suggestedTheme !== theme) {
        setTheme(suggestedTheme)
      }
    }

    // Check on mount and when outfits change
    updateThemeBasedOnColors()

    const interval = setInterval(updateThemeBasedOnColors, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [theme])

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setThemeManually = (newTheme) => {
    setTheme(newTheme)
    // Mark that user manually set theme (prevents auto-switching for 30 days)
    localStorage.setItem('poshaManualThemeSet', Date.now().toString())
  }

  const value = {
    theme,
    setTheme: setThemeManually,
    themes: THEMES,
    themeLabels: THEME_LABELS,
    themeDescriptions: THEME_DESCRIPTIONS,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
