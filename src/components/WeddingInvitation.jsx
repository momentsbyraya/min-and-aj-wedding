import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { IoHeart } from 'react-icons/io5'
import { getTimeUntilWedding } from '../utils/countdown'
import Hero from './Hero'
import Calendar from './Calendar'
import Counter from './Counter'
import PhotoSection from './PhotoSection'
import Schedule from './Schedule'
import LoveStory from './LoveStory'
import DressCode from './DressCode'
import Gallery2 from './Gallery2'
import Gallery from './Gallery'
import FAQ from './FAQ'
import MapDirections from './Venue'
import GiftRegistry from './GiftRegistry'
import CTASection from './CTASection'
import DetailsSection from './DetailsSection'
import EighteenList from './EighteenList'
import EnhancedLazySection from './EnhancedLazySection'
import { images } from '../data'

const WeddingInvitation = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(".main-container", 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
    
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <main className="main-container h-full section-container">
        {/* Hero Section - First */}
        <Hero />
        
        {/* Schedule Section - After Hero */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="schedule">
          <Schedule />
        </EnhancedLazySection>

        {/* Love Story Section - After Schedule */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection>

        {/* Details Section - Combined RSVP, DressCode, and Gift Registry - After Love Story */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="details">
          <DetailsSection />
        </EnhancedLazySection>

        {/* Gallery Section - After Details */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection>

        {/* 18 List Section - After Gallery */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="18-list">
          <EighteenList />
        </EnhancedLazySection>

        {/* FAQ Section - After EighteenList */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="faq">
          <FAQ />
        </EnhancedLazySection>

        {/* Save the Date Section - After FAQ */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>

        {/* Map & Directions Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="map-directions">
          <MapDirections />
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
        <footer className="py-4 text-center">
          <a 
            href="https://www.facebook.com/profile.php?id=61571540978411"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer hover:opacity-80 transition-all duration-200 font-poppins footer-link"
            style={{ color: '#4b2259' }}
          >
            <span>Made with</span>
            <IoHeart className="w-4 h-4 sm:w-5 sm:h-5 footer-heart" style={{ color: '#4b2259' }} />
            <span>|</span>
            <span>Moments by Raya</span>
          </a>
        </footer>
        
      </main>
    </div>
  )
}

export default WeddingInvitation 