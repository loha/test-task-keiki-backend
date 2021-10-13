import BaseValidator from 'validator';
import moment from 'moment';

class CustomValidator {
  public static isPromise(value: any): boolean {
    return value instanceof Promise;
  }

  public static isString(value: any): boolean {
    return typeof value === 'string';
  }

  public static isNumber(value: any): boolean {
    if (this.isString(value)) {
      try {
        value = parseFloat(value);
      } catch (_e) {}
    }
    return typeof value === 'number';
  }

  public static isDate(value: any): boolean {
    return moment(value).isValid();
  }

  public static isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}

Object.setPrototypeOf(CustomValidator, BaseValidator);

const Validator: any = CustomValidator;

export { Validator };
