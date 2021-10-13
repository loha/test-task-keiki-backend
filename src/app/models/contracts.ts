import { Route } from '~/app/types/routes';
import { City } from '~/app/types/cities';
import { RouteStatus } from '~/app/types/routeStatuses';
import { TransportType } from '~/app/types/transportTypes';
import { Transport, TransportGetListFilter, CheckTransportExistFilter } from '~/app/types/transports';

export interface RoutesModelContract {
  getList(): Promise<Route[] | never>;
  getRouteById(id: string): Promise<Route[] | never>;
  createRoute(data: Route): Promise<Route | never>;
  deleteRoute(id: string): Promise<number | never>;
  updateRoute(data: Route): Promise<Route | never>;
  checkExistRouteById(id: string): Promise<boolean | never>;
}

export interface TransportsModelContract {
  getList(filter: TransportGetListFilter): Promise<Transport[] | never>;
  getTransportById(id: string): Promise<Transport[] | never>;
  createTransport(data: Transport): Promise<Transport | never>;
  deleteTransport(id: string): Promise<number | never>;
  updateTransport(data: Transport): Promise<Transport | never>;
  checkTransportExist(filter: CheckTransportExistFilter): Promise<boolean | never>;
  checkTransportExistById(id: string): Promise<boolean | never>;
}

export interface CitiesModelContract {
  getList(): Promise<City[] | never>;
}

export interface RouteStatusesModelContract {
  getList(): Promise<RouteStatus[] | never>;
}

export interface TransportTypesModelContract {
  getList(): Promise<TransportType[] | never>;
}
