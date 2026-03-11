# Performance Updates

These files replace the originals in your project. The changes:

1. **Hero images load immediately** (`loading="eager"`, `fetchpriority="high"`) — the browser
   prioritises the first thing visitors see.

2. **Everything else loads lazily** (`loading="lazy"`) — gallery photos, step photos, and banner
   images only download as the visitor scrolls to them.

3. **Explicit dimensions** (`width` and `height` on every `<img>`) — prevents the page from
   jumping around as images load.

4. **Font preconnect** in BaseLayout — the browser starts fetching Google Fonts sooner.

5. **Hero preload** — the celebrant hero image is preloaded in the `<head>` so it appears faster.

6. **Smooth image reveal** — lazy images fade in gently via CSS when they load.

## How to apply

Copy these files over the originals in your project:

```
updates/src/layouts/BaseLayout.astro        →  src/layouts/BaseLayout.astro
updates/src/pages/about.astro               →  src/pages/about.astro
updates/src/pages/celebrant/index.astro     →  src/pages/celebrant/index.astro
updates/src/pages/celebrant/pricing.astro   →  src/pages/celebrant/pricing.astro
updates/src/pages/celebrant/how-i-work.astro → src/pages/celebrant/how-i-work.astro
```

Then open `src/styles/global.css` and add the contents of `css-additions.css` to the
bottom of the file.

Then push:
```bash
git add .
git commit -m "Add image lazy loading and performance optimizations"
git push
```

## Also recommended: compress your images

The code changes help a lot, but the single biggest win is smaller image files.

1. Go to https://squoosh.app
2. Drag each photo in
3. Choose WebP format, quality ~80%
4. Save with the same filename but .webp extension (e.g. hero.webp)
5. Update the file extensions in the .astro files from .jpg to .webp
   (find and replace works well for this)

A typical 5MB photo becomes 150-300KB with no visible quality loss.
