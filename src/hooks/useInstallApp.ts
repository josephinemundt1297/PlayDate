import { useEffect, useState } from 'react'

interface InstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }

export function useInstallApp() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(matchMedia('(display-mode: standalone)').matches)
  useEffect(() => {
    const ready = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPromptEvent) }
    const done = () => { setInstalled(true); setPrompt(null) }
    window.addEventListener('beforeinstallprompt', ready)
    window.addEventListener('appinstalled', done)
    return () => { window.removeEventListener('beforeinstallprompt', ready); window.removeEventListener('appinstalled', done) }
  }, [])
  const install = async () => { if (!prompt) return false; await prompt.prompt(); const choice = await prompt.userChoice; if (choice.outcome === 'accepted') setPrompt(null); return choice.outcome === 'accepted' }
  return { canInstall: Boolean(prompt), installed, install }
}
