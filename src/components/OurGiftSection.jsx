import React, { useEffect, useRef } from 'react'
import GraphicLink from './GraphicLink'
import { FiExternalLink } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wedding } from '../data'

gsap.registerPlugin(ScrollTrigger)

const BG = wedding.giftSection?.backgroundImage || '/images/prenup/DSC07027.jpg'

const OurGiftSection = () => {
  const gs = wedding.giftSection ?? {}
  const eyebrow = (gs.eyebrow ?? 'Wish list').trim()
  const titleLead = (gs.titleLead ?? 'gift').trim()
  const titleRest = (gs.titleRest ?? 'ideas').trim()
  const intro = (gs.intro ?? '').trim()
  const ctaLabel = (gs.ctaLabel ?? 'View registry').trim()
  const ctaHref = gs.ctaUrl || wedding.details?.registry || '#'

  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)

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
    ).fromTo(
      buttonRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      '-=0.35'
    )

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-24 pb-28 md:pt-44 md:pb-36"
      style={{ backgroundColor: '#fae8ce' }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundPosition: '68% center'
        }}
        aria-hidden
      />

      {/* Mirrored overlays (pastel wash anchors on the right, matching right-aligned copy) */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }} aria-hidden>
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
              'linear-gradient(115deg, rgba(90, 72, 104, 0.45) 0%, rgba(229, 215, 237, 0.4) 32%, transparent 62%), linear-gradient(180deg, rgba(250, 232, 206, 0.65) 0%, transparent 38%, transparent 62%, rgba(210, 224, 238, 0.5) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(229, 215, 237, 0.75) 0%, rgba(229, 215, 237, 0.4) 45%, transparent 68%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(90, 72, 104, 0.5) 0%, transparent 70%)'
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

      <div className="relative z-20 ml-auto mr-0 flex w-full max-w-lg justify-end px-5 sm:px-8">
        <div className="overflow-hidden">
          <div ref={contentRef} className="py-5 text-right">
            <div className="mb-2 ml-auto mr-0 inline-block text-right sm:mb-2.5" style={{ color: '#3f3348', textShadow: '0 1px 3px rgba(250, 232, 206, 0.85)' }}>
              {eyebrow ? (
                <p className="font-beautyofthebeast mb-2 text-lg capitalize tracking-[0.08em] sm:mb-2.5 sm:text-xl">
                  {eyebrow.toLowerCase()}
                </p>
              ) : null}
              <h2 className="leading-tight">
                <span
                  className="section-title-graphic-inner--line font-beautyofthebeast capitalize"
                  style={{ textShadow: '0 1px 4px rgba(250, 232, 206, 0.9)' }}
                >
                  {`${titleLead} ${titleRest}`.trim().toLowerCase()}
                </span>
              </h2>
            </div>
            {intro ? (
              <p
                className="ml-auto w-[60%] max-w-full pb-4 font-poppins text-xs leading-snug font-light sm:text-[0.8125rem]"
                style={{
                  color: '#3f3348',
                  textShadow: '0 1px 2px rgba(250, 232, 206, 0.8)',
                  whiteSpace: 'pre-line'
                }}
              >
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <GraphicLink
        ref={buttonRef}
        href={ctaHref}
        target="_blank"
        rel="noreferrer"
        imageSrc="/images/graphics/button-container.png"
        className="graphic-button--cta absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-5 z-30 shrink-0 whitespace-nowrap transition-opacity hover:opacity-95 sm:right-8"
        contentClassName="font-beautyofthebeast lowercase !text-[0.9rem] sm:!text-[1rem]"
      >
        <span style={{ color: '#3f3348' }}>
          {ctaLabel}
        </span>
        <FiExternalLink className="h-4 w-4 shrink-0 text-[#5a4868]" aria-hidden />
      </GraphicLink>
    </section>
  )
}

export default OurGiftSection
