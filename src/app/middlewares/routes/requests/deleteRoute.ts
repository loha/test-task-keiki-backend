import { Validator } from '~/framework/extensions/validator';
import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Context } from '~/framework/types/context';

class DeleteRouteRequest implements BeforeMiddleware {
  protected _fields = {
    id: 'id',
  };

  public handle(ctx: Context, next: Function): any {
    try {
      const errors: string[] = [];
      const id = ctx.request.params.id;

      if (id) {
        if (!Validator.isUUID(id, 4)) {
          errors.push(this._fields.id);
        }
      } else {
        errors.push(this._fields.id);
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

export { DeleteRouteRequest };
