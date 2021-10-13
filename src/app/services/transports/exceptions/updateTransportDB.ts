import { HttpException } from '~/framework/exception';

class UpdateTransportDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'UpdateTransportDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { UpdateTransportDBException };
