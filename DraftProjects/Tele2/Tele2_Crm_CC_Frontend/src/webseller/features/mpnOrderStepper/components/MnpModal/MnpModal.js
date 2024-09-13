import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'
import Steps from 'webseller/common/steps/components/Steps'

import { createInteractionMnpOrder, resetMnpOrderProcess } from '../../actions'
import { selectMnpProcessStep } from '../../selectors'
import { getSteps } from '../../helpers'

function MnpModal () {
  const dispatch = useDispatch()

  const activeStep = useSelector(selectMnpProcessStep)

  const steps = getSteps()

  const resetProcess = () => {
    dispatch(resetSigning())
    dispatch(resetMnpOrderProcess())
    dispatch(createInteractionMnpOrder({ isError: true }))
  }

  return <Steps title='Оформление MNP заявки' steps={steps} activeStepKey={activeStep} resetProcess={resetProcess} />
}

export default MnpModal
