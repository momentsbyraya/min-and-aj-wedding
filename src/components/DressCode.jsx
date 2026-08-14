import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'

gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const { mainDressCode, colorPalette } = dresscode
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
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
        descriptionRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.15'
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

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-24 pb-52 sm:pt-28 sm:pb-60 md:pt-32 md:pb-72"
      style={{ backgroundColor: '#E8C4C8' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/graphics/rose-gold-pupr-bg.png)',
          opacity: 0.45
        }}
        aria-hidden="true"
      />
      <div className="soft-blob absolute top-[20%] right-[10%] w-44 h-44 z-[1]" aria-hidden="true" />
      <img
        src="/images/graphics/flower-top.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-10 h-auto w-[min(100vw,720px)] max-w-none -translate-x-1/2"
      />
      <img
        src="/images/graphics/flower-bottom.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-[min(100vw,720px)] max-w-none -translate-x-1/2"
      />
      <div className="relative z-20 mx-auto w-full max-w-md px-5 text-center sm:max-w-xl sm:px-8 lg:max-w-4xl lg:px-12 xl:max-w-5xl">
        <div ref={headingRef} className="flex flex-col items-center">
          <h2 className="section-title-graphic section-title-graphic--center mx-auto mb-1">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-caribbean capitalize">
              Dresscode
            </span>
          </h2>
        </div>

        <div ref={descriptionRef} className="mt-5 flex flex-col items-center gap-3 text-center">
          <p
            className="alice-regular leading-none"
            style={{ color: '#6F4A52' }}
          >
            <span style={{ fontSize: 'clamp(1.75rem, 5.2vw, 2.85rem)' }}>
              {mainDressCode.title}
            </span>
            <br />
            <span style={{ fontSize: 'clamp(1.1rem, 3.4vw, 1.75rem)' }}>
              {mainDressCode.subtitle}
            </span>
          </p>
          <p className="font-albert font-thin text-[11px] sm:text-xs leading-relaxed max-w-md px-6 sm:px-8" style={{ color: '#6F4A52' }}>
            {mainDressCode.description.split('\n\n').map((paragraph, i) => {
              const isAvoidLine = /^avoid\s+wearing/i.test(paragraph.trim())
              return (
                <React.Fragment key={i}>
                  {i > 0 ? <br /> : null}
                  {isAvoidLine ? (
                    <span className="font-semibold" style={{ color: '#c45c5c' }}>
                      {paragraph}
                    </span>
                  ) : (
                    paragraph
                  )}
                </React.Fragment>
              )
            })}
          </p>
        </div>

        <div
          ref={imageGroupRef}
          className="mt-6 flex w-full flex-row items-center gap-3 sm:gap-4"
        >
          <div className="w-[80%] overflow-hidden">
            <img
              src="/images/dresscode/guests.png"
              alt="Dress code guide"
              className="dresscode-guests-image w-full h-auto object-contain"
            />
          </div>
          <div
            ref={swatchesRef}
            className="flex w-[20%] flex-col items-center gap-2 sm:gap-3"
            aria-label={colorPalette.map((c) => c.label).join(', ')}
          >
            {colorPalette.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-1">
                <span
                  className="block h-8 w-8 rounded-full border border-[#6F4A52]/15 shadow-sm sm:h-10 sm:w-10"
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                  aria-hidden="true"
                />
                <span
                  className="alice-regular text-[8px] uppercase tracking-[0.1em] sm:text-[9px]"
                  style={{ color: '#9B737C' }}
                >
                  {color.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 