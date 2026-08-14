import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 } }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const countdownRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
      .fromTo(
        countdownRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.countdown-number',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2 },
        '-=0.5'
      )

    return () => tl.kill()
  }, [])

  return (
    <section ref={sectionRef} id="details" className="relative py-20 w-full overflow-hidden">
      <StorybookSectionBg variant="book" />

      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-xl w-full mx-auto px-8 sm:px-12 md:px-8 lg:px-16">
          <div className="text-center">
            <h2
              ref={headerRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6F4A52] mb-3 font-caribbean"
            >
              <span
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none"
                style={{ lineHeight: '0.8' }}
              >
                S
              </span>
              <span className="inline-block">ave</span> the Date
            </h2>
            <div ref={countdownRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#6F4A52] max-w-3xl mx-auto leading-relaxed">
                Mark your calendar for
                <br />
                this special day
              </p>
              <div className="flex justify-center items-center">
                <div className="w-16 h-px bg-[#6F4A52] opacity-40" />
                <img
                  src="/images/graphics/graphics-1.svg"
                  alt=""
                  aria-hidden
                  className="w-32 sm:w-40 md:w-48 h-auto mx-4"
                />
                <div className="w-16 h-px bg-[#6F4A52] opacity-40" />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-3 px-4 mt-8">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Minutes' },
              { value: countdown.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 ? (
                  <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#6F4A52]">:</div>
                ) : null}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lavishly text-[#6F4A52] mb-1 countdown-number not-italic">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#6F4A52] opacity-80 alice-regular uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6">
            <div className="w-16 h-px bg-[#6F4A52] opacity-40" />
            <img
              src="/images/graphics/graphics-1.svg"
              alt=""
              aria-hidden
              className="w-32 sm:w-40 md:w-48 h-auto mx-4 scale-y-[-1]"
            />
            <div className="w-16 h-px bg-[#6F4A52] opacity-40" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter
