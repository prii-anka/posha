import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { saveBetaUser } from '../services/userService'
import './Auth.css'

function Auth({ onComplete, onSkip }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let userCredential

      if (isSignUp) {
        // Create new user
        userCredential = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      }

      const user = userCredential.user
      const userData = {
        name: name || email.split('@')[0],
        email: user.email,
        signupMethod: 'email',
        onboardingCompleted: false
      }

      // Save to localStorage
      localStorage.setItem('poshaUser', JSON.stringify(userData))
      localStorage.setItem('poshaIsAuthenticated', 'true')

      // Save to Firebase Firestore
      if (isSignUp) {
        await saveBetaUser(userData)
      }

      onComplete(userData)
    } catch (err) {
      console.error('Auth error:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Try signing in instead.')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.')
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found. Please sign up first.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.')
      } else {
        setError('Authentication failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userData = {
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        signupMethod: 'google',
        onboardingCompleted: false
      }

      // Save to localStorage
      localStorage.setItem('poshaUser', JSON.stringify(userData))
      localStorage.setItem('poshaIsAuthenticated', 'true')

      // Save to Firebase Firestore
      await saveBetaUser(userData)

      onComplete(userData)
    } catch (err) {
      console.error('Google auth error:', err)
      console.error('Error code:', err.code)
      console.error('Error message:', err.message)

      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.')
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.')
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized. Please add it in Firebase Console.')
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Google sign-in is not enabled in Firebase.')
      } else {
        setError(`Google sign-in failed: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
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
            onClick={handleGoogleAuth}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
            </svg>
            {loading ? 'Loading...' : 'Continue with Google'}
          </button>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Email Auth Form */}
        <form onSubmit={handleEmailAuth} className="auth-form">
          {error && (
            <div className="auth-error" role="alert" aria-live="polite">
              {error}
            </div>
          )}

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
                aria-required="true"
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
              aria-required="true"
              aria-invalid={error && error.includes('email') ? 'true' : 'false'}
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
              aria-required="true"
              aria-invalid={error && error.includes('password') ? 'true' : 'false'}
              aria-describedby="password-requirements"
            />
            <span id="password-requirements" className="visually-hidden">
              Password must be at least 6 characters long
            </span>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
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
