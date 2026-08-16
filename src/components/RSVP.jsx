import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail } from 'react-icons/fi'
import { wedding } from '../data'
import RSVPModal from './RSVPModal'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

const Divider = ({ flip = false }) => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-px bg-white opacity-50" />
    <img
      src="/images/graphics/graphics-1.svg"
      alt=""
      aria-hidden
      className={`w-32 sm:w-40 md:w-48 h-auto mx-4 ${flip ? 'scale-y-[-1]' : ''}`}
    />
    <div className="w-16 h-px bg-white opacity-50" />
  </div>
)

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)

  const rsvpMessage =
    wedding?.rsvp?.message ||
    'Kindly answer the RSVP. Let us know if you will be joining us for this celebration.'

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
        id="rsvp"
        className="relative py-20 w-full overflow-hidden bg-white min-h-[500px]"
      >
        {/* Soft faded blush pink band in the center; white top & bottom remain */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[10%] bottom-[10%] z-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(247,224,227,0.55) 14%, rgba(240,201,206,0.7) 36%, rgba(232,180,184,0.55) 50%, rgba(240,201,206,0.7) 64%, rgba(247,224,227,0.55) 86%, rgba(255,255,255,0) 100%)'
          }}
          aria-hidden
        />
        <StorybookSectionBg variant="calligraphy" calligraphyOpacity={0.06} />
        <div className="relative z-20 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <Divider />
            <div ref={contentRef} className="flex flex-col items-center w-full">
              <div className="w-full text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 font-caribbean">
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none"
                    style={{ lineHeight: '0.8' }}
                  >
                    R
                  </span>
                  <span className="inline-block">svp</span>
                </h2>
                <p className="text-base sm:text-lg font-albert font-thin text-white max-w-3xl mx-auto leading-relaxed mb-4">
                  {rsvpMessage}
                </p>
                <div className="flex justify-center items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsRsvpOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-white/70 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                    style={{ borderRadius: '25px' }}
                  >
                    <span className="text-sm sm:text-base font-albert font-thin text-white">
                      Submit your response
                    </span>
                    <FiMail className="h-5 w-5 text-white" aria-hidden />
                  </button>
                </div>
                <Divider flip />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RSVPModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </>
  )
}

export default RSVP
