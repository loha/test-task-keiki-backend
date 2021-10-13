import { Context } from '~/framework/types/context';
import { TransportTypesServiceContract } from '~/app/services/transportTypes/contracts';

class TransportTypesController {
  protected transportTypesService: TransportTypesServiceContract;

  public constructor(transportTypesService: TransportTypesServiceContract) {
    this.transportTypesService = transportTypesService;
  }

  public async getList(ctx: Context) {
    let status = 200;
    let result;

    try {
      result = await this.transportTypesService.getList();

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

export { TransportTypesController };
