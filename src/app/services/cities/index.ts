import { CitiesModelContract } from '~/app/models/contracts';
import { City } from '~/app/types/cities';
import { CitiesServiceContract } from './contracts';
import { GetCitiesListDBException } from './exceptions/getCitiesListDB';

class CitiesService implements CitiesServiceContract {
  protected citiesModel: CitiesModelContract;

  public constructor(citiesModel: CitiesModelContract) {
    this.citiesModel = citiesModel;
  }

  public async getList(): Promise<City[] | never> {
    try {
      return await this.citiesModel.getList();
    } catch (e) {
      throw new GetCitiesListDBException(e.stack);
    }
  }
}

export { CitiesService };
