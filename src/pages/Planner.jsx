import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePoshaData } from '../context/PoshaDataContext.jsx'
import { useWeather } from '../hooks/useWeather.js'
import './Planner.css'

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const OCCASIONS = ['Work', 'Casual', 'Formal', 'Athletic', 'Social', 'Creative', 'Relaxed']

function Planner() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [dayPlans, setDayPlans] = useState(
    DAYS_OF_WEEK.map((day) => ({
      day,
      occasion: '',
      notes: '',
      outfit: null,
    }))
  )

  const { closet, getColorFrequency, getFabricPreferences } = usePoshaData()
  const { weather, location } = useWeather()

  const topColors = getColorFrequency()
  const topFabrics = getFabricPreferences()

  const currentPlan = dayPlans[selectedDay]

  const updatePlan = (updates) => {
    const newPlans = [...dayPlans]
    newPlans[selectedDay] = { ...currentPlan, ...updates }
    setDayPlans(newPlans)
  }

  const getWeatherSuggestions = () => {
    if (!weather) return []

    const suggestions = []
    const temp = weather.temperature

    if (temp < 50) {
      suggestions.push('Layer with sweaters or jackets')
      suggestions.push('Consider warm fabrics like wool or fleece')
    } else if (temp < 70) {
      suggestions.push('Light layers work well')
      suggestions.push('Great weather for versatile pieces')
    } else {
      suggestions.push('Breathable fabrics recommended')
      suggestions.push('Light colors reflect heat')
    }

    if (weather.condition?.includes('rain')) {
      suggestions.push('Water-resistant outerwear suggested')
      suggestions.push('Closed-toe shoes recommended')
    }

    return suggestions
  }

  const getStyleSuggestions = () => {
    const suggestions = []

    if (topColors.length > 0) {
      const [color] = topColors[0]
      suggestions.push(`Your signature color ${color} always works well`)
    }

    if (topFabrics.length > 0) {
      const [fabric] = topFabrics[0]
      suggestions.push(`${fabric} is your go-to fabric`)
    }

    if (currentPlan.occasion === 'Work') {
      suggestions.push('Professional silhouettes build confidence')
      suggestions.push('Structured pieces create authority')
    } else if (currentPlan.occasion === 'Casual') {
      suggestions.push('Comfort meets style in relaxed fits')
      suggestions.push('Mix textures for visual interest')
    } else if (currentPlan.occasion === 'Formal') {
      suggestions.push('Classic cuts never fail')
      suggestions.push('Quality over quantity shows')
    }

    return suggestions
  }

  return (
    <div className="planner">
      <div className="planner-header">
        <Link to="/dashboard" className="back-to-dashboard">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="planner-title">Weekly Planner</h1>
        <p className="planner-subtitle">Thoughtfully plan your week ahead</p>
      </div>

      <div className="planner-content">
        {/* Days Navigation */}
        <div className="days-nav">
          {DAYS_OF_WEEK.map((day, index) => (
            <button
              key={day}
              className={`day-btn ${index === selectedDay ? 'active' : ''} ${dayPlans[index].occasion ? 'planned' : ''}`}
              onClick={() => setSelectedDay(index)}
            >
              <span className="day-name">{day.slice(0, 3)}</span>
              {dayPlans[index].occasion && (
                <span className="day-indicator" />
              )}
            </button>
          ))}
        </div>

        {/* Current Day Planning */}
        <motion.div
          key={selectedDay}
          className="day-planner"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="planner-main">
            <h2 className="current-day">{currentPlan.day}</h2>

            {/* Weather Info */}
            {weather && location && (
              <div className="weather-info">
                <div className="weather-badge">
                  <span className="weather-temp">{weather.temperature}°F</span>
                  <span className="weather-location">{location}</span>
                </div>
                <p className="weather-condition">{weather.condition}</p>
              </div>
            )}

            {/* Occasion Selection */}
            <div className="planner-section">
              <label className="section-label">Occasion</label>
              <div className="occasion-pills">
                {OCCASIONS.map((occasion) => (
                  <button
                    key={occasion}
                    className={`occasion-pill ${currentPlan.occasion === occasion ? 'selected' : ''}`}
                    onClick={() => updatePlan({ occasion })}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="planner-section">
              <label className="section-label">Notes</label>
              <textarea
                className="planner-notes"
                placeholder="Any specific requirements or ideas..."
                value={currentPlan.notes}
                onChange={(e) => updatePlan({ notes: e.target.value })}
                rows={3}
              />
            </div>

            {/* Closet Quick Access */}
            {closet.length > 0 && (
              <div className="planner-section">
                <label className="section-label">From Your Closet</label>
                <div className="closet-quick">
                  {closet.slice(0, 6).map((item, index) => (
                    <div key={index} className="closet-quick-item">
                      <div className="quick-item-name">{item.name}</div>
                      <div className="quick-item-meta">
                        {item.color} · {item.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions Sidebar */}
          <div className="planner-suggestions">
            <h3 className="suggestions-title">Posha Suggests</h3>

            {getWeatherSuggestions().length > 0 && (
              <div className="suggestion-group">
                <h4 className="suggestion-category">Weather-Smart</h4>
                <ul className="suggestion-list">
                  {getWeatherSuggestions().map((suggestion, index) => (
                    <li key={index} className="suggestion-item">
                      <span className="suggestion-icon">☁️</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentPlan.occasion && getStyleSuggestions().length > 0 && (
              <div className="suggestion-group">
                <h4 className="suggestion-category">Style Wisdom</h4>
                <ul className="suggestion-list">
                  {getStyleSuggestions().map((suggestion, index) => (
                    <li key={index} className="suggestion-item">
                      <span className="suggestion-icon">✨</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="suggestion-philosophy">
              <p>
                Planning isn't about perfection—it's about intention. Give yourself permission to adapt as the week unfolds.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Planner
