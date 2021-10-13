import RedisSession from '../framework/server/http/session/redis';
import { Session } from '../framework/settings';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import { createClient } from 'redis';

const client = createClient();
const redisSession = new RedisSession(client);

const session: Session = {
  idName: 'ssid',
  idGenerator: uuidv4,
  expire: 10,
  httpOnly: true,
  provider: redisSession,
};

export default session;
