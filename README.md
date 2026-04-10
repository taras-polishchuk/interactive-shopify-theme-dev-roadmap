# 🛍️ Shopify Theme Dev Roadmap

An interactive skill tree for becoming a Shopify Theme Developer — from HTML basics to publishing a premium theme on the Shopify Theme Store.

**[Live Demo →](https://taras-polishchuk.github.io/interactive-shopify-theme-dev-roadmap/)**

![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Deploy](https://img.shields.io/github/actions/workflow/status/taras-polishchuk/interactive-shopify-theme-dev-roadmap/deploy.yml?label=deploy)

---

## Overview

The roadmap is structured as a **game-like skill tree** — nodes unlock as you complete prerequisites, XP accumulates, and your level progresses from Apprentice to Shopify Master. It's designed to feel like a journey, not a checklist.

**31 nodes** across **7 stages**, **4,350 XP total**, **8 levels**.

### Stages

| # | Stage | Focus |
|---|-------|-------|
| 1 | 🧱 Foundation | HTML, CSS, JavaScript, Git |
| 2 | ⚡ Frontend Deep Dive | Advanced CSS, DOM, performance, build tools |
| 3 | 🛍️ Shopify Basics | Platform overview, theme structure, Liquid, CLI |
| 4 | 🔨 Theme Development | Sections & blocks, JSON templates, metafields, Dawn |
| 5 | 🎨 Theme Customization | Editor mindset, schema settings, UX for merchants |
| 6 | 🚀 Advanced Shopify | App integrations, Storefront API, AJAX cart, a11y |
| 7 | 💎 Professional Level | Portfolio, client work, debugging, code quality, publishing |

---

## Features

- **Skill tree mechanics** — nodes lock until prerequisites are completed
- **XP & leveling system** — 8 levels from Apprentice to Shopify Master
- **⚡ Reality Mode** — 12 nodes include real-world Shopify tasks (e.g. "Build a sticky ATC bar in Dawn", "Audit a live store with PageSpeed Insights")
- **Progress persistence** — saved to `localStorage`, survives page reloads
- **Search** — filter nodes by title, description, or skill name
- **Recommended Next** — always shows the 3 best unlocked nodes to tackle
- **Dark mode** — auto-detects system preference, toggle in header
- **Fully responsive** — works on mobile down to 375px
- **Accessible** — keyboard navigable, ARIA labels, focus management

---

## Tech Stack

- **[Svelte 5](https://svelte.dev)** — `$state` runes for reactivity, no class components
- **TypeScript** — typed data model and store
- **Vite 8** — build tooling and dev server
- **Plain CSS** — custom properties design system, no utility framework
- **No runtime dependencies** — just Svelte

---

## Project Structure

```
src/
├── main.ts                    # Entry point
├── App.svelte                 # Root layout: map + sidebar
├── app.css                    # Design tokens, reset, animations
├── data/
│   ├── types.ts               # Interfaces + XP level calculator
│   └── roadmap.ts             # All 31 nodes and 7 stages
├── lib/
│   └── store.svelte.ts        # Global $state store + localStorage
└── components/
    ├── Header.svelte           # Sticky header with search, progress, dark mode
    ├── StageSection.svelte     # Stage zone with SVG ring + node grid
    ├── NodeCard.svelte         # Card with locked/unlocked/completed states
    ├── NodeModal.svelte        # Detail modal: skills, prereqs, resources, reality task
    └── RecommendedNext.svelte  # "What to do next" sidebar panel
```

---

## Getting Started

```bash
git clone https://github.com/taras-polishchuk/interactive-shopify-theme-dev-roadmap.git
cd interactive-shopify-theme-dev-roadmap
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Deploy

The project deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

```bash
npm run build   # outputs to /dist
```
