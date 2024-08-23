import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './router.jsx'
import { BebidaProvider } from './context/BebidaProvider.jsx'
import { RouterProvider } from 'react-router-dom'




createRoot(document.getElementById('root')).render(
  <BebidaProvider>
    <StrictMode>
      <AppRouter/>
    </StrictMode>

  </BebidaProvider>
)
