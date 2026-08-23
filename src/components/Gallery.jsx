import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryPrenups } from '../data'

gsap.registerPlugin(ScrollTrigger)

const prenupUrl = (file) => `/images/prenup/${file}`

const Gallery = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const galleryItems = useMemo(() => {
    if (Array.isArray(galleryPrenups.items) && galleryPrenups.items.length > 0) {
      return galleryPrenups.items.map((item) => ({
        src: prenupUrl(item.file),
        portrait: Boolean(item.portrait),
        objectPosition: item.objectPosition || 'center'
      }))
    }

    return (galleryPrenups.files || []).map((file) => ({
      src: prenupUrl(file),
      portrait: false,
      objectPosition: galleryPrenups.tileObjectPosition?.[file] || 'center'
    }))
  }, [])

  const altDefault = galleryPrenups.altDefault ?? 'Gallery'

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

  if (galleryItems.length === 0) return null

  return (
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
              <div
                key={item.src}
                className={`soft-edges relative overflow-hidden ${
                  item.portrait ? 'aspect-[3/4]' : ''
                }`}
              >
                <img
                  src={item.src}
                  alt={`${altDefault} — ${index + 1}`}
                  className={`w-full object-cover ${
                    item.portrait ? 'h-full' : 'h-auto'
                  }`}
                  style={{ objectPosition: item.objectPosition }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
