import { AddressTypes } from 'constants/address'
import { TariffTypes, initialSim, initialWink } from 'constants/tariff'
import { getAddressByType } from 'helpers/address'
import { getTariffItemByType, getTariffItemsByType } from 'helpers/agreement'
import { prepareEquipmentServices } from './equipments'
import { getSelectedSpeedToTechnology } from 'helpers/speedToTechnology'

export const prepareFeedbackOrderData = (order, orderState, orderStatusState) => {
  return {
    ...order,
    Msisdn: orderState?.Msisdn || order?.Msisdn,
    StatusName: orderStatusState?.statusName || order?.StatusName,
    CrmOrderId: orderState.CrmOrderId
  }
}

export const prepareChangeOrderData = (values, equipmentTypes, orderId) => {
  const { ServiceId, IsWinkSetting, IsSim, Comment, Equipments } = values

  const serviceList = []

  const speedToTechnologyService = { ServiceType: TariffTypes.BroadbandAccess, ServiceId }
  serviceList.push(speedToTechnologyService)

  const equipments = prepareEquipmentServices(equipmentTypes, Equipments).map(
    ({ ServiceId, ServiceType, RtcCode }) => ({
      ServiceId,
      ServiceType,
      RtcCode
    })
  )
  serviceList.push(...equipments)

  if (IsWinkSetting) {
    const winkService = { ServiceType: initialWink.ServiceType, ServiceId: initialWink.ServiceId }
    serviceList.push(winkService)
  }

  if (IsSim) {
    const simService = { ServiceType: initialSim.ServiceType, ServiceId: initialWink.ServiceId }
    serviceList.push(simService)
  }

  const data = {
    OrderId: orderId,
    Comment,
    ServiceList: serviceList
  }

  return data
}

export const prepareCreateOrderEditSessionData = (order, orderState) => {
  const installationAddress = getAddressByType(orderState, AddressTypes.Installation)
  const initialAgreement = prepareInitialAgreement(order, orderState)

  const data = {
    orderId: orderState.OrderId,
    crmOrderId: orderState.CrmOrderId,
    rtcOrderId: orderState.RtcOrderId,
    rtcAccountNumber: order?.RtcAccountNumber,
    rtcTechnologyId: orderState.BcTechnologyId,
    regionCode: orderState.OrderRegionCode,
    kladrRegion: orderState.KladrRegion,
    orponId: installationAddress?.OrponId,
    isOnlime: orderState.IsOnlime,
    initialAgreement
  }

  return data
}

const prepareInitialAgreement = (order, orderState) => {
  let serviceItems = []

  const broadbandAccessItem = getTariffItemByType(orderState, TariffTypes.BroadbandAccess)
  const initialSpeedToTechnology = {
    serviceId: broadbandAccessItem?.Id,
    serviceType: TariffTypes.BroadbandAccess,
    rtcCode: null,
    serviceName: broadbandAccessItem?.Name,
    servicePrice: broadbandAccessItem?.Cost
  }
  serviceItems.push(initialSpeedToTechnology)

  const orderEquipments = order?.Equipments
  const broadbandDeviceItems = getTariffItemsByType(orderState, TariffTypes.BroadbandDevice)
  const initialBroadbandDevices = broadbandDeviceItems?.map(item => {
    const servicePrice = [null, 0].includes(item.CostMonth) ? item.FirstPayment : item.CostMonth

    const { TypeId, RtcCode, PurchaseTypeId } =
      orderEquipments?.find(equipment => equipment.EquipmentId === item.EquipmentId) ?? {}

    return {
      serviceId: item.Id,
      serviceType: TariffTypes.BroadbandDevice,
      equipmentTypeId: TypeId,
      equipmentPurchaseTypeId: PurchaseTypeId,
      rtcCode: RtcCode,
      serviceName: item?.Name,
      servicePrice
    }
  })

  serviceItems = [...serviceItems, ...initialBroadbandDevices]

  const winkItem = getTariffItemByType(orderState, TariffTypes.Wink)
  if (winkItem) {
    const { Id, Type, TypeName } = winkItem
    serviceItems.push({
      serviceId: Id,
      serviceType: Type,
      serviceName: TypeName,
      rtcCode: initialWink.RtcCode,
      servicePrice: initialWink.ServicePrice
    })
  }

  const simItem = getTariffItemByType(orderState, TariffTypes.Sim)
  if (simItem) {
    const { Id, Type, TypeName } = simItem
    serviceItems.push({
      serviceId: Id,
      serviceType: Type,
      serviceName: TypeName,
      rtcCode: initialSim.RtcCode,
      servicePrice: initialSim.ServicePrice
    })
  }

  return serviceItems
}

export const prepareModifyOrderEditSessionData = (values, speedToTechnology, equipmentTypes, id) => {
  const newAgreement = prepareNewAgreement(values, speedToTechnology, equipmentTypes)

  const data = { newAgreement }

  return { id, data }
}

const prepareNewAgreement = (values, speedToTechnology, equipmentTypes) => {
  const { ServiceId, IsWinkSetting, IsSim, Equipments } = values

  let serviceList = []

  const { TechnologyName, SpeedName, ServicePrice } = getSelectedSpeedToTechnology(speedToTechnology, ServiceId)
  const serviceName = `${TechnologyName} ${SpeedName}`

  const newSpeedToTechnology = {
    serviceId: ServiceId,
    serviceType: TariffTypes.BroadbandAccess,
    rtcCode: null,
    serviceName,
    servicePrice: ServicePrice
  }
  serviceList.push(newSpeedToTechnology)

  const newEquipmentServices = prepareEquipmentServices(equipmentTypes, Equipments)
  serviceList = [...serviceList, ...newEquipmentServices]

  if (IsWinkSetting) {
    serviceList.push(initialWink)
  }

  if (IsSim) {
    serviceList.push(initialSim)
  }

  return serviceList
}

export const prepareDeleteOrderEditSessionData = (id, values) => {
  const { comment } = values

  const data = { comment }

  return { id, data }
}
