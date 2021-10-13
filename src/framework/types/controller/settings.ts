import { BeforeMiddleware, AfterMiddleware } from '../../contracts';

export type Settings = {
  handler: Function;
  data?: any;
  beforeMiddlewares?: Function[];
  afterMiddlewares?: Function[];
};
