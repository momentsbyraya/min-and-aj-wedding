# 💒 Digital Wedding Invitation System

A beautiful, scalable React-based digital wedding invitation system built with modern web technologies. Perfect for creating personalized wedding invitations for different clients with minimal code changes.

## ✨ Features

- **🎨 Elegant Design**: Beautiful, responsive wedding invitation design
- **📱 Mobile-First**: Optimized for all devices and screen sizes
- **⚡ Fast Performance**: Built with Vite and React 18 for optimal performance
- **🎭 Smooth Animations**: Framer Motion animations for delightful user experience
- **🎨 Customizable**: Easy to customize for different clients
- **📸 Photo Gallery**: Interactive photo gallery with modal view
- **📝 RSVP System**: Comprehensive RSVP form with validation
- **🔄 Scalable**: Component-based architecture for easy maintenance
- **🚀 Production Ready**: Optimized for deployment

## 🛠️ Tech Stack

- **Frontend**: React 18 + JavaScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Date Handling**: date-fns
- **Print Support**: react-to-print
- **Social Sharing**: react-share

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wedding-invitation-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🎨 Customization Guide

### For New Clients

The system is designed to be easily customizable for different clients. Simply update the configuration file:

1. **Edit `src/config/weddingConfig.js`**
   - Update couple names
   - Change wedding date and time
   - Modify venue information
   - Update RSVP details
   - Change photos and styling

2. **Update Photos**
   - Replace images in the `public/images/` folder
   - Update photo paths in the config file

3. **Customize Colors & Theme**
   - Modify the `theme` section in the config
   - Update Tailwind color classes in components

### Configuration Options

```javascript
// Example configuration structure
export const weddingConfig = {
  couple: {
    bride: { firstName: "Sarah", lastName: "Johnson" },
    groom: { firstName: "Michael", lastName: "Williams" }
  },
  wedding: {
    date: "2024-06-15",
    time: "4:00 PM"
  },
  venue: {
    ceremony: { name: "St. Mary's Cathedral", address: "..." },
    reception: { name: "The Grand Ballroom", address: "..." }
  },
  rsvp: {
    deadline: "2024-05-15",
    email: "rsvp@example.com"
  },
  theme: {
    primaryColor: "wedding-600",
    style: "elegant"
  }
}
```

### Adding New Templates

1. **Create new theme components** in `src/components/themes/`
2. **Update the theme selector** in the main components
3. **Add new color schemes** to `tailwind.config.js`

## 📁 Project Structure

```
wedding-invitation-system/
├── public/
│   └── images/           # Client photos
├── src/
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── CoupleNames.jsx
│   │   ├── WeddingDetails.jsx
│   │   ├── VenueInfo.jsx
│   │   ├── RSVPSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   ├── RSVPForm.jsx
│   │   └── Gallery.jsx
│   ├── config/
│   │   └── weddingConfig.js  # Client configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Components

### Main Invitation (`WeddingInvitation.jsx`)
- Orchestrates all invitation sections
- Manages countdown timer
- Handles smooth scrolling

### Configuration (`weddingConfig.js`)
- Centralized client data
- Easy to modify for new clients
- Helper functions for date formatting

### RSVP System (`RSVPForm.jsx`)
- Comprehensive guest response form
- Form validation
- Success handling

### Photo Gallery (`Gallery.jsx`)
- Interactive photo grid
- Modal view with navigation
- Responsive layout

## 🚀 Deployment

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder contents to your web server

## 🔧 Customization Examples

### Changing Colors
```javascript
// In weddingConfig.js
theme: {
  primaryColor: "blue-600",    // Change from wedding-600
  secondaryColor: "purple-400", // Change from rose-400
  accentColor: "yellow-500"     // Change from gold-500
}
```

### Adding New Sections
```javascript
// Create new component
// Add to WeddingInvitation.jsx
// Update navigation if needed
```

### Modifying Animations
```javascript
// In component files, adjust Framer Motion props
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
```

## 📱 Responsive Design

The system is built with a mobile-first approach:
- **Mobile**: Optimized for small screens
- **Tablet**: Responsive grid layouts
- **Desktop**: Full-featured experience
- **Print**: Print-friendly styles

## 🎨 Design System

### Color Palette
- **Primary**: Wedding theme colors (beige, cream)
- **Secondary**: Rose colors (pink, red)
- **Accent**: Gold colors (yellow, amber)
- **Neutral**: Gray scale for text

### Typography
- **Script**: Great Vibes for elegant headings
- **Serif**: Playfair Display for titles
- **Sans**: Inter for body text

### Spacing
- Consistent spacing scale using Tailwind's spacing system
- Responsive margins and padding

## 🔒 Security Considerations

- Form validation on client and server side
- Sanitize user inputs
- HTTPS for production deployments
- Rate limiting for RSVP submissions

## 📊 Performance Optimization

- Lazy loading for images
- Optimized bundle size with Vite
- Efficient React rendering
- CSS optimization with Tailwind

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build test
npm run build

# Preview build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Check the configuration examples
- Review the component structure
- Ensure all dependencies are installed
- Check browser console for errors

## 🎉 Success Stories

This system has been used to create beautiful invitations for:
- Traditional church weddings
- Modern outdoor ceremonies
- Destination weddings
- Intimate gatherings
- Large celebrations

---

**Made with ❤️ for couples celebrating their special day**

*Built with React, Tailwind CSS, and lots of love* 