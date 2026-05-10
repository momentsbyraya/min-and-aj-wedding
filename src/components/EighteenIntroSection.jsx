import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EighteenList from './EighteenList'
import { eighteenths } from '../data'

gsap.registerPlugin(ScrollTrigger)

/** Prenup photo not referenced elsewhere on this invitation. */
const INTRO_BG = '/images/prenup/A7400961.jpg'

/** Eighteenths full-screen modal background (graphics). */
const MODAL_PALACE_BG = '/images/graphics/palace.png'

const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`

const EighteenIntroSection = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [listScroller, setListScroller] = useState(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)

  const teaser = (eighteenths.sectionIntro ?? '').trim()

  const bindScrollPane = useCallback((node) => {
    setListScroller(node)
  }, [])

  useEffect(() => {
    if (!modalOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setModalOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen || !listScroller) return undefined
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [modalOpen, listScroller])

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

  const closeModal = () => setModalOpen(false)

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full pt-24 md:pt-44 pb-28 md:pb-36 overflow-hidden"
        style={{ backgroundColor: '#F9E8F0' }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${INTRO_BG})`,
            backgroundPosition: '42% center'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#E8A9BC]/90 via-[#F5CAD7]/65 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 50%, rgba(245, 202, 215, 0.55) 0%, rgba(253, 242, 246, 0.12) 48%, transparent 72%)'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, rgba(232, 169, 188, 0.22) 0%, rgba(245, 202, 215, 0.18) 32%, transparent 58%), linear-gradient(180deg, rgba(249, 232, 240, 0.4) 0%, transparent 38%, transparent 62%, rgba(248, 228, 238, 0.25) 100%)'
          }}
          aria-hidden
        />
        {/* Narrow-band pink wash (mostly left column, fades before mid viewport) */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(245, 202, 215, 0.48) 0%, rgba(253, 242, 246, 0.12) 45%, transparent 62%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(232, 169, 188, 0.22) 0%, transparent 65%)'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(237, 194, 204, 0.36) 0%, rgba(250, 224, 233, 0.14) 22%, transparent 44%), linear-gradient(102deg, rgba(248, 228, 238, 0.22) 0%, transparent 48%)'
          }}
          aria-hidden
        />
        <div className="soft-blob z-0" style={{ width: randSize(85, 135), height: randSize(75, 120), top: randPct(8, 22), left: randPct(66, 84) }} />
        <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(75, 120), height: randSize(65, 105), top: randPct(66, 84), left: randPct(8, 22) }} />
        <img
          src="/images/graphics/flower.png"
          alt=""
          aria-hidden="true"
          className="absolute top-[18%] right-[8%] w-16 opacity-35 blur-[2px] pointer-events-none z-0"
        />
        <img
          src="/images/graphics/flower-2.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-[10%] left-[4%] w-24 opacity-25 blur-[3px] pointer-events-none z-0"
        />
        <div className="relative z-20 w-full max-w-lg mr-auto px-5 sm:px-8">
          <div className="overflow-hidden">
            <div ref={contentRef} className="py-5 text-left">
              <p
                className="eighteen-intro-rozha-label font-rozha text-lg sm:text-xl tracking-[0.12em] uppercase mb-2 sm:mb-2.5"
                style={{ color: '#6F2D36' }}
              >
                Programme
              </p>
              <h2 className="leading-none mb-2 sm:mb-2.5">
                <span className="block font-halimun text-[1.875rem] sm:text-[2.125rem] md:text-[2.375rem]" style={{ color: '#6F2D36' }}>
                  the
                </span>
                <span className="block font-rozha text-[1.875rem] sm:text-[2.125rem] md:text-[2.375rem] lowercase mt-1" style={{ color: '#6F2D36' }}>
                  {"eighteenth's"}
                </span>
              </h2>
              <p className="font-poppins font-light text-xs sm:text-[0.8125rem] leading-snug w-[60%] max-w-full pb-4" style={{ color: '#6F2D36' }}>
                {teaser}
              </p>
            </div>
          </div>
        </div>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setModalOpen(true)}
          className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-5 z-30 inline-flex items-center justify-center gap-2 rounded-full bg-[#E28B91] px-6 py-2.5 font-poppins text-base text-white whitespace-nowrap transition-opacity hover:opacity-95 sm:left-8"
          aria-haspopup="dialog"
        >
          <span className="font-poppins">View full list</span>
          <FiArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[195] flex min-h-0 flex-col"
          style={{ backgroundColor: '#F9E8F0' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="eighteen-modal-title"
        >
          <h2 id="eighteen-modal-title" className="sr-only">
            {"The eighteenth's programme list"}
          </h2>
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${MODAL_PALACE_BG})` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(180deg, rgba(253, 244, 248, 0.45) 0%, rgba(252, 235, 243, 0.3) 45%, rgba(249, 232, 240, 0.5) 100%)'
            }}
            aria-hidden
          />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <div
              ref={bindScrollPane}
              className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
              style={{
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom))'
              }}
            >
              {listScroller ? <EighteenList scrollerElement={listScroller} /> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="absolute z-20 rounded-full border border-[#6F2D36]/18 bg-white/90 p-2.5 text-[#6F2D36] shadow-[0_4px_16px_rgba(111,45,54,0.12)] transition-colors hover:bg-white"
            style={{
              top: 'max(1rem, env(safe-area-inset-top))',
              right: 'max(1rem, env(safe-area-inset-right))'
            }}
            aria-label="Close eighteen list"
          >
            <FiX className="h-6 w-6" aria-hidden />
          </button>
        </div>
      )}
    </>
  )
}

export default EighteenIntroSection
