import { HttpException } from '~/framework/exception';

class GetTransportTypesListDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetTransportTypesListDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetTransportTypesListDBException };
