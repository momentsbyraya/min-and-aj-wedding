import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PrenupFeature = ({
  src = '/images/prenup/NZ6_6972.jpeg',
  objectPosition = 'center top'
}) => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-3 sm:py-4 md:py-5"
      style={{ backgroundColor: '#F0C9CE' }}
      aria-label="Prenup photo"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-md justify-center px-3 sm:max-w-xl sm:px-4 lg:max-w-2xl">
        <div
          ref={imageRef}
          className="gallery-tile gallery-tile--landscape w-full"
          style={{
            aspectRatio: '3 / 2',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          <div className="gallery-tile-inner h-full w-full">
            <img
              src={src}
              alt="AJ & Min prenup"
              draggable={false}
              loading="lazy"
              style={{ objectPosition }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrenupFeature
