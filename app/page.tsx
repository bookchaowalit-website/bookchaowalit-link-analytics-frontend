"use client";

import { useMemo, useState } from "react";

type Range = "24h" | "7d" | "30d";
const REPORTS: Record<Range, { clicks: string; links: string; ctr: string; geo: string; change: string; bars: number[] }> = {
  "24h": { clicks: "1,204", links: "8", ctr: "2.1%", geo: "TH", change: "+8.2%", bars: [24, 38, 29, 48, 42, 67, 54, 78, 64, 82, 74, 91] },
  "7d": { clicks: "8,420", links: "24", ctr: "3.4%", geo: "TH", change: "+14.8%", bars: [32, 46, 40, 54, 48, 68, 58, 74, 62, 84, 70, 92] },
  "30d": { clicks: "31,840", links: "31", ctr: "3.8%", geo: "TH", change: "+22.4%", bars: [22, 31, 38, 34, 52, 46, 61, 58, 76, 69, 88, 96] },
};
const ROWS = [
  { name: "/go/github", destination: "github.com/bookchaowalit", clicks: "1,240", share: 48, status: "active" },
  { name: "/go/resume", destination: "bookchaowalit.com/about", clicks: "980", share: 37, status: "active" },
  { name: "/go/notes", destination: "bookchaowalit.com/knowledge", clicks: "402", share: 15, status: "quiet" },
];

export default function Home() {
  const [range, setRange] = useState<Range>("7d");
  const [selected, setSelected] = useState<string | null>(null);
  const report = REPORTS[range];
  const highlight = useMemo(() => ROWS.find((row) => row.name === selected), [selected]);
  const cards = [{ label: "Clicks", value: report.clicks, note: report.change }, { label: "Live links", value: report.links, note: "sample set" }, { label: "Click rate", value: report.ctr, note: "estimated" }, { label: "Top region", value: report.geo, note: "by clicks" }];

  return (
    <main className="ledger-shell">
      <header className="ledger-topbar"><a className="ledger-logo" href="/">CLICK / LEDGER</a><span>link analytics · read-only sample</span><span>report 001</span></header>
      <section className="ledger-hero"><div><p className="ledger-kicker">A small report on where attention goes</p><h1>Follow the<br /><em>trail of a click.</em></h1><p>Sample link activity for a personal web presence. Useful enough to read, honest enough to label.</p></div><div className="ledger-stamp"><span>REPORT STATUS</span><strong>SAMPLE</strong><i>no backend connected</i></div></section>

      <section className="report-controls"><div><span className="report-label">Window</span><div className="range-tabs">{(["24h", "7d", "30d"] as Range[]).map((item) => <button className={range === item ? "active" : ""} key={item} onClick={() => setRange(item)}>{item}</button>)}</div></div><p>All figures are illustrative<br />and scoped to this browser view.</p></section>
      <section className="metric-grid">{cards.map((card) => <div className="metric" key={card.label}><span>{card.label}</span><strong>{card.value}</strong><small>{card.note} · {range}</small></div>)}</section>

      <section className="chart-panel"><div className="chart-heading"><span>Click volume / {range}</span><span>last point = now</span></div><div className="bar-chart" aria-label="Illustrative click volume chart">{report.bars.map((height, index) => <i style={{ height: `${height}%` }} key={`${height}-${index}`} />)}</div><div className="chart-axis"><span>−{range === "24h" ? "12h" : range === "7d" ? "6d" : "30d"}</span><span>now</span></div></section>

      <section className="links-ledger"><div className="table-heading"><span>Short link</span><span>Clicks / share</span><span>State</span><span>Open</span></div>{ROWS.map((row) => <button className={`link-row ${selected === row.name ? "selected" : ""}`} key={row.name} onClick={() => setSelected(selected === row.name ? null : row.name)}><span><strong>{row.name}</strong><small>{row.destination}</small></span><span className="click-cell"><b>{row.clicks}</b><i><em style={{ width: `${row.share}%` }} /></i></span><span className={`state ${row.status}`}>{row.status}</span><span className="open-mark">↗</span></button>)}</section>
      {highlight && <aside className="detail-note"><span>Selected record</span><strong>{highlight.name}</strong><p>Destination: {highlight.destination}. This is a sample interaction; no click is sent or persisted.</p></aside>}
      <footer className="ledger-footer"><span>BOOKCHAOWALIT / LINK ANALYTICS</span><span>SAMPLE DATA · LOCAL DEMO · 2026</span></footer>
    </main>
  );
}
