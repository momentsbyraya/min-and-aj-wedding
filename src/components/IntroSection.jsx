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
    if (!isRsvpModalOpen) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isRsvpModalOpen])

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
      className="relative w-full pt-60 pb-32 overflow-hidden bg-cover bg-center bg-no-repeat md:pt-96 md:pb-44"
      style={{
        backgroundColor: '#e5d7ed',
        backgroundImage: 'url(/images/graphics/palace.png)'
      }}
    >
      <div className="soft-blob absolute top-[15%] right-[12%] w-48 h-48 z-[1]" aria-hidden="true" />
      <div className="soft-blob soft-blob--alt soft-blob--small absolute bottom-[22%] left-[10%] w-36 h-36 z-[1]" aria-hidden="true" />
      <img
        src="/images/graphics/fan%20flower%20-%201.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/butterfly-half-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--lantern absolute top-0 right-0 h-auto pointer-events-none z-10 scale-x-[-1]"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left absolute bottom-0 left-0 h-auto pointer-events-none z-10"
      />
      <div className="relative z-20 mx-auto max-w-sm px-5 sm:px-7">
        <p
          ref={copyRef}
          className="mb-6 text-center font-beautyofthebeast text-2xl leading-snug sm:mb-7 sm:text-3xl md:text-4xl"
          style={{ color: '#3f3348' }}
        >
          I am so excited to celebrate my special day with you.
          Thank you for being part of my journey!
        </p>
        <div className="intro-content-soft-panel px-7 py-10 text-center sm:px-10 sm:py-12 md:px-12 md:py-14">
          <div ref={calendarRef} className="w-4/5 mx-auto origin-top scale-125 sm:scale-[1.35]">
            <p className="font-rozha text-2xl tracking-[0.12em] uppercase">
              <span className="bg-gradient-to-r from-[#5a4868] via-[#c9b4d4] to-[#3f3348] bg-clip-text text-transparent">
                {monthLabel} {yearLabel}
              </span>
            </p>
            <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs font-poppins uppercase" style={{ color: '#3f3348' }}>
              {weekLabels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm font-poppins" style={{ color: '#3f3348' }}>
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
            className="graphic-button--cta graphic-button--cta-centered attendance-confirm-button shrink-0"
            contentClassName="font-beautyofthebeast lowercase !mb-0 items-center"
          >
            <span style={{ color: '#3f3348' }}>
              respond
            </span>
            <FiMail className="h-5 w-5 shrink-0 text-[#5a4868]" aria-hidden="true" />
          </GraphicButton>
        </div>
      </div>
      {isRsvpModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center px-0">
          <div
            className="absolute inset-0 bg-black/65 modal-overlay-fade"
            onClick={() => setIsRsvpModalOpen(false)}
            aria-hidden
          />
          <div className="modal-slide-up-panel relative w-screen h-screen bg-[#fae8ce] p-4 sm:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <button
              type="button"
              onClick={() => setIsRsvpModalOpen(false)}
              className="absolute right-4 top-4 z-10 font-poppins text-xs uppercase tracking-[0.2em] text-[#3f3348]"
            >
              Close
            </button>
            <div className="mt-8 h-[calc(100vh-114px)] w-full overflow-hidden bg-white">
              <iframe
                title="RSVP for the debut celebration of Shanara"
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
