// NEW FEATURE UPDATE – Phase 9 Overhaul
import { motion } from 'framer-motion'
import './CompareModal.css'

function CompareModal({ products, onClose }) {
  if (!products || products.length === 0) return null

  const compareFields = [
    { key: 'price', label: 'Price', format: (val) => `$${val}` },
    { key: 'fabric', label: 'Fabric' },
    { key: 'color', label: 'Color' },
    { key: 'sustainability', label: 'Sustainability' },
    { key: 'category', label: 'Category' },
  ]

  return (
    <motion.div
      className="compare-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="compare-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="compare-modal-header">
          <h2 className="compare-modal-title">Compare Products</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Products Grid */}
        <div className="compare-grid">
          {/* Product Cards */}
          <div className="compare-products-row">
            {products.map((product) => (
              <div key={product.id} className="compare-product-card">
                <div className="compare-product-image-wrapper">
                  <img src={product.imageUrl} alt={product.name} className="compare-product-image" />
                </div>
                <div className="compare-product-info">
                  <span className="compare-product-brand">{product.brand}</span>
                  <h3 className="compare-product-name">{product.name}</h3>
                  <p className="compare-product-desc">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="comparison-table">
            {compareFields.map((field) => (
              <div key={field.key} className="comparison-row">
                <div className="comparison-label">{field.label}</div>
                <div className="comparison-values">
                  {products.map((product) => (
                    <div key={product.id} className="comparison-value">
                      {field.format
                        ? field.format(product[field.key])
                        : product[field.key] || 'N/A'}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Tags Comparison */}
            <div className="comparison-row">
              <div className="comparison-label">Vibe Tags</div>
              <div className="comparison-values">
                {products.map((product) => (
                  <div key={product.id} className="comparison-value">
                    <div className="compare-tags">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="compare-tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="compare-actions">
            {products.map((product) => (
              <button key={product.id} className="compare-add-btn">
                Add to Closet
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CompareModal
