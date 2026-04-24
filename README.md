# Bazario — Ecommerce Frontend

React + Vite + TailwindCSS v4 + Redux Toolkit

## Setup

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build in /dist
npm run preview    # preview production build
```

## Deploy

### Vercel (Recommended — 1 click)
1. Push to GitHub
2. Go to vercel.com → New Project → Import repo
3. Framework: Vite — Build command: `npm run build` — Output: `dist`
4. Deploy ✓

### Netlify
1. Push to GitHub
2. netlify.com → New Site → Import from Git
3. Build command: `npm run build` — Publish dir: `dist`
4. Deploy ✓

### Manual (any static host)
Upload contents of `/dist` folder to your hosting provider.
