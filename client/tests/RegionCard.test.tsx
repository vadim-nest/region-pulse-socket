import { render } from "@testing-library/react";
import RegionCard from "../src/components/RegionCard";
import type { RegionPulseMsg } from "../src/types";

test("shows region name", () => {
  const stub: RegionPulseMsg = {
    type: "update",
    version: "test",
    data: {
      status: "ok",
      region: "us-east",
      servers_count: 0,
      session: 0,
      results: {
        services: { redis: true, database: true },
        stats: {
          online: 1,
          workers: [],
          server: { cpu_load: 0.1 },
        },
      },
    },
  };

  const { getByText } = render(<RegionCard data={stub} />);
  expect(getByText(/us-east/)).toBeTruthy();
});
