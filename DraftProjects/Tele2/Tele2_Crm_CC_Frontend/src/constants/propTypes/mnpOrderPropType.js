import { bool, number, shape, string, arrayOf } from 'prop-types'

export const mnpOrderType = shape({
  OrderId: number,
  NumberPortabilityId: number,
  OrderDate: string,
  ContractDate: string,
  PortingDate: string,
  OrderStatus: string,
  OrderStatusCode: string,
  ValidationStatus: number,
  OperatorRecipient: string,
  OperatorDonor: string,
  Msisdn: string,
  MsisdnCount: number,
  BranchName: string,
  IsDebt: bool
})

export default shape({
  ...mnpOrderType,
  Msisdns: arrayOf(shape({ Msisdn: string }))
})
