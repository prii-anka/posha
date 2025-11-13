import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'

function WeeklySummaryCard() {
  const { getWeeklySummary } = usePoshaData()
  const summary = getWeeklySummary()

  return (
    <div className="insight-card">
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFE0EB 0%, #FFD1E3 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Calendar */}
            <rect x="-50" y="-40" width="100" height="80" fill="#FFFAF0" stroke="#E94B7A" strokeWidth="3" rx="5"/>
            {/* Header */}
            <rect x="-50" y="-40" width="100" height="20" fill="#E94B7A" rx="5"/>
            {/* Rings */}
            <circle cx="-30" cy="-30" r="3" fill="#FFFAF0"/>
            <circle cx="0" cy="-30" r="3" fill="#FFFAF0"/>
            <circle cx="30" cy="-30" r="3" fill="#FFFAF0"/>
            {/* Calendar grid */}
            <g opacity="0.5">
              <line x1="-35" y1="-10" x2="35" y2="-10" stroke="#E94B7A" strokeWidth="1"/>
              <line x1="-35" y1="5" x2="35" y2="5" stroke="#E94B7A" strokeWidth="1"/>
              <line x1="-35" y1="20" x2="35" y2="20" stroke="#E94B7A" strokeWidth="1"/>
            </g>
            {/* Highlighted days */}
            <circle cx="-20" cy="-20" r="5" fill="#FF6B9D"/>
            <circle cx="0" cy="-5" r="5" fill="#FFB4D1"/>
            <circle cx="20" cy="10" r="5" fill="#FF6B9D"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header">
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="10" width="24" height="26" rx="2" stroke="currentColor" strokeWidth="2" />
            <line x1="8" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2" />
            <circle cx="15" cy="23" r="2" fill="var(--color-accent-primary)" opacity="0.6" />
            <circle cx="20" cy="23" r="2" fill="var(--color-accent-primary)" opacity="0.6" />
            <circle cx="25" cy="23" r="2" fill="var(--color-accent-secondary)" opacity="0.6" />
          </svg>
        </div>
        <h3 className="insight-card-title">Weekly Summary</h3>
      </div>

      <div className="insight-card-content">
        {summary.count > 0 ? (
          <>
            <p><strong>Last 7 days:</strong></p>

            <div className="insight-data">
              <div className="data-row">
                <div className="data-label">Outfits logged</div>
                <div className="data-value">{summary.count}</div>
              </div>
              <div className="data-row">
                <div className="data-label">Top occasion</div>
                <div className="data-value">{summary.topOccasion}</div>
              </div>
            </div>

            {summary.topColors.length > 0 && (
              <div style={{ marginTop: 'var(--space-5)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                  <strong>Colors this week:</strong>
                </p>
                <div className="tag-list">
                  {summary.topColors.slice(0, 5).map(([color, count]) => (
                    <div key={color} className="tag">
                      {color} ({count})
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="highlight-box" style={{ marginTop: 'var(--space-5)' }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                {summary.count < 3 && "Keep logging to see stronger weekly patterns."}
                {summary.count >= 3 && summary.count < 5 && "Good consistency! A few more entries will reveal deeper insights."}
                {summary.count >= 5 && "Excellent tracking! Posha is learning your weekly rhythms."}
              </p>
            </div>
          </>
        ) : (
          <div className="insight-empty">
            <div className="insight-empty-icon">📅</div>
            <p>No outfits logged this week yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeeklySummaryCard
