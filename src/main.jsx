import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './router.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter className="bg-gray-50" />
  </StrictMode>
)
