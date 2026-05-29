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
const CATEGORY_PRENUP_BGS = [
  '/images/prenup/DSC07725.jpg',
  '/images/prenup/DSC07907.jpg',
  '/images/prenup/DSC07993.jpg',
  '/images/prenup/DSC07675.jpg',
  '/images/prenup/DSC07640.jpg'
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
 * deep   → strongest anchor color (replaces #80043a wine)
 * mid    → main brand wash (replaces #e20964 fuchsia)
 * light  → secondary lighter wash (replaces #ed5c95)
 * pale   → outermost soft tint (replaces pinks/blushes)
 * palest → section base background behind the photo
 */
const CATEGORY_PALETTES = [
  {
    // 0 — Roses (fuchsia, original)
    deep: '128, 4, 58',
    mid: '226, 9, 100',
    light: '237, 92, 149',
    pale: '245, 196, 218',
    pale2: '243, 152, 188',
    palest: '#fce3ee'
  },
  {
    // 1 — Candles (purple)
    deep: '49, 10, 95',
    mid: '124, 58, 237',
    light: '167, 139, 250',
    pale: '221, 214, 254',
    pale2: '196, 181, 253',
    palest: '#ede9fe'
  },
  {
    // 2 — Treasures (bright orange)
    deep: '154, 52, 18',
    mid: '234, 88, 12',
    light: '251, 146, 60',
    pale: '254, 215, 170',
    pale2: '253, 186, 116',
    palest: '#ffedd5'
  },
  {
    // 3 — Shots (red)
    deep: '127, 29, 29',
    mid: '220, 38, 38',
    light: '248, 113, 113',
    pale: '254, 202, 202',
    pale2: '252, 165, 165',
    palest: '#fee2e2'
  },
  {
    // 4 — Bills (teal)
    deep: '19, 78, 74',
    mid: '13, 148, 136',
    light: '45, 212, 191',
    pale: '153, 246, 228',
    pale2: '94, 234, 212',
    palest: '#ccfbf1'
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

const CategorySection = ({ category, index = 0, scrollerElement }) => {
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
  const titleLabel = (category.title || '').trim()
  const displayPrimary = nameLabel ? `18 ${capitalizeWords(nameLabel)}` : ''
  const displaySubtitle = titleLabel ? titleLabel.toUpperCase() : ''

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
      className="eighteenths-cat-shell relative w-full overflow-hidden"
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
        <div className={`flex flex-col py-14 sm:py-20 ${contentSideClass}`}>
          <div ref={titleRef} className="eighteenths-cat-title-wrap inline-block">
            <span className="eighteenths-cat-title font-beautyofthebeast capitalize">
              {displayPrimary ? displayPrimary.toLowerCase() : ''}
            </span>
            {displaySubtitle ? (
              <span className="eighteenths-cat-subtitle">{displaySubtitle}</span>
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
                  color: '#EFE9DC',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  lineHeight: 1.4,
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.4)'
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
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

        .eighteenths-cat-title {
          display: block;
          font-size: clamp(2.35rem, 7.5vw, 3.45rem);
          line-height: 1;
          color: #FFFFFF;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.45);
        }

        /* Serif subtitle stacked under the script "18 [Name]" title — matches Hero "YOU ARE INVITED" face */
        .eighteenths-cat-subtitle {
          display: block;
          margin-top: 0.5em;
          font-family: 'Cormorant SC', 'Playfair Display', Georgia, 'Times New Roman', serif !important;
          font-weight: 400 !important;
          letter-spacing: 0.16em;
          font-size: clamp(0.95rem, 2.6vw, 1.25rem);
          line-height: 1.1;
          color: #FFFFFF;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.45);
        }
      `}</style>
      <section className="relative w-full overflow-hidden eighteenths-section bg-transparent">
        {displayCategories.map((category, index) => (
          <CategorySection
            key={`eighteenth-cat-${category.name ?? index}`}
            category={category}
            index={index}
            scrollerElement={scrollerElement}
          />
        ))}
      </section>
    </>
  )
}

export default EighteenList
