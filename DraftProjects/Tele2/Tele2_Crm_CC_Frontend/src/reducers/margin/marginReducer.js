import { createAction, handleActions, combineActions } from 'redux-actions'

export const FETCH_SUBSCRIBER_MARGIN_MARKER = 'margin/FETCH_SUBSCRIBER_MARGIN_MARKER'
export const FETCH_SUBSCRIBER_MARGIN_MARKER_SUCCESS = 'margin/FETCH_SUBSCRIBER_MARGIN_MARKER_SUCCESS'
export const FETCH_SUBSCRIBER_MARGIN_MARKER_ERROR = 'margin/FETCH_SUBSCRIBER_MARGIN_MARKER_ERROR'
export const FETCH_SUBSCRIBER_MARGIN_MARKER_FAILURE = 'margin/FETCH_SUBSCRIBER_MARGIN_MARKER_FAILURE'

const initialState = {
  subscriberMarginMarker: null,
  isSubscriberMarginMarkerLoading: false,
  isSubscriberMarginMarkerError: false
}

export const fetchSubscriberMarginMarker = createAction(FETCH_SUBSCRIBER_MARGIN_MARKER)

export default handleActions({
  [FETCH_SUBSCRIBER_MARGIN_MARKER]: (state) => ({
    ...state,
    subscriberMarginMarker: null,
    isSubscriberMarginMarkerLoading: true,
    isSubscriberMarginMarkerError: false
  }),
  [FETCH_SUBSCRIBER_MARGIN_MARKER_SUCCESS]: (state, { payload }) => ({
    ...state,
    subscriberMarginMarker: payload,
    isSubscriberMarginMarkerLoading: false,
    isSubscriberMarginMarkerError: false
  }),
  [combineActions(FETCH_SUBSCRIBER_MARGIN_MARKER_ERROR, FETCH_SUBSCRIBER_MARGIN_MARKER_FAILURE)]: (state) => ({
    ...state,
    isSubscriberMarginMarkerLoading: false,
    isSubscriberMarginMarkerError: true
  })
}, initialState)
