import { celebrant } from '../data'

const parseLocalDate = (dateString) => {
  const [year, month, day] = String(dateString || '').split('-').map(Number)
  if (year && month && day) return new Date(year, month - 1, day)
  return new Date(dateString)
}

export const getTimeUntilWedding = () => {
  const weddingDate = parseLocalDate(celebrant.debutant.debut.date)
  const rawTime = String(celebrant.debutant.debut.time || '3:00 PM')
  const isPm = /PM/i.test(rawTime)
  const [hourPart, minutePart] = rawTime.replace(/\s*(AM|PM)/i, '').split(':').map(Number)
  const hour24 = Number.isFinite(hourPart) ? (isPm && hourPart < 12 ? hourPart + 12 : hourPart) : 15
  weddingDate.setHours(hour24, Number.isFinite(minutePart) ? minutePart : 0, 0, 0)
  const now = new Date()
  const difference = weddingDate - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds
  }
} 