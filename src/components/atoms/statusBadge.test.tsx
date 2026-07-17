import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusBadge } from './statusBadge'

describe('StatusBadge', () => {
  it('zeigt einen bestätigten Termin verständlich an', () => {
    render(<StatusBadge status="Bestätigt" />)
    expect(screen.getByText('Bestätigt')).toHaveClass('confirmed')
  })

  it('markiert eine offene Anfrage nicht als bestätigt', () => {
    render(<StatusBadge status="Ausstehend" />)
    expect(screen.getByText('Ausstehend')).not.toHaveClass('confirmed')
  })

  it('zeigt eine Absage zusätzlich zum Farbzustand als Text', () => {
    render(<StatusBadge status="Abgesagt" />)
    expect(screen.getByText('Abgesagt')).toHaveClass('cancelled')
  })
})
