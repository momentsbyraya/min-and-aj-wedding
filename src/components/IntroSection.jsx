import React from 'react'
import { celebrant, venues } from '../data'

const IntroSection = () => {
  const debutDate = new Date(celebrant.debutant.debut.date)
  const monthLabel = debutDate.toLocaleString('en-US', { month: 'long' })
  const yearLabel = debutDate.getFullYear()
  const selectedDay = debutDate.getDate()
  const firstDayOfMonth = new Date(yearLabel, debutDate.getMonth(), 1).getDay()
  const daysInMonth = new Date(yearLabel, debutDate.getMonth() + 1, 0).getDate()
  const weekLabels = ['S', 'M', 'T', 'W', 'TH', 'F', 'S']
  const calendarCells = [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

    return (
    <section className="relative w-full px-4 sm:px-6 pt-48 pb-10 overflow-hidden" style={{ background: '#fdece4' }}>
      <img
        src="/images/graphics/flower.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[18%] right-[8%] w-16 opacity-35 blur-[2px] pointer-events-none z-0"
      />
      <img
        src="/images/graphics/flower-2.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-[10%] left-[4%] w-24 opacity-25 blur-[3px] pointer-events-none z-0"
      />
      <img
        src="/images/graphics/side-divider.png"
        alt="Decorative divider"
        className="absolute top-14 -left-8 h-auto pointer-events-none z-10 -scale-x-100 -rotate-45"
        style={{ width: '40vw' }}
      />
      <div className="max-w-sm mx-auto">
        <div className="overflow-hidden">
          <div className="px-5 py-5 text-center">
            <h2 className="leading-none mb-3">
              <span className="block font-halimun text-5xl" style={{ color: '#E28B91' }}>
                hello
              </span>
              <span className="block font-rozha text-5xl lowercase mt-1" style={{ color: '#c86f78' }}>
                friends.
              </span>
            </h2>
            <p className="font-poppins text-sm leading-snug" style={{ color: '#d7878e' }}>
              I am so excited to celebrate my special day with you.
              Thank you for being part of my journey.
            </p>
            <div className="mt-10 w-4/5 mx-auto">
              <p className="font-rozha text-base tracking-[0.12em] uppercase" style={{ color: '#E28B91' }}>
                {monthLabel} {yearLabel}
              </p>
              <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs font-rozha uppercase" style={{ color: '#E28B91' }}>
                {weekLabels.map((label, index) => (
                  <span key={`${label}-${index}`}>{label}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm font-rozha" style={{ color: '#E28B91' }}>
                {calendarCells.map((day, index) => {
                  const isSelected = day === selectedDay
                  return (
                    <div key={`${day ?? 'empty'}-${index}`} className="flex items-center justify-center">
                      {day ? (
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${isSelected ? 'bg-[#E28B91] text-white' : ''}`}
                        >
                          {day}
                        </span>
                      ) : (
                        <span className="h-8 w-8" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <p className="font-rozha text-base mt-6 uppercase tracking-[0.08em]" style={{ color: '#E28B91' }}>
              {venues.venue.name}
            </p>
            <a
              href={venues.venue.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-rozha bg-[#E28B91] text-white"
            >
              Get Direction
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
