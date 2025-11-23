# 🚀 Deployment Guide

This guide will help you deploy your wedding invitation system to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] All client photos added to `public/images/`
- [ ] Configuration updated in `src/config/weddingConfig.js`
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Checked that all components render correctly

## 🏗️ Building for Production

```bash
# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Preview the build locally
npm run preview
```

The built files will be in the `dist` folder.

## 🌐 Deployment Options

### 1. Netlify (Recommended for Beginners)

#### Automatic Deployment
1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (or your project's version)

3. **Deploy**
   - Netlify will automatically build and deploy
   - Your site will be available at a random URL
   - You can customize the domain later

#### Manual Deployment
1. **Build locally**
   ```bash
   npm run build
   ```

2. **Drag and Drop**
   - Go to Netlify dashboard
   - Drag the `dist` folder to the deploy area
   - Your site will be live instantly

### 2. Vercel

#### Automatic Deployment
1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Deploy**
   - Vercel will automatically detect and deploy
   - Get a preview URL instantly

### 3. GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

### 4. Traditional Web Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload all contents of the `dist` folder
   - Upload to your web server's public directory

3. **Configure server**
   - Ensure `.htaccess` (Apache) or `nginx.conf` (Nginx) is configured
   - Set up proper MIME types for JavaScript files

## 🔧 Server Configuration

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🌍 Domain Configuration

### Custom Domain Setup
1. **Purchase domain** from your preferred registrar
2. **Configure DNS** to point to your hosting provider
3. **Set up SSL certificate** (most providers do this automatically)
4. **Update configuration** if needed

### SSL/HTTPS
- Most modern hosting providers provide free SSL certificates
- Ensure your site is accessible via HTTPS
- Update any hardcoded HTTP URLs to HTTPS

## 📱 Mobile Optimization

### Testing
- Test on various devices and screen sizes
- Use browser dev tools to simulate mobile devices
- Check loading times on slower connections

### Performance
- Optimize images (compress, use WebP when possible)
- Minimize JavaScript bundle size
- Enable gzip compression on your server

## 🔍 Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly on all devices
- [ ] All images display properly
- [ ] RSVP form works (if backend is configured)
- [ ] Navigation works correctly
- [ ] Social media links function
- [ ] Site is accessible via HTTPS
- [ ] Loading times are acceptable
- [ ] SEO meta tags are present

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+
```

#### Deployment Issues
- Ensure build command is correct
- Check publish directory matches your build output
- Verify all dependencies are in package.json

#### Runtime Errors
- Check browser console for JavaScript errors
- Verify all image paths are correct
- Ensure configuration file is properly formatted

### Performance Issues
- Optimize images
- Enable server-side caching
- Use CDN for static assets
- Minimize bundle size

## 📊 Analytics & Monitoring

### Google Analytics
1. Create a Google Analytics account
2. Add tracking code to your HTML
3. Monitor visitor behavior and performance

### Performance Monitoring
- Use tools like Lighthouse, PageSpeed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring

## 🔄 Continuous Deployment

### Automated Workflows
- Set up GitHub Actions for automatic deployment
- Configure webhooks for instant updates
- Use staging environments for testing

### Environment Variables
```bash
# Production
NODE_ENV=production
VITE_API_URL=https://your-api.com

# Development
NODE_ENV=development
VITE_API_URL=http://localhost:3000
```

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify your configuration file
3. Test locally before deploying
4. Check hosting provider documentation
5. Review this deployment guide

---

**Happy Deploying! 🎉**

Your wedding invitation will be live on the web for all your guests to enjoy. 