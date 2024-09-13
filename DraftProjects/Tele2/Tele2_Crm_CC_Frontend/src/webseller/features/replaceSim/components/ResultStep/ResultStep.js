import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import {
  selectOperationStatusReplacingData,
  selectReplaceSimErrorMessage
} from 'webseller/features/replaceSim/selectors'
import { createInteractionReplaceSim } from '../../reducer'

import { OperationResult } from 'webseller/components'
import { FORM_VALUES } from 'webseller/features/replaceSim/components/SearchSimStep/constants/form'

export default function ResultStep (props) {
  const {
    documentData,
    isSuccessReplaceSim,
    isReplaceSimLoading,
    isReplaceSimError,
    onSendSimChanges,
    onSubmit
  } = props

  const dispatch = useDispatch()

  const status = useSelector(selectOperationStatusReplacingData)
  const errorMessage = useSelector(selectReplaceSimErrorMessage)

  useEffect(() => {
    const { branchId, msisdn, price } = documentData

    onSendSimChanges({
      branchId,
      msisdn,
      puk: documentData[FORM_VALUES.PUK],
      icc: String(documentData[FORM_VALUES.ICC]),
      isFree: price === 0
    })
  }, [])

  const renderTitle = () => {
    if (isReplaceSimError) {
      return 'Произошла ошибка при замене SIM-карты. Обратитесь на линию поддержки'
    }
    if (isSuccessReplaceSim) {
      return 'Операция замены SIM-карты прошла успешно'
    }
    return null
  }

  const renderMessage = () => {
    if (isReplaceSimError && errorMessage) {
      return errorMessage
    }
    return null
  }

  const onOk = () => {
    if (isSuccessReplaceSim) {
      dispatch(createInteractionReplaceSim())
    }
    onSubmit()
  }

  return (
    <OperationResult
      status={status}
      isLoading={isReplaceSimLoading}
      title={renderTitle()}
      message={renderMessage()}
      onOk={onOk}
    />
  )
}

ResultStep.propTypes = {
  documentData: PropTypes.object,
  isSuccessReplaceSim: PropTypes.bool,
  isReplaceSimLoading: PropTypes.bool,
  isReplaceSimError: PropTypes.bool,
  onSendSimChanges: PropTypes.func,
  onSubmit: PropTypes.func
}
