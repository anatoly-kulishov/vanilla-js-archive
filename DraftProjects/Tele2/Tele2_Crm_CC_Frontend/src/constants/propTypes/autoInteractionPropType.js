import { shape, string, number } from 'prop-types'

export default shape({
  handlingId: string,
  clientId: number,
  clientBranchId: number,
  email: string,
  subscriberId: number,
  subscriberBranchId: number,
  subscriberTypeId: number,
  subscriberStatusId: number
})
