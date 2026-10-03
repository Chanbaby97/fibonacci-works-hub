import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FibonacciWorksHub from './workshop-hub.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FibonacciWorksHub />
  </StrictMode>,
)
