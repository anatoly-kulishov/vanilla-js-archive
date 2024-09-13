import React from 'react'

import TransferNumber from './components/TransferNumber/TransferNumber'
import PersonalData from './components/PersonalData/PersonalData'
import ResultStep from './components/ResultStep/ResultStep'
import TransferTime from './components/TransferTime'
import SigningStep from './components/SigningStep'

import { MNP_ORDER_PROCESS_STEPS } from './constants'

const stepsMap = {
  [MNP_ORDER_PROCESS_STEPS.TRANSFER_NUMBER]: {
    key: MNP_ORDER_PROCESS_STEPS.TRANSFER_NUMBER,
    title: 'Какой номер перевести в Tele2?',
    render: () => <TransferNumber />
  },
  [MNP_ORDER_PROCESS_STEPS.TRANSFER_TIME]: {
    key: MNP_ORDER_PROCESS_STEPS.TRANSFER_TIME,
    title: 'Когда выполнить переход?',
    render: () => <TransferTime />
  },
  [MNP_ORDER_PROCESS_STEPS.DOCUMENT_DATA]: {
    key: MNP_ORDER_PROCESS_STEPS.DOCUMENT_DATA,
    title: 'Данные клиента',
    render: () => <PersonalData />
  },
  [MNP_ORDER_PROCESS_STEPS.SIGNING]: {
    key: MNP_ORDER_PROCESS_STEPS.SIGNING,
    title: 'Подписание',
    render: () => <SigningStep />
  },
  [MNP_ORDER_PROCESS_STEPS.RESULT]: {
    key: MNP_ORDER_PROCESS_STEPS.RESULT,
    title: 'Результат',
    render: () => <ResultStep />
  }
}

const defaultSteps = [
  stepsMap[MNP_ORDER_PROCESS_STEPS.TRANSFER_NUMBER],
  stepsMap[MNP_ORDER_PROCESS_STEPS.TRANSFER_TIME],
  stepsMap[MNP_ORDER_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[MNP_ORDER_PROCESS_STEPS.SIGNING],
  stepsMap[MNP_ORDER_PROCESS_STEPS.RESULT]
]

export const getSteps = () => {
  return defaultSteps
}
