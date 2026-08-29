import React, { useEffect, useState } from 'react'
import { getTimeUntilWedding } from '../utils/countdown'
import { prenupAsset, FEATURE_PHOTOS } from '../utils/prenupAssets'
import FallingPetals from './FallingPetals'
import HeroStorybook from './HeroStorybook'
import Venue from './Venue'
import VideoIntroSection from './VideoIntroSection'
import Schedule from './Schedule'
import PrenupFeature from './PrenupFeature'
import Entourage from './Entourage'
import RSVP from './RSVP'
import Gifts from './Gifts'
import DressCode from './DressCode'
import LoveStory from './LoveStory'
import Gallery from './Gallery'
import FAQ from './FAQ'
import Counter from './Counter'
import Footer from './Footer'
import './WeddingInvitation.css'

/**
 * Section order:
 * Hero → Where to go → Video intro → Wedding program → Prenup → Entourage → Prenup →
 * RSVP → Prenup → Gift → Prenup → Dress code → Prenup → Love story → Prenup →
 * Gallery → Prenup → FAQs → Prenup → Save the date → Footer
 */
const WeddingInvitation = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <FallingPetals />
      <main className="main-container h-full section-container">
        <section className="h-full">
          <HeroStorybook />
        </section>

        <Venue />

        <VideoIntroSection />

        <Schedule />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterProgram)} />

        <Entourage />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterEntourage)} />

        <RSVP />

        <PrenupFeature
          src={prenupAsset(FEATURE_PHOTOS.afterRsvp)}
          objectPosition="center 35%"
        />

        <Gifts />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterGifts)} />

        <DressCode />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterDressCode)} />

        <LoveStory />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterLoveStory)} />

        <Gallery />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterGallery)} />

        <FAQ />

        <PrenupFeature src={prenupAsset(FEATURE_PHOTOS.afterFaq)} />

        <Counter countdown={countdown} />

        <Footer />
      </main>
    </div>
  )
}

export default WeddingInvitation
