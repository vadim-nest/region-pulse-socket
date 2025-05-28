import { render } from "@testing-library/react";
import RegionCard from "../src/components/RegionCard";

test("shows region name", () => {
  const data = {
    status: "ok",
    region: "us-east",
    results: { stats: { online: 1, server: { cpu_load: 0.1 } } },
  } as any;

  const { getByText } = render(<RegionCard data={data} />);
  expect(getByText(/us-east/)).toBeTruthy();
});
