import { Schedule } from '@/widgets/mapControls/ui/MapControlsFilter/types';
import React from 'react';
import { IFilterSchedule, ScheduleTypes } from '../model';

export function createScheduleProps(
  filterSchedule: IFilterSchedule[],
  setFilterSchedule: React.Dispatch<React.SetStateAction<IFilterSchedule[]>>,
): Schedule[] {
  const reducerFilterSchedule = (type: ScheduleTypes) => {
    setFilterSchedule((state) => [
      ...state.map((schedule) => ({
        ...schedule,
        isSelected: schedule.type === type ? !schedule.isSelected : schedule.isSelected,
      })),
    ]);
  };

  const schedule = filterSchedule.map((schedule) => ({
    ...schedule,
    onClick: reducerFilterSchedule,
  }));

  return schedule;
}
