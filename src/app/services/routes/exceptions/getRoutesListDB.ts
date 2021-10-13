import { HttpException } from '~/framework/exception';

class GetRoutesListDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetRoutesListDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetRoutesListDBException };
