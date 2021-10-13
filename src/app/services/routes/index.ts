import { v4 as uuid } from 'uuid';
import { RoutesModelContract } from '~/app/models/contracts';
import { Route } from '~/app/types/routes';
import { RoutesServiceContract } from './contracts';
import { GetRoutesListDBException } from './exceptions/getRoutesListDB';
import { GetRouteByIdDBException } from './exceptions/getRouteByIdDB';
import { CreateRouteDBException } from './exceptions/createRouteDB';
import { DeleteRouteDBException } from './exceptions/deleteRouteDB';
import { UpdateRouteDBException } from './exceptions/updateRouteDB';

class RoutesService implements RoutesServiceContract {
  protected routesModel: RoutesModelContract;

  public constructor(routesModel: RoutesModelContract) {
    this.routesModel = routesModel;
  }

  public async getList(): Promise<Route[] | never> {
    try {
      return await this.routesModel.getList();
    } catch (e) {
      throw new GetRoutesListDBException(e.stack);
    }
  }

  public async getRouteById(id: string): Promise<Route | null | never> {
    try {
      const result = await this.routesModel.getRouteById(id);

      if (result.length) {
        return result[0];
      }

      return null;
    } catch (e) {
      throw new GetRouteByIdDBException(e.stack);
    }
  }

  public async createRoute(data: Route): Promise<Route | never> {
    try {
      data.id = uuid();

      return await this.routesModel.createRoute(data);
    } catch (e) {
      throw new CreateRouteDBException(e.stack);
    }
  }

  public async deleteRoute(id: string): Promise<number | never> {
    try {
      return await this.routesModel.deleteRoute(id);
    } catch (e) {
      throw new DeleteRouteDBException(e.stack);
    }
  }

  public async updateRoute(data: Route): Promise<Route | never> {
    try {
      return await this.routesModel.updateRoute(data);
    } catch (e) {
      throw new UpdateRouteDBException(e.stack);
    }
  }
}

export { RoutesService };
