import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { FiX } from 'react-icons/fi'
import EntourageTextContent from './EntourageTextContent'
import './Entourage.css'

const ACCENT = '#8B5560'

const EntourageModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null)
  const wrapperRef = useRef(null)
  const childRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    gsap.set([overlayRef.current, wrapperRef.current], { opacity: 0 })
    gsap.set(childRef.current, { opacity: 0, y: 24, scale: 0.98 })

    gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.to(wrapperRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(childRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
      delay: 0.05
    })

    const onKey = (e) => {
      if (e.key === 'Escape') closeWithAnimation()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const closeWithAnimation = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(childRef.current, { opacity: 0, y: 16, scale: 0.98, duration: 0.2, ease: 'power2.out' }, 0)
    tl.to(wrapperRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0)
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0)
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current || e.target === wrapperRef.current) {
      closeWithAnimation()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40"
        onClick={handleOverlayClick}
        aria-hidden
      />

      {/* Main wrapper — ribbon cover background */}
      <div
        ref={wrapperRef}
        className="entourage-modal-wrapper absolute inset-0 flex items-center justify-center p-4 sm:p-6"
        onClick={handleOverlayClick}
        style={{
          backgroundColor: '#FBF3F0',
          backgroundImage: 'url(/images/graphics/bg-with-ribbon.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <button
          type="button"
          onClick={closeWithAnimation}
          className="fixed right-4 top-4 z-30 rounded-full bg-white/75 p-2 text-[#8B5560] transition-colors duration-200 hover:bg-white/95 hover:text-[#6B3F48]"
          aria-label="Close"
        >
          <FiX className="h-6 w-6" />
        </button>

        {/* Child modal — 90vh, centered, holds text */}
        <div
          ref={childRef}
          className="entourage-modal-child relative z-10 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm bg-[#FFF8F7]/92 shadow-lg backdrop-blur-[2px] sm:h-auto sm:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="entourage-modal-scroll min-h-0 flex-1 overflow-y-auto py-8 sm:py-10">
            <h2 className="entourage-display-title mb-8 text-center font-lavishly text-4xl text-[#8B5560] sm:mb-10 sm:text-5xl md:text-6xl">
              Entourage
            </h2>
            <EntourageTextContent accentColor={ACCENT} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EntourageModal
