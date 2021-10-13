import { HttpException } from '~/framework/exception';

class GetTransportsListDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetTransportsListDB';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetTransportsListDBException };
