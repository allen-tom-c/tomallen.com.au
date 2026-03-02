# CLAUDE.md — tomallen.com.au

## Project overview

Personal portfolio website for Tom Allen — a hub-and-spoke ecosystem connecting multiple ventures: wedding celebrancy, writing (via Substack), past project portfolio ("The Work"), and emerging ideas ("What's Brewing"). Built with Astro, hosted on Vercel, domain managed through VentraIP.

## Architecture

- **Framework:** Astro (static site generation)
- **Hosting:** Vercel (auto-deploys from GitHub on push)
- **GitHub:** `allen-tom-c/tomallen.com.au`
- **Domain:** tomallen.com.au (primary), tomallen.au (redirect), tomallencelebrant.com (redirects to /celebrant)
- **DNS:** VentraIP — using Vercel's nameservers (ns1/ns2.vercel-dns.com), not individual DNS records
- **SSL:** Provided automatically by Vercel — no paid certificate needed
- **Forms:** Formspree or similar — enquiry forms on celebrant and What's Brewing sections
- **Blog:** Substack integration via RSS feed — the Writing section pulls posts automatically
- **Content workflow:** Write in Notion → export Markdown → drop into project

## Site sections

```
/                   → Hub home page (portfolio life narrative, 2×2 section cards)
/about              → Single About page (lives on hub, not duplicated across sections)
/celebrant          → Wedding celebrant section (has its own sub-navigation)
/celebrant/pricing  → 4 tiers: Elopements, Simple, Crafted, Extras
/celebrant/how-i-work → 5 steps with circular photo icons
/celebrant/faq      → Accordion-style FAQ with internal links to pricing/how-i-work
/celebrant/enquire  → Enquiry form
/the-work           → Past projects: Good Cycles, Bellarine Fungi, Aboriginal co-op, The Farm Next Door
/whats-brewing      → Emerging ideas: Ecstatic Dance, Children's Theatre, Kids' Business School
/writing            → Substack RSS feed integration with subscribe widget
```

## Current design system

### Celebrant section colour scheme
- Background: pale blue `#EEF4FF` (`--cel-bg`)
- Text: deep navy `#1E3A5F` (`--cel-text`)
- Accent (buttons, labels, links, CTAs): hot pink `#DB2777` (`--cel-accent`)
- Secondary text: muted slate
- Overlays: clean white text on semi-transparent gradients (not warm cream)

### Typography
- Celebrant headings: **Cormorant** (replaced Playfair Display — Tom wanted less "stereotypically wedding-y", more grounded and strong)
- Writing section: Source Serif
- The Work: DM Sans
- What's Brewing: Fraunces
- Hub card headings each use their section's typeface

### Layout decisions
- Hub grid: `repeat(2, 1fr)` — always 2×2 on desktop, single column below 560px
- What's Brewing card has a dashed border (signals it's still forming), same size as others
- Gallery: flexbox layout — gallery-5 (portrait, 1126×2000) drives height in left column, four landscape images split across two right columns
- Celebrant hero: full viewport height (`100vh`), `object-position: center 70%`
- How I Work banner: `500px` height, `object-position: 65% 25%`
- Both navs have hamburger menus for mobile

## Key design rules

- **No emojis.** Never use emojis or unicode decorative symbols anywhere on the site.
- **No AI tells.** Avoid: unattributed inspirational quotes, overly symmetrical value prop grids, identical section rhythms, overuse of small-caps labels, checkmark lists. Use em dashes for feature lists.
- **All body text is written by Tom.** Use `[Tom to write: description]` for any missing content. Never generate placeholder marketing copy.
- **Don't overcorrect.** When Tom flags something, fix the specific issue. Don't introduce deliberate imperfections or asymmetry to "look less AI" — that's worse than the original problem.
- **External org links open in new tab** (Good Cycles, Bellarine Fungi, Worn Gundidj, Tearfund).

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

## File structure

```
public/
  images/
    about/        → headshot.jpeg (note: .jpeg not .jpg)
    celebrant/    → hero.jpg, bouquet.jpg, how-i-work.jpg, gallery-1..5.jpg, step-01..05.jpg
  favicon.svg
  robots.txt
src/
  layouts/        → BaseLayout.astro (includes OG tags, JSON-LD)
  pages/          → All routes
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
- **Visual previews help.** When comparing design options (like fonts), create a preview HTML page at localhost rather than describing options in text.

## Tom's background (for tone context)

Based in Darwin, NT. Wedding celebrant, writer (Substack + poetry/essays), and someone who embeds in organisations to build capacity — not a consultant who advises from outside. Past work: social enterprise bike shop with youth programs (Good Cycles, Geelong), mushroom farm (Bellarine Fungi), grant-funded programs at an Aboriginal co-operative (Worn Gundidj). His framing: "I listen and learn, and build the capacity your organisation most needs." The unifying thread: building structures that transform people, places, and materials.
