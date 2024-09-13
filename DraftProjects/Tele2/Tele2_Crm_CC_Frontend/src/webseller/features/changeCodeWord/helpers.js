import React from 'react'

import { CHANGE_CODE_WORD_PROCESS_STEPS } from './constants'

import CodeWordStep from './components/CodeWordStep/CodeWordStep'
import ResultStep from './components/ResultStep/ResultStep'
import SigningStep from './components/SigningStep'

const stepsMap = {
  [CHANGE_CODE_WORD_PROCESS_STEPS.CODE_WORD]: {
    key: CHANGE_CODE_WORD_PROCESS_STEPS.CODE_WORD,
    title: 'Кодовое слово',
    render: () => <CodeWordStep />
  },
  [CHANGE_CODE_WORD_PROCESS_STEPS.SIGNING]: {
    key: CHANGE_CODE_WORD_PROCESS_STEPS.SIGNING,
    title: 'Проверка наличия ПЭП',
    render: () => <SigningStep />
  },
  [CHANGE_CODE_WORD_PROCESS_STEPS.RESULT]: {
    key: CHANGE_CODE_WORD_PROCESS_STEPS.RESULT,
    title: 'Результат',
    render: () => <ResultStep />
  }
}

const defaultSteps = [
  stepsMap[CHANGE_CODE_WORD_PROCESS_STEPS.CODE_WORD],
  stepsMap[CHANGE_CODE_WORD_PROCESS_STEPS.SIGNING],
  stepsMap[CHANGE_CODE_WORD_PROCESS_STEPS.RESULT]
]

export const getSteps = () => {
  return defaultSteps
}
