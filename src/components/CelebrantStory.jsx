import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CelebrantStory = () => {
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
    <section ref={sectionRef} className="relative py-20 w-full overflow-hidden" style={{ backgroundColor: 'transparent' }}>
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

      <div className="relative z-20 w-full max-w-md mx-auto px-5 text-center">
        <h2 ref={headingRef} className="leading-none mb-8 inline-flex items-end justify-center gap-2 whitespace-nowrap">
          <span className="inline-block font-rozha text-5xl lowercase" style={{ color: '#c86f78' }}>
            about
          </span>
          <span
            className="inline-block font-halimun text-xl leading-none lowercase"
            style={{ color: '#E28B91', marginBottom: '-6px' }}
          >
            abby
          </span>
        </h2>

        <p ref={paragraphRef} className="font-poppins text-sm leading-relaxed" style={{ color: '#B76E79' }}>
          Abby is a precious gift ... a beautiful reminder of all that is good in this world.
          <br />
          <br />
          Her laughter &amp; smile lights up even my hardest days. Abby may look fragile but she is so much more than
          perfect - she&apos;s funny, kind and so brave facing new challenge with such courage.
          <br />
          <br />
          Every moment with her is a treasure. The world is brighter because
          <br />
          Abby is in it and I am proud to call her my daughter.
        </p>

        <div ref={imageRef} className="mt-6 flex justify-center">
          <img
            src="/images/graphics/wine.png"
            alt="Our cheers"
            className="w-[120px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default CelebrantStory
