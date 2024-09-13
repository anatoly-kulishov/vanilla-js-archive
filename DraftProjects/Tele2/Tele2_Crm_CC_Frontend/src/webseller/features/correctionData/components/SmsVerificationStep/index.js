import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PepCode from 'webseller/common/signing/components/PepCode'
import SmsVerificationConfirmation from './components/SmsVerificationConfirmation'
import {
  checkVerificationPepCode,
  getVerificationSmsCode,
  rejectSmsVerification
} from '../../reducer'
import {
  selectIsLoadingCheckVerificationPepCodeCorrectionData,
  selectIsLoadingGetVerificationSmsCodeCorrectionData
} from '../../selectors'

const SmsVerificationStep = () => {
  const [isSmsVerificationConfirmed, setIsSmsVerificationConfirmed] = useState(false)

  const dispatch = useDispatch()

  const getSmsCode = payload => dispatch(getVerificationSmsCode(payload))
  const checkPepCode = payload => dispatch(checkVerificationPepCode(payload))
  const rejectSmsVerificationConfirmation = () => dispatch(rejectSmsVerification())

  const isLoadingGetVerificationSmsCode = useSelector(selectIsLoadingGetVerificationSmsCodeCorrectionData)
  const isLoadingCheckVerificationPepCode = useSelector(selectIsLoadingCheckVerificationPepCodeCorrectionData)

  const confirmVerification = () => {
    setIsSmsVerificationConfirmed(true)
  }

  const cancelVerification = () => {
    setIsSmsVerificationConfirmed(false)
  }

  return isSmsVerificationConfirmed ? (
    <PepCode
      isAllowToSendAnotherCode
      isLoadingGetCode={isLoadingGetVerificationSmsCode}
      isLoadingCheckCode={isLoadingCheckVerificationPepCode}
      placeholder='Код из СМС'
      getCode={getSmsCode}
      checkCode={checkPepCode}
      goBack={cancelVerification}
    />
  ) : (
    <SmsVerificationConfirmation onReject={rejectSmsVerificationConfirmation} onConfirm={confirmVerification} />
  )
}

export default SmsVerificationStep
