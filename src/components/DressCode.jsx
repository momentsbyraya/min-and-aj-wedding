import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'

gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const sectionRefs = useRef([])
  const [activeTooltip, setActiveTooltip] = useState(null)

  const sections = dresscode.sections || []
  const mainDescription =
    dresscode.mainDressCode?.description ||
    'We would love to see you in formal or semi-formal attire in our color motif.'
  const avoidNote = dresscode.mainDressCode?.avoidNote || ''

  const renderWithLineBreaks = (text = '') => {
    const lines = String(text).split(/<br\s*\/?>|\n/gi)
    return lines.map((line, index) => (
      <React.Fragment key={`${line}-${index}`}>
        {line}
        {index < lines.length - 1 ? <br /> : null}
      </React.Fragment>
    ))
  }

  useEffect(() => {
    const triggers = []

    if (titleRef.current) {
      triggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          animation: gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          ),
          toggleActions: 'play none none reverse'
        })
      )
    }

    sectionRefs.current.forEach((sectionEl) => {
      if (!sectionEl) return

      const imageContainer = sectionEl.querySelector('.dresscode-image-container')
      const contentContainer = sectionEl.querySelector('.dresscode-content-container')

      if (imageContainer) gsap.set(imageContainer, { opacity: 0, y: 24 })
      if (contentContainer) gsap.set(contentContainer, { opacity: 0, y: 20 })

      triggers.push(
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            if (imageContainer) {
              gsap.to(imageContainer, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
            }
            if (contentContainer) {
              gsap.to(contentContainer, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.12
              })
            }
          },
          onEnterBack: () => {
            if (imageContainer) {
              gsap.to(imageContainer, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
            }
            if (contentContainer) {
              gsap.to(contentContainer, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
            }
          }
        })
      )
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [sections.length])

  return (
    <section
      ref={sectionRef}
      id="dress-code"
      className="relative w-full overflow-hidden pt-32 pb-36 sm:pt-36 sm:pb-40 md:pt-44 md:pb-48"
      style={{ backgroundColor: '#F0C9CE' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-1.png)' }}
        aria-hidden="true"
      />
      <div className="soft-blob absolute top-[20%] right-[10%] z-[1] h-44 w-44" aria-hidden="true" />
      <img
        src="/images/graphics/flower-bottom.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-10 h-auto w-[min(100vw,720px)] max-w-none -translate-x-1/2 scale-y-[-1]"
      />
      <img
        src="/images/graphics/flower-bottom.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-[min(100vw,720px)] max-w-none -translate-x-1/2"
      />

      <div className="relative z-20 mx-auto w-full max-w-md px-5 sm:max-w-xl sm:px-8 lg:max-w-4xl lg:px-12 xl:max-w-5xl">
        <div ref={titleRef} className="mb-10 text-center sm:mb-14">
          <h2 className="section-title-graphic section-title-graphic--center mx-auto mb-3">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-caribbean capitalize">
              Dresscode
            </span>
          </h2>
          <p className="mx-auto max-w-xl whitespace-pre-line font-albert text-base font-thin italic sm:text-lg" style={{ color: '#8B5560' }}>
            {renderWithLineBreaks(mainDescription)}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {sections.map((section, index) => {
            const isGuestsSection = (section.title || '').toLowerCase().includes('guest')
            const swatchGapClass = isGuestsSection ? 'gap-1.5' : 'gap-2'

            return (
              <div key={section.title || index} className="relative overflow-visible">
                <div
                  ref={(el) => {
                    sectionRefs.current[index] = el
                  }}
                  className="flex flex-col items-center transition-opacity duration-500 ease-in-out"
                >
                  <div className="dresscode-image-container relative w-full max-w-md sm:max-w-lg">
                    <img
                      src={section.image || '/images/dresscode/guests.png'}
                      alt={section.title || `Dress category ${index + 1}`}
                      className="h-full w-full rounded object-cover"
                    />
                  </div>

                  <div className="dresscode-content-container mt-5 flex w-full max-w-md flex-col items-center text-center sm:mt-6">
                    <div
                      className="mb-2 alice-regular text-lg sm:text-xl md:text-2xl"
                      style={{ color: '#8B5560' }}
                    >
                      {section.title}
                    </div>
                    {section.description ? (
                      <p
                        className="font-albert text-sm font-thin italic sm:text-base"
                        style={{ color: '#8B5560' }}
                      >
                        {renderWithLineBreaks(section.description)}
                      </p>
                    ) : null}
                  </div>

                  {(section.colors || []).length > 0 ? (
                    <div
                      className={`mt-4 flex flex-wrap ${swatchGapClass} justify-center sm:mt-5`}
                    >
                      {(section.colors || []).map((colorItem, colorIndex) => (
                        <div
                          key={`${index}-${colorItem.name || colorIndex}`}
                          className="group relative"
                          onMouseEnter={() => setActiveTooltip(`${index}-${colorIndex}`)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === `${index}-${colorIndex}`
                                ? null
                                : `${index}-${colorIndex}`
                            )
                          }
                        >
                          <div
                            className="h-6 w-6 cursor-pointer rounded border border-[#8B5560]/30 sm:h-8 sm:w-8"
                            style={{ backgroundColor: colorItem.hex }}
                          />
                          {activeTooltip === `${index}-${colorIndex}` ? (
                            <div className="pointer-events-none absolute bottom-full left-1/2 z-[9999] mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-[#8B5560] px-2 py-1 text-xs text-white">
                              {colorItem.name}
                              <div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-[#8B5560]" />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {isGuestsSection && avoidNote ? (
                    <p
                      className="mt-6 max-w-md pt-2 text-center font-albert text-sm font-thin italic sm:mt-8 sm:pt-3 sm:text-base"
                      style={{ color: '#8B5560' }}
                    >
                      {renderWithLineBreaks(avoidNote)}
                    </p>
                  ) : null}
                </div>

                {index < sections.length - 1 ? (
                  <div className="mt-4 sm:mt-6 md:mt-8">
                    <div className="w-full py-4">
                      <div className="h-px w-full bg-[#8B5560] opacity-40" />
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DressCode
