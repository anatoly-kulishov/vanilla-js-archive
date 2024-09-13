export namespace PersonalInfoService {
  export namespace Model {
    export enum PayClientTypeId {
      CREDIT = 'Кредитный',
      DOWN = 'Авансовый'
    }

    export type DataSubscriber = {
      MainData: {}; // TODO типизировать
      ContractInfo: {
        PayClientTypeId: Model.PayClientTypeId;
      };
      Pep: {
        SignAgree: boolean;
        AgreeDate: Date | null;
        RevocationDate: Date | null;
        AgreeTypeName: string | null; // TODO уточнить тип / создать enum
      };
      FZ533Profile: {}; // TODO типизировать
    };
  }

  export namespace GetDataSubscriber {
    export type Request = {
      Msisdn: string;
      BranchId: number;
      ClientId: number;
    };

    export type Response = {
      Data: Model.DataSubscriber;
      IsSuccess: boolean;
      MessageText: string | null;
      ResultType: number;
      ResultCode: number;
    };
  }

  export namespace SendPepAgree {
    export type Request = {
      msisdn: string;
      subscriberId: number;
      branchId: number;
      clientId: number;
      handlingId: string;
    };
  }
}
