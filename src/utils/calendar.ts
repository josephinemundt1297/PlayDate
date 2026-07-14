import type { PlayDate } from '../domain/playdates'

const escapeIcs=(value:string)=>value.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;')
const stamp=(date:string,time:string)=>`${date.replaceAll('-','')}T${time.replace(':','')}00`

export function downloadCalendar(dates:PlayDate[]){
  const events=dates.map(date=>['BEGIN:VEVENT',`UID:playpal-${date.id}@playpal.app`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,`DTSTART:${stamp(date.date,date.time)}`,`DURATION:PT2H`,`SUMMARY:${escapeIcs(date.title)}`,`LOCATION:${escapeIcs(date.location)}`,`DESCRIPTION:${escapeIcs(`${date.child} mit ${date.friend}. Mitbringen: ${date.bring}`)}`,'END:VEVENT'].join('\r\n')).join('\r\n')
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//PlayPal//PlayDates//DE','CALSCALE:GREGORIAN','METHOD:PUBLISH',events,'END:VCALENDAR'].join('\r\n')
  const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'})); const anchor=document.createElement('a'); anchor.href=url; anchor.download='playpal-playdates.ics'; anchor.click(); URL.revokeObjectURL(url)
}

export function googleCalendarUrl(date:PlayDate){
  const start=stamp(date.date,date.time); const endDate=new Date(`${date.date}T${date.time}:00`); endDate.setHours(endDate.getHours()+2); const end=endDate.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z/,'')
  const query=new URLSearchParams({action:'TEMPLATE',text:date.title,dates:`${start}/${end}`,location:date.location,details:`${date.child} mit ${date.friend}. Mitbringen: ${date.bring}`}); return `https://calendar.google.com/calendar/render?${query}`
}
