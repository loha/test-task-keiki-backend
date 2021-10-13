import { RequestContract } from '../server/http/request';
import { ResponseContract } from '../server/http/response';
// import Cookie from '../server/http/cookie';

export type Context = {
  request: RequestContract;
  response: ResponseContract;
  // cookie: Cookie;
};
