import { RoutesModel } from '~/app/models/routes';
import { CitiesModel } from '~/app/models/cities';
import { RouteStatusesModel } from '~/app/models/routeStatuses';
import { TransportTypesModel } from '~/app/models/transportTypes';
import { TransportModel } from '~/app/models/transports';

const routesModel = new RoutesModel();
const citiesModel = new CitiesModel();
const routeStatusesModel = new RouteStatusesModel();
const transportTypesModel = new TransportTypesModel();
const transportsModel = new TransportModel();

export { routesModel, citiesModel, routeStatusesModel, transportTypesModel, transportsModel };
