import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail } from 'react-icons/fi'
import { celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const IntroSection = () => {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false)
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
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
      headingRef.current,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
    )
      .fromTo(
        copyRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.35'
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
      className="relative w-full pt-24 md:pt-44 pb-28 md:pb-36 overflow-hidden"
      style={{
        backgroundColor: '#F9E8F0',
        backgroundImage:
          'linear-gradient(180deg, rgba(253, 244, 248, 0.96) 0%, rgba(252, 235, 243, 0.97) 45%, rgba(248, 228, 238, 0.98) 100%), url(/images/graphics/bg-3.png)',
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat'
      }}
    >
      <div className="soft-blob z-0" style={{ width: randSize(85, 135), height: randSize(75, 120), top: randPct(8, 22), left: randPct(66, 84) }} />
      <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(75, 120), height: randSize(65, 105), top: randPct(66, 84), left: randPct(8, 22) }} />
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
      <div className="relative z-20 max-w-sm mx-auto">
        <div className="overflow-hidden">
          <div className="px-5 py-5 text-center">
            <h2 ref={headingRef} className="leading-none mb-3">
              <span className="block font-halimun text-5xl" style={{ color: '#6F2D36' }}>
                hello
              </span>
              <span className="block font-rozha text-5xl lowercase mt-1" style={{ color: '#6F2D36' }}>
                friends
              </span>
            </h2>
            <p ref={copyRef} className="font-poppins text-sm leading-snug" style={{ color: '#6F2D36' }}>
              I am so excited to celebrate my special day with you.
              Thank you for being part of my journey!
            </p>
            <div ref={calendarRef} className="mt-10 w-4/5 mx-auto">
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
              <div ref={buttonWrapRef} className="mt-10">
                <button
                  type="button"
                  onClick={() => setIsRsvpModalOpen(true)}
                  className="attendance-confirm-button inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-[14px] font-poppins bg-[#C96A72] text-white whitespace-nowrap"
                >
                  <span className="font-poppins">Confirm Your Attendance</span>
                  <FiMail className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
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
