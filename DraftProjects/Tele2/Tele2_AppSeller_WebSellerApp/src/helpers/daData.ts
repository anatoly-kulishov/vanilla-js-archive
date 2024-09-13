import { DaDataIntegrationService } from 'api/daDataIntegration/types';

export const hasAllRequiredAddressFields = ({
  address,
  isGenerated = false
}: {
  address: DaDataIntegrationService.Model.Address;
  isGenerated?: boolean;
}) => {
  const { Region, City, House, Locality, Stead } = address;
  const defaultCondition = (City || Locality) && (House || Stead);

  return isGenerated ? defaultCondition : defaultCondition && Region;
};

export const getFoundAddress = ({
  queryAddress,
  addresses
}: {
  queryAddress: string;
  addresses: Array<DaDataIntegrationService.Model.Address>;
}) => addresses.find((address) => address.FullAddress === queryAddress);

export enum FieldsRegistartionAddress {
  POST_INDEX = 'PostIndex',
  REGION = 'Region',
  CITY = 'City',
  STREET = 'Street',
  HOUSE = 'House',
  FLAT = 'Flat',
  FULL_ADDRESS = 'FullAddress'
}
