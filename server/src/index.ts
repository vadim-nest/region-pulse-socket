import express, { Request, Response, NextFunction } from "express";
import { createServer, IncomingMessage } from "node:http"; // Import IncomingMessage
import { WebSocketServer, WebSocket } from "ws";
import { startPoller, latest } from "./poller";
require("dotenv").config();

console.log(process.env)

const PORT: number = Number(process.env.PORT) || 3000; // App Runner will set process.env.PORT to 8080

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] GET / requested by IP: ${req.ip}. Headers: ${JSON.stringify(req.headers)}`
  );
  res.send("OK");
  console.log(
    `[${new Date().toISOString()}] GET / response sent for IP: ${req.ip}`
  );
});

// Add a new, simpler health check for testing
app.get("/healthz", (req: Request, res: Response) => {
  console.log(
    `[${new Date().toISOString()}] GET /healthz requested by IP: ${req.ip}. Headers: ${JSON.stringify(req.headers)}`
  );
  res.status(200).send("Healthy from /healthz");
  console.log(
    `[${new Date().toISOString()}] GET /healthz response sent for IP: ${req.ip}`
  );
});

const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

// Capture IP on connection
wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  // Added req: IncomingMessage
  const ip =
    req.socket.remoteAddress ||
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress; // Get IP
  console.log(
    `[${new Date().toISOString()}] WebSocket connection established from IP: ${ip}`
  );

  ws.on("message", (msg: string) => {
    console.log(
      `[${new Date().toISOString()}] WebSocket message received from IP ${ip}: ${msg}`
    );
    ws.send(msg); // Echo back
  });

  ws.on("close", () => {
    console.log(
      `[${new Date().toISOString()}] WebSocket connection closed from IP: ${ip}`
    );
  });

  ws.on("error", (error) => {
    console.error(
      `[${new Date().toISOString()}] WebSocket error from IP ${ip}:`,
      error
    );
  });

  // Send initial data
  ws.send(JSON.stringify({ type: "update", data: latest() }));
});

startPoller(wss);

httpServer.listen(PORT, "0.0.0.0", () =>
  // Ensure listening on 0.0.0.0
  console.log(
    `[${new Date().toISOString()}] Server listening on http://0.0.0.0:${PORT}`
  )
);
