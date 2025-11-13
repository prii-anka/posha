import { useState } from 'react'
import { usePoshaData } from '../../context/PoshaDataContext.jsx'
import { useWeather } from '../../hooks/useWeather.js'
import './InsightCard.css'

const OCCASION_OPTIONS = ['Casual', 'Work', 'Formal', 'Active', 'Night Out', 'Home']

function OutfitSuggestionsCard() {
  const { closet, getColorFrequency, getFabricPreferences, preferences } = usePoshaData()
  const { weather, location } = useWeather()
  const [selectedOccasion, setSelectedOccasion] = useState('')

  const topColors = getColorFrequency()
  const topFabrics = getFabricPreferences()

  // Generate weather-based suggestions
  const getWeatherSuggestions = () => {
    if (!weather) return []

    const suggestions = []
    const temp = weather.temperature

    if (temp < 50) {
      suggestions.push('Layer with sweaters or jackets')
      suggestions.push('Consider warm fabrics like wool or fleece')
      suggestions.push('Add tights or leggings for warmth')
    } else if (temp < 70) {
      suggestions.push('Light layers work well')
      suggestions.push('Great weather for versatile pieces')
      suggestions.push('Cardigans or light blazers are perfect')
    } else {
      suggestions.push('Breathable fabrics recommended')
      suggestions.push('Light colors reflect heat')
      suggestions.push('Flowy silhouettes keep you cool')
    }

    if (weather.condition?.toLowerCase().includes('rain')) {
      suggestions.push('Water-resistant outerwear suggested')
      suggestions.push('Closed-toe shoes recommended')
    }

    return suggestions
  }

  // Generate style suggestions based on user data
  const getStyleSuggestions = () => {
    const suggestions = []

    if (topColors.length > 0) {
      const [color] = topColors[0]
      suggestions.push(`Your signature color ${color} always works well`)
    }

    if (topFabrics.length > 0) {
      const [fabric] = topFabrics[0]
      suggestions.push(`${fabric} is your go-to fabric`)
    }

    if (preferences.includes('Modest')) {
      suggestions.push('High necklines and longer hemlines suit your style')
    }

    if (preferences.includes('Love pink')) {
      suggestions.push('Incorporate pink accents for your signature look')
    }

    if (preferences.includes('Minimal jewelry')) {
      suggestions.push('Keep accessories simple and intentional')
    }

    if (preferences.includes('Bold patterns')) {
      suggestions.push('Mix bold prints with neutral solids')
    }

    if (preferences.includes('Neutral tones')) {
      suggestions.push('Build your look with timeless neutrals')
    }

    return suggestions
  }

  // Get visual outfit suggestions based on weather, occasion, and preferences
  const getVisualOutfitSuggestions = () => {
    if (!weather) return []

    const temp = weather.temperature
    const isRainy = weather.condition?.toLowerCase().includes('rain')
    const lovePink = preferences.includes('Love pink')
    const modest = preferences.includes('Modest')
    const neutral = preferences.includes('Neutral tones')
    const boldPatterns = preferences.includes('Bold patterns')
    const athleisure = preferences.includes('Athleisure')

    // Use time-based seed for variety that changes throughout the day
    const hour = new Date().getHours()
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    const seed = (hour + dayOfYear) % 10

    const allOutfits = {
      // Occasion-based outfits
      casual: [
        { title: 'Weekend Ease', description: 'Comfortable jeans with cozy sweater', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop&q=80', occasion: 'Casual' },
        { title: 'Casual Chic', description: 'T-shirt dress with sneakers', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&q=80', occasion: 'Casual' },
        { title: 'Relaxed Style', description: 'Denim jacket with simple tee', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&q=80', occasion: 'Casual' },
      ],
      work: [
        { title: 'Office Ready', description: 'Tailored blazer with trousers', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop&q=80', occasion: 'Work' },
        { title: 'Professional Polish', description: 'Pencil skirt with blouse', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&q=80', occasion: 'Work' },
        { title: 'Business Casual', description: 'Smart separates for the office', image: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=400&h=500&fit=crop&q=80', occasion: 'Work' },
      ],
      formal: [
        { title: 'Elegant Evening', description: 'Sophisticated gown or cocktail dress', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80', occasion: 'Formal' },
        { title: 'Black Tie Ready', description: 'Classic formal attire', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&q=80', occasion: 'Formal' },
        { title: 'Refined Glamour', description: 'Luxe fabrics and elegant lines', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&q=80', occasion: 'Formal' },
      ],
      active: [
        { title: 'Workout Ready', description: 'Performance activewear', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop&q=80', occasion: 'Active' },
        { title: 'Sporty Style', description: 'Athletic pieces for movement', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80', occasion: 'Active' },
      ],
      nightout: [
        { title: 'Date Night', description: 'Flirty dress with heels', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&q=80', occasion: 'Night Out' },
        { title: 'Evening Glam', description: 'Statement outfit for going out', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop&q=80', occasion: 'Night Out' },
      ],
      home: [
        { title: 'Cozy at Home', description: 'Comfortable loungewear', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop&q=80', occasion: 'Home' },
        { title: 'Relaxed Comfort', description: 'Soft fabrics for relaxing', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&q=80', occasion: 'Home' },
      ],
      // Weather-based outfits
      cold: [
        { title: 'Cozy Layers', description: 'Warm sweater with structured coat', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop&q=80' },
        { title: 'Turtleneck Chic', description: 'Classic turtleneck with tailored pants', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&q=80' },
        { title: 'Sweater Dress', description: 'Knit dress with knee-high boots', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80' },
        { title: 'Winter Elegance', description: 'Long coat over wool dress', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&q=80' },
        { title: 'Casual Warmth', description: 'Hoodie layers with puffer jacket', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop&q=80' },
      ],
      mild: [
        { title: 'Light Layers', description: 'Cardigan with flowy dress', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&q=80' },
        { title: 'Blazer Power', description: 'Structured blazer with denim', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop&q=80' },
        { title: 'Midi Magic', description: 'Flowy midi skirt with tucked top', image: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=400&h=500&fit=crop&q=80' },
        { title: 'Smart Casual', description: 'Button-down with chinos', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&q=80' },
        { title: 'Effortless Style', description: 'Oversized shirt with slim pants', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop&q=80' },
      ],
      hot: [
        { title: 'Breezy Summer', description: 'Light linen and flowy fabrics', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&q=80' },
        { title: 'Summer Dress', description: 'Airy sundress with sandals', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop&q=80' },
        { title: 'Cool & Casual', description: 'Linen shorts with breezy top', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&q=80' },
        { title: 'Minimal Heat', description: 'Sleeveless blouse with wide-leg pants', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&q=80' },
        { title: 'Beach Vibes', description: 'Flowy jumpsuit in light colors', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&q=80' },
      ],
      rainy: [
        { title: 'Rainy Day Chic', description: 'Waterproof trench with boots', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=500&fit=crop&q=80' },
        { title: 'Storm Style', description: 'Rain jacket with layered knits', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&q=80' },
      ],
      pink: [
        { title: 'Pink Winter Chic', description: 'Blush tones with warm textures', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80' },
        { title: 'Pink Sophistication', description: 'Soft pink blazer ensemble', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&q=80' },
        { title: 'Rose Elegance', description: 'Pink dress with delicate details', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&q=80' },
      ],
      neutral: [
        { title: 'Neutral Elegance', description: 'Timeless beige and cream layers', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&q=80' },
        { title: 'Monochrome Magic', description: 'All-neutral tonal dressing', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&q=80' },
        { title: 'Minimalist Chic', description: 'Clean lines in earth tones', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop&q=80' },
      ],
      modest: [
        { title: 'Modest & Modern', description: 'High neck with midi skirt', image: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?w=400&h=500&fit=crop&q=80' },
        { title: 'Elegant Coverage', description: 'Long sleeves with maxi dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&q=80' },
      ],
      bold: [
        { title: 'Pattern Play', description: 'Mix bold prints confidently', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop&q=80' },
        { title: 'Statement Piece', description: 'Eye-catching patterns steal the show', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&q=80' },
      ],
      athleisure: [
        { title: 'Active Comfort', description: 'Sporty meets street style', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop&q=80' },
        { title: 'Elevated Athletic', description: 'Sleek athleisure for any occasion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&q=80' },
      ],
    }

    let outfits = []

    // Prioritize occasion-based outfits if selected
    if (selectedOccasion) {
      const occasionKey = selectedOccasion.toLowerCase().replace(' ', '')
      if (allOutfits[occasionKey]) {
        outfits = [...allOutfits[occasionKey]]
      }
    }

    // If no occasion selected or not enough outfits, add weather-appropriate ones
    if (outfits.length < 3) {
      let weatherOutfits = []
      if (temp < 50) {
        weatherOutfits = [...allOutfits.cold]
      } else if (temp < 70) {
        weatherOutfits = [...allOutfits.mild]
      } else {
        weatherOutfits = [...allOutfits.hot]
      }

      // Add weather outfits if we need more
      outfits = [...outfits, ...weatherOutfits.slice(seed % 3, seed % 3 + (3 - outfits.length))]
    }

    // Add preference-based outfit if there's room
    if (outfits.length < 3) {
      if (lovePink && allOutfits.pink.length > 0) {
        outfits.push(allOutfits.pink[seed % allOutfits.pink.length])
      } else if (neutral && allOutfits.neutral.length > 0) {
        outfits.push(allOutfits.neutral[seed % allOutfits.neutral.length])
      } else if (modest && allOutfits.modest.length > 0) {
        outfits.push(allOutfits.modest[seed % allOutfits.modest.length])
      } else if (boldPatterns && allOutfits.bold.length > 0) {
        outfits.push(allOutfits.bold[seed % allOutfits.bold.length])
      } else if (athleisure && allOutfits.athleisure.length > 0) {
        outfits.push(allOutfits.athleisure[seed % allOutfits.athleisure.length])
      }
    }

    // Replace one with rainy outfit if it's raining and no occasion selected
    if (isRainy && !selectedOccasion && outfits.length > 0) {
      outfits[0] = allOutfits.rainy[seed % allOutfits.rainy.length]
    }

    return outfits.slice(0, 3)
  }

  // Filter closet items based on occasion and weather
  const getRelevantClosetItems = () => {
    if (!weather) return closet.slice(0, 6)

    const temp = weather.temperature
    const objectItems = closet.filter(item => typeof item === 'object' && item.image)

    let relevantItems = [...objectItems]

    // Filter by occasion if selected
    if (selectedOccasion) {
      const occasionMap = {
        'Casual': ['Tops', 'Bottoms', 'Shoes'],
        'Work': ['Tops', 'Bottoms', 'Outerwear', 'Shoes'],
        'Formal': ['Dresses', 'Outerwear', 'Shoes', 'Accessories'],
        'Active': ['Tops', 'Bottoms', 'Shoes'],
        'Night Out': ['Dresses', 'Tops', 'Bottoms', 'Accessories'],
        'Home': ['Tops', 'Bottoms']
      }

      const relevantCategories = occasionMap[selectedOccasion] || []
      relevantItems = relevantItems.filter(item =>
        relevantCategories.includes(item.category)
      )
    }

    // Filter by weather/fabric if no specific occasion
    if (!selectedOccasion && relevantItems.length > 0) {
      if (temp < 50) {
        // Prioritize warm fabrics for cold weather
        const warmItems = relevantItems.filter(item =>
          item.fabric && ['Wool', 'Cashmere', 'Fleece'].includes(item.fabric)
        )
        relevantItems = warmItems.length > 0 ? warmItems : relevantItems
      } else if (temp > 75) {
        // Prioritize light fabrics for hot weather
        const lightItems = relevantItems.filter(item =>
          item.fabric && ['Cotton', 'Linen', 'Silk'].includes(item.fabric)
        )
        relevantItems = lightItems.length > 0 ? lightItems : relevantItems
      }
    }

    // If we filtered out too many items, add some back
    if (relevantItems.length < 6) {
      const remainingItems = objectItems.filter(item => !relevantItems.includes(item))
      relevantItems = [...relevantItems, ...remainingItems]
    }

    return relevantItems.slice(0, 6)
  }

  const weatherSuggestions = getWeatherSuggestions()
  const styleSuggestions = getStyleSuggestions()
  const visualOutfits = getVisualOutfitSuggestions()
  const relevantClosetItems = getRelevantClosetItems()

  return (
    <div className="insight-card">
      <div className="card-hero-image">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=300&fit=crop&q=80"
          alt="Fashion suggestions"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="insight-card-header">
        <div className="insight-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 26 L10 32 L13 22 L5 15 L15 15 Z"
              fill="var(--color-accent-primary)"
              opacity="0.2"
            />
            <path
              d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 26 L10 32 L13 22 L5 15 L15 15 Z"
              stroke="var(--color-accent-primary)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <h3 className="insight-card-title">Posha Suggests</h3>
      </div>

      <div className="insight-card-content">
        {/* Weather Info */}
        {weather && location && (
          <div style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-base)' }}>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
              Current Weather
            </p>
            <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              {location.name} • {weather.temperature}°C • {weather.condition}
            </p>
          </div>
        )}

        {/* Occasion Selector */}
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
            What's the Occasion?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {OCCASION_OPTIONS.map((occasion) => (
              <button
                key={occasion}
                onClick={() => setSelectedOccasion(selectedOccasion === occasion ? '' : occasion)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: selectedOccasion === occasion ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
                  color: selectedOccasion === occasion ? 'white' : 'var(--color-text-secondary)',
                  border: `1px solid ${selectedOccasion === occasion ? 'var(--color-accent-primary)' : 'var(--color-border-light)'}`,
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseOver={(e) => {
                  if (selectedOccasion !== occasion) {
                    e.currentTarget.style.borderColor = 'var(--color-accent-secondary)'
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedOccasion !== occasion) {
                    e.currentTarget.style.borderColor = 'var(--color-border-light)'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }
                }}
              >
                {occasion}
              </button>
            ))}
          </div>
          {selectedOccasion && (
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-primary)', fontWeight: 'var(--font-weight-medium)' }}>
              ✓ Showing outfits for {selectedOccasion}
            </p>
          )}
        </div>

        {/* Visual Outfit Suggestions */}
        {visualOutfits.length > 0 && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <p style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
              Today's Outfit Inspiration
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: visualOutfits.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)' }}>
              {visualOutfits.map((outfit, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: 'var(--radius-base)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border-light)',
                    background: 'var(--color-bg-tertiary)',
                    transition: 'all var(--transition-fast)',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ position: 'relative', paddingBottom: '125%', overflow: 'hidden' }}>
                    <img
                      src={outfit.image}
                      alt={outfit.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ padding: 'var(--space-3)' }}>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                      {outfit.title}
                    </p>
                    <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', lineHeight: 'var(--line-height-relaxed)' }}>
                      {outfit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weather-based Suggestions */}
        {weatherSuggestions.length > 0 && (
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-accent-primary)' }}>
              ☁️ Weather-Smart
            </p>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {weatherSuggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Style Suggestions */}
        {styleSuggestions.length > 0 && (
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-accent-primary)' }}>
              ✨ Style Wisdom
            </p>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {styleSuggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Closet Access - Show relevant items based on occasion and weather */}
        {closet.length > 0 && (
          <div>
            <p style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
              From Your Closet
            </p>
            {(selectedOccasion || weather) && (
              <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                {selectedOccasion ? `Perfect for ${selectedOccasion}` : 'Weather-appropriate items'}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 'var(--space-2)' }}>
              {relevantClosetItems.map((item, index) => {
                // Check if item is object with image (new format) or just string (legacy)
                const isImageItem = typeof item === 'object' && item.image

                if (isImageItem) {
                  return (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-base)',
                        overflow: 'hidden',
                        border: '2px solid var(--color-border-light)',
                        background: 'var(--color-bg-tertiary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-accent-primary)'
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-light)'
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                      title={item.name}
                    >
                      <div style={{ paddingBottom: '100%', position: 'relative' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'var(--space-1)',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        color: 'white',
                        fontSize: 'var(--font-size-xs)',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.name}
                      </div>
                    </div>
                  )
                }

                // Legacy text items or objects without images
                const itemText = typeof item === 'string' ? item : (item.name || 'Item')
                return (
                  <div
                    key={index}
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-light)',
                      borderRadius: 'var(--radius-base)',
                      color: 'var(--color-text-secondary)',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px'
                    }}
                  >
                    {itemText}
                  </div>
                )
              })}
            </div>
            <p style={{ margin: 'var(--space-3) 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
              💡 Tip: Add photos to your closet items for visual outfit planning
            </p>
          </div>
        )}

        {!weather && !styleSuggestions.length && (
          <div className="highlight-box">
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              Complete your profile to get personalized outfit suggestions tailored to you!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutfitSuggestionsCard
