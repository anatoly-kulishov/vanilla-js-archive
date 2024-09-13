import React from 'react'
import { useDispatch } from 'react-redux'

import SigningCommon from 'webseller/common/signing/components/Signing/Signing'
import { changeStepNumberRoleManagment, getPaperDocumentNumberRoleManagment } from '../reducer'
import { NumberRoleManagmentStep } from '../helpers'

export default function Signing () {
  const dispatch = useDispatch()

  const getPaperDocuments = payload => dispatch(getPaperDocumentNumberRoleManagment(payload))
  const goForward = () => dispatch(changeStepNumberRoleManagment(NumberRoleManagmentStep.RESULT))
  const goBack = () => dispatch(changeStepNumberRoleManagment(NumberRoleManagmentStep.ACCESS_LEVEL))

  return (
    <SigningCommon
      isOnlyPaperDocumentsScenario
      getPaperDocuments={getPaperDocuments}
      handleSigningUnavailable={goBack}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
