import { request } from '~/bootstrap/db';
import { Migration } from '~/framework/contracts/database';

export class RoutesMigration implements Migration {
  protected _tableName = 'routes';

  public async migrate(): Promise<boolean> {
    try {
      const isExist = await request(`SELECT to_regclass('${this.tableName}')`).then((result) => {
        return !!result.rows[0].to_regclass;
      });

      if (!isExist) {
        await request(`
          CREATE TABLE IF NOT EXISTS "${this.tableName}"(
            "id" UUID NOT NULL,
            "city_start" UUID NOT NULL,
            "city_end" UUID NOT NULL,
            "distance" DOUBLE PRECISION NOT NULL,
            "transport_type" UUID NOT NULL,
            "revenue" DOUBLE PRECISION NOT NULL,
            "status" UUID NOT NULL,
            "transport" UUID NOT NULL,
            "start_date" DATE NOT NULL,
            "end_date" DATE NOT NULL
          );
          ALTER TABLE "routes" ADD PRIMARY KEY("id");
          ALTER TABLE
            "routes" ADD CONSTRAINT "routes_city_end_foreign"
            FOREIGN KEY("city_end") REFERENCES "cities"("id");
          ALTER TABLE
            "routes" ADD CONSTRAINT "routes_city_start_foreign"
            FOREIGN KEY("city_start") REFERENCES "cities"("id");
          ALTER TABLE
            "routes" ADD CONSTRAINT "routes_transport_type_foreign"
            FOREIGN KEY("transport_type") REFERENCES "transport_types"("id");
          ALTER TABLE
            "routes" ADD CONSTRAINT "routes_status_foreign"
            FOREIGN KEY("status") REFERENCES "route_statuses"("id");
          ALTER TABLE
            "routes" ADD CONSTRAINT "routes_transport_foreign"
            FOREIGN KEY("transport") REFERENCES "transports"("id");
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
