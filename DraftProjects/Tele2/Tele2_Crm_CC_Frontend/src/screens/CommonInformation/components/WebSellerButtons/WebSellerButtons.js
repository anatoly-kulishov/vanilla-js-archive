import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Card from 'components/Card'

import OperationButton from './components/OperationButtons/OperationButtons'
import { OPERATION_BUTTONS, OPERATION_BUTTONS_VIEW_CONFIG } from './constants'

const WebSellerButtons = props => {
  const {
    isForbiddenMode,
    isLoadingInitRecreateClient,
    isLoadingInitTerminationClient,
    isShowCorrectionData,
    isShowDuplicateRfa,
    isLoadingInitReplaceSim,
    hasReplaceSimRights,
    onDocumentEditHandler,
    onReplaceSimHandler,
    onRecreateHandler,
    onDuplicateRfaHandler,
    onTerminationClientHandler,
    operationButtonsIsHiddenMap = {}
  } = props

  return (
    <Card
      isForbiddenMode={isForbiddenMode}
      header='Операции'
      flex={1}
      content={
        <WebSellerButtonsStyled>
          <OperationButton
            title={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.CORRECTION].title}
            onClick={onDocumentEditHandler}
            disabled={!isShowCorrectionData}
            icon={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.CORRECTION].icon}
            iconBackground={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.CORRECTION].iconBackground}
            isHidden={operationButtonsIsHiddenMap[OPERATION_BUTTONS.CORRECTION]}
          />
          <OperationButton
            title={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.RECREATION].title}
            onClick={onRecreateHandler}
            loading={isLoadingInitRecreateClient}
            icon={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.RECREATION].icon}
            iconBackground={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.RECREATION].iconBackground}
            isHidden={operationButtonsIsHiddenMap[OPERATION_BUTTONS.RECREATION]}
          />
          <OperationButton
            title={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.TERMINATION].title}
            onClick={onTerminationClientHandler}
            loading={isLoadingInitTerminationClient}
            icon={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.TERMINATION].icon}
            iconBackground={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.TERMINATION].iconBackground}
            isHidden={operationButtonsIsHiddenMap[OPERATION_BUTTONS.TERMINATION]}
          />
          <OperationButton
            title={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.REPLACE_SIM].title}
            onClick={onReplaceSimHandler}
            icon={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.REPLACE_SIM].icon}
            iconBackground={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.REPLACE_SIM].iconBackground}
            loading={isLoadingInitReplaceSim}
            disabled={!hasReplaceSimRights}
            isHidden={operationButtonsIsHiddenMap[OPERATION_BUTTONS.REPLACE_SIM]}
          />
          <OperationButton
            title={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.DUPLICATE_RFA].title}
            onClick={onDuplicateRfaHandler}
            disabled={!isShowDuplicateRfa}
            icon={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.DUPLICATE_RFA].icon}
            iconBackground={OPERATION_BUTTONS_VIEW_CONFIG[OPERATION_BUTTONS.DUPLICATE_RFA].iconBackground}
            isHidden={operationButtonsIsHiddenMap[OPERATION_BUTTONS.DUPLICATE_RFA]}
          />
        </WebSellerButtonsStyled>
      }
    />
  )
}

export default WebSellerButtons

WebSellerButtons.propTypes = {
  isLoadingInitRecreateClient: PropTypes.bool,
  isShowCorrectionData: PropTypes.bool,
  hasReplaceSimRights: PropTypes.bool,
  isLoadingInitReplaceSim: PropTypes.bool,
  onDocumentEditHandler: PropTypes.func,
  onReplaceSimHandler: PropTypes.func,
  onRecreateHandler: PropTypes.func,
  onDuplicateRfaHandler: PropTypes.func,
  onTerminationClientHandler: PropTypes.func,
  isShowDuplicateRfa: PropTypes.bool,
  isLoadingInitTerminationClient: PropTypes.bool,
  operationButtonsIsHiddenMap: PropTypes.object
}

const WebSellerButtonsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 10px;
  column-gap: 12px;
  justify-items: center;
  padding: 8px;
`
