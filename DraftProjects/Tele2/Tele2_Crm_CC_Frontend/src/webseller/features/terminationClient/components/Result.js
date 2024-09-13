import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetVerification } from 'webseller/common/verification/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { OperationStatus } from 'webseller/helpers'
import { OperationResult, Button } from 'webseller/components'
import { addSignedDocumentsTerminationClient, executeTerminationClient, resetTerminationClient } from '../reducer'
import { TerminationClientType } from '../helpers'
import {
  selectErrorExecuteTerminationClient,
  selectIsLoadingExecuteTerminationClient,
  selectOperationStatusTerminationClient,
  selectTicketNumberTerminationClient,
  selectTypeTerminationClient
} from '../selectors'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'

export default function Result () {
  const terminationClientType = useSelector(selectTypeTerminationClient)
  const ticketNumber = useSelector(selectTicketNumberTerminationClient)
  const isLoading = useSelector(selectIsLoadingExecuteTerminationClient)
  const errorMessage = useSelector(selectErrorExecuteTerminationClient)
  const operationStatus = useSelector(selectOperationStatusTerminationClient)

  const dispatch = useDispatch()

  const executeOperation = () => dispatch(executeTerminationClient())

  const onClickUploadAgain = () => {
    dispatch(addSignedDocumentsTerminationClient())
  }

  const onOk = () => {
    dispatch(clearFoundAddresses())
    dispatch(resetTerminationClient())
    dispatch(resetSigning())
    dispatch(resetVerification())
  }

  const renderTitle = () => {
    const isSuccess = operationStatus === OperationStatus.SUCCESSFUL
    if (isSuccess) {
      return terminationClientType === TerminationClientType.ONLINE
        ? 'Договор абонента успешно расторгнут'
        : `Заявка на расторжение договора №${ticketNumber} успешно создана`
    }
    return 'Расторжение договора не выполнено'
  }

  const renderMessage = () => {
    switch (operationStatus) {
      case OperationStatus.PARTIALLY_SUCCESSFUL: {
        return 'При загрузке файле произошла ошибка. Попробуйте загрузить файл еще раз'
      }

      case OperationStatus.FAILURE: {
        return errorMessage
      }

      default: {
        return null
      }
    }
  }

  const renderAdditional = () => {
    if (operationStatus === OperationStatus.PARTIALLY_SUCCESSFUL) {
      return (
        <Fragment>
          <Button type='primary' onClick={onClickUploadAgain}>
            Загрузить еще раз
          </Button>
        </Fragment>
      )
    }

    return null
  }

  return (
    <OperationResult
      status={operationStatus}
      isLoading={isLoading}
      loadingText='Выполняется расторжение договора'
      title={renderTitle()}
      message={renderMessage()}
      additional={renderAdditional()}
      executeOperation={executeOperation}
      onOk={onOk}
    />
  )
}
