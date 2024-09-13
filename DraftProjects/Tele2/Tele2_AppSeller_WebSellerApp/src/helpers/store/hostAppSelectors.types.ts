// TODO подумать над структурой
export namespace HostState {
  export namespace Model {
    export namespace Client {
      export enum ClientCategory {
        B2C = 'B2C',
        B2B = 'B2B'
      }
    }
  }

  export namespace Internal {
    export type HandlingState = {
      Id: string | undefined;
    };

    export type HandlingId = string
  }

  export namespace PersonalInfo {
    export namespace PersonalAccountState {
      export type PersonalAccount = {
        AdvertisingAgreement: boolean;
        BillingBranchId: number;
        ClientId: number;
        ClientTypeId: number;
        Email: string | null;
        Msisdn: string;
        PersonalAccountId: number;
        SubscriberId: number;
        SubscriberStatus: number;
        ClientCategory: Model.Client.ClientCategory;
        BaseFunctionalParams: {};
        SubscriberFullInfo: {
          SubscriberClientInfo: {};
          SubscriberInfo: {};
          USIProfile: {};
        };
        SubscriberInfo: {};
        ParentClientInfo: {};
        SubscriberCounts: {};
        SubscriberName: {
          Surname: string;
          Name: string;
          Patronymic: string | undefined;
        };
      };
    }
  }
}
