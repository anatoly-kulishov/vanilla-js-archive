import { createAction } from 'redux-actions'

export const GET_TRANSFER_EARLIEST_TIME_SLOT = 'transferTime/GET_TRANSFER_EARLIEST_TIME_SLOT'
export const GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS = 'transferTime/GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS'
export const GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR = 'transferTime/GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR'

export const GET_TRANSFER_TIME_SLOTS = 'transferTime/GET_TRANSFER_TIME_SLOTS'
export const GET_TRANSFER_TIME_SLOTS_SUCCESS = 'transferTime/GET_TRANSFER_TIME_SLOTS_SUCCESS'
export const GET_TRANSFER_TIME_SLOTS_ERROR = 'transferTime/GET_TRANSFER_TIME_SLOTS_ERROR'

export const SUBMIT_TRANSFER_TIME_SLOT = 'transferTime/SUBMIT_TRANSFER_TIME_SLOT'

export const getTransferEarliestTimeSlot = createAction(GET_TRANSFER_EARLIEST_TIME_SLOT)
export const getTransferEarliestTimeSlotSuccess = createAction(GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS)
export const getTransferEarliestTimeSlotError = createAction(GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR)

export const getTransferTimeSlots = createAction(GET_TRANSFER_TIME_SLOTS)
export const getTransferTimeSlotsSuccess = createAction(GET_TRANSFER_TIME_SLOTS_SUCCESS)
export const getTransferTimeSlotsError = createAction(GET_TRANSFER_TIME_SLOTS_ERROR)

export const submitTransferTimeSlot = createAction(SUBMIT_TRANSFER_TIME_SLOT)
