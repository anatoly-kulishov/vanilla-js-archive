import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const ALLOCATED_INFO_FETCH = 'internal/ALLOCATED_INFO_FETCH'
export const ALLOCATED_INFO_FETCH_SUCCESS = 'internal/ALLOCATED_INFO_FETCH_SUCCESS'
export const ALLOCATED_INFO_FETCH_ERROR = 'internal/ALLOCATED_INFO_FETCH_ERROR'
export const ALLOCATED_INFO_FETCH_FAILURE = 'internal/ALLOCATED_INFO_FETCH_FAILURE'

export const fetchAllocatedInfo = createAction(ALLOCATED_INFO_FETCH)

const initialState = {
  allocatedInfo: null,
  isAllocatedShow: false,
  isAllocatedInfoLoading: false,
  isAllocatedInfoError: false
}

export default handleActions({
  [ALLOCATED_INFO_FETCH]: produce(() => ({
    isAllocatedInfoLoading: true
  })),

  [ALLOCATED_INFO_FETCH_SUCCESS]: produce((_state, { payload: { allocatedInfo, isAllocatedShow } }) => ({
    allocatedInfo,
    isAllocatedShow,
    isAllocatedInfoLoading: false,
    isAllocatedInfoError: false
  })),

  [combineActions(ALLOCATED_INFO_FETCH_ERROR, ALLOCATED_INFO_FETCH_FAILURE)]: produce(() => ({
    allocatedInfo: null,
    isAllocatedShow: false,
    isAllocatedInfoLoading: false,
    isAllocatedInfoError: true
  }))
}, initialState)
