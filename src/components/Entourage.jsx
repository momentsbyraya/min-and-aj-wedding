import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiUsers } from 'react-icons/fi'
import EntourageModal from './EntourageModal'

gsap.registerPlugin(ScrollTrigger)

const Divider = ({ flip = false }) => (
  <div className="flex items-center justify-center">
    <div className="h-px w-16 bg-[#8B5560] opacity-50" />
    <img
      src="/images/graphics/graphics-1.svg"
      alt=""
      aria-hidden
      className={`mx-4 h-auto w-32 sm:w-40 md:w-48 ${flip ? 'scale-y-[-1]' : ''}`}
    />
    <div className="h-px w-16 bg-[#8B5560] opacity-50" />
  </div>
)

const Entourage = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isEntourageOpen, setIsEntourageOpen] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })

    return () => tl.kill()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="entourage"
        className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-[#FBF3F0] py-10 sm:min-h-0 sm:h-auto sm:max-h-none sm:overflow-visible sm:py-16 md:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/graphics/bg-with-ribbon.png)' }}
          aria-hidden="true"
        />
        <div className="relative z-20 mx-auto flex w-full max-w-4xl items-center justify-center px-8 sm:px-12 lg:px-16">
          <div className="flex w-full flex-col items-center justify-center">
            <Divider />
            <div ref={contentRef} className="flex w-full flex-col items-center">
              <div className="w-full text-center">
                <h2 className="mb-3 font-caribbean text-3xl text-[#8B5560] sm:text-4xl md:text-5xl lg:text-6xl">
                  <span
                    className="inline-block text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{ lineHeight: '0.8' }}
                  >
                    E
                  </span>
                  <span className="inline-block">ntourage</span>
                </h2>
                <p className="mx-auto mb-4 max-w-3xl font-albert text-base font-thin leading-relaxed text-[#8B5560] sm:text-lg">
                  To the family and friends who have been our constants: thank you for walking this
                  path with us.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsEntourageOpen(true)}
                    className="flex cursor-pointer items-center justify-center gap-2 border border-[#8B5560]/70 px-6 py-3 transition-opacity duration-300 hover:opacity-80"
                    style={{ borderRadius: '25px' }}
                  >
                    <span className="font-albert text-sm font-thin text-[#8B5560] sm:text-base">
                      View Entourage
                    </span>
                    <FiUsers className="h-5 w-5 text-[#8B5560]" aria-hidden />
                  </button>
                </div>
                <Divider flip />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EntourageModal isOpen={isEntourageOpen} onClose={() => setIsEntourageOpen(false)} />
    </>
  )
}

export default Entourage
