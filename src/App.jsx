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
      {/* Watermarks */}
      <div className="watermark-approval watermark-1">
        THIS IS FOR CLIENT APPROVAL ONLY.
      </div>
      <div className="watermark-approval watermark-2">
        THIS IS FOR CLIENT APPROVAL ONLY.
      </div>
      <div className="watermark-approval watermark-3">
        THIS IS FOR CLIENT APPROVAL ONLY.
      </div>
      
      {showOpeningScreen ? (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      ) : (
        <>
          <DynamicTitle />
          <WeddingInvitation onOpenRSVP={() => setIsRSVPModalOpen(true)} />
          <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App 