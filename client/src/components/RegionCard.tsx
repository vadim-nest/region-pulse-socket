import styled from "styled-components";
import type { RegionStats } from "@myorg/types";

interface Props {
  data: RegionStats;
}

const Card = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin: auto;
`;

const Title = styled.h2`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.5rem;
`;

const StatusDot = styled.span<{ $status: "ok" | "error" }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ $status }) =>
    $status === "ok" ? "#48bb78" : "#f56565"};
`;

const Stat = styled.p`
  font-size: 0.875rem;
  margin: 0.25rem 0;
`;

export default function RegionCard({ data }: Props) {
  return (
    <Card>
      <Title>
        <StatusDot $status={data.status === "ok" ? "ok" : "error"} />
        {data.region}
      </Title>
      <Stat>online users: {data.results.stats.online}</Stat>
      <Stat>cpu load: {data.results.stats.server.cpu_load}</Stat>
    </Card>
  );
}
