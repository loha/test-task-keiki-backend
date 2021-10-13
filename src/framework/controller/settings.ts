import { Objectable, BeforeMiddleware, AfterMiddleware } from '../contracts';
import { Settings } from '../types/controller';

class ControllerSettings implements Objectable {
  protected _data?: any;
  protected _handler: Function;
  protected _beforeMiddlewares?: Function[] | undefined;
  protected _afterMiddlewares?: Function[] | undefined;

  public setData(data: any): ControllerSettings {
    this._data = data;
    return this;
  }

  public setHandler(handler: Function): ControllerSettings {
    this._handler = handler;
    return this;
  }

  public useBefore(middlewares: Function[]): ControllerSettings {
    this._beforeMiddlewares = middlewares;
    return this;
  }

  public useAfter(middlewares: Function[]): ControllerSettings {
    this._afterMiddlewares = middlewares;
    return this;
  }

  public toObject(): Settings {
    const obj: Settings = {
      handler: this._handler,
    };

    if (this._data) obj.data = this._data;
    if (this._beforeMiddlewares) obj.beforeMiddlewares = this._beforeMiddlewares;
    if (this._afterMiddlewares) obj.afterMiddlewares = this._afterMiddlewares;

    return obj;
  }
}

export default ControllerSettings;
