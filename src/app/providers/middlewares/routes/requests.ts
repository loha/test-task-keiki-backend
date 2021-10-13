import { GetRouteByIdRequest } from '~/app/middlewares/routes/requests/getRouteById';
import { CreateRouteRequest } from '~/app/middlewares/routes/requests/createRoute';
import { DeleteRouteRequest } from '~/app/middlewares/routes/requests/deleteRoute';
import { UpdateRouteRequest } from '~/app/middlewares/routes/requests/updateRoute';

const getRouteByIdRequest = new GetRouteByIdRequest();
const createRouteRequest = new CreateRouteRequest();
const deleteRouteRequest = new DeleteRouteRequest();
const updateRouteRequest = new UpdateRouteRequest();

export { getRouteByIdRequest, createRouteRequest, deleteRouteRequest, updateRouteRequest };
