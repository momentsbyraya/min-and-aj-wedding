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

/** Prenup background per category (cycles if more categories than images). */
/** Prenup backgrounds for 18s modal only — must not reuse main-invitation prenup-01..06. */
const CATEGORY_PRENUP_BGS = [
  '/images/prenup/NZ6_7917.jpeg',
  '/images/prenup/NZ6_8482.jpeg',
  '/images/prenup/NZ6_8574.jpeg'
]

/**
 * Per-category override for background-position. `null` falls back to the default
 * (opposite the text: '80% center' when left-aligned, '20% center' when right-aligned).
 */
const CATEGORY_BG_POSITIONS = [
  '40% center',
  '60% center',
  '5% center',
  '40% center',
  null
]

const getCategoryPrenupBg = (index) =>
  CATEGORY_PRENUP_BGS[((index % CATEGORY_PRENUP_BGS.length) + CATEGORY_PRENUP_BGS.length) % CATEGORY_PRENUP_BGS.length]

/**
 * Color palettes for the soft-edge wash, one per category.
 * Built from pastel brand: #F0C9CE, #F0C9CE, #FBF3F0, #F7E0E3
 */
const CATEGORY_PALETTES = [
  {
    // 0 — Lavender #F0C9CE
    deep: '90, 72, 104',
    mid: '229, 215, 237',
    light: '236, 226, 242',
    pale: '242, 235, 247',
    pale2: '229, 215, 237',
    palest: '#F0C9CE'
  },
  {
    // 1 — Blush #F0C9CE
    deep: '154, 111, 111',
    mid: '241, 215, 215',
    light: '245, 226, 226',
    pale: '248, 236, 236',
    pale2: '241, 215, 215',
    palest: '#F0C9CE'
  },
  {
    // 2 — Cream #FBF3F0
    deep: '168, 140, 96',
    mid: '250, 232, 206',
    light: '252, 239, 220',
    pale: '253, 245, 232',
    pale2: '250, 232, 206',
    palest: '#FBF3F0'
  },
  {
    // 3 — Powder blue #F7E0E3
    deep: '107, 132, 153',
    mid: '210, 224, 238',
    light: '222, 232, 243',
    pale: '232, 239, 247',
    pale2: '210, 224, 238',
    palest: '#F7E0E3'
  },
  {
    // 4 — Lavender ↔ blue blend
    deep: '122, 120, 153',
    mid: '220, 220, 238',
    light: '229, 224, 237',
    pale: '242, 235, 247',
    pale2: '210, 224, 238',
    palest: '#F0C9CE'
  }
]

const getCategoryPalette = (index) =>
  CATEGORY_PALETTES[((index % CATEGORY_PALETTES.length) + CATEGORY_PALETTES.length) % CATEGORY_PALETTES.length]

/** Soft gradient/wash overlays — same layered structure as OurGift / CelebrantStory, colored per category. */
const SoftEdgeWash = ({ mirrored = false, palette }) => {
  const { deep, mid, light, pale, pale2 } = palette
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      style={mirrored ? { transform: 'scaleX(-1)', transformOrigin: 'center' } : undefined}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(${deep}, 0.9) 0%, rgba(${light}, 0.65) 50%, transparent 100%)`
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse 95% 115% at 0% 50%, rgba(${mid}, 0.85) 0%, rgba(${light}, 0.45) 48%, transparent 78%)`
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            `linear-gradient(115deg, rgba(${deep}, 0.45) 0%, rgba(${mid}, 0.4) 32%, transparent 62%), linear-gradient(180deg, rgba(${pale}, 0.65) 0%, transparent 38%, transparent 62%, rgba(${pale2}, 0.5) 100%)`
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse 32% 100% at 0% 50%, rgba(${mid}, 0.75) 0%, rgba(${pale}, 0.4) 45%, transparent 68%), radial-gradient(ellipse 24% 78% at 14% 45%, rgba(${deep}, 0.5) 0%, transparent 70%)`
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            `linear-gradient(90deg, rgba(${light}, 0.6) 0%, rgba(${pale}, 0.4) 22%, transparent 50%), linear-gradient(102deg, rgba(${pale2}, 0.45) 0%, transparent 52%)`
        }}
      />
    </div>
  )
}

const getCategoryTitleImage = (nameLabel) => {
  const key = nameLabel.toLowerCase().replace(/\s+/g, ' ').trim()
  const map = {
    shots: '/images/graphics/shots-title.png',
    bills: '/images/graphics/bills-title.png',
    'blue bills': '/images/graphics/bills-title.png',
    gifts: '/images/graphics/treasures-title.png',
    treasures: '/images/graphics/treasures-title.png'
  }
  return map[key] || null
}

const CategorySection = ({ category, index = 0, scrollerElement, isLast = false }) => {
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
  const nameLabel = (category.name || '').trim()
  const titleImageSrc = getCategoryTitleImage(nameLabel)
  const titleAltText = nameLabel ? `18 ${capitalizeWords(nameLabel)}` : ''

  const bgImage = getCategoryPrenupBg(index)
  const palette = getCategoryPalette(index)
  // Alternate text alignment: even indices on the LEFT, odd indices on the RIGHT.
  const isRightAligned = index % 2 === 1
  // Position the bg image opposite the text so its subject sits on the empty side
  // (overridable per category via CATEGORY_BG_POSITIONS).
  const bgPosition = CATEGORY_BG_POSITIONS[index] ?? (isRightAligned ? '20% center' : '80% center')

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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    }

    if (namesRef.current?.children?.length) {
      tl.fromTo(
        namesRef.current.children,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.07
        },
        '-=0.25'
      )
    }

    return () => {
      tl.kill()
    }
  }, [scrollerElement])

  const contentSideClass = isRightAligned
    ? 'ml-auto mr-0 text-right items-end'
    : 'mr-auto ml-0 text-left items-start'

  return (
    <section
      ref={containerRef}
      className="eighteenths-cat-shell relative w-full"
      style={{ backgroundColor: palette.palest }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: bgPosition
        }}
        aria-hidden
      />
      <SoftEdgeWash mirrored={isRightAligned} palette={palette} />

      <div className={`relative z-20 w-full max-w-lg px-5 sm:px-8 ${isRightAligned ? 'ml-auto' : 'mr-auto'}`}>
        <div className={`flex flex-col py-24 sm:py-32 md:py-40 ${contentSideClass}`}>
          <div ref={titleRef} className="eighteenths-cat-title-wrap inline-block">
            {titleImageSrc ? (
              <img
                src={titleImageSrc}
                alt={titleAltText}
                className="eighteenths-cat-title-image"
                loading="lazy"
              />
            ) : null}
          </div>

          <div
            ref={namesRef}
            className={`mt-5 flex w-full flex-col gap-1 ${isRightAligned ? 'items-end' : 'items-start'}`}
          >
            {names.map((name, nameIndex) => (
              <div
                key={nameIndex}
                className="font-poppins text-[11px] sm:text-xs"
                style={{
                  color: '#8B5560',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  lineHeight: 1.4,
                  textShadow: '0 1px 2px rgba(248, 241, 234, 0.85)'
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isLast ? (
        <img
          src="/images/graphics/gem-divider.png"
          alt=""
          aria-hidden="true"
          className="eighteenths-cat-divider pointer-events-none absolute left-1/2 bottom-0"
          style={{ zIndex: 100 }}
        />
      ) : null}
    </section>
  )
}

const EighteenList = ({ scrollerElement } = {}) => {
  const displayCategories = eighteenths.categories.filter(
    (cat) => (cat.names && cat.names.length > 0) || (cat.matches && cat.matches.length > 0)
  )

  return (
    <>
      <style>{`
        .eighteenths-cat-shell {
          width: 100vw;
          max-width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }

        .eighteenths-cat-title-wrap {
          display: inline-flex;
          flex-direction: column;
        }
        .eighteenths-cat-shell .text-right .eighteenths-cat-title-wrap { align-items: flex-end; }
        .eighteenths-cat-shell .text-left  .eighteenths-cat-title-wrap { align-items: flex-start; }

        .eighteenths-cat-title-image {
          display: block;
          width: clamp(180px, 50vw, 320px);
          height: auto;
          object-fit: contain;
        }

        .eighteenths-cat-divider {
          width: 100vw;
          max-width: 100vw;
          height: auto;
          transform: translate(-50%, 50%);
        }
      `}</style>
      <section className="relative w-full overflow-hidden eighteenths-section bg-transparent">
        {displayCategories.map((category, index) => (
          <CategorySection
            key={`eighteenth-cat-${category.name ?? index}`}
            category={category}
            index={index}
            isLast={index === displayCategories.length - 1}
            scrollerElement={scrollerElement}
          />
        ))}
      </section>
    </>
  )
}

export default EighteenList
