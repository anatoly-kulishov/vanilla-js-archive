import React from 'react'
import { useDispatch } from 'react-redux'

import SigningCommon from 'webseller/common/signing/components/Signing/Signing'
import {
  getSmsCodeDuplicateRfa,
  checkPepCodeDuplicateRfa,
  getPaperDocumentsDuplicateRfa,
  changeStepDuplicateRfa
} from 'webseller/features/duplicateRfa/reducer'
import { DuplicateRfaStep } from '../helpers'

export default function Signing () {
  const dispatch = useDispatch()

  const getSmsCode = payload => dispatch(getSmsCodeDuplicateRfa(payload))
  const checkPepCode = payload => dispatch(checkPepCodeDuplicateRfa(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsDuplicateRfa(payload))
  const goForward = () => dispatch(changeStepDuplicateRfa(DuplicateRfaStep.RESULT))
  const goBack = () => dispatch(changeStepDuplicateRfa(DuplicateRfaStep.APPROVE_PERSONAL_DATA))

  return (
    <SigningCommon
      getSmsCode={getSmsCode}
      checkPepCode={checkPepCode}
      getPaperDocuments={getPaperDocuments}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
