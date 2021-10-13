import { request } from '~/bootstrap/db';
import { Route } from '~/app/types/routes';
import { RoutesModelContract } from './contracts';

class RoutesModel implements RoutesModelContract {
  protected _tableName = 'routes';

  public getList(): Promise<Route[] | never> {
    return request(`SELECT 
                      rt.id AS id,
                      rt.distance AS distance,
                      rt.revenue AS revenue,
                      rt.start_date AS start_date,
                      rt.end_date AS end_date,
                      tr.model AS transport,
                      cts.name AS city_start,
                      cte.name AS city_end,
                      tt.name AS transport_type,
                      rs.name AS status
                    FROM ${this._tableName} AS rt
                    LEFT JOIN transports AS tr ON rt.transport=tr.id
                    LEFT JOIN cities AS cts ON rt.city_start=cts.id
                    LEFT JOIN cities AS cte ON rt.city_end=cte.id
                    LEFT JOIN transport_types AS tt ON rt.transport_type=tt.id
                    LEFT JOIN route_statuses AS rs ON rt.status=rs.id
      `).then((result) => this.convertRoutes(result.rows));
  }

  public getRouteById(id: string): Promise<Route[] | never> {
    return request(`SELECT * FROM ${this._tableName} WHERE id='${id}'`).then((result) =>
      this.convertRoutes(result.rows)
    );
  }

  public createRoute(data: Route): Promise<Route | never> {
    return request(`INSERT INTO ${this._tableName}
      (
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
        '${data.id}',
        '${data.cityStart}',
        '${data.cityEnd}',
        ${data.distance},
        '${data.transportType}',
        ${data.revenue},
        '${data.status}',
        '${data.transport}',
        '${data.startDate}',
        '${data.endDate}'
      )
    `).then(() => data);
  }

  public deleteRoute(id: string): Promise<number | never> {
    return request(`DELETE FROM ${this._tableName} WHERE id='${id}'`).then((result) => {
      return result.rowCount;
    });
  }

  public updateRoute(data: Route): Promise<Route | never> {
    return request(`
      UPDATE ${this._tableName} SET
        city_start='${data.cityStart}',
        city_end='${data.cityEnd}',
        distance='${data.distance}',
        transport_type='${data.transportType}',
        revenue='${data.revenue}',
        status='${data.status}',
        transport='${data.transport}',
        start_date='${data.startDate}',
        end_date='${data.endDate}'
      WHERE id='${data.id}'
    `).then(() => {
      return data;
    });
  }

  public checkExistRouteById(id: string): Promise<boolean | never> {
    return request(`SELECT EXISTS (SELECT 0 FROM ${this._tableName} WHERE id='${id}')`).then((result) => {
      return result.rows[0].exists;
    });
  }

  protected convertRoutes(rows: any[]): Route[] {
    return rows.map((el: any) => {
      return {
        id: el.id,
        cityStart: el.city_start,
        cityEnd: el.city_end,
        distance: el.distance,
        transportType: el.transport_type,
        revenue: el.revenue,
        status: el.status,
        transport: el.transport,
        startDate: el.start_date,
        endDate: el.end_date,
      };
    });
  }
}

export { RoutesModel };
