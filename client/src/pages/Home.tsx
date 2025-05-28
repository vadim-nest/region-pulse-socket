import { useSocket } from "../hooks/useSocket";
import RegionCard from "../components/RegionCard";

export default function Home() {
  const message = useSocket<any>("ws://localhost:3000/ws");
  if (!message?.data) return <p>waiting…</p>;
  return <RegionCard data={message.data} />;
}
