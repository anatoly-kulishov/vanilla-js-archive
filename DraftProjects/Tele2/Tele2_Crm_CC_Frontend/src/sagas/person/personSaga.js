import { all, call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import { GET_PERSON_ID_SUCCESS, GET_PERSON_ID_ERROR, GET_PERSON_ID_FAILURE } from 'reducers/person/personReducer'

import { getHandlingId, getPersonalAccountState, getQueryParamsState } from 'selectors/index'
import { getErrorDescription } from 'utils/helpers'

import api from 'utils/api'

const { getPersonId } = api

export function * getPersonIdSaga () {
  const message = 'Получение идентификатора персоны'

  try {
    const [handlingId, personalAccount, queryParams] = yield all([
      select(getHandlingId),
      select(getPersonalAccountState),
      select(getQueryParamsState)
    ])

    const { Msisdn, BillingBranchId, ClientCategory, SubscriberId, SubscriberFullInfo } = personalAccount
    const { SubscriberInfo } = SubscriberFullInfo ?? {}
    const { SubscriberStatusId } = SubscriberInfo ?? {}

    const { linkedMsisdn, linkedHandlingId } = queryParams

    const body = {
      handlingId,
      msisdn: Msisdn,
      branchId: BillingBranchId,
      subscriberId: SubscriberId,
      subscriberStatusId: SubscriberStatusId,
      clientCategory: ClientCategory,
      linkedHandlingId,
      linkedHandlingMsisdn: linkedMsisdn
    }

    const { data, status } = yield call(getPersonId, body)

    switch (status) {
      case 201:
        yield put({ type: GET_PERSON_ID_SUCCESS, payload: data })
        break
      default:
        yield put({ type: GET_PERSON_ID_ERROR })
        const description = getErrorDescription(data)
        notification.error({ message, description: description })
    }
  } catch (exception) {
    yield put({ type: GET_PERSON_ID_FAILURE, message: exception.message })
    notification.error({ message, description: exception.message })
  }
}
