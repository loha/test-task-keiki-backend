import data from './data.json';
import { pool } from '~/bootstrap/db';
import { SeederContract } from '~/framework/contracts/database';

export class TransportsSeeder implements SeederContract {
  protected _tableName = 'transports';

  public async fill(): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (const transport of data) {
        await client.query(`INSERT INTO ${this.tableName} (
                              id,
                              plate_number,
                              model,
                              transport_type,
                              date_of_purchase,
                              mileage,
                              is_free
                            ) VALUES (
                              '${transport.id}',
                              '${transport.plateNumber}',
                              '${transport.model}',
                              '${transport.transportType}',
                              '${transport.dateOfPurchase}',
                              ${transport.mileage},
                              ${transport.isFree}
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
