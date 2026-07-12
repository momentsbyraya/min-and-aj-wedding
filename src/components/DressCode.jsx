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
      className="relative w-full overflow-hidden pt-24 pb-52 sm:pt-28 sm:pb-60 md:pt-32 md:pb-72"
      style={{ backgroundColor: '#f1d7d7' }}
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
        src="/images/graphics/fan%20flower%20-%201.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/lantern-1.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--lantern absolute top-0 right-0 h-auto pointer-events-none z-10"
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-auto pointer-events-none z-10"
        style={{ width: '120vw', maxWidth: 'none' }}
      />
      <div className="relative z-20 mx-auto w-full max-w-md px-5 text-center sm:max-w-xl sm:px-8 lg:max-w-4xl lg:px-12 xl:max-w-5xl">
        <div ref={headingRef} className="flex flex-col items-center">
          <h2 className="section-title-graphic section-title-graphic--center mx-auto mb-1">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
              Dress code
            </span>
          </h2>
        </div>
        <div ref={imageGroupRef} className="mt-5 flex justify-center">
          <div className="w-full max-w-[220px] overflow-hidden">
            <img
              src="/images/dresscode/guests.png"
              alt="Dress code guide"
              className="dresscode-guests-image w-full h-auto object-contain"
            />
          </div>
        </div>

        <div ref={swatchesRef} className="mt-4 flex justify-center">
          <img
            src="/images/dresscode/swatch.png"
            alt={colorPalette.map((c) => c.label).join(', ')}
            className="dresscode-swatch-glow w-full max-w-[240px] h-auto object-contain"
          />
        </div>

        <div ref={descriptionRef} className="mt-5 flex flex-col items-center gap-3 text-center">
          <p
            className="font-my-soul leading-none"
            style={{ color: '#6b5a70' }}
          >
            <span style={{ fontSize: 'clamp(1.75rem, 5.2vw, 2.85rem)' }}>
              {mainDressCode.title}
            </span>
            <br />
            <span style={{ fontSize: 'clamp(1.1rem, 3.4vw, 1.75rem)' }}>
              {mainDressCode.subtitle}
            </span>
          </p>
          <p className="font-poppins text-[11px] sm:text-xs leading-relaxed max-w-md px-6 sm:px-8" style={{ color: '#6b5a70' }}>
            {mainDressCode.description.split('\n\n').map((paragraph, i) => {
              const isAvoidLine = /^avoid\s+wearing\s+bright\s+colors/i.test(paragraph.trim())
              return (
                <React.Fragment key={i}>
                  {i > 0 ? <br /> : null}
                  {isAvoidLine ? (
                    <span className="font-semibold" style={{ color: '#8a7399' }}>
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
      </div>
    </section>
  )
}

export default DressCode 