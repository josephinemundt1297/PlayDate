export type PlayDate = {
  id: number
  title: string
  child: string
  friend: string
  date: string
  time: string
  location: string
  bring: string
  status: 'Bestätigt' | 'Ausstehend'
  color: 'mint' | 'peach' | 'lilac'
}

export const initialPlayDates: PlayDate[] = [
  { id: 1, title: 'Abenteuer im Stadtpark', child: 'Mila', friend: 'Noah', date: '2026-07-18', time: '15:00', location: 'Volkspark, Spielplatz West', bring: 'Picknickdecke & Trauben', status: 'Bestätigt', color: 'mint' },
  { id: 2, title: 'Kreativnachmittag', child: 'Mila', friend: 'Leni', date: '2026-07-22', time: '16:00', location: 'Bei Familie Berger', bring: 'Malkittel', status: 'Ausstehend', color: 'peach' },
  { id: 3, title: 'Planschen & Eis', child: 'Jonas', friend: 'Emil', date: '2026-07-27', time: '14:30', location: 'Freibad Pankow', bring: 'Sonnencreme', status: 'Bestätigt', color: 'lilac' },
]
