import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'
import isEqual from 'lodash/isEqual'
import { wsStatus } from 'constants/wsStatus'

export const CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS = 'person/CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS'
export const CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS = 'person/CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS'
export const CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_ERROR = 'person/CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_ERROR'

export const DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS = 'person/DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS'
export const DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS = 'person/DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS'

export const CUSTOMER_SEGMENTS_PREVIEW_DATA_RECEIVED = 'person/CUSTOMER_SEGMENTS_PREVIEW_DATA_RECEIVED'

export const CONNECT_CUSTOMER_SEGMENTS_WS = 'person/CONNECT_CUSTOMER_SEGMENTS_WS'
export const CONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS = 'person/CONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS'
export const CONNECT_CUSTOMER_SEGMENTS_WS_ERROR = 'person/CONNECT_CUSTOMER_SEGMENTS_WS_ERROR'

export const DISCONNECT_CUSTOMER_SEGMENTS_WS = 'person/DISCONNECT_CUSTOMER_SEGMENTS_WS'
export const DISCONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS = 'person/DISCONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS'

export const CUSTOMER_SEGMENTS_DATA_RECEIVED = 'person/CUSTOMER_SEGMENTS_DATA_RECEIVED'

export const connectCustomerSegmentsPreviewWs = createAction(CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS)
export const connectCustomerSegmentsWs = createAction(CONNECT_CUSTOMER_SEGMENTS_WS)

export const disconnectCustomerSegmentsPreviewWs = createAction(DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS)
export const disconnectCustomerSegmentsWs = createAction(DISCONNECT_CUSTOMER_SEGMENTS_WS)

const initialState = {
  customerSegmentsPreviewWsStatus: wsStatus.connecting,
  customerSegmentsPreview: null,

  customerSegmentsWsStatus: wsStatus.connecting,
  customerSegments: null
}

export default handleActions({
  [combineActions(CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS, CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_ERROR)]: produce((state) => {
    state.customerSegmentsPreviewWsStatus = wsStatus.connecting
  }),
  [CONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS]: produce((state) => {
    state.customerSegmentsPreviewWsStatus = wsStatus.open
  }),
  [DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS]: produce(state => {
    state.customerSegmentsPreviewWsStatus = wsStatus.closing
  }),
  [DISCONNECT_CUSTOMER_SEGMENTS_PREVIEW_WS_SUCCESS]: produce((state) => {
    state.customerSegmentsPreviewWsStatus = wsStatus.closed
  }),
  [CUSTOMER_SEGMENTS_PREVIEW_DATA_RECEIVED]: produce((state, { payload }) => {
    if (!isEqual(state.customerSegmentsPreview, payload)) {
      state.customerSegmentsPreview = payload
    }
  }),

  [combineActions(CONNECT_CUSTOMER_SEGMENTS_WS, CONNECT_CUSTOMER_SEGMENTS_WS_ERROR)]: produce((state) => {
    state.customerSegmentsWsStatus = wsStatus.connecting
  }),
  [CONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS]: produce((state) => {
    state.customerSegmentsWsStatus = wsStatus.open
  }),
  [DISCONNECT_CUSTOMER_SEGMENTS_WS]: produce(state => {
    state.customerSegmentsWsStatus = wsStatus.closing
  }),
  [DISCONNECT_CUSTOMER_SEGMENTS_WS_SUCCESS]: produce((state) => {
    state.customerSegmentsWsStatus = wsStatus.closed
  }),
  [CUSTOMER_SEGMENTS_DATA_RECEIVED]: produce((state, { payload }) => {
    if (!isEqual(state.customerSegments, payload)) {
      state.customerSegments = payload
    }
  })
}, initialState)
