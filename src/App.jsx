import { useState, useRef, useEffect } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import { audio } from './data'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showOpeningScreen, setShowOpeningScreen] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio once - it will persist across component changes
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume

    // Don't start music automatically - wait for envelope to be opened
    // Music will start when handleEnvelopeOpen is called

    // Cleanup only on app unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 41.15 // Start at 00:32 seconds
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
    // Start music when wedding invitation is shown
    startMusic()
  }

  return (
    <div className="App min-h-screen wedding-gradient relative">
      <DynamicTitle />
      {showOpeningScreen ? (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      ) : (
        <>
          <WeddingInvitation 
            onOpenRSVP={() => setIsRSVPModalOpen(true)} 
            onPauseMusic={pauseMusic}
            onResumeMusic={resumeMusic}
          />
          <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App 