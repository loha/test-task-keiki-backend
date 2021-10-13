import { request } from '~/bootstrap/db';
import { TransportType } from '~/app/types/transportTypes';
import { TransportTypesModelContract } from './contracts';

class TransportTypesModel implements TransportTypesModelContract {
  protected _tableName = 'transport_types';

  public getList(): Promise<TransportType[] | never> {
    return request(`SELECT * FROM ${this._tableName}`).then((result) => {
      return result.rows;
    });
  }
}

export { TransportTypesModel };
