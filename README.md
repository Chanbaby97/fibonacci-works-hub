# Fibonacci Works Hub

Phone-first live-teach hub for all 14 Fibonacci Works community workshops (MSGAM / Unama'ki).

- Source of truth copies also live in `exports/fibonacci-works` on the build machine (`workshop-hub.jsx`, `slide-enrich.js`).
- Canon titles: WS04 Greenhouse Design & Management · WS12 Waste, Recycling & Composting.
- Durations are 2.5 hours or 5 hours only.
- Canva links are the existing deck URLs. Do not invent new ones.
- CAD figures in the guides are estimates — confirm locally. No rate card.
- Section art is generated SVG placeholders in `public/placeholders/` (no photos of people). Real Canva slide fills are still a human step.
- Deck PDFs (~25 MB each) stay in `public/decks/` locally and are gitignored.

```bash
npm install
npm run dev
npm run build   # dist/index.html is the single-file app
```
