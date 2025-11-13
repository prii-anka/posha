import { useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import './Onboarding.css'

const TOTAL_SLIDES = 8

function Onboarding({ onComplete, isSkipFlow = false, userData = null }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [userGoals, setUserGoals] = useState([])
  const [painPoints, setPainPoints] = useState([])

  // NEW: Profile data states
  const [name, setName] = useState(userData?.name || '')
  const [gender, setGender] = useState('')
  const [styleVibes, setStyleVibes] = useState([])
  const [wantsMakeup, setWantsMakeup] = useState(null)

  const { themes, themeLabels, themeDescriptions, setTheme } = useTheme()

  const handleNext = () => {
    // Validate required fields before proceeding
    if (currentSlide === 1 && !name.trim()) {
      alert('Please enter your name')
      return
    }
    if (currentSlide === 2 && !gender) {
      alert('Please select your gender')
      return
    }
    if (currentSlide === 3 && styleVibes.length < 3) {
      alert('Please select at least 3 style vibes for better AI learning')
      return
    }
    if (currentSlide === 4 && wantsMakeup === null) {
      alert('Please select your makeup preference')
      return
    }

    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(prev => prev + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  const completeOnboarding = () => {
    const themeToSet = selectedTheme || themes.SOFT_MUSE
    setTheme(themeToSet)

    // Save all profile and preference data
    const profileData = {
      name: name.trim(),
      gender,
      styleVibes,
      wantsMakeup,
      theme: themeToSet,
      goals: userGoals,
      painPoints,
      completedAt: new Date().toISOString()
    }

    localStorage.setItem('poshaProfile', JSON.stringify(profileData))
    localStorage.setItem('poshaTheme', themeToSet)
    localStorage.setItem('poshaUserGoals', JSON.stringify(userGoals))
    localStorage.setItem('poshaPainPoints', JSON.stringify(painPoints))

    // CRITICAL: Mark onboarding as complete
    localStorage.setItem('poshaOnboardingComplete', 'true')

    onComplete()
  }

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme)
    setTheme(theme)
  }

  const toggleGoal = (goal) => {
    setUserGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const togglePainPoint = (point) => {
    setPainPoints(prev =>
      prev.includes(point) ? prev.filter(p => p !== point) : [...prev, point]
    )
  }

  const toggleStyleVibe = (vibe) => {
    setStyleVibes(prev =>
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    )
  }

  return (
    <div className="onboarding">
      <div className="onboarding-container">
        {/* Progress Indicator */}
        <div className="progress-bar">
          {[...Array(TOTAL_SLIDES)].map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'completed' : ''}`}
            />
          ))}
        </div>

        {/* Slide Content */}
        <div className="slide-container">
          {currentSlide === 0 && <SlideWelcome isSkipFlow={isSkipFlow} />}
          {currentSlide === 1 && (
            <SlideProfile
              name={name}
              onNameChange={setName}
            />
          )}
          {currentSlide === 2 && (
            <SlideGender
              gender={gender}
              onGenderSelect={setGender}
            />
          )}
          {currentSlide === 3 && (
            <SlideStyleVibes
              styleVibes={styleVibes}
              onToggle={toggleStyleVibe}
            />
          )}
          {currentSlide === 4 && (
            <SlideMakeup
              wantsMakeup={wantsMakeup}
              onSelect={setWantsMakeup}
            />
          )}
          {currentSlide === 5 && (
            <SlidePainPoints
              painPoints={painPoints}
              onToggle={togglePainPoint}
            />
          )}
          {currentSlide === 6 && (
            <SlideGoals
              userGoals={userGoals}
              onToggle={toggleGoal}
            />
          )}
          {currentSlide === 7 && (
            <SlideReady
              name={name}
              gender={gender}
              styleVibes={styleVibes}
              wantsMakeup={wantsMakeup}
              selectedTheme={selectedTheme || themes.SOFT_MUSE}
              goals={userGoals}
              painPoints={painPoints}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="navigation">
          <button
            className="btn-secondary"
            onClick={handleBack}
            disabled={currentSlide === 0}
          >
            Back
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {currentSlide === TOTAL_SLIDES - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Slide 0: Welcome
function SlideWelcome({ isSkipFlow }) {
  return (
    <div className="slide slide-welcome">
      <h1 className="logo-large">पोsha</h1>
      <h2 className="slide-title">
        {isSkipFlow
          ? "Let's personalize your experience"
          : "Stop wasting time deciding what to wear"}
      </h2>
      <p className="slide-text">
        {isSkipFlow
          ? "Complete your profile to unlock personalized outfit recommendations, closet organization, and AI-powered style insights."
          : "In the next 2 minutes, you'll set up your profile and preferences. पोsha will then help you build a wardrobe that actually works."}
      </p>
      {isSkipFlow && (
        <div className="highlight-box" style={{ marginTop: 'var(--space-5)' }}>
          <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
            <strong>Why complete your profile?</strong><br/>
            • Get outfit suggestions based on YOUR style<br/>
            • Track your closet and never forget what you own<br/>
            • Receive personalized shopping recommendations
          </p>
        </div>
      )}
      {!isSkipFlow && (
        <div className="value-preview">
          <div className="value-stat">
            <strong>80%</strong>
            <span>Less decision time</span>
          </div>
          <div className="value-stat">
            <strong>30%</strong>
            <span>Fewer impulse buys</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Slide 1: Profile (Name)
function SlideProfile({ name, onNameChange }) {
  return (
    <div className="slide slide-profile">
      <h2 className="slide-title">What's your name?</h2>
      <p className="slide-subtitle">We'll use this to personalize your experience</p>
      <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name"
          className="profile-input"
          autoFocus
        />
      </div>
    </div>
  )
}

// Slide 2: Gender
function SlideGender({ gender, onGenderSelect }) {
  const genderOptions = [
    { id: 'woman', label: 'Woman', icon: '👗' },
    { id: 'man', label: 'Man', icon: '👔' },
    { id: 'non-binary', label: 'Non-binary', icon: '✨' },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: '🤍' }
  ]

  return (
    <div className="slide slide-gender">
      <h2 className="slide-title">How do you identify?</h2>
      <p className="slide-subtitle">This helps us suggest appropriate outfit styles</p>
      <div className="gender-options">
        {genderOptions.map((option) => (
          <button
            key={option.id}
            className={`gender-option ${gender === option.id ? 'selected' : ''}`}
            onClick={() => onGenderSelect(option.id)}
          >
            <span className="gender-icon">{option.icon}</span>
            <span className="gender-label">{option.label}</span>
            {gender === option.id && <span className="checkmark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

// Slide 3: Style Vibes (minimum 3 required)
function SlideStyleVibes({ styleVibes, onToggle }) {
  const vibes = [
    { id: 'romantic', label: 'Romantic', description: 'Soft, feminine, flowy' },
    { id: 'edgy', label: 'Edgy', description: 'Bold, leather, statement pieces' },
    { id: 'minimalist', label: 'Minimalist', description: 'Clean lines, neutral palette' },
    { id: 'bohemian', label: 'Bohemian', description: 'Free-spirited, eclectic, artsy' },
    { id: 'classic', label: 'Classic', description: 'Timeless, tailored, elegant' },
    { id: 'sporty', label: 'Sporty', description: 'Athletic, comfortable, functional' },
    { id: 'glamorous', label: 'Glamorous', description: 'Luxe, dramatic, eye-catching' },
    { id: 'casual', label: 'Casual', description: 'Relaxed, everyday, effortless' },
    { id: 'preppy', label: 'Preppy', description: 'Polished, collegiate, put-together' },
    { id: 'vintage', label: 'Vintage', description: 'Retro-inspired, nostalgic' }
  ]

  return (
    <div className="slide slide-vibes">
      <h2 className="slide-title">What are your style vibes?</h2>
      <p className="slide-subtitle">
        Select at least 3 vibes for better AI learning
        {styleVibes.length > 0 && ` (${styleVibes.length} selected)`}
      </p>
      <div className="vibe-options">
        {vibes.map((vibe) => (
          <button
            key={vibe.id}
            className={`vibe-option ${styleVibes.includes(vibe.id) ? 'selected' : ''}`}
            onClick={() => onToggle(vibe.id)}
          >
            <div className="vibe-header">
              <h3>{vibe.label}</h3>
              {styleVibes.includes(vibe.id) && <span className="checkmark">✓</span>}
            </div>
            <p>{vibe.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// Slide 4: Makeup Preference
function SlideMakeup({ wantsMakeup, onSelect }) {
  return (
    <div className="slide slide-makeup">
      <h2 className="slide-title">Do you wear makeup?</h2>
      <p className="slide-subtitle">This helps us suggest complete looks including makeup tips</p>
      <div className="makeup-options">
        <button
          className={`makeup-option ${wantsMakeup === true ? 'selected' : ''}`}
          onClick={() => onSelect(true)}
        >
          <span className="makeup-icon">💄</span>
          <h3>Yes, include makeup suggestions</h3>
          <p>Get complete outfit looks with makeup recommendations</p>
          {wantsMakeup === true && <span className="checkmark">✓</span>}
        </button>
        <button
          className={`makeup-option ${wantsMakeup === false ? 'selected' : ''}`}
          onClick={() => onSelect(false)}
        >
          <span className="makeup-icon">✨</span>
          <h3>No, just outfits</h3>
          <p>Focus on clothing and accessories only</p>
          {wantsMakeup === false && <span className="checkmark">✓</span>}
        </button>
      </div>
    </div>
  )
}

// Slide 2: Pain Points
function SlidePainPoints({ painPoints, onToggle }) {
  const problems = [
    {
      id: 'decision-fatigue',
      title: 'Takes forever to decide what to wear',
      description: 'Mornings are stressful because choosing an outfit feels overwhelming',
    },
    {
      id: 'nothing-to-wear',
      title: 'Closet full, but "nothing to wear"',
      description: 'You have clothes but can\'t see good combinations',
    },
    {
      id: 'impulse-buying',
      title: 'Buy clothes that end up unworn',
      description: 'Things look great in store but never feel right at home',
    },
    {
      id: 'weather-mismatch',
      title: 'Always dressed wrong for weather',
      description: 'Too hot, too cold, caught in rain unprepared',
    },
  ]

  return (
    <div className="slide slide-pain">
      <h2 className="slide-title">What frustrates you most?</h2>
      <p className="slide-subtitle">Select all that apply</p>
      <div className="pain-options">
        {problems.map((problem) => (
          <button
            key={problem.id}
            className={`pain-option ${painPoints.includes(problem.id) ? 'selected' : ''}`}
            onClick={() => onToggle(problem.id)}
          >
            <div className="pain-header">
              <h3>{problem.title}</h3>
              {painPoints.includes(problem.id) && (
                <span className="checkmark">✓</span>
              )}
            </div>
            <p>{problem.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// Slide 3: Goals
function SlideGoals({ userGoals, onToggle }) {
  const goals = [
    {
      id: 'save-time',
      title: 'Get ready faster',
      impact: 'Plan outfits weekly, not daily',
    },
    {
      id: 'use-what-i-own',
      title: 'Actually use my clothes',
      impact: 'See new combinations, stop buying duplicates',
    },
    {
      id: 'understand-style',
      title: 'Understand my style',
      impact: 'Learn what colors, fabrics, and cuts work for YOU',
    },
    {
      id: 'stop-waste',
      title: 'Stop wasting money',
      impact: 'Buy only what fills real gaps in your wardrobe',
    },
  ]

  return (
    <div className="slide slide-goals">
      <h2 className="slide-title">What do you want to achieve?</h2>
      <p className="slide-subtitle">Select your top priorities</p>
      <div className="goal-options">
        {goals.map((goal) => (
          <button
            key={goal.id}
            className={`goal-option ${userGoals.includes(goal.id) ? 'selected' : ''}`}
            onClick={() => onToggle(goal.id)}
          >
            <div className="goal-header">
              <h3>{goal.title}</h3>
              {userGoals.includes(goal.id) && (
                <span className="checkmark">✓</span>
              )}
            </div>
            <p className="goal-impact">{goal.impact}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// Slide 4: Theme
function SlideTheme({ selectedTheme, onThemeSelect }) {
  const { themes, themeLabels, themeDescriptions } = useTheme()

  return (
    <div className="slide slide-theme">
      <h2 className="slide-title">Choose your aesthetic</h2>
      <p className="slide-subtitle">You can always change this later</p>
      <div className="theme-selection">
        {Object.values(themes).map((theme) => (
          <button
            key={theme}
            className={`theme-option ${selectedTheme === theme ? 'selected' : ''}`}
            onClick={() => onThemeSelect(theme)}
          >
            <div className="theme-header">
              <h3>{themeLabels[theme]}</h3>
              {selectedTheme === theme && (
                <span className="checkmark">✓</span>
              )}
            </div>
            <p>{themeDescriptions[theme]}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// Slide 7: Ready
function SlideReady({ name, gender, styleVibes, wantsMakeup, selectedTheme, goals, painPoints }) {
  const { themeLabels } = useTheme()

  const genderLabels = {
    'woman': 'Woman',
    'man': 'Man',
    'non-binary': 'Non-binary',
    'prefer-not-to-say': 'Prefer not to say'
  }

  const vibeLabels = {
    'romantic': 'Romantic',
    'edgy': 'Edgy',
    'minimalist': 'Minimalist',
    'bohemian': 'Bohemian',
    'classic': 'Classic',
    'sporty': 'Sporty',
    'glamorous': 'Glamorous',
    'casual': 'Casual',
    'preppy': 'Preppy',
    'vintage': 'Vintage'
  }

  return (
    <div className="slide slide-ready">
      <h2 className="slide-title">Welcome, {name}!</h2>
      <p className="slide-subtitle">Here's your personalized पोsha profile:</p>

      <div className="ready-summary">
        <div className="summary-section">
          <h3>Profile:</h3>
          <p className="profile-info">
            <strong>Gender:</strong> {genderLabels[gender]}<br/>
            <strong>Makeup:</strong> {wantsMakeup ? 'Include in suggestions' : 'Outfits only'}
          </p>
        </div>

        {styleVibes.length > 0 && (
          <div className="summary-section">
            <h3>Your style vibes:</h3>
            <div className="tag-list">
              {styleVibes.map((vibe) => (
                <span key={vibe} className="tag">{vibeLabels[vibe]}</span>
              ))}
            </div>
          </div>
        )}

        {painPoints.length > 0 && (
          <div className="summary-section">
            <h3>Your challenges:</h3>
            <ul>
              {painPoints.map((point) => (
                <li key={point}>
                  {point === 'decision-fatigue' && 'Faster morning decisions'}
                  {point === 'nothing-to-wear' && 'Better outfit combinations'}
                  {point === 'impulse-buying' && 'Smarter purchasing'}
                  {point === 'weather-mismatch' && 'Weather-appropriate outfits'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {goals.length > 0 && (
          <div className="summary-section">
            <h3>Your goals:</h3>
            <ul>
              {goals.map((goal) => (
                <li key={goal}>
                  {goal === 'save-time' && 'Get ready in 5 minutes, not 25'}
                  {goal === 'use-what-i-own' && 'Maximize your current wardrobe'}
                  {goal === 'understand-style' && 'Learn what works for you'}
                  {goal === 'stop-waste' && 'Buy intentionally, not impulsively'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="ready-action">
        <p className="ready-note">
          पोsha learns from what you <strong>actually</strong> wear, not what you think you like.
          The more you log, the smarter it gets.
        </p>
      </div>
    </div>
  )
}

export default Onboarding
