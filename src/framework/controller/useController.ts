import { BeforeMiddleware, AfterMiddleware } from '../contracts';
import { Settings } from '../types/controller';
import { Validator } from '../extensions/validator';

const types = {
  beforeMiddleware: 0,
  controller: 1,
  afterMiddleware: 2,
};

async function useController(settings: Settings) {
  const data: any = settings.data;
  const beforeMiddlewares: Function[] | undefined = settings.beforeMiddlewares;
  const afterMiddlewares: Function[] | undefined = settings.afterMiddlewares;
  const controllerHandler = settings.handler;
  const stack: Array<any> = [];

  addBeforeMiddlewaresInStack(stack, beforeMiddlewares);
  addControllersInStack(stack, controllerHandler);
  addAfterMiddlewaresInStack(stack, afterMiddlewares);
  make(stack, data);
}

function addBeforeMiddlewaresInStack(stack: Array<any>, beforeMiddlewares: Function[] | undefined) {
  if (beforeMiddlewares) {
    const beforeMiddlewareType: number = types.beforeMiddleware;

    for (const middleware of beforeMiddlewares) {
      stack.push([beforeMiddlewareType, middleware]);
    }
  }
}

function addControllersInStack(stack: Array<any>, controllerHandler: Function) {
  stack.push([types.controller, controllerHandler]);
}

function addAfterMiddlewaresInStack(stack: Array<any>, afterMiddlewares: Function[] | undefined) {
  if (afterMiddlewares) {
    const afterMiddlewareType: number = types.afterMiddleware;

    stack.push([afterMiddlewareType, afterMiddlewares]);
  }
}

function make(stack: BeforeMiddleware | Function | Array<AfterMiddleware> | any, data: any) {
  const next = async (): Promise<void> => {
    if (stack.length) {
      const middlewareSettings: Array<any> = stack.shift()!;
      const type: number = middlewareSettings[0];
      const handler: Function | Function[] | any = middlewareSettings[1];

      if (types.beforeMiddleware === type) {
        handler(data, next);
      } else if (types.controller === type) {
        executeController(handler, data, next);
      } else if (types.afterMiddleware === type) {
        for (const middleware of handler) {
          middleware(data);
        }
      }
    }
  };

  next();
}

async function executeController(handler: Function, data: any, next: Function) {
  if (Validator.isPromise(handler)) {
    await handler(data);
  } else {
    handler(data);
  }

  next();
}

export default useController;
