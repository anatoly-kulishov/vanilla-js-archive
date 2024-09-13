import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { sum } from 'lodash'

import AddSimStep from 'webseller/features/saleSim/components/AddSimStep/AddSimStep'
import SellSimStep from 'webseller/features/saleSim/components/SellSimStep'
import ScanSimsInOrderStep from 'webseller/features/saleSim/components/ScanSimsInOrderStep'
import DocumentStep from 'webseller/features/saleSim/components/DocumentStep'
import ApproveDocumentStep from 'webseller/features/saleSim/components/ApproveDocumentStep'
import TransferNumberStep from 'webseller/features/saleSim/components/TransferNumberStep'
import TransferTimeStep from 'webseller/features/saleSim/components/TransferTimeStep'
import TransferAdditionalInfoNumberStep from 'webseller/features/saleSim/components/TransferAdditionalInfoNumberStep'
import SigningStep from 'webseller/features/saleSim/components/SigningStep'
import SimsInOrderStep from 'webseller/features/saleSim/components/SimsInOrderStep'
import ResultStep from 'webseller/features/saleSim/components/ResultStep'
import { selectIsOrderProcessTypeSaleSim, selectOrderPriceSaleSim, selectSoldSimsSaleSim } from 'reducers/saleSim/selectors'

export const SALLING_PROCESS_STEPS = {
  NONE: 'NONE',
  ADD: 'ADD',
  SALE: 'SALE',
  SCAN_SIMS_IN_ORDER: 'SCAN_SIMS_IN_ORDER',
  TRANSFER_NUMBER: 'TRANSFER_NUMBER',
  TRANSFER_TIME: 'TRANSFER_TIME',
  TRANSFER_ADDITIONAL_INFO_NUMBER: 'TRANSFER_ADDITIONAL_INFO_NUMBER',
  DOCUMENT_DATA: 'DOCUMENT_DATA',
  APPROVE_DOCUMENT_DATA: 'APPROVE_DOCUMENT_DATA',
  SIGNING: 'SIGNING',
  SIMS_IN_ORDER: 'SIMS_IN_ORDER',
  RESULT: 'RESULT'
}

export const SallingProcessTypes = {
  DEFAULT: 'DEFAULT',
  TRANSFER: 'TRANSFER',
  ORDER: 'ORDER',
  MNP_ORDER: 'MNP_ORDER'
}

const stepsMap = {
  [SALLING_PROCESS_STEPS.ADD]: {
    key: SALLING_PROCESS_STEPS.ADD,
    title: 'Создание новой РФА',
    render: () => <AddSimStep />
  },
  [SALLING_PROCESS_STEPS.SALE]: {
    key: SALLING_PROCESS_STEPS.SALE,
    title: 'Проверь тариф и номер',
    render: () => <SellSimStep />
  },
  [SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER]: {
    key: SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER,
    title: 'Проверь тариф и номер',
    render: () => <ScanSimsInOrderStep />
  },
  [SALLING_PROCESS_STEPS.TRANSFER_NUMBER]: {
    key: SALLING_PROCESS_STEPS.TRANSFER_NUMBER,
    title: 'Какой номер перевести в Tele2?',
    render: () => <TransferNumberStep />
  },
  [SALLING_PROCESS_STEPS.TRANSFER_TIME]: {
    key: SALLING_PROCESS_STEPS.TRANSFER_TIME,
    title: 'Когда выполнить переход?',
    render: () => <TransferTimeStep />
  },
  [SALLING_PROCESS_STEPS.TRANSFER_ADDITIONAL_INFO_NUMBER]: {
    key: SALLING_PROCESS_STEPS.TRANSFER_ADDITIONAL_INFO_NUMBER,
    title: 'На какой номер отправить SMS о статусе переноса?',
    render: () => <TransferAdditionalInfoNumberStep />
  },
  [SALLING_PROCESS_STEPS.DOCUMENT_DATA]: {
    key: SALLING_PROCESS_STEPS.DOCUMENT_DATA,
    title: 'Введи данные клиента',
    render: () => <DocumentStep />
  },
  [SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA]: {
    key: SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA,
    title: 'Проверка данных',
    render: () => <ApproveDocumentStep />
  },
  [SALLING_PROCESS_STEPS.SIGNING]: {
    key: SALLING_PROCESS_STEPS.SIGNING,
    title: 'Подписание',
    render: () => <SigningStep />
  },
  [SALLING_PROCESS_STEPS.SIMS_IN_ORDER]: {
    key: SALLING_PROCESS_STEPS.SIMS_IN_ORDER,
    title: 'SIM-карты в заказе',
    render: () => <SimsInOrderStep />
  },
  [SALLING_PROCESS_STEPS.RESULT]: {
    key: SALLING_PROCESS_STEPS.RESULT,
    title: 'Результат',
    render: () => <ResultStep />
  }
}

const defaultSteps = [
  stepsMap[SALLING_PROCESS_STEPS.ADD],
  stepsMap[SALLING_PROCESS_STEPS.SALE],
  stepsMap[SALLING_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.SIGNING],
  stepsMap[SALLING_PROCESS_STEPS.SIMS_IN_ORDER],
  stepsMap[SALLING_PROCESS_STEPS.RESULT]
]

const mnpSteps = [
  stepsMap[SALLING_PROCESS_STEPS.ADD],
  stepsMap[SALLING_PROCESS_STEPS.SALE],
  stepsMap[SALLING_PROCESS_STEPS.TRANSFER_NUMBER],
  stepsMap[SALLING_PROCESS_STEPS.TRANSFER_TIME],
  stepsMap[SALLING_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.SIGNING],
  stepsMap[SALLING_PROCESS_STEPS.SIMS_IN_ORDER],
  stepsMap[SALLING_PROCESS_STEPS.RESULT]
]

const orderSteps = [
  stepsMap[SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER],
  stepsMap[SALLING_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.SIGNING],
  stepsMap[SALLING_PROCESS_STEPS.SIMS_IN_ORDER],
  stepsMap[SALLING_PROCESS_STEPS.RESULT]
]

const mnpOrderSteps = [
  stepsMap[SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER],
  stepsMap[SALLING_PROCESS_STEPS.TRANSFER_TIME],
  stepsMap[SALLING_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA],
  stepsMap[SALLING_PROCESS_STEPS.SIGNING],
  stepsMap[SALLING_PROCESS_STEPS.SIMS_IN_ORDER],
  stepsMap[SALLING_PROCESS_STEPS.RESULT]
]

export const getSteps = sallingProcessType => {
  switch (sallingProcessType) {
    case SallingProcessTypes.TRANSFER: {
      return mnpSteps
    }
    case SallingProcessTypes.ORDER: {
      return orderSteps
    }
    case SallingProcessTypes.MNP_ORDER: {
      return mnpOrderSteps
    }
    case SallingProcessTypes.DEFAULT:
    default: {
      return defaultSteps
    }
  }
}

export const isESim = simTypeId => simTypeId === SimTypeIds.E_SIM
export const isUntemplatedSim = partyTypeId => partyTypeId === 2 || partyTypeId === 4

export const NumbersCategorySlugId = {
  normal: 1,
  silver: 2,
  gold: 3,
  platina: 4
}

export const SimTypes = {
  1: 'SIM',
  2: 'eSIM'
}

export const SimTypeIds = {
  SIM: 1,
  E_SIM: 2
}

export const CallsPackageOtherRussiaUomMap = {
  min: 'мин'
}

export const InternetPackageUom = {
  mb: 'МБ',
  gb: 'ГБ'
}

export const AbonentFeePeriod = {
  day: 'день',
  month: 'месяц',
  '30days': 'месяц'
}

export const getTariffInfoRowText = tariff => {
  if (!tariff) {
    return
  }

  const abonentFeeText = tariff.abonentFee
    ? `${tariff.abonentFee} ₽/${AbonentFeePeriod[tariff.abonentFeePeriod]}`
    : null
  const internetPackageText = tariff.internetPackage
    ? `${tariff.internetPackage} ${InternetPackageUom[tariff.internetPackageUom]}`
    : null
  const callsPackageText = tariff.callsPackageOtherRussia
    ? `${tariff.callsPackageOtherRussia} ${CallsPackageOtherRussiaUomMap[tariff.callsPackageOtherRussiaUom]}`
    : null
  const smsPackageText = tariff.smsPackageRussia ? `${tariff.smsPackageRussia} SMS` : null

  return [abonentFeeText, internetPackageText, callsPackageText, smsPackageText].reduce(
    (acc, info) => (info ? `${acc} ${info};` : acc),
    ''
  )
}

export const getTariffInfoRowTextForOrder = (simInOrder) => {
  if (!simInOrder) {
    return
  }

  return `${simInOrder.tariffPrice} ₽/${AbonentFeePeriod.month}`
}

export const useSumOfSimPrice = (addedSims, connectionFee = 0, isNeedToCalculateSum = false) => {
  const soldSims = useSelector(selectSoldSimsSaleSim)
  const isOrderProcess = useSelector(selectIsOrderProcessTypeSaleSim)
  const orderPrice = useSelector(selectOrderPriceSaleSim)

  return useMemo(() => {
    if (isOrderProcess) {
      return orderPrice
    }

    return addedSims.reduce((currSum, sim, idx) => {
      const isTemplatedSim = sim.partyTypeId !== 2 && sim.partyTypeId !== 4
      const untemplatedFee = isNeedToCalculateSum ? sum([sim.tariff?.abonentFee, connectionFee, sim.numberPrice]) : soldSims?.[idx]?.price
      const fee = isTemplatedSim ? sim.balance : untemplatedFee
      return sum([fee, currSum])
    }, 0)
  }, [addedSims, soldSims, isOrderProcess])
}

export const RegistrationStatusIds = {
  ORDER_CREATION: 1,
  SIM_REGISTRATION: 2,
  SUCCESS: 3,
  PAYMENT_PENDING: 4,
  SUCCESS_WITH_BALANCE: 5,
  SUCCESS_WITH_BALANCE_ERROR: 6,
  ERROR: 7,
  ERROR_ALT: 8
}

export const StatusGetExistingPersonalData = {
  NONE: 'NONE',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export const RegistrationStatusViews = {
  1: {
    title: 'Создаем заказ...',
    color: 'rgb(104, 192, 230)'
  },
  2: {
    title: 'Регистрируем SIM-карту...',
    color: 'rgba(104, 192, 230)'
  },
  3: {
    title: 'SIM-карта зарегистрирована',
    color: 'rgb(100, 212, 158)'
  },
  4: {
    title: 'Ожидается платеж...',
    color: 'rgb(100, 212, 158)'
  },
  5: {
    title: 'SIM-карта зарегистрирована, баланс пополнен',
    color: 'rgb(100, 212, 158)'
  },
  6: {
    title: 'SIM-карта зарегистрирована, ошибка при пополнении баланса',
    color: 'rgb(100, 212, 158)'
  },
  7: {
    title: 'Ошибка при регистрации SIM-карты',
    color: 'rgb(255, 154, 154)'
  },
  8: {
    title: 'Ошибка при регистрации SIM-карты',
    color: 'rgb(255, 154, 154)'
  }
}

export const isSuccessRegistrationSimStatus = statusId =>
  statusId === RegistrationStatusIds.SUCCESS ||
  statusId === RegistrationStatusIds.SUCCESS_WITH_BALANCE ||
  statusId === RegistrationStatusIds.SUCCESS_WITH_BALANCE_ERROR

export const isFinalRegistartionSimStatus = statusId =>
  isSuccessRegistrationSimStatus(statusId) ||
  statusId === RegistrationStatusIds.ERROR ||
  statusId === RegistrationStatusIds.ERROR_ALT
