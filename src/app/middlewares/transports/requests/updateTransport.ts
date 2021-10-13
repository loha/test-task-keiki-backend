import { Validator } from '~/framework/extensions/validator';
import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Context } from '~/framework/types/context';

class UpdateTransportRequest implements BeforeMiddleware {
  protected _fields = {
    id: 'id',
    plateNumber: 'plateNumber',
    model: 'model',
    transportType: 'transportType',
    dateOfPurchase: 'dateOfPurchase',
    mileage: 'mileage',
    isFree: 'isFree',
  };

  public handle(ctx: Context, next: Function): any {
    try {
      const errors: string[] = [];
      const id = ctx.request.params.id;
      let { plateNumber, model, transportType, dateOfPurchase, mileage, isFree } = ctx.request.body;

      if (id) {
        if (!Validator.isUUID(id, 4)) {
          errors.push(this._fields.id);
        }
      } else {
        errors.push(this._fields.id);
      }

      if (plateNumber) {
        if (!Validator.isLength(plateNumber, { min: 5, max: 255 })) {
          errors.push(this._fields.plateNumber);
        }
      } else {
        errors.push(this._fields.plateNumber);
      }

      if (model) {
        if (!Validator.isLength(model, { min: 5, max: 20 })) {
          errors.push(this._fields.model);
        }
      } else {
        errors.push(this._fields.model);
      }

      if (transportType) {
        if (!Validator.isUUID(transportType, 4)) {
          errors.push(this._fields.transportType);
        }
      } else {
        errors.push(this._fields.transportType);
      }

      if (dateOfPurchase) {
        if (!Validator.isDate(dateOfPurchase)) {
          errors.push(this._fields.dateOfPurchase);
        }
      } else {
        errors.push(this._fields.dateOfPurchase);
      }

      if (mileage) {
        if (!Validator.isNumber(mileage)) {
          errors.push(this._fields.mileage);
        }
      } else {
        errors.push(this._fields.mileage);
      }

      if (isFree !== undefined) {
        if (!Validator.isBoolean(isFree)) {
          errors.push(this._fields.isFree);
        }
      } else {
        errors.push(this._fields.isFree);
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

export { UpdateTransportRequest };
