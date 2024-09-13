export namespace MdmService {
  export namespace Model {
    export type UfmsDivision = {
      name: string;
      code: string;
    };
  }

  export namespace GetUfmsDivisions {
    export type Request = {
        code: string
    }

    export type Response = {
      data: Array<Model.UfmsDivision>;
    };
  }
}
