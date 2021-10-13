import { HttpException } from '~/framework/exception';

class GetRouteByIdDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetRouteByIdDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetRouteByIdDBException };
