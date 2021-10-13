import { Validator } from '~/framework/extensions/validator';
import { BeforeMiddleware } from '~/framework/contracts/middleware';
import { Context } from '~/framework/types/context';

class CreateRouteRequest implements BeforeMiddleware {
  protected _fields = {
    cityStart: 'cityStart',
    cityEnd: 'cityEnd',
    distance: 'distance',
    transportType: 'transportType',
    revenue: 'revenue',
    status: 'status',
    transport: 'transport',
    startDate: 'startDate',
    endDate: 'endDate',
  };

  public handle(ctx: Context, next: Function) {
    try {
      const errors: string[] = [];
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

      if (cityStart) {
        if (!Validator.isUUID(cityStart, 4)) {
          errors.push(this._fields.cityStart);
        }
      } else {
        errors.push(this._fields.cityStart);
      }

      if (cityEnd) {
        if (!Validator.isUUID(cityEnd, 4)) {
          errors.push(this._fields.cityEnd);
        }
      } else {
        errors.push(this._fields.cityEnd);
      }

      if (distance) {
        if (!Validator.isNumber(distance)) {
          errors.push(this._fields.distance);
        }
      } else {
        errors.push(this._fields.distance);
      }

      if (transportType) {
        if (!Validator.isUUID(transportType, 4)) {
          errors.push(this._fields.transportType);
        }
      } else {
        errors.push(this._fields.transportType);
      }

      if (revenue) {
        if (!Validator.isNumber(revenue)) {
          errors.push(this._fields.revenue);
        }
      } else {
        errors.push(this._fields.revenue);
      }

      if (status) {
        if (!Validator.isUUID(status, 4)) {
          errors.push(this._fields.status);
        }
      } else {
        errors.push(this._fields.status);
      }

      if (transport) {
        if (!Validator.isUUID(transport, 4)) {
          errors.push(this._fields.transport);
        }
      } else {
        errors.push(this._fields.transport);
      }

      if (startDate) {
        if (!Validator.isDate(startDate)) {
          errors.push(this._fields.startDate);
        }
      } else {
        errors.push(this._fields.startDate);
      }

      if (startDate) {
        if (!Validator.isDate(endDate)) {
          errors.push(this._fields.endDate);
        }
      } else {
        errors.push(this._fields.endDate);
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

export { CreateRouteRequest };
