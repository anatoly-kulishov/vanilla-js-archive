export namespace DealerInfoService {
  export namespace GetSalesOfficeInfo {
    export type Request = {
      officeId: string;
    };

    export type Response = {
      isActiveSettingAvailable: boolean;
      activeSettingReason: string;
      message: string;
      fullAddress: string;
      address: {
        city: string;
        cityType: string;
        street: string;
        streetType: string;
        house: string;
      };
      location: string;
    };
  }

  export namespace GetSalesOfficeBranches {
    export type Request = {
      officeId: number;
    };

    export type Response = {
      branches: Array<{
        id: number;
        name: string;
      }>;
    };
  }
}
