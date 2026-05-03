import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const useGSAPScroll = () => {
  const elementRef = useRef(null)

  const fadeInUp = (delay = 0, duration = 1) => {
    return {
      y: 50,
      opacity: 0,
      duration,
      delay,
      ease: "power2.out"
    }
  }

  const fadeInLeft = (delay = 0, duration = 1) => {
    return {
      x: -50,
      opacity: 0,
      duration,
      delay,
      ease: "power2.out"
    }
  }

  const fadeInRight = (delay = 0, duration = 1) => {
    return {
      x: 50,
      opacity: 0,
      duration,
      delay,
      ease: "power2.out"
    }
  }

  const scaleIn = (delay = 0, duration = 1) => {
    return {
      scale: 0.8,
      opacity: 0,
      duration,
      delay,
      ease: "back.out(1.7)"
    }
  }

  const slideInFromBottom = (delay = 0, duration = 1) => {
    return {
      y: 100,
      opacity: 0,
      duration,
      delay,
      ease: "power3.out"
    }
  }

  const staggerChildren = (stagger = 0.1, delay = 0) => {
    return {
      stagger,
      delay,
      ease: "power2.out"
    }
  }

  const createScrollAnimation = (animation, trigger = "top 80%") => {
    return gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: trigger,
        toggleActions: "play none none reverse"
      }
    }).fromTo(elementRef.current, animation, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1
    })
  }

  const createStaggerAnimation = (children, animation, stagger = 0.1, trigger = "top 80%") => {
    return gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: trigger,
        toggleActions: "play none none reverse"
      }
    }).fromTo(children, animation, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      stagger
    })
  }

  const createParallaxEffect = (speed = 0.5) => {
    return gsap.to(elementRef.current, {
      y: `${speed * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }

  const createPinEffect = (pinSpacing = true) => {
    return ScrollTrigger.create({
      trigger: elementRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing
    })
  }

  const createTextReveal = (delay = 0) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }).fromTo(elementRef.current, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out"
    })
  }

  const createCounterAnimation = (endValue, duration = 2, delay = 0) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }).fromTo(elementRef.current, {
      innerHTML: 0
    }, {
      innerHTML: endValue,
      duration,
      delay,
      ease: "power2.out",
      snap: { innerHTML: 1 }
    })
  }

  // Cleanup function
  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  useEffect(() => {
    return cleanup
  }, [])

  return {
    elementRef,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    slideInFromBottom,
    staggerChildren,
    createScrollAnimation,
    createStaggerAnimation,
    createParallaxEffect,
    createPinEffect,
    createTextReveal,
    createCounterAnimation,
    cleanup
  }
} 