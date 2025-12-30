# Faisal Almasri - Portfolio

A modern, responsive portfolio website built with Next.js and Sanity CMS, showcasing computer vision and AI projects.

## 🚀 Features

- **Single-Page Application** with smooth scrolling
- **CMS-Driven Content** using Sanity for all data
- **Responsive Design** with dark mode support
- **Performance Optimized** with Next.js ISR
- **SEO Friendly** with meta tags and Open Graph
- **Security Headers** configured
- **Framer Motion Animations**

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Sanity account

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 18
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/     # Reusable React components
│   ├── lib/           # Utilities and API calls
│   │   ├── sanity.js  # Sanity client configuration
│   │   ├── queries.js # Data fetching functions
│   │   └── constants.js # Configuration constants
│   ├── pages/         # Next.js pages
│   └── styles/        # Global styles
├── public/            # Static assets
└── ...config files
```

## 🎨 Content Management

All content is managed through Sanity Studio at [sanity.io](https://www.sanity.io/)

Content types:
- Projects (with images/videos, technologies, links)
- Articles (external links)
- Experience (with automatic years calculation)
- Education
- Skills (with visual positioning)
- About/Personal information

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 🔒 Security

- Environment variables for sensitive data
- Security headers configured (CSP, X-Frame-Options, etc.)
- .gitignore protecting .env files
- No hardcoded credentials

## 📈 Performance

- Static generation with ISR (60s revalidate)
- Image optimization with Next.js Image
- Code splitting
- Lazy loading
- Optimized bundle size

## 🎯 SEO

- Meta tags configured
- Open Graph tags
- robots.txt
- Sitemap
- Semantic HTML

## 📧 Contact

- Email: falmasri.ai@gmail.com
- LinkedIn: [Faisal Almasri](https://www.linkedin.com/in/faisalalmasricv/)
- GitHub: [@falmasridev0](https://github.com/falmasridev0)

---

Built with ❤️ by Faisal Almasri
