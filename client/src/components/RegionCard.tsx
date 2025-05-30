import React from "react";
import { RegionPulseMsg } from "../types";

type RegionStats = RegionPulseMsg["data"];

interface Props {
  data: RegionStats;
}

export default function RegionCard({ data }: Props) {
  const cardStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    margin: "auto",
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 0 0.5rem",
  };

  const getStatusDotStyle = (status: "ok" | "error"): React.CSSProperties => ({
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    backgroundColor: status === "ok" ? "#48bb78" : "#f56565",
  });

  const statStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    margin: "0.25rem 0",
  };

  const status = data.status === "ok" ? "ok" : "error";

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>
        <span style={getStatusDotStyle(status)} />
        {data.region}
      </h2>
      <p style={statStyle}>online users: {data.results.stats.online}</p>
      <p style={statStyle}>cpu load: {data.results.stats.server.cpu_load}</p>
    </div>
  );
}
