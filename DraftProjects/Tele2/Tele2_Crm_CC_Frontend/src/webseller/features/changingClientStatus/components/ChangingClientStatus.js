import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Steps from 'webseller/common/steps/components/Steps'
import { selectActiveStepChangingClientStatus } from '../selectors'
import { stepsChangingClientStatus } from '../helpers'
import { createIntercationChangingClientStatus, resetChangingClientStatus } from '../actions'
import { resetSigning } from 'webseller/common/signing/reducer'

export default function ChangingClientStatus () {
  const activeStep = useSelector(selectActiveStepChangingClientStatus)

  const dispatch = useDispatch()

  const resetProcess = () => {
    dispatch(resetSigning())

    dispatch(resetChangingClientStatus())
    dispatch(createIntercationChangingClientStatus())
  }

  return (
    <Steps
      title='Изменение статуса абонента'
      activeStepKey={activeStep}
      steps={stepsChangingClientStatus}
      resetProcess={resetProcess}
    />
  )
}
