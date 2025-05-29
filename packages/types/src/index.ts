export interface RegionStats {
  status: string;
  region: string;
  results: {
    stats: {
      online: number;
      server: {
        cpu_load: number;
      };
    };
  };
}
