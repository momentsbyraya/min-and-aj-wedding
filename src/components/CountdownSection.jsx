import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const CountdownSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const countdownArtRef = useRef(null)
  const statsRef = useRef(null)
  const eventDate = celebrant?.debutant?.debut?.date || ''

  const getCountdown = () => {
    if (!eventDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const [year, month, day] = eventDate.split('-').map(Number)
    if (!year || !month || !day) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    // Dubai is UTC+4 with no DST.
    // Event is treated as Dubai midnight at the selected date.
    const targetMs = Date.UTC(year, month - 1, day, -4, 0, 0)
    const nowMs = Date.now()
    const diff = targetMs - nowMs

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = totalSeconds % 60

    return { days, hours, minutes, seconds }
  }

  const [countdown, setCountdown] = useState(getCountdown)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const statItems = statsRef.current?.querySelectorAll('.countdown-stat-item') || []

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
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.72, ease: 'power2.out' }
    )
      .fromTo(
        countdownArtRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.78, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        statItems,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.11
        },
        '-=0.2'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 w-full overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      <div className="relative z-20 w-full max-w-md mx-auto px-5 text-center">
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mb-16 sm:mb-20">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
            See you!
          </span>
        </h2>

        <div ref={countdownArtRef} className="mx-auto w-full max-w-[min(320px,88vw)]">
          <img
            src="/images/graphics/countdown.png"
            alt=""
            aria-hidden
            className="w-full h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

        <div ref={statsRef} className="mt-12 flex items-start justify-center gap-4 sm:gap-6">
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#c86f78' }}>
                {countdown.days}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#E28B91' }}>
              Days
            </p>
          </div>
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#c86f78' }}>
                {countdown.hours}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#E28B91' }}>
              Hours
            </p>
          </div>
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#c86f78' }}>
                {countdown.minutes}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#E28B91' }}>
              Minutes
            </p>
          </div>
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#c86f78' }}>
                {countdown.seconds}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#E28B91' }}>
              Seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountdownSection
