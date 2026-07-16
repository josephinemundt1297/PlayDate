import { describe, expect, it, vi } from 'vitest'
import { downloadCalendar, googleCalendarUrl } from './calendar'
import type { playDate } from '../domain/playdates'

const date: playDate = { id: 7, title: 'Park & Eis', child: 'Mila', friend: 'Noah', date: '2026-08-02', time: '15:30', location: 'Stadtpark', bring: 'Wasser', status: 'Bestätigt', color: 'mint' }

describe('Kalenderfunktionen', () => {
  it('baut einen passenden Google-Kalender-Link', () => {
    const url = googleCalendarUrl(date)
    expect(url).toContain('calendar.google.com/calendar/render')
    expect(url).toContain('text=Park+%26+Eis')
    expect(url).toContain('dates=20260802T153000%2F20260802T173000')
  })

  it('erstellt beim Export eine Kalenderdatei', () => {
    const createObjectURL = vi.fn(() => 'blob:playDate')
    const revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    downloadCalendar([date])
    expect(createObjectURL).toHaveBeenCalledOnce()
    expect(click).toHaveBeenCalledOnce()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:playDate')
    vi.unstubAllGlobals()
  })
})
