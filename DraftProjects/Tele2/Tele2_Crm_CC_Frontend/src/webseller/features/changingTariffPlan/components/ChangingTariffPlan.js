import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'
import Steps from 'webseller/common/steps/components/Steps'

import { createInteractionChangingTariffPlan, resetChangingTariffPlan } from '../actions'
import { selectActiveStepChangingClientStatus } from '../selectors'
import { stepsChangingTariffPlanStatus } from '../helpers'

export default function ChangingTariffPlan () {
  const dispatch = useDispatch()
  const activeStep = useSelector(selectActiveStepChangingClientStatus)

  const resetProcess = () => {
    dispatch(resetSigning())

    dispatch(resetChangingTariffPlan())
    dispatch(createInteractionChangingTariffPlan({ isError: true }))
  }

  return (
    <Steps
      title='Изменение тарифного плана'
      activeStepKey={activeStep}
      steps={stepsChangingTariffPlanStatus}
      resetProcess={resetProcess}
    />
  )
}
