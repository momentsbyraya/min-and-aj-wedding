import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail } from 'react-icons/fi'
import { celebrant } from '../data'
import GraphicButton from './GraphicButton'
import { RSVP_FORM_EMBED_SRC } from './RSVPModal'

gsap.registerPlugin(ScrollTrigger)

const IntroSection = () => {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false)
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const calendarRef = useRef(null)
  const buttonWrapRef = useRef(null)
  const debutDate = new Date(celebrant.debutant.debut.date)
  const monthLabel = debutDate.toLocaleString('en-US', { month: 'long' })
  const yearLabel = debutDate.getFullYear()
  const selectedDay = debutDate.getDate()
  const firstDayOfMonth = new Date(yearLabel, debutDate.getMonth(), 1).getDay()
  const daysInMonth = new Date(yearLabel, debutDate.getMonth() + 1, 0).getDate()
  const weekLabels = ['S', 'M', 'T', 'W', 'TH', 'F', 'S']
  const calendarCells = [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  useEffect(() => {
    const dayNumbers = calendarRef.current?.querySelectorAll('.calendar-day-number') || []

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        end: 'bottom 35%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      copyRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(
        calendarRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        dayNumbers,
        { opacity: 0, y: 8, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: 'power2.out',
          stagger: 0.12
        },
        '-=0.2'
      )
      .fromTo(
        buttonWrapRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        '-=0.25'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-28 pb-32 overflow-hidden md:pt-52 md:pb-44"
      style={{ backgroundColor: '#0a8885' }}
    >
      <img
        src="/images/graphics/fan%20flower%20-%201.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/lantern-1.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--lantern absolute top-0 right-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left absolute bottom-0 left-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/flower-right.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-right absolute bottom-0 right-0 h-auto pointer-events-none z-10"
      />
      <div className="relative z-20 mx-auto max-w-sm px-5 sm:px-7">
        <p
          ref={copyRef}
          className="mb-6 text-center font-poppins text-sm leading-snug sm:mb-7"
          style={{ color: '#EFE9DC' }}
        >
          I am so excited to celebrate my special day with you.
          Thank you for being part of my journey!
        </p>
        <div className="px-7 py-10 text-center sm:px-10 sm:py-12 md:px-12 md:py-14">
          <div ref={calendarRef} className="w-4/5 mx-auto">
            <p className="font-rozha text-2xl tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#E5C988] via-[#FFFEF2] to-[#E5C988] bg-clip-text text-transparent">
                {monthLabel} {yearLabel}
              </span>
            </p>
            <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs font-rozha uppercase" style={{ color: '#ffffff' }}>
              {weekLabels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm font-rozha" style={{ color: '#ffffff' }}>
              {calendarCells.map((day, index) => {
                const isSelected = day === selectedDay
                return (
                  <div key={`${day ?? 'empty'}-${index}`} className="flex items-center justify-center">
                    {day ? (
                      <span
                        className={`calendar-day-number flex h-8 w-8 items-center justify-center rounded-full ${isSelected ? 'calendar-day-active' : ''}`}
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
        </div>
        <div ref={buttonWrapRef} className="mt-6 flex w-full justify-center">
          <GraphicButton
            imageSrc="/images/graphics/button-container.png"
            onClick={() => setIsRsvpModalOpen(true)}
            className="graphic-button--cta attendance-confirm-button shrink-0"
            contentClassName="font-beautyofthebeast lowercase mb-2"
          >
            <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
              respond
            </span>
            <FiMail className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
          </GraphicButton>
        </div>
      </div>
      {isRsvpModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 px-0">
          <div className="relative w-screen h-screen bg-[#F0FAF9] p-4 sm:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <button
              type="button"
              onClick={() => setIsRsvpModalOpen(false)}
              className="absolute right-4 top-4 z-10 font-poppins text-xs uppercase tracking-[0.2em] text-[#0a3F3D]"
            >
              Close
            </button>
            <div className="mt-8 h-[calc(100vh-114px)] w-full overflow-hidden bg-white">
              <iframe
                title="RSVP for the debut celebration of Yrenea"
                src={RSVP_FORM_EMBED_SRC}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default IntroSection
