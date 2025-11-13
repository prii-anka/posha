// NEW FEATURE UPDATE – Phase 9 Overhaul
// Educational content for Learn Studio

export const FABRICS_DATA = [
  {
    id: 'cotton',
    name: 'Cotton',
    emoji: '👕',
    badge: 'Summer Vibes!',
    image: 'https://images.unsplash.com/photo-1523380677598-64d85d015339?w=600&h=600&fit=crop&q=80',
    description: 'Breathable and comfy! Perfect for hot days. Cotton absorbs moisture and keeps you cool.',
    bestColors: ['White', 'Pastels', 'Bright Colors'],
    careTip: 'Machine washable, iron on medium heat',
    facts: [
      'Made from natural plant fibers',
      'Absorbs moisture well',
      'Gets softer with each wash',
      'Can wrinkle easily'
    ],
    care: 'Machine wash warm, tumble dry low',
    sustainability: 'Organic cotton is eco-friendly but conventional uses lots of water'
  },
  {
    id: 'silk',
    name: 'Silk',
    emoji: '✨',
    badge: 'Spring & Fall',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop&q=80',
    description: 'Luxe and smooth! Regulates temperature naturally. Great for layering.',
    bestColors: ['Jewel Tones', 'Metallics', 'Pastels'],
    careTip: 'Dry clean or hand wash in cold water',
    facts: [
      'Naturally hypoallergenic',
      'Keeps you cool in summer, warm in winter',
      'Resistant to dust mites',
      'Delicate and requires gentle care'
    ],
    care: 'Hand wash cold or dry clean',
    sustainability: 'Natural but energy-intensive production'
  },
  {
    id: 'denim',
    name: 'Denim',
    emoji: '☀️',
    badge: 'All Year Round!',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&q=80',
    description: 'The 90s ICON! Durable, versatile, and forever cool. Mix light and dark washes for that authentic look.',
    bestColors: ['Blue', 'Black', 'Stone Wash'],
    careTip: 'Wash inside out, air dry for best results',
    facts: [
      'Durable and long-lasting',
      'Improves with age and wear',
      'Originally workwear fabric',
      'Heavy water use in production'
    ],
    care: 'Wash inside out, air dry when possible',
    sustainability: 'High water and dye impact - choose recycled or organic'
  },
  {
    id: 'leather',
    name: 'Leather',
    emoji: '🔥',
    badge: 'Fall & Winter',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop&q=80',
    description: '90s EDGE! Leather jackets were EVERYTHING. Wind-resistant and timeless.',
    bestColors: ['Black', 'Brown', 'Burgundy'],
    careTip: 'Professional cleaning, condition regularly',
    facts: [
      'Extremely durable',
      'Ages beautifully',
      'Water-resistant',
      'Requires special care'
    ],
    care: 'Professional cleaning, condition regularly',
    sustainability: 'Check for ethical sourcing and production'
  },
  {
    id: 'fleece',
    name: 'Fleece',
    emoji: '🌈',
    badge: 'Winter Warmth!',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80',
    description: 'Cozy 90s essential! Lightweight insulation that keeps you warm without bulk.',
    bestColors: ['Neon', 'Primary Colors', 'Patterns'],
    careTip: 'Machine wash cold, tumble dry low',
    facts: [
      'Lightweight and warm',
      'Quick-drying',
      'Low maintenance',
      'Often made from recycled plastic'
    ],
    care: 'Machine wash cold, tumble dry low',
    sustainability: 'Look for recycled polyester versions'
  },
  {
    id: 'lycra',
    name: 'Lycra/Spandex',
    emoji: '💫',
    badge: 'Active & Dance!',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=600&fit=crop&q=80',
    description: 'Stretchy and FUN! Perfect for bike shorts, leggings, and athletic wear.',
    bestColors: ['Neon', 'Metallic', 'Black'],
    careTip: 'Cold wash, lay flat to dry',
    facts: [
      'Extremely stretchy',
      'Retains shape',
      'Moisture-wicking',
      'Synthetic fiber'
    ],
    care: 'Cold wash, lay flat to dry',
    sustainability: 'Synthetic - look for recycled versions'
  },
  {
    id: 'velvet',
    name: 'Velvet',
    emoji: '👑',
    badge: 'Luxe Nights',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop&q=80',
    description: '90s GLAMOUR! Rich texture perfect for special occasions and statement pieces.',
    bestColors: ['Jewel Tones', 'Black', 'Burgundy'],
    careTip: 'Dry clean only, steam to refresh',
    facts: [
      'Luxurious texture',
      'Light-reflective',
      'Seasonless elegance',
      'Delicate care required'
    ],
    care: 'Dry clean only, steam to refresh',
    sustainability: 'Natural or synthetic - check fiber content'
  }
]

export const COLOR_THEORY_DATA = [
  {
    id: 'complementary',
    name: 'Complementary Colors',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop&q=80',
    description: 'Colors opposite on the color wheel create high contrast and visual pop.',
    examples: ['Red & Green', 'Blue & Orange', 'Purple & Yellow'],
    tip: 'Use for statement outfits that demand attention',
    vibe: 'Bold & Energetic'
  },
  {
    id: 'analogous',
    name: 'Analogous Colors',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=600&fit=crop&q=80',
    description: 'Colors next to each other on the wheel create harmony and flow.',
    examples: ['Blue, Blue-Green, Green', 'Orange, Red-Orange, Red'],
    tip: 'Perfect for cohesive, sophisticated looks',
    vibe: 'Harmonious & Elegant'
  },
  {
    id: 'monochrome',
    name: 'Monochromatic',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=600&fit=crop&q=80',
    description: 'Different shades and tints of one color create depth without distraction.',
    examples: ['Light blue + Navy + Denim', 'Cream + Camel + Chocolate'],
    tip: 'Effortlessly chic and easy to execute',
    vibe: 'Sophisticated & Minimal'
  },
  {
    id: 'neutral',
    name: 'Neutral Palette',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&q=80',
    description: 'Black, white, beige, grey, and brown work with everything.',
    examples: ['All black everything', 'Beige & cream layers', 'Grey suit + white shirt'],
    tip: 'Add one accent color for interest',
    vibe: 'Timeless & Versatile'
  },
  {
    id: 'triadic',
    name: 'Triadic Colors',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop&q=80',
    description: 'Three colors equally spaced on the wheel create vibrant balance.',
    examples: ['Red, Yellow, Blue', 'Orange, Green, Purple'],
    tip: 'Use one as dominant, others as accents',
    vibe: 'Playful & Dynamic'
  }
]

export const STYLE_MYTHS = [
  {
    id: 'myth1',
    myth: 'You can\'t wear black to a wedding',
    truth: 'Black is perfectly appropriate for evening weddings! Just avoid anything too casual or somber. Add festive accessories.',
    icon: '🖤'
  },
  {
    id: 'myth2',
    myth: 'Horizontal stripes make you look wider',
    truth: 'It\'s all about proportion! Thin horizontal stripes can actually create a lengthening effect. The "widening" myth is outdated.',
    icon: '↔️'
  },
  {
    id: 'myth3',
    myth: 'You need to match your handbag to your shoes',
    truth: 'This rule is from the 1950s! Modern style is about coordinating, not matching. Mix textures and tones freely.',
    icon: '👜'
  },
  {
    id: 'myth4',
    myth: 'After 30, you can\'t wear trendy clothes',
    truth: 'Style has no age limit! Wear what makes you feel confident. Adapt trends to your personal aesthetic.',
    icon: '✨'
  },
  {
    id: 'myth5',
    myth: 'Dark colors are slimming, light colors aren\'t',
    truth: 'Fit and proportion matter more than color! Well-fitted light colors can be just as flattering as dark ones.',
    icon: '🎨'
  },
  {
    id: 'myth6',
    myth: 'You can\'t wear white after Labor Day',
    truth: 'Completely outdated! White and cream are year-round classics. Winter whites with rich textures look incredible.',
    icon: '❄️'
  }
]

export const SUSTAINABILITY_TIPS = [
  {
    id: 'tip1',
    title: 'Did you know?',
    fact: 'Washing clothes accounts for 75% of their environmental impact over their lifetime',
    action: 'Wash less, use cold water, and air dry when possible',
    icon: '💧'
  },
  {
    id: 'tip2',
    title: 'Fast Fashion Truth',
    fact: 'The average garment is worn only 7 times before being discarded',
    action: 'Buy quality over quantity. Cost per wear matters!',
    icon: '♻️'
  },
  {
    id: 'tip3',
    title: 'Fabric Matters',
    fact: 'Polyester can take 200+ years to decompose in landfills',
    action: 'Choose natural fibers or recycled synthetics',
    icon: '🌱'
  },
  {
    id: 'tip4',
    title: 'Repair Revolution',
    fact: 'Extending clothing life by 9 months reduces carbon footprint by 30%',
    action: 'Learn basic mending or find a local tailor',
    icon: '🪡'
  },
  {
    id: 'tip5',
    title: 'Water Wisdom',
    fact: 'One cotton t-shirt requires 2,700 liters of water to produce',
    action: 'Choose organic cotton or linen instead',
    icon: '💧'
  }
]
