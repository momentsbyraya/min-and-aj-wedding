import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CelebrantStory = ({ onImageClick }) => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const imageRef = useRef(null)

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
      headingRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.72, ease: 'power2.out' }
    )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.82, ease: 'power2.out' },
        '-=0.28'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.58, ease: 'power2.out' },
        '-=0.22'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-40 pb-20 w-full overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="intro-flower-banner absolute top-0 left-1/2 -translate-x-1/2 opacity-80 pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180 opacity-80 pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <div className="soft-blob z-0" style={{ width: randSize(90, 136), height: randSize(74, 114), top: randPct(8, 22), left: randPct(6, 20) }} />
      <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(76, 118), height: randSize(64, 100), top: randPct(66, 84), left: randPct(68, 84) }} />
      <img
        src="/images/graphics/flower.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[14%] right-[8%] w-14 opacity-30 blur-[2px] pointer-events-none z-0"
      />
      <img
        src="/images/graphics/flower-2.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-[12%] left-[8%] w-20 opacity-25 blur-[3px] pointer-events-none z-0"
      />

      <div className="relative z-20 w-full max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
        <h2 ref={headingRef} className="leading-none mb-8 inline-flex items-end justify-center gap-2 whitespace-nowrap">
          <span className="inline-block font-rozha text-5xl lowercase" style={{ color: '#6F2D36' }}>
            about
          </span>
          <span
            className="inline-block font-halimun text-xl leading-none"
            style={{ color: '#6F2D36', marginBottom: '-6px' }}
          >
            Abby
          </span>
        </h2>

        <p ref={paragraphRef} className="font-poppins text-sm leading-relaxed" style={{ color: '#6F2D36' }}>
          Abby is a precious gift ...
          <br />
          a beautiful reminder
          <br />
          of all that is good in this world.
          <br />
          <br />
          Her laughter &amp; smile lights up even one&apos;s hardest days. She may look fragile, but she is so much
          more than perfect - she&apos;s graciously funny, kind and so bold facing new challenges in life.
          <br />
          <br />
          Every moment with her is a treasure. The world is brighter because Abby is in it ...
          <br />
          So favored to have spent life &amp; time with her!
        </p>

        <div ref={imageRef} className="mt-6 flex justify-center">
          <img
            src="/images/graphics/wine.png"
            alt="Our cheers"
            className="w-[120px] h-auto object-contain"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="dresscode-soft-edges relative">
            <img
              src="/images/prenup/DSC01286.jpg"
              alt="Prenup look 1"
              className="dresscode-image-fade w-full h-auto object-cover cursor-pointer"
              onClick={() => onImageClick?.('/images/prenup/DSC01286.jpg')}
            />
          </div>
          <div className="dresscode-soft-edges relative">
            <img
              src="/images/prenup/DSC01404.jpg"
              alt="Prenup look 2"
              className="dresscode-image-fade w-full h-auto object-cover cursor-pointer"
              onClick={() => onImageClick?.('/images/prenup/DSC01404.jpg')}
            />
          </div>
          <div className="dresscode-soft-edges relative">
            <img
              src="/images/prenup/DSC01482.jpg"
              alt="Prenup look 3"
              className="dresscode-image-fade w-full h-auto object-cover cursor-pointer"
              onClick={() => onImageClick?.('/images/prenup/DSC01482.jpg')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CelebrantStory
