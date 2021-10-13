import { HttpException } from '..';

class BedRequestBodyHTTPException extends HttpException {
  public constructor() {
    super('Wrong body');
    this.status = 400;
    this.title = 'BedRequestBodyHTTPException';
    this.detail = 'Body format is incorrect';
  }
}

export { BedRequestBodyHTTPException };
