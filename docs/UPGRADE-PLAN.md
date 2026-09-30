# Upgrade plan

## Current state

Score: 6/10 (was 4/10) — sample report is now internally consistent, exportable and accessible; still no real click source by design.

## Backlog

- P1: Optional import of a real click CSV (e.g. from a shortener export) to replace the sample data client-side.
- P2: Per-bar axis labels on the chart itself (the table covers screen readers).
- P2: Playwright smoke test for window switch + CSV download.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- `/api/mcp` uses a typed JSON-RPC handler (`lib/mcp.ts`, tested) with proper error codes and an honest `get_app_info` tool; this fixed the template's lint errors.
- `/more-projects` renders from `lib/related-projects.ts` (was ~980 lines of unrolled links plus an unused data copy) and no longer links to itself; removed the stale `app/page.tsx.backup`.
- Report data moved to numeric `lib/report.ts` (tested): row clicks now scale with the selected window and sum to the headline total (previously fixed strings that ignored the window), CSV export, signed change formatting.
- Fixed `no-html-link-for-pages` lint error, added `aria-pressed` to window and row toggles, `role=img` + descriptive label on the chart, correct axis start labels, and a real destination link in the row detail.

## Done in this pass (pass 2)

- Canonical host is config-driven: `lib/site.ts` resolves `NEXT_PUBLIC_SITE_URL` (validated, clear error on a non-http(s) value) and feeds `metadataBase`, generated `app/sitemap.ts` / `app/robots.ts` and the MCP `get_app_info` URL; removed the stale template `public/sitemap.xml` / `robots.txt` (they pointed at `bookchaowalit.com` and a `*.vercel.app` name that differs from the project URL). Tested in `lib/site.test.ts`.
- a11y: the bar chart has a "Chart data as a table" disclosure (`chartRows` in `lib/report.ts`, tested) listing each interval (oldest first, `−24h to −22h` … `to now`) with its relative volume; added a `.sr-only` utility the caption relies on.

## Done in this pass (pass 3)
- Edge-case pass on `lib/report.ts` (regression tests in `lib/report.test.ts`):
  - `formatChange(-0.04)` rendered `−0.0%`; the sign now follows the rounded
    value, and NaN/Infinity render `—` instead of `−NaN%` / `+Infinity%`.
  - `csvCell` only quoted `"`, `,` and `\n`; a lone CR or U+2028/U+2029 split
    the record in spreadsheet importers. These are now quoted too.
