import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'

function PatternBehaviorCard() {
  const { getOccasionPatterns, getWeatherPatterns } = usePoshaData()
  const occasions = getOccasionPatterns()
  const weather = getWeatherPatterns()

  const hasData = Object.keys(occasions).length > 0 || Object.keys(weather).length > 0

  return (
    <div className="insight-card">
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFD6EB 0%, #FFB4D1 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Bar chart */}
            <rect x="-50" y="0" width="18" height="-40" fill="#E94B7A" opacity="0.8"/>
            <rect x="-25" y="0" width="18" height="-30" fill="#FF6B9D" opacity="0.8"/>
            <rect x="0" y="0" width="18" height="-50" fill="#E94B7A" opacity="0.9"/>
            <rect x="25" y="0" width="18" height="-35" fill="#FF6B9D" opacity="0.8"/>
            {/* Trend line */}
            <path d="M-50,-35 L-25,-25 L0,-45 L25,-30 L50,-40" stroke="#2D1B2E" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
            {/* Data points */}
            <circle cx="-50" cy="-35" r="4" fill="#2D1B2E"/>
            <circle cx="-25" cy="-25" r="4" fill="#2D1B2E"/>
            <circle cx="0" cy="-45" r="4" fill="#2D1B2E"/>
            <circle cx="25" cy="-30" r="4" fill="#2D1B2E"/>
            {/* Axis */}
            <line x1="-60" y1="5" x2="60" y2="5" stroke="#6B4E71" strokeWidth="2"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header">
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="10" cy="15" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="30" cy="15" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="10" cy="25" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="30" cy="25" r="2" fill="currentColor" opacity="0.6" />
            <path
              d="M20 20 L10 15 M20 20 L30 15 M20 20 L10 25 M20 20 L30 25"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.4"
            />
          </svg>
        </div>
        <h3 className="insight-card-title">Pattern Behavior</h3>
      </div>

      <div className="insight-card-content">
        {hasData ? (
          <>
            {Object.keys(occasions).length > 0 && (
              <>
                <p><strong>Occasion patterns:</strong></p>
                <div className="insight-data">
                  {Object.entries(occasions)
                    .sort((a, b) => b[1] - a[1])
                    .map(([occasion, count]) => (
                      <div key={occasion} className="data-row">
                        <div className="data-label">{occasion}</div>
                        <div className="data-value">{count}×</div>
                      </div>
                    ))}
                </div>
              </>
            )}

            {Object.keys(weather).length > 0 && (
              <>
                <p style={{ marginTop: 'var(--space-5)' }}><strong>Weather patterns:</strong></p>
                <div className="tag-list">
                  {Object.entries(weather)
                    .sort((a, b) => b[1] - a[1])
                    .map(([condition, count]) => (
                      <div key={condition} className="tag">
                        {condition} ({count})
                      </div>
                    ))}
                </div>
              </>
            )}

            <p style={{ marginTop: 'var(--space-5)', fontSize: 'var(--font-size-sm)' }}>
              These patterns help Posha understand your context-based style choices.
            </p>
          </>
        ) : (
          <div className="insight-empty">
            <div className="insight-empty-icon">📊</div>
            <p>Keep logging outfits to uncover behavioral patterns</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatternBehaviorCard
