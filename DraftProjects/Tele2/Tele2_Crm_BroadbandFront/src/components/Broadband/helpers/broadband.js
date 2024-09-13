import moment from 'moment'

import { AddressTypeIds, AddressTypes } from 'constants/address'
import { checkAddressType, getAddressByType } from 'helpers/address'
import { processAddressValue } from './address'
import { getTariffItemByType } from 'helpers/agreement'
import { TariffTypes } from 'constants/tariff'
import { OrderStatuses } from 'constants/orderStatuses'
import { UpsaleStatuses } from 'constants/upsaleStatuses'
import {
  InversedDeferredReason,
  InversedDuplicateReason,
  InversedInvalidReason,
  InversedRefusedReason,
  InversedRescheduleReason
} from 'constants/orderReasons'

export const getStatusColor = id => {
  // TODO: После Ф1 сделать справочник, загружаемый с BE
  switch (id) {
    case OrderStatuses.Draft:
      return 'pink'
    case OrderStatuses.Closed:
    case OrderStatuses.TransferredToRtc:
      return 'green'
    case OrderStatuses.New:
      return 'blue'
    case OrderStatuses.Cancelled:
      return 'gray'
    case OrderStatuses.Waiting:
      return 'orange'
    default:
      return 'blue'
  }
}

export const getUpsaleStatusColor = id => {
  switch (id) {
    case UpsaleStatuses.InProcessing:
      return 'orange'
    case UpsaleStatuses.Done:
      return 'green'
    case UpsaleStatuses.Error:
      return 'red'
  }
}

export const getUpsaleStatusText = id => {
  switch (id) {
    case UpsaleStatuses.InProcessing:
      return 'Редактирование незавершенного заказа находится в обработке'
    case UpsaleStatuses.Done:
      return 'Редактирование незавершенного заказа успешно завершено'
    case UpsaleStatuses.Error:
      return 'При редактировании незавершенного заказа возникла ошибка. Подробности см. в истории изменений'
  }
}

export const getInfoCodeAlerts = id => {
  switch (id) {
    case 101:
      return {
        text: 'Технология подключения на новом адресе совпадает',
        alertType: 'success'
      }
    case 102:
      return {
        text: 'Технология подключения на новом адресе отличается. Необходимо выбрать новые скорость и оборудование',
        alertType: 'error'
      }
    case 103:
      return {
        text: `Технология подключения на новом адресе совпадает, но текущая скорость недоступна из-за ограничений.
          Необходимо выбрать новую скорость`,
        alertType: 'warning'
      }
    case 104:
      return {
        text: `Технология подключения на новом адресе совпадает.
          Обрати внимание - у абонента оборудование в аренду или рассрочку`,
        alertType: 'warning'
      }
    case 105:
      return {
        text: 'Не удалось определить текущие параметры подключения',
        alertType: 'error'
      }
  }
}

export const getReasonNameColor = id => {
  const checkId = dictionary => typeof dictionary[id] === 'string'

  switch (id) {
    case checkId(InversedDeferredReason):
      return 'orange'
    case checkId(InversedDuplicateReason):
      return 'yellow'
    case checkId(InversedInvalidReason):
      return 'red'
    case checkId(InversedRefusedReason):
      return 'blue'
    case checkId(InversedRescheduleReason):
      return 'pink'
    default:
      return 'gray'
  }
}

export function processHouse (address) {
  if (address?.BuildingName) {
    return processEmptyData([address?.HouseType, address?.HouseName, address?.BuildingType, address?.BuildingName])
  } else {
    return processEmptyData([address?.HouseType, address?.HouseName])
  }
}
export function processEmptyData (dataArray, separator = ' ') {
  const filtered = dataArray.filter(value => typeof value === 'string' && value.length > 0)
  return filtered?.length > 0 ? filtered.join(separator) : null
}

export function prepareHouseValueDadata (address) {
  return address?.Block
    ? `${address?.HouseType} ${address?.House} ${address?.BlockType} ${address?.Block}`
    : `${address?.HouseType} ${address?.House}`
}

export const formatOrderPrice = number =>
  number || number === 0
    ? number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00'

export function findSpeedToTechnology (orderData, speedToTechnology) {
  let predicate

  const broadbandAccessItem = getTariffItemByType(orderData, TariffTypes.BroadbandAccess)

  if (broadbandAccessItem) {
    predicate = item =>
      item.SpeedId === orderData?.BcSpeedId &&
      item.TechnologyId === orderData?.TechnologyId &&
      item.ServiceId === broadbandAccessItem?.Id
  } else {
    predicate = item => item.SpeedId === orderData?.BcSpeedId && item.TechnologyId === orderData?.TechnologyId
  }

  const speedToTechnologyItem = speedToTechnology?.find(predicate)

  return speedToTechnologyItem
}

export function getSpeedToTechnologyServiceId (orderData, speedToTechnology) {
  let serviceId

  const { ServiceId } = findSpeedToTechnology(orderData, speedToTechnology) ?? {}

  if (ServiceId) {
    serviceId = ServiceId
  } else {
    const { Id } = getTariffItemByType(orderData, TariffTypes.BroadbandAccess) ?? {}
    serviceId = Id
  }

  return serviceId
}

export function fillEquipments (orderData, equipmentTypes) {
  const equipmentsData = orderData?.Equipments ?? []
  const equipments = equipmentsData?.map(eq => {
    const purchaseLabel = eq.Cost ? eq.PurchaseTypeName + ' | ' + eq.Cost + ' руб.' : eq.PurchaseTypeName
    return {
      IsRequired: eq.IsRequired,
      TypeId: { value: eq.TypeId, label: eq.TypeName },
      SegmentId: { value: eq.SegmentId, label: eq.SegmentName },
      PurchaseTypeId: { value: eq.PurchaseTypeId, label: purchaseLabel }
    }
  })

  return { Equipments: equipments }
}

export function fillSpeedToTechnology (orderData, speedToTechnology) {
  if (speedToTechnology?.length < 1) {
    return {}
  }
  const serviceId = getSpeedToTechnologyServiceId(orderData, speedToTechnology)

  return { ServiceId: serviceId }
}

export function fillAddress (orderState) {
  const address = orderState?.Address?.find(address => checkAddressType(address, AddressTypeIds.Installation)) ?? null
  return {
    Region: {
      label: processEmptyData([address?.RegionName, address?.RegionType]),
      value: processEmptyData([address?.RegionName, address?.RegionType])
    },
    Address: processAddressValue(address),
    FlatName: processEmptyData([address?.FlatName]),
    Entrance: processEmptyData([address?.Entrance]),
    Floor: processEmptyData([address?.Floor]),
    Intercom: processEmptyData([address?.Intercom]),
    Comment: processEmptyData([address?.Comment])
  }
}

export function refillForm (orderData, orderState, speedToTechnology) {
  return {
    ...fillForm(orderState, orderData),
    ...fillSpeedToTechnology(orderData, speedToTechnology),
    ...fillEquipments(orderData)
  }
}

export function fillForm (orderState, orderData) {
  const {
    OrderRegionCode,
    Msisdn,
    NickName,
    ExpectedDateTime,
    Comment,
    Person,
    Contact,
    IsNewSubscriber,
    IsMnp,
    ReservedMsisdn,
    MnpMsisdn,
    Relocation
  } = orderState
  const rtcTimeslotId = orderData?.RtcTimeSlotId
  const timeslotTime = orderData?.TimeslotTimeFull
  const timeslotDate = orderData?.TimeSlotDate ? moment(orderData?.TimeSlotDate) : undefined

  const isWinkSetting = Boolean(getTariffItemByType(orderState, TariffTypes.Wink))

  return {
    // Main order information
    OrderRegionCode,
    Msisdn,
    NickName,
    ExpectedDateTime: ExpectedDateTime ? moment.utc(ExpectedDateTime).local() : null,
    IsNewSubscriber,
    IsMnp,
    ReservedMsisdn,
    MnpMsisdn,
    Comment,
    Relocation,
    // Person
    FirstName: Person?.FirstName,
    MiddleName: Person?.MiddleName,
    LastName: Person?.LastName,
    Sex: Person?.Sex,
    Birthday: Person?.Birthday ? moment.utc(Person?.Birthday).local() : null, // узнать приоритет биллинг или эти данные
    BirthPlace: Person?.BirthPlace,
    IsCitizen: Person?.IsCitizen,
    // Address
    [AddressTypes.Installation]: fillAddress(orderState),
    // Contacts
    Contacts: Contact ?? [],
    // Timeslots
    TimeSlotDate: rtcTimeslotId && timeslotDate?.isValid() ? timeslotDate : null,
    TimeSlotTime: rtcTimeslotId && timeslotTime,
    TimeSlotComment: orderData?.TimeSlotComment,
    IsWinkSetting: isWinkSetting
  }
}

export function loadFormFromState (orderState, order, selectedTimeslotData, speedToTechnology, equipmentTypes) {
  return {
    ...loadMainFields(orderState, selectedTimeslotData),
    ...loadTechnology(orderState, speedToTechnology),
    ...loadEquipments(orderState, order, equipmentTypes)
  }
}

export function loadMainFields (orderState, selectedTimeslotData) {
  const { OrderRegionCode, Msisdn, NickName, ExpectedDateTime, Comment, Person, Contact, IsMnp, IsNewSubscriber } =
    orderState
  const timeslotDateId = selectedTimeslotData?.TimeSlotDate
  const timeslotTimeId = selectedTimeslotData?.TimeSlotTime

  return {
    OrderRegionCode,
    Msisdn,
    NickName,
    ExpectedDateTime: ExpectedDateTime ? moment.utc(ExpectedDateTime).local() : null,
    Comment,
    IsNewSubscriber,
    IsMnp,
    // Person
    FirstName: Person?.FirstName,
    MiddleName: Person?.MiddleName,
    LastName: Person?.LastName,
    Sex: Person?.Sex,
    Birthday: Person?.Birthday ? moment.utc(Person?.Birthday).local() : null, // узнать приоритет биллинг или эти данные
    BirthPlace: Person?.BirthPlace,
    IsCitizen: Person?.IsCitizen,
    // Address
    [AddressTypes.Installation]: fillAddress(orderState),
    // Contacts
    Contacts: Contact ?? [],
    TimeSlotDate: timeslotDateId,
    TimeSlotTime: timeslotTimeId
  }
}

export function loadTechnology (orderState, speedToTechnology) {
  const serviceId = getSpeedToTechnologyServiceId(orderState, speedToTechnology)

  return { ServiceId: serviceId }
}

export function loadEquipments (orderState, order, equipmentTypes) {
  const equipments = []
  orderState?.EquipmentCodeList.forEach(rtcCode => {
    let eq = equipmentTypes?.reduce((prev, currentEq) => {
      const purchaseType = currentEq?.PurchaseTypes?.find(pType => pType.RtcCode === rtcCode)
      if (!purchaseType) return null
      const segment = currentEq?.Segments?.find(seg => seg.SegmentId === purchaseType.SegmentId)
      return {
        IsRequired: currentEq.IsRequired,
        TypeId: currentEq.EquipmentTypeId,
        TypeName: currentEq.EquipmentTypeName,
        SegmentId: purchaseType.SegmentId,
        SegmentName: segment.SegmentName,
        PurchaseTypeId: purchaseType.PurchaseTypeId,
        PurchaseTypeName: purchaseType.PurchaseTypeName,
        Cost: purchaseType.ServiceRentPrice
      }
    }, null)

    if (!eq) {
      eq = order?.Equipments?.find(eq => eq.RtcCode === rtcCode)
    }

    const purchaseLabel = eq?.Cost ? eq?.PurchaseTypeName + ' | ' + eq?.Cost : eq?.PurchaseTypeName

    equipments.push({
      IsRequired: eq?.IsRequired,
      TypeId: { value: eq?.TypeId, label: eq?.TypeName },
      SegmentId: { value: eq?.SegmentId, label: eq?.SegmentName },
      PurchaseTypeId: { value: eq?.PurchaseTypeId, label: purchaseLabel }
    })
  })
  return { Equipments: equipments }
}

export function getTimeslotsParams (orderState, selectedTechnology) {
  const installationAddress = getAddressByType(orderState, AddressTypes.Installation)
  return {
    IsOnlime: orderState.IsOnlime,
    RtcOrderId: orderState.RtcOrderId,
    OrponId: installationAddress?.OrponId,
    FlatName: installationAddress?.FlatName,
    RtcTechnologyId: selectedTechnology?.TechnologyName ?? orderState.BcTechnologyId,
    RegionCode: orderState.OrderRegionCode,
    OrderId: orderState.OrderId,
    KladrRegion: orderState.KladrRegion
  }
}

export function getDeleteTimeslotParams (orderState) {
  return {
    OrderId: orderState.OrderId,
    KladrRegion: orderState.KladrRegion,
    IsTimeSlotReserveCRM: orderState.IsTimeSlotReserveCRM
  }
}
