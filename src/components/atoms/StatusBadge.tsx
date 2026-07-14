import type { PlayDate } from '../../domain/playdates'
export function StatusBadge({ status }: Pick<PlayDate, 'status'>) { return <span className={`status ${status === 'Bestätigt' ? 'confirmed' : ''}`}>{status}</span> }
