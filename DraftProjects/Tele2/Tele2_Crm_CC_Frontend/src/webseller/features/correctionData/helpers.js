import React from 'react'

import DocumentStep from './components/DocumentStep'
import ApproveDocumentStep from './components/ApproveDocumentStep'
import SigningStep from './components/SigningStep'
import ResultStep from './components/ResultStep'
import SmsVerificationStep from './components/SmsVerificationStep'

export const CORRECTION_PROCESS_STEPS = {
  NONE: 'NONE',
  SMS_VERIFICATION: 'SMS_VERIFICATION',
  DOCUMENT_DATA: 'DOCUMENT_DATA',
  APPROVE_DOCUMENT_DATA: 'APPROVE_DOCUMENT_DATA',
  SIGNING: 'SIGNING',
  RESULT: 'RESULT'
}

export const CORRECTION_PROCESS_TYPES = {
  DEFAULT: 'DEFAULT',
  ANONYMOUS: 'ANONYMOUS'
}

const stepsMap = {
  [CORRECTION_PROCESS_STEPS.SMS_VERIFICATION]: {
    key: CORRECTION_PROCESS_STEPS.SMS_VERIFICATION,
    title: 'SMS-верификация',
    render: () => <SmsVerificationStep />
  },
  [CORRECTION_PROCESS_STEPS.DOCUMENT_DATA]: {
    key: CORRECTION_PROCESS_STEPS.DOCUMENT_DATA,
    title: 'Введи данные клиента',
    render: () => <DocumentStep />
  },
  [CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA]: {
    key: CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA,
    title: 'Проверка данных',
    render: () => <ApproveDocumentStep />
  },
  [CORRECTION_PROCESS_STEPS.SIGNING]: {
    key: CORRECTION_PROCESS_STEPS.SIGNING,
    title: 'Подписание',
    render: () => <SigningStep />
  },
  [CORRECTION_PROCESS_STEPS.RESULT]: {
    key: CORRECTION_PROCESS_STEPS.RESULT,
    title: 'Результат',
    render: () => <ResultStep />
  }
}

const defaultSteps = [
  stepsMap[CORRECTION_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA],
  stepsMap[CORRECTION_PROCESS_STEPS.SIGNING],
  stepsMap[CORRECTION_PROCESS_STEPS.RESULT]
]

const anonymousSteps = [
  stepsMap[CORRECTION_PROCESS_STEPS.SMS_VERIFICATION],
  stepsMap[CORRECTION_PROCESS_STEPS.DOCUMENT_DATA],
  stepsMap[CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA],
  stepsMap[CORRECTION_PROCESS_STEPS.SIGNING],
  stepsMap[CORRECTION_PROCESS_STEPS.RESULT]
]

export const getSteps = correctionProcessType => {
  switch (correctionProcessType) {
    case CORRECTION_PROCESS_TYPES.ANONYMOUS: {
      return anonymousSteps
    }
    default: {
      return defaultSteps
    }
  }
}
