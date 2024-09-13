import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SALLING_PROCESS_STEPS, SallingProcessTypes } from 'webseller/features/saleSim/helpers'
import Signing from 'webseller/common/signing/components/Signing/Signing'
import { SigningScenario } from 'webseller/common/signing/helpers'
import {
  setSallingProcessStep,
  getPepNumbers as getPepNumbersAction,
  getSmsCode as getSmsCodeAction,
  getDocumentCode as getDocumentCodeAction,
  checkPepCode as checkPepCodeAction,
  getPaperDocuments as getPaperDocumentsAction
} from 'reducers/saleSim/saleSimReducer'
import { selectTypeSaleSim } from 'reducers/saleSim/selectors'
import features from 'webseller/featureConfig'
import { resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'

const { isUseSmev } = features

export default function SigningStep () {
  const saleSimType = useSelector(selectTypeSaleSim)

  const isMnp = saleSimType === SallingProcessTypes.TRANSFER || saleSimType === SallingProcessTypes.MNP_ORDER

  const dispatch = useDispatch()

  const getPepNumbers = payload => dispatch(getPepNumbersAction(payload))
  const getSmsCode = payload => dispatch(getSmsCodeAction(payload))
  const getDocumentCode = payload => dispatch(getDocumentCodeAction(payload))
  const checkPepCode = payload => dispatch(checkPepCodeAction(payload))
  const getPaperDocuments = payload => dispatch(getPaperDocumentsAction(payload))
  const goForward = () => dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.SIMS_IN_ORDER))
  const goBack = () => {
    dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.DOCUMENT_DATA))
    if (isUseSmev) {
      dispatch(resetCheckSmev())
    }
  }

  return (
    <Signing
      isAllowToSkipSigning
      signingScenario={SigningScenario.PEP_NUMBERS}
      textGetPaperDocuments='Распечатать договор и заявления'
      isNeedToUploadSignedDocuments={isMnp}
      textUploadSignedDocuments='Отсканируй и загрузи "Заявление о перенесении номера"'
      requiredCountOfSignedDocuments={isMnp ? 1 : undefined}
      getPepNumbers={getPepNumbers}
      getSmsCode={getSmsCode}
      getDocumentCode={getDocumentCode}
      checkPepCode={checkPepCode}
      getPaperDocuments={getPaperDocuments}
      goForward={goForward}
      goBack={goBack}
    />
  )
}
