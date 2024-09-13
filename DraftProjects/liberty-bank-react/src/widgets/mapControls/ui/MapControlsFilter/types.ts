import { ServicesBank } from '@/shared';

export type BranchServesType = 'all' | 'physical' | 'legal';

export type ScheduleType = 'now' | 'weekends' | 'organization';

export interface BranchServes {
  type: BranchServesType;
  value: string;
  isSelected: boolean;
  onChange: (value: BranchServesType) => void;
}

export interface Schedule {
  type: ScheduleType;
  value: string;
  isSelected: boolean;
  onClick: (type: ScheduleType) => void;
}

export interface Service {
  type: keyof ServicesBank;
  value: string;
  isSelected: boolean;
  onClick: (type: keyof ServicesBank) => void;
}
