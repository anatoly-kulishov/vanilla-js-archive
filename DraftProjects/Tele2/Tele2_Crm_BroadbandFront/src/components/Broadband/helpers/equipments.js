import { EquipmentTypeId } from 'constants/equipment'
import { OrderStatuses } from 'constants/orderStatuses'
import { TariffTypes } from 'constants/tariff'
import { UPSALE_TYPE } from 'constants/upSaleType'
import { getSelectedSpeedToTechnology } from 'helpers/speedToTechnology'
import { fillEquipments, formatOrderPrice } from './broadband'

export function getEquipmentTypeParams (speedToTechnology, order, selectedId, rtcKey, statusId) {
  const { SpeedId, TechnologyId } = getSelectedSpeedToTechnology(speedToTechnology, selectedId) ?? {}

  return {
    SpeedId: SpeedId ?? order?.BcSpeedId,
    TechnologyId: TechnologyId ?? order?.TechnologyId,
    RtcKey: rtcKey,
    IsAgreementRtc: order?.Relocation ? undefined : statusId < OrderStatuses.TransferredToRtc ? false : undefined,
    IsFederal: true
  }
}

export function getUpSaleEquipmentTypeParams (order, rtcKey, upSaleType) {
  return {
    SpeedId: order?.BcSpeedId,
    TechnologyId: order?.TechnologyId,
    RtcKey: rtcKey,
    IsFederal: upSaleType === UPSALE_TYPE.MANUAL ? true : undefined
  }
}

export const prepareEquipmentServices = (equipmentTypes, selectedEquipments) => {
  const availableEquipmentServices = equipmentTypes?.reduce((previous, current) => {
    const currentEquipmentServices = current.PurchaseTypes.map(pType => ({
      TypeId: pType.EquipmentTypeId,
      SegmentId: pType.SegmentId,
      PurchaseTypeId: pType.PurchaseTypeId,

      ServiceRentId: pType.ServiceRentId,
      RtcCode: pType.RtcCode,
      Name: pType.Name,
      ServiceRentPrice: pType.ServiceRentPrice
    }))
    return [...previous, ...currentEquipmentServices]
  }, [])

  const equipmentServices = []

  for (const equipment of selectedEquipments) {
    if (!equipment) continue
    const { RtcCode, ServiceRentId, Name, ServiceRentPrice, PurchaseTypeId, TypeId } = availableEquipmentServices?.find(
      item =>
        item.TypeId === equipment?.TypeId?.value &&
        item.SegmentId === equipment?.SegmentId?.value &&
        item.PurchaseTypeId === equipment?.PurchaseTypeId?.value
    )

    const serviceType = TypeId === EquipmentTypeId.Wink ? TariffTypes.WinkTV : TariffTypes.BroadbandDevice

    const newEquipmentService = {
      ServiceId: ServiceRentId,
      ServiceType: serviceType,
      RtcCode,
      ServiceName: Name,
      ServicePrice: ServiceRentPrice,
      EquipmentPurchaseTypeId: PurchaseTypeId,
      EquipmentTypeId: TypeId
    }

    equipmentServices.push(newEquipmentService)
  }

  return equipmentServices
}

export const getEquipmentTypeIdOptions = (listValue, equipmentTypes) => {
  const isRouterSelected = listValue?.some(equipment =>
    [EquipmentTypeId.FTTBRouter, EquipmentTypeId.PONRouter].includes(equipment?.TypeId?.value)
  )

  const typeIdOptions =
    equipmentTypes?.reduce((acc, item) => {
      const isExcludeRouterOption =
        isRouterSelected && [EquipmentTypeId.FTTBRouter, EquipmentTypeId.PONRouter].includes(item.EquipmentTypeId)
      const isAlreadySelected = listValue?.find(equipment => equipment?.TypeId?.value === item.EquipmentTypeId)

      if (!isExcludeRouterOption && !isAlreadySelected) {
        const option = {
          key: item.EquipmentTypeId,
          value: item.EquipmentTypeId,
          label: item.EquipmentTypeName
        }
        acc.push(option)
      }
      return acc
    }, []) || []

  return typeIdOptions
}

export const getRelocationEquipments = (relocationData, equipmentTypes) => {
  return relocationData.CurrentEquipment.reduce((acc, eq) => {
    const currentEquipment = equipmentTypes.find(item => item.EquipmentTypeId === eq.TypeId)

    if (currentEquipment) {
      const currentSegment = currentEquipment.Segments.find(item => item.SegmentId === eq.SegmentId)
      const currentPurchaseType = currentEquipment.PurchaseTypes.find(item => item.PurchaseTypeId === eq.PurchaseTypeId)
      acc.push({
        IsRequired: currentEquipment.IsRequired,
        TypeId: { value: currentEquipment.EquipmentTypeId, label: currentEquipment.EquipmentTypeName },
        SegmentId: {
          value: currentSegment?.SegmentId,
          label: currentSegment?.SegmentName
        },
        PurchaseTypeId: {
          value: currentPurchaseType?.PurchaseTypeId,
          label: currentPurchaseType?.PurchaseTypeName
        }
      })
    }
    return acc
  }, [])
}

export const getEquipments = equipmentTypes =>
  equipmentTypes.map(eq => {
    const equipment = { IsRequired: eq.IsRequired, TypeId: { value: eq.EquipmentTypeId, label: eq.EquipmentTypeName } }

    const isOnlyOnePurchaseType = eq?.PurchaseTypes?.length === 1
    const isOnlyOneSegment = eq?.Segments?.length === 1

    if (isOnlyOnePurchaseType) {
      equipment.PurchaseTypeId = {
        value: eq.PurchaseTypes[0].PurchaseTypeId,
        label: getEquipmentPurchaseTypeLabel(eq.PurchaseTypes[0])
      }
    }

    if (isOnlyOneSegment) {
      equipment.SegmentId = {
        value: eq.Segments[0].SegmentId,
        label: eq.Segments[0].SegmentName
      }
    }

    return equipment
  })

export const getEquipmentsCodeList = (selectedEquipments, equipmentTypes, order) => {
  const activeRtcCodes = equipmentTypes?.reduce((previous, current) => {
    const currentTypeRtcCodes = current.PurchaseTypes.map(pType => ({
      TypeId: pType.EquipmentTypeId,
      SegmentId: pType.SegmentId,
      PurchaseTypeId: pType.PurchaseTypeId,
      rtcCode: pType.RtcCode
    }))
    return [...previous, ...currentTypeRtcCodes]
  }, [])

  const currentRtcCodes = order?.Equipments?.map(eq => ({
    TypeId: eq.TypeId,
    SegmentId: eq.SegmentId,
    PurchaseTypeId: eq.PurchaseTypeId,
    rtcCode: eq.RtcCode
  }))

  const rtcCodes = []
  for (const equipment of selectedEquipments) {
    if (!equipment) continue
    const activeRtcCode = activeRtcCodes?.find(
      item =>
        item.TypeId === equipment?.TypeId?.value &&
        item.SegmentId === equipment?.SegmentId?.value &&
        item.PurchaseTypeId === equipment?.PurchaseTypeId?.value
    )?.rtcCode

    const currentRtcCode = currentRtcCodes?.find(
      item =>
        item.TypeId === equipment?.TypeId?.value &&
        item.SegmentId === equipment?.SegmentId?.value &&
        item.PurchaseTypeId === equipment?.PurchaseTypeId?.value
    )?.rtcCode
    rtcCodes.push(activeRtcCode || currentRtcCode)
  }
  return { EquipmentCodeList: rtcCodes }
}

export const checkSelectedEquipmentTypes = selectedEquipments => {
  let isTVSetTopBoxSelected = false
  let isWinkSelected = false

  selectedEquipments?.forEach(equipment => {
    if (equipment?.TypeId?.value === EquipmentTypeId.TVSetTopBox) {
      isTVSetTopBoxSelected = true
    }
    if (equipment?.TypeId?.value === EquipmentTypeId.Wink) {
      isWinkSelected = true
    }
  })

  return { isTVSetTopBoxSelected, isWinkSelected }
}

export const getEquipmentPurchaseTypeLabel = item =>
  item.PurchaseTypeName + ' | ' + formatOrderPrice(item.ServiceRentPrice) + ' руб.'

export function fillUpSaleEquipments (orderData, upSaleType) {
  const orderEquipments = orderData?.Equipments ?? []

  if (upSaleType === UPSALE_TYPE.AUTO) {
    const filteredOrderEquipments = orderEquipments.filter(equipment => equipment?.TypeId !== EquipmentTypeId.Wink)
    return fillEquipments({ ...orderData, Equipments: filteredOrderEquipments })
  }

  return fillEquipments(orderData)
}
