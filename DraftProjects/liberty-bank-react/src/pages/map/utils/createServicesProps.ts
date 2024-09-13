import { Dispatch, SetStateAction } from 'react';
import { Service } from '@/widgets/mapControls/ui/MapControlsFilter/types';
import { IFilterServices } from '../model';
import { ServicesBank } from '@/shared';

export function createServicesProps(
  filterServices: IFilterServices[],
  setFilterServices: Dispatch<SetStateAction<IFilterServices[]>>,
): Service[] {
  const reducerFilterServices = (type: keyof ServicesBank) => {
    setFilterServices((state) => [
      ...state.map((services) => ({
        ...services,
        isSelected: services.type === type ? !services.isSelected : services.isSelected,
      })),
    ]);
  };

  const services = filterServices.map((services) => ({
    ...services,
    onClick: reducerFilterServices,
  }));

  return services;
}
