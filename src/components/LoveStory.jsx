import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const storyRef = useRef(null)
  const imageRef = useRef(null)

  const bioHtml = celebrant?.debutant?.about?.bioHtml || ''
  const heading = celebrant?.debutant?.about?.headingName || 'Turning Eighteen'
  // Split bio on <br> tags into readable lines for storybook layout
  const bioLines = bioHtml
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(storyRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }).fromTo(
      imageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    return () => tl.kill()
  }, [])

  const firstLine = bioLines[0] || heading
  const restLines = bioLines.slice(1)

  return (
    <section ref={sectionRef} className="relative py-20 w-full overflow-hidden min-h-screen">
      <StorybookSectionBg variant="book" />

      <div className="relative z-20 flex items-center justify-center py-12 pb-32 sm:pb-40 md:pb-48">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          <div ref={storyRef} className="text-left mb-12">
            <p className="alice-regular text-[#6F4A52] mb-6" style={{ fontSize: '1.25rem', letterSpacing: '0.04em' }}>
              {heading}
            </p>
            <p
              className="font-albert font-thin text-[#6F4A52] leading-relaxed"
              style={{ fontSize: '1rem', lineHeight: '1.8' }}
            >
              <span className="font-caribbean" style={{ fontSize: '1.5rem' }}>
                {firstLine.charAt(0)}
              </span>
              {firstLine.slice(1)}
              {restLines.map((line) => (
                <React.Fragment key={line}>
                  <br />
                  <br />
                  {line}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="absolute bottom-0 z-10 pointer-events-none"
        style={{ right: '-15%', transform: 'translateX(20%)' }}
        aria-hidden
      >
        <img
          src="/images/graphics/castle-2.png"
          alt=""
          className="h-auto opacity-60"
          style={{ maxWidth: '350px', maxHeight: '100%' }}
        />
      </div>
    </section>
  )
}

export default LoveStory
