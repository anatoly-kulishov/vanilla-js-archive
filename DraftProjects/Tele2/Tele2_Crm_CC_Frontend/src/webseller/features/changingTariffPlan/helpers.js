import React from 'react'

import Result from './components/Result'
import Signing from './components/Signing'

export const ChangingTariffPlanStatusStep = {
  NONE: 'NONE',
  SIGNING: 'SIGNING',
  RESULT: 'RESULT'
}

const stepsMap = {
  [ChangingTariffPlanStatusStep.SIGNING]: {
    key: ChangingTariffPlanStatusStep.SIGNING,
    title: 'Подписание',
    render: () => <Signing />
  },
  [ChangingTariffPlanStatusStep.RESULT]: {
    key: ChangingTariffPlanStatusStep.RESULT,
    title: 'Результат',
    render: () => <Result />
  }
}

export const stepsChangingTariffPlanStatus = [
  stepsMap[ChangingTariffPlanStatusStep.SIGNING],
  stepsMap[ChangingTariffPlanStatusStep.RESULT]
]
