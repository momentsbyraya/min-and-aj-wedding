import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import { venues as venuesData, images, schedule } from '../data'

// Handle venue structure
const venueData = venuesData.venue
const venues = {
  main: {
    ...venueData,
    ...(venueData.main || {}),
    name: venueData.name,
    time: venueData.main?.time || venueData.time
  },
  reception: {
    ...venueData,
    ...(venueData.reception || {}),
    name: venueData.name,
    time: venueData.reception?.time || venueData.time
  }
}

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${images.couple.couple8})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div ref={contentRef} className={`relative z-10 flex items-center justify-center py-12 ${theme.text.primary}`}>
                          <div className={`${theme.container.maxWidth} ${theme.container.center} ${theme.container.padding}`}>
          <div className="max-w-5xl w-full mx-auto">
          {/* Section Title */}
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${theme.text.primary} mb-12 text-center`}>
            Debut Day Schedule
          </h2>
          
          {/* Timeline */}
          <div className="relative">
            {/* Central Horizontal Line */}
            <div className={`absolute top-8 left-0 right-0 h-px ${theme.text.primary}/40`}></div>
            
            {/* Timeline Events */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:flex sm:justify-between sm:items-center relative">
              {schedule.events.map((event) => (
                <div key={event.id} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${theme.backgrounds.theme} rounded-full flex items-center justify-center mb-4`}>
                    <span className={`${theme.text.primary} font-bold text-lg`}>{event.id}</span>
                  </div>
                  <div className={`text-xl md:text-2xl font-script ${theme.text.primary} mb-2`}>
                    {event.title}
                  </div>
                  <div className={`text-sm font-serif ${theme.text.primary}/90 mb-1`}>
                    {event.description}
                  </div>
                  <div className={`text-lg font-serif ${theme.text.primary} font-semibold`}>
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule 