import Cookie from './cookie';
import config from '../../provider/settings/config';
import { Request } from './request';
import { Response } from './response';
import { Session } from './session';
import { RouterContract } from '../../contracts';
import { throwHttpExceptionResponse } from '../../exception';
import { BadRequestHeadersHttpException } from '../../exception/header/badRequestHeadersHttpException';
import { BedRequestBodyHTTPException } from '../../exception/body/bedRequestBodyHTTPException';

const requestTypeWithoutBody: Array<string> = ['GET', 'OPTIONS', 'TRACE', 'CONNECT', 'DELETE'];

function isJsonInterchangeFormat(): boolean {
  return config.getInterchangeFormat() === 'json';
}

function listener(req: any, res: any): void {
  const ctx: any = {};

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  // res.setHeader('Access-Control-Max-Age', '86400');

  setContextCookie(ctx, req, res);
  setContextSession(ctx);

  try {
    handleRequest(ctx, req, res);
  } catch (e) {
    e.status = 500;
    throwHttpExceptionResponse(res, e);
  }
}

function setContextCookie(ctx: any, req: any, res: any) {
  ctx.cookie = new Cookie(req, res);
}

function setContextSession(ctx: any) {
  const session = config.getSession();

  if (session) {
    ctx.session = new Session(session, ctx.cookie);
  }
}

function handleRequest(ctx: any, req: any, res: any): void | never {
  const request = new Request(req);
  const response = new Response(res);
  const router = config.getRouter();

  if (isJsonInterchangeFormat()) {
    response.setHeader('Content-Type', 'application/json');
  }

  if (requestTypeWithoutBody.includes(req.method)) {
    if (request.method === 'OPTIONS') {
      response.status(200)
      response.node.end();
    } else {
      setCtxAndRunRouter(ctx, request, response, router);
    }
  } else {
    if (isJsonInterchangeFormat() && req.headers['content-type'] !== 'application/json') {
      throw new BadRequestHeadersHttpException();
    }

    let body: string = '';
    req.on('data', (chunk: string) => {
      body += chunk;
    });
    req.on('end', () => {
      if (isJsonInterchangeFormat()) {
        try {
          request.body = parseJson(body);

          setCtxAndRunRouter(ctx, request, response, router);
        } catch (e) {
          e.status = 500;
          throwHttpExceptionResponse(res, e);
        }
      } else {
        request.body = body;
        setCtxAndRunRouter(ctx, request, response, router);
      }
    });
  }
}

function parseJson(data: string): object | never {
  try {
    return JSON.parse(data);
  } catch (e) {
    throw new BedRequestBodyHTTPException();
  }
}

function setCtxAndRunRouter(ctx: any, request: Request, response: Response, router: RouterContract): void {
  ctx.request = request;
  ctx.response = response;

  try {
    router.handle(ctx);
  } catch (e) {
    e.status = 500;
    throwHttpExceptionResponse(response.node, e);
  }
}

export default listener;
