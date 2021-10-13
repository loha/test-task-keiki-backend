import { CheckTransportExistMiddleware } from '~/app/middlewares/transports/checkTransportExist';
import { CheckTransportExistByIdMiddleware } from '~/app/middlewares/transports/checkTransportExistById';
import { transportsModel } from '~/app/providers/models';

const checkTransportExistMiddleware = new CheckTransportExistMiddleware(transportsModel);
const checkTransportExistByIdMiddleware = new CheckTransportExistByIdMiddleware(transportsModel);

export { checkTransportExistMiddleware, checkTransportExistByIdMiddleware };
