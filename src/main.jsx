import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import CookieConsentProvider from './components/CookieConsentProvider'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><CookieConsentProvider><App /></CookieConsentProvider></BrowserRouter></StrictMode>,
)
