import { RegionStats } from "@myorg/types";
import { WebSocketServer } from "ws";
require("dotenv").config();

const URL = process.env.URL;

let cached: RegionStats | null = null;

export async function poll(wss: WebSocketServer) {
  if (!URL) throw new Error("Missing required env var: URL");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(URL, { signal: controller.signal });
    cached = (await res.json()) as RegionStats;
    wss.clients.forEach(
      (c) =>
        c.readyState === c.OPEN &&
        c.send(JSON.stringify({ type: "update", data: cached }))
    );
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error("poll error: request timed out");
    } else {
      console.error("poll error:", err);
    }
  } finally {
    clearTimeout(timeout);
  }
}

export function startPoller(wss: WebSocketServer, intervalMs = 30_000) {
  poll(wss).catch(console.error);

  return setInterval(() => poll(wss).catch(console.error), intervalMs);
}

export function latest() {
  return cached;
}
