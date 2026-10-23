# Yousif CLEP Exams Review

https://mellowsss.github.io/clepyousif/

<video src="https://mellowsss.github.io/clepyousif/demo.mp4" controls poster="https://mellowsss.github.io/clepyousif/demo-home.webp" width="100%"></video>

Practice site for two CLEP exams:

- **American Government** (Govt 2305) — 100 questions / 90 minutes
- **History of the United States II: 1865–Present** — 120 questions / 90 minutes

Questions are **original**, CLEP-shaped practice items weighted to College Board topic outlines. They are **not** official retired exams.

## Live site

**[Open Yousif CLEP Exams Review](https://mellowsss.github.io/clepyousif/)**

Deploys automatically from `main` via GitHub Actions (static export).

## Study modes

- **Timed full exam** — outline-weighted random set, countdown timer, jump navigation, topic score breakdown
- **Topic drill** — pick CLEP outline sections, 25 questions, instant explanations

Progress (recent scores / weak topics) is stored in your browser `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43125](http://127.0.0.1:43125).

```bash
npm run build && npx serve out
```

## Credit note

ACE typically recommends credit at a **scaled score of 50** (3 semester hours). Your college sets the final credit-granting policy — confirm before testing.

## Scripts

```bash
npm run gen:questions
npm run build
npm run lint
```
