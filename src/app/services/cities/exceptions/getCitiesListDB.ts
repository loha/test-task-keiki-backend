import { HttpException } from '~/framework/exception';

class GetCitiesListDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetCitiesListDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetCitiesListDBException };
