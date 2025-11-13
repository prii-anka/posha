import { useState, useRef, useEffect } from 'react'
import { usePoshaData } from '../context/PoshaDataContext'
import { useWeather } from '../hooks/useWeather'
import { getFashionAdvice } from '../services/aiService'
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

  // Load user profile from localStorage
  const getUserProfile = () => {
    const profile = localStorage.getItem('poshaProfile')
    return profile ? JSON.parse(profile) : {}
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    }

    const currentInput = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Prepare context for AI
      const closetItems = closet.filter(item => typeof item === 'object' && item.image)
      const profile = getUserProfile()

      const context = {
        closetItems,
        weather,
        location,
        profile,
        chatHistory: messages
      }

      // Get AI response
      const aiResponse = await getFashionAdvice(currentInput, context)

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponse.text,
        items: aiResponse.items || [],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)

      // Fallback message on error
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: `Oops! I'm having a little wardrobe malfunction 😅 Could you try asking me again? I'm here to help with outfit advice, styling tips, and fashion recommendations!`,
        items: [],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
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
                  aria-label={`Ask: ${prompt}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat conversation">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar" aria-hidden="true">
                {message.type === 'ai' ? '👗' : '👤'}
              </div>
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                {message.items && message.items.length > 0 && (
                  <div className="message-items" aria-label="Suggested outfit items">
                    {message.items.map((item, index) => (
                      <div key={index} className="suggested-item">
                        <img
                          src={item.image}
                          alt={`${item.name || item.category} - ${item.color || ''} ${item.fabric || ''}`.trim()}
                        />
                        <p className="item-name">{item.name || item.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message ai" aria-live="polite" aria-label="Posha is typing">
              <div className="message-avatar" aria-hidden="true">👗</div>
              <div className="message-content">
                <div className="typing-indicator" aria-label="Typing indicator">
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
            aria-label="Fashion chat message input"
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
