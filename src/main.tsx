import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PresentationProvider } from './lib/usePresentation'
import './styles/presentation.css'
import './styles/refinements.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PresentationProvider>
      <App />
    </PresentationProvider>
  </React.StrictMode>,
)
