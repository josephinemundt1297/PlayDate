import { CalendarPlus, Clock3, Edit3, Gift, MapPin, Send, Trash2, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { PlayDate } from '../../domain/playdates'
import { StatusBadge } from '../atoms/StatusBadge'

export function PlayDateCard({ date, onDelete, onInvite, onCalendar }: { date: PlayDate; onDelete: (id:number)=>void; onInvite:()=>void; onCalendar:()=>void }) {
  const value=new Date(`${date.date}T12:00:00`); const weekday=new Intl.DateTimeFormat('de-DE',{weekday:'short'}).format(value).replace(/\.$/,''); const day=new Intl.DateTimeFormat('de-DE',{day:'2-digit'}).format(value); const month=new Intl.DateTimeFormat('de-DE',{month:'short'}).format(value).replace(/\.$/,'')
  return <article className={`date-card ${date.color}`}><div className="card-top"><StatusBadge status={date.status}/><div className="card-actions"><button onClick={onCalendar} aria-label={`${date.title} zu Google Kalender hinzufügen`}><CalendarPlus/></button><Link to="/edit/$playDateId" params={{ playDateId: String(date.id) }} aria-label={`${date.title} bearbeiten`}><Edit3/></Link><button onClick={() => onDelete(date.id)} aria-label={`${date.title} löschen`}><Trash2/></button></div></div><div className="date-badge"><strong>{day}.</strong><span>{month}</span></div><h3>{date.title}</h3><p><Users/> {date.child} & {date.friend}</p><p><Clock3/> {weekday}, {date.time} Uhr</p><p><MapPin/> {date.location}</p><p><Gift/> {date.bring}</p><button className="invite-button" onClick={onInvite}><Send/> Einladung teilen</button></article>
}
