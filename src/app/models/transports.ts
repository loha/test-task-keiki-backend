import { request } from '~/bootstrap/db';
import { Transport, TransportGetListFilter, CheckTransportExistFilter } from '~/app/types/transports';
import { TransportsModelContract } from './contracts';

class TransportModel implements TransportsModelContract {
  protected _tableName = 'transports';

  public getList(filter: TransportGetListFilter = {}): Promise<Transport[] | never> {
    let condition = '';

    if (Object.keys(filter).length) {
      let addCount = 0;

      condition = 'WHERE ';

      if (filter.hasOwnProperty('isFree')) {
        condition += `is_free=${filter.isFree}`;
        addCount++;
      }

      if (filter.hasOwnProperty('transportType')) {
        if (addCount) {
          condition += ` AND transport_type='${filter.transportType}'`;
        } else {
          condition += `transport_type='${filter.transportType}'`;
        }

        addCount++;
      }
    }

    return request(`SELECT 
                      tr.id AS id,
                      tr.plate_number AS plate_number,
                      tr.model AS model,
                      tt.name AS transport_type,
                      tr.date_of_purchase AS date_of_purchase,
                      tr.mileage AS mileage,
                      tr.is_free AS is_free
                    FROM ${this._tableName} AS tr
                    LEFT JOIN transport_types AS tt ON tr.transport_type=tt.id
                    ${condition}
    `).then((result) => this.convertTransports(result.rows));
  }

  public getTransportById(id: string): Promise<Transport[] | never> {
    return request(`SELECT * FROM ${this._tableName} WHERE id='${id}'`).then((result) =>
      this.convertTransports(result.rows)
    );
  }

  public createTransport(data: Transport): Promise<Transport | never> {
    return request(`INSERT INTO ${this._tableName}
      (
        id,
        plate_number,
        model,
        transport_type,
        date_of_purchase,
        mileage,
        is_free
      ) VALUES (
        '${data.id}',
        '${data.plateNumber}',
        '${data.model}',
        '${data.transportType}',
        '${data.dateOfPurchase}',
        ${data.mileage},
        ${data.isFree}
      )
    `).then(() => data);
  }

  protected convertTransports(rows: any): Transport[] {
    return rows.map((el) => {
      return {
        id: el.id,
        plateNumber: el.plate_number,
        model: el.model,
        transportType: el.transport_type,
        dateOfPurchase: el.date_of_purchase,
        mileage: el.mileage,
        isFree: el.is_free,
      };
    });
  }

  public checkTransportExist(filter: CheckTransportExistFilter): Promise<boolean | never> {
    return request(`SELECT EXISTS (
      SELECT 0 FROM ${this._tableName} WHERE 
        plate_number='${filter.plateNumber}'
        AND model='${filter.model}'
    )`).then((result) => {
      return result.rows[0].exists;
    });
  }

  public deleteTransport(id: string): Promise<number | never> {
    return request(`DELETE FROM ${this._tableName} WHERE id='${id}'`).then((result) => result.rowCount);
  }

  public checkTransportExistById(id: string): Promise<boolean | never> {
    return request(`SELECT EXISTS (SELECT 0 FROM ${this._tableName} WHERE id='${id}')`).then(
      (result) => result.rows[0].exists
    );
  }

  public updateTransport(data: Transport): Promise<Transport | never> {
    return request(`
      UPDATE ${this._tableName} SET
        plate_number='${data.plateNumber}',
        model='${data.model}',
        transport_type='${data.transportType}',
        date_of_purchase='${data.dateOfPurchase}',
        mileage=${data.mileage},
        is_free='${data.isFree}'
      WHERE id='${data.id}'
    `).then(() => {
      return data;
    });
  }
}

export { TransportModel };
