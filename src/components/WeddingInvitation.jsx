import React, { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Hero from './Hero'
import IntroSection from './IntroSection'
import Venue from './Venue'
import Schedule from './Schedule'
import DressCode from './DressCode'
import Gallery2 from './Gallery2'
import CelebrantStory from './CelebrantStory'
import CountdownSection from './CountdownSection'
import './WeddingInvitation.css'

const WeddingInvitation = ({ onStartMusic, onPauseMusic, onResumeMusic, isMusicPlaying }) => {
  const prenupImages = useMemo(() => ([
    '/images/prenup/DSC01333.jpg',
    '/images/prenup/DSC01372.jpg',
    '/images/prenup/DSC01288.jpg',
    '/images/prenup/DSC01381.jpg',
    '/images/prenup/DSC01394.jpg',
    '/images/prenup/DSC01286.jpg',
    '/images/prenup/DSC01404.jpg',
    '/images/prenup/DSC01538.jpg',
    '/images/prenup/DSC01459.jpg',
    '/images/prenup/DSC01254.jpg',
    '/images/prenup/DSC01234.jpg',
    '/images/prenup/DSC01492.jpg',
    '/images/prenup/DSC01482.jpg'
  ]), [])
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const openLightbox = (src) => {
    const index = prenupImages.indexOf(src)
    if (index >= 0) setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxIndex(-1)
  const showPrevImage = () => setLightboxIndex((prev) => (prev - 1 + prenupImages.length) % prenupImages.length)
  const showNextImage = () => setLightboxIndex((prev) => (prev + 1) % prenupImages.length)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.fromTo(".main-container",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightboxIndex < 0) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevImage()
      if (event.key === 'ArrowRight') showNextImage()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, prenupImages.length])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="hero-falling-flower-layer fixed inset-0 z-[120] pointer-events-none overflow-hidden">
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '8%', animationDelay: '0s', animationDuration: '8.5s', '--flower-size': 'clamp(12px, 1.9vw, 26px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '24%', animationDelay: '1.8s', animationDuration: '9.3s', '--flower-size': 'clamp(16px, 2.5vw, 34px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '46%', animationDelay: '0.9s', animationDuration: '8.8s', '--flower-size': 'clamp(20px, 3.2vw, 42px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '67%', animationDelay: '2.4s', animationDuration: '9.8s', '--flower-size': 'clamp(14px, 2.1vw, 30px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '84%', animationDelay: '1.2s', animationDuration: '8.9s', '--flower-size': 'clamp(18px, 2.8vw, 38px)' }} />
      </div>
      <main className="main-container h-full section-container">
        <div>
          <Hero
            onStartMusic={onStartMusic}
            onPauseMusic={onPauseMusic}
            onResumeMusic={onResumeMusic}
            isMusicPlaying={isMusicPlaying}
          />
        </div>
        <div>
          <IntroSection />
        </div>
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'url(/images/graphics/bg-3.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              opacity: 0.5
            }}
          />
          <div className="relative z-10">
            <div className="md:flex md:items-stretch">
              <div className="w-full md:w-1/2">
                <Venue />
              </div>
              <section className="w-[80vw] mx-auto pb-8 md:pb-0 md:mx-0 md:w-1/2 md:self-stretch md:flex invitation-soft-edges--location invitation-soft-edges--location-primary relative">
                <img
                  src="/images/prenup/DSC01286.jpg"
                  alt="Prenup moment"
                  className="w-full h-full md:min-h-full object-cover block cursor-pointer"
                  onClick={() => openLightbox('/images/prenup/DSC01286.jpg')}
                />
              </section>
            </div>
            <div className="md:flex md:items-stretch md:flex-row-reverse">
              <div className="w-full md:w-1/2">
                <Schedule />
                <img
                  src="/images/prenup/DSC01404.jpg"
                  alt="Prenup moment"
                  className="w-full h-full md:min-h-full object-cover block cursor-pointer invitation-schedule-image"
                  onClick={() => openLightbox('/images/prenup/DSC01404.jpg')}
                />
              </div>
            </div>
            <div>
              <DressCode />
            </div>
            <div>
              <Gallery2 onImageClick={openLightbox} />
            </div>
            <div>
              <CelebrantStory />
            </div>
            <section className="w-full py-4 sm:py-6">
              <div className="relative mx-auto w-[84%] max-w-md h-8 flex items-center justify-center">
                <span className="absolute left-0 right-0 h-px bg-[#E7B6BA] opacity-80" />
                <img
                  src="/images/graphics/flower.png"
                  alt="Floral divider"
                  className="relative z-10 w-8 h-8 object-contain bg-transparent"
                />
              </div>
            </section>
            <div>
              <CountdownSection />
            </div>
            <footer className="wedding-invitation-footer bg-[#F2C8B8]">
              <a
                href="https://www.facebook.com/profile.php?id=61571540978411"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Moments by Raya page"
                className="wedding-invitation-footer-link wedding-invitation-footer-link-hidden"
              >
                Made with love by Moments by Raya
              </a>
            </footer>
          </div>
        </div>
      </main>
      {lightboxIndex >= 0 && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Prenup image viewer"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="absolute left-3 sm:left-6 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            onClick={(event) => {
              event.stopPropagation()
              showPrevImage()
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <img
            src={prenupImages[lightboxIndex]}
            alt={`Prenup preview ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[92vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-3 sm:right-6 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            onClick={(event) => {
              event.stopPropagation()
              showNextImage()
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  )
}

export default WeddingInvitation
