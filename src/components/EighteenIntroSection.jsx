import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EighteenList from './EighteenList'
import GraphicButton from './GraphicButton'
import { eighteenths } from '../data'

gsap.registerPlugin(ScrollTrigger)

/** Prenup photo not referenced elsewhere on this invitation. */
const INTRO_BG = '/images/prenup/NZ6_7550.jpeg'

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
        className="relative w-full overflow-hidden pt-24 pb-32 md:pt-44 md:pb-44"
        style={{ backgroundColor: '#FBF3F0' }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${INTRO_BG})`,
            backgroundPosition: '18% center'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#F7E0E3]/90 via-[#F0C9CE]/65 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 95% 115% at 0% 50%, rgba(232, 196, 200, 0.85) 0%, rgba(232, 196, 200, 0.45) 48%, transparent 78%)'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, rgba(155, 115, 124, 0.45) 0%, rgba(232, 196, 200, 0.4) 32%, transparent 62%), linear-gradient(180deg, rgba(248, 241, 234, 0.65) 0%, transparent 38%, transparent 62%, rgba(232, 180, 184, 0.5) 100%)'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 32% 100% at 0% 50%, rgba(232, 196, 200, 0.75) 0%, rgba(232, 196, 200, 0.4) 45%, transparent 68%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(155, 115, 124, 0.5) 0%, transparent 70%)'
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(232, 196, 200, 0.6) 0%, rgba(248, 241, 234, 0.4) 22%, transparent 50%), linear-gradient(102deg, rgba(232, 180, 184, 0.45) 0%, transparent 52%)'
          }}
          aria-hidden
        />
        <div className="relative z-20 w-full max-w-lg mr-auto px-5 sm:px-8">
          <div className="overflow-hidden">
            <div ref={contentRef} className="py-5 text-left">
              <div className="mb-2 inline-block text-left sm:mb-2.5" style={{ color: '#8B5560', textShadow: '0 1px 3px rgba(248, 241, 234, 0.85)' }}>
                <p className="font-beautyofthebeast mb-2 text-lg capitalize tracking-[0.08em] sm:mb-2.5 sm:text-xl">
                  Programme
                </p>
                <h2 className="leading-tight">
                  <span
                    className="section-title-graphic-inner--line font-beautyofthebeast capitalize"
                    style={{ textShadow: '0 1px 4px rgba(248, 241, 234, 0.9)' }}
                  >
                    The eighteenth&apos;s
                  </span>
                </h2>
              </div>
              <p
                className="font-poppins font-light text-xs sm:text-[0.8125rem] leading-snug w-[60%] max-w-full pb-4"
                style={{ color: '#8B5560', textShadow: '0 1px 2px rgba(248, 241, 234, 0.8)' }}
              >
                {teaser}
              </p>
            </div>
          </div>
        </div>
        <div
          ref={buttonRef}
          className="absolute z-30 flex flex-col items-start justify-end gap-1.5 left-5 sm:left-8"
          style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
          <GraphicButton
            imageSrc="/images/graphics/button-container.png"
            onClick={() => setModalOpen(true)}
            className="graphic-button--cta shrink-0 whitespace-nowrap transition-opacity hover:opacity-95 mb-6"
            contentClassName="font-beautyofthebeast lowercase !text-[0.9rem] sm:!text-[1rem] !mb-2"
            aria-haspopup="dialog"
          >
            <span style={{ color: '#8B5560' }}>
              view full list
            </span>
            <FiArrowRight className="h-4 w-4 shrink-0 text-[#B07D86] -mb-1.5" aria-hidden="true" />
          </GraphicButton>
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[195] flex min-h-0 flex-col modal-slide-up-panel"
          style={{ backgroundColor: '#FBF3F0' }}
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
                'linear-gradient(180deg, rgba(243, 229, 245, 0.45) 0%, rgba(237, 207, 230, 0.3) 45%, rgba(225, 190, 231, 0.5) 100%)'
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
            className="absolute z-20 rounded-full border border-[#F7E0E3]/18 bg-white/90 p-2.5 text-[#8B5560] shadow-[0_4px_16px_rgba(111,45,54,0.12)] transition-colors hover:bg-white"
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
