// NEW FEATURE UPDATE – Phase 9 Overhaul
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FABRICS_DATA, COLOR_THEORY_DATA, STYLE_MYTHS, SUSTAINABILITY_TIPS } from '../data/educationData.js'
import { FASHION_LESSONS, getLessonsByLevel } from '../data/fashionEducation.js'
import { usePoshaProfile } from '../context/PoshaProfileContext.jsx'
import './LearnStudio.css'

function LearnStudio() {
  const { profile, updateProfile } = usePoshaProfile()
  const [selectedFabric, setSelectedFabric] = useState(null)
  const [colorSlide, setColorSlide] = useState(0)
  const [flippedMyth, setFlippedMyth] = useState(null)
  const [savedItems, setSavedItems] = useState(profile.savedLearnCards || [])
  const [selectedLevel, setSelectedLevel] = useState('beginner')
  const [expandedLesson, setExpandedLesson] = useState(null)

  const toggleSave = (id, type) => {
    const itemKey = `${type}-${id}`
    const newSaved = savedItems.includes(itemKey)
      ? savedItems.filter(item => item !== itemKey)
      : [...savedItems, itemKey]

    setSavedItems(newSaved)
    updateProfile({ savedLearnCards: newSaved })
  }

  const isSaved = (id, type) => savedItems.includes(`${type}-${id}`)

  return (
    <div className="learn-studio">
      {/* Header */}
      <div className="learn-hero">
        <div className="learn-hero-content">
          <Link to="/dashboard" className="back-link">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="learn-title">Learn Studio</h1>
          <p className="learn-tagline">Master the art of dressing with intention</p>
        </div>
        <div className="floating-stickers">
          <span className="sticker sticker-1">✨</span>
          <span className="sticker sticker-2">🎨</span>
          <span className="sticker sticker-3">🪡</span>
        </div>
      </div>

      {/* Fashion Education Lessons - Beginner to Advanced */}
      <section className="learn-section lessons-section">
        <h2 className="section-title">Fashion Education Journey</h2>
        <p className="section-subtitle">From basics to advanced — your complete style education</p>

        {/* Level Tabs */}
        <div className="level-tabs">
          <button
            className={`level-tab ${selectedLevel === 'beginner' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('beginner')}
          >
            <span className="tab-icon">🌱</span>
            <span className="tab-label">Beginner</span>
            <span className="tab-count">{FASHION_LESSONS.beginner.length} lessons</span>
          </button>
          <button
            className={`level-tab ${selectedLevel === 'intermediate' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('intermediate')}
          >
            <span className="tab-icon">🌿</span>
            <span className="tab-label">Intermediate</span>
            <span className="tab-count">{FASHION_LESSONS.intermediate.length} lessons</span>
          </button>
          <button
            className={`level-tab ${selectedLevel === 'advanced' ? 'active' : ''}`}
            onClick={() => setSelectedLevel('advanced')}
          >
            <span className="tab-icon">🌳</span>
            <span className="tab-label">Advanced</span>
            <span className="tab-count">{FASHION_LESSONS.advanced.length} lessons</span>
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="lessons-grid">
          {getLessonsByLevel(selectedLevel).map((lesson) => (
            <motion.div
              key={lesson.id}
              className={`lesson-card ${expandedLesson === lesson.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="lesson-header">
                <div className="lesson-title-row">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <button
                    className={`bookmark-btn lesson-bookmark ${isSaved(lesson.id, 'lesson') ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(lesson.id, 'lesson')
                    }}
                  >
                    {isSaved(lesson.id, 'lesson') ? '🔖' : '📌'}
                  </button>
                </div>
                <div className="lesson-meta">
                  <span className="lesson-duration">⏱️ {lesson.duration}</span>
                  <span className="lesson-level-badge">{selectedLevel}</span>
                </div>
              </div>

              <p className="lesson-description">{lesson.description}</p>

              <button
                className="expand-lesson-btn"
                onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
              >
                {expandedLesson === lesson.id ? 'Show Less ▲' : 'View Topics ▼'}
              </button>

              <AnimatePresence>
                {expandedLesson === lesson.id && (
                  <motion.div
                    className="lesson-topics"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h4>What you'll learn:</h4>
                    <ul>
                      {lesson.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                    <button className="start-lesson-btn">
                      Start Learning →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fabrics 101 */}
      <section className="learn-section fabrics-section">
        <h2 className="section-title">Fabrics 101</h2>
        <p className="section-subtitle">Know your textiles. Feel the difference.</p>

        <div className="fabrics-grid">
          {FABRICS_DATA.map((fabric) => (
            <motion.div
              key={fabric.id}
              className={`fabric-card ${selectedFabric === fabric.id ? 'expanded' : ''}`}
              onClick={() => setSelectedFabric(selectedFabric === fabric.id ? null : fabric.id)}
              whileHover={{ y: -8, rotate: selectedFabric === fabric.id ? 0 : 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="fabric-image-wrapper">
                <img src={fabric.image} alt={fabric.name} className="fabric-image" />
                <div className="fabric-overlay"></div>
                <button
                  className={`bookmark-btn ${isSaved(fabric.id, 'fabric') ? 'saved' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSave(fabric.id, 'fabric')
                  }}
                >
                  {isSaved(fabric.id, 'fabric') ? '🔖' : '📌'}
                </button>
              </div>
              <div className="fabric-content">
                <div className="fabric-header">
                  <span className="fabric-emoji">{fabric.emoji}</span>
                  <h3 className="fabric-name">{fabric.name}</h3>
                </div>
                <span className="fabric-badge">
                  {fabric.badge}
                </span>
                <p className="fabric-desc">{fabric.description}</p>

                {/* Best Colors */}
                <div className="fabric-colors">
                  <strong>Best Colors:</strong>
                  <div className="color-pills">
                    {fabric.bestColors.map((color, i) => (
                      <span key={i} className="color-pill">{color}</span>
                    ))}
                  </div>
                </div>

                {/* Care Tip */}
                <div className="fabric-care-tip">
                  <span className="tip-emoji">💡</span>
                  <strong>Care Tip:</strong> {fabric.careTip}
                </div>

                <AnimatePresence>
                  {selectedFabric === fabric.id && (
                    <motion.div
                      className="fabric-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="fabric-facts">
                        <strong>Quick Facts:</strong>
                        <ul>
                          {fabric.facts.map((fact, i) => (
                            <li key={i}>{fact}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="fabric-care">
                        <strong>Care:</strong> {fabric.care}
                      </div>
                      <div className="fabric-sustainability">
                        <strong>Sustainability:</strong> {fabric.sustainability}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Color Theory */}
      <section className="learn-section color-section">
        <h2 className="section-title">Color Theory</h2>
        <p className="section-subtitle">The secret language of style</p>

        <div className="color-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={colorSlide}
              className="color-slide"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="color-card polaroid">
                <div className="polaroid-image">
                  <img src={COLOR_THEORY_DATA[colorSlide].image} alt={COLOR_THEORY_DATA[colorSlide].name} />
                  <div className="image-text-overlay">
                    <h3 className="overlay-title">{COLOR_THEORY_DATA[colorSlide].name}</h3>
                    <p className="overlay-examples">{COLOR_THEORY_DATA[colorSlide].examples.join(' • ')}</p>
                    <p className="overlay-description">{COLOR_THEORY_DATA[colorSlide].description}</p>
                    <p className="overlay-tip">{COLOR_THEORY_DATA[colorSlide].tip}</p>
                    <p className="overlay-vibe">✨ {COLOR_THEORY_DATA[colorSlide].vibe}</p>
                  </div>
                  <button
                    className={`bookmark-btn polaroid-bookmark ${isSaved(COLOR_THEORY_DATA[colorSlide].id, 'color') ? 'saved' : ''}`}
                    onClick={() => toggleSave(COLOR_THEORY_DATA[colorSlide].id, 'color')}
                  >
                    {isSaved(COLOR_THEORY_DATA[colorSlide].id, 'color') ? '🔖' : '📌'}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button
              onClick={() => setColorSlide((colorSlide - 1 + COLOR_THEORY_DATA.length) % COLOR_THEORY_DATA.length)}
              className="carousel-btn"
            >
              ←
            </button>
            <div className="carousel-dots">
              {COLOR_THEORY_DATA.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === colorSlide ? 'active' : ''}`}
                  onClick={() => setColorSlide(i)}
                />
              ))}
            </div>
            <button
              onClick={() => setColorSlide((colorSlide + 1) % COLOR_THEORY_DATA.length)}
              className="carousel-btn"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Style Myths */}
      <section className="learn-section myths-section">
        <h2 className="section-title">Style Myths & Facts</h2>
        <p className="section-subtitle">Let's bust some outdated "rules"</p>

        <div className="myths-grid">
          {STYLE_MYTHS.map((item) => (
            <motion.div
              key={item.id}
              className={`myth-card ${flippedMyth === item.id ? 'flipped' : ''}`}
              onClick={() => setFlippedMyth(flippedMyth === item.id ? null : item.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="myth-card-inner">
                <div className="myth-front">
                  <span className="myth-icon">{item.icon}</span>
                  <h3>Myth:</h3>
                  <p>{item.myth}</p>
                  <span className="flip-hint">Tap to reveal truth →</span>
                </div>
                <div className="myth-back">
                  <h3>Truth:</h3>
                  <p>{item.truth}</p>
                  <button
                    className={`bookmark-btn myth-bookmark ${isSaved(item.id, 'myth') ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(item.id, 'myth')
                    }}
                  >
                    {isSaved(item.id, 'myth') ? '🔖' : '📌'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="learn-section sustainability-section">
        <h2 className="section-title">Care & Sustainability</h2>
        <p className="section-subtitle">Small changes, big impact</p>

        <div className="sustainability-feed">
          {SUSTAINABILITY_TIPS.map((tip) => (
            <motion.div
              key={tip.id}
              className="sustainability-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="tip-icon">{tip.icon}</span>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p className="tip-fact">{tip.fact}</p>
                <p className="tip-action"><strong>What you can do:</strong> {tip.action}</p>
              </div>
              <button
                className={`bookmark-btn tip-bookmark ${isSaved(tip.id, 'tip') ? 'saved' : ''}`}
                onClick={() => toggleSave(tip.id, 'tip')}
              >
                {isSaved(tip.id, 'tip') ? '🔖' : '📌'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LearnStudio
