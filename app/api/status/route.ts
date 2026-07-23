import { randomUUID } from "node:crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "pratik-raut-portfolio",
      runtime: "node-compatible",
      requestId: randomUUID(),
      serverTime: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
