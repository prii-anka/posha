import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  // Get user's style vibes from profile
  const userProfile = useMemo(() => {
    const storedProfile = localStorage.getItem('poshaProfile')
    return storedProfile ? JSON.parse(storedProfile) : null
  }, [])

  const styleVibes = userProfile?.styleVibes || []

  // Select images based on user's style vibes
  const getStyleBasedImages = () => {
    const imagesByVibe = {
      romantic: {
        hero: '/images/landing/romantic-hero.jpg',
        solution1: '/images/landing/romantic-solution1.jpg',
        solution2: '/images/landing/romantic-solution2.jpg',
        solution3: '/images/landing/romantic-solution3.jpg'
      },
      edgy: {
        hero: '/images/landing/edgy-hero.jpg',
        solution1: '/images/landing/edgy-solution1.jpg',
        solution2: '/images/landing/edgy-solution2.jpg',
        solution3: '/images/landing/edgy-solution3.jpg'
      },
      minimalist: {
        hero: '/images/landing/minimalist-hero.jpg',
        solution1: '/images/landing/minimalist-solution1.jpg',
        solution2: '/images/landing/minimalist-solution2.jpg',
        solution3: '/images/landing/romantic-solution2.jpg'
      },
      bohemian: {
        hero: '/images/landing/bohemian-hero.jpg',
        solution1: '/images/landing/bohemian-solution1.jpg',
        solution2: '/images/landing/bohemian-solution2.jpg',
        solution3: '/images/landing/bohemian-solution3.jpg'
      },
      classic: {
        hero: '/images/landing/romantic-solution2.jpg',
        solution1: '/images/landing/classic-solution1.jpg',
        solution2: '/images/landing/edgy-solution1.jpg',
        solution3: '/images/landing/romantic-hero.jpg'
      },
      sporty: {
        hero: '/images/landing/sporty-hero.jpg',
        solution1: '/images/landing/sporty-solution1.jpg',
        solution2: '/images/landing/sporty-solution2.jpg',
        solution3: '/images/landing/sporty-solution3.jpg'
      },
      glamorous: {
        hero: '/images/landing/romantic-hero.jpg',
        solution1: '/images/landing/minimalist-hero.jpg',
        solution2: '/images/landing/romantic-solution3.jpg',
        solution3: '/images/landing/edgy-solution1.jpg'
      },
      casual: {
        hero: '/images/landing/edgy-hero.jpg',
        solution1: '/images/landing/minimalist-solution2.jpg',
        solution2: '/images/landing/minimalist-solution1.jpg',
        solution3: '/images/landing/casual-solution3.jpg'
      },
      preppy: {
        hero: '/images/landing/minimalist-solution1.jpg',
        solution1: '/images/landing/edgy-solution1.jpg',
        solution2: '/images/landing/preppy-solution2.jpg',
        solution3: '/images/landing/romantic-hero.jpg'
      },
      vintage: {
        hero: '/images/landing/romantic-hero.jpg',
        solution1: '/images/landing/vintage-solution1.jpg',
        solution2: '/images/landing/classic-solution1.jpg',
        solution3: '/images/landing/romantic-solution3.jpg'
      }
    }

    // Use first style vibe if available, otherwise default to minimalist
    const primaryVibe = styleVibes[0] || 'minimalist'
    return imagesByVibe[primaryVibe] || imagesByVibe.minimalist
  }

  const images = getStyleBasedImages()

  const problems = [
    {
      stat: '23',
      unit: 'minutes',
      label: 'Average time people spend deciding what to wear each day',
    },
    {
      stat: '40%',
      unit: '',
      label: 'Of your closet never actually gets worn',
    },
    {
      stat: '$1,800',
      unit: '',
      label: 'Spent annually on clothes that don\'t work for you',
    },
  ]

  const solutions = [
    {
      title: 'Stop Decision Fatigue',
      problem: 'Staring at a full closet feeling like you have nothing to wear?',
      solution: 'पोsha learns what you actually wear and why. Get ready in 5 minutes, not 25.',
      impact: 'Save 2+ hours per week',
      icon: '⏱️',
    },
    {
      title: 'Maximize What You Own',
      problem: 'Buying new clothes while perfectly good items sit unused?',
      solution: 'Discover outfit combinations you never considered. See what\'s missing vs. what\'s redundant.',
      impact: 'Reduce purchases by 30%',
      icon: '♻️',
    },
    {
      title: 'Dress With Intention',
      problem: 'Clothes that looked great in store but never feel right on you?',
      solution: 'Learn YOUR color palette, YOUR fabrics, YOUR proportions. Make every purchase count.',
      impact: 'End buyer\'s remorse',
      icon: '🎯',
    },
  ]

  const handleEnter = () => {
    navigate('/dashboard')
  }

  return (
    <div className="landing">
      {/* Hero Section - Problem Statement */}
      <div className="landing-hero">
        <div className="hero-content">
          <h1 className="brand-title">पोsha</h1>
          <h2 className="hero-headline">
            Stop wasting time and money on clothes you don't wear
          </h2>
          <p className="hero-subtext">
            Your wardrobe has everything you need. You just need to see it differently.
          </p>
          <button className="cta-primary" onClick={handleEnter}>
            Get Started
          </button>
          <p className="cta-note">No credit card. No fluff. Just better decisions.</p>
        </div>
        <div className="hero-image">
          <img
            src={images.hero}
            alt="Personalized style inspiration"
            className="hero-img"
          />
          <div className="hero-image-overlay"></div>
        </div>
      </div>

      {/* Problem Stats */}
      <div className="problem-section">
        <h2 className="section-title">You're not alone</h2>
        <div className="problem-stats">
          {problems.map((item, index) => (
            <div key={index} className="problem-stat">
              <div className="stat-number">
                {item.stat}
                {item.unit && <span className="stat-unit">{item.unit}</span>}
              </div>
              <div className="stat-description">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="problem-insight">
          The average person uses only 20-30% of their wardrobe regularly.
          The rest? Guilt, clutter, and wasted money.
        </p>
      </div>

      {/* Solutions */}
      <div className="solutions-section">
        <h2 className="section-title">How पोsha helps</h2>
        <div className="solutions-grid">
          <div className="solution-card solution-card-with-image">
            <div className="solution-image">
              <img
                src={images.solution1}
                alt="Quick outfit selection"
              />
            </div>
            <div className="solution-content">
              <div className="solution-icon">⏱️</div>
              <h3 className="solution-title">Stop Decision Fatigue</h3>
              <p className="solution-problem">Staring at a full closet feeling like you have nothing to wear?</p>
              <p className="solution-answer">पोsha learns what you actually wear and why. Get ready in 5 minutes, not 25.</p>
              <div className="solution-impact">Save 2+ hours per week</div>
            </div>
          </div>

          <div className="solution-card solution-card-with-image">
            <div className="solution-image">
              <img
                src={images.solution2}
                alt="Wardrobe organization"
              />
            </div>
            <div className="solution-content">
              <div className="solution-icon">♻️</div>
              <h3 className="solution-title">Maximize What You Own</h3>
              <p className="solution-problem">Buying new clothes while perfectly good items sit unused?</p>
              <p className="solution-answer">Discover outfit combinations you never considered. See what's missing vs. what's redundant.</p>
              <div className="solution-impact">Reduce purchases by 30%</div>
            </div>
          </div>

          <div className="solution-card solution-card-with-image">
            <div className="solution-image">
              <img
                src={images.solution3}
                alt="Stylish outfits"
              />
            </div>
            <div className="solution-content">
              <div className="solution-icon">🎯</div>
              <h3 className="solution-title">Dress With Intention</h3>
              <p className="solution-problem">Clothes that looked great in store but never feel right on you?</p>
              <p className="solution-answer">Learn YOUR color palette, YOUR fabrics, YOUR proportions. Make every purchase count.</p>
              <div className="solution-impact">End buyer's remorse</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-section">
        <h2 className="section-title">Simple. Private. Effective.</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="step-number">1</div>
            <h3 className="step-title">Add What You Own</h3>
            <p className="step-description">
              Photo or text — catalog your closet in minutes.
              Everything stays on YOUR device, always.
            </p>
          </div>
          <div className="how-step">
            <div className="step-number">2</div>
            <h3 className="step-title">Log What You Wear</h3>
            <p className="step-description">
              Track outfits, weather, mood, occasion.
              पोsha learns your real patterns, not what you think you like.
            </p>
          </div>
          <div className="how-step">
            <div className="step-number">3</div>
            <h3 className="step-title">Get Smart Insights</h3>
            <p className="step-description">
              See what you actually wear, what's missing, what colors work.
              Make intentional choices, not impulse buys.
            </p>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="value-section">
        <div className="value-content">
          <h2 className="section-title">What you get</h2>
          <div className="value-list">
            <div className="value-item">
              <svg className="value-check" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="value-text">
                <strong>Weather-matched outfit suggestions</strong> — Never guess what to wear again
              </div>
            </div>
            <div className="value-item">
              <svg className="value-check" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="value-text">
                <strong>Color & fabric analysis</strong> — Learn what actually flatters you
              </div>
            </div>
            <div className="value-item">
              <svg className="value-check" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="value-text">
                <strong>Wear frequency tracking</strong> — Identify your true favorites vs. closet clutter
              </div>
            </div>
            <div className="value-item">
              <svg className="value-check" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="value-text">
                <strong>Weekly outfit planner</strong> — Plan Sunday, breeze through Monday-Friday
              </div>
            </div>
            <div className="value-item">
              <svg className="value-check" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="value-text">
                <strong>Fashion education built-in</strong> — Understand the "why" behind every choice
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="final-cta">
        <h2 className="cta-headline">Ready to use what you already have?</h2>
        <p className="cta-subtext">
          Join hundreds who've reduced decision time by 80% and shopping by 30%.
        </p>
        <button className="cta-primary" onClick={handleEnter}>
          Start Using पोsha Now
        </button>
        <p className="cta-note">Free forever. No tricks. Just results.</p>
      </div>

      <footer className="landing-footer">
        <p className="footer-text">पोsha — Your wardrobe, but smarter</p>
      </footer>
    </div>
  )
}

export default Landing
