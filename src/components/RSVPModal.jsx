import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { FiX } from 'react-icons/fi'
import { theme } from '../data'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { y: '100%' })

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.48,
        ease: 'power3.out'
      })
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' })
    gsap.to(contentRef.current, {
      y: '100%',
      duration: 0.38,
      ease: 'power2.in'
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-end justify-center p-0"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white shadow-2xl w-screen h-screen max-w-none max-h-none overflow-hidden"
        style={{
          border: `0.5px solid ${theme.colors.primary}`,
          outline: `0.5px solid ${theme.colors.primary}`,
          outlineOffset: '-5px',
          borderRadius: 0
        }}
      >
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200" style={{ borderRadius: 0 }}>
          <h3 className="font-leckerli text-2xl sm:text-3xl" style={{ color: theme.colors.ink || theme.colors.primary }}>RSVP</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex h-[calc(100vh-97px)] w-full items-center justify-center bg-white">
          <p
            className="font-albert text-sm font-thin uppercase tracking-[0.2em] sm:text-base"
            style={{ color: theme.colors.ink || theme.colors.primary }}
          >
            TO BE ADDED
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal 