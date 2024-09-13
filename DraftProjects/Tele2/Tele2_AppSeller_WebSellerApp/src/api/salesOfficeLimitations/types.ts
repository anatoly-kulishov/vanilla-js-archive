export namespace SalesOfficeLimitationsService {
  export namespace GetActiveSalesOffice {
    export type Response = {
      salesOfficeId: number;
    };
  }

  export namespace ChangeActiveSalesOffice {
    export type Request = {
      officeId: number;
    };

    export type Response = {
      officeChangeSessionId: string;
    };
  }

  export namespace GetActiveSalesOfficeStatus {
    export type Request = {
        officeChangeSessionId: string
    };

    export type Response = {
      isConfirmed: boolean;
      isMigrationResultReceived: boolean;
    };
  }
}
