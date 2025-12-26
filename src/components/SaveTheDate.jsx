import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, celebrant } from '../data'
import { getTimeUntilWedding } from '../utils/countdown'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const SaveTheDate = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const countdownRef = useRef(null)
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate container
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate countdown numbers
    tl.fromTo(".countdown-number", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.15
      },
      "-=0.3"
    )

    // Cleanup function
    return () => {
      clearInterval(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <style>{`
        .save-date-stripes {
          --stripe-unit: clamp(15px, 2.5vw, 40px);
          background: repeating-linear-gradient(
            90deg,
            ${theme.colors.primary} 0,
            ${theme.colors.primary} var(--stripe-unit),
            #f0ede6 var(--stripe-unit),
            #f0ede6 calc(var(--stripe-unit) * 2),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 2),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 3),
            #f0ede6 calc(var(--stripe-unit) * 3),
            #f0ede6 calc(var(--stripe-unit) * 4),
            ${theme.colors.primary} calc(var(--stripe-unit) * 4),
            ${theme.colors.primary} calc(var(--stripe-unit) * 5),
            #f0ede6 calc(var(--stripe-unit) * 5),
            #f0ede6 calc(var(--stripe-unit) * 6),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 6),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 7),
            #f0ede6 calc(var(--stripe-unit) * 7),
            #f0ede6 calc(var(--stripe-unit) * 8)
          );
        }
      `}</style>
    <section
      ref={sectionRef}
      id="save-the-date"
      className="relative overflow-hidden flex items-stretch justify-center text-center save-date-stripes"
      style={{
        minHeight: '100vh',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      
       {/* Main Content Container */}
       <div className={`relative z-20 w-full ${theme.container.padding} flex items-stretch`} style={{ minHeight: 'calc(100vh - 10rem)' }}>
         {/* Content Container */}
         <div
           ref={imageRef}
           className="relative w-full max-w-4xl mx-auto overflow-hidden"
           style={{
             backgroundColor: '#f0ede6',
             border: `0.5px solid ${theme.colors.primary}`,
             outline: `0.5px solid ${theme.colors.primary}`,
             outlineOffset: '-10px',
             borderRadius: 0,
             minHeight: '100%',
             padding: '2rem'
           }}
         >
           <div
             style={{
               width: '120%',
               height: '120%',
               position: 'absolute',
               top: '-10%',
               left: '-10%',
               backgroundImage: 'url(/assets/images/prenup/prenup5.jpg)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat'
             }}
           ></div>
           
           {/* Save the Date text at top left */}
           <div 
             className="absolute top-0 left-0 flex flex-col items-start px-6 py-6"
             style={{
               zIndex: 10
             }}
           >
             <h2 
               className="font-ballet mb-2"
               style={{ 
                 color: '#f5f1eb',
                 fontSize: 'clamp(2rem, 5vw, 4rem)',
                 lineHeight: '1'
               }}
             >
               Save the Date
             </h2>
             <div 
               className="font-poppins"
               style={{ 
                 color: '#f5f1eb',
                 fontSize: 'clamp(1rem, 2.5vw, 1.5rem)'
               }}
             >
               {(() => {
                 const date = new Date(celebrant.debutant.debut.date)
                 const month = (date.getMonth() + 1).toString().padStart(2, '0')
                 const day = date.getDate().toString().padStart(2, '0')
                 const year = date.getFullYear().toString().slice(-2)
                 return `${month}.${day}.${year}`
               })()}
             </div>
           </div>
           
           {/* Counter at bottom */}
           <div 
             ref={countdownRef}
             className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-2 px-4 py-6"
             style={{
               zIndex: 10
             }}
           >
             <div className="text-center">
               <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: '#f5f1eb', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                 {countdown.days}
               </div>
               <div className="font-medium font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.625rem, 0.9vw, 0.75rem)' }}>Days</div>
             </div>
             
             <div className="font-instrument-serif font-semibold" style={{ color: '#f5f1eb', fontSize: 'clamp(1rem, 3vw, 2rem)' }}>:</div>
             
             <div className="text-center">
               <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: '#f5f1eb', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                 {countdown.hours}
               </div>
               <div className="font-medium font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.625rem, 0.9vw, 0.75rem)' }}>Hours</div>
             </div>
             
             <div className="font-instrument-serif font-semibold" style={{ color: '#f5f1eb', fontSize: 'clamp(1rem, 3vw, 2rem)' }}>:</div>
             
             <div className="text-center">
               <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: '#f5f1eb', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                 {countdown.minutes}
               </div>
               <div className="font-medium font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.625rem, 0.9vw, 0.75rem)' }}>Minutes</div>
             </div>
             
             <div className="font-instrument-serif font-semibold" style={{ color: '#f5f1eb', fontSize: 'clamp(1rem, 3vw, 2rem)' }}>:</div>
             
             <div className="text-center">
               <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: '#f5f1eb', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                 {countdown.seconds}
               </div>
               <div className="font-medium font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.625rem, 0.9vw, 0.75rem)' }}>Seconds</div>
             </div>
           </div>
         </div>
    </div>
    </section>
    </>
  )
}

export default SaveTheDate

