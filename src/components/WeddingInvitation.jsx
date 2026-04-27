import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import Hero from './Hero'
import IntroSection from './IntroSection'
import Gallery from './Gallery'
import DressCode from './DressCode'
import './WeddingInvitation.css'

const WeddingInvitation = ({ onStartMusic, onPauseMusic, onResumeMusic, isMusicPlaying }) => {
  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(".main-container", 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="hero-falling-flower-layer fixed inset-0 z-[8] pointer-events-none overflow-hidden">
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '8%', animationDelay: '0s', animationDuration: '8.5s', '--flower-size': 'clamp(12px, 1.9vw, 26px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '24%', animationDelay: '1.8s', animationDuration: '9.3s', '--flower-size': 'clamp(16px, 2.5vw, 34px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '46%', animationDelay: '0.9s', animationDuration: '8.8s', '--flower-size': 'clamp(20px, 3.2vw, 42px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '67%', animationDelay: '2.4s', animationDuration: '9.8s', '--flower-size': 'clamp(14px, 2.1vw, 30px)' }} />
        <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="hero-falling-flower" style={{ left: '84%', animationDelay: '1.2s', animationDuration: '8.9s', '--flower-size': 'clamp(18px, 2.8vw, 38px)' }} />
      </div>
      <main className="main-container h-full section-container">
        <Hero 
          onStartMusic={onStartMusic}
          onPauseMusic={onPauseMusic}
          onResumeMusic={onResumeMusic}
          isMusicPlaying={isMusicPlaying}
        />
        <IntroSection />
        <Gallery />
        <DressCode />
      </main>
    </div>
  )
}

export default WeddingInvitation
