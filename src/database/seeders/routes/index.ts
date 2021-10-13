import data from './data.json';
import { pool } from '~/bootstrap/db';
import { SeederContract } from '~/framework/contracts/database';

export class RoutesSeeder implements SeederContract {
  protected _tableName = 'routes';

  public async fill(): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (const route of data) {
        await client.query(`INSERT INTO ${this.tableName} (
                              id,
                              city_start,
                              city_end,
                              distance,
                              transport_type,
                              revenue,
                              status,
                              transport,
                              start_date,
                              end_date
                            ) VALUES (
                              '${route.id}',
                              '${route.cityStart}',
                              '${route.cityEnd}',
                              ${route.distance},
                              '${route.transportType}',
                              ${route.revenue},
                              '${route.status}',
                              '${route.transport}',
                              '${route.startDate}',
                              '${route.endDate}'
                            )`);
      }

      await client.query('COMMIT');

      return true;
    } catch (err) {
      console.log(err);

      await client.query('ROLLBACK');

      return false;
    } finally {
      client.release();
    }
  }

  public get tableName(): string {
    return this._tableName;
  }
}
