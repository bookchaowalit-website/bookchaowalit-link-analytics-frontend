# Link Analytics

Click stats for short links (sample).

## Features
- KPI cards and bar chart per window (24h / 7d / 30d)
- Link table whose clicks are split from the headline total (always adds up)
- Row detail with a real link to the destination
- Download the sample table as CSV

## Limitations
- Sample data

## Run
```bash
npm install
npm run dev
```

## Honesty
Portfolio demo. Not multi-tenant SaaS. Prefer local-only state over fake production claims.

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same checks on every push (`.github/workflows/ci.yml`).

## Configuration

- `NEXT_PUBLIC_SITE_URL` (optional): canonical origin used for metadata, `/sitemap.xml`, `/robots.txt` and the MCP app info. Defaults to `https://bookchaowalit-link-analytics-frontend.vercel.app`; must be an absolute http(s) URL.
