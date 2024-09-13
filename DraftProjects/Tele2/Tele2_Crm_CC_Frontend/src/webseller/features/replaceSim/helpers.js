import React from 'react'

import { REPLACE_PROCESS_STEPS } from './constants'

import SearchSimStep from './components/SearchSimStep'
import DocumentStep from './components/DocumentStep'
import SigningStep from './components/SigningStep'
import ResultStep from './components/ResultStep'

const stepsMap = {
  [REPLACE_PROCESS_STEPS.SEARCH_VERIFICATION]: {
    key: REPLACE_PROCESS_STEPS.SEARCH_VERIFICATION,
    title: 'Поиск и проверка SIM',
    render: () => <SearchSimStep />
  },
  [REPLACE_PROCESS_STEPS.CUSTOMER_DATA]: {
    key: REPLACE_PROCESS_STEPS.CUSTOMER_DATA,
    title: 'Введи данные клиента',
    render: () => <DocumentStep />
  },
  [REPLACE_PROCESS_STEPS.SIGNING]: {
    key: REPLACE_PROCESS_STEPS.SIGNING,
    title: 'Подписание',
    render: () => <SigningStep />
  },
  [REPLACE_PROCESS_STEPS.RESULT]: {
    key: REPLACE_PROCESS_STEPS.RESULT,
    title: 'Результат',
    render: () => <ResultStep />
  }
}

const defaultSteps = [
  stepsMap[REPLACE_PROCESS_STEPS.SEARCH_VERIFICATION],
  stepsMap[REPLACE_PROCESS_STEPS.CUSTOMER_DATA],
  stepsMap[REPLACE_PROCESS_STEPS.SIGNING],
  stepsMap[REPLACE_PROCESS_STEPS.RESULT]
]

export const getSteps = () => {
  return defaultSteps
}
