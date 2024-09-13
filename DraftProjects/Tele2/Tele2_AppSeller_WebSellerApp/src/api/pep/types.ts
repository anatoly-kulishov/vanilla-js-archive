export namespace PepService {
  export namespace Model {
    export enum ServiceId {
      HAS_PEP = 2,
      NO_PEP = 3
    }

    export type PepNumber = {
      msisdn: string;
    };
  }

  export namespace GetClientsPep {
    export type Request = {
      name: string;
      surname: string;
      patronymic: string;
      documentSeries: string;
      documentNumber: string;
    };
    export type Response = {
      msisdns: Model.PepNumber[];
    };
  }

  export namespace SendPepCode {
    export type Request = {
      msisdn: string;
      serviceId?: Model.ServiceId;
      operationId?: number; // TODO создать enum с operationId
    };
    export type Response = {};
  }

  export namespace CheckPepCode {
    export type Request = {
      code: string;
      msisdn: string;
      serviceId?: Model.ServiceId;
      operationId?: number;
    };
    export type Response = {
      message?: string;
    };
  }
}
