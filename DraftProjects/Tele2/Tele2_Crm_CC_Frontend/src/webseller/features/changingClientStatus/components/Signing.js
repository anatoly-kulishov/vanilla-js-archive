import React from 'react'
import { useDispatch } from 'react-redux'

import SigningCommon from 'webseller/common/signing/components/Signing/Signing'
import {
  changeStepChangingClientStatus,
  checkPepCodeChangingClientStatus,
  getPaperDocumentsChangingClientStatus,
  getSmsCodeChangingClientStatus
} from '../actions'
import { ChangingClientStatusStep } from '../helpers'

export default function Signing () {
  const dispatch = useDispatch()

  const getSmsCode = payload => dispatch(getSmsCodeChangingClientStatus(payload))
  const checkPepCode = payload => dispatch(checkPepCodeChangingClientStatus(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsChangingClientStatus(payload))

  const goForward = () => dispatch(changeStepChangingClientStatus(ChangingClientStatusStep.RESULT))
  const goBack = () => dispatch(changeStepChangingClientStatus(ChangingClientStatusStep.CHANGING_PARAMS))

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
