import React from 'react'
import { useDispatch } from 'react-redux'

import Signing from 'webseller/common/signing/components/Signing/Signing'
import {
  getSmsCode as getSmsCodeAction,
  checkPepCode as checkPepCodeAction,
  getPaperDocuments as getPaperDocumentsAction
} from 'webseller/features/replaceSim/reducer'

import { setReplacingProcessStep } from '../../reducer'
import { REPLACE_PROCESS_STEPS } from '../../constants'

export default function SigningStep () {
  const dispatch = useDispatch()

  const getSmsCode = payload => dispatch(getSmsCodeAction(payload))
  const checkPepCode = payload => dispatch(checkPepCodeAction(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsAction(payload))
  const goForward = () => dispatch(setReplacingProcessStep(REPLACE_PROCESS_STEPS.RESULT))
  const goBack = () => dispatch(setReplacingProcessStep(REPLACE_PROCESS_STEPS.CUSTOMER_DATA))

  return (
    <Signing
      getPaperDocuments={getPaperDocuments}
      checkPepCode={checkPepCode}
      getSmsCode={getSmsCode}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
