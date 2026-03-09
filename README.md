# Brenda Bispo — Portfolio

Personal portfolio website built with Next.js, featuring an interactive game that tells my developer journey.

🌐 **[home.brendabispo.com](https://home.brendabispo.com)**

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Fonts:** Orbitron · JetBrains Mono · Inter (via `next/font`)
- **i18n:** Custom context — Portuguese, English, Spanish

## Features

- Interactive canvas game — play through my developer journey as a 2D platformer
- Multilingual (PT / EN / ES) with locale persisted via cookie
- Konami Code easter egg
- Sections: Hero, Experience, Projects, Tech Stack, Soft Skills, Stats, Contact
- Responsive and accessible

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals)
├── components/
│   ├── game/         # Game engine (types, levels, renderers)
│   └── *.tsx         # UI sections and shared components
├── config/           # Skills data
├── hooks/            # useJourneyGame, useKonamiCode
├── i18n/             # Translation files (pt, en, es) + LanguageContext
└── utils/            # Scroll utility
public/
└── images/
    ├── character/    # Player sprite frames
    └── floor/        # Floor/platform tiles
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Hosted on GitHub Pages at [home.brendabispo.com](https://home.brendabispo.com).
