import './InsightCard.css'

function HowPoshaWorksCard() {
  return (
    <div className="insight-card">
      <div className="card-hero-image" style={{ background: 'linear-gradient(135deg, #FFFAF0 0%, #FFE0EB 100%)' }}>
        <svg className="hero-img" viewBox="0 0 200 120" style={{ objectFit: 'contain', padding: 'var(--space-8)' }}>
          <g transform="translate(100,60)">
            {/* Interconnected nodes */}
            <circle cx="0" cy="-25" r="12" fill="#E94B7A"/>
            <circle cx="-35" cy="10" r="10" fill="#FF6B9D" opacity="0.8"/>
            <circle cx="35" cy="10" r="10" fill="#FF6B9D" opacity="0.8"/>
            <circle cx="-20" cy="30" r="8" fill="#FFB4D1" opacity="0.7"/>
            <circle cx="20" cy="30" r="8" fill="#FFB4D1" opacity="0.7"/>
            {/* Connecting lines */}
            <line x1="0" y1="-25" x2="-35" y2="10" stroke="#6B4E71" strokeWidth="2" strokeDasharray="3,3"/>
            <line x1="0" y1="-25" x2="35" y2="10" stroke="#6B4E71" strokeWidth="2" strokeDasharray="3,3"/>
            <line x1="-35" y1="10" x2="-20" y2="30" stroke="#A67C96" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
            <line x1="35" y1="10" x2="20" y2="30" stroke="#A67C96" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
            {/* Center glow */}
            <circle cx="0" cy="-25" r="18" fill="#E94B7A" opacity="0.2"/>
            {/* Small detail circles */}
            <circle cx="-45" cy="-10" r="4" fill="#FFD1E3"/>
            <circle cx="45" cy="-10" r="4" fill="#FFD1E3"/>
          </g>
        </svg>
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header">
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="3" fill="var(--color-accent-primary)" />
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="28" cy="12" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="12" cy="28" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.5" />
            <path
              d="M20 20 Q14 14 12 12 M20 20 Q26 14 28 12 M20 20 Q14 26 12 28 M20 20 Q26 26 28 28"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle cx="20" cy="20" r="10" stroke="var(--color-accent-secondary)" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
          </svg>
        </div>
        <h3 className="insight-card-title">How Posha Works</h3>
      </div>

      <div className="insight-card-content">
        <p><strong>Pattern recognition, not prescription</strong></p>

        <div style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-accent-primary)' }}>
              1. You log naturally
            </p>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Simple outfit entries — no photos, no judgment. Just tracking what you wore and how it felt.
            </p>
          </div>

          <div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-accent-primary)' }}>
              2. Posha notices patterns
            </p>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Colors you return to. Fabrics you reach for. Occasions that bring out different sides of your style.
            </p>
          </div>

          <div>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-accent-primary)' }}>
              3. You gain insight
            </p>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Posha reflects your patterns back to you — helping you understand the "why" behind what you love.
            </p>
          </div>
        </div>

        <div className="highlight-box" style={{ marginTop: 'var(--space-6)' }}>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
            <strong>No AI stylist.</strong> No trend predictions. Just your fashion intelligence, visualized.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowPoshaWorksCard
