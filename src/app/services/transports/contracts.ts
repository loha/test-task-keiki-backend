import { Transport, TransportGetListFilter } from '~/app/types/transports';

export interface TransportsServiceContract {
  getList(filter: TransportGetListFilter): Promise<Transport[] | never>;
  getTransportById(id: string): Promise<Transport | null | never>;
  createTransport(data: Transport): Promise<Transport | never>;
  deleteTransport(id: string): Promise<number | never>;
  updateTransport(data: Transport): Promise<Transport | never>;
}
