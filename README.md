# Yousif CLEP Exams Review

Practice site for two CLEP exams:

- **American Government** (Govt 2305) — 100 questions / 90 minutes
- **History of the United States II: 1865–Present** — 120 questions / 90 minutes

Questions are **original**, CLEP-shaped practice items weighted to College Board topic outlines. They are **not** official retired CLEP exams.

## Live site (GitHub Pages)

**https://mellowsss.github.io/clepyousif/**

Deploys automatically from `main` via GitHub Actions (static export).

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43125](http://127.0.0.1:43125).

`npm run dev` uses webpack (more reliable hydration in some environments). For a production build:

```bash
npm run build && npx serve out
```

GitHub Pages build:

```bash
npm run build:pages
```

## Study modes

- **Timed full exam** — outline-weighted random set, countdown timer, jump navigation, topic score breakdown
- **Topic drill** — pick CLEP outline sections, 25 questions, instant explanations

Progress (recent scores / weak topics) is stored in your browser `localStorage`.

## Credit note

ACE typically recommends credit at a **scaled score of 50** (3 semester hours). Your college sets the final credit-granting policy — confirm before testing.

## Scripts

```bash
npm run gen:questions   # regenerate question banks from scripts/generate-questions.mjs
npm run build
npm run lint
```
