import { HttpException } from '~/framework/exception';

class CreateRouteDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'CreateRouteDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { CreateRouteDBException };
