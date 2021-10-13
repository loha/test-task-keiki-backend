import { Context } from '~/framework/types/context';
import { TransportsServiceContract } from '~/app/services/transports/contracts';
import { TransportGetListFilter } from '~/app/types/transports';

class TransportsController {
  protected transportsService: TransportsServiceContract;

  public constructor(transportsService: TransportsServiceContract) {
    this.transportsService = transportsService;
  }

  public async getList(ctx: Context) {
    let status = 200;
    let result;

    try {
      const query = ctx.request.query;
      const filter: TransportGetListFilter = {};

      if (query.hasOwnProperty('isFree')) {
        filter.isFree = query.isFree;
      }

      if (query.hasOwnProperty('transportType')) {
        filter.transportType = query.transportType;
      }

      result = await this.transportsService.getList(filter);
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

  public async getTransportById(ctx: Context) {
    let status = 200;
    let result;

    try {
      const { id } = ctx.request.params;
      result = await this.transportsService.getTransportById(id);

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

  public async createTransport(ctx: Context) {
    let status = 200;
    let result;

    try {
      const { plateNumber, model, transportType, dateOfPurchase, mileage } = ctx.request.body;

      result = await this.transportsService.createTransport({
        plateNumber,
        model,
        transportType,
        dateOfPurchase,
        mileage,
        isFree: true,
      });
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

  public async deleteTransport(ctx: Context) {
    let status = 200;
    let result;

    try {
      const id = ctx.request.params.id;
      result = await this.transportsService.deleteTransport(id);

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

  public async updateTransport(ctx: Context) {
    let statusCode = 200;
    let result;

    try {
      const id = ctx.request.params.id;
      const { plateNumber, model, transportType, dateOfPurchase, mileage, isFree } = ctx.request.body;

      result = await this.transportsService.updateTransport({
        id,
        plateNumber,
        model,
        transportType,
        dateOfPurchase,
        mileage,
        isFree,
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

export { TransportsController };
