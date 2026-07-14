import { ChevronRight, type LucideIcon } from 'lucide-react'
export function QuickAction({ icon: Icon, tone, title, description, onClick }: { icon: LucideIcon; tone: string; title: string; description: string; onClick: () => void }) {
  return <button onClick={onClick}><span className={`quick-icon ${tone}`}><Icon/></span><span><strong>{title}</strong><small>{description}</small></span><ChevronRight/></button>
}
