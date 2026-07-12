import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { schedule } from '../data'

gsap.registerPlugin(ScrollTrigger)

/** Sketch graphic per schedule event (cycles if there are more events than sketches). */
const EVENT_SKETCHES = [
  '/images/graphics/welcome-sketch.png',
  '/images/graphics/cocktil-sketch.png',
  '/images/graphics/program-sketch.png',
  '/images/graphics/party-sketch.png'
]

const getSketchForIndex = (index) =>
  EVENT_SKETCHES[((index % EVENT_SKETCHES.length) + EVENT_SKETCHES.length) % EVENT_SKETCHES.length]

const Schedule = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    }

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    }

    if (eventsRef.current) {
      const items = eventsRef.current.querySelectorAll('.schedule-row')
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const renderEventContent = (event, align) => {
    const timeMatch = event.time.match(/^(.+?)\s*(AM|PM)/i)
    const timeNumber = timeMatch ? timeMatch[1] : event.time.split(' ')[0]
    const timePeriod = timeMatch
      ? timeMatch[2]
      : event.time.includes('AM')
        ? 'AM'
        : event.time.includes('PM')
          ? 'PM'
          : ''

    const isRight = align === 'right'

    return (
      <div className={`flex flex-col justify-center ${isRight ? 'text-left' : 'text-right'}`}>
        <div
          className="schedule-time font-instrument-serif font-semibold leading-none"
          style={{
            color: '#6b5a70',
            fontSize: 'clamp(1.85rem, 6vw, 3.25rem)'
          }}
        >
          {timeNumber}{' '}
          <span style={{ fontSize: 'clamp(1.15rem, 3vw, 1.9rem)' }}>{timePeriod}</span>
        </div>
        <div
          className="my-2 border-b border-dashed opacity-70"
          style={{ borderColor: '#c9b4d4' }}
        />
        <div
          className="schedule-title font-poppins font-bold uppercase"
          style={{
            color: '#6b5a70',
            letterSpacing: '0.08em',
            fontSize: 'clamp(0.75rem, 1.6vw, 0.95rem)'
          }}
        >
          {event.title}
        </div>
        {event.description ? (
          <div
            className="schedule-description font-poppins italic mt-1"
            style={{
              color: '#8a7399',
              opacity: 0.9,
              fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)'
            }}
          >
            {event.description}
          </div>
        ) : null}
      </div>
    )
  }

  const renderSketchSide = (event, index, align) => {
    const isRight = align === 'right'
    return (
      <div
        className={`flex items-center ${isRight ? 'justify-start' : 'justify-end'}`}
      >
        <img
          src={getSketchForIndex(index)}
          alt={event.title || ''}
          className="schedule-sketch w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-90"
          loading="lazy"
          draggable={false}
        />
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-32 md:pt-56 pb-32 md:pb-48 overflow-hidden"
      style={{ backgroundColor: '#fae8ce' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/graphics/butterflies-bg.png)',
          opacity: 0.35
        }}
        aria-hidden="true"
      />
      <div className="soft-blob soft-blob--small absolute top-[12%] left-[8%] w-40 h-40 z-[1]" aria-hidden="true" />
      <div className="soft-blob soft-blob--alt absolute bottom-[18%] right-[6%] w-52 h-52 z-[1]" aria-hidden="true" />
      <img
        src="/images/graphics/fan%20flower%20-%203.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/bird-2.png"
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
        src="/images/graphics/flower-right-2.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-right absolute bottom-0 right-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom absolute bottom-0 left-1/2 -translate-x-1/2 h-auto pointer-events-none z-[5]"
        style={{ width: '110vw', maxWidth: 'none' }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="w-full max-w-3xl mx-auto pt-8 pb-8 lg:pt-16 lg:pb-16 lg:flex lg:flex-col">
            <div ref={headerRef} className="mb-12 flex justify-center">
              <h2 className="section-title-graphic section-title-graphic--center mb-4 text-center">
                <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
                  The schedule
                </span>
              </h2>
            </div>

            <div ref={timelineRef} className="relative max-w-xl sm:max-w-2xl w-full mx-auto px-4 sm:px-6">
              <div
                ref={lineRef}
                className="absolute top-0 bottom-0 w-px -translate-x-1/2"
                style={{ left: '50%', backgroundColor: '#d2e0ee', opacity: 0.55 }}
              />

              <div ref={eventsRef} className="space-y-16 sm:space-y-20 md:space-y-24">
                {schedule.events.map((event, index) => {
                  const isTextRight = index % 2 === 1
                  return (
                    <div
                      key={event.id ?? index}
                      className="schedule-row relative grid grid-cols-2 items-center gap-4 sm:gap-6"
                    >
                      {isTextRight ? (
                        <>
                          {renderSketchSide(event, index, 'left')}
                          {renderEventContent(event, 'right')}
                        </>
                      ) : (
                        <>
                          {renderEventContent(event, 'left')}
                          {renderSketchSide(event, index, 'right')}
                        </>
                      )}

                      <div
                        className="absolute z-10 h-3 w-3 rounded-full border-2"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#e5d7ed',
                          borderColor: '#d2e0ee'
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-center mt-16 sm:mt-20 px-4 sm:px-8">
              <div className="text-center">
                <p
                  className="text-xs sm:text-sm md:text-base font-poppins leading-relaxed"
                  style={{
                    color: '#6b5a70',
                    opacity: 0.95,
                    fontSize: 'clamp(0.75rem, 1vw, 1rem)'
                  }}
                >
                  Looking forward to celebrating this special milestone with you. Your presence will make this day even more meaningful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule
