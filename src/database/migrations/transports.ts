import { request } from '~/bootstrap/db';
import { Migration } from '~/framework/contracts/database';

export class TransportsMigration implements Migration {
  protected _tableName = 'transports';

  public async migrate(): Promise<boolean> {
    try {
      const isExist = await request(`SELECT to_regclass('${this.tableName}')`).then((result) => {
        return !!result.rows[0].to_regclass;
      });

      if (!isExist) {
        await request(`
          CREATE TABLE IF NOT EXISTS "${this.tableName}"(
            "id" UUID NOT NULL,
            "plate_number" VARCHAR(255) NOT NULL,
            "model" VARCHAR(255) NOT NULL,
            "transport_type" UUID NOT NULL,
            "date_of_purchase" DATE NOT NULL,
            "mileage" INTEGER NOT NULL,
            "is_free" BOOLEAN NOT NULL
          );
          ALTER TABLE "${this.tableName}" ADD PRIMARY KEY("id");
          ALTER TABLE
            "${this.tableName}" ADD CONSTRAINT "transport_transport_type_foreign"
            FOREIGN KEY("transport_type") REFERENCES "transport_types"("id");
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
