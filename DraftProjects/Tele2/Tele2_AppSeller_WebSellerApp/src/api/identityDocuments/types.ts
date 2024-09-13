export namespace IdentityDocumentsService {
  export namespace Model {
    export type DocumentType = {
      id: number;
      name: string;
      pcdbId: number;
    };

    export type DocumentField = {
      id: number;
      nameRu: string;
      nameEn: string;
      isRequired: boolean;
      dataType: string;
      constraint: string;
      minLength?: number;
      maxLength?: number;
    };

    export type Country = {
      id: number;
      nameRu: string;
      nameEn: string;
    };
  }

  export namespace GetDocumentTypes {
    export type Response = {
      identityDocumentTypes: Array<Model.DocumentType>;
    };
  }

  export namespace GetDocumentFields {
    export type Request = {
      docTypeId: number;
    };

    export type Response = {
      fields: Array<Model.DocumentField>;
    };
  }

  export namespace GetCountries {
    export type Request = {
      identityDocumentType: number;
      countryName: string;
    };

    export type Response = {
      countries: Array<Model.Country>;
    };
  }

  export namespace GetDocumentValidityPeriod {
    export type Request = {
      id: number;
      birthDate: string;
      issueDate: string;
      currentDate: string;
    };

    export type Response = {
      result: string;
      isDocumentValid: boolean;
    };
  }

  export namespace GetResidenceDocumentTypes {
    export type Request = {
      identityDocumentId: number;
      countryId: number;
    };

    export type Response = {
      approvedResidenceDocuments: Array<Model.DocumentType>;
    };
  }

  export namespace GetResidenceDocumentFields {
    export type Request = {
      typeId: number;
    };

    export type Response = {
      fields: Array<Model.DocumentField>;
    };
  }

  export namespace GetResidenceDocumentValidityPeriod {
    export type Request = {
      typeId: number;
      documentEndDate: string;
      currentDate: string;
    };

    export type Response = {
      result: string;
      isDocumentValid: boolean;
      message: string;
    };
  }
}
