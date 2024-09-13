import { all, takeEvery } from 'redux-saga/effects'

import { getTransferEarliestTimeSlot, getTransferTimeSlots } from '../actions'
import { getTransferEarliestTimeSlotSaga, getTransferTimeSlotsSaga } from '../sagas/sagas'

export default function * () {
  yield all([
    takeEvery(getTransferEarliestTimeSlot().type, getTransferEarliestTimeSlotSaga),
    takeEvery(getTransferTimeSlots().type, getTransferTimeSlotsSaga)
  ])
}
