import React from 'react'
import { useDispatch } from 'react-redux'

import { CHANGE_CODE_WORD_PROCESS_STEPS } from 'webseller/features/changeCodeWord/constants'
import Signing from 'webseller/common/signing/components/Signing/Signing'
import {
  changeCodeSim,
  checkPepCode as checkPepCodeAction,
  getPaperDocuments as getPaperDocumentsAction,
  getSmsCode as getSmsCodeAction,
  setChangeCodeWordProcessStep
} from 'webseller/features/changeCodeWord/reducer'

export default function SigningStep () {
  const dispatch = useDispatch()

  const getSmsCode = payload => dispatch(getSmsCodeAction(payload))
  const checkPepCode = payload => dispatch(checkPepCodeAction(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsAction(payload))

  const goForward = () => {
    dispatch(changeCodeSim())
    dispatch(setChangeCodeWordProcessStep(CHANGE_CODE_WORD_PROCESS_STEPS.RESULT))
  }

  const goBack = () => dispatch(setChangeCodeWordProcessStep(CHANGE_CODE_WORD_PROCESS_STEPS.CODE_WORD))

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
