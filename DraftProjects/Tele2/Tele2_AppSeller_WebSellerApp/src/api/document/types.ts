export namespace DocumentService {
  export namespace Model {
    export type Document = {
      id: number;
      url: string;
      title: string;
    };

    export type SignedDocument = {
      uid: string;
      name: string;
    };
  }

  export namespace PrepareSimSellDocument {
    export type Response = string;
  }

  export namespace CreateDocument {
    export type Request = {
      typeId: number;
      isArchive?: boolean;
      data: Object; // TODO типизировать через дженерик?
      // format: 'PDF'; ?
    };
    export type Response = string;
  }
}
