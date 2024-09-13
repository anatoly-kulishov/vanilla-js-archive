import { call, put, select } from 'redux-saga/effects'
import * as moment from 'moment'
import api from 'utils/api'

import { normalizeNumber } from 'webseller/helpers'
import {
  getTransferEarliestTimeSlotError,
  getTransferEarliestTimeSlotSuccess,
  getTransferTimeSlots,
  getTransferTimeSlotsError,
  getTransferTimeSlotsSuccess
} from '../actions'
import {
  selectOrderIsMnpSaleSim,
  selectOrderMnpMsisdnSaleSim
} from 'reducers/saleSim/selectors'

export function * getTransferEarliestTimeSlotSaga ({ payload: transferNumberOld }) {
  const { fetchTransferEarliestTimeSlot } = api

  try {
    const { data } = yield call(
      fetchTransferEarliestTimeSlot,
      normalizeNumber(transferNumberOld, { isNeedToSliceFirstDigit: true, fallback: transferNumberOld })
    )
    const earliestTimeSlot = data?.resultBody?.earliestTimeSlot
    if (earliestTimeSlot) {
      yield put(getTransferEarliestTimeSlotSuccess(earliestTimeSlot))
      const earliestTimeSlotDate = moment(earliestTimeSlot).format('YYYY-MM-DD')
      yield put(getTransferTimeSlots({ newDate: earliestTimeSlotDate, transferNumberOld }))
      return
    }
    yield put(getTransferEarliestTimeSlotError())
  } catch {
    yield put(getTransferEarliestTimeSlotError())
  }
}

export function * getTransferTimeSlotsSaga ({ payload }) {
  const { fetchTransferTimeSlots } = api
  const { newDate, transferNumberOld } = payload
  const timeSlotsDate = moment(newDate).format('YYYY-MM-DD')
  const mnpMsisdn = yield select(selectOrderMnpMsisdnSaleSim)
  const isMnp = yield select(selectOrderIsMnpSaleSim)

  try {
    const { data } = yield call(
      fetchTransferTimeSlots,
      normalizeNumber(isMnp ? mnpMsisdn : transferNumberOld, { isNeedToSliceFirstDigit: true, fallback: transferNumberOld }),
      timeSlotsDate
    )
    const { resultType, resultBody } = data || {}
    const hasTimeSlots = resultType === 'OK' && Array.isArray(resultBody)
    if (hasTimeSlots) {
      yield put(getTransferTimeSlotsSuccess(resultBody))
      return
    }
    yield put(getTransferTimeSlotsError())
  } catch {
    yield put(getTransferTimeSlotsError())
  }
}
