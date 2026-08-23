import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

/** Unused elsewhere on the invitation */
const SAVE_THE_DATE_PRENUP = '/images/prenup/NZ6_7550.jpeg'

const Counter = ({ countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 } }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const countdownRef = useRef(null)
  const imageRef = useRef(null)

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
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.35'
      )

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="save-the-date"
      className="relative w-full overflow-hidden pt-20 pb-0"
      style={{ backgroundColor: '#F0C9CE' }}
    >
      <StorybookSectionBg variant="book" />

      <div className="relative z-20 flex flex-col items-center justify-center py-12">
        <div className="mx-auto w-full max-w-xs px-8 sm:max-w-md sm:px-12 md:px-8 lg:max-w-xl lg:px-16">
          <div className="text-center">
            <h2
              ref={headerRef}
              className="mb-3 font-caribbean text-3xl text-[#8B5560] sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span
                className="inline-block text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ lineHeight: '0.8' }}
              >
                S
              </span>
              <span className="inline-block">ave</span> the Date
            </h2>
            <div ref={countdownRef}>
              <p className="mx-auto max-w-3xl font-albert text-base font-thin leading-relaxed text-[#8B5560] sm:text-lg">
                Mark your calendar for
                <br />
                this special day
              </p>
              <div className="flex items-center justify-center">
                <div className="h-px w-10 bg-[#8B5560] opacity-40" />
                <img
                  src="/images/graphics/graphics-1.svg"
                  alt=""
                  aria-hidden
                  className="mx-3 h-auto w-20 sm:w-24 md:w-28"
                />
                <div className="h-px w-10 bg-[#8B5560] opacity-40" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 px-4">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Minutes' },
              { value: countdown.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 ? (
                  <div className="font-albert text-2xl font-thin text-[#8B5560] sm:text-3xl md:text-4xl">:</div>
                ) : null}
                <div className="text-center">
                  <div className="countdown-number mb-1 font-lavishly text-3xl not-italic text-[#6B3F48] sm:text-4xl md:text-5xl lg:text-6xl">
                    {item.value}
                  </div>
                  <div className="alice-regular text-xs uppercase tracking-wider text-[#8B5560] sm:text-sm">
                    {item.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-md px-3 sm:mt-10 sm:max-w-xl sm:px-4 lg:max-w-2xl">
          <div
            ref={imageRef}
            className="gallery-tile gallery-tile--landscape w-full"
            style={{
              aspectRatio: '3 / 2',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            <div className="gallery-tile-inner h-full w-full">
              <img
                src={SAVE_THE_DATE_PRENUP}
                alt="AJ & Min"
                draggable={false}
                loading="lazy"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-8">
          <div className="h-px w-10 bg-[#8B5560] opacity-40" />
          <img
            src="/images/graphics/graphics-1.svg"
            alt=""
            aria-hidden
            className="mx-3 h-auto w-20 scale-y-[-1] sm:w-24 md:w-28"
          />
          <div className="h-px w-10 bg-[#8B5560] opacity-40" />
        </div>
      </div>
    </section>
  )
}

export default Counter
