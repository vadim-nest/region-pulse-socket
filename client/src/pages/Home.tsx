import { useSocket } from "../hooks/useSocket";
import RegionCard from "../components/RegionCard";
import type { RegionPulseMsg } from "../types";

export default function Home() {
  const message = useSocket<RegionPulseMsg>("ws://localhost:3000/ws");  
  if (!message?.data) return <p>waiting…</p>;
  return <RegionCard data={message.data} />;
}
