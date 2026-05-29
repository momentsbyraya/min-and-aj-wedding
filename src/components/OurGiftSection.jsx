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
      style={{ backgroundColor: '#fce3ee' }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundPosition: '68% center'
        }}
        aria-hidden
      />

      {/* Mirrored overlays (fuchsia wash anchors on the right, matching right-aligned copy) */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-[#80043a]/90 via-[#ed5c95]/65 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 50%, rgba(226, 9, 100, 0.85) 0%, rgba(237, 92, 149, 0.45) 48%, transparent 78%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(128, 4, 58, 0.45) 0%, rgba(226, 9, 100, 0.4) 32%, transparent 62%), linear-gradient(180deg, rgba(245, 196, 218, 0.65) 0%, transparent 38%, transparent 62%, rgba(243, 152, 188, 0.5) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(226, 9, 100, 0.75) 0%, rgba(252, 227, 238, 0.4) 45%, transparent 68%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(128, 4, 58, 0.5) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(237, 92, 149, 0.6) 0%, rgba(245, 196, 218, 0.4) 22%, transparent 50%), linear-gradient(102deg, rgba(243, 152, 188, 0.45) 0%, transparent 52%)'
          }}
        />
      </div>

      <div className="relative z-20 ml-auto mr-0 flex w-full max-w-lg justify-end px-5 sm:px-8">
        <div className="overflow-hidden">
          <div ref={contentRef} className="py-5 text-right">
            <div className="mb-2 ml-auto mr-0 inline-block text-right sm:mb-2.5" style={{ color: '#ffffff', textShadow: '0 2px 14px rgba(8, 50, 48, 0.55), 0 1px 3px rgba(0, 0, 0, 0.45)' }}>
              {eyebrow ? (
                <p className="font-beautyofthebeast mb-2 text-lg capitalize tracking-[0.08em] sm:mb-2.5 sm:text-xl">
                  {eyebrow.toLowerCase()}
                </p>
              ) : null}
              <h2 className="leading-tight">
                <span
                  className="section-title-graphic-inner--line font-beautyofthebeast capitalize"
                  style={{ textShadow: '0 2px 18px rgba(8, 50, 48, 0.6), 0 1px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  {`${titleLead} ${titleRest}`.trim().toLowerCase()}
                </span>
              </h2>
            </div>
            {intro ? (
              <p
                className="ml-auto w-[60%] max-w-full pb-4 font-poppins text-xs leading-snug font-light sm:text-[0.8125rem]"
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 12px rgba(8, 50, 48, 0.55), 0 1px 3px rgba(0, 0, 0, 0.45)',
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
        className="graphic-button--cta attendance-confirm-button absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-5 z-30 shrink-0 whitespace-nowrap transition-opacity hover:opacity-95 sm:right-8"
        contentClassName="font-beautyofthebeast lowercase !text-[0.9rem] sm:!text-[1rem] mb-2"
      >
        <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
          {ctaLabel}
        </span>
        <FiExternalLink className="h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden />
      </GraphicLink>
    </section>
  )
}

export default OurGiftSection
