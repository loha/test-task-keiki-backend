import { request } from '~/bootstrap/db';
import { Migration } from '~/framework/contracts/database';

export class TransportTypesMigration implements Migration {
  protected _tableName = 'transport_types';

  public async migrate(): Promise<boolean> {
    try {
      const isExist = await request(`SELECT to_regclass('${this.tableName}')`).then((result) => {
        return !!result.rows[0].to_regclass;
      });

      if (!isExist) {
        await request(`
          CREATE TABLE IF NOT EXISTS "${this.tableName}"(
            "id" UUID NOT NULL,
            "name" VARCHAR(255) NOT NULL
          );
          ALTER TABLE
            "transport_types" ADD PRIMARY KEY("id");
        `);
      }

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

  public get tableName() {
    return this._tableName;
  }
}
