import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT!),
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

type PGQuery = {
  name?: string;
  text: string;
  values?: any[];
  rowMode?: string;
};

/**
 * Request to database
 *
 * @param {string|PGQuery} query
 */
function request(query: string | PGQuery): Promise<any | never> {
  return new Promise((resolve, reject) => {
    pool.connect().then((client) => {
      return client
        .query(query)
        .then((res) => {
          client.release();
          resolve(res);
        })
        .catch((err) => {
          client.release();
          reject(err);
        });
    });
  });
}

export { pool, request };
