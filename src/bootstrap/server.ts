import http from 'http';
import listener from '~/framework/server/http/listener';
import config from '~/framework/provider/settings/config';
import routes from '~/routes/web';
require('dotenv').config();
// import session from './bootstrap/session';

async function start(): Promise<void | never> {
  config.setRouter(routes);
  config.setInterchangeFormat('json');
  // config.setSession(session);

  const server = http.createServer(listener);
  server.listen(process.env.APP_PORT);
}

export { start };
