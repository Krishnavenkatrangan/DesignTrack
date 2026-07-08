# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DesignFlow AI ("DesignTrack") is a single-page React app for design-team workflow management: request intake, a Kanban-style queue with AI-assisted designer assignment, a Gantt-style team timeline, analytics/reporting with AI-generated insights, and an admin center. It was scaffolded via Google AI Studio and uses Gemini (`@google/genai`) for the AI features.

There is currently **no backend and no persistence** — all data lives in React state in `App.tsx`, seeded from mock data in `constants.ts`. Refreshing the page resets everything.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server at http://localhost:3000
npm run build     # production build (vite build)
npm run preview   # preview the production build
```

There is no test suite, lint config, or CI configured in this repo. There is no separate typecheck script; TypeScript errors surface via the editor/`tsc --noEmit` or during `npm run build` (Vite does not type-check by default, but `tsconfig.json` has `noEmit: true` for editor/IDE checking).

### Environment

The Gemini API key is read from `GEMINI_API_KEY` in `.env.local` (not committed). `vite.config.ts` injects it into the client bundle as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`. AI features (`services/geminiService.ts`) degrade gracefully (return `null` / a placeholder string) when the key is absent — do not add hard failures for a missing key.

## Architecture

**Dependency loading is dual-mode**: `package.json`/`node_modules` are used for local dev via Vite, but `index.html` also declares an `importmap` pointing the same package names (`react`, `react-dom`, `lucide-react`, `date-fns`, `@google/genai`, `recharts`) at `esm.sh` CDN URLs. Keep both in sync when changing dependency versions.

**Styling**: Tailwind is loaded via the CDN script tag in `index.html` (`<script src="https://cdn.tailwindcss.com">`), not as a PostCSS build step — there is no `tailwind.config.js`. All styling is inline utility classes; the color/spacing conventions used throughout are `slate` neutrals with `blue`/`indigo` as primary accent, `emerald`/`orange`/`red`/`amber` for status semantics (see `getStatusColor`/`getPriorityColor` helpers repeated per-component below).

**State flow — everything is lifted to `App.tsx`**:
- `App.tsx` owns all top-level state: `designers`, `requests`, `currentView`, `selectedRequestId`.
- Navigation is a hand-rolled router: a `View` string union (`'dashboard' | 'intake' | 'queue' | 'timeline' | 'reports' | 'admin' | 'details'`) drives conditional rendering — there is no React Router.
- Mutations happen via handler functions defined in `App.tsx` (`handleNewRequest`, `handleAssign`, `handleViewDetails`, `handleAddFeedback`, `handleStatusChange`) and passed down as props. Components never mutate state directly; they call these callbacks.
- `components/*.tsx` are presentational/interactive views that receive `designers`/`requests` (or subsets) and callbacks as props — there is no context, Redux, or other state library.

**Domain model** (`types.ts`): `DesignRequest` is the core entity, with a `status: JobStatus` enum (`Pending → In Progress → Review → Completed`, plus `Blocked`), `priority: JobPriority`, an `assignedTo` (Designer id), and an embedded `feedback: Feedback[]` array (client/designer/manager comments with `type: 'General' | 'Approval' | 'Change Request'`). `Designer` tracks `capacityHours` vs `assignedHours` for utilization display. `Shift` exists in the model but is only lightly used (`MOCK_SHIFTS` in `constants.ts`, no dedicated view yet).

**AI integration** (`services/geminiService.ts`): two functions, both calling `gemini-2.5-flash` via `@google/genai`:
- `getSmartAssignments(designers, pendingRequests)` — used from `QueueManager.tsx`'s "Smart Assign" button; requests a structured JSON array (`responseSchema` with `Type.ARRAY`/`Type.OBJECT`) of `{requestId, designerId, rationale}` suggestions, which the UI lets the user accept individually (calling `onAssign` and removing that suggestion).
- `generateReportInsights(period, stats)` — used from `Reports.tsx`'s "AI Executive Summary" button; freeform text response summarizing chart data.

Both functions catch errors internally and return a null/fallback value rather than throwing — callers don't need try/catch.

**Views** (`components/`):
- `IntakeForm.tsx` — controlled form building a new `DesignRequest` (id generated as `` `r${Date.now()}` ``), submits via `onSubmit` then App redirects to the queue view.
- `QueueManager.tsx` — lists `Pending` requests, manual assign-via-`<select>`, plus the Gemini-powered "Smart Assign" suggestion flow.
- `TimelineView.tsx` — a hand-built 14-day Gantt chart per designer using `date-fns` for date math; bar position/width is computed with inline `style` (percentage offsets), not a charting library.
- `Reports.tsx` — `recharts` pie/bar charts (`volumeByType`, `volumeByFunction`) plus a hardcoded/simulated weekly-hours dataset, and the AI insight generator.
- `TaskDetails.tsx` — single-request detail + feedback thread; submitting feedback with type `Approval` auto-transitions status to `Completed`, `Change Request` auto-transitions to `In Progress` (see `handleSubmitFeedback`).
- `AdminCenter.tsx` — designer roster/admin view.

## Conventions

- Components are typed with `React.FC<PropsInterface>`; the props interface is named `<Component>Props` and declared just above the component.
- Feature/entity IDs are generated client-side as template strings, e.g. `` `r${Date.now()}` `` for requests, `` `f${Date.now()}` `` for feedback — follow this pattern rather than introducing a UUID library.
- Dates are stored as `yyyy-MM-dd` strings (via `date-fns` `format`), not `Date` objects, in the domain model.
- Status/priority → color mappings are implemented per-component as local `getStatusColor`/`getPriorityColor` switch helpers rather than a shared utility — follow existing precedent if adding a new one, or consider consolidating only if asked.
- Path alias `@/*` is configured in `tsconfig.json`/`vite.config.ts` for absolute imports from the repo root, though existing code mostly uses relative imports (`../types`, `../services/...`).
