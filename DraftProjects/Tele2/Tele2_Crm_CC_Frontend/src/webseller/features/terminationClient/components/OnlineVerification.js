import React from 'react'
import { useDispatch } from 'react-redux'
import SmsVerification from 'webseller/common/verification/SmsVerification'
import { cancelTerminationClient, verifySmsCodeTerminationClient } from '../reducer'

export default function OnlineVerification () {
  const dispatch = useDispatch()

  const verifySmsCode = (code) => dispatch(verifySmsCodeTerminationClient(code))
  const handleCancelledVerification = () => dispatch(cancelTerminationClient())

  return <SmsVerification verifySmsCode={verifySmsCode} handleCancelledVerification={handleCancelledVerification} />
}
