import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const CelebrantStory = ({ onImageClick }) => {
  const about = celebrant.debutant.about
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
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
      { opacity: 1, y: 0, duration: 0.72, ease: 'power2.out' }
    )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.82, ease: 'power2.out' },
        '-=0.28'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.58, ease: 'power2.out' },
        '-=0.22'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-40 pb-20 w-full overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="intro-flower-banner absolute top-0 left-1/2 -translate-x-1/2 opacity-80 pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180 opacity-80 pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />

      <div className="relative z-20 w-full max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mb-8 text-center">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
            about {about?.headingName ?? celebrant.debutant.name.first}
          </span>
        </h2>

        <p
          ref={paragraphRef}
          className="font-poppins text-sm leading-relaxed"
          style={{ color: '#6F2D36' }}
          dangerouslySetInnerHTML={{ __html: about?.bioHtml ?? '' }}
        />

        <div className="mt-6 flex justify-center">
          <img
            src="/images/graphics/wine.png"
            alt="Our cheers"
            className="w-[120px] h-auto object-contain"
          />
        </div>

        <div
          ref={imageRef}
          className="mt-8 flex justify-center px-2"
          style={{ filter: 'drop-shadow(0 12px 28px rgba(55, 30, 40, 0.12))' }}
        >
          <div className="soft-edges celebrant-story-photo-frame relative aspect-[3/4] w-full max-w-[min(100%,420px)]">
            <img
              src="/images/prenup/A7400780.jpg"
              alt={celebrant.debutant.name?.full ?? celebrant.debutant.name?.first ?? 'Celebrant'}
              className="absolute inset-0 h-full w-full cursor-pointer object-cover"
              onClick={() => onImageClick?.('/images/prenup/A7400780.jpg')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CelebrantStory
