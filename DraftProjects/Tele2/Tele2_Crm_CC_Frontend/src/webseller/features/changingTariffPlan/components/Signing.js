import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SigningCommon from 'webseller/common/signing/components/Signing/Signing'
import { changeTariff } from 'reducers/services/tariffModalReducer'
import { selectChangingTariffParams } from 'webseller/features/changingTariffPlan/selectors'

import { ChangingTariffPlanStatusStep } from '../helpers'
import {
  changeStepChangingTariffPlan,
  checkPepCodeCChangingTariffPlan,
  getPaperDocumentsChangingTariffPlan,
  getSmsCodeChangingTariffPlan
} from '../actions'

export default function Signing () {
  const dispatch = useDispatch()
  const changingTariffParams = useSelector(selectChangingTariffParams)

  const getSmsCode = payload => dispatch(getSmsCodeChangingTariffPlan(payload))
  const checkPepCode = payload => dispatch(checkPepCodeCChangingTariffPlan(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsChangingTariffPlan(payload))

  const goForward = () => {
    dispatch(changeTariff(changingTariffParams))
    dispatch(changeStepChangingTariffPlan(ChangingTariffPlanStatusStep.RESULT))
  }

  return (
    <SigningCommon
      getSmsCode={getSmsCode}
      checkPepCode={checkPepCode}
      getPaperDocuments={getPaperDocuments}
      goForward={goForward}
    />
  )
}
