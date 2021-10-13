import { HttpException } from '..';

class BadRequestHeadersHttpException extends HttpException {
  public constructor() {
    super('Wrong headers');
    this.status = 400;
    this.title = 'BadRequestHeadersHttpException';
    this.detail = 'Headers you pass is wrong';
  }
}

export { BadRequestHeadersHttpException };
