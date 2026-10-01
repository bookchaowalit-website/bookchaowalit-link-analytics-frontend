"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AXIS_START, chartRows, formatChange, formatCount, RANGES, REPORTS, reportCsv, rowsForRange, type Range } from "@/lib/report";

export default function Home() {
  const [range, setRange] = useState<Range>("7d");
  const [selected, setSelected] = useState<string | null>(null);
  const report = REPORTS[range];
  const rows = useMemo(() => rowsForRange(range), [range]);
  const highlight = rows.find((row) => row.name === selected);
  const cards = [{ label: "Clicks", value: formatCount(report.clicks), note: formatChange(report.change) }, { label: "Live links", value: String(report.links), note: "sample set" }, { label: "Click rate", value: `${report.ctr.toFixed(1)}%`, note: "estimated" }, { label: "Top region", value: report.geo, note: "by clicks" }];
  const downloadCsv = () => {
    const url = URL.createObjectURL(new Blob([reportCsv(range)], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `link-analytics-sample-${range}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="ledger-shell">
      <header className="ledger-topbar"><Link className="ledger-logo" href="/">CLICK / LEDGER</Link><span>link analytics · read-only sample</span><span>report 001</span></header>
      <section className="ledger-hero"><div><p className="ledger-kicker">A small report on where attention goes</p><h1>Follow the<br /><em>trail of a click.</em></h1><p>Sample link activity for a personal web presence. Useful enough to read, honest enough to label.</p></div><div className="ledger-stamp"><span>REPORT STATUS</span><strong>SAMPLE</strong><i>no backend connected</i></div></section>

      <section className="report-controls"><div><span className="report-label">Window</span><div className="range-tabs" role="group" aria-label="Report window">{RANGES.map((item) => <button type="button" aria-pressed={range === item} className={range === item ? "active" : ""} key={item} onClick={() => setRange(item)}>{item}</button>)}</div></div><p>All figures are illustrative<br />and scoped to this browser view.<br /><button type="button" className="csv-button" onClick={downloadCsv}>Download sample CSV</button></p></section>
      <section className="metric-grid">{cards.map((card) => <div className="metric" key={card.label}><span>{card.label}</span><strong>{card.value}</strong><small>{card.note} · {range}</small></div>)}</section>

      <section className="chart-panel"><div className="chart-heading"><span>Click volume / {range}</span><span>last point = now</span></div><div className="bar-chart" role="img" aria-label={`Illustrative click volume for ${range}, ${report.bars.length} intervals, trending ${formatChange(report.change)}`}>{report.bars.map((height, index) => <i style={{ height: `${height}%` }} key={`${height}-${index}`} />)}</div><div className="chart-axis"><span>{AXIS_START[range]}</span><span>now</span></div><details className="chart-data"><summary>Chart data as a table</summary><table><caption className="sr-only">Illustrative click volume per interval, {range}</caption><thead><tr><th scope="col">Interval</th><th scope="col">Relative volume</th></tr></thead><tbody>{chartRows(range).map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.volume}%</td></tr>)}</tbody></table></details></section>

      <section className="links-ledger"><div className="table-heading"><span>Short link</span><span>Clicks / share</span><span>State</span><span>Detail</span></div>{rows.map((row) => <button type="button" aria-pressed={selected === row.name} className={`link-row ${selected === row.name ? "selected" : ""}`} key={row.name} onClick={() => setSelected(selected === row.name ? null : row.name)}><span><strong>{row.name}</strong><small>{row.destination.replace(/^https:\/\//, "")}</small></span><span className="click-cell"><b>{formatCount(row.clicks)}</b><i><em style={{ width: `${row.share}%` }} /></i></span><span className={`state ${row.status}`}>{row.status}</span><span className="open-mark" aria-hidden="true">↗</span></button>)}</section>
      {highlight && <aside className="detail-note" aria-live="polite"><span>Selected record</span><strong>{highlight.name}</strong><p>{formatCount(highlight.clicks)} sample clicks ({highlight.share}%) in the last {range}. Destination: <a href={highlight.destination} target="_blank" rel="noopener noreferrer">{highlight.destination}</a>. No click is sent or persisted from this view.</p></aside>}
      <footer className="ledger-footer"><span>BOOKCHAOWALIT / LINK ANALYTICS</span><span>SAMPLE DATA · LOCAL DEMO · 2026</span></footer>
    </main>
  );
}
