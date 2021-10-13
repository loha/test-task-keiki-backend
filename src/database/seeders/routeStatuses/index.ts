import data from './data.json';
import { pool } from '~/bootstrap/db';
import { SeederContract } from '~/framework/contracts/database';

export class RouteStatusesSeeder implements SeederContract {
  protected _tableName = 'route_statuses';

  public async fill(): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (const status of data) {
        await client.query(`INSERT INTO ${this.tableName} (id, name) 
                                VALUES ('${status.id}', '${status.name}')`);
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
