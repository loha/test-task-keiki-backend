import { HttpException } from '~/framework/exception';

class GetRouteStatusesListDBException extends HttpException {
  public constructor(stack: string) {
    super('Internal server error');
    this.status = 500;
    this.title = 'GetRouteStatusesListDBException';
    this.detail = 'Internal server error';
    this.stack = stack;
  }
}

export { GetRouteStatusesListDBException };
