import { motion } from 'framer-motion'
import './InsightCard.css'
import './InsightCard90s.css'

const FASHION_TRIVIA = [
  "Did you know? The little black dress was popularized by Coco Chanel in the 1920s",
  "Color psychology: Red can make you feel more confident and energetic",
  "Denim gets better with age — the natural fading creates unique patterns",
  "Layering isn't just practical — it adds visual depth and texture to any outfit",
  "Silk was once worth its weight in gold along the ancient trade routes",
  "Your wardrobe is a visual autobiography of your life's moments",
  "Linen wrinkles beautifully — it's not a flaw, it's character",
  "Fashion rule: If you feel good in it, you're wearing it right",
  "The color wheel is your secret weapon for creating harmonious outfits",
  "Vintage pieces tell stories — they're time capsules of style history",
]

function PoshaLearnCard() {
  // Duplicate the trivia array for seamless loop
  const triviaLoop = [...FASHION_TRIVIA, ...FASHION_TRIVIA]

  return (
    <motion.div
      className="editorial-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFB4D1 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Open book */}
            <path d="M-40,-20 L-40,30 Q-40,35 -35,35 L0,30 L35,35 Q40,35 40,30 L40,-20 Z" fill="#FFFAF0" stroke="#E94B7A" strokeWidth="3"/>
            <path d="M0,-20 L0,30" stroke="#E94B7A" strokeWidth="2"/>
            {/* Book pages */}
            <line x1="-30" y1="-10" x2="-10" y2="-10" stroke="#FFB4D1" strokeWidth="2"/>
            <line x1="-30" y1="0" x2="-10" y2="0" stroke="#FFB4D1" strokeWidth="2"/>
            <line x1="-30" y1="10" x2="-10" y2="10" stroke="#FFB4D1" strokeWidth="2"/>
            <line x1="10" y1="-10" x2="30" y2="-10" stroke="#FFB4D1" strokeWidth="2"/>
            <line x1="10" y1="0" x2="30" y2="0" stroke="#FFB4D1" strokeWidth="2"/>
            <line x1="10" y1="10" x2="30" y2="10" stroke="#FFB4D1" strokeWidth="2"/>
            {/* Stars/sparkles for learning */}
            <path d="M-50,-30 L-48,-25 L-53,-25 Z" fill="#FF6B9D"/>
            <path d="M50,-25 L52,-20 L47,-20 Z" fill="#E94B7A"/>
            <circle cx="-45" cy="15" r="2" fill="#FF6B9D"/>
            <circle cx="48" cy="20" r="2" fill="#E94B7A"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="magazine-header">
        <h3 className="magazine-title">Posha Learn</h3>
        <p className="magazine-subtitle">
          fashion intelligence · style wisdom · wardrobe insights
        </p>
      </div>

      <div className="editorial-content">
        {/* Main insight */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-relaxed)',
            marginBottom: 'var(--space-4)',
          }}>
            <span className="gold-accent">What Posha notices:</span>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-primary)',
                  marginTop: 'var(--space-2)',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    Color repetition
                  </p>
                  <p style={{
                    margin: 'var(--space-1) 0 0',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)',
                    fontStyle: 'italic',
                  }}>
                    Which hues you return to across different moods and occasions
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-secondary)',
                  marginTop: 'var(--space-2)',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    Context patterns
                  </p>
                  <p style={{
                    margin: 'var(--space-1) 0 0',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)',
                    fontStyle: 'italic',
                  }}>
                    How weather, mood, and occasion shape your style choices
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-tertiary)',
                  marginTop: 'var(--space-2)',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    Texture preferences
                  </p>
                  <p style={{
                    margin: 'var(--space-1) 0 0',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)',
                    fontStyle: 'italic',
                  }}>
                    The fabrics and materials that make you feel most yourself
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-primary)',
                  marginTop: 'var(--space-2)',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    Style evolution
                  </p>
                  <p style={{
                    margin: 'var(--space-1) 0 0',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)',
                    fontStyle: 'italic',
                  }}>
                    How your taste grows and shifts over seasons and years
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling marquee with fashion trivia */}
        <div className="marquee-container">
          <div className="marquee-content">
            {triviaLoop.map((trivia, index) => (
              <div key={index} className="marquee-item">
                {trivia}
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy statement */}
        <motion.div
          style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-5)',
            background: 'var(--color-bg-secondary)',
            borderLeft: '4px solid var(--color-accent-primary)',
            borderRadius: 'var(--radius-base)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p style={{
            margin: 0,
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-relaxed)',
            fontStyle: 'italic',
          }}>
            Posha never prescribes. It reflects your patterns back to you, helping you understand
            the <span className="gold-accent">"why"</span> behind what you naturally love.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PoshaLearnCard
