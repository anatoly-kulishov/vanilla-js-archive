import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckIcc from './CheckIcc'
import Steps from 'webseller/common/steps/components/Steps'
import { DuplicateRfaStep, stepsDuplicateRfa } from '../helpers'
import {
  selectActiveStepDuplicateRfa,
  selectAttemptsCountCheckIccDuplicateRfa,
  selectIsLoadingCheckIccDuplicateRfa
} from '../selectors'
import {
  checkIccDuplicateRfa,
  createInteractionDuplicateRfa,
  resetDuplicateRfa as resetDuplicateRfaAction
} from '../reducer'
import { getPersonalAccountState } from 'selectors/index'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'

export default function DuplicateRfa () {
  const activeStep = useSelector(selectActiveStepDuplicateRfa)
  const attemptsCountCheckIcc = useSelector(selectAttemptsCountCheckIccDuplicateRfa)
  const isLoadingCheckIcc = useSelector(selectIsLoadingCheckIccDuplicateRfa)
  const { Msisdn: clientMsisdn } = useSelector(getPersonalAccountState)

  const dispatch = useDispatch()

  const checkIcc = payload => dispatch(checkIccDuplicateRfa(payload))
  const resetProcess = () => {
    dispatch(createInteractionDuplicateRfa())

    dispatch(clearFoundAddresses())
    dispatch(resetAgreements())
    dispatch(resetSigning())
    dispatch(resetDuplicateRfaAction())
  }

  if (activeStep === DuplicateRfaStep.CHECK_ICC) {
    return (
      <CheckIcc
        msisdn={clientMsisdn}
        attemptsCount={attemptsCountCheckIcc}
        isLoading={isLoadingCheckIcc}
        checkIcc={checkIcc}
        handleClose={resetProcess}
      />
    )
  }

  return (
    <Steps title='Дубликат договора' steps={stepsDuplicateRfa} activeStepKey={activeStep} resetProcess={resetProcess} />
  )
}
