import { HttpException } from '~/framework/exception';

class CreateTransportDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'CreateTransportDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { CreateTransportDBException };
