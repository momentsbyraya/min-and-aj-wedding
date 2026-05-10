import React, { useEffect, useRef } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wedding } from '../data'

gsap.registerPlugin(ScrollTrigger)

const BG = wedding.giftSection?.backgroundImage || '/images/prenup/A7401414.jpg'
const DEFAULT_BOTTOM_IMG = '/images/gift/gcash%20no.jpg'

const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`

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
      style={{ backgroundColor: '#F9E8F0' }}
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8A9BC]/90 via-[#F5CAD7]/65 to-transparent" />
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

      <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(85, 135), height: randSize(75, 120), top: randPct(8, 22), left: randPct(8, 22) }} />
      <div className="soft-blob z-0" style={{ width: randSize(75, 120), height: randSize(65, 105), top: randPct(66, 84), left: randPct(66, 84) }} />
      <img
        src="/images/graphics/flower.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[18%] z-0 w-16 opacity-35 blur-[2px]"
      />
      <img
        src="/images/graphics/flower-2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[4%] z-0 w-24 opacity-25 blur-[3px]"
      />

      <div className="relative z-20 ml-auto mr-0 flex w-full max-w-lg justify-end px-5 sm:px-8">
        <div className="overflow-hidden">
          <div ref={contentRef} className="py-5 text-right">
            {eyebrow ? (
              <p
                className="eighteen-intro-rozha-label font-rozha mb-2 text-lg tracking-[0.12em] uppercase sm:mb-2.5 sm:text-xl"
                style={{ color: '#6F2D36' }}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mb-2 leading-none sm:mb-2.5">
              <span className="block font-halimun text-[1.875rem] sm:text-[2.125rem] md:text-[2.375rem]" style={{ color: '#6F2D36' }}>
                {titleLead}
              </span>
              <span
                className="mt-1 block font-rozha text-[1.875rem] lowercase sm:text-[2.125rem] md:text-[2.375rem]"
                style={{ color: '#6F2D36' }}
              >
                {titleRest}
              </span>
            </h2>
            {intro ? (
              <p
                className="ml-auto w-[60%] max-w-full pb-4 font-poppins text-xs leading-snug font-light sm:text-[0.8125rem]"
                style={{ color: '#6F2D36' }}
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

      <a
        ref={buttonRef}
        href={ctaHref}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-5 z-30 inline-flex items-center justify-center gap-2 rounded-full bg-[#E28B91] px-6 py-2.5 font-poppins text-base text-white whitespace-nowrap transition-opacity hover:opacity-95 sm:right-8"
      >
        <span className="font-poppins">{ctaLabel}</span>
        <FiExternalLink className="h-4 w-4 shrink-0" aria-hidden />
      </a>
    </section>
  )
}

export default OurGiftSection
