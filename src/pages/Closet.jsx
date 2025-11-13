import { useState } from 'react'
import { usePoshaData } from '../context/PoshaDataContext.jsx'
import { usePoshaProfile } from '../context/PoshaProfileContext.jsx'
import { CLOTHING_LIBRARY, CATEGORY_LABELS, getCategoryItems } from '../data/clothingLibrary.js'
import { SAMPLE_CLOSET } from '../data/dummyData.js'
import './Closet.css'

function Closet() {
  const { closet, addClosetItemWithImage, removeClosetItem, updateClosetItem, setCloset } = usePoshaData()
  const { profile } = usePoshaProfile()
  const [isAdding, setIsAdding] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [libraryCategory, setLibraryCategory] = useState('tops')
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    color: '',
    fabric: '',
    image: null,
    imagePreview: null
  })
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterColor, setFilterColor] = useState('all')
  const [filterFabric, setFilterFabric] = useState('all')
  const [editingItem, setEditingItem] = useState(null)

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories']
  const colors = ['Black', 'White', 'Gray', 'Beige', 'Brown', 'Blue', 'Pink', 'Red', 'Green', 'Yellow', 'Purple', 'Navy', 'Coral', 'Gold', 'Rose', 'Olive', 'Lavender', 'Other']
  const fabrics = ['Cotton', 'Linen', 'Silk', 'Wool', 'Denim', 'Leather', 'Polyester', 'Cashmere', 'Other']

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewItem(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectFromLibrary = (itemName, itemImage, itemCategory) => {
    // Map library categories to closet categories
    const categoryMap = {
      'tops': 'Tops',
      'bottoms': 'Bottoms',
      'dresses': 'Dresses',
      'outerwear': 'Outerwear',
      'shoes': 'Shoes',
      'accessories': 'Accessories'
    }

    setNewItem(prev => ({
      ...prev,
      name: itemName,
      category: categoryMap[itemCategory] || 'Tops',
      imagePreview: itemImage
    }))
    setShowLibrary(false)
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    if (newItem.name && newItem.category && newItem.imagePreview) {
      const itemData = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        color: newItem.color,
        fabric: newItem.fabric,
        image: newItem.imagePreview,
        addedAt: new Date().toISOString()
      }
      addClosetItemWithImage(itemData)

      // Reset form
      setNewItem({
        name: '',
        category: '',
        color: '',
        fabric: '',
        image: null,
        imagePreview: null
      })
      setIsAdding(false)
    }
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setNewItem({
      name: item.name,
      category: item.category,
      color: item.color || '',
      fabric: item.fabric || '',
      image: null,
      imagePreview: item.image
    })
    setIsAdding(true)
  }

  const handleUpdateItem = (e) => {
    e.preventDefault()
    if (newItem.name && newItem.category && newItem.imagePreview) {
      updateClosetItem(editingItem.id, {
        name: newItem.name,
        category: newItem.category,
        color: newItem.color,
        fabric: newItem.fabric,
        image: newItem.imagePreview
      })

      // Reset form
      setNewItem({
        name: '',
        category: '',
        color: '',
        fabric: '',
        image: null,
        imagePreview: null
      })
      setEditingItem(null)
      setIsAdding(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setNewItem({
      name: '',
      category: '',
      color: '',
      fabric: '',
      image: null,
      imagePreview: null
    })
    setIsAdding(false)
  }

  const filteredItems = closet.filter(item => {
    if (typeof item !== 'object') return false // Only show object items with images

    // Category filter
    if (filterCategory !== 'all' && item.category !== filterCategory) return false

    // Color filter
    if (filterColor !== 'all' && item.color !== filterColor) return false

    // Fabric filter
    if (filterFabric !== 'all' && item.fabric !== filterFabric) return false

    return true
  })

  const getItemCount = (category) => {
    const objectItems = closet.filter(item => typeof item === 'object')
    if (category === 'all') return objectItems.length
    return objectItems.filter(item => item.category === category).length
  }

  const getUniqueColors = () => {
    const objectItems = closet.filter(item => typeof item === 'object' && item.color)
    const uniqueColors = [...new Set(objectItems.map(item => item.color))]
    return uniqueColors.sort()
  }

  const getUniqueFabrics = () => {
    const objectItems = closet.filter(item => typeof item === 'object' && item.fabric)
    const uniqueFabrics = [...new Set(objectItems.map(item => item.fabric))]
    return uniqueFabrics.sort()
  }

  const handleResetToSampleData = () => {
    if (window.confirm('Reset closet to sample data? This will replace all current items.')) {
      setCloset(SAMPLE_CLOSET)
      window.location.reload()
    }
  }

  return (
    <div className="closet-page">
      <div className="closet-container">
        <div className="closet-header">
          <div>
            <h1 className="closet-title">My Closet</h1>
            <p className="closet-subtitle">
              Your personalized wardrobe • {closet.length} item{closet.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="add-item-btn"
              style={{ background: '#6B7280' }}
              onClick={handleResetToSampleData}
              title="Reset to sample data (25 items)"
            >
              🔄 Reset
            </button>
            <button
              className="add-item-btn"
              onClick={() => {
                if (isAdding) {
                  handleCancelEdit()
                } else {
                  setIsAdding(true)
                }
              }}
            >
              {isAdding ? '✕ Cancel' : '+ Add Item'}
            </button>
          </div>
        </div>

        {/* Add/Edit Item Form */}
        {isAdding && (
          <div className="add-item-form-container">
            <h2 className="form-title">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="add-item-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Item Name *</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Blue denim jacket"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Primary Color</label>
                  <select
                    value={newItem.color}
                    onChange={(e) => setNewItem(prev => ({ ...prev, color: e.target.value }))}
                  >
                    <option value="">Select color</option>
                    {colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Fabric</label>
                  <select
                    value={newItem.fabric}
                    onChange={(e) => setNewItem(prev => ({ ...prev, fabric: e.target.value }))}
                  >
                    <option value="">Select fabric</option>
                    {fabrics.map(fabric => (
                      <option key={fabric} value={fabric}>{fabric}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Upload Image *</label>
                <div className="image-upload-options">
                  <button
                    type="button"
                    className="library-btn"
                    onClick={() => setShowLibrary(!showLibrary)}
                  >
                    {showLibrary ? '📷 Upload Your Own' : '🎨 Choose from Library'}
                  </button>
                </div>

                {showLibrary ? (
                  <div className="clothing-library">
                    <div className="library-categories">
                      {Object.keys(CLOTHING_LIBRARY).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`library-category-btn ${libraryCategory === cat ? 'active' : ''}`}
                          onClick={() => setLibraryCategory(cat)}
                        >
                          {CATEGORY_LABELS[cat]}
                        </button>
                      ))}
                    </div>
                    <div className="library-items-grid">
                      {Object.entries(getCategoryItems(libraryCategory)).map(([itemName, itemImage]) => (
                        <div
                          key={itemName}
                          className="library-item"
                          onClick={() => handleSelectFromLibrary(itemName, itemImage, libraryCategory)}
                        >
                          <img src={itemImage} alt={itemName} className="library-item-image" />
                          <div className="library-item-name">{itemName}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="image-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="image-upload"
                      className="image-upload-input"
                    />
                    <label htmlFor="image-upload" className="image-upload-label">
                      {newItem.imagePreview ? (
                        <img src={newItem.imagePreview} alt="Preview" className="image-preview" />
                      ) : (
                        <div className="upload-placeholder">
                          <span className="upload-icon">📷</span>
                          <p>Click to upload image</p>
                          <span className="upload-hint">or drag and drop</span>
                        </div>
                      )}
                    </label>
                  </div>
                )}
              </div>

              <button type="submit" className="submit-item-btn">
                {editingItem ? 'Update Item' : 'Add to Closet'}
              </button>
            </form>
          </div>
        )}

        {/* Filters Section */}
        <div className="filters-section">
          {/* Category Filter */}
          <div className="filter-group">
            <h3 className="filter-title">Category</h3>
            <div className="category-filter">
              <button
                className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCategory('all')}
              >
                All ({getItemCount('all')})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category} ({getItemCount(category)})
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          {getUniqueColors().length > 0 && (
            <div className="filter-group">
              <h3 className="filter-title">Color</h3>
              <div className="secondary-filters">
                <select
                  value={filterColor}
                  onChange={(e) => setFilterColor(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Colors</option>
                  {getUniqueColors().map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Fabric Filter */}
          {getUniqueFabrics().length > 0 && (
            <div className="filter-group">
              <h3 className="filter-title">Fabric</h3>
              <div className="secondary-filters">
                <select
                  value={filterFabric}
                  onChange={(e) => setFilterFabric(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Fabrics</option>
                  {getUniqueFabrics().map(fabric => (
                    <option key={fabric} value={fabric}>{fabric}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(filterColor !== 'all' || filterFabric !== 'all') && (
            <div className="active-filters">
              <span className="active-filters-label">Filters:</span>
              {filterColor !== 'all' && (
                <button className="active-filter-chip" onClick={() => setFilterColor('all')}>
                  {filterColor} ✕
                </button>
              )}
              {filterFabric !== 'all' && (
                <button className="active-filter-chip" onClick={() => setFilterFabric('all')}>
                  {filterFabric} ✕
                </button>
              )}
              <button
                className="clear-all-filters"
                onClick={() => {
                  setFilterColor('all')
                  setFilterFabric('all')
                  setFilterCategory('all')
                }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Closet Grid */}
        {filteredItems.length > 0 ? (
          <div className="closet-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="closet-item-card">
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-actions">
                    <button
                      className="edit-item-btn"
                      onClick={() => handleEditItem(item)}
                      aria-label="Edit item"
                      title="Edit item"
                    >
                      ✎
                    </button>
                    <button
                      className="remove-item-btn"
                      onClick={() => removeClosetItem(item.id)}
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-meta">
                    <span className="item-category">{item.category}</span>
                    {item.color && <span className="item-color">• {item.color}</span>}
                  </div>
                  {item.fabric && (
                    <span className="item-fabric">{item.fabric}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-closet">
            <div className="empty-icon">👗</div>
            <h2>Your closet is empty</h2>
            <p>
              {filterCategory === 'all'
                ? "Start building your digital wardrobe by adding your first item!"
                : `No items in ${filterCategory} category yet.`}
            </p>
            {filterCategory !== 'all' && (
              <button
                className="view-all-btn"
                onClick={() => setFilterCategory('all')}
              >
                View All Items
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Closet
