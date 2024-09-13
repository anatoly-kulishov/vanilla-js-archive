import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SigningCommon from 'webseller/common/signing/components/Signing/Signing'
import { getRecreateClientDocuments, goToNextRecreateClientStep, goToPrevRecreateClientStep } from '../reducer'
import { selectRecreateClientType } from '../selectors'
import { RecreateClientType } from '../helpers'

export default function Signing () {
  const recreateClientType = useSelector(selectRecreateClientType)

  const dispatch = useDispatch()

  const getPaperDocuments = () => dispatch(getRecreateClientDocuments())
  const goForward = () => dispatch(goToNextRecreateClientStep())
  const goBack = () => dispatch(goToPrevRecreateClientStep())

  return (
    <SigningCommon
      isOnlyPaperDocumentsScenario
      isNeedToUploadSignedDocuments={recreateClientType === RecreateClientType.OFFLINE}
      getPaperDocuments={getPaperDocuments}
      handleSigningUnavailable={goBack}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
