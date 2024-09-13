import { BankBranchType, CityBranch } from '@/shared';
import { BranchServesTypes, IFilterSchedule, IFilterServices } from '../model';

interface Filter {
  branchServes: BranchServesTypes;
  schedule: IFilterSchedule[];
  services: IFilterServices[];
}

export const filteringBranches = (
  tab: BankBranchType,
  { branchServes, schedule, services }: Filter,
  branches: CityBranch[] | undefined,
): CityBranch[] | null => {
  if (!branches) return null;
  return [
    ...branches
      .filter(({ bankBranchType }) => bankBranchType === tab)
      .filter(
        ({ physicalEntity, legalEntity }) =>
          branchServes === 'all' ||
          (physicalEntity && branchServes === 'physical') ||
          (legalEntity && branchServes === 'legal'),
      )
      .filter(({ isWorkingNow }) =>
        schedule.some(({ type, isSelected }) => type === 'now' && isSelected) ? isWorkingNow : true,
      )
      .filter(({ workingSchedulePhysical }) =>
        schedule.some(({ type, isSelected }) => type === 'weekends' && isSelected)
          ? workingSchedulePhysical.some(
              ({ dayOfWeek, openingTime }) =>
                (dayOfWeek === 'СБ' || dayOfWeek === 'ВС') && openingTime,
            )
          : true,
      )
      .filter(({ servicesBank }) => {
        return (Object.keys(servicesBank) as Array<keyof typeof servicesBank>).every((key) =>
          services.some(({ type, isSelected }) => type === key && isSelected)
            ? servicesBank[key]
            : true,
        );
      }),
  ];
};
