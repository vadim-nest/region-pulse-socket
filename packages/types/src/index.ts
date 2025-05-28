export interface RegionStats {
  status: string;
  region: string;
  results: {
    stats: {
      online: number;
      cpu_load: number;
    };
  };
}
