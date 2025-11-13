import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'

function FabricIntelligenceCard() {
  const { getFabricPreferences } = usePoshaData()
  const fabrics = getFabricPreferences()

  return (
    <div className="insight-card">
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFFAF0 0%, #FFE0EB 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Fabric swatches */}
            <rect x="-60" y="-35" width="40" height="50" fill="#FFB4D1" stroke="#E94B7A" strokeWidth="2" rx="3"/>
            <rect x="-10" y="-35" width="40" height="50" fill="#FF6B9D" stroke="#E94B7A" strokeWidth="2" rx="3"/>
            <rect x="20" y="-35" width="40" height="50" fill="#E94B7A" stroke="#6B4E71" strokeWidth="2" rx="3"/>
            {/* Texture lines */}
            <g opacity="0.3">
              <line x1="-55" y1="-30" x2="-25" y2="-30" stroke="#2D1B2E" strokeWidth="1"/>
              <line x1="-55" y1="-20" x2="-25" y2="-20" stroke="#2D1B2E" strokeWidth="1"/>
              <line x1="-5" y1="-30" x2="25" y2="-30" stroke="#FFF" strokeWidth="1"/>
              <line x1="-5" y1="-20" x2="25" y2="-20" stroke="#FFF" strokeWidth="1"/>
            </g>
            {/* Thread spool */}
            <ellipse cx="-35" cy="30" rx="8" ry="4" fill="#8C4068"/>
            <rect x="-40" y="20" width="10" height="10" fill="#A67C96"/>
            <ellipse cx="-35" cy="20" rx="8" ry="4" fill="#8C4068"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header">
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 10 Q15 8 20 10 Q25 12 30 10 L30 30 Q25 28 20 30 Q15 32 10 30 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line x1="10" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="10" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
        <h3 className="insight-card-title">Fabric Intelligence</h3>
      </div>

      <div className="insight-card-content">
        {fabrics.length > 0 ? (
          <>
            <p>Your fabric preferences:</p>
            <div className="tag-list">
              {fabrics.map(([fabric, count]) => (
                <div key={fabric} className="tag">
                  {fabric} ({count})
                </div>
              ))}
            </div>
            <div className="highlight-box" style={{ marginTop: 'var(--space-5)' }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                <strong>Insight:</strong> You gravitate toward {fabrics[0]?.[0]?.toLowerCase()} fabrics.
                This often indicates a preference for {
                  ['Cotton', 'Linen'].includes(fabrics[0]?.[0]) ? 'breathability and comfort' :
                  ['Silk', 'Satin'].includes(fabrics[0]?.[0]) ? 'elegance and texture' :
                  'versatile, everyday wear'
                }.
              </p>
            </div>
          </>
        ) : (
          <div className="insight-empty">
            <div className="insight-empty-icon">🧵</div>
            <p>Track fabric choices to understand your material preferences</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FabricIntelligenceCard
