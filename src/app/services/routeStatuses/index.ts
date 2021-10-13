import { RouteStatus } from '~/app/types/routeStatuses';
import { RouteStatusesModelContract } from '~/app/models/contracts';
import { RouteStatusesServiceContract } from './contracts';
import { GetRouteStatusesListDBException } from './exceptions/getRouteStatusesListDB';

class RouteStatusesService implements RouteStatusesServiceContract {
  protected routeStatusesModel: RouteStatusesModelContract;

  public constructor(routeStatusesModel: RouteStatusesModelContract) {
    this.routeStatusesModel = routeStatusesModel;
  }

  public async getList(): Promise<RouteStatus[] | never> {
    try {
      return await this.routeStatusesModel.getList();
    } catch (e) {
      throw new GetRouteStatusesListDBException(e.stack);
    }
  }
}

export { RouteStatusesService };
