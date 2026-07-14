import { Download, Sparkles } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { UserButton } from '@clerk/clerk-react'
import { ThemeToggle } from '../atoms/ThemeToggle'
import { useInstallApp } from '../../hooks/useInstallApp'

export function AppHeader() {
  const { canInstall, installed, install } = useInstallApp()
  return <header className="topbar"><Link to="/" className="brand" aria-label="PlayPal Startseite"><span className="brand-mark"><Sparkles size={20}/></span><span>Play<span>Pal</span></span></Link><nav className="desktop-nav" aria-label="Hauptnavigation"><Link to="/" activeProps={{ className:'active' }}>Übersicht</Link><Link to="/playdates" activeProps={{ className:'active' }}>PlayDates</Link><Link to="/families" activeProps={{ className:'active' }}>Familien</Link></nav><div className="header-actions"><ThemeToggle/><button className="install-button" onClick={install} disabled={!canInstall || installed} title={installed ? 'App ist installiert' : canInstall ? 'PlayPal installieren' : 'Installation im Browsermenü verfügbar'}><Download/><span>{installed ? 'Installiert' : 'App laden'}</span></button><UserButton/></div></header>
}
