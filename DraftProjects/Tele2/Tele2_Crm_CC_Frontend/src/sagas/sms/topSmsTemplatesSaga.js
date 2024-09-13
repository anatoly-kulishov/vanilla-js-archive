import { call, put, select } from 'redux-saga/effects'

import api from 'utils/api'
import { notification } from 'antd'

import {
  FETCH_TOP_SMS_TEMPLATES_SUCCESS,
  FETCH_TOP_SMS_TEMPLATES_ERROR,
  FETCH_TOP_SMS_TEMPLATES_FAILURE
} from 'reducers/sms/topSmsTemplatesReducer'

import { getPersonalAccountState } from 'selectors'
import { cardModes } from 'constants/cardModes'
import { getCardModeSelector, getWhoIsIt } from 'selectors/index'

export function * fetchTopSmsTemplatesSaga () {
  const { fetchTopSmsTemplates } = api

  const errorTitle = 'Ошибка получения ТОП шаблонов SMS'

  const {
    BaseFunctionalParams: { ClientCategoryId },
    BillingBranchId
  } = yield select(getPersonalAccountState)

  const cardMode = yield select(getCardModeSelector)
  const isLeon = cardMode === cardModes.leon

  const params = { ClientCategoryId, BillingBranchId }

  if (isLeon) {
    const whoIsIt = yield select(getWhoIsIt)
    params.BillingBranchId = whoIsIt.BillingBranchId
  }

  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchTopSmsTemplates, params)
    if (IsSuccess) {
      yield put({ type: FETCH_TOP_SMS_TEMPLATES_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_TOP_SMS_TEMPLATES_ERROR, payload: MessageText })
      notification.error({
        message: errorTitle,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_TOP_SMS_TEMPLATES_FAILURE, payload: message })
    notification.error({
      message: errorTitle,
      description: message
    })
  }
}
