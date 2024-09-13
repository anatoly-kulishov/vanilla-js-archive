import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectChangeCodeWordErrorMessage,
  selectIsChangeCodeWordError,
  selectIsChangeCodeWordLoading,
  selectIsSuccessChangeCodeWord,
  selectOperationChangeCodeWordStatus
} from 'webseller/features/changeCodeWord/selectors'
import { OperationResult } from 'webseller/components'
import { resetChangeCodeWordProcess } from 'webseller/features/changeCodeWord/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'

export default function ResultStep () {
  const dispatch = useDispatch()

  const errorMessage = useSelector(selectChangeCodeWordErrorMessage)
  const status = useSelector(selectOperationChangeCodeWordStatus)
  const isSuccess = useSelector(selectIsSuccessChangeCodeWord)
  const isLoading = useSelector(selectIsChangeCodeWordLoading)
  const hasError = useSelector(selectIsChangeCodeWordError)

  const renderTitle = () => {
    if (hasError) {
      return 'Произошла ошибка смены кодового слова. Обратитесь на линию поддержки'
    }
    if (isSuccess) {
      return 'Операция смены кодового слова прошла успешно'
    }
    return null
  }

  const renderMessage = () => {
    if (hasError && errorMessage) {
      return errorMessage
    }
    return null
  }

  const onOk = () => {
    dispatch(resetSigning())
    dispatch(resetChangeCodeWordProcess())
    if (isSuccess) {
      window.location.reload()
    }
  }

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      title={renderTitle()}
      message={renderMessage()}
      onOk={onOk}
    />
  )
}
