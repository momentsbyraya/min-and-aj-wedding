import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail, FiGift, FiUsers } from 'react-icons/fi'
import { wedding } from '../data'
import RSVPModal from './RSVPModal'
import EntourageModal from './EntourageModal'
import StorybookSectionBg from './StorybookSectionBg'

gsap.registerPlugin(ScrollTrigger)

const Divider = ({ flip = false }) => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-px bg-[#6F4A52] opacity-40" />
    <img
      src="/images/graphics/graphics-1.svg"
      alt=""
      aria-hidden
      className={`w-32 sm:w-40 md:w-48 h-auto mx-4 ${flip ? 'scale-y-[-1]' : ''}`}
    />
    <div className="w-16 h-px bg-[#6F4A52] opacity-40" />
  </div>
)

const DropCap = ({ children }) => {
  const text = String(children)
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6F4A52] mb-3 font-caribbean">
      <span
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none"
        style={{ lineHeight: '0.8' }}
      >
        {text.charAt(0)}
      </span>
      <span className="inline-block">{text.slice(1)}</span>
    </h2>
  )
}

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)
  const [isEntourageOpen, setIsEntourageOpen] = useState(false)

  const rsvpMessage =
    wedding?.rsvp?.message ||
    'Kindly answer the RSVP. Let us know if you will be joining us for this celebration.'
  const giftIntro =
    wedding?.giftSection?.intro?.split('\n\n')[0] ||
    'Your presence is the greatest gift. If you wish to give something extra, a small wish list is ready for you.'
  const giftUrl = wedding?.giftSection?.ctaUrl || wedding?.details?.registry || '#'

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
        className="relative py-20 w-full overflow-hidden bg-[#F8F1EA] min-h-[500px]"
      >
        <StorybookSectionBg variant="calligraphy" calligraphyOpacity={0.1} />
        <div className="relative z-20 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <Divider />
            <div ref={contentRef} className="flex flex-col items-center w-full">
              <div className="w-full text-center">
                <DropCap>Rsvp</DropCap>
                <p className="text-base sm:text-lg font-albert font-thin text-[#6F4A52] max-w-3xl mx-auto leading-relaxed mb-4">
                  {rsvpMessage}
                </p>
                <div className="flex justify-center items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsRsvpOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-[#C98F9B]/70 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                    style={{ borderRadius: '25px' }}
                  >
                    <span className="text-sm sm:text-base font-albert font-thin text-[#6F4A52]">
                      Submit your response
                    </span>
                    <FiMail className="h-5 w-5 text-[#6F4A52]" aria-hidden />
                  </button>
                </div>
                <Divider />
              </div>

              <div className="w-full mt-12 text-center">
                <DropCap>Entourage</DropCap>
                <p className="text-base sm:text-lg font-albert font-thin text-[#6F4A52] max-w-3xl mx-auto leading-relaxed mb-4">
                  Meet the special people who will be part of this celebration.
                </p>
                <div className="flex justify-center items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEntourageOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-[#C98F9B]/70 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                    style={{ borderRadius: '25px' }}
                  >
                    <span className="text-sm sm:text-base font-albert font-thin text-[#6F4A52]">
                      View our entourage
                    </span>
                    <FiUsers className="h-5 w-5 text-[#6F4A52]" aria-hidden />
                  </button>
                </div>
                <Divider />
              </div>

              <div className="w-full mt-12 text-center">
                <DropCap>Gifts</DropCap>
                <p className="text-base sm:text-lg font-albert font-thin text-[#6F4A52] max-w-3xl mx-auto leading-relaxed mb-4">
                  {giftIntro}
                </p>
                <div className="flex justify-center items-center mt-6">
                  <a
                    href={giftUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-[#C98F9B]/70 hover:opacity-80 transition-opacity duration-300 cursor-pointer no-underline"
                    style={{ borderRadius: '25px' }}
                  >
                    <span className="text-sm sm:text-base font-albert font-thin text-[#6F4A52]">
                      {wedding?.giftSection?.ctaLabel || 'View wish list'}
                    </span>
                    <FiGift className="h-5 w-5 text-[#6F4A52]" aria-hidden />
                  </a>
                </div>
                <Divider flip />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RSVPModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
      <EntourageModal isOpen={isEntourageOpen} onClose={() => setIsEntourageOpen(false)} />
    </>
  )
}

export default RSVP
