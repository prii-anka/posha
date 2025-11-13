import { useState, useRef, useEffect } from 'react'
import { usePoshaData } from '../context/PoshaDataContext'
import { useWeather } from '../hooks/useWeather'
import './FashionChat.css'

const EXAMPLE_PROMPTS = [
  "I can't decide what to wear for work tomorrow",
  "I want to buy a dress for a wedding next month",
  "What outfit should I wear for a casual date?",
  "Help me mix and match items from my closet",
  "I need something comfortable for working from home",
  "What should I pack for a weekend trip?"
]

const GREETINGS = [
  { text: "Hello", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "你好", lang: "Chinese" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Ciao", lang: "Italian" },
  { text: "Hallo", lang: "German" }
]

function FashionChat() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [userName, setUserName] = useState('')
  const messagesEndRef = useRef(null)
  const { closet } = usePoshaData()
  const { weather, location } = useWeather()

  // Load user name from profile
  useEffect(() => {
    const profile = localStorage.getItem('poshaProfile')
    if (profile) {
      const profileData = JSON.parse(profile)
      setUserName(profileData.name || '')
    }
  }, [])

  // Rotate greetings every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Context about user's closet
    const closetItems = closet.filter(item => typeof item === 'object' && item.image)
    const categories = [...new Set(closetItems.map(item => item.category))]

    // Analyze user intent
    if (lowerMessage.includes('work') || lowerMessage.includes('office')) {
      const workItems = closetItems.filter(item =>
        ['Tops', 'Bottoms', 'Outerwear', 'Shoes'].includes(item.category)
      )

      if (workItems.length >= 3) {
        const suggestions = workItems.slice(0, 3)
        return {
          text: `Great! For work tomorrow, I'd suggest mixing and matching from your closet:\n\n${suggestions.map((item, i) => `${i + 1}. ${item.name || item.category} in ${item.color || 'your favorite color'}`).join('\n')}\n\nThis combination is professional and weather-appropriate for ${location?.name || 'your location'} (${weather?.temperature || '--'}°C).`,
          items: suggestions
        }
      } else {
        return {
          text: `I see you have ${closetItems.length} items in your closet. For work attire, I'd recommend adding some versatile pieces like:\n\n• A classic blazer\n• Tailored trousers or a pencil skirt\n• Button-down shirts in neutral colors\n• Comfortable yet professional shoes\n\nWould you like specific recommendations based on your current style?`,
          items: []
        }
      }
    }

    if (lowerMessage.includes('buy') || lowerMessage.includes('shopping')) {
      return {
        text: `I'd be happy to help you find the perfect outfit! Based on your closet, you have items in these categories: ${categories.join(', ')}.\n\nTo give you the best recommendations:\n• What's your budget?\n• What's the occasion?\n• Any specific colors or styles you prefer?\n\nI can suggest items that complement what you already own!`,
        items: []
      }
    }

    if (lowerMessage.includes('mix') || lowerMessage.includes('match') || lowerMessage.includes('combine')) {
      const randomItems = closetItems.sort(() => 0.5 - Math.random()).slice(0, 3)
      return {
        text: `Here's a great mix-and-match combination from your closet:\n\n${randomItems.map((item, i) => `${i + 1}. ${item.name || item.category} (${item.color || 'Classic'})`).join('\n')}\n\nThese pieces work well together and are perfect for the current weather!`,
        items: randomItems
      }
    }

    if (lowerMessage.includes('casual') || lowerMessage.includes('date')) {
      const casualItems = closetItems.filter(item =>
        ['Tops', 'Bottoms', 'Dresses', 'Shoes'].includes(item.category)
      )

      if (casualItems.length >= 2) {
        const suggestions = casualItems.slice(0, 3)
        return {
          text: `For a casual date, you want to look great while feeling comfortable! Here's what I suggest:\n\n${suggestions.map((item, i) => `${i + 1}. ${item.name || item.category}`).join('\n')}\n\nThis outfit is relaxed yet stylish. Add some accessories to complete the look!`,
          items: suggestions
        }
      }
    }

    if (lowerMessage.includes('home') || lowerMessage.includes('comfortable')) {
      const comfyItems = closetItems.filter(item =>
        item.fabric && ['Cotton', 'Fleece'].includes(item.fabric)
      )

      return {
        text: `For working from home, comfort is key! ${comfyItems.length > 0 ? `Your ${comfyItems[0].name || comfyItems[0].category} would be perfect.` : 'I recommend soft cotton or fleece pieces.'}\n\nStay cozy while looking presentable for video calls!`,
        items: comfyItems.slice(0, 2)
      }
    }

    // Default response
    return {
      text: `I'm Posha, your AI fashion assistant! I can help you with:\n\n• Choosing outfits from your closet\n• Shopping recommendations\n• Mix and match suggestions\n• Weather-appropriate styling\n• Occasion-based outfit planning\n\nYou currently have ${closetItems.length} items in your closet. What would you like help with today?`,
      items: []
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponse.text,
        items: aiResponse.items,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handlePromptClick = (prompt) => {
    setInputValue(prompt)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fashion-chat">
      {messages.length === 0 ? (
        <div className="chat-empty-state">
          <div className="chat-welcome">
            <h1 className="chat-title">
              {GREETINGS[greetingIndex].text}{userName ? `, ${userName}` : ''}! I'm Posha
            </h1>
            <p className="chat-subtitle">Your AI fashion assistant</p>
            <p className="chat-introduction">
              My name comes from the Sanskrit word "poshakh" (पोशाख), meaning "attire" or "dress."
              I'm here to help you discover your unique style and make confident fashion choices every day.
            </p>
          </div>

          <div className="example-prompts">
            <p className="prompts-label">Try asking me:</p>
            <div className="prompts-grid">
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  className="prompt-button"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'ai' ? '👗' : '👤'}
              </div>
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                {message.items && message.items.length > 0 && (
                  <div className="message-items">
                    {message.items.map((item, index) => (
                      <div key={index} className="suggested-item">
                        <img src={item.image} alt={item.name || item.category} />
                        <p className="item-name">{item.name || item.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message ai">
              <div className="message-avatar">👗</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Ask me anything about fashion, outfits, or your wardrobe..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="chat-disclaimer">
          Posha's still learning the runway — this is our beta debut!
        </p>
      </div>
    </div>
  )
}

export default FashionChat
