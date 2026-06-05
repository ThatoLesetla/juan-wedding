# Taylor & Juan – Wedding Website

Built with Vite + React + Tailwind CSS + Framer Motion.

## Deploy to Vercel (easiest – 3 steps)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click **Deploy** — Vercel auto-detects Vite, no config needed

Your site will be live at `your-project.vercel.app` in ~60 seconds.
Add a custom domain (e.g. `taylorandjuan.com`) in the Vercel dashboard.

## Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site → Import from Git
3. Build command: `npm run build` | Publish directory: `dist`

## Run locally

```bash
npm install
npm run dev
```

## Customise

- **Names, dates, venues** → `src/App.jsx` top of file (`story`, `events` arrays)
- **Photos** → replace Unsplash URLs in `gallery` array with your own images
- **Colours** → search for `#9c7b55` (the gold accent) and swap globally
- **Spotify playlist** → replace the placeholder `<div>` in the Playlist section with a real `<iframe>` embed
- **RSVP backend** → the form currently shows a local success message. Wire up to [Formspree](https://formspree.io) (free) or [Netlify Forms](https://docs.netlify.com/forms/setup/) by adding `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
