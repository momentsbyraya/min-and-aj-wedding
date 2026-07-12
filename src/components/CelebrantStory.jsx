import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_BG = '/images/prenup/DSC06812.jpg'

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
      style={{ backgroundColor: '#fae8ce' }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat cursor-pointer"
        style={{
          backgroundImage: `url(${ABOUT_BG})`,
          backgroundPosition: '40% center'
        }}
        onClick={() => onImageClick?.(ABOUT_BG)}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#d2e0ee]/90 via-[#e5d7ed]/65 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 50%, rgba(229, 215, 237, 0.85) 0%, rgba(241, 215, 215, 0.45) 48%, transparent 78%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(138, 115, 153, 0.45) 0%, rgba(229, 215, 237, 0.4) 32%, transparent 62%), linear-gradient(180deg, rgba(250, 232, 206, 0.65) 0%, transparent 38%, transparent 62%, rgba(210, 224, 238, 0.5) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(229, 215, 237, 0.75) 0%, rgba(229, 215, 237, 0.4) 45%, transparent 68%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(138, 115, 153, 0.5) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(241, 215, 215, 0.6) 0%, rgba(250, 232, 206, 0.4) 22%, transparent 50%), linear-gradient(102deg, rgba(210, 224, 238, 0.45) 0%, transparent 52%)'
          }}
        />
      </div>
      <div className="relative z-20 w-full max-w-lg ml-auto px-5 sm:px-8">
        <div className="overflow-hidden">
          <div ref={contentRef} className="py-5 text-right">
            <h2
              className="mb-2 leading-tight sm:mb-2.5"
              style={{
                color: '#6b5a70',
                textShadow: '0 1px 4px rgba(250, 232, 206, 0.9)'
              }}
            >
              <span className="section-title-graphic-inner--line font-beautyofthebeast capitalize">
                {headingName}
              </span>
            </h2>
            <p
              className="font-poppins font-light text-xs sm:text-[0.8125rem] leading-snug w-[60%] max-w-full ml-auto pb-4"
              style={{
                color: '#6b5a70',
                textShadow: '0 1px 3px rgba(250, 232, 206, 0.85)'
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
