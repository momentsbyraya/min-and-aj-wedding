import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Calendar, Users, CheckCircle } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

const RSVPForm = () => {
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const contactRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    numberOfGuests: 1,
    dietaryRestrictions: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Initial entrance animations - slide in from bottom
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    gsap.fromTo(formRef.current, 
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    )

    gsap.fromTo(contactRef.current, 
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
    )
  }, [])

  // Animate conditional sections when they appear - slide in from bottom
  useEffect(() => {
    if (formData.attending === 'Yes, I will attend') {
      gsap.fromTo(".guest-section, .dietary-section", 
        { opacity: 0, y: 40, height: 0 },
        { opacity: 1, y: 0, height: 'auto', duration: 0.6, ease: "power2.out", stagger: 0.15 }
      )
    }
  }, [formData.attending])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success message
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen wedding-gradient flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center card-shadow max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-wedding-800 mb-4">
            Thank You!
          </h2>
          <p className="text-wedding-600 mb-6">
            Your RSVP has been submitted successfully. We look forward to celebrating with you!
          </p>
          <div className="text-sm text-wedding-500">
            Redirecting to invitation...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen wedding-gradient py-8">
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-8"
          style={{ opacity: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-wedding-700 hover:text-rose-500 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Invitation</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-script text-wedding-800 mb-4">
            RSVP
          </h1>
          <p className="text-xl text-wedding-600 max-w-2xl mx-auto">
            We await your presence. Please let us know if you can attend our special day. We can't wait to celebrate with you!
          </p>
        </div>

        {/* RSVP Form */}
        <div
          ref={formRef}
          className="max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 card-shadow elegant-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-wedding-800 mb-4">Personal Information</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-wedding-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-wedding-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-wedding-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-wedding-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-wedding-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wedding-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-wedding-800 mb-4">Will you attend?</h3>
                
                <div className="space-y-3">
                  {['Yes, I will attend', 'No, I cannot attend', 'Maybe, I will let you know'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value={option}
                        checked={formData.attending === option}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-rose-500 border-wedding-300 focus:ring-rose-500"
                      />
                      <span className="text-wedding-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Guests */}
              {formData.attending === 'Yes, I will attend' && (
                <div className="space-y-4 guest-section">
                  <h3 className="text-xl font-serif text-wedding-800 mb-4">Guest Count</h3>
                  
                  <div>
                    <label htmlFor="numberOfGuests" className="block text-sm font-medium text-wedding-700 mb-2">
                      Number of Guests (including yourself)
                    </label>
                    <select
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wedding-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors duration-200"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Dietary Restrictions */}
              {formData.attending === 'Yes, I will attend' && (
                <div className="space-y-4 dietary-section">
                  <h3 className="text-xl font-serif text-wedding-800 mb-4">Special Requirements</h3>
                  
                  <div>
                    <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-wedding-700 mb-2">
                      Dietary Restrictions or Allergies
                    </label>
                    <textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-4 border border-wedding-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Any dietary restrictions, allergies, or special requirements..."
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-wedding-700 mb-2">
                  Message to the Couple (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-wedding-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Share your excitement, well wishes, or any other message..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit RSVP'
                  )}
                </button>
              </div>
            </form>
          </div>

                  {/* Contact Information */}
        <div
          ref={contactRef}
          className="mt-8 text-center"
          style={{ opacity: 0 }}
        >
            <p className="text-wedding-600 mb-4">
              Need help? Contact us directly:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-rose-500" />
                <a 
                  href={`mailto:${weddingConfig.rsvp.email}`}
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  {weddingConfig.rsvp.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-rose-500" />
                <a 
                  href={`tel:${weddingConfig.rsvp.phone}`}
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  {weddingConfig.rsvp.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RSVPForm 