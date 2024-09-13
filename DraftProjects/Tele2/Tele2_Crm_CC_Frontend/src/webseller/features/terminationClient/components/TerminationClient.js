import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'
import Steps from 'webseller/common/steps/components/Steps'
import { resetTerminationClient } from '../reducer'
import { getStepsTerminationClient } from '../helpers'
import { selectActiveStepTerminationClient, selectTypeTerminationClient } from '../selectors'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'

export default function TerminationClient () {
  const activeStep = useSelector(selectActiveStepTerminationClient)
  const type = useSelector(selectTypeTerminationClient)

  const dispatch = useDispatch()

  const resetProcess = () => {
    dispatch(clearFoundAddresses())
    dispatch(resetSigning())
    dispatch(resetTerminationClient())
  }

  const steps = getStepsTerminationClient(type)

  return <Steps steps={steps} activeStepKey={activeStep} resetProcess={resetProcess} />
}
