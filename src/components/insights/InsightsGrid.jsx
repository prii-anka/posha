import { useState, useEffect } from 'react'
import { usePoshaProfile } from '../../context/PoshaProfileContext.jsx'
import PersonaCard from './PersonaCard.jsx'
import ColorIntelligenceCard from './ColorIntelligenceCard.jsx'
import FabricIntelligenceCard from './FabricIntelligenceCard.jsx'
import PatternBehaviorCard from './PatternBehaviorCard.jsx'
import WhyThisWorksCard from './WhyThisWorksCard.jsx'
import PoshaLearnCard from './PoshaLearnCard.jsx'
import WeeklySummaryCard from './WeeklySummaryCard.jsx'
import HowPoshaWorksCard from './HowPoshaWorksCard.jsx'
import OutfitSuggestionsCard from './OutfitSuggestionsCard.jsx'
import ClosetPreviewCard from './ClosetPreviewCard.jsx'
import { getRandomFashionFact } from '../../data/fashionEducation.js'
import './InsightsGrid.css'

// Available card types
const AVAILABLE_CARDS = [
  { id: 'closet', name: 'My Closet', pinned: true, component: ClosetPreviewCard },
  { id: 'suggestions', name: 'Outfit Suggestions', pinned: true, component: OutfitSuggestionsCard },
  { id: 'learn', name: 'Posha Learn', pinned: true, component: PoshaLearnCard },
  { id: 'persona', name: 'Style Persona', pinned: false, component: PersonaCard },
  { id: 'color', name: 'Color Intelligence', pinned: false, component: ColorIntelligenceCard },
  { id: 'fabric', name: 'Fabric Preferences', pinned: false, component: FabricIntelligenceCard },
  { id: 'pattern', name: 'Pattern Behavior', pinned: false, component: PatternBehaviorCard },
  { id: 'why', name: 'Why This Works', pinned: false, component: WhyThisWorksCard },
  { id: 'summary', name: 'Weekly Summary', pinned: false, component: WeeklySummaryCard },
  { id: 'howto', name: 'How Posha Works', pinned: false, component: HowPoshaWorksCard },
]

function InsightsGrid() {
  const { profile, updateProfile } = usePoshaProfile()
  const firstName = profile.name ? profile.name.split(' ')[0] : 'there'
  const [currentFact, setCurrentFact] = useState(getRandomFashionFact())
  const [showCardMenu, setShowCardMenu] = useState(false)

  // Get user's active cards from profile, default to pinned cards
  const [activeCards, setActiveCards] = useState(() => {
    return profile.dashboardCards || AVAILABLE_CARDS.filter(c => c.pinned).map(c => c.id)
  })

  // Get user's pinned cards from profile, default to initially pinned ones
  const [pinnedCards, setPinnedCards] = useState(() => {
    return profile.pinnedCards || AVAILABLE_CARDS.filter(c => c.pinned).map(c => c.id)
  })

  // Rotate fashion facts every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(getRandomFashionFact())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const toggleCard = (cardId) => {
    const newActiveCards = activeCards.includes(cardId)
      ? activeCards.filter(id => id !== cardId)
      : [...activeCards, cardId]

    setActiveCards(newActiveCards)
    updateProfile({ dashboardCards: newActiveCards })
  }

  const togglePin = (cardId) => {
    const newPinnedCards = pinnedCards.includes(cardId)
      ? pinnedCards.filter(id => id !== cardId)
      : [...pinnedCards, cardId]

    setPinnedCards(newPinnedCards)
    updateProfile({ pinnedCards: newPinnedCards })
  }

  const isPinned = (cardId) => {
    return pinnedCards.includes(cardId)
  }

  return (
    <div className="pinterest-dashboard">
      {/* Compact Welcome Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-greeting">Welcome back, {firstName}</h1>
          <div className="fact-ticker">
            <span className="fact-icon">💡</span>
            <p className="fact-text">{currentFact.fact}</p>
          </div>
        </div>
        <button
          className="customize-btn"
          onClick={() => setShowCardMenu(!showCardMenu)}
        >
          {showCardMenu ? '✕ Close' : '+ Customize'}
        </button>
      </div>

      {/* Card Selection Menu */}
      {showCardMenu && (
        <div className="card-selection-menu">
          <h3>Customize Your Dashboard</h3>
          <p className="menu-subtitle">Choose which cards to display and pin your favorites</p>
          <div className="card-options">
            {AVAILABLE_CARDS.map(card => (
              <div key={card.id} className="card-option-wrapper">
                <button
                  className={`card-option ${activeCards.includes(card.id) ? 'active' : ''}`}
                  onClick={() => toggleCard(card.id)}
                >
                  <span className="option-check">{activeCards.includes(card.id) ? '✓' : ''}</span>
                  <span className="option-name">{card.name}</span>
                </button>
                <button
                  className={`pin-toggle ${isPinned(card.id) ? 'pinned' : ''}`}
                  onClick={() => togglePin(card.id)}
                  title={isPinned(card.id) ? 'Unpin card' : 'Pin card'}
                >
                  📌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pinterest-style Masonry Grid */}
      <div className="masonry-grid">
        {AVAILABLE_CARDS
          .filter(card => activeCards.includes(card.id))
          .sort((a, b) => {
            // Sort pinned cards to the top
            const aIsPinned = isPinned(a.id)
            const bIsPinned = isPinned(b.id)
            if (aIsPinned && !bIsPinned) return -1
            if (!aIsPinned && bIsPinned) return 1
            return 0
          })
          .map(card => {
            const CardComponent = card.component
            const cardIsPinned = isPinned(card.id)
            return (
              <div key={card.id} className={`masonry-item ${cardIsPinned ? 'is-pinned' : ''}`}>
                {cardIsPinned && (
                  <button
                    className="card-pin-indicator"
                    onClick={() => togglePin(card.id)}
                    title="Unpin card"
                  >
                    📌
                  </button>
                )}
                <CardComponent />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default InsightsGrid
