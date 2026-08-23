import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiGift } from 'react-icons/fi'
import { wedding, paymentMethods as paymentMethodsData } from '../data'
import GiftModal from './GiftModal'

gsap.registerPlugin(ScrollTrigger)

const Divider = ({ flip = false }) => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-px bg-[#8B5560] opacity-50" />
    <img
      src="/images/graphics/graphics-1.svg"
      alt=""
      aria-hidden
      className={`w-32 sm:w-40 md:w-48 h-auto mx-4 ${flip ? 'scale-y-[-1]' : ''}`}
    />
    <div className="w-16 h-px bg-[#8B5560] opacity-50" />
  </div>
)

const Gifts = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)

  const giftPaymentMethods = paymentMethodsData?.paymentMethods || []
  const giftIntro =
    wedding?.giftSection?.intro?.split('\n\n')[0] ||
    'Your presence is already a gift to us. If you wish to bless us further, a monetary gift would be greatly appreciated.'

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
        id="gifts"
        className="relative py-20 w-full overflow-hidden bg-[#FBF3F0] min-h-[500px]"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/graphics/bg-with-ribbon.png)' }}
          aria-hidden="true"
        />
        <div className="relative z-20 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <Divider />
            <div ref={contentRef} className="flex flex-col items-center w-full">
              <div className="w-full text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#8B5560] mb-3 font-caribbean">
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none"
                    style={{ lineHeight: '0.8' }}
                  >
                    G
                  </span>
                  <span className="inline-block">ifts</span>
                </h2>
                <p className="text-base sm:text-lg font-albert font-thin text-[#8B5560] max-w-3xl mx-auto leading-relaxed mb-4">
                  {giftIntro}
                </p>
                <div className="mx-auto mb-6 flex w-full max-w-[140px] justify-center sm:mb-8 sm:max-w-[160px]">
                  <img
                    src="/images/gift/Gotyme%20QR.jpg"
                    alt="GCash / GoTyme QR code for gifts"
                    className="h-auto w-full object-contain"
                  />
                </div>
                {giftPaymentMethods.length > 0 ? (
                  <div className="flex justify-center items-center mt-6">
                    <button
                      type="button"
                      onClick={() => setIsGiftModalOpen(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-[#8B5560]/70 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                      style={{ borderRadius: '25px' }}
                    >
                      <span className="text-sm sm:text-base font-albert font-thin text-[#8B5560]">
                        {wedding?.giftSection?.ctaLabel || 'Send a gift'}
                      </span>
                      <FiGift className="h-5 w-5 text-[#8B5560]" aria-hidden />
                    </button>
                  </div>
                ) : null}
                <Divider flip />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GiftModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
    </>
  )
}

export default Gifts
