import { RouterContract } from '../contracts';
import { Session } from './';

export interface ConfigContract {
  setRouter(value: RouterContract): void;
  getRouter(): RouterContract;
  setSession(value: Session): void;
  getSession(): Session | null;
}

export type InterchangeFormat = 'json';

class Config implements ConfigContract {
  protected _router: RouterContract;
  protected _session: Session | null = null;
  protected _cookie: any; // TODO: settiongs cookie
  protected _interchangeFormat: InterchangeFormat | null = null;

  public setRouter(value: RouterContract): void {
    this._router = value;
  }

  public getRouter(): RouterContract {
    return this._router;
  }

  public setSession(value: Session): void {
    this._session = value;
  }

  public getSession(): Session | null {
    return this._session;
  }

  public setInterchangeFormat(value: InterchangeFormat): void {
    this._interchangeFormat = value;
  }

  public getInterchangeFormat(): string | null {
    return this._interchangeFormat;
  }
}

export default Config;
