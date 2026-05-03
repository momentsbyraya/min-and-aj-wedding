import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import {
  FiMenu,
  FiX,
  FiHeart,
  FiCalendar,
  FiCamera,
  FiMail,
  FiMapPin
} from 'react-icons/fi'
import RSVPModal from './RSVPModal'
import { celebrant } from '../data'
import { theme } from '../data'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const logoRef = useRef(null)
  const navItemsRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const navItems = [
    { name: 'Home', href: '#home', icon: FiHeart },
    { name: 'Details', href: '#details', icon: FiCalendar },
    { name: 'Gallery', href: '/gallery', icon: FiCamera },
    { name: 'Map', href: '#map', icon: FiMapPin },
    { name: 'RSVP', href: '#rsvp', icon: FiMail, action: 'rsvp' }
  ]

  useEffect(() => {
    // Logo entrance animation
    gsap.fromTo(logoRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    )

    // Nav items entrance animation
    gsap.fromTo(navItemsRef.current.children, 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1, delay: 0.3 }
    )

    // Heartbeat animation
    gsap.to(".nav-heart", {
      scale: 1.1,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })
  }, [])

  const scrollToSection = (href, action) => {
    if (action === 'rsvp') {
      setIsRSVPModalOpen(true)
      setIsOpen(false)
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setIsOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
    
    if (!isOpen) {
      // Open mobile menu with animation
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      // Close mobile menu with animation
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-wedding-200">
        <div className={`${theme.container.maxWidth} ${theme.container.center} ${theme.container.padding}`}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center space-x-2">
              <FiHeart className="h-8 w-8 text-rose-500 nav-heart" />
              <span className="text-xl font-serif font-semibold text-wedding-800">
                {celebrant.debutant.name.full}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div ref={navItemsRef} className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href, item.action)}
                    className="flex items-center space-x-2 text-wedding-700 hover:text-rose-500 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-wedding-700 hover:text-rose-500 hover:bg-wedding-100 transition-colors duration-200"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            ref={mobileMenuRef}
            className="md:hidden overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href, item.action)}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-left text-wedding-700 hover:text-rose-500 hover:bg-wedding-100 rounded-md transition-all duration-200 hover:translate-x-2"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* RSVP Modal */}
      <RSVPModal 
        isOpen={isRSVPModalOpen} 
        onClose={() => setIsRSVPModalOpen(false)} 
      />
    </>
  )
}

export default Navigation 