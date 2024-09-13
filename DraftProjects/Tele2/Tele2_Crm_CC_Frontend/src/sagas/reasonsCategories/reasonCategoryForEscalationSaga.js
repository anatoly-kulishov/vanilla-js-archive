import { call, put, select } from 'redux-saga/effects'
import { isNull } from 'lodash'
import api from 'utils/api'
import {
  RC_FOR_ESCALATION_FETCH_SUCCESS,
  RC_FOR_ESCALATION_FETCH_ERROR,
  RC_FOR_ESCALATION_FETCH_FAILURE
} from 'reducers/reasonsCategories/reasonCategoryForEscalationReducer'
import {
  TICKET_ADD_PARAMS,
  SELECT_CATEGORY,
  SELECT_REASON
} from 'reducers/tickets/createTicketReducer'
import {
  getHandlingState,
  getRightModalReasonsRegisteringCategory,
  getRightModalReasonsRegisteringReason,
  getPersonalAccountState,
  getReasonCategoryForEscalation
} from 'selectors'

export function * fetchReasonCategoryForEscalationSaga () {
  const handling = yield select(getHandlingState)

  const { fetchReasonCategoryForEscalation } = api
  const { Id } = handling

  try {
    const { data } = yield call(fetchReasonCategoryForEscalation, { handlingId: Id })
    if (data.IsSuccess) {
      const prevReasonCategory = yield select(getReasonCategoryForEscalation)
      const prevReasonId = prevReasonCategory && prevReasonCategory.ReasonId
      const prevCategoryId = prevReasonCategory && prevReasonCategory.CategoryId
      yield put({ type: RC_FOR_ESCALATION_FETCH_SUCCESS, payload: data })
      const {
        Data: { CategoryId, ReasonId }
      } = data
      let category = null
      let reason = null
      const isChangeReasonId = ReasonId !== prevReasonId
      const isChangeCategoryId = CategoryId !== prevCategoryId
      const isGetAddParams = !isNull(CategoryId) && !isNull(ReasonId) && (isChangeReasonId || isChangeCategoryId)
      if (isGetAddParams) {
        const personalAccountState = yield select(getPersonalAccountState)
        category = yield select(getRightModalReasonsRegisteringCategory, {
          categoryId: CategoryId
        })
        reason = yield select(getRightModalReasonsRegisteringReason, { reasonId: ReasonId })
        yield put({ type: SELECT_CATEGORY, payload: { category } })
        yield put({ type: SELECT_REASON, payload: { reason } })
        yield put({
          type: TICKET_ADD_PARAMS,
          payload: {
            reasonId: ReasonId,
            categoryId: CategoryId,
            clientCategory: personalAccountState.ClientCategory
          }
        })
      }
    } else {
      yield put({ type: RC_FOR_ESCALATION_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: RC_FOR_ESCALATION_FETCH_FAILURE, message: exception.message })
  }
}
