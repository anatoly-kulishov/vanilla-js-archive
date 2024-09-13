import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkRight } from 'utils/helpers'
import { getUserState } from 'selectors/index'
import { initAnonymousCorrectionData } from 'webseller/features/correctionData/reducer'
import WebSellerButtons from '../WebSellerButtons/WebSellerButtons'
import { ANONYMOUS_OPERATION_BUTTONS_IS_HIDDEN_MAP } from '../WebSellerButtons/constants'

export const AnonymousOperations = ({ isForbiddenMode }) => {
  const dispatch = useDispatch()

  const user = useSelector(getUserState)
  const isShowCorrectionData = checkRight(user, 'AS:ClientInfoUpdate')

  const initAnonymousCorrection = () => dispatch(initAnonymousCorrectionData())

  return (
    <WebSellerButtons
      isForbiddenMode={isForbiddenMode}
      onDocumentEditHandler={initAnonymousCorrection}
      isShowCorrectionData={isShowCorrectionData}
      operationButtonsIsHiddenMap={ANONYMOUS_OPERATION_BUTTONS_IS_HIDDEN_MAP}
    />
  )
}
