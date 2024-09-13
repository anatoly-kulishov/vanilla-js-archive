import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { OperationResult } from 'webseller/components'
import {
  selectRecreateClientIsLoading,
  selectRecreateClientType,
  selectRecreateClientOperationStatus,
  selectRecreateClientTicketNumber,
  selectRecreateClientError
} from '../selectors'
import { recreateClient, resetProcessRecreateClient } from '../reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { OperationStatus } from 'webseller/helpers'
import { RecreateClientType } from '../helpers'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'

export default function Result () {
  const recreateClientType = useSelector(selectRecreateClientType)
  const ticketNumber = useSelector(selectRecreateClientTicketNumber)
  const isLoading = useSelector(selectRecreateClientIsLoading)
  const errorMessage = useSelector(selectRecreateClientError)
  const operationStatus = useSelector(selectRecreateClientOperationStatus)

  const isOnline = recreateClientType === RecreateClientType.ONLINE
  const isSuccess = operationStatus === OperationStatus.SUCCESSFUL

  const dispatch = useDispatch()

  const executeOperation = () => dispatch(recreateClient())
  const onOk = () => {
    if (isOnline && isSuccess) {
      window.location.reload()
    } else {
      dispatch(clearFoundAddresses())
      dispatch(resetProcessRecreateClient())
      dispatch(resetSigning())
      dispatch(resetAgreements())
    }
  }

  const renderTitle = () => {
    if (isSuccess) {
      return isOnline ? 'Переоформление выполнено' : `Заявка №${ticketNumber} успешно создана`
    }
    return 'Переоформление не выполнено'
  }

  const message = operationStatus === OperationStatus.FAILURE ? errorMessage : undefined

  return (
    <OperationResult
      status={operationStatus}
      isLoading={isLoading}
      loadingText='Выполняется переоформление'
      title={renderTitle()}
      message={message}
      executeOperation={executeOperation}
      onOk={onOk}
    />
  )
}
