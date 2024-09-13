import React from 'react'
import { useDispatch } from 'react-redux'

import Signing from 'webseller/common/signing/components/Signing/Signing'

import { MNP_ORDER_PROCESS_STEPS } from '../../constants'
import {
  checkPepCode as checkPepCodeAction,
  createMnpRequest,
  getPaperDocuments as getPaperDocumentsAction,
  getSmsCode as getSmsCodeAction,
  setMnpOrderProcessStep
} from '../../actions'

export default function SigningStep () {
  const dispatch = useDispatch()

  const getSmsCode = payload => dispatch(getSmsCodeAction(payload))
  const checkPepCode = payload => dispatch(checkPepCodeAction(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsAction(payload))
  const goForward = () => dispatch(createMnpRequest())
  const goBack = () => dispatch(setMnpOrderProcessStep(MNP_ORDER_PROCESS_STEPS.DOCUMENT_DATA))

  return (
    <Signing
      isNeedToUploadSignedDocuments
      isShowCommentary
      getPaperDocuments={getPaperDocuments}
      checkPepCode={checkPepCode}
      getSmsCode={getSmsCode}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
