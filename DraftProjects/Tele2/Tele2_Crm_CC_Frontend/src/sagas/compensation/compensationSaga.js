// eslint-disable-next-line no-unused-vars
import { all, call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS,
  VALIDATE_PAYD_SERVICE_HISTORY_ERROR,
  VALIDATE_PAYD_SERVICE_HISTORY_FAILURE,

  COMPENSATION_FORM_PACKAGE_SUCCESS,
  COMPENSATION_FORM_PACKAGE_ERROR,
  COMPENSATION_FORM_PACKAGE_FAILURE
} from 'reducers/compensation/compensationPackageReducer'

import {
  COMPENSATION_FORM_MONETARY_SUCCESS,
  COMPENSATION_FORM_MONETARY_ERROR,
  COMPENSATION_FORM_MONETARY_FAILURE
} from 'reducers/compensation/compensationEnrollmentReducer'

import {
  FETCH_PAYD_COMMENTS_SUCCESS,
  FETCH_PAYD_COMMENTS_ERROR,
  FETCH_PAYD_COMMENTS_FAILURE,

  VALIDATE_PAYMENT_HISTORY_FAILURE,
  VALIDATE_PAYMENT_HISTORY_ERROR,
  VALIDATE_PAYMENT_HISTORY_SUCCESS,
  VALIDATE_COST_HISTORY_FAILURE,
  VALIDATE_COST_HISTORY_ERROR,
  VALIDATE_COST_HISTORY_SUCCESS,

  ON_START_VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS,
  ON_START_VALIDATE_PAYD_SERVICE_ENABLED_ERROR,
  ON_START_VALIDATE_PAYD_SERVICE_ENABLED_FAILURE,

  ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS,
  ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR,
  ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE,

  VALIDATE_PAYD_POST_LIMIT_SUCCESS,
  VALIDATE_PAYD_POST_LIMIT_ERROR,
  VALIDATE_PAYD_POST_LIMIT_FAILURE,

  GET_COMPENSTAION_FORM_SUCCESS,
  GET_COMPENSTAION_FORM_WARNING,
  GET_COMPENSTAION_FORM_ERROR,
  GET_COMPENSTAION_FORM_FAILURE,

  FETCH_PAYMENTS_COMPENSATION_HISTORY_SUCCESS,
  FETCH_PAYMENTS_COMPENSATION_HISTORY_ERROR,
  FETCH_PAYMENTS_COMPENSATION_HISTORY_FAILURE
} from 'reducers/compensation/compensationReducer'

import { getPersonalAccountState } from 'selectors'
import { getCompensationState } from 'selectors/compensationSelectors'
import { compenstationsForms } from 'constants/compensations'
import { COMPENSATION_FORM_PROMOCODE_SUCCESS } from 'reducers/compensation/compensationPromoReducer'
import servicesMessageTypes from 'constants/servicesMessageTypes'

export function * fetchPaydCommentsSaga () {
  try {
    const { fetchPaydComments } = api
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchPaydComments, { isActive: true })

    if (IsSuccess) {
      yield put({
        type: FETCH_PAYD_COMMENTS_SUCCESS,
        payload: {
          data: Data
        }
      })
    } else {
      yield put({
        type: FETCH_PAYD_COMMENTS_ERROR,
        payload: {
          error: {
            data: MessageText,
            createdOn: Date.now()
          }
        }
      })
      notification.error({
        message: `Получение комментариев`,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({
      type: FETCH_PAYD_COMMENTS_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Получение комментариев`,
      description: message
    })
  }
}

export function * validatePaydServiceHistorySaga () {
  try {
    const { validatePaydServiceHistory } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText }
    } = yield call(
      validatePaydServiceHistory,
      {
        msisdn: personalAccountState?.Msisdn,
        branchId: personalAccountState?.BillingBranchId
      }
    )
    if (IsSuccess) {
      yield put({
        type: VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS,
        payload: {
          error: {
            data: MessageText,
            type: 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_PAYD_SERVICE_HISTORY_ERROR,
        payload: {
          error: {
            data: MessageText,
            shouldDisable: true,
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: VALIDATE_PAYD_SERVICE_HISTORY_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация сервиса истории платежей`,
      description: message
    })
  }
}

export function * validatePaymentHistorySaga () {
  try {
    const { validatePaymentHistory } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText, Warnings }
    } = yield call(
      validatePaymentHistory,
      {
        branchId: personalAccountState?.BillingBranchId,
        subscriberId: personalAccountState?.SubscriberId,
        clientId: personalAccountState?.ClientId
      }
    )
    const compensationState = yield select(getCompensationState)
    const errorCostHistory = compensationState.paymentCostHistory?.errorCost?.data
    if (IsSuccess) {
      yield put({
        type: VALIDATE_PAYMENT_HISTORY_SUCCESS,
        payload: {
          errorPayment: {
            data: Warnings?.length ? Warnings : MessageText,
            type: Warnings?.length ? 'warning' : 'success',
            createdOn: Date.now()
          },
          error: errorCostHistory && {
            data: Warnings?.length ? Warnings : MessageText,
            type: Warnings?.length ? 'warning' : 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_PAYMENT_HISTORY_ERROR,
        payload: {
          errorPayment: {
            data: MessageText,
            shouldDisable: true,
            type: 'error',
            createdOn: Date.now()
          },
          error: errorCostHistory && {
            data: MessageText,
            shouldDisable: true,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    const compensationState = yield select(getCompensationState)
    const errorCostHistory = compensationState.paymentCostHistory?.errorCost?.data
    yield put({
      type: VALIDATE_PAYMENT_HISTORY_FAILURE,
      payload: {
        errorPayment: {
          data: message,
          createdOn: Date.now()
        },
        error: errorCostHistory && {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация истории платежей`,
      description: message
    })
  }
}

export function * validateCostHistorySage () {
  try {
    const { validateCostHistory } = api
    const { Msisdn } = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText, Warnings }
    } = yield call(validateCostHistory, { Msisdn })
    const compensationState = yield select(getCompensationState)
    const errorPaymentHistory = compensationState.paymentCostHistory?.errorPayment?.data
    if (IsSuccess) {
      yield put({
        type: VALIDATE_COST_HISTORY_SUCCESS,
        payload: {
          errorCost: {
            data: Warnings?.length ? Warnings : MessageText,
            type: Warnings?.length ? 'warning' : 'success',
            createdOn: Date.now()
          },
          error: errorPaymentHistory && {
            data: Warnings?.length ? Warnings : MessageText,
            type: Warnings?.length ? 'warning' : 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_COST_HISTORY_ERROR,
        payload: {
          errorCost: {
            data: MessageText,
            shouldDisable: true,
            type: 'error',
            createdOn: Date.now()
          },
          error: errorPaymentHistory && {
            data: MessageText,
            shouldDisable: true,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    const compensationState = yield select(getCompensationState)
    const errorPaymentHistory = compensationState.paymentCostHistory?.errorPayment?.data
    yield put({
      type: VALIDATE_COST_HISTORY_FAILURE,
      payload: {
        errorCost: {
          data: message,
          createdOn: Date.now()
        },
        error: errorPaymentHistory && {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация изменения истории`,
      description: message
    })
  }
}

export function * onStartValidatePaydServiceAvailableSaga () {
  try {
    const personalAccountState = yield select(getPersonalAccountState)

    const { validatePaydServiceAvailable } = api
    const {
      data: { Data, IsSuccess, MessageText, Warnings }
    } = yield call(
      validatePaydServiceAvailable,
      {
        msisdn: personalAccountState.Msisdn
      }
    )

    if (IsSuccess) {
      yield put({
        type: ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS,
        payload: {
          data: Data,
          error: {
            data: Warnings?.length ? Warnings : null,
            createdOn: Warnings?.length ? Date.now() : null,
            type: 'warning'
          }
        }
      })
    } else {
      yield put({
        type: ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Получение пакетов`,
      description: message
    })
  }
}

export function * onStartValidatePaydServiceEnabledSaga ({ payload }) {
  try {
    const { validatePaydServiceEnabled } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText, Warnings }
    } = yield call(
      validatePaydServiceEnabled,
      {
        ...payload,
        msisdn: personalAccountState?.Msisdn
      }
    )
    if (IsSuccess) {
      yield put({
        type: ON_START_VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS,
        payload: {
          error: {
            data: Warnings?.length ? Warnings : MessageText,
            type: Warnings?.length ? 'warning' : 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: ON_START_VALIDATE_PAYD_SERVICE_ENABLED_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: ON_START_VALIDATE_PAYD_SERVICE_ENABLED_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация сервиса истории платежей`,
      description: message
    })
  }
}

export function * validatePaydPostLimitSaga ({ payload }) {
  try {
    const { validatePaydPostLimit } = api
    const { data: { Data, IsSuccess, MessageText } } = yield call(validatePaydPostLimit, payload)
    if (IsSuccess) {
      yield put({ type: VALIDATE_PAYD_POST_LIMIT_SUCCESS, payload: Data })
    } else {
      yield put({
        type: VALIDATE_PAYD_POST_LIMIT_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: VALIDATE_PAYD_POST_LIMIT_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
  }
}

export function * getCompensationFormSaga () {
  try {
    const {
      BillingBranchId: branchId,
      SubscriberId: subscriberId,
      Msisdn: msisdn
    } = yield select(getPersonalAccountState)

    const { getCompensationForm } = api
    const {
      data: {
        Data,
        MessageText,
        ResultType
      }
    } = yield call(getCompensationForm, {
      branchId,
      subscriberId,
      msisdn
    })

    if ((ResultType === servicesMessageTypes.success) || (ResultType === servicesMessageTypes.warning)) {
      const messageError = MessageText || ' '
      const monetaryForm = {
        data: Data?.CompensationForm?.find((cf) => cf.FormId === compenstationsForms.monetary)?.CompensationType
      }
      if (!monetaryForm.data) {
        monetaryForm.error = {
          data: messageError,
          type: 'error',
          createdOn: Date.now()
        }
      }

      const packageForm = {
        data: Data?.CompensationForm?.find((cf) => cf.FormId === compenstationsForms.package)?.CompensationType
      }
      if (!packageForm.data) {
        packageForm.error = {
          data: messageError,
          type: 'error',
          createdOn: Date.now()
        }
      }

      const promoForm = {
        data: Data?.CompensationForm?.find((cf) => cf.FormId === compenstationsForms.promocode)?.CompensationType
      }
      if (!promoForm.data) {
        promoForm.error = {
          data: messageError,
          type: 'error',
          createdOn: Date.now()
        }
      }

      yield put({ type: GET_COMPENSTAION_FORM_SUCCESS })
      yield put({ type: COMPENSATION_FORM_PACKAGE_SUCCESS, payload: packageForm })
      yield put({ type: COMPENSATION_FORM_MONETARY_SUCCESS, payload: monetaryForm })
      yield put({ type: COMPENSATION_FORM_PROMOCODE_SUCCESS, payload: promoForm })
      // TODO: BE and Arch Refactor
      if (ResultType === servicesMessageTypes.warning) {
        yield put({ type: GET_COMPENSTAION_FORM_WARNING,
          payload: {
            error: {
              data: Data?.Warnings,
              type: 'error',
              createdOn: Date.now()
            }
          }
        })
      }
    } else {
      yield put({ type: GET_COMPENSTAION_FORM_ERROR })
      yield put({
        type: COMPENSATION_FORM_PACKAGE_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
      yield put({
        type: COMPENSATION_FORM_MONETARY_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({ type: GET_COMPENSTAION_FORM_FAILURE })
    yield put({
      type: COMPENSATION_FORM_PACKAGE_FAILURE,
      payload: {
        error: {
          data: message,
          type: 'error',
          createdOn: Date.now()
        }
      }
    })
    yield put({
      type: COMPENSATION_FORM_MONETARY_FAILURE,
      payload: {
        error: {
          data: message,
          type: 'error',
          createdOn: Date.now()
        }
      }
    })
  }
}

export function * fetchPaymentsCompentationSaga ({ payload }) {
  const { fetchPaymentCompensationHistory } = api
  try {
    const { data: { Data, IsSuccess, MessageText } } = yield call(fetchPaymentCompensationHistory, payload)

    IsSuccess
      ? yield put({ type: FETCH_PAYMENTS_COMPENSATION_HISTORY_SUCCESS, payload: Data })
      : yield put({ type: FETCH_PAYMENTS_COMPENSATION_HISTORY_ERROR, payload: MessageText })
  } catch ({ message }) {
    yield put({ type: FETCH_PAYMENTS_COMPENSATION_HISTORY_FAILURE, payload: message })
  }
}
