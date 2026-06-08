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

## Notes

- Fonts: Inter via Google Fonts. Lenis smooth-scroll via unpkg CDN.
- Four of six images are CC BY-SA (attribution required for production use);
  swap for owned/CC0 assets before public launch.
