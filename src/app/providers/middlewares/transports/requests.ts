import { GetTransportsListRequest } from '~/app/middlewares/transports/requests/getList';
import { GetTransportByIdRequest } from '~/app/middlewares/transports/requests/getTransportById';
import { CreateTransportRequest } from '~/app/middlewares/transports/requests/createTransport';
import { DeleteTransportRequest } from '~/app/middlewares/transports/requests/deleteTransport';
import { UpdateTransportRequest } from '~/app/middlewares/transports/requests/updateTransport';

const getTransportsListRequest = new GetTransportsListRequest();
const getTransportByIdRequest = new GetTransportByIdRequest();
const createTransportRequest = new CreateTransportRequest();
const deleteTransportRequest = new DeleteTransportRequest();
const updateTransportRequest = new UpdateTransportRequest();

export {
  getTransportsListRequest,
  getTransportByIdRequest,
  createTransportRequest,
  deleteTransportRequest,
  updateTransportRequest,
};
