import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { theme, celebrant, audio, venues } from '../data'

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
    
    // Update playing state
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    
    audioRef.current.addEventListener('timeupdate', updateTime)
    audioRef.current.addEventListener('loadedmetadata', updateDuration)
    audioRef.current.addEventListener('play', handlePlay)
    audioRef.current.addEventListener('pause', handlePause)
    audioRef.current.addEventListener('ended', handleEnded)

    // Don't auto-start - music will start when play button is clicked

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime)
        audioRef.current.removeEventListener('loadedmetadata', updateDuration)
        audioRef.current.removeEventListener('play', handlePlay)
        audioRef.current.removeEventListener('pause', handlePause)
        audioRef.current.removeEventListener('ended', handleEnded)
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

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Format date for display
  const formatWeddingDate = () => {
    const date = new Date(celebrant.debutant.debut.date)
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
      {/* Top Design */}
      <div className="absolute top-0 left-0 right-0 z-30 hero-top-design-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <img 
          src="/assets/images/graphics/bottom-design.png" 
          alt="Top design left" 
          className="hero-top-design hero-top-design-left"
          style={{ width: '100%', transform: 'rotate(180deg)' }}
        />
        <img 
          src="/assets/images/graphics/bottom-design.png" 
          alt="Top design center" 
          className="hero-top-design hero-top-design-center hidden lg:block"
          style={{ width: 'fit-content', transform: 'rotate(180deg)' }}
        />
        <img 
          src="/assets/images/graphics/bottom-design.png" 
          alt="Top design right" 
          className="hero-top-design hero-top-design-right hidden lg:block"
          style={{ width: 'fit-content', transform: 'rotate(180deg)' }}
        />
      </div>
      
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/images/graphics/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
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
      
      {/* Content */}
      <div ref={contentRef} className="relative z-40 hero-content" style={{ transform: 'scale(1.02)', opacity: 0 }}>
        {/* Celebrant's Text */}
        <div 
          className="font-bestlight"
          style={{ 
            color: '#4b2259', 
            transform: 'rotate(-5deg)',
            fontSize: 'min(14vw, 115px)',
            marginBottom: '-0.5rem',
            position: 'relative'
          }}
        >
          {celebrant.debutant.name.nickname}'s
          <img 
            src="/assets/images/graphics/butterfly-half-left.png" 
            alt="Butterfly" 
            style={{ 
              position: 'absolute',
              top: '-15px',
              right: '10px',
              width: 'min(14vw, 120px)',
              height: 'auto',
              transform: 'translate(50%, -50%)'
            }}
          />
        </div>
        
        {/* 18th Birthday Text */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div 
            className="font-bestlight"
            style={{ 
              color: '#4b2259', 
              transform: 'rotate(-5deg)',
              fontSize: 'min(14vw, 115px)',
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            18th
          </div>
          <div 
            className="caudex-regular"
            style={{ 
              color: '#4b2259', 
              transform: 'rotate(-5deg)',
              fontSize: 'min(5vw, 40px)',
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            BIRTHDAY
          </div>
        </div>
        
        {/* Join Us Container */}
        <div className="hero-details-container" style={{ display: 'flex', width: '100%', marginTop: '2rem' }}>
          <div style={{ width: '60%' }}>
            <div className="font-poppins hero-join-us" style={{ color: '#4b2259', textTransform: 'uppercase', textAlign: 'center', lineHeight: '1.2', fontSize: 'clamp(0.875rem, 2vw, 20px)' }}>
              JOIN US FOR {celebrant.debutant.name.nickname.toUpperCase()}'S<br />
              SWEET 18TH PARTY!
            </div>
            <div className="font-poppins hero-date-container" style={{ color: '#B76E79', marginTop: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: 'clamp(0.75rem, 1.5vw, 20px)' }}>
              <div className="font-poppins hero-month-year" style={{ borderRight: '2px solid #B76E79', paddingRight: '0.75rem', fontSize: 'clamp(0.6rem, 1.2vw, 20px)' }}>
                {celebrant.debutant.debut.month.toUpperCase()}
              </div>
              <div className="font-poppins hero-day" style={{ fontSize: 'clamp(1rem, 2.25vw, 20px)', fontWeight: 'bold' }}>
                {celebrant.debutant.debut.day}
              </div>
              <div className="font-poppins hero-month-year" style={{ borderLeft: '2px solid #B76E79', paddingLeft: '0.75rem', fontSize: 'clamp(0.6rem, 1.2vw, 20px)' }}>
                {celebrant.debutant.debut.year}
              </div>
            </div>
            <div className="font-poppins hero-time" style={{ color: '#B76E79', marginTop: '0.125rem', textTransform: 'uppercase', fontSize: 'clamp(0.875rem, 1.5vw, 20px)', textAlign: 'center', fontWeight: 600 }}>
              AT {celebrant.debutant.debut.time.toUpperCase()}
            </div>
            <div className="font-poppins hero-venue" style={{ color: '#4b2259', marginTop: '0.25rem', textTransform: 'uppercase', fontSize: 'clamp(0.875rem, 1.5vw, 20px)', textAlign: 'center', fontWeight: 600 }}>
              {venues.venue.name.toUpperCase()}
            </div>
          </div>
          <div style={{ width: '40%' }}>
          </div>
        </div>
      </div>
      
      {/* Bottom Design */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hero-bottom-design-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        <img 
          src="/assets/images/graphics/bottom-design.png" 
          alt="Bottom design left" 
          className="hero-bottom-design hero-bottom-design-left hidden lg:block"
          style={{ width: 'fit-content' }}
        />
        <img 
          src="/assets/images/graphics/bottom-design.png" 
          alt="Bottom design center" 
          className="hero-bottom-design hero-bottom-design-center"
          style={{ width: '100%' }}
        />
        <img 
          src="/assets/images/graphics/bottom-design.png" 
          alt="Bottom design right" 
          className="hero-bottom-design hero-bottom-design-right hidden lg:block"
          style={{ width: 'fit-content' }}
        />
      </div>
      
      {/* Hero Portrait - Bottom Right */}
      <img 
        src="/assets/images/graphics/hero-portrait.png" 
        alt="Hero portrait" 
        className="absolute bottom-0 z-30 hero-portrait"
        style={{ maxHeight: '50vh', height: 'auto', width: 'auto', right: '-5%' }}
      />

      {/* Audio Player - Bottom Center */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50px',
          padding: '0.75rem 1.5rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          minWidth: '300px',
          maxWidth: '90%'
        }}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Skip Backward Button */}
          <button
            onClick={skipBackward}
            className="flex items-center justify-center p-2 hover:opacity-70 transition-opacity"
            style={{ color: '#4b2259' }}
            aria-label="Skip backward 10 seconds"
          >
            <SkipBack size={20} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="flex items-center justify-center p-2 rounded-full hover:opacity-70 transition-opacity"
            style={{ 
              color: '#4b2259',
              backgroundColor: 'rgba(75, 34, 89, 0.1)'
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Skip Forward Button */}
          <button
            onClick={skipForward}
            className="flex items-center justify-center p-2 hover:opacity-70 transition-opacity"
            style={{ color: '#4b2259' }}
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward size={20} />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 mx-2 sm:mx-4">
            <div
              onClick={handleProgressClick}
              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative"
              style={{ backgroundColor: 'rgba(75, 34, 89, 0.2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: '#4b2259'
                }}
              />
            </div>
          </div>

          {/* Time Display */}
          <div 
            className="text-xs sm:text-sm font-poppins whitespace-nowrap"
            style={{ color: '#4b2259', minWidth: '80px', textAlign: 'right' }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


