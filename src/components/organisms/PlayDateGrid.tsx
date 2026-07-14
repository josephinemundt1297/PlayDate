import { PlayDateCard } from '../molecules/PlayDateCard'
import type { PlayDate } from '../../domain/playdates'
export function PlayDateGrid({ dates, onDelete, onInvite, onCalendar }: { dates: PlayDate[]; onDelete:(id:number)=>void; onInvite:(date:PlayDate)=>void; onCalendar:(date:PlayDate)=>void }) { return <section className="date-grid" aria-label="Anstehende PlayDates">{dates.map(date => <PlayDateCard key={date.id} date={date} onDelete={onDelete} onInvite={() => onInvite(date)} onCalendar={()=>onCalendar(date)}/>)}</section> }
