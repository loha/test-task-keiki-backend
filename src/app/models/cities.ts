import { City } from '~/app/types/cities';
import { request } from '~/bootstrap/db';
import { CitiesModelContract } from './contracts';

class CitiesModel implements CitiesModelContract {
  protected _tableName = 'cities';

  public getList(): Promise<City[] | never> {
    return request(`SELECT * FROM ${this._tableName}`).then((result) => {
      return result.rows;
    });
  }
}

export { CitiesModel };
