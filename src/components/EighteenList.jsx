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

/** Shared plate art behind every category in the modal list. */
const CATEGORY_PLATE_BG = '/images/graphics/plate-treasure.png'

const plateBackgroundStyle = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat'
})

/** Full-bleed strips between programme categories (URLs under /images/prenup/). */
const EIGHTEENTH_INTERSTITIAL_IMAGES = [
  '/images/prenup/A7400780.jpg',
  '/images/prenup/A7400944.jpg',
  '/images/prenup/A7400961.jpg'
]

const getCategoryPanel = (category) => {
  const n = `${category.name || ''} ${category.title || ''}`.toLowerCase()
  let variant = 'default'
  if (n.includes('treasure')) variant = 'treasure'
  else if (n.includes('rose')) variant = 'roses'
  else if (n.includes('candle')) variant = 'candles'
  return { variant, image: CATEGORY_PLATE_BG, fullBleed: true }
}

const CategorySection = ({ category, scrollerElement }) => {
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

  const panel = getCategoryPanel(category)

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

  const innerClass = `eighteenths-cat-inner w-full eighteenths-cat-inner--${panel.variant}`
  const hasPlateBg = Boolean(panel.image)

  const innerContent = (
    <div className={innerClass} data-eighteenths-category={panel.variant}>
      <h3
        className="mb-6 flex w-full justify-center pt-10 text-2xl sm:pt-14 sm:text-3xl md:pt-16 md:text-[2.125rem] lg:text-4xl"
        style={{ color: '#6F2D36', overflow: 'visible' }}
      >
        <div ref={titleRef} className="eighteenths-modal-title-wrap inline-block text-center">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
            {displayTitle ? displayTitle.toLowerCase() : ''}
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
    </div>
  )

  return (
    <div
      className={`eighteenths-cat-shell flex flex-col items-center eighteenths-category eighteenths-cat--${panel.variant} ${panel.fullBleed ? 'eighteenths-cat-shell--bleed' : ''}`}
      ref={containerRef}
      style={{ overflow: 'visible' }}
    >
      {hasPlateBg ? (
        <div className="eighteenths-cat-bg-wrap">
          <div
            className={`eighteenths-cat-plate eighteenths-cat-plate--${panel.variant}`}
            style={plateBackgroundStyle(panel.image)}
            aria-hidden
          />
          {innerContent}
        </div>
      ) : (
        innerContent
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
          .eighteenths-container {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
        .eighteenths-cat-shell {
          position: relative;
        }
        .eighteenths-cat-shell--bleed {
          width: 100vw;
          max-width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }
        .eighteenths-cat-plate {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-size: cover !important;
          background-position: center center !important;
          background-repeat: no-repeat !important;
        }
        .eighteenths-cat-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: clamp(2rem, 6vw, 3.25rem);
          padding-bottom: clamp(1rem, 4vw, 2rem);
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        /* Plate + content: same padded box for every category (matches former roses layout) */
        .eighteenths-cat-bg-wrap {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding-top: clamp(17rem, 44vw, 30rem);
          padding-bottom: clamp(12.5rem, 34vw, 22rem);
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .eighteenths-cat-bg-wrap .eighteenths-cat-inner {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          padding-left: 0;
          padding-right: 0;
        }

        /* Modal category titles: typography only — no title-container.png frame */
        .eighteenths-modal-title-wrap {
          background-image: none !important;
          background: none;
          box-sizing: border-box;
          width: fit-content;
          max-width: min(100%, 26rem);
          margin-left: auto;
          margin-right: auto;
          padding: 0;
          min-height: 0;
        }
        .eighteenths-modal-title-wrap .section-title-graphic-inner--line {
          font-size: clamp(2.35rem, 7.5vw, 3.45rem) !important;
        }

        .eighteenths-interstitial {
          line-height: 0;
          display: block;
          box-sizing: border-box;
        }
        .eighteenths-interstitial img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
      <section className="relative w-full overflow-hidden eighteenths-section bg-transparent">
        <div className="relative z-20 w-full px-8">
          <div className="eighteenths-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            {displayCategories.flatMap((category, index) => {
              const nodes = [
                <CategorySection
                  key={`eighteenth-cat-${category.name ?? index}`}
                  category={category}
                  scrollerElement={scrollerElement}
                />
              ]
              if (index < displayCategories.length - 1) {
                const src =
                  EIGHTEENTH_INTERSTITIAL_IMAGES[index % EIGHTEENTH_INTERSTITIAL_IMAGES.length]
                nodes.push(
                  <div
                    key={`eighteenth-between-${index}`}
                    className="eighteenths-interstitial eighteenths-cat-shell--bleed"
                    aria-hidden
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" draggable={false} />
                  </div>
                )
              }
              return nodes
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default EighteenList
