import { OrderStatuses } from 'constants/orderStatuses'

export function constructUrl (path, params) {
  const encodedParams = new URLSearchParams(params)
  return `${path}?${encodedParams}`
}

export function prepareCreateSessionParams (formValues) {
  const regionCodes = formValues?.regionCode?.map(item => item.value) ?? undefined
  return {
    statusId: formValues?.statusId?.value,
    systemId: formValues?.systemId?.value,
    regionCodes,
    orderId: formValues?.orderId,
    msisdn: formValues?.msisdn,
    typeId: formValues?.typeId?.value,
    isTimeCall: formValues?.isTimeCall,
    expectedDate: formValues?.expectedDate?.toISOString()
  }
}

export function checkIsSessionPossible (statusId) {
  const { Cancelled, CancelledByRtc, Closed, Deleted, Draft } = OrderStatuses
  const badStatusIds = [Cancelled, CancelledByRtc, Closed, Deleted, Draft]
  return !badStatusIds.includes(statusId)
}
