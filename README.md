# tomallen.com.au

Personal portfolio site for Tom Allen — celebrant, writer, enterprise builder.

Built with [Astro](https://astro.build).

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding Your Photos

Drop your images into the `public/images/` folders:

### About
- `public/images/about/headshot.jpg` — your portrait photo

### Celebrant
- `public/images/celebrant/hero.jpg` — the big hero image (Zoe & Will photo)
- `public/images/celebrant/bouquet.jpg` — pricing page banner
- `public/images/celebrant/how-i-work.jpg` — driving the jag photo
- `public/images/celebrant/gallery-1.jpg` through `gallery-5.jpg` — the masonry grid
- `public/images/celebrant/step-01.jpg` through `step-05.jpg` — How I Work circular photos

**Tip:** For best performance, resize images before adding:
- Hero images: 1920px wide max
- Gallery images: 800px wide max  
- Step photos: 400px wide max (they display at 120px)
- Use `.jpg` or `.webp` format

## Deploying to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Import Project" and select your repo
4. Vercel auto-detects Astro — just click "Deploy"
5. Your site will be live at a `.vercel.app` URL

### Connecting your domain

1. In Vercel dashboard → your project → Settings → Domains
2. Add `tomallen.com.au`
3. Vercel will show you DNS records to add
4. In VentraIP → DNS settings for tomallen.com.au:
   - Add an A record pointing to `76.76.21.21`
   - Add a CNAME record: `www` → `cname.vercel-dns.com`
5. For `tomallen.au`: add the same records, or set up a redirect in VentraIP to tomallen.com.au

### Connecting tomallencelebrant.com (later)

Once the site is established and Google has indexed it:
1. In your domain registrar for tomallencelebrant.com, set up a redirect to `tomallen.com.au/celebrant/`
2. Or add it as another domain in Vercel and configure a redirect

## Forms

The enquiry form uses Netlify Forms by default (the `data-netlify="true"` attribute).

**If deploying to Vercel instead of Netlify**, replace the form with one of:
- [Formspree](https://formspree.io) — change the form `action` to your Formspree endpoint
- [Formspark](https://formspark.io)
- A simple Vercel serverless function

## Writing / Substack

The writing page fetches your Substack RSS feed at build time. Posts will appear automatically after you publish on Substack and rebuild the site.

To show new posts, either:
- Redeploy on Vercel (takes ~30 seconds)
- Set up a webhook: Substack doesn't support webhooks natively, but you can set a daily cron rebuild in Vercel

Your Substack URL: https://substack.com/@tomcraigallen

## Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro        # HTML shell, meta tags, fade-in script
├── components/
│   ├── Nav.astro               # Top navigation
│   ├── CelebrantNav.astro      # Celebrant section sub-nav
│   ├── CelebrantFooter.astro   # Celebrant cross-links footer
│   └── CrossLinks.astro        # "Also from Tom" footer links
├── pages/
│   ├── index.astro             # Hub home (/)
│   ├── about.astro             # About page (/about/)
│   ├── writing.astro           # Writing + Substack (/writing/)
│   ├── work.astro              # The Work portfolio (/work/)
│   ├── brewing.astro           # What's Brewing (/brewing/)
│   └── celebrant/
│       ├── index.astro         # Celebrant home (/celebrant/)
│       ├── pricing.astro       # Pricing (/celebrant/pricing/)
│       ├── how-i-work.astro    # How I Work (/celebrant/how-i-work/)
│       ├── faq.astro           # FAQ (/celebrant/faq/)
│       └── enquire.astro       # Enquiry form (/celebrant/enquire/)
└── styles/
    └── global.css              # Design tokens, typography, utilities
```
