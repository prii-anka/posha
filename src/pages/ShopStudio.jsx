// NEW FEATURE UPDATE – Phase 9 Overhaul
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SHOP_PRODUCTS } from '../data/shopData.js'
import { usePoshaProfile } from '../context/PoshaProfileContext.jsx'
import CompareModal from '../components/CompareModal.jsx'
import './ShopStudio.css'

function ShopStudio() {
  const { profile } = usePoshaProfile()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [compareList, setCompareList] = useState([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Get unique categories
  const categories = ['All', ...new Set(SHOP_PRODUCTS.map(p => p.category))]

  // Toggle product in compare list
  const toggleCompare = (productId) => {
    if (compareList.includes(productId)) {
      setCompareList(compareList.filter(id => id !== productId))
    } else if (compareList.length < 3) {
      setCompareList([...compareList, productId])
    }
  }

  // Detect similarity to user's style (dummy logic for now)
  const getSimilarityBadge = (product) => {
    // Check if matches style goals
    if (profile.styleGoals && profile.styleGoals.some(goal =>
      product.tags.some(tag => tag.toLowerCase().includes(goal.toLowerCase()))
    )) {
      return { text: 'Fits your vibe!', color: '#FF1694' }
    }

    // Check sustainability preference
    if (product.sustainability && profile.styleGoals?.includes('Eco')) {
      return { text: 'Eco-friendly pick!', color: '#00C896' }
    }

    return null
  }

  return (
    <div className="shop-studio">
      {/* Header */}
      <div className="shop-hero">
        <Link to="/dashboard" className="back-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Dashboard
        </Link>
        <div className="shop-hero-content">
          <h1 className="shop-title">Shop Studio</h1>
          <p className="shop-tagline">Discover conscious fashion that fits your vibe</p>
        </div>
        <div className="floating-stickers">
          <span className="sticker sticker-1">🛍️</span>
          <span className="sticker sticker-2">✨</span>
          <span className="sticker sticker-3">💕</span>
        </div>
      </div>

      {/* Search & Filters */}
      <section className="shop-controls">
        <div className="search-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by brand, fabric, or vibe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {compareList.length > 0 && (
          <motion.div
            className="compare-bar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="compare-count">
              {compareList.length} {compareList.length === 1 ? 'item' : 'items'} selected
            </span>
            <button
              className="compare-btn"
              onClick={() => setShowCompareModal(true)}
              disabled={compareList.length < 2}
            >
              Compare {compareList.length > 1 && `(${compareList.length})`}
            </button>
            <button
              className="clear-btn"
              onClick={() => setCompareList([])}
            >
              Clear
            </button>
          </motion.div>
        )}
      </section>

      {/* Pinterest Masonry Grid */}
      <section className="shop-grid-section">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No products found. Try a different search!</p>
          </div>
        ) : (
          <div className="shop-masonry-grid">
            {filteredProducts.map((product, index) => {
              const similarityBadge = getSimilarityBadge(product)
              const isInCompare = compareList.includes(product.id)

              return (
                <motion.div
                  key={product.id}
                  className={`product-card ${isInCompare ? 'in-compare' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Product Image */}
                  <div className="product-image-wrapper">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />

                    {/* Similarity Badge */}
                    {similarityBadge && (
                      <div
                        className="similarity-badge"
                        style={{ background: similarityBadge.color }}
                      >
                        {similarityBadge.text}
                      </div>
                    )}

                    {/* Compare Checkbox */}
                    <button
                      className={`compare-checkbox ${isInCompare ? 'checked' : ''}`}
                      onClick={() => toggleCompare(product.id)}
                      title={isInCompare ? 'Remove from compare' : 'Add to compare'}
                    >
                      {isInCompare ? '✓' : '+'}
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <div className="product-header">
                      <span className="product-brand">{product.brand}</span>
                      <span className="product-price">${product.price}</span>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>

                    {/* Fabric & Color */}
                    <div className="product-meta">
                      <span className="meta-item">
                        <strong>Fabric:</strong> {product.fabric}
                      </span>
                      <span className="meta-item">
                        <strong>Color:</strong> {product.color}
                      </span>
                    </div>

                    {/* Sustainability */}
                    {product.sustainability && (
                      <div className="sustainability-tag">
                        🌱 {product.sustainability}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="product-tags">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="product-tag">#{tag}</span>
                      ))}
                    </div>

                    {/* Add to Closet Button */}
                    <button className="add-to-closet-btn">
                      Add to Closet
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </section>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <CompareModal
            products={SHOP_PRODUCTS.filter(p => compareList.includes(p.id))}
            onClose={() => setShowCompareModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShopStudio
