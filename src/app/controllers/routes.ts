import { Context } from '~/framework/types/context';
import { RoutesServiceContract } from '~/app/services/routes/contracts';

class RoutesController {
  protected routesService: RoutesServiceContract;

  public constructor(routesService: RoutesServiceContract) {
    this.routesService = routesService;
  }

  public async getRoutesList(ctx: Context) {
    let status = 200;
    let result;

    try {
      result = await this.routesService.getList();

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

  public async getRouteById(ctx: Context) {
    let status = 200;
    let result;

    try {
      result = await this.routesService.getRouteById(ctx.request.params.id);

      if (result) {
        result = {
          status,
          data: result,
        };
      } else {
        status = 204;
      }
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

  public async createRoute(ctx: Context) {
    let statusCode = 200;
    let result;

    try {
      const {
        cityStart,
        cityEnd,
        distance,
        transportType,
        revenue,
        status,
        transport,
        startDate,
        endDate,
      } = ctx.request.body;

      result = await this.routesService.createRoute({
        cityStart,
        cityEnd,
        distance,
        transportType,
        revenue,
        status,
        transport,
        startDate,
        endDate,
      });

      result = {
        statusCode,
        data: result,
      };
    } catch (e) {
      console.log(e);

      statusCode = e.status;

      result = {
        status: e.status,
        message: e.message,
        detail: e.detail,
      };
    }

    return ctx.response.status(statusCode).sendJSON(result);
  }

  public async deleteRoute(ctx: Context) {
    let status = 200;
    let result;

    try {
      const id = ctx.request.params.id;
      result = await this.routesService.deleteRoute(id);

      result = {
        status,
        data: {
          deletedRows: result,
        },
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

  public async updateRoute(ctx: Context) {
    let statusCode = 200;
    let result;

    try {
      const id = ctx.request.params.id;
      const {
        cityStart,
        cityEnd,
        distance,
        transportType,
        revenue,
        status,
        transport,
        startDate,
        endDate,
      } = ctx.request.body;

      result = await this.routesService.updateRoute({
        id,
        cityStart,
        cityEnd,
        distance,
        transportType,
        revenue,
        status,
        transport,
        startDate,
        endDate,
      });

      result = {
        statusCode,
        data: result,
      };
    } catch (e) {
      console.log(e);

      statusCode = e.status;

      result = {
        status: e.status,
        message: e.message,
        detail: e.detail,
      };
    }

    return ctx.response.status(statusCode).sendJSON(result);
  }
}

export { RoutesController };
