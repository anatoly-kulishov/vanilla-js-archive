import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { OperationStatus } from 'webseller/helpers'
import { OperationResult } from 'webseller/components'
import { resetSigning } from 'webseller/common/signing/reducer'
import { resetChangeCodeWordProcess } from 'webseller/features/changeCodeWord/reducer'
import { createInteractionMnpOrder } from 'webseller/features/mpnOrderStepper/actions'
import {
  selectMpnOrderOperationStatus,
  selectMpnOrderRequestErrorStatus,
  selectMpnOrderRequestLoadingStatus
} from 'webseller/features/mpnOrderStepper/selectors'

export default function ResultStep () {
  const dispatch = useDispatch()

  const status = useSelector(selectMpnOrderOperationStatus)
  const isLoading = useSelector(selectMpnOrderRequestLoadingStatus)
  const isError = useSelector(selectMpnOrderRequestErrorStatus)

  const isSuccessful = status === OperationStatus.SUCCESSFUL & isLoading === false && isError === false

  const renderTitle = () => {
    if (isError) {
      return 'Произошла ошибка переноса номера. Обратитесь на линию поддержки'
    }
    if (isSuccessful) {
      return 'Заявление о перенесении номера подписано и зарегистрировано'
    }
    return null
  }

  const onOk = () => {
    dispatch(resetSigning())
    dispatch(resetChangeCodeWordProcess())
    dispatch(createInteractionMnpOrder({ isError: !isSuccessful }))
  }

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      title={renderTitle()}
      onOk={onOk}
    />
  )
}
