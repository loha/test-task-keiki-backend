import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Validator } from '~/framework/extensions/validator';
import { Context } from '~/framework/types/context';

class GetTransportsListRequest implements BeforeMiddleware {
  protected _fields = {
    isFree: 'isFree',
    transportType: 'transportType',
  };

  public handle(ctx: Context, next: Function): any {
    try {
      const errors: string[] = [];
      let { isFree, transportType } = ctx.request.query;

      if (isFree) {
        if (isFree === '1' || isFree === '0') {
          ctx.request.query.isFree = !!parseInt(isFree);
        } else {
          errors.push(this._fields.isFree);
        }
      }

      if (transportType) {
        if (!Validator.isUUID(transportType, 4)) {
          errors.push(this._fields.transportType);
        }
      }

      if (errors.length) {
        return ctx.response.status(422).sendJSON({
          status: 422,
          message: 'Validation fail',
          detail: `Vilidation fail fields: ${errors.join()}`,
          fields: errors,
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

export { GetTransportsListRequest };
