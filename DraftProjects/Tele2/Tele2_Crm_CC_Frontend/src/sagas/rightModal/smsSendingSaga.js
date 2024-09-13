import { select, call, put, delay, all } from 'redux-saga/effects'
import { notification } from 'antd'
import moment from 'moment'
import api from '../../utils/api'
import isHandlingClosed from 'utils/helpers/isHandlingClosed'

import {
  FETCH_REASONS_SUCCESS,
  FETCH_REASONS_FAILURE,
  FETCH_TEMPLATES_SUCCESS,
  FETCH_TEMPLATES_FAILURE,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE,
  FETCH_SENDERS_SUCCESS,
  FETCH_SENDERS_FAILURE,
  FETCH_PERIOD_OF_SILENCE_SUCCESS,
  FETCH_PERIOD_OF_SILENCE_FAILURE,
  FETCH_LTE_NUMBER_SUCCESS,
  FETCH_LTE_NUMBER_FAILURE,
  SEND_SMS_SUCCESS,
  SEND_SMS_FAILURE,
  CANCEL_SMS_SUCCESS,
  CANCEL_SMS_FAILURE,
  SET_REASONS_INITIAL,
  SET_TEMPLATES_INITIAL,
  SELECT_TEMPLATE,
  FETCH_REASON_CATEGORY_COMMENT_TEMPLATES
} from 'reducers/smsSendingReducer'

import {
  getRightModalSmsSendingReasonsFilterFields,
  getRightModalSmsSendingTemplatesFilterFields,
  getRightModalSmsSendingReasonsParameters,
  getPersonalAccountState,
  getHandlingState,
  getCurrentSmsTemplates,
  getSelectedReasonId,
  getSelectedCategoryId,
  getProcessingParametersState,
  getCardModeSelector,
  getWhoIsIt
} from 'selectors'

import { GET_SMS_HISTORY_FETCH } from 'reducers/sms/getSmsHistoryReducer'
import { cardModes } from 'constants/cardModes'

const {
  fetchReasonsCategoriesList,
  fetchTemplates,
  fetchReasonCategoryCommentTemplates,
  fetchSenders,
  fetchPeriodOfSilence,
  fetchLteNumber,
  sendSms,
  cancelSms
} = api

export function * filterReasonsDelaySaga ({ payload }) {
  yield delay(500)

  const filterFields = yield select(getRightModalSmsSendingReasonsFilterFields)
  const reasonsParams = yield select(getRightModalSmsSendingReasonsParameters)
  const reasonSearchLength = parseInt(reasonsParams.find(item => item.ParamName === 'MinLength').ParamValue)

  const { field, value } = payload
  const { reasonName, categoryId } = filterFields

  const isReasonNameLengthValid = value.length >= reasonSearchLength
  const isReasonNameLengthEqualZero = value.length === 0
  const isInitialReasonsToSet = reasonName === '' && (categoryId === undefined || categoryId === null)

  if (isInitialReasonsToSet) yield put({ type: SET_REASONS_INITIAL })

  if (field === 'reasonName' && (isReasonNameLengthValid || isReasonNameLengthEqualZero)) {
    yield call(fetchReasonsCategoriesSaga)
  }

  if (field === 'categoryId') {
    yield call(fetchReasonsCategoriesSaga)
  }
}

export function * fetchReasonsCategoriesSaga () {
  const filterFields = yield select(getRightModalSmsSendingReasonsFilterFields)
  const personalAccount = yield select(getPersonalAccountState)
  const processingParameters = yield select(getProcessingParametersState)
  const channelId = processingParameters?.ServiceChannel?.Id
  const { BaseFunctionalParams = {} } = personalAccount
  const { InteractionDirectionId: directionId, ClientCategoryId: clientCategoryId } = BaseFunctionalParams

  try {
    let requestParams = {
      ...filterFields,
      channelId,
      directionId,
      clientCategoryId
    }

    if (filterFields.reasonName) {
      const reasonsParams = yield select(getRightModalSmsSendingReasonsParameters)
      const reasonSearchLength = parseInt(reasonsParams.find(item => item.ParamName === 'MinLength').ParamValue)
      const isReasonNameLengthValid = filterFields.reasonName.length >= reasonSearchLength

      const { reasonName } = filterFields

      requestParams = {
        ...requestParams,
        reasonName: isReasonNameLengthValid ? reasonName : ''
      }
    }

    const { data } = yield call(fetchReasonsCategoriesList, requestParams)

    if (data.IsSuccess) {
      const {
        Data: { Reasons, Categories, GlobalParameters }
      } = data
      yield put({ type: FETCH_REASONS_SUCCESS, payload: { Reasons, Categories, GlobalParameters } })
    } else {
      yield put({ type: FETCH_REASONS_FAILURE, payload: data.MessageText })

      notification.error({
        message: 'Ошибка причин категорий',
        description: data.MessageText ? data.MessageText : data.Description
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_REASONS_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: 'Ошибка причин категорий',
      description: exception.message.text
    })
  }
}

export function * filterTemplatesDelaySaga ({ payload }) {
  yield delay(500)

  const filterFields = yield select(getRightModalSmsSendingTemplatesFilterFields)

  const { field, value } = payload
  const { templateName } = filterFields

  const isTemplateNameLengthValid = value.length >= 3
  const isTemplateNameLengthEqualZero = value.length === 0

  if (templateName === '') yield put({ type: SET_TEMPLATES_INITIAL })

  if (field === 'templateName' && (isTemplateNameLengthValid || isTemplateNameLengthEqualZero)) {
    yield call(fetchTemplatesSaga)
  }
}

export function * fetchTemplatesSaga (action) {
  const errorMessage = 'Ошибка получения шаблонов смс'
  const isSpecificTemplateSearch = action && action.payload

  const filterFields = yield select(getRightModalSmsSendingTemplatesFilterFields)
  const personalAccount = yield select(getPersonalAccountState)
  const currentSmsTemplates = yield select(getCurrentSmsTemplates)
  const cardMode = yield select(getCardModeSelector)

  const isLeon = cardMode === cardModes.leon

  const { ClientCategory, BillingBranchId } = personalAccount

  const requestParams = {
    ...(isSpecificTemplateSearch && {
      ...action.payload
    }),
    BillingBranch: BillingBranchId,
    ClientCategory: ClientCategory || 'B2C'
  }

  if (isLeon) {
    const whoIsIt = yield select(getWhoIsIt)
    requestParams.BillingBranch = whoIsIt.BillingBranchId
  }

  if (filterFields.templateName && filterFields.templateName !== '' && !requestParams.isTopTemplateSearch) {
    // TODO: Remove after refactoring
    requestParams.Name = encodeURIComponent(filterFields.templateName)
  }

  try {
    const { data } = yield call(fetchTemplates, requestParams)

    if (data.IsSuccess) {
      if (isSpecificTemplateSearch) {
        const template = data.Data[0].Templates[0]
        yield all([
          put({ type: SELECT_TEMPLATE, payload: { template } }),
          put({ type: FETCH_TEMPLATES_SUCCESS, payload: { templates: currentSmsTemplates } })
        ])
        const selectedReasonId = yield select(getSelectedReasonId)
        const selectedCategoryId = yield select(getSelectedCategoryId)
        yield put({
          type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES,
          payload: { reasonId: selectedReasonId, categoryId: selectedCategoryId }
        })
      } else {
        yield put({ type: FETCH_TEMPLATES_SUCCESS, payload: { templates: data.Data } })
      }
    } else {
      yield put({ type: FETCH_TEMPLATES_FAILURE })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: errorMessage,
        description: data.MessageText ? data.MessageText : data.Description
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_TEMPLATES_FAILURE, payload: { data: message } })
    notification.error({
      message: errorMessage,
      description: message.includes("'Templates'") ? 'Шаблон не найден' : message
    })
  }
}

export function * fetchReasonCategoryCommentTemplatesSaga ({ payload }) {
  const errorMessage = 'Ошибка получения шаблонов коментариев'
  try {
    const { data } = yield call(fetchReasonCategoryCommentTemplates, payload)

    if (data.IsSuccess) {
      yield put({
        type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_SUCCESS,
        payload: { reasonCategoryCommentTemplates: data.Data.ResponseModel }
      })
    } else {
      yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE, payload: data.Data.ResponseModel })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: errorMessage,
        description: data.MessageText ? data.MessageText : data.Description
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_REASON_CATEGORY_COMMENT_TEMPLATES_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: errorMessage,
      description: exception.message.text
    })
  }
}

export function * fetchSendersSaga ({ payload }) {
  const errorMessage = 'Ошибка получения отправителей'
  try {
    const { data } = yield call(fetchSenders, payload)

    if (data.IsSuccess) {
      yield put({ type: FETCH_SENDERS_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: FETCH_SENDERS_FAILURE, payload: data.Data })
    }

    if (!data.IsSuccess) {
      notification.error({
        message: errorMessage,
        description: data.MessageText ? data.MessageText : data.Description
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_SENDERS_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: errorMessage,
      description: exception.message.text
    })
  }
}

export function * fetchPeriodOfSilenceSaga ({ payload }) {
  const errorMessage = 'Ошибка периода молчания'
  try {
    const { data } = yield call(fetchPeriodOfSilence, payload)

    if (data.IsSuccess) {
      yield put({ type: FETCH_PERIOD_OF_SILENCE_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: FETCH_PERIOD_OF_SILENCE_FAILURE, payload: data.Data })
      notification.error({
        message: errorMessage,
        description: data.MessageText ? data.MessageText : data.Description
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_PERIOD_OF_SILENCE_FAILURE, payload: { data: exception.message } })
    notification.error({
      message: errorMessage,
      description: exception.message
    })
  }
}

export function * fetchLteNumberSaga ({ payload: { clientId, branchId, msisdn, clientCategory } }) {
  try {
    let requestData
    if (clientCategory === 'B2C') {
      requestData = {
        clientId,
        branchId
      }
    } else {
      requestData = { msisdn }
    }

    const { data } = yield call(fetchLteNumber, requestData)

    if (data.IsSuccess) {
      yield put({ type: FETCH_LTE_NUMBER_SUCCESS, payload: data.Data.Number })
    } else {
      yield put({ type: FETCH_LTE_NUMBER_FAILURE })
    }
  } catch (exception) {
    yield put({ type: FETCH_LTE_NUMBER_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: 'Ошибка LTE',
      description: exception.message.text
    })
  }
}

export function * sendSmsSaga ({ payload }) {
  const errorMessage = 'Ошибка отправки смс'
  try {
    const { data } = yield call(sendSms, payload)

    if (data.IsSuccess) {
      yield put({ type: SEND_SMS_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: SEND_SMS_FAILURE, payload: data })
      isHandlingClosed(data.MessageText ? data.MessageText : data.Description) &&
        notification.error({
          message: errorMessage,
          description: data.MessageText ? data.MessageText : data.Description
        })
    }
  } catch (exception) {
    yield put({ type: SEND_SMS_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: errorMessage,
      description: exception.message
    })
  }
}

export function * cancelSmsSaga ({ payload }) {
  const errorMessage = 'Ошибка отмены смс'
  const { Msisdn } = payload

  try {
    const handling = yield select(getHandlingState)
    const { data } = yield call(cancelSms, payload)

    const dayStartTime = { hour: 0, minute: 0, second: 0 }
    const dayEndTime = { hour: 23, minute: 59, second: 59 }
    const startDate = moment().subtract(7, 'days').utc().set(dayStartTime).format()
    const endDate = moment().utc().set(dayEndTime).format()

    if (data.IsSuccess) {
      yield put({ type: CANCEL_SMS_SUCCESS, payload: data })
      yield put({
        type: GET_SMS_HISTORY_FETCH,
        payload: {
          msisdn: Msisdn,
          show: null,
          status: null,
          startDate: startDate,
          endDate: endDate,
          handlingId: handling.Id
        }
      })
      notification.success({
        message: 'Отправка SMS отменена',
        description: data.MessageText
      })
    } else {
      yield put({ type: CANCEL_SMS_FAILURE, payload: data })
    }

    if (!data.IsSuccess) {
      isHandlingClosed(data.MessageText ? data.MessageText : data.Description) &&
        notification.error({
          message: errorMessage,
          description: data.MessageText ? data.MessageText : data.Description
        })
    }
  } catch (exception) {
    yield put({ type: CANCEL_SMS_FAILURE, payload: { data: exception.message } })

    notification.error({
      message: errorMessage,
      description: exception.message.text
    })
  }
}
