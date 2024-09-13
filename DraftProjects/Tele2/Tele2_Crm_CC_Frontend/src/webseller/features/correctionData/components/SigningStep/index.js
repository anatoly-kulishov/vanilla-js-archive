import React, { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import store from 'utils/createdStore'
import featureConfig from 'webseller/featureConfig'
import Signing from 'webseller/common/signing/components/Signing/Signing'
import {
  getSmsCode as getSmsCodeAction,
  checkPepCode as checkPepCodeAction,
  getPaperDocuments as getPaperDocumentsAction,
  setCorrectionDataProcessStep
} from 'webseller/features/correctionData/reducer'
import { CORRECTION_PROCESS_STEPS } from 'webseller/features/correctionData/helpers'
import { selectIsOnlyPaperDocumentsScenarioCorrectionData } from '../../selectors'

const SigningRemote = React.lazy(() => import('websellerRemote/Signing'))

function DEPRECATEDsigningStepCorrectionData () {
  const dispatch = useDispatch()

  const isOnlyPaperDocumentsScenario = useSelector(selectIsOnlyPaperDocumentsScenarioCorrectionData)

  const getSmsCode = payload => dispatch(getSmsCodeAction(payload))
  const checkPepCode = payload => dispatch(checkPepCodeAction(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsAction(payload))
  const goForward = () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.RESULT))
  const goBack = () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA))

  return (
    <Signing
      isNeedToUploadSignedDocuments
      isShowCommentary
      getSmsCode={getSmsCode}
      checkPepCode={checkPepCode}
      getPaperDocuments={getPaperDocuments}
      goForward={goForward}
      goBack={goBack}
      isOnlyPaperDocumentsScenario={isOnlyPaperDocumentsScenario}
    />
  )
}

const REMOTEsigningStepCorrectionData = () => {
  const dispatch = useDispatch()

  const isOnlyPaperDocumentsScenario = useSelector(selectIsOnlyPaperDocumentsScenarioCorrectionData)

  const getSmsCode = payload => dispatch(getSmsCodeAction(payload))
  const checkPepCode = payload => dispatch(checkPepCodeAction(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsAction(payload))
  const goForward = () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.RESULT))
  const goBack = () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA))

  return (
    <Suspense fallback={null}>
      <SigningRemote
        store={store}
        isNeedToUploadSignedDocuments
        isShowCommentary
        getSmsCode={getSmsCode}
        checkPepCode={checkPepCode}
        getPaperDocuments={getPaperDocuments}
        goForward={goForward}
        goBack={goBack}
        isOnlyPaperDocumentsScenario={isOnlyPaperDocumentsScenario}
      />
    </Suspense>
  )
}

const SigningStepCorrectionData = featureConfig.isUseRemoteSigning
  ? REMOTEsigningStepCorrectionData
  : DEPRECATEDsigningStepCorrectionData

export default SigningStepCorrectionData
