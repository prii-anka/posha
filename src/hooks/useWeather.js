import { useState, useEffect } from 'react'

// OpenWeatherMap API (free tier)
const WEATHER_API_KEY = 'demo' // Using demo mode - replace with actual key for production
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

// Map OpenWeatherMap conditions to our simplified categories
const mapWeatherCondition = (condition, temp) => {
  const main = condition?.main?.toLowerCase() || ''
  const description = condition?.description?.toLowerCase() || ''

  // Temperature-based conditions
  if (temp > 30) return 'Hot'
  if (temp < 10) return 'Cold'

  // Weather-based conditions
  if (main.includes('rain') || description.includes('rain')) return 'Rainy'
  if (main.includes('cloud') || description.includes('cloud')) return 'Cloudy'
  if (main.includes('clear') || description.includes('clear')) return 'Sunny'

  // Default to Mild
  return 'Mild'
}

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        // For demo purposes, we'll simulate weather data based on time of day
        // In production, replace this with actual API call
        const simulateWeatherData = () => {
          const hour = new Date().getHours()
          const temp = 15 + Math.random() * 15 // 15-30°C

          let condition = 'Sunny'
          if (hour < 6 || hour > 20) {
            condition = 'Cold'
          } else if (hour > 12 && hour < 16) {
            condition = Math.random() > 0.5 ? 'Hot' : 'Sunny'
          } else if (Math.random() > 0.7) {
            condition = 'Cloudy'
          }

          return {
            condition,
            temp: Math.round(temp),
            description: `${condition} weather`,
          }
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const weatherData = simulateWeatherData()

        setWeather({
          condition: weatherData.condition,
          temperature: weatherData.temp,
          description: weatherData.description,
        })

        setLoading(false)
      } catch (err) {
        console.error('Error fetching weather:', err)
        setError('Unable to fetch weather data')
        setLoading(false)
      }
    }

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser')
        setLoading(false)
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          // Reverse geocode to get city name using Nominatim (OpenStreetMap)
          let locationName = 'Your Location'
          try {
            const geocodeResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
              {
                headers: {
                  'User-Agent': 'PoshaApp/1.0'
                }
              }
            )
            const geocodeData = await geocodeResponse.json()

            // Try to get city, town, or village name
            const address = geocodeData.address || {}
            locationName = address.city || address.town || address.village || address.county || 'Your Location'
          } catch (error) {
            console.error('Error fetching location name:', error)
            // Fall back to 'Your Location' if geocoding fails
          }

          setLocation({
            latitude,
            longitude,
            name: locationName,
          })

          await fetchWeather(latitude, longitude)
        },
        (err) => {
          console.error('Error getting location:', err)

          // Fallback: Use default weather without location
          setError('Location access denied. Using default weather.')
          setLocation({ name: 'Unknown Location' })

          // Still provide weather data
          const hour = new Date().getHours()
          const defaultCondition = hour > 12 && hour < 18 ? 'Sunny' : 'Mild'
          setWeather({
            condition: defaultCondition,
            temperature: 20,
            description: 'Default weather',
          })

          setLoading(false)
        }
      )
    }

    getLocation()
  }, [])

  return { weather, location, loading, error }
}
