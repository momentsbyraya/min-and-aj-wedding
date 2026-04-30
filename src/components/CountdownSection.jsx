import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const CountdownSection = () => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const polaroidRef = useRef(null)
  const statsRef = useRef(null)
  const eventDate = celebrant?.debutant?.debut?.date || ''

  const getCountdown = () => {
    if (!eventDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const target = new Date(`${eventDate}T00:00:00`)
    const now = new Date()
    const diff = target.getTime() - now.getTime()

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
        polaroidRef.current,
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
      <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(88, 132), height: randSize(74, 114), top: randPct(8, 20), left: randPct(8, 20) }} />
      <div className="soft-blob soft-blob--small z-0" style={{ width: randSize(72, 110), height: randSize(62, 98), top: randPct(68, 84), left: randPct(68, 84) }} />

      <div className="relative z-20 w-full max-w-md mx-auto px-5 text-center">
        <h2 ref={headingRef} className="leading-none mb-16 sm:mb-20 flex flex-col items-center text-center">
          <span
            className="block font-halimun"
            style={{
              color: '#6F2D36',
              fontSize: 'clamp(3.2rem, 13vw, 5.2rem)',
              transform: 'rotate(-5deg)',
              display: 'block',
              marginBottom: '-2px'
            }}
          >
            <span style={{ fontSize: '1.5em', lineHeight: 0.8, display: 'inline-block' }}>S</span>ee
          </span>
          <span
            className="block font-halimun lowercase"
            style={{
              color: '#6F2D36',
              fontSize: 'clamp(3.6rem, 15vw, 6rem)',
              transform: 'rotate(-7deg)',
              display: 'block',
              marginTop: '4px'
            }}
          >
            you!
          </span>
        </h2>

        <div ref={polaroidRef} className="mx-auto w-[260px] max-w-[78vw]">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '50%',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 72%, rgba(0, 0, 0, 0.78) 90%, rgba(0, 0, 0, 0) 100%)',
              maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 72%, rgba(0, 0, 0, 0.78) 90%, rgba(0, 0, 0, 0) 100%)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat'
            }}
          >
            <img
              src="/images/prenup/DSC01482.jpg"
              alt="Abby portrait"
              className="w-full object-cover"
              style={{ aspectRatio: '3 / 4', objectPosition: 'center 12%', transform: 'scale(1.02)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(253,236,228,0.92) 0%, rgba(253,236,228,0.44) 7%, rgba(253,236,228,0) 15%), linear-gradient(to left, rgba(253,236,228,0.92) 0%, rgba(253,236,228,0.44) 7%, rgba(253,236,228,0) 15%), linear-gradient(to bottom, rgba(253,236,228,0.94) 0%, rgba(253,236,228,0.46) 8%, rgba(253,236,228,0) 17%), linear-gradient(to top, rgba(253,236,228,0.94) 0%, rgba(253,236,228,0.46) 8%, rgba(253,236,228,0) 17%), radial-gradient(circle at top left, rgba(253,236,228,1) 0, rgba(253,236,228,0.72) 10%, rgba(253,236,228,0) 26%), radial-gradient(circle at top right, rgba(253,236,228,1) 0, rgba(253,236,228,0.72) 10%, rgba(253,236,228,0) 26%), radial-gradient(circle at bottom left, rgba(253,236,228,1) 0, rgba(253,236,228,0.72) 10%, rgba(253,236,228,0) 26%), radial-gradient(circle at bottom right, rgba(253,236,228,1) 0, rgba(253,236,228,0.72) 10%, rgba(253,236,228,0) 26%)',
                boxShadow:
                  'inset 0 16px 20px -12px rgba(253,236,228,1), inset 0 -16px 20px -12px rgba(253,236,228,1), inset 14px 0 18px -12px rgba(253,236,228,0.98), inset -14px 0 18px -12px rgba(253,236,228,0.98), inset 0 0 12px rgba(253,236,228,0.3)'
              }}
            />
          </div>
        </div>

        <div ref={statsRef} className="mt-12 flex items-start justify-center gap-4 sm:gap-6">
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#6F2D36' }}>
                {countdown.days}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#6F2D36' }}>
              Days
            </p>
          </div>
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#6F2D36' }}>
                {countdown.hours}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#6F2D36' }}>
              Hours
            </p>
          </div>
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#6F2D36' }}>
                {countdown.minutes}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#6F2D36' }}>
              Minutes
            </p>
          </div>
          <div className="countdown-stat-item text-center">
            <div className="w-14 h-14 sm:w-[4.25rem] sm:h-[4.25rem] rounded-full border-2 border-[#E28B91] bg-[#F9D7DB] flex items-center justify-center shadow-[0_6px_18px_rgba(199,119,129,0.2)]">
              <p className="font-rozha text-[1.55rem] sm:text-[1.95rem] leading-none -mb-1" style={{ color: '#6F2D36' }}>
                {countdown.seconds}
              </p>
            </div>
            <p className="font-poppins text-[10px] sm:text-xs uppercase tracking-[0.18em] mt-2" style={{ color: '#6F2D36' }}>
              Seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountdownSection
