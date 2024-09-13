import { getSelectedSpeedToTechnology } from 'helpers/speedToTechnology'
import { flow } from 'lodash-es'
import { MainFormFields } from '../../constants/form'
import {
  simNeedTariff,
  AgreementFields,
  PersonFields,
  TimeslotsFields,
  winkNeedTariff,
  broadbandAccessTariff
} from '../constants/form'
import { getTariffItemByType } from 'helpers/agreement'
import { TariffTypes } from 'constants/tariff'
import { getEquipmentsCodeList } from 'components/Broadband/helpers/equipments'

const getValue = (fieldName, propertyName) => changedFields => {
  const value = changedFields[fieldName]
  return !propertyName ? [fieldName, value] : [propertyName, value]
}

// mapping form field name -> property name
const processors = {
  Msisdn: getValue('Msisdn'),
  SubscriberId: getValue('SubscriberId'),
  SubscriberBranchId: getValue('SubscriberBranchId'),
  NickName: getValue('NickName'),
  ExpectedDateTime: getValue('ExpectedDateTime'),
  Comment: getValue('Comment'),
  SystemId: getValue('SystemId'),
  ChannelId: getValue('ChannelId'),
  ContactPoint: getValue('ContactPoint'),
  IsNewSubscriber: getValue('IsNewSubscriber'),
  IsMnp: getValue('IsMnp'),
  ReservedMsisdn: getValue('ReservedMsisdn'),
  MnpMsisdn: getValue('MnpMsisdn'),
  OrderRegionCode: getValue('OrderRegionCode'),
  Contacts: getValue('Contacts', 'Contact'),
  BusinessChannelKey: getValue('BusinessChannelKey'),
  IsWinkSetting: getValue('IsWinkSetting'),
  Relocation: getValue('Relocation'),
  OldRtcAccountNumber: getValue('OldRtcAccountNumber')
}

export function processMainInfo (changedFields) {
  if ('IsMnp' in changedFields && changedFields?.IsMnp) {
    return { IsMnp: true, IsNewSubscriber: true }
  }
}

// Process common fields
export function processCommonFields (changedFields) {
  const commonFields = {}
  for (const fieldName in changedFields) {
    if (!(fieldName in processors)) continue
    const processor = processors[fieldName]
    const [propertyName, value] = processor(changedFields)
    commonFields[propertyName] = value
  }
  return commonFields
}

// Process prices in statusbar on change of tech or equipment
export function processPrices (state, changedFields) {
  if (MainFormFields.ServiceId in changedFields || MainFormFields.Equipments in changedFields) {
    return {
      ...state.prices,
      fullPrice: getTechnologyPrice(state) + getEquipmentPrice(state)
    }
  }
  return state.prices
}

// Process changes in equipments field
export function processEquipments (state, changedFields) {
  const isEquipmentsChanged = MainFormFields.Equipments in changedFields
  if (!isEquipmentsChanged) {
    return {}
  }

  const selectedEquipments = changedFields[MainFormFields.Equipments]
  return getEquipmentsCodeList(selectedEquipments, state.equipmentTypes, state.order)
}

export function processSpeedToTechnology (state, changedFields) {
  const isSpeedToTechnologyChanged = MainFormFields.ServiceId in changedFields
  if (!isSpeedToTechnologyChanged) {
    return {}
  }

  const formValue = changedFields[MainFormFields.ServiceId]
  const { TechnologyName, SpeedId } = getSelectedSpeedToTechnology(state?.speedToTechnology, formValue) ?? {}
  return {
    BcTechnologyId: TechnologyName ?? state.order.data?.RtcTechnologyId,
    BcSpeedId: SpeedId ?? state.order.data?.BcSpeedId
  }
}

export function processPerson (state, changedFields) {
  const previousPersonState = state?.orderState?.Person
  const person = { ...previousPersonState }
  for (const field of Object.keys(changedFields)) {
    if (!(field in PersonFields)) continue
    if (field === 'Birthday' && changedFields[field]?.isValid()) {
      person[field] = changedFields[field].startOf('day').utcOffset(0, true).toISOString()
      continue
    }
    person[field] = changedFields[field]
  }
  return { Person: person }
}

function processAgreementTariff (formField, newTariffItem, changedFields) {
  return function (tariffState) {
    if (formField in changedFields) {
      const value = changedFields[formField]
      if (value) {
        tariffState.push(newTariffItem)
      } else {
        tariffState = tariffState.filter(item => item?.TypeCode !== newTariffItem.TypeCode)
      }
    }

    return tariffState
  }
}

function processAgreementTariffBroadbandAccess (speedToTechnology, changedFields) {
  return function (tariffState) {
    if (AgreementFields.ServiceId in changedFields) {
      const value = changedFields[AgreementFields.ServiceId]
      if (!value) {
        return tariffState
      }

      const { ServicePrice } = getSelectedSpeedToTechnology(speedToTechnology, value) ?? {}
      const nextBroadbandAccessItem = { ...broadbandAccessTariff, Id: value, Cost: ServicePrice }

      tariffState = tariffState.filter(item => item?.Type !== TariffTypes.BroadbandAccess)
      tariffState.push(nextBroadbandAccessItem)
    }
    return tariffState
  }
}

export function processAgreement (state, changedFields) {
  const isAgreementFieldsChanged = Object.keys(changedFields).some(field => field in AgreementFields)
  if (!isAgreementFieldsChanged) {
    return {}
  }

  if (changedFields[AgreementFields.Agreement]) {
    return { Agreement: changedFields[AgreementFields.Agreement] }
  }

  const prevTariffState = state.orderState?.Agreement?.Tariff ?? []

  const nextTariffState = flow([
    processAgreementTariff(MainFormFields.IsNewSubscriber, simNeedTariff, changedFields),
    processAgreementTariff(MainFormFields.IsWinkSetting, winkNeedTariff, changedFields),
    processAgreementTariffBroadbandAccess(state.speedToTechnology, changedFields)
  ])(prevTariffState)

  return {
    Agreement: {
      ...state.orderState.Agreement,
      Tariff: nextTariffState
    }
  }
}

export function processTimeslots (state, changedFields) {
  const isTimeslotsChanged = Object.keys(changedFields).some(field => field in TimeslotsFields)
  if (!isTimeslotsChanged) {
    return {}
  }

  if (changedFields?.TimeSlotComment) {
    return {
      TimeSlotComment: changedFields?.TimeSlotComment
    }
  }
}

export function getTechnologyPrice (state) {
  let predicate

  const broadbandAccessItem = getTariffItemByType(state.orderState, TariffTypes.BroadbandAccess)
  if (broadbandAccessItem) {
    predicate = item =>
      item.TechnologyName === state.orderState.BcTechnologyId &&
      item.SpeedId === state.orderState.BcSpeedId &&
      broadbandAccessItem?.Id === item.ServiceId
  } else {
    predicate = item =>
      item.TechnologyName === state.orderState.BcTechnologyId && item.SpeedId === state.orderState.BcSpeedId
  }
  const technologyItem = state?.speedToTechnology?.find(predicate)

  const technologyPrice = technologyItem?.ServicePrice ?? 0
  return technologyPrice
}

function findEquipmentCostInTypesData (equipmentTypes, rtcCode) {
  for (const eType of equipmentTypes) {
    const pType = eType?.PurchaseTypes?.find(pType => pType?.RtcCode === rtcCode)
    if (pType) return pType?.ServiceRentPrice ?? 0
  }
  return null
}

function findEquipmentCostInOrderData (order, rtcCode) {
  if (!order?.Equipments) {
    return 0
  }
  for (const eq of order.Equipments) {
    if (eq.rtcCode === rtcCode) {
      return eq.Cost
    }
  }
}

// find selected equipment by rtc codes and sum prices
export function getEquipmentPrice (state) {
  const equipmentCodes = new Set(state.orderState.EquipmentCodeList)
  if (equipmentCodes.size === 0 || !state.equipmentTypes) {
    return 0
  }
  let equipmentPrice = 0
  for (const rtcCode of equipmentCodes) {
    const currentCost = findEquipmentCostInTypesData(state.equipmentTypes, rtcCode)
    const archiveCost = findEquipmentCostInOrderData(state.order, rtcCode)
    equipmentPrice += currentCost || archiveCost
  }
  return equipmentPrice
}

export function processSelectedTimeslot (state, changedFields) {
  const changedTimeslotField = Object.keys(changedFields).find(field => field in TimeslotsFields)
  if (changedTimeslotField) {
    return {
      ...state.selectedTimeslotData,
      [changedTimeslotField]: changedFields[changedTimeslotField]
    }
  }
  return state.selectedTimeslotData
}
