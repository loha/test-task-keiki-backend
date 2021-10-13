import { AfterMiddleware, BeforeMiddleware } from './middleware';

export interface ControllerExtension {
  useBefore(middlewares: Function[]): ControllerExtension;
  useAfter(middlewares: Function[]): ControllerExtension;
}
