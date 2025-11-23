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

    // Venue section animations
    tl.fromTo(receptionDetailsRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(receptionPhotoRef.current, 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(receptionButtonRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
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
      {/* Theme Background */}
      <div className={`absolute inset-0 ${themeConfig.backgrounds.theme}`}></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} relative z-20`}>
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script ${themeConfig.text.custom} mb-6`}>
            Venues
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto -mt-4">
          {/* Single Venue Display */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div ref={receptionDetailsRef} className="text-center mb-6">
                <h3 className={`text-xl sm:text-3xl font-serif ${themeConfig.text.custom}`}>
                  {venues.main.name}
                </h3>
                <p className={`text-sm sm:text-lg ${themeConfig.text.custom}`}>
                  {venues.main.address}, {venues.main.city}, {venues.main.state} {venues.main.zip}
                </p>
              </div>
              
              <div ref={receptionPhotoRef} className="relative mb-4 flex justify-center">
                <div className="w-full h-50 sm:h-fit bg-white shadow-2xl hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-40 sm:h-64 bg-cover bg-center border-l-8 border-r-8 border-t-8 border-white" style={{backgroundImage: `url(${venues.main.image || venues.reception.image || images.venues.reception})`}}></div>
                  <div className="p-3 text-center">
                    <div className="text-right text-sm sm:text-base text-gray-600 font-handwritten">{venues.main.name}</div>
                  </div>
                </div>
              </div>
              
              {/* Map Button */}
              <div ref={receptionButtonRef} className="flex justify-center mt-8">
                <a
                  href="https://maps.app.goo.gl/gqfdSb4x853Jse4C9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center px-8 py-3 sm:py-5 lg:py-2 bg-white ${themeConfig.text.custom} rounded-sm text-sm sm:text-2xl lg:text-base font-medium transition-colors duration-200 hover:opacity-90`}
                >
                  Check for directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 