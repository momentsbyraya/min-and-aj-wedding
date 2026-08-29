import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, celebrant } from '../data'

// Register ScrollTrigger frplugin
gsap.registerPlugin(ScrollTrigger)

const Calendar = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const descriptionRef = useRef(null)
  const calendarGridRef = useRef(null)

  // Parse debut date from config
  const debutDate = new Date(celebrant.debutant.debut.date)
  const debutYear = debutDate.getFullYear()
  const debutMonth = debutDate.getMonth()
  const debutDay = debutDate.getDate()
  
  // Always show debut month
  const displayYear = debutYear
  const displayMonth = debutMonth
  
  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  // Get day names
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  // Get first day of month and number of days for wedding month
  const firstDay = new Date(displayYear, displayMonth, 1)
  const lastDay = new Date(displayYear, displayMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
  
  // Generate calendar days
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

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

    // Animate header sliding in
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    // Animate description sliding in
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    // Animate calendar dates one by one
    .fromTo(calendarGridRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        ease: "back.out(1.2)",
        stagger: 0.03
      },
      "-=0.2"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div ref={sectionRef} className={`relative w-full max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-6xl mx-auto px-4 ${theme.calendar.background}`} style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      {/* Invitation Text */}
      <div className="text-center mb-8 sm:my-12">
        <h1 ref={headerRef} className="text-3xl sm:text-5xl font-serif font-light mb-4 text-gray-800" style={{ opacity: 0 }}>
          The Day
        </h1>
        <p ref={descriptionRef} className="text-base sm:text-xl text-gray-700 leading-relaxed max-w-sm sm:max-w-md mx-auto" style={{ opacity: 0 }}>
          One day this year will be special for us and we want to spend it with close ones and friends.
        </p>
      </div>

      {/* Calendar Section */}
      <div className="xl:scale-90 origin-center max-w-[660px] mx-auto">
        <div className="p-8">
          {/* Month Header */}
          <div className={`text-center mb-4 ${theme.calendar.headerColor}`}>
            <h3 className="text-2xl sm:text-4xl font-serif font-light mt-2">
              {monthNames[displayMonth]} {displayYear}
            </h3>
          </div>
          
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 mb-2 lg:mt-8">
            {dayNames.map((day) => (
              <div key={day} className={`text-center text-sm sm:text-lg lg:text-2xl font-medium ${theme.calendar.dayNamesColor}`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div ref={calendarGridRef} className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isWeddingDay = day === debutDay
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm sm:text-lg lg:text-2xl font-medium
                    ${day ? theme.calendar.textColor : 'text-transparent'}
                    ${isWeddingDay ? 'relative' : ''}
                  `}
                  style={{ opacity: 0 }}
                >
                  {day && (
                    <>
                      <span className={isWeddingDay ? 'relative z-10' : ''}>
                        {day}
                      </span>
                      {isWeddingDay && (
                        <div className={`absolute inset-0 rounded-full ${theme.calendar.highlightColor} opacity-20`}></div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
