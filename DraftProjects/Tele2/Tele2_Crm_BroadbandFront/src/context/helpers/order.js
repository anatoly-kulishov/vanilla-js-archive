import { get, isNil } from 'lodash-es'
import moment from 'moment'
import { AddressTypeIds } from '../../constants/address'
import { InstallationAddressProperties } from '../constants/address'
import { orderState as initialOrderState } from '../constants/initialState'
import { parseAddressData } from './address'
import { getTariffItemByType, parseSelectedTariff } from 'helpers/agreement'
import { TariffTypes } from 'constants/tariff'
import { getEquipmentPrice, getTechnologyPrice } from './stateMainForm'
import { findSpeedToTechnology } from 'components/Broadband/helpers/broadband'

const fallbackChannelId = 'e67615b1-ccbc-e811-8129-001dd8b71cff'

const orderProperties = [
  'RtcOrderId',
  'OrderId',
  'Msisdn',
  'NickName',
  'ExpectedDateTime',
  'BcSpeedId',
  'Comment',
  'SystemId',
  'ContactPoint',
  'IsOnlime',
  'AvailableSpeedValue',
  'AvailableTechnology',
  'IsNewSubscriber',
  'IsMnp',
  'ReservedMsisdn',
  'MnpMsisdn',
  'OrderRegionCode',
  'TimeSlotId',
  'TimeSlotDate',
  'TimeSlotTime',
  'TimeSlotTimeEnd',
  'TimeSlotComment',
  'KladrRegion',
  'RtcTimeSlotId',
  'IsTimeSlotReserveCRM',
  'ChannelId',
  'SubscriberId',
  'SubscriberBranchId',
  'BusinessChannelKey',
  'RtcOrderNum',
  'UpsaleOrderStatusId',
  'UpsaleOrderStatusName',
  'Relocation',
  'OldRtcAccountNumber',
  'CrmOrderId'
]

const personProperties = [
  'FirstName',
  'MiddleName',
  'LastName',
  'Sex',
  'Birthday',
  'BirthPlace',
  'IsCitizen',
  'Comment'
]

function parsePerson (orderData) {
  const person = {}
  const personData = orderData?.Person ?? {}
  for (const propertyName of personProperties) {
    const defaultValue = get(initialOrderState.Person, propertyName, undefined)
    if (propertyName === 'Birthday') {
      const birthdayData = get(personData, propertyName, null)
      person[propertyName] = birthdayData ? moment.utc(birthdayData).local() : defaultValue
      continue
    }
    person[propertyName] = get(personData, propertyName, defaultValue)
  }
  return person
}

function parseEquipment (orderData) {
  const codeList = []
  const equipmentsData = orderData?.Equipments ?? []
  for (const item of equipmentsData) {
    const rtcCode = item?.RtcCode
    rtcCode && codeList.push(rtcCode)
  }
  return codeList
}

function parseAddress (orderData) {
  if (isNil(orderData?.Address)) {
    return []
  }
  const installationAddress = parseAddressData(
    orderData?.Address,
    AddressTypeIds.Installation,
    InstallationAddressProperties
  )
  return [installationAddress]
}

export function parseOrderToMainState (state, orderData) {
  const orderState = { ...state.orderState }
  for (const propertyName of orderProperties) {
    const defaultValue = get(initialOrderState, propertyName, undefined)
    orderState[propertyName] = get(orderData, propertyName, defaultValue)
  }
  const defaultDuration = get(initialOrderState, 'Duration', undefined)
  orderState.Duration = get(orderData, 'TimeSlotDuration', defaultDuration)

  if (orderData?.IsMnp && !orderData?.IsNewSubscriber) {
    orderState.IsNewSubscriber = true
  }

  if (!orderState.ChannelId) {
    orderState.ChannelId = fallbackChannelId
  }
  orderState.Contact = orderData?.Contacts
  orderState.Person = parsePerson(orderData)
  orderState.Address = parseAddress(orderData)
  orderState.Agreement = orderData?.Agreement
  orderState.EquipmentCodeList = parseEquipment(orderData)
  return orderState
}

export function processStatusChanges (state, data) {
  return {
    statusId: data?.OrderStatusId || state.orderStatusState.statusId,
    statusName: data?.OrderStatusName || state.orderStatusState.statusName
  }
}

export function parseStatusToState (data) {
  return {
    statusId: data?.StatusId,
    statusName: data?.StatusName
  }
}

export function parseReasonToState (data) {
  return {
    reasonId: data?.ReasonId,
    reasonName: data?.ReasonName
  }
}

export function parseCallDate (data) {
  if (!data) return { start: null, end: null }
  const { CallDateStart, CallDateEnd } = data
  let start = CallDateStart && moment.utc(CallDateStart)
  start = start?.isValid() && start.utcOffset(180)

  let end = CallDateEnd && moment.utc(CallDateEnd)
  end = end?.isValid() && end.utcOffset(180)

  if (!start) {
    return { start: null, end: null }
  }
  if (start && !end) {
    end = start.clone().endOf('day')
  }
  return { start, end }
}

export function processPerformToState (state, performData) {
  const result = { ...state.orderState }
  if (performData?.OrderId) {
    result.OrderId = performData?.OrderId
  }
  return result
}

export function processSubscriberTariff (orderState, tariffData) {
  const prevTariffItem = getTariffItemByType(orderState, TariffTypes.Tariff)
  if (prevTariffItem || !tariffData?.IsAvailableBroadbandAccess) {
    return orderState?.Agreement
  }

  const tariffItem = parseSelectedTariff(tariffData)
  const agreementState = orderState?.Agreement ?? {}
  if (!agreementState?.Tariff) {
    agreementState.Tariff = []
  }
  agreementState.Tariff.push(tariffItem)
  return agreementState
}

export function parseSpeedToState (state, speedToTechnologyData) {
  const orderState = { ...state.orderState }
  const orderData = { ...orderState, TechnologyId: state.order.data?.TechnologyId }

  const { TechnologyName, SpeedId } = findSpeedToTechnology(orderData, speedToTechnologyData) ?? {}

  orderState.BcTechnologyId = TechnologyName ?? state.order.data?.BcTechnologyId
  orderState.BcSpeedId = SpeedId ?? state.order.data?.BcSpeedId

  return orderState
}

export function recalculateFullPrice (state) {
  return {
    ...state.prices,
    fullPrice: getTechnologyPrice(state) + getEquipmentPrice(state)
  }
}
