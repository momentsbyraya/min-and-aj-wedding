import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { galleryPrenups } from '../data'
import { prenupAssetFromPath } from '../utils/prenupAssets'

gsap.registerPlugin(ScrollTrigger)

const prenupUrl = (file) => prenupAssetFromPath(file)

const Gallery = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const altDefault = galleryPrenups.altDefault ?? 'Gallery'

  const galleryItems = useMemo(() => {
    if (Array.isArray(galleryPrenups.items) && galleryPrenups.items.length > 0) {
      return galleryPrenups.items.map((item) => ({
        src: prenupUrl(item.file),
        alt: item.alt || altDefault,
        portrait: Boolean(item.portrait),
        objectPosition: item.objectPosition || 'center'
      }))
    }

    return (galleryPrenups.files || []).map((file) => ({
      src: prenupUrl(file),
      alt: altDefault,
      portrait: false,
      objectPosition: galleryPrenups.tileObjectPosition?.[file] || 'center'
    }))
  }, [altDefault])

  const closeLightbox = useCallback(() => setActiveIndex(null), [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return (current - 1 + galleryItems.length) % galleryItems.length
    })
  }, [galleryItems.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return (current + 1) % galleryItems.length
    })
  }, [galleryItems.length])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )

    return () => {
      tl.kill()
    }
  }, [])

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, closeLightbox, showNext, showPrevious])

  if (galleryItems.length === 0) return null

  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="relative min-h-screen w-full overflow-hidden bg-cover bg-no-repeat py-20 md:min-h-0"
        style={{
          backgroundColor: '#F0C9CE',
          backgroundImage: 'url(/images/graphics/gallery-bg.png)',
          backgroundPosition: 'right center'
        }}
      >
        <div className="relative z-20 flex items-center justify-center py-12">
          <div className="mx-auto w-full max-w-md px-8 sm:max-w-xl sm:px-12 lg:max-w-4xl lg:px-16 xl:max-w-5xl">
            <div ref={headerRef} className="mb-12 text-center">
              <h2 className="font-lavishly text-5xl italic text-[#6B3F48] sm:text-6xl md:text-7xl lg:text-8xl">
                Our Moments
              </h2>
            </div>

            <div
              ref={contentRef}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
            >
              {galleryItems.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`soft-edges group relative overflow-hidden border-0 bg-transparent p-0 text-left transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5560]/60 ${
                    item.portrait ? 'aspect-[3/4]' : ''
                  }`}
                  aria-label={`View ${item.alt || `photo ${index + 1}`}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt || `${altDefault} — ${index + 1}`}
                    className={`w-full cursor-pointer object-cover ${
                      item.portrait ? 'h-full' : 'h-auto'
                    }`}
                    style={{ objectPosition: item.objectPosition }}
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.alt || 'Photo preview'}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/90"
              onClick={closeLightbox}
              aria-label="Close preview"
            />

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
              aria-label="Close"
            >
              <FiX className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
            </button>

            {galleryItems.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 sm:left-4 sm:p-3"
                  aria-label="Previous photo"
                >
                  <FiChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 sm:right-4 sm:p-3"
                  aria-label="Next photo"
                >
                  <FiChevronRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                </button>
              </>
            ) : null}

            <figure className="relative z-10 flex max-h-full max-w-full items-center justify-center">
              <img
                src={activeItem.src}
                alt={activeItem.alt || 'Gallery photo'}
                className="max-h-[85vh] max-w-[min(92vw,960px)] object-contain"
                draggable={false}
              />
            </figure>
          </div>,
          document.body
        )}
    </>
  )
}

export default Gallery
