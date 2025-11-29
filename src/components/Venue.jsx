import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Navigation, Car, Train, Bus, Clock, Phone, Mail } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { venues as venuesData, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const receptionDetailsRef = useRef(null)
  const receptionPhotoRef = useRef(null)
  const receptionButtonRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Venue section animations - slide up with delays
    tl.fromTo(receptionDetailsRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(receptionPhotoRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(receptionButtonRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // URLs are now provided in the venues data
  const venueData = venuesData.venue

  const venues = {
    main: {
      ...venueData,
      ...venueData.main,
      type: 'Main Event',
      icon: '🎂'
    },
    reception: {
      ...venueData,
      ...venueData.reception,
      type: 'Reception',
      icon: '🎉'
    }
  }

  // Generate Google Maps directions URL
  const getDirectionsUrl = () => {
    const address = `${venues.main.address}, ${venues.main.city}, ${venues.main.state} ${venues.main.zip}`
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  }

  return (
    <section
      id="map"
      ref={sectionRef}
      className="relative py-20 w-full"
    >
      {/* Abstract Background - Same as Counter with rotation/zoom */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/assets/images/graphics/abstract-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(180deg) scale(1.2)',
        }}
      ></div>
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} relative z-20`}>
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-antsvalley mb-6" style={{ color: '#4b2259' }}>
            Venue
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto -mt-4 px-8 sm:px-12 lg:px-16">
          {/* Single Venue Display */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div ref={receptionDetailsRef} className="text-center mb-6">
                <h3 className="font-poppins" style={{ color: '#4b2259', fontSize: '16px' }}>
                  {venues.main.name.replace('Magdalene Garden Private Resort', 'Magdalene Garden\nPrivate Resort').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                <p className="font-poppins" style={{ color: '#B76E79', fontSize: '14px' }}>
                  {venues.main.address}, {venues.main.city}, {venues.main.state} {venues.main.zip}
                </p>
              </div>
              
              <div ref={receptionPhotoRef} className="relative mb-4 flex justify-center">
                <div className="w-full h-50 sm:h-fit bg-white shadow-2xl hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-40 sm:h-64 bg-cover border-l-8 border-r-8 border-t-8 border-white" style={{backgroundImage: `url(${venues.main.image || '/assets/images/venue/venue.jpg'})`, backgroundPosition: 'top'}}></div>
                  <div className="p-3 text-center">
                    <div className="text-right text-sm sm:text-base text-gray-600 font-handwritten">{venues.main.name}</div>
                  </div>
                </div>
              </div>
              
              {/* Map Button */}
              <div ref={receptionButtonRef} className="flex flex-col items-center mt-8">
                <a
                  href="https://maps.app.goo.gl/YGwxu6B2dyrtSWck9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 py-3 sm:py-5 lg:py-2 transition-all duration-200 text-sm sm:text-2xl lg:text-base font-medium font-poppins"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                    borderRadius: '25px', 
                    color: '#1e3a5f',
                    border: '1px solid #4b2259',
                    paddingLeft: '2rem',
                    paddingRight: '2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b5cf6'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                    e.currentTarget.style.color = '#1e3a5f'
                  }}
                >
                  <span>Check for directions</span>
                  <Navigation className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <p className="text-sm font-poppins mt-3 text-center" style={{ color: '#4b2259' }}>
                  This location is nearby the venue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 