# CLAUDE.md — tomallen.com.au

## Project overview

Personal portfolio website for Tom Allen — a hub-and-spoke ecosystem connecting multiple ventures: wedding celebrancy, writing (via Substack), past project portfolio ("Enterprises"), and emerging ideas ("What's Brewing"). Built with Astro, hosted on Vercel, domain managed through VentraIP.

## Architecture

- **Framework:** Astro (static site generation)
- **Hosting:** Vercel (auto-deploys from GitHub on push)
- **GitHub:** `allen-tom-c/tomallen.com.au`
- **Domain:** tomallen.com.au (primary), tomallen.au (redirect), tomallencelebrant.com (page-level redirects to matching celebrant pages)
- **vercel.json:** Page-level redirects for tomallencelebrant.com — `/about` → `/about/`, `/contact-me` → `/celebrant/enquire/`, `/faq` → `/celebrant/faq/`, `/how-i-work` → `/celebrant/how-i-work/`, `/food-for-thought` → `/celebrant/how-i-work/`, `/pricing-and-faq` → `/celebrant/pricing/`, `/other-services` → `/celebrant/mc-and-ceremonies/` (301), root `/` → `/celebrant/`, catch-all `/:path*` → `/celebrant/:path*`. www subdomain also handled.
- **DNS:** VentraIP — using Vercel's nameservers (ns1/ns2.vercel-dns.com), not individual DNS records
- **SSL:** Provided automatically by Vercel — no paid certificate needed
- **Forms:** Formspree — celebrant enquiry (`xgoljrve`) and KBS EOI (`xkovlkgo`), both forwarding to allen.tom.c@gmail.com
- **Blog:** Substack integration via RSS feed — the Writing section pulls posts automatically
- **Content workflow:** Write in Notion → export Markdown → drop into project

## Site sections

```
/                         → Hub home page (full-bleed hero + 2×2 section cards)
/about                    → Single About page (lives on hub, not duplicated across sections)
/celebrant                → Wedding celebrant section (has its own sub-navigation)
/celebrant/pricing        → 4 tiers: Elopements, Simple, Crafted, Extras
/celebrant/how-i-work     → 5 steps with circular photo icons
/celebrant/about          → Celebrant-styled duplicate of /about — same content, cel-* variables, CelebrantFooter, CTA → /celebrant/enquire/
/celebrant/mc-and-ceremonies → MC, baby namings, funerals, memorial services, rites of passage
/celebrant/faq            → Accordion-style FAQ with internal links to pricing/how-i-work
/celebrant/gallery        → Photo carousel (10 slides, images in public/images/celebrant/gallery/)
/celebrant/enquire        → Enquiry form (Formspree xgoljrve)
/work/                    → Past projects: Good Cycles, Bellarine Fungi, Aboriginal co-op, The Farm Next Door
/brewing/                 → Emerging ideas: Ecstatic Dance, Children's Theatre, Kids' Business School
/brewing/kids-business-school → Dedicated KBS page with EOI form (Formspree xkovlkgo)
/writing                  → Substack RSS feed integration with subscribe widget
/hero-options             → Photo preview page (noindex) — for feedback on home hero options
```

## Current design system

### Celebrant section colour scheme
- Background: pale blue `#EEF4FF` (`--cel-bg`)
- Text: deep navy `#1E3A5F` (`--cel-text`)
- Accent (buttons, labels, links, CTAs): hot pink `#DB2777` (`--cel-accent`)
- Secondary text: muted slate
- Overlays: clean white text on semi-transparent gradients (not warm cream)

### Typography
- **Headings and body text** (site-wide): Source Serif 4
- **UI elements** (nav links, labels, tags, buttons): DM Sans
- **Small metadata** (timeline dates, project durations): Space Mono

### Layout decisions
- Hub grid: `repeat(2, 1fr)` — always 2×2 on desktop, single column below 560px
- All four home page cards use the writing palette (`--wri-*` variables) — `#FAFAFA` background, `#1A1A2E` text/accent, `#7A7A8A` subtle
- What's Brewing card has a dashed border (signals it's still forming), same size as others
- Celebrant hero: full viewport height (`100vh`), `object-position: center 70%`
- How I Work banner: `500px` height, `object-position: 65% 25%`
- Celebrant pricing banner: `500px` height, image `bouquet.jpg`
- Both navs have hamburger menus for mobile
- Home page hero: full-bleed `calc(100vh - 80px)`, `background-position: center 35%`, photo `hero-e.jpg`

### Work page (`/work/`) — accordion layout
- Each project card has a cover image (260px height) + expand/collapse toggle revealing a photo gallery + text
- Project order: Bellarine Fungi → Worn Gundidj → Good Cycles → Farm Next Door
- Data array per project: `id`, `cover`, `coverAlt`, `coverPosition`, `gallery[]` (each with `src`, `alt`, optional `tall: true`, optional `position`), `desc`, `skills`
- Gallery grid: `grid-template-columns: repeat(3, 1fr); grid-auto-rows: 180px` — portrait images use `tall: true` → `grid-row: span 2`
- Accordion uses CSS `grid-template-rows: 0fr → 1fr` transition; JS toggles `.open` class and `aria-expanded`
- fungi cover: `coverPosition: "top"` (faces at very top of portrait image)
- fungi video: Little Food Festival highlights reel YouTube Short (`xBDGmaTUieA`), shown in expanded detail after description, before gallery. Max-width 260px, aspect-ratio 9/16.
- worn-gundidj gallery-2: `position: "center 25%"` (cherry picker)

### Celebrant About page (`/celebrant/about/`) — layout
- Full duplicate of `/about/` content, styled with `--cel-*` variables throughout
- Nav key: `about` in CelebrantNav — sits after Gallery
- CelebrantNav points to `/celebrant/about/` (not `/about/`)
- CTA links to `/celebrant/enquire/` with celebrant-appropriate copy
- Includes the "Fungi Come From Spores" YouTube Short and Seal Prince caption/link
- Hub Nav.astro: "About" added to navLinks array (visible on all hub sections); active when `hubSubPage === 'about'` or `section === 'about'`

### MC & Other Ceremonies page (`/celebrant/mc-and-ceremonies/`) — layout
- Banner: 340px height, `gallery-5.webp`, `object-position: center 15%`, warm dark overlay gradient
- Intro paragraph (max-width 600px) followed by service list: Reception MC, Event MC, Funerals & Memorial Services, Rites of Passage, Baby Namings
- Each service: h2 + paragraph, separated by faint pink-tinted border; last item has no border
- CTA block at bottom: centred, faint accent background, links to `/celebrant/enquire/`
- Nav key: `mcAndCeremonies` — "MC & More" sits between "How I Work" and "FAQ" in CelebrantNav

### Gallery page (`/celebrant/gallery/`) — carousel layout
- Full-width carousel with prev/next buttons, keyboard arrows, and touch/swipe support
- Counter badge bottom-right showing current slide / total
- Photos array at top of file — edit to add/reorder images
- Images live in `public/images/celebrant/gallery/`, named `01.webp` through `10.webp`
- Nav key: `gallery` — sits between "FAQ" and "About" in CelebrantNav
- CTA at bottom links to `/celebrant/enquire/`

### Brewing page (`/brewing/`) — cover images
- Each idea card has `.idea-cover { height: 240px }` above `.idea-body` wrapper; `padding: 0; overflow: hidden` on the card
- KBS card renders as `<a>` (links to `/brewing/kids-business-school`), others are `<div>`
- Hover: subtle cover image zoom (scale 1.02) on linked cards only

### About page (`/about/` and `/celebrant/about/`) — alternating editorial layout
- Row 1 (240px | 1fr): headshot | "About Tom" h1 + intro paragraph
- Full width: "When people ask..." paragraph + centred bullet list (list-style: none, text-align: center)
- Row 2 flipped (1fr | 240px): two paragraphs | about-2.jpg
- Full width: mushroom farmer + celebrant paragraphs
- Row 3 (240px | 1fr): about-3.jpg | "The thread" h2 + first Thread paragraph
- Full width: "To create and hold space..." + remaining Thread paragraphs + kicker + Timeline + CTA
- Missing images collapse gracefully via `onerror="this.closest('.about-col').style.display='none'"`
- Bullet list links: Mushroom farmer → bellarinefungi.com.au, Writer → allentomc.wordpress.com (update to Substack when content is ready)
- Video: "Fungi Come From Spores" YouTube Short (`gDtLRcp_w_s`), centred, max-width 280px, aspect-ratio 9/16. Caption links "Seal Prince" to https://www.instagram.com/sealprinsta/
- When editing about content, update BOTH `/about/` and `/celebrant/about/` to keep them in sync

### Home page hero
- Full-bleed background image (`hero-e.jpg` — beach/landscape, landscape orientation)
- Text sits top-left with `align-items: flex-start`
- Gradient overlay: `rgba(0,0,0,0.45)` at top fading to transparent at 75%
- "Darwin, Northern Territory" label and intro paragraph use `box-decoration-break: clone` inline highlight (`rgba(0,0,0,0.48)`) for legibility over the photo
- Title uses `text-shadow` only (large enough without highlight)
- Intro font-weight bumped to 400 (300 disappears on textured backgrounds)
- `/hero-options` page exists with all 5 candidate photos (hero-a through hero-e) for ongoing feedback

### Font loading
- Google Fonts import in `global.css` loads: Source Serif 4 (ital, 300/400/600), DM Sans (ital, 300/400/500/600), Space Mono (400/700)
- Cormorant and Fraunces are no longer loaded — do not re-add them

### Images
- All images are converted to WebP format and compressed for performance
- `<img>` tags use `loading="lazy"` (except above-the-fold images which use `loading="eager"`)
- `work/fungi/gallery-3.webp` needs rotation fix — currently displays sideways

### Forms pattern
- Formspree handles all form submissions (no server-side code needed on Vercel)
- Forms use `fetch` + `Accept: application/json` header for AJAX submission — no page redirect
- On success: heading/intro and form are hidden via JS, inline success message shown
- `box-decoration-break: clone` technique used for per-line text highlights on photo backgrounds

## Key design rules

- **No emojis.** Never use emojis or unicode decorative symbols anywhere on the site.
- **No AI tells.** Avoid: unattributed inspirational quotes, overly symmetrical value prop grids, identical section rhythms, overuse of small-caps labels, checkmark lists. Use em dashes for feature lists.
- **All body text is written by Tom.** Use `[Tom to write: description]` for any missing content. Never generate placeholder marketing copy.
- **Don't overcorrect.** When Tom flags something, fix the specific issue. Don't introduce deliberate imperfections or asymmetry to "look less AI" — that's worse than the original problem.
- **External org links open in new tab** (Good Cycles, Bellarine Fungi, Worn Gundidj, Tearfund).
- **Nav label for /work/ is "Enterprises"** (not "The Work"). Home card heading is "Enterprise Propagator".

## SEO (implemented)

- `@astrojs/sitemap` generating sitemap-index.xml
- `robots.txt` pointing to sitemap
- JSON-LD structured data: Person (hub), LocalBusiness (celebrant), FAQPage (FAQ)
- Open Graph tags in BaseLayout
- Descriptive alt text on all gallery images
- Internal cross-links between sections (about page links to celebrant, FAQ links to pricing/how-i-work)
- Celebrant page targets "marriage celebrant Darwin" and related local terms

## Contact details

- **Email:** allen.tom.c@gmail.com (NOT tom@tomallen.com.au — no email hosting set up)
- **Phone:** 0421 102 154
- **Location:** Darwin, NT
- **LGBTQ ally badge** displayed in celebrant footer

## Coding patterns

- Astro components (.astro files) with scoped `<style>` blocks
- CSS custom properties for theming (e.g. `--cel-accent`, `--cel-bg`, `--cel-text`)
- When changing colours, check for hardcoded values in gradients and overlays too — not just CSS variables
- Avoid duplicate CSS property declarations (caused a bug where two `min-height` values on the hero meant the second overrode the first)
- Semantic HTML throughout
- Image paths relative to `public/images/`
- For full-bleed hero backgrounds use CSS `background-image` on the section (not `<img>` with `position: absolute`) — more reliable across browsers
- For text legibility over photos: combine a gradient overlay on the section + `box-decoration-break: clone` inline highlight on individual text elements

## File structure

```
public/
  images/
    about/        → headshot.webp, about-2.webp, about-3.webp
    celebrant/    → hero.webp, bouquet.webp, how-i-work.webp, gallery-1..5.webp, step-01..05.webp
      gallery/    → 01.webp through 10.webp (carousel photos for /celebrant/gallery/)
    work/
      fungi/      → cover.webp, gallery-1..5.webp (gallery-3 is portrait — tall:true in data; NEEDS ROTATION FIX)
      worn-gundidj/ → cover.webp, gallery-1..3.webp
      good-cycles/  → cover.webp
      farm/       → cover.webp, gallery-1..7.webp (gallery-5 excluded from code as weakest)
    brewing/
      kbs/        → cover.webp
      ecstatic-dance/ → cover.webp
      childrens-theatre/ → cover.webp
    hero-a.webp through hero-e.webp  → home hero candidates (hero-e.webp is live)
  favicon.svg
  robots.txt
src/
  layouts/        → BaseLayout.astro (includes OG tags, JSON-LD)
  pages/          → All routes
    celebrant/    → about.astro, mc-and-ceremonies.astro
    brewing/      → kids-business-school.astro
    hero-options.astro  → photo feedback preview (noindex)
  components/     → Nav.astro, CelebrantNav.astro, Footer.astro
```

## Commands

```bash
npm install       # Install dependencies (first time only)
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build locally
git add . && git commit -m "description" && git push   # Deploy (Vercel auto-builds)
```

## Working with Tom

- **Mac user, basic Terminal comfort.** Explain commands clearly. He sometimes runs commands from `~` instead of the project directory — remind him to `cd` first if needed.
- **Uses Notion** for writing and planning. Content structured in "tomallen.com.au — Site Content" workspace.
- **Prefers to preview changes** before deploying — always start dev server and give him the localhost URL.
- **Browser caching causes confusion.** When CSS changes don't appear, suggest Cmd+Shift+R or an incognito window before debugging further.
- **npm permission issues** on his Mac are common. Fix with `sudo chown -R $(whoami) ~/.npm` — but Claude Code can't run sudo, so instruct Tom to run it himself.
- **Values authenticity.** Dislikes anything that feels templated, corporate, or AI-generated. His best celebrant clients are the ones drawn to the full picture of who he is.
- **Visual previews help.** When comparing design options (like fonts or photos), build a dedicated preview page at localhost rather than describing options in text. For photos, `hero-options.astro` is the established pattern.

## Tom's background (for tone context)

Based in Darwin, NT. Wedding celebrant, writer (Substack + poetry/essays), and someone who embeds in organisations to build capacity — not a consultant who advises from outside. Past work: social enterprise bike shop with youth programs (Good Cycles, Geelong), mushroom farm (Bellarine Fungi), grant-funded programs at an Aboriginal co-operative (Worn Gundidj). His framing: "I listen and learn, and build the capacity your organisation most needs." The unifying thread: building structures that transform people, places, and materials.

## Session protocol

At the end of every session where code changes are made, update this CLAUDE.md file to reflect any changes to: site structure, routes, design system, colour schemes, typography, file structure, coding patterns, or key decisions. Commit the updated CLAUDE.md as part of the final push.
