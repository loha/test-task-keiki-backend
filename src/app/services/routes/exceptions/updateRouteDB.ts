import { HttpException } from '~/framework/exception';

class UpdateRouteDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'UpdateRouteDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { UpdateRouteDBException };
