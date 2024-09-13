import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { checkRight } from 'utils/helpers'

import { checkHasReplaceSimRights } from '../../helpers/hasReplaceSimRights'
import WebSellerButtons from '../WebSellerButtons/WebSellerButtons'
import { selectIsNeedDuplicateRfa } from 'webseller/features/duplicateRfa/selectors'
import {
  getMarkerDuplicateRfa as getMarkerDuplicateRfaAction,
  initDuplicateRfa as initDuplicateRfaAction
} from 'webseller/features/duplicateRfa/reducer'
import { initTerminationClient as initTerminationClientAction } from 'webseller/features/terminationClient/reducer'
import { selectIsLoadingInitTerminationClient } from 'webseller/features/terminationClient/selectors'

const Operations = props => {
  // TODO перейти на useSelector и useDispatch
  const {
    isForbiddenMode,
    user,
    isLoadingInitRecreateClient,
    isLoadingInitReplaceSim,
    initRecreateClient,
    initCorrectionDataProcess,
    initReplaceSimProcess
  } = props

  const isNeedDuplicateRfa = useSelector(selectIsNeedDuplicateRfa)
  const isLoadingInitTerminationClient = useSelector(selectIsLoadingInitTerminationClient)

  const dispatch = useDispatch()

  const initDuplicateRfa = () => dispatch(initDuplicateRfaAction())
  const getMarkerDuplicateRfa = () => dispatch(getMarkerDuplicateRfaAction())
  const initTerminationClient = () => dispatch(initTerminationClientAction())

  const isShowCorrectionData = checkRight(user, 'AS:ClientInfoUpdate')
  const isShowDuplicateRfa = isNeedDuplicateRfa && checkRight(user, 'AS.ErfDuplicate')
  const hasReplaceSimRights = checkHasReplaceSimRights(user)

  const handleDocumentEditClick = () => {
    initCorrectionDataProcess()
  }

  const handleRecreateClick = () => {
    initRecreateClient()
  }

  useEffect(() => {
    getMarkerDuplicateRfa()
  }, [])

  return (
    <WebSellerButtons
      isForbiddenMode={isForbiddenMode}
      isLoadingInitRecreateClient={isLoadingInitRecreateClient}
      isLoadingInitTerminationClient={isLoadingInitTerminationClient}
      isShowCorrectionData={isShowCorrectionData}
      isShowDuplicateRfa={isShowDuplicateRfa}
      hasReplaceSimRights={hasReplaceSimRights}
      isLoadingInitReplaceSim={isLoadingInitReplaceSim}
      onDocumentEditHandler={handleDocumentEditClick}
      onReplaceSimHandler={initReplaceSimProcess}
      onRecreateHandler={handleRecreateClick}
      onDuplicateRfaHandler={initDuplicateRfa}
      onTerminationClientHandler={initTerminationClient}
    />
  )
}

export default Operations

Operations.propTypes = {
  isForbiddenMode: PropTypes.bool,
  user: PropTypes.object,
  isLoadingInitRecreateClient: PropTypes.bool,
  isLoadingInitReplaceSim: PropTypes.bool,
  initRecreateClient: PropTypes.func,
  initReplaceSimProcess: PropTypes.func,
  initCorrectionDataProcess: PropTypes.func
}
