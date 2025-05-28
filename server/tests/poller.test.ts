import { WebSocketServer } from "ws";
import { startPoller, latest } from "../src/poller";

test("poller fetched and caches", (done) => {
  const wss = new WebSocketServer({ port: 0 });
  startPoller(wss);
  setTimeout(() => {   
    expect(latest()).not.toBeNull();
    wss.close();
    done();
  }, 4000);
});
