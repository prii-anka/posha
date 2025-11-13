import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PoshaDataProvider } from './context/PoshaDataContext.jsx'
import { PoshaProfileProvider } from './context/PoshaProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PoshaProfileProvider>
        <PoshaDataProvider>
          <App />
        </PoshaDataProvider>
      </PoshaProfileProvider>
    </ThemeProvider>
  </StrictMode>,
)
