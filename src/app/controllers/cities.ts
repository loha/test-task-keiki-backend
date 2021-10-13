import { Context } from '~/framework/types/context';
import { CitiesServiceContract } from '~/app/services/cities/contracts';

class CitiesController {
  protected citiesService: CitiesServiceContract;

  public constructor(citiesService: CitiesServiceContract) {
    this.citiesService = citiesService;
  }

  public async getList(ctx: Context) {
    let status = 200;
    let result;

    try {
      result = await this.citiesService.getList();

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

export { CitiesController };
