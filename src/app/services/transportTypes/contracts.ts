import { TransportType } from '~/app/types/transportTypes';

export interface TransportTypesServiceContract {
  getList(): Promise<TransportType[] | never>;
}
