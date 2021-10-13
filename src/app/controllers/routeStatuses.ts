import { Context } from '~/framework/types/context';
import { RouteStatusesServiceContract } from '~/app/services/routeStatuses/contracts';

class RouteStatusesController {
  protected routeStatusesService: RouteStatusesServiceContract;

  public constructor(routeStatusesService: RouteStatusesServiceContract) {
    this.routeStatusesService = routeStatusesService;
  }

  public async getList(ctx: Context) {
    let status = 200;
    let result;

    try {
      result = await this.routeStatusesService.getList();

      result = {
        status,
        data: result,
      };
    } catch (e) {
      console.log(e);

      status = e.status;

      result = {
        status: e.status,
        message: e.message,
        detail: e.detail,
      };
    }

    return ctx.response.status(status).sendJSON(result);
  }
}

export { RouteStatusesController };
