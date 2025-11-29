import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EighteenList = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

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

    // Animate title
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
      style={{ backgroundColor: 'white' }}
    >
      {/* Top Design */}
      <img 
        src="/assets/images/graphics/bottom-design.png" 
        alt="Top design" 
        className="absolute top-0 left-0"
        style={{ width: '100%', transform: 'rotate(180deg)', zIndex: 60 }}
      />
      
      {/* Rose Gold Purple Background */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/assets/images/graphics/rose-gold-pupr-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}
      ></div>
      
      {/* Content */}
      <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12" style={{ marginTop: '4rem' }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-antsvalley mb-4" style={{ color: '#4b2259' }}>
            The Eigteenth's
          </h2>
        </div>
        
        {/* Lists - 2 categories per row using grid, all centered */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {/* Roses */}
            <div className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-lovelyhome mb-6 text-left relative" style={{ color: '#4b2259', width: 'fit-content' }}>
                Roses
                <img 
                  src="/assets/images/graphics/butterfly-half-left.png" 
                  alt="Butterfly" 
                  className="absolute top-0 right-0 z-10"
                  style={{ 
                    width: 'min(7vw, 70px)',
                    height: 'auto',
                    transform: 'translate(80%, -50%)'
                  }}
                />
              </h3>
              <div className="text-left" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  'Criz Bayani',
                  'Andrey Pandac',
                  'Garette Honora',
                  'Lester Culaba',
                  'Mckenzie Basto',
                  'Jhabes Cortez',
                  'Clark Dela Paz',
                  'Zyrus Simbajon',
                  'Aviel Martinez',
                  'Lance Lagaya',
                  'Darryl Lomboy',
                  'Kyle Estrella',
                  'Glen Olivo',
                  'Ninong Louie Morales',
                  'Ralph Lagaya (brother)',
                  'Lolo Oscar Lovedioro',
                  'Lolo Pablo Lomboy',
                  'Arnold Lagaya (daddy)'
                ].map((name, index) => (
                  <div key={index} className="font-poppins" style={{ color: '#B76E79', fontSize: '14px' }}>
                    {index + 1}. {name}
                  </div>
                ))}
              </div>
            </div>

            {/* Blue Bills */}
            <div className="flex flex-col" style={{ marginBottom: '4rem' }}>
              <h3 className="text-xl sm:text-2xl font-lovelyhome mb-6 text-left relative" style={{ color: '#4b2259', width: 'fit-content' }}>
                Blue Bills
                <img 
                  src="/assets/images/graphics/butterfly-half-left.png" 
                  alt="Butterfly" 
                  className="absolute top-0 right-0 z-10"
                  style={{ 
                    width: 'min(7vw, 70px)',
                    height: 'auto',
                    transform: 'translate(80%, -50%)'
                  }}
                />
              </h3>
              <div className="text-left" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  'Mamila Eligren Lomboy',
                  'Tita Lorilyn Lagaya',
                  'Ninang Dorie Rioveros',
                  'Uncle Pablo Lomboy Jr.',
                  'Uncle Gerry Lomboy',
                  'Tito Lorie Dante',
                  'Ninang Jheng Finch',
                  'Uncle Nick Lomboy',
                  'Tita Heidy Aquino',
                  'Mimi Lucio',
                  'Fer Briones',
                  'Ninang Lanie Dela Cruz',
                  'Tito dick',
                  'Ailyn Bundang',
                  'Ailene Flores',
                  'Ninong Louie Morales',
                  'Ninong Larry Lomboy',
                  'Ninong Emil Lagaya'
                ].map((name, index) => (
                  <div key={index} className="font-poppins" style={{ color: '#B76E79', fontSize: '14px' }}>
                    {index + 1}. {name}
                  </div>
                ))}
              </div>
            </div>

            {/* Bags */}
            <div className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-lovelyhome mb-6 text-left relative" style={{ color: '#4b2259', width: 'fit-content' }}>
                Bags
                <img 
                  src="/assets/images/graphics/butterfly-half-left.png" 
                  alt="Butterfly" 
                  className="absolute top-0 right-0 z-10"
                  style={{ 
                    width: 'min(7vw, 70px)',
                    height: 'auto',
                    transform: 'translate(80%, -50%)'
                  }}
                />
              </h3>
              <div className="text-left" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  'Tita Becca Magpantay',
                  'Mitch Nepomosino',
                  'Marimar Sibonga',
                  'Celina Cantabaco',
                  'Maxine Bebita',
                  'Althea Rompe',
                  'Vivian Pandac',
                  'Lady Allan Ungco',
                  'Tita Jane Belazon',
                  'Melo Manalansan',
                  'Tita Grace Veloso',
                  'Tita Josephine Velgado',
                  'Tita Priscilla Rosales',
                  'Tita Ardee Lagaya',
                  'April Lomboy',
                  'Tita Janine Lagaya',
                  'Tita Niara Balincamaya',
                  'Tita Melody Cawicaan'
                ].map((name, index) => (
                  <div key={index} className="font-poppins" style={{ color: '#B76E79', fontSize: '14px' }}>
                    {index + 1}. {name}
                  </div>
                ))}
              </div>
            </div>

            {/* Gifts and Candles */}
            <div className="flex flex-col" style={{ marginBottom: '4rem' }}>
              <h3 className="text-xl sm:text-2xl font-lovelyhome mb-6 text-left relative" style={{ color: '#4b2259', width: 'fit-content' }}>
                Gifts & Candles
                <img 
                  src="/assets/images/graphics/butterfly-half-left.png" 
                  alt="Butterfly" 
                  className="absolute top-0 right-0 z-10"
                  style={{ 
                    width: 'min(7vw, 70px)',
                    height: 'auto',
                    transform: 'translate(80%, -50%)'
                  }}
                />
              </h3>
              <div className="text-left" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  'Tito Paul Barrun',
                  'Yuleen Ebido',
                  'Jean Lerry Lomboy',
                  'Yenna Umali',
                  'Aj Huelar',
                  'Judeah Francisco',
                  'Ynony Lamsen',
                  'Daphney Molina',
                  'Lucille Caiña',
                  'Hannah Encarnacion',
                  'Zianne Lacza',
                  'Yesha Oliveros',
                  'Audrey Javier',
                  'Marc Lester Perater',
                  'Juliana Galban',
                  'Francine Clavillas',
                  'Mariella Galban',
                  'Princess Lomboy'
                ].map((name, index) => (
                  <div key={index} className="font-poppins" style={{ color: '#B76E79', fontSize: '14px' }}>
                    {index + 1}. {name}
                  </div>
                ))}
              </div>
            </div>

            {/* Shots */}
            <div className="col-span-2 flex flex-col items-center w-full" style={{ marginBottom: '6rem' }}>
              <h3 className="text-xl sm:text-2xl font-lovelyhome mb-6 text-center relative" style={{ color: '#4b2259', width: 'fit-content', margin: '0 auto' }}>
                Shots
                <img 
                  src="/assets/images/graphics/butterfly-half-left.png" 
                  alt="Butterfly" 
                  className="absolute top-0 right-0 z-10"
                  style={{ 
                    width: 'min(7vw, 70px)',
                    height: 'auto',
                    transform: 'translate(80%, -50%)'
                  }}
                />
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 text-left" style={{ maxWidth: '600px' }}>
                {[
                  'Ara Lomboy',
                  'Ronalyn Mendoza',
                  'Blanchie Vito',
                  'Tito Jayson Lagaya',
                  'Tito Erwin Lagaya',
                  'Tito Alvin Lagaya',
                  'Justine Ante',
                  'Zyrus Simbajon',
                  'Aviel Martinez',
                  'Jorosh Tiratira',
                  'Garette Honora',
                  'Ynomy Lamsen',
                  'Yesha Oliveros',
                  'Lance Lagaya',
                  'Mariella Galban',
                  'Princess Lomboy',
                  'Audrey Javier',
                  'Criz Bayani'
                ].map((name, index) => (
                  <div key={index} className="font-poppins" style={{ color: '#B76E79', fontSize: '14px' }}>
                    {index + 1}. {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Design */}
      <img 
        src="/assets/images/graphics/bottom-design.png" 
        alt="Bottom design" 
        className="absolute bottom-0 left-0 z-30"
        style={{ width: '100%' }}
      />
    </section>
  )
}

export default EighteenList

