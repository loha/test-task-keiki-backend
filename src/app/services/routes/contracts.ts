import { Route } from '../../types/routes';

export interface RoutesServiceContract {
  getList(): Promise<Route[] | never>;
  getRouteById(id: string): Promise<Route | null | never>;
  createRoute(data: Route): Promise<Route | never>;
  deleteRoute(id: string): Promise<number | never>;
  updateRoute(data: Route): Promise<Route | never>;
}
