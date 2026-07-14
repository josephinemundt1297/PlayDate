import { Outlet } from '@tanstack/react-router'
import { AppHeader } from '../organisms/AppHeader'
import { BottomNavigation } from '../organisms/BottomNavigation'
export function AppShell() { return <div className="app-shell"><a className="skip-link" href="#main">Zum Inhalt springen</a><AppHeader/><main id="main"><Outlet/></main><BottomNavigation/></div> }
