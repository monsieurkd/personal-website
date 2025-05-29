# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 15, React 19, and Tailwind CSS. Features a clean design, dark mode support, and full mobile responsiveness.

## 🌟 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark/light mode toggle with system preference detection
- **Performance Optimized**: Built with Next.js 15 for optimal performance
- **SEO Friendly**: Meta tags, sitemap, and robots.txt included
- **Blog System**: Integrated blog with dynamic routing
- **Contact Form**: Interactive contact form with validation
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔧 Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **Language**: JavaScript
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
personal-website/
├── app/
│   ├── components/          # Reusable components
│   │   ├── ContactForm.js
│   │   ├── Navigation.js
│   │   ├── ScrollToTop.js
│   │   └── ThemeToggle.js
│   ├── blog/               # Blog pages
│   │   ├── page.js         # Blog listing
│   │   └── [slug]/         # Dynamic blog posts
│   ├── contact/            # Contact page
│   ├── globals.css         # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Homepage
│   ├── loading.js         # Loading component
│   ├── not-found.js       # 404 page
│   ├── robots.js          # SEO robots
│   └── sitemap.js         # SEO sitemap
├── public/                # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Homepage (`app/page.js`)**:
   - Replace "Your Name" with your actual name
   - Update the typewriter text with your roles
   - Modify the about section with your information
   - Update skills and projects with your own

2. **Contact Information**:
   - Update email addresses
   - Add your social media links
   - Modify the contact form action

3. **SEO Settings (`app/layout.js`)**:
   - Update metadata title and description
   - Add your website URL

### Styling

The website uses Tailwind CSS for styling. You can customize:

- **Colors**: Modify the gradient colors in `tailwind.config.mjs`
- **Fonts**: Update font imports in `app/layout.js`
- **Animations**: Customize animations in `app/globals.css`

### Adding Blog Posts

1. Create a new file in `app/blog/[slug]/` with your blog post content
2. Update the blog listing in `app/blog/page.js`
3. Add the new post to the sitemap in `app/sitemap.js`

## 📱 Responsive Design

The website is fully responsive and tested on:

- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔍 SEO Features

- Meta tags with Open Graph support
- Automatic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Alt tags for images
- Proper heading hierarchy

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

```bash
npm run build
npm start
```

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Automatic image optimization with Next.js
- **Code Splitting**: Automatic code splitting for faster loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/personal-website](https://github.com/yourusername/personal-website)

---

**⭐ If you found this project helpful, please give it a star!**
