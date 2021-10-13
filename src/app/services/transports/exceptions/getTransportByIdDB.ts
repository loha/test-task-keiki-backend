import { HttpException } from '~/framework/exception';

class GetTransportByIdDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetTransportByIdDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetTransportByIdDBException };
