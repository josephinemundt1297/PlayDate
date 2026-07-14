import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { initialPlayDates, type PlayDate } from '../domain/playdates'

const storageKey = (userId: string) => `playpal.playdates.${userId}`

export function readPlayDates(userId: string): PlayDate[] {
  const stored = localStorage.getItem(storageKey(userId))
  return stored ? JSON.parse(stored) : initialPlayDates
}

export function usePlayDates() {
  const { user } = useUser()
  if (!user) throw new Error('PlayDate-Daten dürfen nur angemeldet geladen werden')
  const [dates, setDates] = useState<PlayDate[]>(() => readPlayDates(user.id))
  const save = (next: PlayDate[]) => {
    setDates(next)
    localStorage.setItem(storageKey(user.id), JSON.stringify(next))
  }
  return { dates, save }
}
