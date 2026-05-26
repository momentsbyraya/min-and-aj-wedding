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
            #B6DEDC 0,
            #B6DEDC var(--stripe-unit),
            #F0FAF9 var(--stripe-unit),
            #F0FAF9 calc(var(--stripe-unit) * 2),
            #48B5B1 calc(var(--stripe-unit) * 2),
            #48B5B1 calc(var(--stripe-unit) * 3),
            #F0FAF9 calc(var(--stripe-unit) * 3),
            #F0FAF9 calc(var(--stripe-unit) * 4),
            #B6DEDC calc(var(--stripe-unit) * 4),
            #B6DEDC calc(var(--stripe-unit) * 5),
            #F0FAF9 calc(var(--stripe-unit) * 5),
            #F0FAF9 calc(var(--stripe-unit) * 6),
            #48B5B1 calc(var(--stripe-unit) * 6),
            #48B5B1 calc(var(--stripe-unit) * 7),
            #F0FAF9 calc(var(--stripe-unit) * 7),
            #F0FAF9 calc(var(--stripe-unit) * 8)
          );
        }
        @media (min-width: 1024px) {
          .save-date-stripes {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            min-height: 160vh !important;
          }
          .save-date-main-container {
            min-height: calc(160vh - 10rem) !important;
          }
            .save-date-container {
              max-width: 550px !important;
            }
          .counter-container {
            width: 100% !important;
            max-width: calc(100% - 4rem) !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          .counter-item {
            width: clamp(50px, 8vw, 70px) !important;
            height: clamp(50px, 8vw, 70px) !important;
          }
          .counter-container > div {
            flex-shrink: 1 !important;
            margin: 0 0.15rem !important;
          }
          .counter-container .font-instrument-serif.font-semibold {
            font-size: clamp(1rem, 2vw, 2rem) !important;
          }
        }
        @media (max-width: 1023px) {
          .counter-container {
            width: 100% !important;
            max-width: calc(100% - 2rem) !important;
            min-width: auto !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          .counter-item {
            width: clamp(45px, 8vw, 60px) !important;
            height: clamp(45px, 8vw, 60px) !important;
          }
          .counter-container > div {
            flex-shrink: 1 !important;
            margin: 0 0.15rem !important;
          }
          .counter-container .font-instrument-serif.font-semibold {
            font-size: clamp(0.875rem, 1.5vw, 1.5rem) !important;
          }
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
       <div className={`relative z-20 w-full ${theme.container.padding} flex items-stretch save-date-main-container`} style={{ minHeight: 'calc(100vh - 10rem)' }}>
         {/* Content Container */}
         <div
           ref={imageRef}
           className="relative w-full max-w-4xl mx-auto overflow-hidden save-date-container"
           style={{
             backgroundColor: '#EBF6F5',
             border: '1px solid #2A9A96',
             outline: '1px solid #2A9A96',
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
               backgroundImage: 'url(/images/prenup/prenup9.jpg)',
               backgroundSize: 'cover',
               backgroundPosition: '30% center',
               backgroundRepeat: 'no-repeat'
             }}
           ></div>
           
           {/* Green soft overlay at bottom */}
           <div
             style={{
               position: 'absolute',
               bottom: 0,
               left: 0,
               right: 0,
               height: '40%',
               background: 'linear-gradient(to top, rgba(42, 154, 150, 0.45), transparent)',
               zIndex: 5
             }}
           ></div>
           
           {/* Green soft overlay at top */}
           <div
             style={{
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               height: '40%',
               background: 'linear-gradient(to bottom, rgba(42, 154, 150, 0.45), transparent)',
               zIndex: 5
             }}
           ></div>
           
          {/* Countdown heading */}
           <div 
             className="absolute top-0 left-0 flex flex-col items-start px-6 py-6"
             style={{
               zIndex: 10
             }}
           >
            <h2
              className="font-my-soul mb-2"
               style={{ 
                color: '#F0FAF9',
                 fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                 lineHeight: '1',
                 textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.2)',
                 whiteSpace: 'nowrap',
                 marginTop: '3rem'
               }}
             >
              Countdown
             </h2>
             <div 
              className="font-rozha"
               style={{ 
                color: '#F0FAF9',
                 fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                 marginLeft: '1rem'
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
             className="counter-container absolute bottom-0 left-1/2 transform -translate-x-1/2 py-6"
             style={{
               zIndex: 10,
               width: '100%',
               maxWidth: 'calc(100% - 4rem)',
               paddingLeft: '1rem',
               paddingRight: '1rem',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '0',
               overflow: 'visible',
               boxSizing: 'border-box'
             }}
           >
             <div className="text-center flex flex-col items-center">
               <div className="counter-item" style={{
                 width: 'clamp(60px, 12vw, 90px)',
                 height: 'clamp(60px, 12vw, 90px)',
                 borderRadius: '50%',
                 backgroundColor: theme.colors.tertiary,
                 border: '0.5px solid #eef7f6',
                 outline: '0.5px solid #eef7f6',
                 outlineOffset: '-5px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 padding: '1rem'
               }}>
               <div className="font-rozha countdown-number" style={{ color: '#F0FAF9', fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.2)' }}>
                   {countdown.days}
                 </div>
               </div>
               <div className="font-rozha mt-2" style={{ color: '#F0FAF9', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>Days</div>
             </div>
             
             <div className="font-rozha" style={{ color: '#F0FAF9', fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>:</div>
             
             <div className="text-center flex flex-col items-center">
               <div className="counter-item" style={{
                 width: 'clamp(60px, 12vw, 90px)',
                 height: 'clamp(60px, 12vw, 90px)',
                 borderRadius: '50%',
                 backgroundColor: theme.colors.tertiary,
                 border: '0.5px solid #eef7f6',
                 outline: '0.5px solid #eef7f6',
                 outlineOffset: '-5px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 padding: '1rem'
               }}>
                 <div className="font-instrument-serif font-semibold countdown-number" style={{ color: '#eef7f6', fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.2)' }}>
                   {countdown.hours}
                 </div>
               </div>
               <div className="font-medium font-poppins mt-2" style={{ color: '#eef7f6', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>Hours</div>
             </div>
             
             <div className="font-instrument-serif font-semibold" style={{ color: '#eef7f6', fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>:</div>
             
             <div className="text-center flex flex-col items-center">
               <div className="counter-item" style={{
                 width: 'clamp(60px, 12vw, 90px)',
                 height: 'clamp(60px, 12vw, 90px)',
                 borderRadius: '50%',
                 backgroundColor: theme.colors.tertiary,
                 border: '0.5px solid #eef7f6',
                 outline: '0.5px solid #eef7f6',
                 outlineOffset: '-5px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 padding: '1rem'
               }}>
                 <div className="font-instrument-serif font-semibold countdown-number" style={{ color: '#eef7f6', fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.2)' }}>
                   {countdown.minutes}
                 </div>
               </div>
               <div className="font-medium font-poppins mt-2" style={{ color: '#eef7f6', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>Minutes</div>
             </div>
             
             <div className="font-instrument-serif font-semibold" style={{ color: '#eef7f6', fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>:</div>
             
             <div className="text-center flex flex-col items-center">
               <div className="counter-item" style={{
                 width: 'clamp(60px, 12vw, 90px)',
                 height: 'clamp(60px, 12vw, 90px)',
                 borderRadius: '50%',
                 backgroundColor: theme.colors.tertiary,
                 border: '0.5px solid #eef7f6',
                 outline: '0.5px solid #eef7f6',
                 outlineOffset: '-5px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 padding: '1rem'
               }}>
                 <div className="font-instrument-serif font-semibold countdown-number" style={{ color: '#eef7f6', fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.2)' }}>
                   {countdown.seconds}
                 </div>
               </div>
               <div className="font-medium font-poppins mt-2" style={{ color: '#eef7f6', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>Seconds</div>
             </div>
           </div>
         </div>
    </div>
    </section>
    </>
  )
}

export default SaveTheDate

