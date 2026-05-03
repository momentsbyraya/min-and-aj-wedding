import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, eighteenths } from '../data'
import './EighteenList.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EighteenList = () => {
  const sectionRef = useRef(null)
  const titleTheRef = useRef(null)
  const titleEighteenthsRef = useRef(null)
  const tennisMatchesHeadingRef = useRef(null)
  const tennisMatchesDescRef = useRef(null)
  const tennisMatchesImageRef = useRef(null)
  const matchesGridTitleRef = useRef(null)
  const setsHeadingRef = useRef(null)
  const setsDescRef = useRef(null)
  const setsImageRef = useRef(null)
  const setsGridTitleRef = useRef(null)
  const slicesHeadingRef = useRef(null)
  const slicesDescRef = useRef(null)
  const slicesImageRef = useRef(null)
  const slicesGridTitleRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate title "The" - slide down
    if (titleTheRef.current) {
      tl.fromTo(titleTheRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      )
    }
    
    // Animate title "EIGHTEENTH'S" - slide down
    if (titleEighteenthsRef.current) {
      tl.fromTo(titleEighteenthsRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Animate "18 Tennis Matches" heading - slide from left
    if (tennisMatchesHeadingRef.current) {
      tl.fromTo(tennisMatchesHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate description - slide from right
    if (tennisMatchesDescRef.current) {
      tl.fromTo(tennisMatchesDescRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate image - slide from right
    if (tennisMatchesImageRef.current) {
      tl.fromTo(tennisMatchesImageRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate matches grid title - slide down
    if (matchesGridTitleRef.current) {
      tl.fromTo(matchesGridTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate match cards with stagger
    tl.fromTo(".match-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.2"
    )

    // Animate SETS heading - slide from left
    if (setsHeadingRef.current) {
      tl.fromTo(setsHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS description - slide from right
    if (setsDescRef.current) {
      tl.fromTo(setsDescRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS image - slide from left
    if (setsImageRef.current) {
      tl.fromTo(setsImageRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS grid title - slide down
    if (setsGridTitleRef.current) {
      tl.fromTo(setsGridTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS names with stagger
    tl.fromTo(".set-card",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.08
      },
      "-=0.2"
    )

    // Animate SLICES heading - slide from left
    if (slicesHeadingRef.current) {
      tl.fromTo(slicesHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES description - slide from right
    if (slicesDescRef.current) {
      tl.fromTo(slicesDescRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES image - slide from right
    if (slicesImageRef.current) {
      tl.fromTo(slicesImageRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES grid title - slide down
    if (slicesGridTitleRef.current) {
      tl.fromTo(slicesGridTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES name groups - slide up
    tl.fromTo(".slice-group",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15
      },
      "-=0.2"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
    <section
      ref={sectionRef}
      className="eighteen-section relative w-full overflow-hidden"
    >
      {/* Container 1 - Paragraph with title and photo */}
      <div className="relative z-20 flex flex-col lg:flex-row items-stretch gap-0 px-8 pt-16 pb-8">
        {/* Paragraph with title */}
        <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pb-8 lg:pb-16 lg:flex lg:flex-col text-center lg:text-left relative z-10">
          {/* Title Group */}
          <div className="eighteen-title-border pb-8 mb-8">
            {/* The in Ballet font */}
            <h1
              ref={titleTheRef}
              className="eighteen-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
            >
              The
            </h1>

            {/* EIGHTEENTH'S */}
            <h2
              ref={titleEighteenthsRef}
              className="eighteen-title-main text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
            >
              EIGHTEENTH'S
            </h2>
          </div>
          <h3 ref={tennisMatchesHeadingRef} className="eighteen-text-white mb-4">
            <span className="eighteen-heading-text font-instrument-serif uppercase">Tennis Matches</span>
          </h3>
          {eighteenths.categories[0].description && (
            <div ref={tennisMatchesDescRef} className="eighteen-description font-poppins">
              {eighteenths.categories[0].description.split('\n').map((paragraph, index) => {
                const text = paragraph.trim();
                let highlightedText = text.replace(/18 Tennis Matches\./g, '<strong><span class="eighteen-description-highlight">18 Tennis Matches.</span></strong>');
                highlightedText = highlightedText.replace(/traditional '18 Roses'/g, 'traditional<br class="eighteen-description-break">\'18 Roses\'');
                return (
                  <p 
                    key={index} 
                    className={`eighteen-description-paragraph font-poppins ${text ? 'eighteen-description-paragraph-spaced' : 'eighteen-description-paragraph-tight'}`}
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* Photo */}
        <div className="eighteen-image-container w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex relative z-10">
          <img 
            ref={tennisMatchesImageRef}
            src="/images/prenup/prenup2.jpg" 
            alt="18 Tennis Matches" 
            className="eighteen-image tennis-matches-image eighteen-image-left w-full h-full object-cover flex-1 eighteen-image-mobile"
          />
        </div>
      </div>

      {/* Container 2 - Matches */}
      <div className="relative z-20 px-8 py-8">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <h3 ref={matchesGridTitleRef} className="eighteen-text-white mb-8 text-center">
            <span className="eighteen-heading-text font-instrument-serif uppercase">Tennis Matches</span>
          </h3>
          {/* Grid container for matches */}
          <div className="grid gap-4 justify-items-center matches-grid">
            {eighteenths.categories[0]?.matches && eighteenths.categories[0].matches.map((match, matchIndex) => (
              <div 
                key={matchIndex} 
                className={`eighteen-match-card match-card text-center py-6 px-3 w-full ${match.number === 10 ? 'match-10-full-width' : ''}`}
              >
                <h3 
                  className="eighteen-match-number text-2xl sm:text-3xl md:text-4xl font-instrument-serif font-semibold mb-4"
                >
                  MATCH {match.number}
                </h3>
                <div className="flex flex-col items-center">
                  {match.names.map((name, nameIndex) => (
                    <div 
                      key={nameIndex} 
                      className="eighteen-match-name font-poppins"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container 3 - SETS */}
      <div className="eighteen-container-divider relative z-20 flex flex-col lg:flex-row items-stretch gap-0 px-8 pt-16 pb-8">
        {/* Paragraph with title */}
        <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pb-8 lg:pb-16 lg:flex lg:flex-col text-center lg:text-left relative z-10">
          <h3 ref={setsHeadingRef} className="eighteen-text-white mb-4">
            <span className="eighteen-heading-number eighteen-heading-number-sets font-instrument-serif font-semibold">18</span>
            <span className="eighteen-heading-text eighteen-heading-text-sets font-instrument-serif uppercase"> {eighteenths.categories[1]?.title || 'SETS'}</span>
          </h3>
          {eighteenths.categories[1]?.description && (
            <div ref={setsDescRef} className="eighteen-description eighteen-description-sets font-poppins">
              {eighteenths.categories[1].description.split('\n').map((paragraph, index) => {
                const text = paragraph.trim();
                let highlightedText = text.replace(/18 Sets\./g, '<strong><span class="eighteen-description-highlight">18 Sets.</span></strong>');
                return (
                  <p 
                    key={index} 
                    className={`eighteen-description-paragraph font-poppins ${text ? 'eighteen-description-paragraph-spaced' : 'eighteen-description-paragraph-tight'}`}
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* Photo */}
        <div className="eighteen-image-container w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex relative z-10">
          <img 
            ref={setsImageRef}
            src="/images/prenup/prenup6.jpg" 
            alt="18 Sets" 
            className="eighteen-image w-full h-full object-cover flex-1 eighteen-image-mobile sets-image"
          />
        </div>
      </div>

      {/* Container 4 - SETS Names Grid */}
      <div className="relative z-20 px-8 py-8">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <h3 ref={setsGridTitleRef} className="eighteen-text-white mb-8 text-center">
            <span className="eighteen-heading-number eighteen-heading-number-sets font-instrument-serif font-semibold">18</span>
            <span className="eighteen-heading-text eighteen-heading-text-sets font-instrument-serif uppercase"> {eighteenths.categories[1]?.title || 'SETS'}</span>
          </h3>
          {/* Grid container for SETS names */}
          <div className="grid gap-4 justify-items-center matches-grid">
            {eighteenths.categories[1]?.names && eighteenths.categories[1].names.map((name, nameIndex) => (
              <div 
                key={nameIndex} 
                className="eighteen-set-card set-card text-center py-6 px-3 w-full"
              >
                <div className="eighteen-set-name font-poppins">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container 5 - SLICES */}
      <div className="eighteen-container-divider relative z-20 flex flex-col lg:flex-row items-stretch gap-0 px-8 pt-16 pb-8">
        {/* First child: Category title, paragraph, and boxes */}
        <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pb-8 lg:pb-16 lg:flex lg:flex-col text-center lg:text-left relative z-10">
          <h3 ref={slicesHeadingRef} className="eighteen-text-white mb-4">
            <span className="eighteen-heading-number eighteen-heading-number-slices font-instrument-serif font-semibold">18</span>
            <span className="eighteen-heading-text eighteen-heading-text-slices font-instrument-serif uppercase"> {eighteenths.categories[2]?.title || 'SLICES'}</span>
          </h3>
          {eighteenths.categories[2]?.description && (
            <div ref={slicesDescRef} className="eighteen-description eighteen-description-slices font-poppins">
              {eighteenths.categories[2].description.split('\n').map((paragraph, index) => {
                const text = paragraph.trim();
                let highlightedText = text.replace(/18 Slices/g, '<strong><span class="eighteen-description-highlight">18 Slices</span></strong>');
                return (
                  <p 
                    key={index} 
                    className={`eighteen-description-paragraph font-poppins ${text ? 'eighteen-description-paragraph-spaced' : 'eighteen-description-paragraph-tight'}`}
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  />
                );
              })}
            </div>
          )}
          
          {/* Mobile-only duplicate image - above slices boxes */}
          <div className="eighteen-image-container-mobile lg:hidden w-full mt-8 h-96 overflow-hidden flex relative z-10">
            <img 
              src="/images/prenup/prenup4.jpg" 
              alt="18 Slices" 
              className="eighteen-image eighteen-image-slices w-full h-full object-cover flex-1"
              style={{ objectPosition: '60% center' }}
            />
          </div>
          
          {/* SLICES Names Grid */}
          <div className="mt-8">
            <div className="max-w-4xl mx-auto relative z-10">
              {/* Title */}
              <h3 ref={slicesGridTitleRef} className="eighteen-text-white mb-8 text-center">
                <span className="eighteen-heading-number eighteen-heading-number-slices font-instrument-serif font-semibold">18</span>
                <span className="eighteen-heading-text eighteen-heading-text-slices font-instrument-serif uppercase"> {eighteenths.categories[2]?.title || 'SLICES'}</span>
              </h3>
              {/* Two groups container - stack on mobile, side by side on tablet+ */}
              <div className="flex flex-col md:flex-row gap-4">
                {eighteenths.categories[2]?.names && (() => {
                  const names = eighteenths.categories[2].names;
                  const midPoint = Math.ceil(names.length / 2);
                  const group1 = names.slice(0, midPoint);
                  const group2 = names.slice(midPoint);
                  
                  return (
                    <>
                      {/* Group 1 */}
                      <div className="eighteen-slice-group slice-group flex-1 py-6 px-4">
                        <div className="flex flex-col items-center">
                          {group1.map((name, nameIndex) => (
                            <div 
                              key={nameIndex} 
                              className="eighteen-slice-name font-poppins text-center"
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Group 2 */}
                      <div className="eighteen-slice-group slice-group flex-1 py-6 px-4">
                        <div className="flex flex-col items-center">
                          {group2.map((name, nameIndex) => (
                            <div 
                              key={nameIndex} 
                              className="eighteen-slice-name font-poppins text-center"
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Second child: Image */}
        <div className="eighteen-image-container hidden lg:flex w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden relative z-10">
          <img 
            ref={slicesImageRef}
            src="/images/prenup/prenup4.jpg" 
            alt="18 Slices" 
            className="eighteen-image eighteen-image-slices w-full h-full object-cover flex-1 eighteen-image-mobile"
          />
        </div>
      </div>
    </section>
    </>
  )
}

export default EighteenList

