import { RoutesService } from '~/app/services/routes';
import { CitiesService } from '~/app/services/cities';
import { RouteStatusesService } from '~/app/services/routeStatuses';
import { TransportTypesService } from '~/app/services/transportTypes';
import { TransportService } from '~/app/services/transports';
import { routesModel, citiesModel, routeStatusesModel, transportTypesModel, transportsModel } from '../models';

const routesService = new RoutesService(routesModel);
const citiesService = new CitiesService(citiesModel);
const routeStatusesService = new RouteStatusesService(routeStatusesModel);
const transportTypesService = new TransportTypesService(transportTypesModel);
const transportsService = new TransportService(transportsModel);

export { routesService, citiesService, routeStatusesService, transportTypesService, transportsService };
