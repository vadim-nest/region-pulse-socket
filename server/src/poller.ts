import fetch from "node-fetch";
import { RegionStats } from "./types";
import { WebSocketServer } from "ws";
require('dotenv').config()

const URL = process.env.URL;

let cached: RegionStats | null = null;

export function startPoller(wss: WebSocketServer) {
  setInterval(async () => {   
    if (!URL) throw new Error("Missing required env var: URL");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(URL, { signal: controller.signal });
      cached = (await res.json()) as RegionStats;      

      wss.clients.forEach(
        (c) =>
          c.readyState === c.OPEN &&
          c.send(JSON.stringify({ type: "update", data: cached }))
      );
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.error("poll error: request timed out");
      } else {
        console.error("poll error:", error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }, 30_000);
}

export function latest() {
  return cached;
}
