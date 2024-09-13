import { ServicesBank } from '@/shared';

export type BranchServesTypes = 'all' | 'physical' | 'legal';

export type ScheduleTypes = 'now' | 'weekends' | 'organization';

export interface IBranchServes {
  type: BranchServesTypes;
  value: string;
}

export interface IFilterSchedule {
  type: ScheduleTypes;
  isSelected: boolean;
  value: string;
}

export interface IFilterServices {
  type: keyof ServicesBank;
  isSelected: boolean;
  value: string;
}

interface ICity {
  cityId: number;
  cityName: string;
  isDefault: boolean;
}

export interface ICitiesList {
  totalCount: number;
  items: ICity[];
}
