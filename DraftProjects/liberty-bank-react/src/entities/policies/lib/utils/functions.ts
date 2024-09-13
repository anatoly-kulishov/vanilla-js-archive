import {
  IInsurancePolicies,
  IInsuranceVehicleApplication,
  IInsuranceThingApplication,
} from '@/shared';

export const getDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};

export const getServices = <T>(obj: T, services: IServices) => {
  return Object.keys(services)
    .filter((key) => obj[key as keyof T])
    .map((key, index) =>
      index === 0 ? services[key][0].toUpperCase() + services[key].slice(1) : services[key],
    )
    .join(', ');
};

export const getDetailsOsagoKasko = (
  data: IInsurancePolicies<IInsuranceVehicleApplication>,
  requiredField: string[],
) => {
  const arrayDrivers =
    data.concretePolicyDetailsDto?.drivers
      .map((_, index) => [
        `Водитель №${index + 1}`,
        `Водительское удостоверение водителя №${index + 1}`,
      ])
      .flat() ?? [];
  return [...requiredField, ...arrayDrivers];
};

export const getDetailsProperty = (
  data: IInsurancePolicies<IInsuranceThingApplication>,
  requiredField: string[],
) => {
  const arrayProperty = new Array(data.concretePolicyDetailsDto?.things.length)
    .fill(['Объект страхования', 'Тип имущества', 'Стоимость'])
    .flat();
  return [...requiredField, ...arrayProperty, 'Адрес'];
};

export const getDrivers = (data: IInsurancePolicies<IInsuranceVehicleApplication>) => {
  const arrayDrivers = [];
  const desiredLength = data.concretePolicyDetailsDto?.drivers.length as number;
  for (let i = 0; i < desiredLength; i++) {
    arrayDrivers.push(
      `${data.concretePolicyDetailsDto?.drivers[i].driverSurname}  ${data.concretePolicyDetailsDto?.drivers[i].driverName} ${data.concretePolicyDetailsDto?.drivers[i].driverPatronymic}`,
      `${data.concretePolicyDetailsDto?.drivers[i].licenseId}`,
    );
  }
  return arrayDrivers;
};

export const getProperty = (data: IInsurancePolicies<IInsuranceThingApplication>) => {
  const arrayProperty = [];
  const desiredLength = data.concretePolicyDetailsDto?.things.length as number;
  for (let i = 0; i < desiredLength; i++) {
    arrayProperty.push(
      `${data.concretePolicyDetailsDto?.things[i].name}`,
      `${data.concretePolicyDetailsDto?.things[i].type}`,
      `${getSumma(data.concretePolicyDetailsDto?.things[i].cost)}`,
    );
  }
  return arrayProperty;
};

export const getSumma = (summa: number | string): string =>
  String(summa).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

type IServices = {
  [key: string]: string;
};
