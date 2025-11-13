import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'

function WhyThisWorksCard() {
  const { preferences, getPersona, getColorFrequency } = usePoshaData()
  const persona = getPersona()
  const topColors = getColorFrequency()

  const hasInsights = preferences.length > 0 || topColors.length > 0

  return (
    <div className="insight-card">
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFFAF0 0%, #FFD1E3 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Light bulb */}
            <circle cx="0" cy="-20" r="25" fill="#FFD6EB" stroke="#E94B7A" strokeWidth="3"/>
            <path d="M-8,5 L-8,15 L8,15 L8,5" fill="#FF6B9D"/>
            <rect x="-6" y="15" width="12" height="8" fill="#E94B7A" rx="2"/>
            {/* Light rays */}
            <path d="M-35,-20 L-45,-20" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
            <path d="M35,-20 L45,-20" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
            <path d="M-20,-40 L-25,-50" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
            <path d="M20,-40 L25,-50" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
            <path d="M0,-45 L0,-55" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round"/>
            {/* Sparkle */}
            <circle cx="30" cy="-35" r="3" fill="#E94B7A"/>
            <circle cx="-30" cy="-10" r="2" fill="#FF6B9D"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header">
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
            <path
              d="M20 14 L20 20 L25 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 28 L15 25 M28 28 L25 25 M20 32 L20 28"
              stroke="var(--color-accent-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
        <h3 className="insight-card-title">Why This Works</h3>
      </div>

      <div className="insight-card-content">
        {hasInsights ? (
          <>
            <p>Your style works because it reflects who you are:</p>

            <div className="highlight-box">
              <strong>Style Foundation</strong>
              <p style={{ marginTop: 'var(--space-2)', marginBottom: 0, fontSize: 'var(--font-size-sm)' }}>
                As a <strong>{persona.type}</strong>, you naturally choose pieces that align with
                {persona.type === 'Minimalist' && ' timeless simplicity and refined elegance'}
                {persona.type === 'Creative' && ' bold self-expression and color variety'}
                {persona.type === 'Active' && ' comfort and functional movement'}
                {persona.type === 'Balanced' && ' versatility and adaptable style'}
                {persona.type === 'Explorer' && ' discovery and evolving preferences'}.
              </p>
            </div>

            {topColors.length > 0 && (
              <div style={{ marginTop: 'var(--space-5)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                  <strong>Color harmony:</strong> Your top colors ({topColors.slice(0, 3).map(c => c[0]).join(', ')})
                  create a cohesive palette that feels instinctively right to you.
                </p>
              </div>
            )}

            {preferences.length > 0 && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)' }}>
                  <strong>Your values guide your choices:</strong>
                </p>
                <div className="tag-list">
                  {preferences.slice(0, 4).map((pref) => (
                    <div key={pref} className="tag">{pref}</div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="insight-empty">
            <div className="insight-empty-icon">💡</div>
            <p>Set preferences and log outfits to understand what makes your style work</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WhyThisWorksCard
