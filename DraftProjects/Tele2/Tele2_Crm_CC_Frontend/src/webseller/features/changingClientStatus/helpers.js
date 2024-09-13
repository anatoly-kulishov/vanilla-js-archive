import React from 'react'

import ChangingParams from './components/ChangingParams'
import Result from './components/Result'
import Signing from './components/Signing'

export const ChangingClientStatusStep = {
  NONE: 'NONE',
  CHANGING_PARAMS: 'CHANGING_PARAMS',
  SIGNING: 'SIGNING',
  RESULT: 'RESULT'
}

const stepsMap = {
  [ChangingClientStatusStep.CHANGING_PARAMS]: {
    key: ChangingClientStatusStep.CHANGING_PARAMS,
    title: 'Изменение статуса абонента',
    render: () => <ChangingParams />
  },
  [ChangingClientStatusStep.SIGNING]: {
    key: ChangingClientStatusStep.SIGNING,
    title: 'Подписание',
    render: () => <Signing />
  },
  [ChangingClientStatusStep.RESULT]: {
    key: ChangingClientStatusStep.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

export const stepsChangingClientStatus = [
  stepsMap[ChangingClientStatusStep.CHANGING_PARAMS],
  stepsMap[ChangingClientStatusStep.SIGNING],
  stepsMap[ChangingClientStatusStep.RESULT]
]
