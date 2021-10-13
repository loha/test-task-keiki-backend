import { HttpException } from '~/framework/exception';

class DeleteTransportDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'DeleteTransportDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { DeleteTransportDBException };
