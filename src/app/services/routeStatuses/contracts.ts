import { RouteStatus } from '~/app/types/routeStatuses';

export interface RouteStatusesServiceContract {
  getList(): Promise<RouteStatus[] | never>;
}
