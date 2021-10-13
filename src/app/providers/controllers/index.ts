import { RoutesController } from '~/app/controllers/routes';
import { CitiesController } from '~/app/controllers/cities';
import { RouteStatusesController } from '~/app/controllers/routeStatuses';
import { TransportTypesController } from '~/app/controllers/transportTypes';
import { TransportsController } from '~/app/controllers/transports';
import {
  routesService,
  citiesService,
  routeStatusesService,
  transportTypesService,
  transportsService,
} from '../services';

const routesController = new RoutesController(routesService);
const citiesController = new CitiesController(citiesService);
const routeStatusesController = new RouteStatusesController(routeStatusesService);
const transportTypesController = new TransportTypesController(transportTypesService);
const transportsController = new TransportsController(transportsService);

export { routesController, citiesController, routeStatusesController, transportTypesController, transportsController };
