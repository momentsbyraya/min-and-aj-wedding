import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { eighteenths } from '../data'

gsap.registerPlugin(ScrollTrigger)

const capitalizeWords = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())

const scrollTriggerScroller = (scrollerElement) =>
  scrollerElement
    ? { scroller: scrollerElement, invalidateOnRefresh: true }
    : { invalidateOnRefresh: true }

const CategorySection = ({ category, showDivider = true, scrollerElement }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const namesRef = useRef(null)

  const getNames = () => {
    if (category.matches) {
      return category.matches.flatMap((match) => match.names)
    }
    return category.names || []
  }

  const names = getNames()
  const titleBase = (category.title || category.name || '').trim()
  let displayTitle = ''
  if (titleBase) {
    const t = titleBase.trim()
    const rest = t.replace(/^18\s*/i, '').trim()
    if (/^18$/i.test(t) && !rest) {
      displayTitle = '18'
    } else if (rest) {
      displayTitle = `18 ${capitalizeWords(rest)}`
    } else {
      displayTitle = `18 ${capitalizeWords(t)}`
    }
  }

  const isRosesCategory = Boolean(category.matches?.length)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...scrollTriggerScroller(scrollerElement)
      }
    })

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    if (namesRef.current?.children?.length) {
      tl.fromTo(
        namesRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1
        },
        '-=0.2'
      )
    }

    return () => {
      tl.kill()
    }
  }, [scrollerElement])

  return (
    <div
      className={`flex flex-col items-center eighteenths-category ${isRosesCategory ? 'eighteenths-roses' : ''}`}
      ref={containerRef}
      style={{ overflow: 'visible' }}
    >
      <h3
        className={`text-xl sm:text-2xl mb-6 ${isRosesCategory ? 'pt-10 sm:pt-14 md:pt-16' : ''}`}
        style={{ color: '#6F2D36', width: '100%', overflow: 'visible' }}
      >
        <div ref={titleRef} style={{ display: 'block', textAlign: 'center', width: '100%' }}>
          <span
            className="font-halimun"
            style={{
              color: '#6F2D36',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '0.06em',
              display: 'block'
            }}
          >
            {displayTitle}
          </span>
        </div>
      </h3>
      <div
        ref={namesRef}
        className="w-full overflow-visible"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
      >
        {names.map((name, index) => (
          <div
            key={index}
            className="font-poppins max-w-none text-[11px] sm:text-xs"
            style={{
              color: '#6F2D36',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              lineHeight: 1.35
            }}
          >
            {name}
          </div>
        ))}
      </div>
      {showDivider && (
        <div className="mt-10 sm:mt-12 flex w-full justify-center px-4" aria-hidden>
          <div className="flex w-full max-w-[min(92vw,280px)] items-center gap-3 sm:max-w-[300px] sm:gap-4">
            <div
              className="h-[1px] flex-1 rounded-full bg-gradient-to-r from-transparent via-[#6F2D36]/35 to-[#6F2D36]/25"
              style={{ minWidth: '2.5rem' }}
            />
            <svg
              className="shrink-0 text-[#E28B91]/92"
              width={20}
              height={18}
              viewBox="0 0 24 22"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path fill="currentColor" d="M12 20.35c-.15 0-.31-.05-.42-.16C6.4 15.2 3 12.1 3 8.25 3 5.6 5.1 3.5 7.75 3.5c1.53 0 2.95.75 3.75 1.95.8-1.2 2.22-1.95 3.75-1.95C17.9 3.5 20 5.6 20 8.25c0 3.85-3.4 6.95-8.58 11.94a.65.65 0 0 1-.42.16Z" />
            </svg>
            <div
              className="h-[1px] flex-1 rounded-full bg-gradient-to-l from-transparent via-[#6F2D36]/35 to-[#6F2D36]/25"
              style={{ minWidth: '2.5rem' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const EighteenList = ({ scrollerElement } = {}) => {
  const displayCategories = eighteenths.categories.filter(
    (cat) => (cat.names && cat.names.length > 0) || (cat.matches && cat.matches.length > 0)
  )

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .eighteenths-section {
            padding-top: clamp(2rem, 5vw, 3.5rem) !important;
          }
          .eighteenths-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 3rem !important;
            padding-bottom: 9rem !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .eighteenths-roses {
            grid-column: 1 / -1 !important;
            justify-self: center !important;
            max-width: 50% !important;
          }
        }
        @media (min-width: 1024px) {
          .eighteenths-flower-top,
          .eighteenths-flower-bottom {
            display: none !important;
          }
          .eighteenths-desktop-corner {
            display: block !important;
          }
          .eighteenths-container {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .eighteenths-roses {
            grid-column: auto !important;
            justify-self: auto !important;
            max-width: none !important;
          }
        }
        @media (max-width: 1023px) {
          .eighteenths-desktop-corner {
            display: none !important;
          }
        }
      `}</style>
      <section
        className="relative pb-36 sm:pb-44 lg:pb-52 w-full overflow-hidden eighteenths-section"
        style={{ backgroundColor: 'transparent', paddingTop: 'clamp(2rem, 6vw, 4rem)' }}
      >
        <img
          className="eighteenths-flower-top"
          src="/images/graphics/flower-banner.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto',
            height: 'auto',
            maxWidth: 'min(100%, 720px)',
            objectFit: 'contain',
            zIndex: 16
          }}
        />

        <img
          className="eighteenths-flower-bottom"
          src="/images/graphics/flower-banner.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%) scaleY(-1)',
            width: 'auto',
            height: 'auto',
            maxWidth: 'min(100%, 720px)',
            objectFit: 'contain',
            zIndex: 16
          }}
        />

        <img
          className="eighteenths-desktop-corner"
          src="/images/graphics/flower-left.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'auto',
            height: 'auto',
            maxWidth: 'clamp(72px, 12vw, 160px)',
            objectFit: 'contain',
            zIndex: 16,
            display: 'none',
            opacity: 0.95
          }}
        />

        <img
          className="eighteenths-desktop-corner"
          src="/images/graphics/flower-right.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'auto',
            height: 'auto',
            maxWidth: 'clamp(72px, 12vw, 160px)',
            objectFit: 'contain',
            zIndex: 16,
            display: 'none',
            transform: 'scaleX(-1)',
            transformOrigin: 'center'
          }}
        />

        <img
          className="eighteenths-desktop-corner"
          src="/images/graphics/flower-left.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 'auto',
            height: 'auto',
            maxWidth: 'clamp(72px, 12vw, 160px)',
            objectFit: 'contain',
            zIndex: 16,
            display: 'none',
            transform: 'scaleY(-1)',
            transformOrigin: 'center'
          }}
        />

        <img
          className="eighteenths-desktop-corner"
          src="/images/graphics/flower-right.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 'auto',
            height: 'auto',
            maxWidth: 'clamp(72px, 12vw, 160px)',
            objectFit: 'contain',
            zIndex: 16,
            display: 'none',
            transform: 'rotate(180deg)',
            transformOrigin: 'center'
          }}
        />

        <div className="relative z-20 w-full px-8">
          <div className="eighteenths-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            {displayCategories.map((category, index) => (
              <CategorySection
                key={index}
                category={category}
                showDivider={index < displayCategories.length - 1}
                scrollerElement={scrollerElement}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default EighteenList
