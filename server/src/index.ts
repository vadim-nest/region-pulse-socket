import express, { Request, Response, NextFunction } from "express";
import { createServer } from "node:http";
import { WebSocketServer, WebSocket } from "ws";

const PORT: number = Number(process.env.PORT) || 3000;

const app = express();
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("OK");
});

const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (msg: string) => ws.send(msg));
  ws.send(JSON.stringify({ hello: "world" }));
});

httpServer.listen(PORT, () =>
  console.log(`server listening on http://localhost:${PORT}`)
);
