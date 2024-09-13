import React from 'react'

import ApprovePersonalData from './components/ApprovePersonalData'
import PersonalData from './components/PersonalData'
import Result from './components/Result'
import Signing from './components/Signing'

export const DuplicateRfaStep = {
  NONE: 'NONE',
  CHECK_ICC: 'CHECK_ICC',
  PERSONAL_DATA: 'PERSONAL_DATA',
  APPROVE_PERSONAL_DATA: 'APPROVE_PERSONAL_DATA',
  SIGNING: 'SIGNING',
  RESULT: 'RESULT'
}

const stepsMap = {
  [DuplicateRfaStep.PERSONAL_DATA]: {
    key: DuplicateRfaStep.PERSONAL_DATA,
    title: 'Введи данные клиента',
    render: () => <PersonalData />
  },
  [DuplicateRfaStep.APPROVE_PERSONAL_DATA]: {
    key: DuplicateRfaStep.APPROVE_PERSONAL_DATA,
    title: 'Проверка данных',
    render: () => <ApprovePersonalData />
  },
  [DuplicateRfaStep.SIGNING]: {
    key: DuplicateRfaStep.SIGNING,
    title: 'Проверка данных',
    render: () => <Signing />
  },
  [DuplicateRfaStep.RESULT]: {
    key: DuplicateRfaStep.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

export const stepsDuplicateRfa = [
  stepsMap[DuplicateRfaStep.PERSONAL_DATA],
  stepsMap[DuplicateRfaStep.APPROVE_PERSONAL_DATA],
  stepsMap[DuplicateRfaStep.SIGNING],
  stepsMap[DuplicateRfaStep.RESULT]
]

export const VALID_ATTEMPTS_COUNT_CHECK_ICC = 3
