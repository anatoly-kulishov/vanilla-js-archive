import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSteps } from 'webseller/features/correctionData/helpers'
import Steps from 'webseller/common/steps/components/Steps'
import { selectActiveStepCorrectionData, selectProcessTypeCorrectionData } from '../../selectors'
import { resetSigning } from 'webseller/common/signing/reducer'
import { createInteractionCorrectionData, resetCorrectionDataProcess } from '../../reducer'
import actionsWebSellerRemote from 'webseller/remote/actions'
import featureConfig from 'webseller/featureConfig'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'
import { actionSigningRemote } from 'websellerRemote/Signing'

export default function CorrectionDataModal () {
  const correctionDataProcessStep = useSelector(selectActiveStepCorrectionData)
  const correctionProcessType = useSelector(selectProcessTypeCorrectionData)

  const dispatch = useDispatch()

  const resetProcess = () => {
    dispatch(createInteractionCorrectionData())

    dispatch(resetCorrectionDataProcess())
    dispatch(featureConfig.isUseRemoteSigning ? actionSigningRemote.resetState() : resetSigning())
    dispatch(featureConfig.isUseRemoteDocumentIdentity ? actionsWebSellerRemote.documentIdentity.resetState() : clearFoundAddresses())
  }

  const steps = getSteps(correctionProcessType)

  return (
    <Steps
      title='Корректировка'
      activeStepKey={correctionDataProcessStep}
      steps={steps}
      resetProcess={resetProcess}
    />
  )
}
