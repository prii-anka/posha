import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'

function PersonaCard() {
  const { getPersona, outfits } = usePoshaData()
  const persona = getPersona()

  return (
    <div className="insight-card persona-card">
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFE0EB 0%, #FFD6EB 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Person silhouette */}
            <circle cx="0" cy="-30" r="15" fill="#E94B7A"/>
            <path d="M-20,0 Q-20,-15 0,-15 Q20,-15 20,0 L20,30 Q20,35 15,35 L-15,35 Q-20,35 -20,30 Z" fill="#FF6B9D"/>
            {/* Arms */}
            <path d="M-20,0 L-35,15" stroke="#E94B7A" strokeWidth="4" strokeLinecap="round"/>
            <path d="M20,0 L35,15" stroke="#E94B7A" strokeWidth="4" strokeLinecap="round"/>
            {/* Fashion details */}
            <circle cx="-25" cy="-10" r="3" fill="#FFB4D1"/>
            <circle cx="25" cy="-10" r="3" fill="#FFB4D1"/>
            <path d="M-5,-15 L5,-15" stroke="#2D1B2E" strokeWidth="2"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header" style={{ position: 'relative', zIndex: 1 }}>
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
            <path
              d="M10 35 Q10 22 20 22 Q30 22 30 35"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <h3 className="insight-card-title">Your Style Persona</h3>
      </div>

      <div className="insight-card-content" style={{ position: 'relative', zIndex: 1 }}>
        {outfits.length > 0 ? (
          <>
            <div className="highlight-box">
              <strong>{persona.type}</strong>
              <p style={{ marginTop: 'var(--space-2)', marginBottom: 0 }}>
                {persona.description}
              </p>
            </div>
            <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)' }}>
              Based on {outfits.length} logged outfit{outfits.length !== 1 ? 's' : ''}.
              Posha learns more about you with every entry.
            </p>
          </>
        ) : (
          <div className="insight-empty">
            <div className="insight-empty-icon">✨</div>
            <p>Log a few outfits to discover your style persona</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonaCard
