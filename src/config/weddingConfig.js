// ========================================
// DEBUT INVITATION CONFIGURATION
// ========================================
// This file contains all the customizable content for the debut invitation
// Simply update the values below to create a new invitation for different clients

export const weddingConfig = {
  // Basic Debut Information
  debutant: {
    firstName: "Rhealyn",
    lastName: "",
    fullName: "Rhealyn",
    nickname: "Rhea",
    age: 18
  },

  // Debut Details
  debut: {
    date: "2026-06-20", // YYYY-MM-DD format
    time: "4:00 PM",
    dayOfWeek: "Saturday",
    month: "June",
    day: "20",
    year: "2026"
  },

  // Venue Information
  venue: {
    main: {
      name: "Churinga Eco-Resort",
      address: "Zone 2, National Highway",
      city: "San Antonio",
      state: "Tigaon",
      zip: "Camarines Sur",
      time: "4:00 PM",
      details: "Please arrive 30 minutes early"
    },
    reception: {
      name: "Churinga Eco-Resort",
      address: "",
      city: "",
      state: "",
      zip: "",
      time: "6:00 PM",
      details: "Casual/Semi-formal attire requested"
    }
  },

  // RSVP Information
  rsvp: {
    deadline: "2024-05-15",
    email: "rsvp@example.com",
    phone: "(555) 123-4567",
    website: "https://example.rsvp",
    message: "Please RSVP by May 15th, 2024"
  },

  // Theme and Styling
  theme: {
    primaryColor: "wedding-600",
    secondaryColor: "rose-400",
    accentColor: "gold-500",
    fontFamily: "serif",
    style: "elegant" // Options: elegant, modern, rustic, vintage
  },

  // Photos and Media
  photos: {
    hero: "/assets/images/hero-couple.jpg",
    gallery: [
      "/assets/images/couple-1.jpg",
      "/assets/images/couple-2.jpg",
      "/assets/images/couple-3.jpg",
      "/assets/images/couple-4.jpg"
    ],
    background: "/assets/images/background-pattern.jpg"
  },

  // Additional Information
  details: {
    hashtag: "#RhealynTurns18",
    website: "https://example.com",
    registry: "https://registry.example.com",
    message: "We're excited to celebrate this special milestone with you!",
    covidInfo: "We're following local health guidelines. Please stay home if you're feeling unwell."
  },

  // Social Media
  social: {
    instagram: "@example",
    facebook: "ExampleDebut",
    twitter: "@example"
  }
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get time remaining until debut
export const getTimeUntilDebut = () => {
  const debutDate = new Date(weddingConfig.debut.date);
  const now = new Date();
  const timeDiff = debutDate.getTime() - now.getTime();
  
  if (timeDiff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}; 