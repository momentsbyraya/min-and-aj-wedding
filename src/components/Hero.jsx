import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { couples, audio } from '../data'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop // Loop the music
    audioRef.current.volume = audio.volume // Set volume from config

    // Add event listeners for progress tracking
    const updateTime = () => setCurrentTime(audioRef.current.currentTime)
    const updateDuration = () => setDuration(audioRef.current.duration)
    
    audioRef.current.addEventListener('timeupdate', updateTime)
    audioRef.current.addEventListener('loadedmetadata', updateDuration)

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime)
        audioRef.current.removeEventListener('loadedmetadata', updateDuration)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Animate content on load - hide initially, then slide in
    if (contentRef.current) {
      // First show the container
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.3
      })
      
      // Then animate children sliding up
      if (contentRef.current.children) {
        gsap.fromTo(contentRef.current.children, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "linear", 
            stagger: 0.3,
            delay: 0.6 // Start after container fades in
          }
        )
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  const skipBackward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, currentTime - 10) // Skip back 10 seconds
  }

  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, currentTime + 10) // Skip forward 10 seconds
  }

  // Format date for display
  const formatWeddingDate = () => {
    const date = new Date(weddingConfig.debut.date)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
    
    // Add ordinal suffix
    const getOrdinal = (n) => {
      const s = ["TH", "ST", "ND", "RD"]
      const v = n % 100
      return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
    }
    
    return `${dayOfWeek} ${getOrdinal(day)} ${month}`
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center m-0 p-0"
    >
      {/* Theme Background */}
      <div className={`absolute inset-0 z-0 ${themeConfig.backgrounds.theme}`}></div>
      
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
      
      {/* Corner Design - Top Left */}
      <img 
        src="/assets/images/graphics/corner-tl.png" 
        alt="Corner design top left" 
        className="absolute z-50 corner-pulse"
        style={{ 
          top: 0, 
          left: 0, 
          width: '65vw', 
          height: '65vh', 
          maxWidth: '300px', 
          maxHeight: '300px',
          objectFit: 'contain',
          objectPosition: 'top left'
        }}
      />
      
      {/* Corner Design - Bottom Right */}
      <img 
        src="/assets/images/graphics/corner-br.png" 
        alt="Corner design bottom right" 
        className="absolute z-50 corner-pulse"
        style={{ 
          bottom: 0, 
          right: 0, 
          width: '65vw', 
          height: '65vh', 
          maxWidth: '300px', 
          maxHeight: '300px',
          objectFit: 'contain',
          objectPosition: 'bottom right'
        }}
      />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-20 text-center px-4 py-8 sm:py-12 md:py-16" style={{ transform: 'scale(1.02)', opacity: 0 }}>
        {/* Join Us Text */}
        <div className="text-sm sm:text-base md:text-lg uppercase tracking-wider mb-4 sm:mb-6 md:mb-8 font-poppins" style={{ color: '#1e3a5f' }}>
          JOIN US TO CELEBRATE<br />MY 18TH BIRTHDAY
        </div>

        {/* Debutant Name - Script Font */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-antsvalley leading-tight my-8 sm:my-12 md:my-16"
            style={{ transform: 'rotate(-10deg)', color: '#1e3a5f', fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            <span className="block">{couples.debutant.name.full}</span>
          </h1>
        </div>

        {/* Date */}
        <div className="text-base sm:text-lg md:text-xl uppercase tracking-wider mb-1 sm:mb-1 md:mb-1 font-poppins" style={{ color: '#1e3a5f' }}>
          {formatWeddingDate()}
        </div>

        {/* Time */}
        <div className="text-base sm:text-lg md:text-xl uppercase tracking-wider mb-4 sm:mb-6 md:mb-8 font-poppins" style={{ color: '#1e3a5f' }}>
          FROM {weddingConfig.debut.time.toUpperCase()}
        </div>

        {/* Location */}
        <div className="text-base sm:text-lg md:text-xl uppercase tracking-wider mb-1 sm:mb-1 md:mb-1 font-poppins" style={{ color: '#1e3a5f' }}>
          {weddingConfig.venue.main.name.toUpperCase()}
        </div>
        <div className="text-sm sm:text-base md:text-lg uppercase tracking-wider mb-4 sm:mb-6 md:mb-8 font-poppins" style={{ color: '#1e3a5f' }}>
          SAN ANTONIO, TIGAON<br />
          CAMARINES SUR
        </div>

        {/* Reception to Follow */}
        <div className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 font-script" style={{ color: '#1e3a5f' }}>
          Reception to follow
        </div>

        {/* RSVP */}
        <div className="text-sm sm:text-base md:text-lg uppercase tracking-wider font-poppins" style={{ color: '#1e3a5f' }}>
          RSVP BELOW
        </div>
      </div>
    </section>
  )
}

export default Hero
