import { CheckRouteExistByIdMiddleware } from '~/app/middlewares/routes/checkRouteExistById';
import { routesModel } from '~/app/providers/models';

const checkRouteExistByIdMiddleware = new CheckRouteExistByIdMiddleware(routesModel);

export { checkRouteExistByIdMiddleware };
