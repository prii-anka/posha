import { useState } from 'react'
import MainLayout from './MainLayout.jsx'
import FashionChat from './FashionChat.jsx'
import InsightsGrid from './insights/InsightsGrid.jsx'
import './Shell.css'

function Shell() {
  const [currentView, setCurrentView] = useState('chat') // 'chat' or 'insights'

  return (
    <MainLayout>
      <div className="shell-inner">
        {currentView === 'chat' ? <FashionChat /> : <InsightsGrid />}
      </div>
    </MainLayout>
  )
}

export default Shell
