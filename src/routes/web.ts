import { Router } from '../framework/router';

// Reqeusts
import {
  getRouteByIdRequest,
  createRouteRequest,
  deleteRouteRequest,
  updateRouteRequest,
} from '~/app/providers/middlewares/routes/requests';
import {
  getTransportsListRequest,
  getTransportByIdRequest,
  createTransportRequest,
  deleteTransportRequest,
  updateTransportRequest,
} from '~/app/providers/middlewares/transports/requests';

// Middlewares
import { checkRouteExistByIdMiddleware } from '~/app/providers/middlewares/routes';
import {
  checkTransportExistMiddleware,
  checkTransportExistByIdMiddleware,
} from '~/app/providers/middlewares/transports';

// Controllers
import {
  routesController,
  citiesController,
  routeStatusesController,
  transportTypesController,
  transportsController,
} from '~/app/providers/controllers';

const router = new Router();

/**
 * Routes endoints
 */
router.get('/api/route/list', routesController.getRoutesList.bind(routesController));

router
  .get('/api/route/:id', routesController.getRouteById.bind(routesController))
  .useBefore([getRouteByIdRequest.handle.bind(getRouteByIdRequest)]);

router
  .post('/api/route', routesController.createRoute.bind(routesController))
  .useBefore([createRouteRequest.handle.bind(createRouteRequest)]);

router
  .delete('/api/route/:id', routesController.deleteRoute.bind(routesController))
  .useBefore([
    deleteRouteRequest.handle.bind(deleteRouteRequest),
    checkRouteExistByIdMiddleware.handle.bind(checkRouteExistByIdMiddleware),
  ]);

router
  .put('/api/route/:id', routesController.updateRoute.bind(routesController))
  .useBefore([
    updateRouteRequest.handle.bind(updateRouteRequest),
    checkRouteExistByIdMiddleware.handle.bind(checkRouteExistByIdMiddleware),
  ]);

/**
 * Cities endpoints
 */
router.get('/api/city/list', citiesController.getList.bind(citiesController));

/**
 * Route statuses endpoints
 */
router.get('/api/route-status/list', routeStatusesController.getList.bind(routeStatusesController));

/**
 * Transport types endpoints
 */
router.get('/api/transport-type/list', transportTypesController.getList.bind(transportTypesController));

/**
 * Transports endpoints
 */
router
  .get('/api/transport/list', transportsController.getList.bind(transportsController))
  .useBefore([getTransportsListRequest.handle.bind(getTransportsListRequest)]);

router
  .get('/api/transport/:id', transportsController.getTransportById.bind(transportsController))
  .useBefore([getTransportByIdRequest.handle.bind(getTransportByIdRequest)]);

router
  .post('/api/transport', transportsController.createTransport.bind(transportsController))
  .useBefore([
    createTransportRequest.handle.bind(createTransportRequest),
    checkTransportExistMiddleware.handle.bind(checkTransportExistMiddleware),
  ]);

router
  .delete('/api/transport/:id', transportsController.deleteTransport.bind(transportsController))
  .useBefore([
    deleteTransportRequest.handle.bind(deleteTransportRequest),
    checkTransportExistByIdMiddleware.handle.bind(checkTransportExistByIdMiddleware),
  ]);

router
  .put('/api/transport/:id', transportsController.updateTransport.bind(transportsController))
  .useBefore([
    updateTransportRequest.handle.bind(updateTransportRequest),
    checkTransportExistByIdMiddleware.handle.bind(checkTransportExistByIdMiddleware),
  ]);

export default router;
