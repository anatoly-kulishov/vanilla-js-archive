import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectChangeCodeWordStep } from 'webseller/features/changeCodeWord/selectors'
import { createInteractionChangeCodeWord, resetChangeCodeWordProcess } from 'webseller/features/changeCodeWord/reducer'
import { getSteps } from 'webseller/features/changeCodeWord/helpers'
import { resetSigning } from 'webseller/common/signing/reducer'
import Steps from 'webseller/common/steps/components/Steps'

function ChangeCodeWordModal () {
  const dispatch = useDispatch()

  const activeStep = useSelector(selectChangeCodeWordStep)

  const steps = getSteps()

  const resetProcess = () => {
    dispatch(resetSigning())
    dispatch(resetChangeCodeWordProcess())
    dispatch(createInteractionChangeCodeWord())
  }

  return <Steps title='Изменение кодового слова' steps={steps} activeStepKey={activeStep} resetProcess={resetProcess} />
}

export default ChangeCodeWordModal
