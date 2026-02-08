/**
 * Application Entry Point
 *
 * Mounts the React app into the DOM and wraps it in StrictMode
 * for development-time checks and warnings.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
