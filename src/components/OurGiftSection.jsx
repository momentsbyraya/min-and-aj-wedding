import React, { useEffect, useRef } from 'react'
import GraphicLink from './GraphicLink'
import { FiExternalLink } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wedding } from '../data'

gsap.registerPlugin(ScrollTrigger)

const BG = wedding.giftSection?.backgroundImage || '/images/prenup/A7401414.jpg'
const DEFAULT_BOTTOM_IMG = '/images/gift/gcash%20no.jpg'

const OurGiftSection = () => {
  const gs = wedding.giftSection ?? {}
  const eyebrow = (gs.eyebrow ?? 'Wish list').trim()
  const titleLead = (gs.titleLead ?? 'gift').trim()
  const titleRest = (gs.titleRest ?? 'ideas').trim()
  const intro = (gs.intro ?? '').trim()
  const ctaLabel = (gs.ctaLabel ?? 'View registry').trim()
  const ctaHref = gs.ctaUrl || wedding.details?.registry || '#'
  const bottomImg = gs.bottomImage || DEFAULT_BOTTOM_IMG

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
      style={{ backgroundColor: '#E1F4F3' }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundPosition: '58% center'
        }}
        aria-hidden
      />

      {/* Mirrored overlays (pink wash anchors on the right, matching right-aligned copy) */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-[#48B5B1]/90 via-[#C9E5E4]/65 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 50%, rgba(245, 202, 215, 0.55) 0%, rgba(253, 242, 246, 0.12) 48%, transparent 72%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(232, 169, 188, 0.22) 0%, rgba(245, 202, 215, 0.18) 32%, transparent 58%), linear-gradient(180deg, rgba(249, 232, 240, 0.4) 0%, transparent 38%, transparent 62%, rgba(248, 228, 238, 0.25) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(245, 202, 215, 0.48) 0%, rgba(253, 242, 246, 0.12) 45%, transparent 62%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(232, 169, 188, 0.22) 0%, transparent 65%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(237, 194, 204, 0.36) 0%, rgba(250, 224, 233, 0.14) 22%, transparent 44%), linear-gradient(102deg, rgba(248, 228, 238, 0.22) 0%, transparent 48%)'
          }}
        />
      </div>

      <div className="relative z-20 ml-auto mr-0 flex w-full max-w-lg justify-end px-5 sm:px-8">
        <div className="overflow-hidden">
          <div ref={contentRef} className="py-5 text-right">
            <div className="mb-2 ml-auto mr-0 inline-block text-right sm:mb-2.5" style={{ color: '#0a3F3D' }}>
              {eyebrow ? (
                <p className="font-beautyofthebeast mb-2 text-lg capitalize tracking-[0.08em] sm:mb-2.5 sm:text-xl">
                  {eyebrow.toLowerCase()}
                </p>
              ) : null}
              <h2 className="leading-tight">
                <span
                  className="section-title-graphic-inner--line font-beautyofthebeast capitalize"
                  style={{ textShadow: '0 1px 0 rgba(255, 250, 252, 0.35)' }}
                >
                  {`${titleLead} ${titleRest}`.trim().toLowerCase()}
                </span>
              </h2>
            </div>
            {intro ? (
              <p
                className="ml-auto w-[60%] max-w-full pb-4 font-poppins text-xs leading-snug font-light sm:text-[0.8125rem]"
                style={{ color: '#0a3F3D' }}
              >
                {intro}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {bottomImg ? (
        <img
          src={bottomImg}
          alt=""
          className="pointer-events-none absolute bottom-4 left-0 z-[12] h-auto w-[35%] max-w-[250px] select-none object-contain object-[left_bottom] sm:bottom-5"
          style={{
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
            paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))'
          }}
          draggable={false}
          aria-hidden
        />
      ) : null}

      <GraphicLink
        ref={buttonRef}
        href={ctaHref}
        target="_blank"
        rel="noreferrer"
        imageSrc="/images/graphics/button-container.png"
        className="graphic-button--cta attendance-confirm-button absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-5 z-30 shrink-0 whitespace-nowrap transition-opacity hover:opacity-95 sm:right-8"
        contentClassName="font-beautyofthebeast lowercase !text-[0.9rem] sm:!text-[1rem]"
      >
        {ctaLabel}
        <FiExternalLink className="h-4 w-4 shrink-0" aria-hidden />
      </GraphicLink>
    </section>
  )
}

export default OurGiftSection
