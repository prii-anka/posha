import { useNavigate } from 'react-router-dom'
import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import './InsightCard.css'

function ClosetPreviewCard() {
  const navigate = useNavigate()
  const { closet } = usePoshaData()

  // Get recent items (items with images first, up to 8)
  const recentItems = [...closet]
    .sort((a, b) => {
      // Prioritize items with images
      const aHasImage = typeof a === 'object' && a.image
      const bHasImage = typeof b === 'object' && b.image
      if (aHasImage && !bHasImage) return -1
      if (!aHasImage && bHasImage) return 1
      return 0
    })
    .slice(0, 8)

  return (
    <div className="insight-card insight-card-hero closet-preview-card">
      <div className="insight-card-header">
        <div>
          <h2 className="insight-card-title">My Closet</h2>
          <p className="insight-card-subtitle">
            Your digital wardrobe • {closet.length} item{closet.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          className="view-closet-btn"
          onClick={() => navigate('/closet')}
        >
          View All
        </button>
      </div>

      {closet.length > 0 ? (
        <div className="closet-preview-grid">
          {recentItems.map((item, index) => {
            const isImageItem = typeof item === 'object' && item.image

            if (isImageItem) {
              return (
                <div
                  key={item.id || index}
                  className="closet-preview-item"
                  onClick={() => navigate('/closet')}
                  title={item.name}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="closet-preview-image"
                  />
                  <div className="closet-preview-overlay">
                    <span className="closet-preview-name">{item.name}</span>
                    {item.category && (
                      <span className="closet-preview-category">{item.category}</span>
                    )}
                  </div>
                </div>
              )
            }

            // Legacy text items or objects without images
            const itemText = typeof item === 'string' ? item : (item.name || 'Item')
            const categoryEmoji = item.category === 'Tops' ? '👕' :
                                 item.category === 'Bottoms' ? '👖' :
                                 item.category === 'Dresses' ? '👗' :
                                 item.category === 'Outerwear' ? '🧥' :
                                 item.category === 'Shoes' ? '👟' :
                                 item.category === 'Accessories' ? '👜' : '👕'

            return (
              <div
                key={index}
                className="closet-preview-item closet-preview-text"
                onClick={() => navigate('/closet')}
                title={itemText}
              >
                <div className="closet-preview-text-content">
                  <div className="text-item-icon">{categoryEmoji}</div>
                  <div className="text-item-label">{itemText}</div>
                  {item.color && <div className="text-item-color">{item.color}</div>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="closet-preview-empty">
          <div className="empty-icon">👗</div>
          <h3>Start Building Your Wardrobe</h3>
          <p>Add your first clothing item to unlock personalized outfit suggestions</p>
          <button
            className="add-first-item-btn"
            onClick={() => navigate('/closet')}
          >
            Add First Item
          </button>
        </div>
      )}

      {closet.length > 8 && (
        <div className="closet-preview-footer">
          <button
            className="view-more-btn"
            onClick={() => navigate('/closet')}
          >
            View All {closet.length} Items →
          </button>
        </div>
      )}
    </div>
  )
}

export default ClosetPreviewCard
