import { RouterContract, RouterHttpRequests, ControllerExtension } from '../contracts';
import { useController, ControllerSettings } from '../controller';
import { UndefinedRouteHttpException } from '../exception/router';
import { HttpRequestTypes } from '../constants/httpRequestTypes';
import { Context } from '../types/context';

type AddRouteParams = {
  path: string;
  method: string;
  handler: Function;
};

type GetControllerSettingsParams = {
  path: string;
  method: string;
};

enum RoutesUniqueParamsNames {
  DYNAMIC_PARAM = '__var__',
  HANDLER = '__handler__',
}

class Router implements RouterContract, RouterHttpRequests {
  protected _routes = {};

  public constructor() {
    this._routes[HttpRequestTypes.GET] = {};
    this._routes[HttpRequestTypes.POST] = {};
    this._routes[HttpRequestTypes.PUT] = {};
    this._routes[HttpRequestTypes.DELETE] = {};
    this._routes[HttpRequestTypes.PATCH] = {};
  }

  public get(path: string, handler: Function): ControllerExtension {
    return this.addRoute({ path, handler, method: HttpRequestTypes.GET });
  }

  public post(path: string, handler: Function): ControllerExtension {
    return this.addRoute({ path, handler, method: HttpRequestTypes.POST });
  }

  public put(path: string, handler: Function): ControllerExtension {
    return this.addRoute({ path, handler, method: HttpRequestTypes.PUT });
  }

  public delete(path: string, handler: Function): ControllerExtension {
    return this.addRoute({ path, handler, method: HttpRequestTypes.DELETE });
  }

  public patch(path: string, handler: Function): ControllerExtension {
    return this.addRoute({ path, handler, method: HttpRequestTypes.PATCH });
  }

  /**
   * Creating router tree
   *
   * @param {AddRouteParams}
   * @returns {ControllerExtension}
   */
  protected addRoute({ path, method, handler }: AddRouteParams): ControllerExtension {
    const route = new ControllerSettings();

    route.setHandler(handler);

    const splitPath = path.split('/');
    splitPath.shift();

    let routeWay = this._routes[method];

    for (let i = 0; i < splitPath.length; i++) {
      const name = splitPath[i];
      const isLast = i === splitPath.length - 1;
      const isParam = name.includes(':');
      const paramName = isParam ? name.split(':')[1] : null;
      const isExistName = !!routeWay[name];
      let isExistParam = false;

      if (isParam) {
        if (routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM]) {
          isExistParam = !!routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM][paramName];
        }
      }

      if (isExistName) {
        routeWay = routeWay[name];
      } else if (isExistParam) {
        routeWay = routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM][paramName];
      } else {
        if (isParam) {
          routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM] = {};

          routeWay = routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM];

          if (isLast) {
            routeWay[paramName!] = {};
            routeWay = routeWay[paramName!];
            routeWay[RoutesUniqueParamsNames.HANDLER] = route;
          } else {
            routeWay[paramName!] = {};
            routeWay = routeWay[paramName!];
          }
        } else {
          if (isLast) {
            routeWay[name] = {};
            routeWay = routeWay[name];
            routeWay[RoutesUniqueParamsNames.HANDLER] = route;
          } else {
            routeWay[name] = {};
            routeWay = routeWay[name];
          }
        }
      }
    }

    return route;
  }

  public handle(ctx: Context): void | never {
    const path = ctx.request.pathname;
    const method = ctx.request.method;
    const controller = this.getControllerSettingsAndRequestParams({
      path,
      method,
    });

    if (controller) {
      ctx.request.params = controller.params;

      useController(controller.settings.setData(ctx).toObject());
    } else {
      throw new UndefinedRouteHttpException();
    }
  }

  protected getControllerSettingsAndRequestParams({
    path,
    method,
  }: GetControllerSettingsParams): { settings: ControllerSettings; params: any } | null {
    const splitPath = path.split('/');
    splitPath.shift();

    let routeWay = this._routes[method];
    let isDynamicParam = false;
    let dynamicParamValue = '';
    let requestParams = {};

    for (let i = 0; i < splitPath.length; i++) {
      const name = splitPath[i];
      const isLast = i === splitPath.length - 1;

      if (isDynamicParam) {
        isDynamicParam = false;

        if (isLast) {
          for (const param in routeWay) {
            const handler = routeWay[param][RoutesUniqueParamsNames.HANDLER];

            if (handler) {
              requestParams[param] = name;

              return {
                params: requestParams,
                settings: handler,
              };
            }
          }

          return null;
        } else {
          let isExistRoute = false;

          for (const param in routeWay) {
            const route = routeWay[param][name];

            if (route) {
              isExistRoute = true;

              requestParams[param] = dynamicParamValue;
              routeWay = route;
            }
          }

          if (!isExistRoute) {
            return null;
          }
        }

        // Check route exist
      } else if (routeWay[name]) {
        if (isLast) {
          return {
            params: requestParams,
            settings: routeWay[name][RoutesUniqueParamsNames.HANDLER],
          };
        } else {
          routeWay = routeWay[name];
        }
      } else {
        const isExistDynamicParam = !!routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM];

        if (isExistDynamicParam) {
          if (isLast) {
            routeWay = routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM];

            for (const param in routeWay) {
              if (routeWay[param][RoutesUniqueParamsNames.HANDLER]) {
                requestParams[param] = name;

                return {
                  params: requestParams,
                  settings: routeWay[param][RoutesUniqueParamsNames.HANDLER],
                };
              }
            }

            return null;
          } else {
            isDynamicParam = true;
            dynamicParamValue = name;

            routeWay = routeWay[RoutesUniqueParamsNames.DYNAMIC_PARAM];
          }
        } else {
          return null;
        }
      }
    }

    return null;
  }
}

export default Router;
