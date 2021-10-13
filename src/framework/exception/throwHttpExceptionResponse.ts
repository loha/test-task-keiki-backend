import { HttpException } from '../exception';

function throwHttpExceptionResponse(res: any, e: HttpException) {
  res.statusCode = e.status;
  res.end(
    JSON.stringify({
      status: e.status,
      message: e.message,
      detail: e.detail,
    })
  );
}

export default throwHttpExceptionResponse;
