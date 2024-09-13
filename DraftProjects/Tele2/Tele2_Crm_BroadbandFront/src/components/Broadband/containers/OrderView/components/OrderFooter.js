import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Button, Popconfirm, notification } from 'antd'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { availableConditions, blockConditions, Operation } from 'constants/operations'
import { ReasonModal } from './ReasonModal'
import { useReasonModal } from '../hooks/useReasonModal'
import {
  checkHistory,
  checkRights,
  checkStatus,
  getOperationId,
  getOperationTitle,
  prepareParams
} from '../../../helpers/orderFooter'

export default function Footer (props) {
  const { form, userRights, areFormControlsEnabled, areFormActionsEnabled } = props

  const {
    isFormChanged,
    order,
    orderState,
    orderStatusState,
    orderHistory,
    reasonsState,
    getOrderRtcStatuses,
    // Operations
    cancelOrder,
    deleteOrder,
    changeOrderWaitState,
    transferOrder,
    performOrder,
    getOperationReasons
  } = useBroadbandContext()
  const { OrderId } = orderState
  const { statusId } = orderStatusState

  const {
    openReasonModal,
    openConfirmModal,
    closeModal,
    isVisible: isModalVisible,
    title: modalTitle,
    operation: modalOperation
  } = useReasonModal()
  const [currentOperation, setCurrentOperation] = useState(null)

  const finishOperation = useCallback(
    operationData => {
      const orderParams = prepareParams(
        operationData?.operation,
        orderState,
        orderStatusState,
        reasonsState,
        operationData?.operationId,
        operationData?.reasonId
      )

      switch (operationData?.operation) {
        case Operation.CancelTransfer:
        case Operation.Cancel:
          cancelOrder(orderParams)
          break
        case Operation.Process:
          performOrder(orderParams)
          break
        case Operation.Reject:
          deleteOrder(orderParams)
          break
        case Operation.Return:
          changeOrderWaitState(orderParams)
          break
        case Operation.Save:
          performOrder(orderParams)
          break
        case Operation.Transfer:
          transferOrder(orderParams)
          break
        case Operation.Wait:
          changeOrderWaitState(orderParams)
          break
        default:
          break
      }
    },
    [orderState, orderStatusState, reasonsState]
  )

  const handleSaveButton = useCallback(
    operation => async () => {
      try {
        await form.validateFields()
        finishOperation({ operation })
      } catch {
        notification.error({
          message: 'Недостаточно данных на форме заявки ШПД',
          description: 'Пожалуйста, проверьте поля, подсвеченные красным'
        })
      }
    },
    [finishOperation]
  )

  const handleTransferButton = useCallback(() => {
    if (!isFormChanged) {
      const onOk = () => {
        finishOperation({ operation: Operation.Transfer })
      }
      openConfirmModal(`Подтвердите передачу заявки ${OrderId} в РТК`, onOk)
    }
  }, [openConfirmModal, finishOperation, isFormChanged])

  const handleStatusChangeButton = useCallback(
    operation => () => {
      getOperationReasons({ OperationId: getOperationId(operation) })
      setCurrentOperation({ operation })
      openReasonModal(getOperationTitle(operation), operation)
    },
    [getOperationReasons, setCurrentOperation, openReasonModal]
  )

  const handleReturnRtcStatus = useCallback(async () => {
    finishOperation({ operation: Operation.Status, operationId: 104, reasonId: 10401 })
  }, [finishOperation])

  const handleModalOk = useCallback(() => {
    finishOperation(currentOperation)
    closeModal()
  }, [finishOperation, currentOperation, closeModal])

  const handleModalCancel = useCallback(() => {
    closeModal()
  }, [closeModal])

  const orderData = order.data
  const isFooterEnabled = areFormControlsEnabled

  const isButtonAvailable = useCallback(
    button => {
      const lastHistoryItem = orderHistory?.length > 0 ? orderHistory[0] : undefined
      const isAvailable =
        availableConditions[button]?.some(
          condition =>
            checkStatus(condition, statusId) &&
            checkRights(condition, userRights) &&
            checkHistory(condition, lastHistoryItem)
        ) ?? false

      const isBlocked =
        blockConditions[button]?.some(
          condition =>
            checkStatus(condition, statusId) &&
            checkRights(condition, userRights) &&
            checkHistory(condition, lastHistoryItem)
        ) ?? false
      return isAvailable && !isBlocked
    },
    [statusId, userRights, orderHistory]
  )

  const availability = useMemo(
    () => ({
      isReturnRtcStatusAvailable: isButtonAvailable('returnStatus'),
      isSaveButtonAvailable: isButtonAvailable('save'),
      isProcessButtonAvailable: isButtonAvailable('process'),
      isCancelButtonAvailable: isButtonAvailable('cancel'),
      isCancelTransferButtonAvailable: isButtonAvailable('rtcErrorCancel') && orderData?.IsTransferOrderToRtcError,
      isRejectButtonAvailable: isButtonAvailable('reject') && OrderId,
      isTransferButtonAvailable: isButtonAvailable('transfer'),
      isWaitButtonAvailable: isButtonAvailable('wait'),
      isReturnButtonAvailable: isButtonAvailable('return')
    }),
    [statusId, userRights, orderData, orderHistory, isButtonAvailable, OrderId]
  )

  useEffect(() => {
    if (availability.isSetStatusButtonAvailable) {
      getOrderRtcStatuses({ StatusId: statusId })
    }
  }, [statusId, availability])

  const buttonsDisabledByOrderHistory = useMemo(() => {
    if (statusId === 35 && orderHistory?.length > 0) {
      const lastChange = orderHistory[0]
      return lastChange.ReasonId === null
    }
    return false
  }, [statusId, orderHistory])

  const isButtonsDisabled = useMemo(
    () => ({
      returnStatus: buttonsDisabledByOrderHistory || !areFormActionsEnabled,
      cancel: buttonsDisabledByOrderHistory || !areFormActionsEnabled,
      save: buttonsDisabledByOrderHistory || !areFormActionsEnabled,
      transfer: buttonsDisabledByOrderHistory || !areFormActionsEnabled,
      wait: buttonsDisabledByOrderHistory || !areFormActionsEnabled,
      process: !areFormActionsEnabled,
      returnInWork: !areFormActionsEnabled,
      reject: !areFormActionsEnabled,
      cancelTransfer: !areFormActionsEnabled
    }),
    [buttonsDisabledByOrderHistory, areFormActionsEnabled]
  )

  return (
    <>
      {isModalVisible && (
        <ReasonModal
          isVisible={isModalVisible}
          title={modalTitle}
          operation={modalOperation}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        />
      )}
      {isFooterEnabled && (
        <Wrapper>
          <ChangeBlock>
            {availability.isReturnRtcStatusAvailable && (
              <StyledButton
                data-tid='button_broadband-footer__return-status-button'
                disabled={isButtonsDisabled.returnStatus}
                onClick={handleReturnRtcStatus}
              >
                Вернуть статус "Передана в РТК"
              </StyledButton>
            )}
            {availability.isProcessButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__process-button'
                disabled={isButtonsDisabled.process}
                onClick={handleSaveButton(Operation.Process)}
              >
                В обработку
              </StyledButton>
            )}
            {availability.isTransferButtonAvailable && (
              <Popconfirm
                title='Перед отправкой убедитесь, что данные заявки сохранены'
                placement='topLeft'
                disabled={!isFormChanged}
                okText='Сохранить'
                cancelText='Отменить'
                onConfirm={handleSaveButton(Operation.Save)}
              >
                <StyledButton
                  data-tid='button__broadband-footer__transfer-button'
                  disabled={isButtonsDisabled.transfer}
                  onClick={handleTransferButton}
                >
                  Передать в РТК
                </StyledButton>
              </Popconfirm>
            )}
            {availability.isWaitButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__wait-button'
                disabled={isButtonsDisabled.wait}
                onClick={handleStatusChangeButton(Operation.Wait)}
              >
                Ожидание
              </StyledButton>
            )}
            {availability.isReturnButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__return-button'
                disabled={isButtonsDisabled.returnInWork}
                onClick={handleStatusChangeButton(Operation.Return)}
              >
                Вернуть в работу
              </StyledButton>
            )}
          </ChangeBlock>
          <SaveBlock>
            {availability.isSaveButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__save-button'
                disabled={isButtonsDisabled.save}
                onClick={handleSaveButton(Operation.Save)}
              >
                Сохранить
              </StyledButton>
            )}
          </SaveBlock>
          <CancelBlock>
            {availability.isRejectButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__reject-button'
                disabled={isButtonsDisabled.reject}
                onClick={handleStatusChangeButton(Operation.Reject)}
              >
                Отказ
              </StyledButton>
            )}
            {availability.isCancelButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__cancel-button'
                disabled={isButtonsDisabled.cancel}
                onClick={handleStatusChangeButton(Operation.Cancel)}
              >
                Отменить
              </StyledButton>
            )}
            {availability.isCancelTransferButtonAvailable && (
              <StyledButton
                data-tid='button__broadband-footer__cancel-transfer-button'
                disabled={isButtonsDisabled.cancelTransfer}
                onClick={handleStatusChangeButton(Operation.CancelTransfer)}
              >
                Отменить (Ошибка РТК)
              </StyledButton>
            )}
          </CancelBlock>
        </Wrapper>
      )}
    </>
  )
}

Footer.propTypes = {
  userRights: object
}

const Wrapper = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  padding: 8px;
  bottom: 0;
  background-color: #fffffcb5;
  backdrop-filter: blur(4px);
  border-top: 1px solid #f0f0f0;
`

const ChangeBlock = 'div'

const SaveBlock = styled.div`
  margin-left: 16px;
`
const CancelBlock = styled.div`
  margin-left: auto;
`
const StyledButton = styled(Button)`
  margin-right: 5px;
  background-color: transparent;
`
