import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Context } from '~/framework/types/context';
import { RoutesModelContract } from '~/app/models/contracts';

class CheckRouteExistByIdMiddleware implements BeforeMiddleware {
  protected routesModel: RoutesModelContract;

  public constructor(routesModel: RoutesModelContract) {
    this.routesModel = routesModel;
  }

  public async handle(ctx: Context, next: Function) {
    try {
      const id = ctx.request.params.id;

      const isExist = await this.routesModel.checkExistRouteById(id);

      if (!isExist) {
        return ctx.response.status(404).sendJSON({
          status: 404,
          message: 'Not found',
          detail: `Router with id ${id} not exist`,
        });
      }

      return next();
    } catch (e) {
      console.log(e);

      return ctx.response.status(500).sendJSON({
        status: 500,
        message: 'Server error',
        detail: 'Internal server error',
      });
    }
  }
}

export { CheckRouteExistByIdMiddleware };
