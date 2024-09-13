import { handleActions } from 'redux-actions'
import { produce } from 'immer'

import {
  GET_TRANSFER_EARLIEST_TIME_SLOT,
  GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR,
  GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS,
  GET_TRANSFER_TIME_SLOTS,
  GET_TRANSFER_TIME_SLOTS_ERROR,
  GET_TRANSFER_TIME_SLOTS_SUCCESS,
  SUBMIT_TRANSFER_TIME_SLOT
} from './actions'

const initialState = {
  transferEarliestTimeSlot: null,
  isTransferEarliestTimeSlotLoading: false,
  transferTimeSlots: null,
  isTransferTimeSlotsLoading: false,
  submittedTransferTimeSlot: null,
  transferAdditionalInfoNumber: null
}

export default handleActions(
  {
    [GET_TRANSFER_TIME_SLOTS]: produce((state) => {
      state.isTransferTimeSlotsLoading = true
    }),
    [GET_TRANSFER_TIME_SLOTS_SUCCESS]: produce((state, { payload }) => {
      state.transferTimeSlots = payload
      state.isTransferTimeSlotsLoading = false
    }),
    [GET_TRANSFER_TIME_SLOTS_ERROR]: produce((state) => {
      state.isTransferTimeSlotsLoading = false
    }),

    [GET_TRANSFER_EARLIEST_TIME_SLOT]: produce((state) => {
      state.isTransferEarliestTimeSlotLoading = true
    }),
    [GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS]: produce((state, { payload }) => {
      state.transferEarliestTimeSlot = payload
      state.isTransferEarliestTimeSlotLoading = false
    }),
    [GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR]: produce((state) => {
      state.isTransferEarliestTimeSlotLoading = false
    }),

    [SUBMIT_TRANSFER_TIME_SLOT]: produce((state, { payload }) => {
      state.submittedTransferTimeSlot = payload
    })
  },
  initialState
)
