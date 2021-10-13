import { TransportType } from '~/app/types/transportTypes';
import { TransportTypesModelContract } from '~/app/models/contracts';
import { TransportTypesServiceContract } from './contracts';
import { GetTransportTypesListDBException } from './exceptions/getTransportTypesListDB';

class TransportTypesService implements TransportTypesServiceContract {
  protected transportTypesModel: TransportTypesModelContract;

  public constructor(transportTypesModel: TransportTypesModelContract) {
    this.transportTypesModel = transportTypesModel;
  }

  public async getList(): Promise<TransportType[] | never> {
    try {
      return await this.transportTypesModel.getList();
    } catch (e) {
      throw new GetTransportTypesListDBException(e.stack);
    }
  }
}

export { TransportTypesService };
