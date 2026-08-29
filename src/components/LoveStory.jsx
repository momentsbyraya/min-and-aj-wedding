import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loveStory } from '../data'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const storyRef = useRef(null)
  const imageRef = useRef(null)

  const stanzas = Array.isArray(loveStory?.stanzas)
    ? loveStory.stanzas.filter((stanza) => Array.isArray(stanza) && stanza.length > 0)
    : []

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

  return (
    <section
      ref={sectionRef}
      id="love-story"
      className="relative py-20 w-full overflow-hidden min-h-screen"
      style={{ backgroundColor: '#F0C9CE' }}
    >
      <StorybookSectionBg variant="book" />

      <div className="relative z-20 flex items-center justify-center py-12 pb-32 sm:pb-40 md:pb-48">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          <div ref={storyRef} className="mb-12 text-center">
            <div className="space-y-10">
              {stanzas.map((stanza, stanzaIndex) => (
                <div key={`stanza-${stanzaIndex}`} className="space-y-1">
                  {stanza.map((line, lineIndex) => (
                    <p
                      key={`line-${stanzaIndex}-${lineIndex}`}
                      className="font-albert font-thin leading-relaxed"
                      style={{ fontSize: '1rem', lineHeight: '1.8', color: '#6B3F48' }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
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
