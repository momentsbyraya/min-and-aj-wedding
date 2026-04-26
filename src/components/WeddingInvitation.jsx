import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { IoHeart } from 'react-icons/io5'
import { theme } from '../data'
import Hero from './Hero'
import IntroSection from './IntroSection'
import SaveTheDate from './SaveTheDate'
import FAQ from './FAQ'
import DetailsSection from './DetailsSection'
import PhotoMosaicSection from './PhotoMosaicSection'
import EnhancedLazySection from './EnhancedLazySection'
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
      <main className="main-container h-full section-container">
        {/* Hero Section - First */}
        <Hero 
          onStartMusic={onStartMusic}
          onPauseMusic={onPauseMusic}
          onResumeMusic={onResumeMusic}
          isMusicPlaying={isMusicPlaying}
        />

        <EnhancedLazySection animationClass="fade-slide-up" sectionName="intro">
          <IntroSection />
        </EnhancedLazySection>
        
        {/* Temporarily hidden due to missing dresscode/venue image assets */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="venue">
          <Venue />
        </EnhancedLazySection> */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="schedule">
          <Schedule />
        </EnhancedLazySection> */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection> */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="18-list">
          <EighteenList />
        </EnhancedLazySection> */}

        {/* Details Section - Combined RSVP, DressCode, and Gift Registry - After EighteenList */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="details">
          <DetailsSection />
        </EnhancedLazySection>

        {/* Gallery is also hidden while prenup image paths are being replaced */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection> */}

        {/* FAQ Section - After EighteenList */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="faq">
          <FAQ />
        </EnhancedLazySection>

        {/* Save the Date Section - After FAQ */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="save-the-date">
          <SaveTheDate />
        </EnhancedLazySection>

        <EnhancedLazySection animationClass="fade-scale" sectionName="photo-mosaic">
          <PhotoMosaicSection />
        </EnhancedLazySection>

        
        {/* Calendar Section */}
        {/* <EnhancedLazySection animationClass="fade-slide-up" sectionName="calendar">
          <Calendar />
        </EnhancedLazySection> */}
        
        {/* Couple Image Section */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="couple-image">
          <PhotoSection 
            imagePath={images.couple.couple3}
            title=""
            subtitle=""
          />
        </EnhancedLazySection> */}
        
        {/* Footer */}
        <footer className="wedding-invitation-footer">
          <a 
            href="https://www.facebook.com/profile.php?id=61571540978411"
            target="_blank"
            rel="noopener noreferrer"
            className="wedding-invitation-footer-link"
            style={{ color: theme.colors.primary }}
          >
            <span>Made with</span>
            <IoHeart className="wedding-invitation-footer-heart" style={{ color: theme.colors.primary }} />
            <span>|</span>
            <span>Moments by Raya</span>
          </a>
        </footer>
        
      </main>
    </div>
  )
}

export default WeddingInvitation
