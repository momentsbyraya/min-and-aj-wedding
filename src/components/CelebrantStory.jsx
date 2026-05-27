import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_BG = '/images/prenup/A7400780.jpg'

const CelebrantStory = ({ onImageClick }) => {
  const about = celebrant.debutant.about
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  const headingName = about?.headingName ?? celebrant.debutant.name.first
  const bioHtml = about?.bioHtml ?? ''

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
      contentRef.current,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-24 pb-32 md:pt-44 md:pb-44"
      style={{ backgroundColor: '#fce3ee' }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat cursor-pointer"
        style={{
          backgroundImage: `url(${ABOUT_BG})`,
          backgroundPosition: '42% center'
        }}
        onClick={() => onImageClick?.(ABOUT_BG)}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#80043A]/90 via-[#ed5c95]/65 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 115% at 0% 50%, rgba(226, 9, 100, 0.85) 0%, rgba(237, 92, 149, 0.45) 48%, transparent 78%)'
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, rgba(128, 4, 58, 0.45) 0%, rgba(226, 9, 100, 0.4) 32%, transparent 62%), linear-gradient(180deg, rgba(245, 196, 218, 0.65) 0%, transparent 38%, transparent 62%, rgba(243, 152, 188, 0.5) 100%)'
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(226, 9, 100, 0.75) 0%, rgba(252, 227, 238, 0.4) 45%, transparent 68%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(128, 4, 58, 0.5) 0%, transparent 70%)'
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(237, 92, 149, 0.6) 0%, rgba(245, 196, 218, 0.4) 22%, transparent 50%), linear-gradient(102deg, rgba(243, 152, 188, 0.45) 0%, transparent 52%)'
        }}
        aria-hidden
      />
      <div className="relative z-20 w-full max-w-lg mr-auto px-5 sm:px-8">
        <div className="overflow-hidden">
          <div ref={contentRef} className="py-5 text-left">
            <h2
              className="mb-2 leading-tight sm:mb-2.5"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 18px rgba(92, 2, 40, 0.6), 0 1px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              <span className="section-title-graphic-inner--line font-beautyofthebeast capitalize">
                {headingName}
              </span>
            </h2>
            <p
              className="font-poppins font-light text-xs sm:text-[0.8125rem] leading-snug w-[60%] max-w-full pb-4"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 12px rgba(92, 2, 40, 0.55), 0 1px 3px rgba(0, 0, 0, 0.45)'
              }}
              dangerouslySetInnerHTML={{ __html: bioHtml }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CelebrantStory
