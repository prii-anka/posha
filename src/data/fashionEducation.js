// Comprehensive Fashion Education Content Library
// From basics to advanced - for complete beginners to fashion enthusiasts

export const FASHION_FACTS = [
  // Color Theory Facts
  { category: 'color', level: 'beginner', fact: 'Wearing colors that complement your skin tone can instantly brighten your complexion and make you look more vibrant.' },
  { category: 'color', level: 'beginner', fact: 'The color wheel helps you understand which colors work well together. Colors opposite each other (like blue and orange) create striking contrasts.' },
  { category: 'color', level: 'intermediate', fact: 'Warm undertones (yellow/golden) look best in earthy tones, while cool undertones (pink/blue) shine in jewel tones.' },
  { category: 'color', level: 'intermediate', fact: 'Monochromatic outfits (different shades of the same color) create a sophisticated, elongating effect.' },
  { category: 'color', level: 'advanced', fact: 'The 60-30-10 rule: 60% dominant color, 30% secondary color, 10% accent color creates balanced, professional outfits.' },
  { category: 'color', level: 'advanced', fact: 'Color psychology: Blue conveys trust and professionalism, red signals confidence and power, while neutral tones suggest sophistication.' },

  // Fabric Knowledge
  { category: 'fabric', level: 'beginner', fact: 'Natural fabrics like cotton and linen breathe better than synthetics, making them ideal for hot weather.' },
  { category: 'fabric', level: 'beginner', fact: 'Wool is naturally temperature-regulating, keeping you warm in winter and surprisingly cool in summer.' },
  { category: 'fabric', level: 'intermediate', fact: 'Silk is a protein fiber that naturally wicks moisture, making it comfortable in all seasons despite its delicate appearance.' },
  { category: 'fabric', level: 'intermediate', fact: 'Denim weight is measured in ounces - 12-16 oz is perfect for jeans, while 8-12 oz works best for shirts and jackets.' },
  { category: 'fabric', level: 'advanced', fact: 'Fabric drape depends on fiber and weave: crepe drapes softly, poplin is crisp, and jersey has natural stretch and flow.' },
  { category: 'fabric', level: 'advanced', fact: 'Thread count matters for sheets but not for clothing quality - construction and fiber type are far more important indicators.' },

  // Body Types & Fit
  { category: 'fit', level: 'beginner', fact: 'Clothes that fit well at the shoulders are easier to tailor everywhere else - always prioritize shoulder fit.' },
  { category: 'fit', level: 'beginner', fact: 'Vertical lines (pinstripes, long necklaces) create a lengthening effect, while horizontal lines add width.' },
  { category: 'fit', level: 'intermediate', fact: 'The "nip point" of a jacket (where it starts to taper) should hit at your natural waist for the most flattering silhouette.' },
  { category: 'fit', level: 'intermediate', fact: 'High-waisted bottoms paired with cropped or tucked tops create longer-looking legs by raising your visual waistline.' },
  { category: 'fit', level: 'advanced', fact: 'Balance proportions: if wearing oversized on top, go fitted on bottom, and vice versa, to maintain a flattering silhouette.' },
  { category: 'fit', level: 'advanced', fact: 'Understanding your body proportions (torso vs. leg length) is more useful than knowing your "body shape type."' },

  // Style Principles
  { category: 'style', level: 'beginner', fact: 'The rule of three: Limit accessories to three pieces to avoid looking cluttered and maintain visual balance.' },
  { category: 'style', level: 'beginner', fact: 'A capsule wardrobe of 30-40 versatile pieces can create hundreds of outfit combinations.' },
  { category: 'style', level: 'intermediate', fact: 'Pattern mixing works when patterns share at least one common color and vary in scale (large + small).' },
  { category: 'style', level: 'intermediate', fact: 'The French tuck (front half of shirt tucked in) adds polish while keeping the relaxed vibe of an untucked look.' },
  { category: 'style', level: 'advanced', fact: 'Power clashing: Intentionally mixing unexpected patterns or styles creates editorial, fashion-forward looks.' },
  { category: 'style', level: 'advanced', fact: 'Proportion play: Experimenting with volume, length, and fit creates visual interest beyond color and pattern.' },

  // Wardrobe Care
  { category: 'care', level: 'beginner', fact: 'Washing jeans less frequently (every 5-10 wears) preserves their color, shape, and extends their lifespan.' },
  { category: 'care', level: 'beginner', fact: 'Air-drying clothes instead of using a dryer prevents shrinkage and fabric damage, making garments last longer.' },
  { category: 'care', level: 'intermediate', fact: 'Store knits folded rather than hung to prevent shoulder bumps and stretching from hanger weight.' },
  { category: 'care', level: 'intermediate', fact: 'Cedar blocks or lavender sachets naturally repel moths and keep your closet fresh without chemical sprays.' },
  { category: 'care', level: 'advanced', fact: 'Fabric pilling is caused by friction - turn garments inside out before washing to minimize pilling on the visible side.' },
  { category: 'care', level: 'advanced', fact: 'Steam refreshing between washes removes wrinkles and odors without the wear and tear of washing cycles.' },

  // Occasion Dressing
  { category: 'occasion', level: 'beginner', fact: 'Business casual means no sneakers or jeans in most workplaces - opt for chinos, blouses, and closed-toe shoes.' },
  { category: 'occasion', level: 'beginner', fact: 'Cocktail attire typically means knee-length dresses or dressy separates - save floor-length gowns for formal events.' },
  { category: 'occasion', level: 'intermediate', fact: 'Smart casual bridges the gap between casual and business - think blazer with dark jeans or dress pants with a polo.' },
  { category: 'occasion', level: 'intermediate', fact: 'Black tie optional means you can wear a formal cocktail dress instead of a gown, or a dark suit instead of a tuxedo.' },
  { category: 'occasion', level: 'advanced', fact: 'Dress codes are cultural and contextual - research industry norms and regional expectations for professional settings.' },
  { category: 'occasion', level: 'advanced', fact: 'Creative black tie allows fashion-forward interpretation of formal wear - think bold colors, unique textures, or modern silhouettes.' },

  // Sustainable Fashion
  { category: 'sustainability', level: 'beginner', fact: 'Buying fewer, higher-quality pieces that last longer is more sustainable than frequently replacing cheap fast fashion.' },
  { category: 'sustainability', level: 'beginner', fact: 'Shopping secondhand reduces textile waste and gives clothes a second life while saving you money.' },
  { category: 'sustainability', level: 'intermediate', fact: 'Natural fibers are biodegradable, while synthetics like polyester can take 200+ years to decompose in landfills.' },
  { category: 'sustainability', level: 'intermediate', fact: 'Cost per wear is a better value metric than initial price - a $200 coat worn 100 times costs $2/wear.' },
  { category: 'sustainability', level: 'advanced', fact: 'Microplastics from synthetic fabrics enter waterways during washing - use a Guppyfriend bag or similar filter to reduce impact.' },
  { category: 'sustainability', level: 'advanced', fact: 'Garment production accounts for 10% of global carbon emissions - choosing local, ethical brands reduces your fashion footprint.' }
]

export const FASHION_LESSONS = {
  // Beginner Level Lessons
  beginner: [
    {
      id: 'color-basics',
      title: 'Color Basics: Understanding Your Palette',
      duration: '10 min',
      topics: ['Color wheel fundamentals', 'Warm vs cool tones', 'Finding your undertone', 'Basic color combinations'],
      description: 'Learn how to identify colors that flatter your natural coloring and create harmonious outfits.'
    },
    {
      id: 'fabric-101',
      title: 'Fabric 101: Natural vs Synthetic',
      duration: '8 min',
      topics: ['Cotton, linen, wool, silk basics', 'When to wear each fabric', 'Fabric care fundamentals', 'Reading garment labels'],
      description: 'Understand the most common fabrics, their properties, and how to care for them properly.'
    },
    {
      id: 'fit-fundamentals',
      title: 'Fit Fundamentals: What Good Fit Looks Like',
      duration: '12 min',
      topics: ['Shoulder fit', 'Sleeve length', 'Pants hem', 'Overall proportions'],
      description: 'Master the basics of proper fit - the foundation of looking polished and put-together.'
    },
    {
      id: 'wardrobe-essentials',
      title: 'Building Your Essential Wardrobe',
      duration: '15 min',
      topics: ['10 must-have basics', 'Versatile neutrals', 'Investment pieces', 'Budget-friendly shopping'],
      description: 'Discover the timeless pieces every wardrobe needs and how to build yours strategically.'
    },
    {
      id: 'closet-organization',
      title: 'Closet Organization Made Simple',
      duration: '10 min',
      topics: ['Decluttering strategies', 'Category organization', 'Seasonal rotation', 'Visibility solutions'],
      description: 'Transform your closet into an organized, functional space where you can easily find everything.'
    }
  ],

  // Intermediate Level Lessons
  intermediate: [
    {
      id: 'color-theory-deep',
      title: 'Color Theory Deep Dive: Advanced Combinations',
      duration: '15 min',
      topics: ['Complementary colors', 'Analogous schemes', 'Triadic combinations', 'Seasonal color analysis'],
      description: 'Master advanced color theory to create sophisticated, eye-catching outfits with confidence.'
    },
    {
      id: 'fabric-guide',
      title: 'Complete Fabric Guide: Choosing for Occasion & Season',
      duration: '18 min',
      topics: ['Fabric weights', 'Seasonal appropriateness', 'Drape and structure', 'Mixing textures'],
      description: 'Learn to select the perfect fabric for every occasion, season, and styling goal.'
    },
    {
      id: 'body-proportions',
      title: 'Understanding Body Proportions & Dressing for Yours',
      duration: '20 min',
      topics: ['Torso vs leg ratio', 'Visual balance', 'Strategic styling', 'Beyond body "types"'],
      description: 'Move beyond generic body shape advice and understand your unique proportions.'
    },
    {
      id: 'pattern-mixing',
      title: 'Pattern Mixing Masterclass',
      duration: '12 min',
      topics: ['Scale variation', 'Color coordination', 'Print + print rules', 'Pattern personalities'],
      description: 'Gain the confidence to mix patterns like a fashion editor with proven techniques.'
    },
    {
      id: 'accessorizing',
      title: 'The Art of Accessorizing',
      duration: '15 min',
      topics: ['Jewelry layering', 'Belt styling', 'Bag selection', 'Shoe-outfit pairings'],
      description: 'Learn how accessories can transform basic outfits into polished, complete looks.'
    },
    {
      id: 'dress-codes',
      title: 'Decoding Dress Codes: From Casual to Black Tie',
      duration: '16 min',
      topics: ['Business attire spectrum', 'Wedding guest codes', 'Creative interpretations', 'Cultural context'],
      description: 'Confidently navigate any dress code with this comprehensive guide to event dressing.'
    }
  ],

  // Advanced Level Lessons
  advanced: [
    {
      id: 'personal-style',
      title: 'Developing Your Personal Style Identity',
      duration: '25 min',
      topics: ['Style archetype quiz', 'Pinterest curation', 'Closet editing', 'Signature elements'],
      description: 'Define and refine your unique personal style beyond trends and fast fashion.'
    },
    {
      id: 'silhouette-play',
      title: 'Playing with Silhouette & Proportion',
      duration: '20 min',
      topics: ['Volume experimentation', 'Oversized styling', 'Layering techniques', 'Visual tricks'],
      description: 'Master the art of creating interesting silhouettes through proportion and volume.'
    },
    {
      id: 'sustainable-wardrobe',
      title: 'Building a Sustainable, Ethical Wardrobe',
      duration: '22 min',
      topics: ['Fast fashion impact', 'Ethical brands', 'Secondhand shopping', 'Clothing lifecycle'],
      description: 'Learn to build a beautiful wardrobe that aligns with your environmental values.'
    },
    {
      id: 'tailoring-alterations',
      title: "Tailoring & Alterations: What's Worth It",
      duration: '18 min',
      topics: ['Common alterations', 'Cost analysis', 'Finding a tailor', 'DIY vs professional'],
      description: 'Understand which alterations transform fit and which pieces are worth investing in tailoring.'
    },
    {
      id: 'capsule-wardrobe',
      title: 'Creating a Capsule Wardrobe System',
      duration: '30 min',
      topics: ['Formula building', 'Outfit math', 'Seasonal capsules', 'Travel packing'],
      description: 'Design a streamlined capsule wardrobe system that simplifies dressing and maximizes versatility.'
    },
    {
      id: 'fashion-trends',
      title: 'Navigating Fashion Trends Strategically',
      duration: '20 min',
      topics: ['Trend forecasting', 'Timeless vs trendy', 'Budget allocation', 'Personal style integration'],
      description: 'Learn to selectively incorporate trends while maintaining a timeless, personal wardrobe.'
    },
    {
      id: 'styling-rules',
      title: 'Breaking & Bending Styling Rules',
      duration: '16 min',
      topics: ['Rule origins', 'When to follow', 'When to break', 'Creating your own rules'],
      description: 'Understand styling rules deeply enough to know when and how to break them intentionally.'
    }
  ]
}

export const OCCASION_GUIDES = [
  {
    occasion: 'Job Interview',
    formality: 'Business Professional',
    tips: [
      'Choose conservative colors - navy, gray, black, or neutral tones',
      'Ensure clothes are wrinkle-free and well-fitted',
      'Avoid distracting patterns, loud jewelry, or strong fragrances',
      'Closed-toe shoes are safest bet for most industries'
    ],
    examples: {
      outfit1: 'Navy blazer + white blouse + gray tailored pants + black pumps',
      outfit2: 'Charcoal suit + crisp white shirt + classic tie + oxford shoes',
      outfit3: 'Black sheath dress + structured blazer + nude heels'
    }
  },
  {
    occasion: 'First Date',
    formality: 'Smart Casual',
    tips: [
      'Wear something that makes you feel confident and comfortable',
      'Consider the venue - coffee shop vs fancy restaurant requires different formality',
      "Avoid brand new clothes you haven't worn before (comfort test first!)",
      'Add a signature accessory or color that expresses your personality'
    ],
    examples: {
      outfit1: 'Dark jeans + silk blouse + blazer + ankle boots + statement earrings',
      outfit2: 'Midi dress + leather jacket + heeled sandals + crossbody bag',
      outfit3: 'Chinos + button-down + casual blazer + loafers'
    }
  },
  {
    occasion: 'Wedding Guest',
    formality: 'Varies (Semi-Formal to Formal)',
    tips: [
      'Never wear white, cream, or anything that could upstage the bride',
      'Check the invitation for dress code clues and venue formality',
      'Consider the season and time of day - afternoon vs evening changes formality',
      'When in doubt, slightly overdress rather than underdress'
    ],
    examples: {
      outfit1: 'Floral midi dress + block heels + clutch + delicate jewelry',
      outfit2: 'Formal jumpsuit + heeled sandals + statement necklace',
      outfit3: 'Dark suit + dress shirt + patterned tie + dress shoes'
    }
  },
  {
    occasion: 'Casual Friday at Office',
    formality: 'Business Casual',
    tips: [
      'Still maintain professionalism - no ripped jeans, graphic tees, or flip-flops',
      'Dark-wash jeans can work if paired with polished tops',
      'Blazers elevate even casual outfits instantly',
      'Keep it office-appropriate - save club wear for weekends'
    ],
    examples: {
      outfit1: 'Dark jeans + tucked blouse + ankle boots + minimal jewelry',
      outfit2: 'Chinos + polo shirt + loafers + leather belt',
      outfit3: 'Midi skirt + sweater + flats + tote bag'
    }
  },
  {
    occasion: 'Brunch with Friends',
    formality: 'Casual',
    tips: [
      "Comfort is key - you'll likely be sitting for a while",
      'Layer pieces for changing temperatures (air conditioning!)',
      "Casual doesn't mean sloppy - aim for effortless polish",
      'Sunglasses and a tote bag complete the look'
    ],
    examples: {
      outfit1: 'Jeans + graphic tee + cardigan + white sneakers',
      outfit2: 'Sundress + denim jacket + sandals + crossbody bag',
      outfit3: 'Joggers + fitted tank + oversized shirt + slip-ons'
    }
  },
  {
    occasion: 'Networking Event',
    formality: 'Business Casual to Smart Casual',
    tips: [
      'Dress slightly more polished than you think necessary',
      'Conversation-starter accessories can help break the ice',
      "Comfortable shoes are essential - you'll be standing and walking",
      'Bring business cards in an easily accessible pocket or bag'
    ],
    examples: {
      outfit1: 'Blazer + blouse + tailored pants + pointed flats + structured bag',
      outfit2: 'Sheath dress + cardigan + heels + statement watch',
      outfit3: 'Button-down + dress pants + leather shoes + belt'
    }
  }
]

// Helper function to get random fashion fact
export function getRandomFashionFact(category = null, level = null) {
  let filteredFacts = FASHION_FACTS

  if (category) {
    filteredFacts = filteredFacts.filter(f => f.category === category)
  }

  if (level) {
    filteredFacts = filteredFacts.filter(f => f.level === level)
  }

  const randomIndex = Math.floor(Math.random() * filteredFacts.length)
  return filteredFacts[randomIndex]
}

// Helper function to get lessons by level
export function getLessonsByLevel(level) {
  return FASHION_LESSONS[level] || []
}

// Helper function to get occasion guide
export function getOccasionGuide(occasionName) {
  return OCCASION_GUIDES.find(guide =>
    guide.occasion.toLowerCase().includes(occasionName.toLowerCase())
  )
}
