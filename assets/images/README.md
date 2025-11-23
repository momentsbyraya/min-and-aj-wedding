# 📸 Images Folder

This folder contains all the images used in the wedding invitation. Replace the placeholder images with your actual wedding photos.

## 📁 Required Images

### Hero Image
- **File**: `hero-couple.jpg`
- **Size**: Recommended 1200x800px or larger
- **Format**: JPG, PNG, or WebP
- **Description**: Main couple photo displayed prominently on the invitation

### Gallery Images
- **Files**: `couple-1.jpg`, `couple-2.jpg`, `couple-3.jpg`, `couple-4.jpg`
- **Size**: Recommended 800x800px or larger (square format works best)
- **Format**: JPG, PNG, or WebP
- **Description**: Additional photos displayed in the gallery section

### Background Pattern (Optional)
- **File**: `background-pattern.jpg`
- **Size**: Any size, will be tiled
- **Format**: JPG, PNG, or WebP
- **Description**: Subtle background pattern for the invitation

## 🎯 Image Guidelines

### Quality
- Use high-resolution images (at least 800px wide)
- Optimize for web (compress without losing quality)
- Maintain aspect ratios for consistent display

### Content
- **Hero**: Choose your best couple photo
- **Gallery**: Include variety (engagement, dating, special moments)
- **Style**: Ensure photos match your wedding theme/colors

### File Naming
- Use descriptive names
- Avoid spaces (use hyphens or underscores)
- Keep file sizes under 2MB for optimal loading

## 🔧 Adding Your Images

1. **Prepare your photos** according to the guidelines above
2. **Rename them** to match the expected filenames
3. **Place them** in this `public/images/` folder
4. **Update the configuration** in `src/config/weddingConfig.js` if you use different filenames

## 📱 Responsive Images

The system automatically handles:
- Different screen sizes
- Image optimization
- Lazy loading
- Fallback backgrounds

## 🎨 Customization

You can add more gallery images by:
1. Adding new image files to this folder
2. Updating the `gallery` array in `weddingConfig.js`
3. The system will automatically display them in the gallery

## 🚀 Performance Tips

- Compress images before uploading
- Use WebP format when possible
- Keep hero image under 500KB
- Keep gallery images under 300KB each

## 📋 Image Checklist

- [ ] Hero couple photo (`hero-couple.jpg`)
- [ ] Gallery photo 1 (`couple-1.jpg`)
- [ ] Gallery photo 2 (`couple-2.jpg`)
- [ ] Gallery photo 3 (`couple-3.jpg`)
- [ ] Gallery photo 4 (`couple-4.jpg`)
- [ ] Background pattern (optional)
- [ ] All images optimized for web
- [ ] Configuration file updated

---

**Note**: If you don't have photos ready yet, the system will display beautiful placeholder backgrounds until you add your images. 