import { request } from '~/bootstrap/db';
import { RouteStatus } from '~/app/types/routeStatuses';
import { RouteStatusesModelContract } from './contracts';

class RouteStatusesModel implements RouteStatusesModelContract {
  protected _tableName = 'route_statuses';

  public getList(): Promise<RouteStatus[] | never> {
    return request(`SELECT * FROM ${this._tableName}`).then((result) => {
      return result.rows;
    });
  }
}

export { RouteStatusesModel };
