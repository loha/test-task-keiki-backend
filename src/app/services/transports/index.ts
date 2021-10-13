import { v4 as uuid } from 'uuid';
import { TransportsModelContract } from '~/app/models/contracts';
import { Transport, TransportGetListFilter } from '~/app/types/transports';
import { TransportsServiceContract } from './contracts';
import { GetTransportsListDBException } from './exceptions/getTransportsListDB';
import { GetTransportByIdDBException } from './exceptions/getTransportByIdDB';
import { CreateTransportDBException } from './exceptions/createTransportDB';
import { DeleteTransportDBException } from './exceptions/deleteTransportDB';
import { UpdateTransportDBException } from './exceptions/updateTransportDB';

class TransportService implements TransportsServiceContract {
  protected transportsModel: TransportsModelContract;

  public constructor(transportsModel: TransportsModelContract) {
    this.transportsModel = transportsModel;
  }

  public async getList(filter: TransportGetListFilter): Promise<Transport[] | never> {
    try {
      return await this.transportsModel.getList(filter);
    } catch (e) {
      throw new GetTransportsListDBException(e.stack);
    }
  }

  public async getTransportById(id: string): Promise<Transport | null | never> {
    try {
      const result = await this.transportsModel.getTransportById(id);

      if (result.length) {
        return result[0];
      } else {
        return null;
      }
    } catch (e) {
      throw new GetTransportByIdDBException(e.stack);
    }
  }

  public async createTransport(data: Transport): Promise<Transport | never> {
    try {
      data.id = uuid();

      return await this.transportsModel.createTransport(data);
    } catch (e) {
      throw new CreateTransportDBException(e.stack);
    }
  }

  public async deleteTransport(id: string): Promise<number | never> {
    try {
      return await this.transportsModel.deleteTransport(id);
    } catch (e) {
      throw new DeleteTransportDBException(e.stack);
    }
  }

  public async updateTransport(data: Transport): Promise<Transport | never> {
    try {
      return await this.transportsModel.updateTransport(data);
    } catch (e) {
      throw new UpdateTransportDBException(e.stack);
    }
  }
}

export { TransportService };
