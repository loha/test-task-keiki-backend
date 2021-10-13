export type Route = {
  id?: string;
  cityStart: string;
  cityEnd: string;
  distance: number;
  transportType: string;
  revenue: number;
  status: string;
  transport: string;
  startDate: string | Date;
  endDate: string | Date;
};
