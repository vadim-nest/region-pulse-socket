export interface RegionPulseMsg {
  type: "update";
  version: string;
  data: {
    region: string;
    status: "ok" | "error";
    servers_count: number;
    session: number;
    results: {
      services: { redis: boolean; database: boolean };
      stats: {
        workers: [number, number][];
        online: number;
        server: {
          cpu_load: number;
        };
      };
    };
  };
}
