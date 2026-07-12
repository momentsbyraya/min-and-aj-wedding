import React, { useMemo, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { galleryPrenups, theme } from '../data'

gsap.registerPlugin(ScrollTrigger)

const prenupUrl = (file) => `/images/prenup/${file}`

const Gallery = () => {
  const galleryImages = useMemo(
    () => galleryPrenups.files.map(prenupUrl),
    []
  )
  const altDefault = galleryPrenups.altDefault ?? 'Gallery'

  const tileObjectPosition = useMemo(() => {
    const raw = galleryPrenups.tileObjectPosition ?? {}
    const out = {}
    for (const [file, pos] of Object.entries(raw)) {
      out[prenupUrl(file)] = pos
    }
    return out
  }, [])

  const galleryBlushBg = '#fae8ce'

  const titleRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const imageRefs = useRef([])

  const gridColumnPattern = [
    'span 3',
    'span 1',
    'span 2',
    'span 2',
    'span 1',
    'span 3',
    'span 1',
    'span 2',
    'span 2',
    'span 1'
  ]

  const gridColumnForIndex = (index) => {
    if (galleryImages.length === 4 && index === 3) return 'span 3'
    return gridColumnPattern[index % gridColumnPattern.length]
  }

  const compactTileClass =
    'gallery-tile max-h-[150px] cursor-pointer md:max-h-[260px] lg:max-h-[300px]'

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return

      const isFromLeft = index % 2 === 0
      const xValue = isFromLeft ? -100 : 100

      gsap.set(ref, {
        opacity: 0,
        x: xValue,
        force3D: true
      })

      ScrollTrigger.create({
        trigger: ref,
        start: 'top 85%',
        animation: gsap.to(ref, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true
        }),
        toggleActions: 'play none none reverse'
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const t = trigger.vars?.trigger
        if (t === titleRef.current || imageRefs.current.includes(t)) {
          trigger.kill()
        }
      })
    }
  }, [galleryImages.length])

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    if (!isModalOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
      else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isModalOpen, galleryImages.length])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

      if (overlayRef.current && contentRef.current) {
        gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
        gsap.set(contentRef.current, { scale: 0.9 })

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(contentRef.current, {
        opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  const galleryCount = galleryImages.length
  const mainGallery = galleryCount > 2 ? galleryImages.slice(0, -2) : []
  const tailPair = galleryCount >= 2 ? galleryImages.slice(-2) : galleryImages

  /** Oval frame on 2 of every 5 tiles (e.g. indices 1 and 3). */
  const useOvalFrame = (index) => index % 5 === 1 || index % 5 === 3

  const renderGridTile = (image, index, gridColumn) => {
    const isFullWidthRow = gridColumn === 'span 3'
    const objectPosition = tileObjectPosition[image]
    const ovalClass = useOvalFrame(index) ? ' gallery-tile--oval' : ''
    return (
      <div
        ref={(el) => {
          imageRefs.current[index] = el
        }}
        className={
          (isFullWidthRow
            ? 'gallery-tile min-h-[11rem] max-h-[220px] cursor-pointer sm:min-h-[13rem] sm:max-h-[260px] md:min-h-[17rem] md:max-h-[400px] lg:min-h-[18rem] lg:max-h-[440px]'
            : compactTileClass) + ovalClass
        }
        style={{
          gridColumn,
          height: '100%',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
        onClick={() => handleImageClick(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleImageClick(index)
          }
        }}
        aria-label={`Open gallery image ${index + 1}`}
      >
        <div className="gallery-tile-inner h-full w-full">
          <img
            src={image}
            alt={`${altDefault} — preview ${index + 1}`}
            draggable="false"
            style={{
              objectPosition: objectPosition ?? 'center'
            }}
            loading="lazy"
          />
        </div>
      </div>
    )
  }

  if (galleryCount === 0) return null

  return (
    <div id="gallery" className="relative">
      <div
        className="relative z-10 pb-8 pt-8 sm:pb-12 sm:pt-10 md:pb-16 bg-cover bg-left bg-no-repeat"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          backgroundColor: galleryBlushBg,
          backgroundImage: "url('/images/graphics/hero-bg.png')",
          backgroundBlendMode: 'soft-light'
        }}
      >
        <img
          src="/images/graphics/fan%20flower%20-%203.png"
          alt=""
          aria-hidden="true"
          className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 h-auto pointer-events-none z-[5]"
        />
        <img
          src="/images/graphics/flower-right-2.png"
          alt=""
          aria-hidden="true"
          className="intro-corner-accent intro-corner-accent--flower-right absolute top-0 right-0 h-auto pointer-events-none z-[5]"
        />
        <div className="soft-blob soft-blob--alt absolute bottom-[8%] left-[12%] w-40 h-40 z-[1]" aria-hidden="true" />
        <div className={`mx-auto w-full ${theme.container.padding} ${theme.container.maxWidth} ${theme.container.center}`}>
          <h3 ref={titleRef} className="relative flex w-full justify-center py-3 text-center">
            <span className="section-title-graphic section-title-graphic--center">
              <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
                Gallery
              </span>
            </span>
          </h3>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <div className="grid auto-rows-auto grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {galleryCount === 1 && renderGridTile(galleryImages[0], 0, gridColumnForIndex(0))}

              {galleryCount >= 2 &&
                mainGallery.map((image, index) => (
                  <React.Fragment key={image}>{renderGridTile(image, index, gridColumnForIndex(index))}</React.Fragment>
                ))}

              {galleryCount >= 2 && (
                <div className="col-span-3 flex min-w-0 flex-row gap-3 sm:gap-4 md:gap-5">
                  {tailPair.map((image, i) => {
                    const index = galleryCount - 2 + i
                    const objectPosition = tileObjectPosition[image]
                    const flexGrow = i === 0 ? 'flex-[2]' : 'flex-[3]'
                    const ovalClass = useOvalFrame(index) ? ' gallery-tile--oval' : ''
                    return (
                      <div
                        key={image}
                        ref={(el) => {
                          imageRefs.current[index] = el
                        }}
                        className={`min-w-0 ${flexGrow} ${compactTileClass}${ovalClass}`}
                        style={{
                          height: '100%',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)'
                        }}
                        onClick={() => handleImageClick(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleImageClick(index)
                          }
                        }}
                        aria-label={`Open gallery image ${index + 1}`}
                      >
                        <div className="gallery-tile-inner h-full w-full">
                          <img
                            src={image}
                            alt={`${altDefault} — preview ${index + 1}`}
                            draggable="false"
                            style={{
                              objectPosition: objectPosition ?? 'center'
                            }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ position: 'fixed' }}>
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
              aria-hidden
            />

            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              aria-label="Close gallery"
            >
              <FiX className="h-6 w-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              aria-label="Previous image"
            >
              <FiChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              aria-label="Next image"
            >
              <FiChevronRight className="h-6 w-6 text-white" />
            </button>

            <div
              ref={contentRef}
              className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
              style={{ pointerEvents: 'none' }}
            >
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${altDefault} — fullscreen ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-full object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-poppins text-sm text-white">
                {currentImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default Gallery 
