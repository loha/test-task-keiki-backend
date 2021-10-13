import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Context } from '~/framework/types/context';
import { TransportsModelContract } from '~/app/models/contracts';

class CheckTransportExistByIdMiddleware implements BeforeMiddleware {
  protected transportsModel: TransportsModelContract;

  public constructor(transportsModel: TransportsModelContract) {
    this.transportsModel = transportsModel;
  }

  public async handle(ctx: Context, next: Function) {
    try {
      const id = ctx.request.params.id;

      const isExist = await this.transportsModel.getTransportById(id);

      if (!isExist) {
        return ctx.response.status(404).sendJSON({
          status: 404,
          message: 'Not found',
          detail: `Transport with id ${id} not exist`,
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

export { CheckTransportExistByIdMiddleware };
