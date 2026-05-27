import React, { useEffect, useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiHeart, FiX } from 'react-icons/fi'
import Hero from './Hero'
import IntroSection from './IntroSection'
import EighteenIntroSection from './EighteenIntroSection'
import Venue from './Venue'
import Schedule from './Schedule'
import OurGiftSection from './OurGiftSection'
import DressCode from './DressCode'
import Gallery from './Gallery'
import CelebrantStory from './CelebrantStory'
import FAQ from './FAQ'
import CountdownSection from './CountdownSection'
import './WeddingInvitation.css'

const WeddingInvitation = ({ onStartMusic, onPauseMusic, onResumeMusic, isMusicPlaying }) => {
  const prenupImages = useMemo(() => ['/images/prenup/A7400780.jpg'], [])
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const openLightbox = (src) => {
    const index = prenupImages.indexOf(src)
    if (index >= 0) setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxIndex(-1)
  const showPrevImage = () => setLightboxIndex((prev) => (prev - 1 + prenupImages.length) % prenupImages.length)
  const showNextImage = () => setLightboxIndex((prev) => (prev + 1) % prenupImages.length)

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
        <div>
          <EighteenIntroSection />
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
            <div>
              <Venue />
            </div>
            <div>
              <Schedule />
            </div>
            <div>
              <OurGiftSection />
            </div>
            <div>
              <DressCode />
            </div>
            <div>
              <Gallery />
            </div>
            <div>
              <CelebrantStory onImageClick={openLightbox} />
            </div>
            <div>
              <FAQ />
            </div>
            <div>
              <CountdownSection />
            </div>
            <footer className="wedding-invitation-footer bg-[#e20964]">
              <a
                href="https://www.facebook.com/profile.php?id=61571540978411"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Moments by Raya page"
                className="wedding-invitation-footer-link text-[#EFE9DC] hover:text-[#EFE9DC] inline-flex items-center gap-1.5"
              >
                <span>Made with</span>
                <FiHeart className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>| Moments by Raya</span>
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
            <FiX className="w-6 h-6" />
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
            <FiChevronLeft className="w-7 h-7" />
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
            <FiChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  )
}

export default WeddingInvitation
