import { TariffTypes } from 'constants/tariff'
import { getTariffItemByType } from './agreement'

export function getSpeedToTechnologyParams (order, subscriberRatePlanId) {
  const { Id } = getTariffItemByType(order, TariffTypes.Tariff) ?? {}

  return {
    TariffId: Id ?? subscriberRatePlanId,
    WithArchiveServices: true
  }
}

export function getUpSaleSpeedToTechnologyParams (order, subscriberRatePlanId, rtcKey) {
  return {
    ...getSpeedToTechnologyParams(order, subscriberRatePlanId),
    RtcKey: rtcKey,
    MaxSpeed: order?.AvailableSpeedValue,
    Technology: order?.RtcTechnologyId
  }
}

export function getSelectedSpeedToTechnology (speedToTechnology, selectedId) {
  return speedToTechnology?.find(({ ServiceId }) => ServiceId === selectedId)
}
