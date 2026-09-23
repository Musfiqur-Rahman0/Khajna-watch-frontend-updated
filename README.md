# Khajna Watch — Frontend 

A Next.js recreation of the "Khajna Watch" land-record verification tool for
Bangladesh (khatian / dag / mutation / khajna checking), rebuilt to spec with:

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Redux Toolkit** for state — language (bn/en), watchlist, and demo "flag" submissions
  (all persisted to `localStorage`)
- **shadcn-style UI primitives** (Button, Card, Badge, Input, Label, Skeleton, Separator)
- **motion** (`motion/react`) for interaction — hero fade-ins, card hover/stagger,
  animated risk meter, dialog transitions
- **Demo data only** — see `src/lib/demo-data.ts`. There is no backend call anywhere;
  all search/filter/risk logic runs client-side in `src/lib/selectors.ts`.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

- `src/app/` — pages: home (`/`), plot dossier (`/plot/[code]`), watchlist (`/watch`), guide (`/guide`)
- `src/components/` — Shell (header/nav), PlotCard, RiskBadge/RiskMeter, FlagDialog
- `src/components/ui/` — shadcn-style primitives
- `src/store/` — Redux slices + Provider + localStorage persistence
- `src/lib/demo-data.ts` — the 10-plot bilingual demo dataset (owners, mutations,
  khajna receipts, warnings, flags)
- `src/lib/selectors.ts` — search/filter/home-data/dossier logic (mirrors what a
  real backend endpoint would do, but reads the in-memory demo data)
- `src/lib/copy.ts` — all bn/en UI strings

## Wiring up a real backend later

Replace the calls to `getHomeData`, `getPlot`, and `getPlotsByCodes` in
`src/lib/selectors.ts` with real API/server calls (e.g. Next.js Route Handlers
or Server Actions), and swap `addFlag` in `src/store/flagsSlice.ts` for a real
mutation. The component layer doesn't need to change since it already reads
through those functions and the Redux slices.
