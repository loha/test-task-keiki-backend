interface ResponseContract {
  node: any;
  status(value: number): ResponseContract;
  setHeader(key: string, value: string): ResponseContract;
  send(value: any): void;
  sendJSON(value: any): void;
}

class Response implements ResponseContract {
  protected _response: any;

  public constructor(nodeResponse: any) {
    this._response = nodeResponse;
  }

  public get node(): any {
    return this._response;
  }

  public status(value: number): Response {
    this._response.statusCode = value;
    return this;
  }

  public send(value: any): void {
    this._response.end(value);
  }

  public sendJSON(value: any): void {
    this._response.end(JSON.stringify(value));
  }

  public setHeader(key: string, value: string): Response {
    this._response.setHeader(key, value);

    return this;
  }
}

export { ResponseContract, Response };
