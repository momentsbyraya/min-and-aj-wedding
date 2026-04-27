import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import Hero from './Hero'
import IntroSection from './IntroSection'
import Gallery from './Gallery'
import Venue from './Venue'
import Schedule from './Schedule'
import DressCode from './DressCode'
import Gallery2 from './Gallery2'
import CelebrantStory from './CelebrantStory'
import CountdownSection from './CountdownSection'
import Watermark from './Watermark'
import './WeddingInvitation.css'

const WeddingInvitation = ({ onStartMusic, onPauseMusic, onResumeMusic, isMusicPlaying }) => {
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

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Watermark />
      <div className="hero-falling-flower-layer fixed inset-0 z-[8] pointer-events-none overflow-hidden">
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
        <div>
          <Gallery />
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
            <section className="w-full">
              <img
                src="/images/prenup/DSC01286.jpg"
                alt="Prenup moment"
                className="w-full h-auto object-cover block"
              />
            </section>
            <div>
              <Schedule />
            </div>
            <section className="w-full">
              <img
                src="/images/prenup/DSC01404.jpg"
                alt="Prenup moment"
                className="w-full h-auto object-cover block"
              />
            </section>
            <div>
              <DressCode />
            </div>
            <div>
              <Gallery2 />
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
              <div className="wedding-invitation-footer-link" style={{ color: '#ffffff' }}>
                <span>Made with</span>
                <span className="footer-heart wedding-invitation-footer-heart">❤</span>
                <span>by</span>
                <a
                  href="https://www.facebook.com/profile.php?id=61571540978411"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#ffffff', textDecoration: 'none' }}
                >
                  Moments by Raya
                </a>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WeddingInvitation
