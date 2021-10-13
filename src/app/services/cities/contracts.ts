import { City } from '~/app/types/cities';

export interface CitiesServiceContract {
  getList(): Promise<City[] | never>;
}
