# Smartinfra — site

Static single-page site (`index.html` + `images/`). No build step.

## Local preview

```bash
python3 -m http.server 4196
# open http://localhost:4196
```

## Deploy & staging (Vercel)

Production deploys from `main`. Every other branch and PR gets its own
**preview URL** — that's staging. Safe loop:

```bash
git checkout -b change/some-edit   # work on a branch
# ...edit...
git commit -am "describe change"
git push -u origin change/some-edit  # Vercel posts a preview URL on the PR
```

Open a PR → review the preview URL → merge to `main` → production updates.

### One-off deploys without a branch (Vercel CLI)

```bash
npx vercel          # preview (staging) URL
npx vercel --prod   # promote to production
```

## Pages

- `/` homepage, `/contact`, `/terms`, `/privacy`
- Shared chrome: `site.css` (styles), `menu.js` (Motion mobile menu), `site.js` (subpage behavior)

## Contact form

`contact.html` posts to **Web3Forms** (no backend needed). To make it live:
1. Go to web3forms.com, enter **info@smartinfra.com**, get the access key it emails you.
2. In `contact.html`, replace `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` with that key.
Until then the form shows a graceful "email us directly" fallback.

## Notes

- Fonts: Inter via Google Fonts. Lenis smooth-scroll + Motion (motion.dev) via CDN.
- Four of six images are CC BY-SA (attribution required for production use);
  swap for owned/CC0 assets before public launch.
