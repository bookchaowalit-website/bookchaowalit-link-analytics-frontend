# Upgrade plan

## Current state

Score: 6/10 (was 4/10) — sample report is now internally consistent, exportable and accessible; still no real click source by design.

## Backlog

- P1: Optional import of a real click CSV (e.g. from a shortener export) to replace the sample data client-side.
- P1: Chart axis labels per bar and a data table alternative for the chart.
- P2: Playwright smoke test for window switch + CSV download.
- P2: Correct `public/sitemap.xml` host.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- `/api/mcp` uses a typed JSON-RPC handler (`lib/mcp.ts`, tested) with proper error codes and an honest `get_app_info` tool; this fixed the template's lint errors.
- `/more-projects` renders from `lib/related-projects.ts` (was ~980 lines of unrolled links plus an unused data copy) and no longer links to itself; removed the stale `app/page.tsx.backup`.
- Report data moved to numeric `lib/report.ts` (tested): row clicks now scale with the selected window and sum to the headline total (previously fixed strings that ignored the window), CSV export, signed change formatting.
- Fixed `no-html-link-for-pages` lint error, added `aria-pressed` to window and row toggles, `role=img` + descriptive label on the chart, correct axis start labels, and a real destination link in the row detail.
