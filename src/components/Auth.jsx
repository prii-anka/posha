import { useState } from 'react'
import './Auth.css'

function Auth({ onComplete, onSkip }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleEmailAuth = (e) => {
    e.preventDefault()
    // Mock authentication - in production, this would call your backend
    const userData = {
      name: name || email.split('@')[0],
      email,
      authMethod: 'email',
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('poshaUser', JSON.stringify(userData))
    localStorage.setItem('poshaIsAuthenticated', 'true')
    onComplete(userData)
  }

  const handleSocialAuth = (provider) => {
    // Mock social auth - in production, this would use OAuth
    const userData = {
      name: `User from ${provider}`,
      email: `user@${provider}.com`,
      authMethod: provider,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('poshaUser', JSON.stringify(userData))
    localStorage.setItem('poshaIsAuthenticated', 'true')
    onComplete(userData)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">पोsha</h1>
          <h2 className="auth-title">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="auth-subtitle">
            {isSignUp
              ? 'Join thousands making smarter wardrobe decisions'
              : 'Sign in to continue your fashion journey'}
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="auth-social">
          <button
            className="auth-social-btn google"
            onClick={() => handleSocialAuth('google')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button
            className="auth-social-btn apple"
            onClick={() => handleSocialAuth('apple')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.586 13.398c-.272.652-.599 1.252-.982 1.798-.526.751-1.15 1.2-1.872 1.35-.456.088-.95.008-1.483-.24-.532-.25-1.024-.376-1.476-.376-.467 0-.963.127-1.49.376-.527.251-1.012.339-1.456.264-.74-.125-1.374-.577-1.902-1.356a10.405 10.405 0 01-1.97-6.172c0-1.373.304-2.556.914-3.548.79-1.28 1.94-1.92 3.45-1.92.629 0 1.257.164 1.883.492.626.328 1.031.492 1.214.492.14 0 .545-.195 1.215-.586a4.37 4.37 0 011.916-.586c.725 0 1.365.178 1.92.534.3.193.565.427.795.702-.78.474-1.338 1.012-1.675 1.614-.436.782-.654 1.64-.654 2.574 0 1.052.255 1.975.764 2.766.382.594.857 1.058 1.425 1.392-.128.374-.266.733-.414 1.076zM13.036 1.496c.001.147-.01.294-.033.44a2.91 2.91 0 01-.292.85 3.186 3.186 0 01-.753.925c-.348.293-.792.494-1.332.603a3.27 3.27 0 01-.033-.46c0-.67.244-1.316.732-1.938.488-.623 1.206-1.06 2.154-1.312.01.088.016.178.018.268z"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Email Auth Form */}
        <form onSubmit={handleEmailAuth} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Sign In/Sign Up */}
        <div className="auth-toggle">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="auth-toggle-btn"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Skip Option */}
        <div className="auth-skip">
          <button
            type="button"
            onClick={onSkip}
            className="auth-skip-btn"
          >
            Skip for now
          </button>
          <p className="auth-skip-note">
            You'll miss out on personalized recommendations and cloud sync
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth
