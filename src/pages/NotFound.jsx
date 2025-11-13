import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-emoji">👗</div>
        <h1 className="notfound-title">Oops! This outfit doesn't exist</h1>
        <p className="notfound-code">404</p>
        <p className="notfound-message">
          Looks like this page went out of style... or never existed in the first place.
        </p>
        <div className="notfound-actions">
          <button
            className="notfound-btn primary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
          <button
            className="notfound-btn secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
        <p className="notfound-tip">
          Lost? पोsha is here to help you find your style, not this page.
        </p>
      </div>
    </div>
  )
}

export default NotFound
