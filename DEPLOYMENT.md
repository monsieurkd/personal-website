# Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/personal-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" (no configuration needed!)

## Alternative Deployment Options

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Or connect your GitHub repo to Netlify

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/personal-website"`
3. Add script: `"deploy": "gh-pages -d out"`
4. Run: `npm run build && npm run deploy`

### Custom Server

1. Build: `npm run build`
2. Start: `npm start`
3. Your site will be available on port 3000

## Environment Variables

If you add any environment variables, create a `.env.local` file:

```
NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
```

## Performance Tips

- All images are automatically optimized by Next.js
- The site is already configured for optimal performance
- Enable gzip compression on your server
- Use a CDN for static assets if needed

## Custom Domain

After deploying to Vercel:

1. Go to your project dashboard
2. Click "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

---

Your website is now ready for the world! 🚀
