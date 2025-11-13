import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'
import './InsightCard90s.css'

const COLOR_MAP = {
  Coral: '#FF6B6B',
  Olive: '#95B46A',
  Gold: '#D4AF67',
  Lavender: '#B8A7C9',
  Blush: '#E8B4B8',
  Navy: '#2C3E50',
  Cream: '#FAF7F2',
  Rose: '#C9818F',
  Slate: '#707D88',
  Ink: '#2C2C2C',
  Mauve: '#9966CC',
  Sage: '#9AB3A1',
  Terracotta: '#CC6666',
  Denim: '#566C8C',
}

const ROTATING_PHRASES = [
  'your week in hues',
  'palette diary',
  'color story',
  'chromatic rhythm',
  'tonal signature',
]

function ColorIntelligenceCard() {
  const { getColorFrequency } = usePoshaData()
  const topColors = getColorFrequency()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [currentChip, setCurrentChip] = useState(0)

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % ROTATING_PHRASES.length)
    }, 3000)

    return () => clearInterval(phraseInterval)
  }, [])

  useEffect(() => {
    if (topColors.length > 0) {
      const chipInterval = setInterval(() => {
        setCurrentChip(prev => (prev + 1) % topColors.length)
      }, 2500)

      return () => clearInterval(chipInterval)
    }
  }, [topColors.length])

  return (
    <motion.div
      className="editorial-card ripped"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE0EB 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Paint palette */}
            <ellipse cx="0" cy="0" rx="50" ry="35" fill="#FFFAF0" stroke="#E94B7A" strokeWidth="3"/>
            {/* Thumb hole */}
            <ellipse cx="35" cy="0" rx="8" ry="12" fill="#FFF5F7"/>
            {/* Color swatches */}
            <circle cx="-25" cy="-10" r="8" fill="#FF6B9D"/>
            <circle cx="0" cy="-15" r="8" fill="#E94B7A"/>
            <circle cx="-10" cy="8" r="8" fill="#FFB4D1"/>
            <circle cx="10" cy="8" r="8" fill="#FF8CAB"/>
            {/* Brush */}
            <g transform="translate(-60,-20) rotate(-45)">
              <rect x="0" y="0" width="4" height="30" fill="#6B4E71"/>
              <path d="M-2,30 L6,30 L4,40 L0,40 Z" fill="#E94B7A"/>
            </g>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="magazine-header">
        <h3 className="magazine-title">Color Intelligence</h3>
        <motion.p
          className="magazine-subtitle"
          key={phraseIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          {ROTATING_PHRASES[phraseIndex]}
        </motion.p>
      </div>

      <div className="editorial-content">
        {/* Scribble accent */}
        <svg className="scribble-accent top-right" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="var(--color-accent-primary)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>

        {topColors.length > 0 ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                <span className="gold-accent">Featured Hues</span> — The colors that define your recent choices
              </p>

              {/* Rotating Color Chips */}
              <div className="rotating-chips" style={{ justifyContent: 'center', marginTop: 'var(--space-6)' }}>
                <AnimatePresence mode="wait">
                  {topColors.slice(0, 3).map(([color, count], index) => (
                    <motion.div
                      key={`${color}-${index}`}
                      className="color-chip"
                      style={{ backgroundColor: COLOR_MAP[color] || '#999' }}
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{
                        rotateY: index === currentChip % 3 ? 0 : -15,
                        opacity: 1,
                        scale: index === currentChip % 3 ? 1.1 : 1,
                        zIndex: index === currentChip % 3 ? 10 : 1,
                      }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                    >
                      <div style={{
                        position: 'absolute',
                        bottom: 'var(--space-2)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: 'var(--space-1) var(--space-3)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}>
                        {color}
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: 'var(--space-2)',
                        right: 'var(--space-2)',
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: 'var(--space-1) var(--space-2)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                      }}>
                        ×{count}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Full color list */}
            <div style={{ marginTop: 'var(--space-8)' }}>
              <p style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 'var(--space-3)',
              }}>
                Your Chromatic Breakdown:
              </p>
              <div className="insight-data">
                {topColors.map(([color, count]) => (
                  <motion.div
                    key={color}
                    className="data-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="data-label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: COLOR_MAP[color] || '#999',
                          border: '2px solid var(--color-bg-primary)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                      <span className="drawn-underline">{color}</span>
                    </div>
                    <div className="data-value gold-accent">{count}×</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <p style={{
              marginTop: 'var(--space-6)',
              fontSize: 'var(--font-size-sm)',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              borderLeft: '3px solid var(--color-accent-primary)',
              paddingLeft: 'var(--space-4)',
            }}>
              "Color is the keyboard, the eyes are the harmonies, the soul is the piano with many strings."
              <span style={{ display: 'block', marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
                — Wassily Kandinsky
              </span>
            </p>
          </>
        ) : (
          <div className="insight-empty">
            <div className="insight-empty-icon">🎨</div>
            <p>Start tracking colors in your outfits to see your palette emerge</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ColorIntelligenceCard
