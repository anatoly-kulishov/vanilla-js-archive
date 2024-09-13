import { bool, number, shape, string } from 'prop-types'

export default shape({
  PromocodeId: number,
  PromocodeValue: string,
  CampaignId: string,
  SubscriberId: number,
  BranchId: number,
  Msisdn: string,
  Description: string,
  Additional: string,
  StateCode: string,
  StateName: string,
  IsReadyToActivate: bool,
  IsReadyToDelete: bool,
  ProvidedOnStateName: string,
  ProvidedByStateName: string,
  ProvidedByChannelStateName: string,
  ActivatedOnStateName: string,
  ActivatedBy: string,
  ActivatedByChannel: string,
  ModifiedOn: string,
  ModifiedBy: string,
  ModifiedByChannel: string
})
