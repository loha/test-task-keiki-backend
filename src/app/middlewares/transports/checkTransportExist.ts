import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Context } from '~/framework/types/context';
import { TransportsModelContract } from '~/app/models/contracts';

class CheckTransportExistMiddleware implements BeforeMiddleware {
  protected transportsModel: TransportsModelContract;

  public constructor(transportsModel: TransportsModelContract) {
    this.transportsModel = transportsModel;
  }

  public async handle(ctx: Context, next: Function) {
    try {
      const { model, plateNumber } = ctx.request.body;

      const isExist = await this.transportsModel.checkTransportExist({
        model,
        plateNumber,
      });

      if (isExist) {
        return ctx.response.status(409).sendJSON({
          status: 409,
          message: 'Conflict',
          detail: 'Transport already exist',
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

export { CheckTransportExistMiddleware };
