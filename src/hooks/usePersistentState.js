import { useState, useEffect } from 'react'

/**
 * Custom hook for state that persists to localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - default value if nothing in localStorage
 * @returns {[any, function]} - [state, setState] tuple
 */
export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, state])

  return [state, setState]
}
