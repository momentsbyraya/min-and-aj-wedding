import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'

gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const noteRef = useRef(null)
  const imageRef = useRef(null)
  const swatchesRef = useRef(null)
  const descriptionRef = useRef(null)

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
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(
        noteRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        swatchesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.15'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-36 pb-20 w-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] opacity-80 pointer-events-none z-10"
      />
      <div className="soft-blob soft-blob--small z-0" style={{ width: randSize(72, 114), height: randSize(62, 98), top: randPct(8, 22), left: randPct(68, 84) }} />
      <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(88, 132), height: randSize(74, 114), top: randPct(66, 84), left: randPct(6, 20) }} />
      <img
        src="/images/graphics/flower.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[16%] left-[8%] w-14 opacity-30 blur-[2px] pointer-events-none z-0"
      />
      <img
        src="/images/graphics/flower-2.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-[14%] right-[8%] w-20 opacity-25 blur-[3px] pointer-events-none z-0"
      />
      <div className="relative z-20 w-full max-w-md mx-auto px-4 text-center">
        <h2 ref={headingRef} className="font-rozha text-5xl lowercase leading-none mb-1" style={{ color: '#c86f78' }}>
          dresscode.
        </h2>
        <p
          ref={noteRef}
          className="font-halimun text-xl mb-6 leading-none w-fit"
          style={{ color: '#E28B91', marginLeft: 'calc(70% - 12px)', marginTop: '-10px', marginBottom: '24px' }}
        >
          note
        </p>

        <div ref={imageRef} className="flex justify-center">
          <div className="w-full max-w-[220px] overflow-hidden">
            <img
              src="/images/dresscode/guests.png"
              alt="Dress code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div ref={swatchesRef} className="flex items-center justify-center gap-2 flex-wrap">
          <span title="Navy Blue" className="inline-block w-8 h-8 rounded-full border border-white/70" style={{ backgroundColor: '#1f3a6e' }} />
          <span title="Black" className="inline-block w-8 h-8 rounded-full border border-white/70" style={{ backgroundColor: '#000000' }} />
          <span title="White" className="inline-block w-8 h-8 rounded-full border border-white/70" style={{ backgroundColor: '#ffffff' }} />
        </div>

        <p ref={descriptionRef} className="font-poppins text-sm leading-relaxed mt-6" style={{ color: '#B76E79' }}>
          {dresscode.mainDressCode.description}
        </p>
      </div>
    </section>
  )
}

export default DressCode 