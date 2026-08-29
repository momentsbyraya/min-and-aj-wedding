import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NICKNAMES = 'Min & AJ'
const DATE_NUMBERS = '04.17.2027'
const INTRO_MESSAGE = 'Join us as we begin our forever together.'

/** https://youtu.be/Qd5sQskdbDw — muted autoplay, no controls chrome */
const YOUTUBE_ID = 'Qd5sQskdbDw'
const YOUTUBE_EMBED = [
  `https://www.youtube.com/embed/${YOUTUBE_ID}`,
  '?autoplay=1',
  '&mute=1',
  '&controls=0',
  '&disablekb=1',
  '&fs=0',
  '&modestbranding=1',
  '&playsinline=1',
  '&rel=0',
  '&iv_load_policy=3',
  '&cc_load_policy=0',
  '&loop=1',
  `&playlist=${YOUTUBE_ID}`
].join('')

/**
 * Video intro between Venue and Program.
 * YouTube unlisted embed — muted autoplay when scrolled into view.
 */
const VideoIntroSection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const videoWrapRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [showCover, setShowCover] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }
    )

    return () => tl.kill()
  }, [])

  useEffect(() => {
    const el = videoWrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35)
      },
      { threshold: [0, 0.35, 0.5, 0.75] }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) {
      setShowCover(true)
      return
    }
    // Brief theme cover while YouTube boots (much shorter than Drive)
    setShowCover(true)
    const t = window.setTimeout(() => setShowCover(false), 900)
    return () => window.clearTimeout(t)
  }, [inView])

  return (
    <section
      ref={sectionRef}
      id="video"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24"
      style={{ backgroundColor: '#F0C9CE' }}
      aria-label="Video introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/images/bg-1.png)' }}
        aria-hidden
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-6 text-center sm:max-w-xl sm:px-8 lg:max-w-2xl"
      >
        <div
          className="mb-5 flex items-center justify-center gap-2 sm:mb-6 sm:gap-3"
          aria-hidden
        >
          <span className="font-lavishly text-5xl leading-none text-[#8B5560] sm:text-6xl">
            M
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[#8B5560] sm:h-6 sm:w-6"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="font-lavishly text-5xl leading-none text-[#8B5560] sm:text-6xl">
            A
          </span>
        </div>

        <p className="alice-regular mb-2 text-xl tracking-[0.12em] text-[#8B5560] sm:text-2xl">
          {NICKNAMES}
        </p>

        <p className="alice-regular mb-8 text-sm tracking-[0.28em] text-[#6B3F48] sm:mb-10 sm:text-base">
          {DATE_NUMBERS}
        </p>

        <div ref={videoWrapRef} className="relative mb-8 w-full sm:mb-10">
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{ backgroundColor: '#E8B4BC' }}
          >
            {inView ? (
              <iframe
                key="yt-autoplay"
                title="Min & AJ wedding video"
                src={YOUTUBE_EMBED}
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : null}

            {/* Blocks taps so YouTube UI doesn’t pop in; video stays muted ambient */}
            {inView && !showCover ? (
              <div className="absolute inset-0 z-[1]" aria-hidden />
            ) : null}

            <div
              className="absolute inset-0 z-[2] flex items-center justify-center transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(135deg, #F0C9CE 0%, #E8B4BC 50%, #F0C9CE 100%)',
                opacity: showCover || !inView ? 1 : 0,
                pointerEvents: showCover || !inView ? 'auto' : 'none'
              }}
              aria-hidden={!(showCover || !inView)}
            >
              {(showCover || !inView) && (
                <p className="font-albert text-xs font-thin tracking-wide text-[#8B5560] sm:text-sm">
                  {inView ? 'Loading video…' : 'Video'}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="max-w-md font-albert text-base font-thin italic leading-relaxed text-[#8B5560] sm:text-lg">
          {INTRO_MESSAGE}
        </p>
      </div>
    </section>
  )
}

export default VideoIntroSection
