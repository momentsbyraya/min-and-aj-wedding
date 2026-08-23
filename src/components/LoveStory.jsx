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

  const timeline = Array.isArray(loveStory?.timeline) ? loveStory.timeline.filter(Boolean) : []

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
          <div ref={storyRef} className="text-left mb-12">
            <div className="space-y-6">
              {timeline.map((item, index) => {
                const firstChar = (item.description || item.title || ' ').charAt(0)
                const rest = (item.description || item.title || '').slice(1)
                return (
                  <div key={`${item.date}-${item.title}-${index}`}>
                    {item.date ? (
                      <p
                        className="alice-regular mb-1 tracking-[0.08em] uppercase text-xs sm:text-sm"
                        style={{ color: '#6B3F48' }}
                      >
                        {item.date}
                      </p>
                    ) : null}
                    <p
                      className="font-albert font-thin leading-relaxed"
                      style={{ fontSize: '1rem', lineHeight: '1.8', color: '#6B3F48' }}
                    >
                      {index === 0 ? (
                        <>
                          <span className="font-caribbean" style={{ fontSize: '1.5rem' }}>
                            {firstChar}
                          </span>
                          {rest}
                        </>
                      ) : (
                        item.description || item.title
                      )}
                    </p>
                  </div>
                )
              })}
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
