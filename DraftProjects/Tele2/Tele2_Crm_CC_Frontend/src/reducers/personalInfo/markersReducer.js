import { handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_RTK_SEGMENT = 'personalAccount/GET_RTK_SEGMENT'
export const GET_RTK_SEGMENT_SUCCESS = 'personalAccount/GET_RTK_SEGMENT_SUCCESS'
export const GET_RTK_SEGMENT_ERROR = 'personalAccount/GET_RTK_SEGMENT_ERROR'
export const GET_RTK_SEGMENT_FAILURE = 'personalAccount/GET_RTK_SEGMENT_FAILURE'

const initalState = {
  isRtkSegmentLoading: false,
  isRtkSegmentError: false
}

export default handleActions({
  [GET_RTK_SEGMENT]: produce((state) => {
    state.isRtkSegmentLoading = true
  }),
  [GET_RTK_SEGMENT_SUCCESS]: produce((state) => {
    state.isRtkSegmentLoading = false
  }),
  [combineActions(GET_RTK_SEGMENT_ERROR, GET_RTK_SEGMENT_FAILURE)]: produce((state) => {
    state.isRtkSegmentLoading = false
    state.isisRtkSegmentError = true
  })
}, initalState)
