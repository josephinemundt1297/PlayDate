import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme, type Theme } from '../../context/ThemeContext'

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Helles Design', icon: Sun }, { value: 'dark', label: 'Dunkles Design', icon: Moon }, { value: 'system', label: 'Systemeinstellung', icon: Laptop },
]
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return <div className="theme-toggle" role="group" aria-label="Farbschema wählen">{options.map(({ value, label, icon: Icon }) => <button key={value} className={theme === value ? 'active' : ''} onClick={() => setTheme(value)} aria-label={label} aria-pressed={theme === value}><Icon/></button>)}</div>
}
