import { handleRpc } from "@/lib/mcp";

export const runtime = "edge";

const APP = {
  name: "Link Analytics",
  description: "Illustrative click report for short links (sample data).",
  url: "https://bookchaowalit-link-analytics-frontend.vercel.app",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 });
  }
  const response = handleRpc(body, APP);
  if (response === null) return new Response(null, { status: 202 });
  return Response.json(response);
}
