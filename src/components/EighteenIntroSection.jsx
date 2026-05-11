import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EighteenList from './EighteenList'
import GraphicButton from './GraphicButton'
import { eighteenths } from '../data'

gsap.registerPlugin(ScrollTrigger)

/** Prenup photo not referenced elsewhere on this invitation. */
const INTRO_BG = '/images/prenup/A7400961.jpg'

/** Eighteenths full-screen modal background (graphics). */
const MODAL_PALACE_BG = '/images/graphics/palace.png'

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
        <div className="relative z-20 w-full max-w-lg mr-auto px-5 sm:px-8">
          <div className="overflow-hidden">
            <div ref={contentRef} className="py-5 text-left">
              <div className="section-title-graphic mb-2 inline-block sm:mb-2.5">
                <div className="section-title-graphic-inner section-title-graphic-inner--left">
                  <p className="font-beautyofthebeast mb-2 text-lg capitalize tracking-[0.08em] sm:mb-2.5 sm:text-xl" style={{ color: '#6F2D36' }}>
                    Programme
                  </p>
                  <h2 className="leading-tight">
                    <span className="section-title-graphic-inner--line font-beautyofthebeast capitalize">
                      The eighteenth&apos;s
                    </span>
                  </h2>
                </div>
              </div>
              <p className="font-poppins font-light text-xs sm:text-[0.8125rem] leading-snug w-[60%] max-w-full pb-4" style={{ color: '#6F2D36' }}>
                {teaser}
              </p>
            </div>
          </div>
        </div>
        <GraphicButton
          ref={buttonRef}
          imageSrc="/images/graphics/button-container.png"
          onClick={() => setModalOpen(true)}
          className="graphic-button--cta attendance-confirm-button absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-5 z-30 shrink-0 whitespace-nowrap transition-opacity hover:opacity-95 sm:left-8"
          contentClassName="font-beautyofthebeast lowercase"
          aria-haspopup="dialog"
        >
          view full list
          <FiArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
        </GraphicButton>
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
