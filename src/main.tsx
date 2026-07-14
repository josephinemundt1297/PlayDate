import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider } from '@tanstack/react-router'
import { AuthGate } from './components/templates/AuthGate'
import { ThemeProvider } from './context/ThemeContext'
import { router } from './router'
import './index.css'
import './App.css'

const clerkKey=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function MissingConfiguration(){return <main className="auth-page"><section className="auth-card"><span className="auth-logo">!</span><p className="eyebrow">Einrichtung erforderlich</p><h1>Login noch nicht konfiguriert</h1><p>PlayDate-Daten bleiben gesperrt, bis ein gültiger Clerk Publishable Key hinterlegt ist.</p><code>VITE_CLERK_PUBLISHABLE_KEY</code></section></main>}

const content=clerkKey?<ClerkProvider publishableKey={clerkKey}><AuthGate><RouterProvider router={router}/></AuthGate></ClerkProvider>:<MissingConfiguration/>
createRoot(document.getElementById('root')!).render(<StrictMode><ThemeProvider>{content}</ThemeProvider></StrictMode>)

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'))}
