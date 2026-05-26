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
      className="relative w-full overflow-hidden pt-24 pb-24 sm:pt-28 sm:pb-28 md:pt-32 md:pb-32"
      style={{ backgroundColor: '#E1F4F3' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/graphics/palace-4.png)' }}
        aria-hidden="true"
      />
      <div className="relative z-20 mx-auto w-full max-w-md px-5 text-center sm:max-w-xl sm:px-8 lg:max-w-4xl lg:px-12 xl:max-w-5xl">
        <div ref={headingRef} className="flex flex-col items-center">
          <h2 className="section-title-graphic section-title-graphic--center mx-auto mb-1">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
              Dress code
            </span>
          </h2>
        </div>
        <p ref={noteRef} className="font-halimun mx-auto mb-4 mt-1 max-w-sm text-center text-xl leading-none" style={{ color: '#0a3F3D' }}>
          note
        </p>

        <div ref={imageGroupRef} className="mt-5 flex justify-center">
          <div className="w-full max-w-[220px] overflow-hidden">
            <img
              src="/images/dresscode/guests.png"
              alt="Dress code guide"
              className="dresscode-guests-image w-full h-auto object-contain"
            />
          </div>
        </div>

        <div ref={swatchesRef} className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {colorPalette.map((c) => (
            <span
              key={c.name}
              title={c.label}
              className="inline-block w-8 h-8 rounded-full border border-white/70"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div ref={descriptionRef} className="mt-5 flex flex-col items-center gap-3 text-center">
          <p
            className="font-my-soul leading-none"
            style={{
              color: '#D97B9C',
              fontSize: 'clamp(2.35rem, 7vw, 3.75rem)'
            }}
          >
            {mainDressCode.title}
          </p>
          <p className="font-poppins text-sm sm:text-base leading-relaxed max-w-md" style={{ color: '#0a3F3D' }}>
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