import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Get the model - using Gemini 2.5 Flash (stable version)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
  }
})

/**
 * Generate AI fashion advice using Google Gemini
 * @param {string} userMessage - The user's question or request
 * @param {Object} context - Additional context about the user
 * @param {Array} context.closetItems - User's wardrobe items
 * @param {Object} context.weather - Current weather information
 * @param {Object} context.location - User's location
 * @param {Object} context.profile - User's style profile
 * @param {Array} context.chatHistory - Previous chat messages
 * @returns {Promise<{text: string, items: Array}>} - AI response with text and suggested items
 */
export async function getFashionAdvice(userMessage, context = {}) {
  try {
    const {
      closetItems = [],
      weather = {},
      location = {},
      profile = {},
      chatHistory = []
    } = context

    // Build system context for Gemini
    const systemContext = buildSystemContext(closetItems, weather, location, profile)

    // Build conversation history
    const conversationHistory = chatHistory
      .slice(-6) // Keep last 3 exchanges (6 messages)
      .map(msg => `${msg.type === 'user' ? 'User' : 'Posha'}: ${msg.text}`)
      .join('\n\n')

    // Create the full prompt
    const prompt = `${systemContext}

${conversationHistory ? `Recent conversation:\n${conversationHistory}\n\n` : ''}User: ${userMessage}

Posha:`

    // Generate response
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to extract suggested items from the closet based on the response
    const suggestedItems = extractSuggestedItems(text, closetItems)

    return {
      text: text.trim(),
      items: suggestedItems
    }

  } catch (error) {
    console.error('Gemini AI Error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      apiKey: import.meta.env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing'
    })

    // Check for specific error types
    let errorMessage = `I'm having a little wardrobe malfunction right now! 😅 But I'm here to help. Could you try asking me again? I specialize in:\n\n• Outfit recommendations from your closet\n• Shopping advice\n• Mix and match ideas\n• Weather-appropriate styling\n• Occasion-based outfit planning\n\nWhat would you like help with?`

    // Rate limit or quota exceeded errors
    if (error.message?.includes('429') ||
        error.message?.includes('quota') ||
        error.message?.includes('rate limit') ||
        error.message?.includes('RESOURCE_EXHAUSTED')) {
      errorMessage = `Oops! I'm getting too many requests right now. 😅 Please wait a moment and try again.\n\nThis happens when:\n• Too many people are chatting with me at once\n• You've sent several messages very quickly\n\nJust give me a minute to catch my breath, and I'll be ready to help with your fashion questions!`
    }

    // API key issues
    if (error.message?.includes('API key') ||
        error.message?.includes('401') ||
        error.message?.includes('403')) {
      errorMessage = `I'm having trouble connecting to my fashion brain right now! 🤔 Please contact support if this persists.\n\nI specialize in:\n• Outfit recommendations\n• Shopping advice\n• Style tips\n\nTry refreshing the page?`
    }

    // Return a fallback response
    return {
      text: errorMessage,
      items: []
    }
  }
}

/**
 * Build system context for the AI
 */
function buildSystemContext(closetItems, weather, location, profile) {
  const categories = [...new Set(closetItems.map(item => item.category))].filter(Boolean)
  const colors = [...new Set(closetItems.map(item => item.color))].filter(Boolean)
  const fabrics = [...new Set(closetItems.map(item => item.fabric))].filter(Boolean)

  return `You are Posha, an AI fashion assistant. Your name comes from the Sanskrit word "poshakh" (पोशाख), meaning "attire" or "dress."

IMPORTANT: Stay in character as Posha at all times. Never mention AI models, Google, Gemini, or technical details about how you work. If asked about your technology, simply say you're Posha, a fashion assistant here to help with style advice.

Your personality:
- Friendly, enthusiastic, and supportive
- Fashion-forward but practical
- Culturally aware and inclusive
- Encouraging and confidence-building
- Concise and helpful (keep responses under 150 words unless detailed advice is needed)

Your capabilities:
- Recommend outfits from the user's existing wardrobe
- Suggest new items to purchase that complement their style
- Create mix-and-match combinations
- Provide weather-appropriate outfit advice
- Help plan outfits for specific occasions
- Offer style tips and fashion advice

User's wardrobe context:
- Total items: ${closetItems.length}
- Categories: ${categories.length > 0 ? categories.join(', ') : 'Not specified yet'}
- Common colors: ${colors.length > 0 ? colors.slice(0, 5).join(', ') : 'Various'}
- Fabrics available: ${fabrics.length > 0 ? fabrics.slice(0, 5).join(', ') : 'Various'}

Current context:
- Location: ${location.name || 'Not specified'}
- Weather: ${weather.temperature ? `${weather.temperature}°C, ${weather.description || ''}` : 'Not available'}
- Season: ${getCurrentSeason()}

Style preferences:
${profile.style ? `- Preferred style: ${profile.style.join(', ')}` : '- Style preferences: To be discovered'}
${profile.occasions ? `- Common occasions: ${profile.occasions.join(', ')}` : ''}

Guidelines:
1. When recommending items from their closet, mention specific categories, colors, or fabrics
2. Consider current weather when suggesting outfits
3. Be specific but flexible - give 2-3 options when possible
4. If they need to buy something, suggest items that complement what they own
5. Keep responses conversational and natural
6. Use fashion terminology but explain if needed
7. Add occasional fashion emoji (👗👠👔💄) sparingly for personality

Remember: You're a beta product, so be humble about limitations while being genuinely helpful!`
}

/**
 * Extract suggested items from the AI response
 */
function extractSuggestedItems(responseText, closetItems) {
  const suggested = []
  const lowerResponse = responseText.toLowerCase()

  // Look for category mentions
  closetItems.forEach(item => {
    if (!item.category || !item.image) return

    const itemTerms = [
      item.category?.toLowerCase(),
      item.name?.toLowerCase(),
      item.color?.toLowerCase(),
      item.fabric?.toLowerCase()
    ].filter(Boolean)

    // Check if any item terms are mentioned in the response
    const isMentioned = itemTerms.some(term =>
      term && lowerResponse.includes(term)
    )

    if (isMentioned && suggested.length < 4) {
      suggested.push(item)
    }
  })

  // If no specific items matched, return a few random items if the response seems to suggest outfit combinations
  if (suggested.length === 0 && (
    lowerResponse.includes('combination') ||
    lowerResponse.includes('outfit') ||
    lowerResponse.includes('wear') ||
    lowerResponse.includes('suggest')
  )) {
    const randomItems = closetItems
      .filter(item => item.image)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    return randomItems
  }

  return suggested
}

/**
 * Get current season based on month
 */
function getCurrentSeason() {
  const month = new Date().getMonth()

  if (month >= 2 && month <= 4) return 'Spring'
  if (month >= 5 && month <= 7) return 'Summer'
  if (month >= 8 && month <= 10) return 'Fall'
  return 'Winter'
}

export default {
  getFashionAdvice
}
