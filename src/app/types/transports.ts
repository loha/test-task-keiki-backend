export type Transport = {
  id?: string;
  plateNumber: string;
  model: string;
  transportType: string;
  dateOfPurchase: string | Date;
  mileage: number;
  isFree: boolean;
};

export type TransportGetListFilter = {
  isFree?: boolean;
  transportType?: string;
  withId?: string;
};

export type CheckTransportExistFilter = {
  plateNumber: string;
  model: string;
}
