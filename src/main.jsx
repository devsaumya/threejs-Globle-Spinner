import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ParentGlobeApp from './ParentGlobe.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParentGlobeApp />
  </StrictMode>,
)
