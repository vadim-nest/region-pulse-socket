import { useSocket } from "../hooks/useSocket";
import RegionCard from "../components/RegionCard";
import type { RegionPulseMsg } from "../types";

export default function Home() {
  const wsUrl = import.meta.env.VITE_WS_URL; 
  const message = useSocket<RegionPulseMsg>(wsUrl);

  if (!message?.data) return <p>waiting…</p>;
  return <RegionCard data={message.data} />;
}
