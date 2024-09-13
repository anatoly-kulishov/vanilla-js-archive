import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SigningCommon from 'webseller/common/signing/components/Signing/Signing'
import { selectTypeTerminationClient } from '../selectors'
import { TerminationClientStep, TerminationClientType } from '../helpers'
import { changeStepTerminationClient, getPaperDocumentsTerminationClient } from '../reducer'

export default function Signing () {
  const terminationClientType = useSelector(selectTypeTerminationClient)
  const isOffline = terminationClientType === TerminationClientType.OFFLINE

  const dispatch = useDispatch()

  const getPaperDocuments = () => dispatch(getPaperDocumentsTerminationClient())
  const goForward = () => {
    dispatch(changeStepTerminationClient(TerminationClientStep.RESULT))
  }
  const goBack = () => dispatch(changeStepTerminationClient(TerminationClientStep.OPERATION_PARAMS))

  return (
    <SigningCommon
      isOnlyPaperDocumentsScenario
      isNeedToUploadSignedDocuments
      isShowCommentary={isOffline}
      getPaperDocuments={getPaperDocuments}
      handleSigningUnavailable={goBack}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
