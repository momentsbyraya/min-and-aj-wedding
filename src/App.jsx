import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Preloader from './components/Preloader'
import { audio } from './data'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showOpeningScreen, setShowOpeningScreen] = useState(true)
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio once - it will persist across component changes
    const el = new Audio(audio.background)
    el.loop = false // custom loop from loopStart (native loop always restarts at 0)
    el.volume = audio.volume
    audioRef.current = el

    const loopStart = Number(audio.loopStart) || 0

    const handlePlay = () => setIsMusicPlaying(true)
    const handlePause = () => setIsMusicPlaying(false)
    const handleEnded = () => {
      if (!audio.loop || !audioRef.current) {
        setIsMusicPlaying(false)
        return
      }
      audioRef.current.currentTime = loopStart
      audioRef.current.play().catch(() => setIsMusicPlaying(false))
    }

    el.addEventListener('play', handlePlay)
    el.addEventListener('pause', handlePause)
    el.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay)
        audioRef.current.removeEventListener('pause', handlePause)
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startMusic = () => {
    if (audioRef.current) {
      const loopStart = Number(audio.loopStart) || 0
      audioRef.current.currentTime = loopStart
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }

  const pauseMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }

  const resumeMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }

  const handleEnvelopeOpen = () => {
    setShowOpeningScreen(false)
    startMusic()
  }

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true)
  }, [])

  return (
    <div className="App min-h-screen wedding-gradient relative">
      <DynamicTitle />
      {!isPreloaderComplete ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showOpeningScreen ? (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      ) : (
        <>
          <WeddingInvitation 
            onOpenRSVP={() => setIsRSVPModalOpen(true)} 
            onPauseMusic={pauseMusic}
            onResumeMusic={resumeMusic}
            onStartMusic={startMusic}
            isMusicPlaying={isMusicPlaying}
          />
          <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App 