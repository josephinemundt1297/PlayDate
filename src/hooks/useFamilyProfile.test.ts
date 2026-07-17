import { describe, expect, it, vi } from 'vitest'
import { readFamilyProfile, readSharedBirthdays } from './useFamilyProfile'

describe('Familienprofil', () => {
  it('liefert ein leeres Profil, wenn noch nichts gespeichert wurde', () => {
    expect(readFamilyProfile('user-1')).toEqual({ familyName: '', children: [], caregivers: [] })
  })

  it('holt alte Namenslisten automatisch ins neue Kinderformat', () => {
    vi.stubGlobal('crypto', { randomUUID: () => 'kind-1' })
    localStorage.setItem('playpal.family.user-1', JSON.stringify({ familyName: 'Muster', children: ['Mila'] }))
    expect(readFamilyProfile('user-1')).toEqual({ familyName: 'Muster', children: [{ id: 'kind-1', name: 'Mila', birthday: '', shareBirthday: true }], caregivers: [] })
    vi.unstubAllGlobals()
  })

  it('liest freigegebene Geburtstage verbundener Familien', () => {
    const shared = [{ id: '2', childName: 'Noah', familyName: 'Berger', birthday: '2020-05-12' }]
    localStorage.setItem('playpal.shared-birthdays.user-1', JSON.stringify(shared))
    expect(readSharedBirthdays('user-1')).toEqual(shared)
  })
})
