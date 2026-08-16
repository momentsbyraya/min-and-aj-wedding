import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

const Paragraph = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const preferredName = (
    celebrant?.debutant?.name?.preferred ||
    celebrant?.debutant?.name?.first ||
    'Althea'
  ).trim()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden min-h-screen md:min-h-0 bg-[#FBF3F0]"
    >
      <StorybookSectionBg variant="calligraphy" />

      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          <div ref={headerRef} className="text-left mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8B5560] font-lavishly italic">
              when {preferredName.split(' ')[0]} turned eighteen....
            </h2>
            <div ref={contentRef}>
              <div className="soft-edges mb-8 relative">
                <img
                  src="/images/prenup/NZ6_8202.jpeg"
                  alt={preferredName}
                  className="w-full"
                />
                <img
                  src="/images/graphics/heart-string-2.png"
                  alt=""
                  aria-hidden
                  className="absolute top-0 right-0 z-10"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '150px',
                    maxHeight: '150px',
                    transform: 'scaleX(-1)'
                  }}
                />
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8B5560] font-lavishly italic text-center">
                a new chapter
                <br />
                began to bloom.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Paragraph
