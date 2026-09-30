import { describe, expect, it } from "vitest";
import { formatChange, RANGES, REPORTS, reportCsv, rowsForRange } from "./report";

describe("rowsForRange", () => {
  it("always adds up to the headline click count", () => {
    for (const range of RANGES) {
      const rows = rowsForRange(range);
      expect(rows.reduce((sum, row) => sum + row.clicks, 0)).toBe(REPORTS[range].clicks);
    }
  });

  it("scales with the selected window", () => {
    expect(rowsForRange("30d")[0].clicks).toBeGreaterThan(rowsForRange("24h")[0].clicks);
  });

  it("distributes remainders to the largest fractions", () => {
    const rows = rowsForRange("24h", [
      { name: "a", destination: "x", share: 1, status: "active" },
      { name: "b", destination: "x", share: 1, status: "active" },
      { name: "c", destination: "x", share: 1, status: "active" },
    ]);
    expect(rows.map((row) => row.clicks).sort()).toEqual([401, 401, 402]);
  });
});

describe("formatting", () => {
  it("formats signed percentage changes", () => {
    expect(formatChange(8.2)).toBe("+8.2%");
    expect(formatChange(-3)).toBe("−3.0%");
  });

  it("exports a CSV with a header and one row per link", () => {
    const csv = reportCsv("7d").trim().split("\n");
    expect(csv[0]).toBe("short_link,destination,clicks,share_percent,status,range");
    expect(csv).toHaveLength(4);
    expect(csv[1].startsWith("/go/github,https://github.com/bookchaowalit,")).toBe(true);
  });
});
