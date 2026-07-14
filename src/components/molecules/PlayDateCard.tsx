import { Clock3, Edit3, Gift, MapPin, Send, Trash2, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { PlayDate } from '../../domain/playdates'
import { StatusBadge } from '../atoms/StatusBadge'

export function PlayDateCard({ date, onDelete, onInvite }: { date: PlayDate; onDelete: (id:number)=>void; onInvite:()=>void }) {
  const formatted = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(date.date))
  const parts = formatted.split(' ')
  return <article className={`date-card ${date.color}`}><div className="card-top"><StatusBadge status={date.status}/><div className="card-actions"><Link to="/edit/$playDateId" params={{ playDateId: String(date.id) }} aria-label={`${date.title} bearbeiten`}><Edit3/></Link><button onClick={() => onDelete(date.id)} aria-label={`${date.title} löschen`}><Trash2/></button></div></div><div className="date-badge"><strong>{parts[1]}</strong><span>{parts[2]}</span></div><h3>{date.title}</h3><p><Users/> {date.child} & {date.friend}</p><p><Clock3/> {parts[0]}, {date.time} Uhr</p><p><MapPin/> {date.location}</p><p><Gift/> {date.bring}</p><button className="invite-button" onClick={onInvite}><Send/> Einladung teilen</button></article>
}
