import { getFullAddress } from 'components/AddressForm/AddressHelpers';
import Base from 'types/base';
import Common from '@t2crm/wfm-utils/lib/types/common';

const getAddress = (fields: Common.KeyValue): Base.Address[] => (
  fields?.['address-form-list']?.length > 0
    ? fields['address-form-list'].map((field: Common.KeyValue, index: number) => ({
      addressTypeId: field.addressTypeId,
      regionName: field.regionName,
      cityName: field.cityName,
      streetName: field.streetName,
      houseName: field.houseName,
      flatName: field.flatName,
      entrance: field.entrance,
      floor: field.floor,
      intercom: field.intercom,
      fullAddress: getFullAddress(fields['address-form-list']?.[index]),
    })) : []);

export default getAddress;
