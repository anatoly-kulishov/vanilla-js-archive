export interface ICity {
  cityId: number;
  cityName: string;
  isDefault: boolean;
}

export interface ICitiesList {
  totalCount: number;
  items: ICity[];
}
