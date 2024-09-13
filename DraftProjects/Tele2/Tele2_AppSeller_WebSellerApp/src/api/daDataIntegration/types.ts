export namespace DaDataIntegrationService {
  export namespace Model {
    export type Address = {
      Address: string | null;
      ShortAddress: string | null;
      FullAddress: string | null;
      RegionWithType: string | null;
      RegionType: string | null;
      Region: string | null;
      RegionName: string | null;
      RegionId: string | null;
      DistrictWithType: null;
      DistrictType: string | null;
      District: string | null;
      DistrictName: string | null;
      DistrictId: string | null;
      CityWithType: string | null;
      CityType: string | null;
      City: string | null;
      CityName: string | null;
      CityId: string | null;
      LocalityWithType: string | null;
      LocalityWith: string | null;
      LocalityType: string | null;
      Locality: string | null;
      LocalityName: string | null;
      LocalityId: string | null;
      StreetWithType: string | null;
      StreetType: string | null;
      Street: string | null;
      StreetName: string | null;
      StreetId: string | null;
      Stead: string | null;
      HouseType: string | null;
      House: string | null;
      HouseName: string | null;
      HouseId: string | null;
      BlockType: string | null;
      Block: string | null;
      BuildingType: string | null;
      BuildingName: string | null;
      PostIndex: string | null;
      RegionCode: string | null;
      Area: string | null;
    };
  }

  export namespace GetSuggestionAddress {
    export type Request = {
      Query: string;
      Count?: number;
    };

    export type Response = {
      Data: {
        DaData: Array<{
          SearchAccuracy: Model.Address;
        }>;
      };
    };
  }
}
