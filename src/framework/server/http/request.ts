import { parse as urlParse } from 'url';

interface RequestContract {
  node: any;
  body: any;
  host: string;
  query: any;
  pathname: string;
  method: string;
  params: any;
}

class Request implements RequestContract {
  protected _body: any;
  protected _request: any;
  protected _query: any;
  protected _pathname: string;
  protected _method: string;
  protected _params: any;

  public constructor(nodeRequest: any) {
    const parsedUrl = urlParse(nodeRequest.url, true);
    this._request = nodeRequest;
    this._query = parsedUrl.query;
    this._pathname = parsedUrl.pathname!; // TODO: can be null
    this._method = nodeRequest.method;
    this._params = {};

    Object.setPrototypeOf(this.query, {});
  }

  public get node(): any {
    return this._request;
  }

  public set body(value: any) {
    this._body = value;
  }

  public get body(): any {
    return this._body;
  }

  public get host(): string {
    return this._request.headers.host;
  }

  public get query(): any {
    return this._query;
  }

  public get pathname(): string {
    return this._pathname;
  }

  public get method(): string {
    return this._method;
  }

  public get params(): any {
    return this._params;
  }

  public set params(value: any) {
    this._params = value;
  }
}

export { RequestContract, Request };
