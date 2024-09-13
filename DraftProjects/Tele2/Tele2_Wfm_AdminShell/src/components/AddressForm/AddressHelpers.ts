import { NamePath } from 'antd/lib/form/interface';
import Common from '@t2crm/wfm-utils/lib/types/common';

const addressFields = [
  'regionName',
  'cityName',
  'streetName',
  'houseName',
  'flatName',
  'entrance',
  'floor',
  'intercom',
];

export const getFullAddressDependecies = (
  formName: string, fieldName: number | string,
): NamePath [] => addressFields.map((item) => [formName, fieldName, item]);

export const getFullAddress = (address: Common.KeyValue) => {
  const {
    regionName,
    cityName,
    streetName,
    houseName,
    flatName,
    entrance,
    floor,
  } = address;

  return [
    regionName,
    cityName,
    streetName ? `ул. ${streetName}` : '',
    houseName ? `д. ${houseName}` : '',
    flatName ? `кв. ${flatName}` : '',
    entrance ? `п. ${entrance}` : '',
    floor ? `эт. ${floor}` : '',
  ]
    .filter((item) => !!item)
    .join(', ');
};
