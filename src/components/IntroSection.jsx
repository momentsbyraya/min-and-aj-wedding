import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail } from 'react-icons/fi'
import { celebrant } from '../data'
import GraphicButton from './GraphicButton'

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
      style={{
        backgroundColor: '#F9E8F0',
        backgroundImage: 'url(/images/graphics/palace-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img
        src="/images/graphics/flower-banner.png"
        alt="Floral banner"
        className="intro-flower-banner absolute top-0 left-1/2 -translate-x-1/2 h-auto pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180 h-auto pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <div className="relative z-20 mx-auto max-w-sm px-5 sm:px-7">
        <p
          ref={copyRef}
          className="mb-6 text-center font-poppins text-sm leading-snug sm:mb-7"
          style={{ color: '#6F2D36' }}
        >
          I am so excited to celebrate my special day with you.
          Thank you for being part of my journey!
        </p>
        <div style={{ filter: 'drop-shadow(0 10px 28px rgba(55, 30, 40, 0.12))' }}>
          <div className="intro-content-soft-panel">
            <div className="px-7 py-10 text-center sm:px-10 sm:py-12 md:px-12 md:py-14">
              <div ref={calendarRef} className="w-4/5 mx-auto">
                <p className="font-rozha text-2xl tracking-[0.12em] uppercase" style={{ color: '#6F2D36' }}>
                  {monthLabel} {yearLabel}
                </p>
                <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs font-rozha uppercase" style={{ color: '#6F2D36' }}>
                  {weekLabels.map((label, index) => (
                    <span key={`${label}-${index}`}>{label}</span>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm font-rozha" style={{ color: '#6F2D36' }}>
                  {calendarCells.map((day, index) => {
                    const isSelected = day === selectedDay
                    return (
                      <div key={`${day ?? 'empty'}-${index}`} className="flex items-center justify-center">
                        {day ? (
                          <span
                            className={`calendar-day-number flex h-8 w-8 items-center justify-center rounded-full ${isSelected ? 'bg-[#E7AEB5] text-[#6F2D36] border border-[#D98C96]' : ''}`}
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
          </div>
        </div>
        <div ref={buttonWrapRef} className="mt-6 flex w-full justify-center">
          <GraphicButton
            imageSrc="/images/graphics/button-container.png"
            onClick={() => setIsRsvpModalOpen(true)}
            className="graphic-button--cta attendance-confirm-button shrink-0"
            contentClassName="font-beautyofthebeast lowercase"
          >
            respond
            <FiMail className="h-5 w-5 shrink-0" aria-hidden="true" />
          </GraphicButton>
        </div>
      </div>
      {isRsvpModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 px-0">
          <div className="relative w-screen h-screen bg-[#FDF2F7] p-4 sm:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <button
              type="button"
              onClick={() => setIsRsvpModalOpen(false)}
              className="absolute right-4 top-4 z-10 font-poppins text-xs uppercase tracking-[0.2em] text-[#6F2D36]"
            >
              Close
            </button>
            <div className="mt-8 flex h-[calc(100vh-114px)] items-center justify-center px-6">
              <p
                className="font-poppins text-center text-sm tracking-[0.22em] text-[#6F2D36]/55 sm:text-base"
                aria-label="RSVP form coming soon"
              >
                TO BE ADDED
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default IntroSection
