import { HttpException } from '~/framework/exception';

class DeleteRouteDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'DeleteRouteDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { DeleteRouteDBException };
