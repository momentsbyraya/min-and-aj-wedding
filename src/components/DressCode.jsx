import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'

gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const { mainDressCode, colorPalette } = dresscode
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const noteRef = useRef(null)
  const imageGroupRef = useRef(null)
  const swatchesRef = useRef(null)
  const descriptionRef = useRef(null)

  useEffect(() => {
    const dresscodeImages = imageGroupRef.current?.querySelectorAll('.dresscode-guests-image') || []

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
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(
        noteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        dresscodeImages,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.12 },
        '-=0.2'
      )
      .fromTo(
        swatchesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.15'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-36 pb-36 w-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <img
        src="/images/graphics/flower-banner.png"
        alt="Floral banner"
        className="intro-flower-banner pointer-events-none absolute left-1/2 top-0 z-10 h-auto -translate-x-1/2"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto -translate-x-1/2 rotate-180"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <div className="relative z-20 w-full max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
        <div ref={headingRef} className="flex flex-col items-center">
          <img
            src="/images/graphics/shoe%20sin%20pillow.png"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-2 h-auto max-h-28 sm:max-h-32 w-auto max-w-[8rem] sm:max-w-[9.5rem] object-contain pointer-events-none select-none opacity-95"
          />
          <h2 className="section-title-graphic section-title-graphic--center mx-auto mb-1">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
              Dress code
            </span>
          </h2>
        </div>
        <p ref={noteRef} className="font-halimun mx-auto mb-6 mt-2 max-w-sm text-center text-xl leading-none" style={{ color: '#6F2D36' }}>
          note
        </p>

        <div ref={imageGroupRef} className="mt-8 flex justify-center">
          <div className="w-full max-w-[220px] overflow-hidden">
            <img
              src="/images/dresscode/guests.png"
              alt="Dress code guide"
              className="dresscode-guests-image w-full h-auto object-contain"
            />
          </div>
        </div>

        <div ref={swatchesRef} className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          {colorPalette.map((c) => (
            <span
              key={c.name}
              title={c.label}
              className="inline-block w-8 h-8 rounded-full border border-white/70"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div ref={descriptionRef} className="mt-8 flex flex-col items-center gap-4 text-center">
          <p
            className="font-my-soul leading-none"
            style={{
              color: '#D97B9C',
              fontSize: 'clamp(2.35rem, 7vw, 3.75rem)'
            }}
          >
            {mainDressCode.title}
          </p>
          <p className="font-poppins text-sm sm:text-base leading-relaxed max-w-md" style={{ color: '#6F2D36' }}>
            {mainDressCode.description.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

export default DressCode 