# Project: Soham's Portfolio

## Overview
This is a full-stack portfolio application consisting of a Next.js frontend and an Express.js backend. The project showcases AI and Web projects, skills, experience, and achievements. It also includes a backend service that scrapes tech news and handles contact form submissions.

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Styling:** Tailwind CSS, Material UI (@mui/material), CSS Modules
- **3D/Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Carousel:** Embla Carousel

### Backend (`/backend`)
- **Server:** Express.js
- **Database:** MongoDB
- **Scraping:** Playwright
- **AI:** Google Generative AI SDK (Gemini)
- **Image Hosting:** ImageKit
- **Validation:** Zod

## Project Structure

### Root
- `package.json`: Frontend dependencies and scripts.
- `next.config.js`: Next.js configuration.
- `tailwind.config.js`: Tailwind CSS configuration.

### Source (`/src`)
- `app/`: Next.js App Router pages (`page.js`, `layout.js`) and routes.
- `components/`: Reusable React components.
  - `3D/`: Three.js components.
  - `Projects/`: Project display components.
  - `Experience/`, `Skills/`, `Achievements/`: Section-specific components.
- `context/`: React Context providers (Global state, Vim mode state).
- `functions/`: Utility functions (Email sender, etc.).
- `data.js`: Centralized static data for projects, skills, etc.
- `themes/`: Theme configurations (Dark/Light).

### Backend (`/backend`)
- `index.js`: Main Express server entry point. API endpoints for articles and mail.
- `scrapeBrutalist.js`: Script to scrape "Brutalist Report" for tech articles.
- `template/`: Email templates.

## Development Rules

### Package Management
- **ALWAYS use `bun` for all package management tasks.**
  - Install dependencies: `bun install`
  - Run dev server: `bun dev`
  - Run scripts: `bun run <script-name>`
- Do NOT use `npm`, `yarn`, or `pnpm`.

### Code Style
- Use Functional Components with Hooks for React.
- Use `const` and `let` appropriately.
- Ensure all new components are responsive (Tailwind CSS).
- Follow the existing directory structure for new components.

### Backend
- The backend runs on a separate port (typically defined in `index.js` or environment variables).
- Ensure MongoDB is running or the connection string is valid before running backend tasks requiring the DB.