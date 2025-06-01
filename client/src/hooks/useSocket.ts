import { useEffect, useState } from "react";

export function useSocket<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    try {
      const ws = new WebSocket(url);
      ws.onmessage = (ev) => setData(JSON.parse(ev.data));
      return () => ws.close();
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  return data;
}
