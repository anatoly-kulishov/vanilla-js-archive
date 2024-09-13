import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_DATA_SUBSCRIBER = 'dataClientSubscriber/FETCH_DATA_SUBSCRIBER'
export const FETCH_DATA_SUBSCRIBER_SUCCESS = 'dataClientSubscriber/FETCH_DATA_SUBSCRIBER_SUCCESS'
export const FETCH_DATA_SUBSCRIBER_ERROR = 'dataClientSubscriber/FETCH_DATA_SUBSCRIBER_ERROR'
export const FETCH_DATA_SUBSCRIBER_FAILURE = 'dataClientSubscriber/FETCH_DATA_SUBSCRIBER_FAILURE'

export const FETCH_DATA_CLIENT = 'dataClientSubscriber/FETCH_DATA_CLIENT'
export const FETCH_DATA_CLIENT_SUCCESS = 'dataClientSubscriber/FETCH_DATA_CLIENT_SUCCESS'
export const FETCH_DATA_CLIENT_ERROR = 'dataClientSubscriber/FETCH_DATA_CLIENT_ERROR'
export const FETCH_DATA_CLIENT_FAILURE = 'dataClientSubscriber/FETCH_DATA_CLIENT_FAILURE'

export const FETCH_REVOKE = 'dataClientSubscriber/FETCH_REVOKE'
export const FETCH_REVOKE_SUCCESS = 'dataClientSubscriber/FETCH_REVOKE_SUCCESS'
export const FETCH_REVOKE_ERROR = 'dataClientSubscriber/FETCH_REVOKE_ERROR'
export const FETCH_REVOKE_FAILURE = 'dataClientSubscriber/FETCH_REVOKE_FAILURE'

export const FETCH_VIP_SEGMENTATION = 'dataClientSubscriber/FETCH_VIP_SEGMENTATION'
export const FETCH_VIP_SEGMENTATION_SUCCESS = 'dataClientSubscriber/FETCH_VIP_SEGMENTATION_SUCCESS'
export const FETCH_VIP_SEGMENTATION_ERROR = 'dataClientSubscriber/FETCH_VIP_SEGMENTATION_ERROR'
export const FETCH_VIP_SEGMENTATION_FAILURE = 'dataClientSubscriber/FETCH_VIP_SEGMENTATION_FAILURE'

export const PAYMENT_DELIVERY_TYPES_FETCH = 'personalAccount/PAYMENT_DELIVERY_TYPES_FETCH'
export const PAYMENT_DELIVERY_TYPES_FETCH_SUCCESS = 'personalAccount/PAYMENT_DELIVERY_TYPES_FETCH_SUCCESS'
export const PAYMENT_DELIVERY_TYPES_FETCH_ERROR = 'personalAccount/PAYMENT_DELIVERY_TYPES_FETCH_ERROR'
export const PAYMENT_DELIVERY_TYPES_FETCH_FAILURE = 'personalAccount/PAYMENT_DELIVERY_TYPES_FETCH_FAILURE'

export const UPDATE_SUBSCRIBER_DATA = 'personalAccount/UPDATE_SUBSCRIBER_DATA'
export const UPDATE_CLIENT_DATA = 'personalAccount/UPDATE_CLIENT_DATA'
export const UPDATE_SUBSCRIBER_CLIENT_DATA_SUCCESS = 'personalAccount/UPDATE_SUBSCRIBER_DATA_SUCCESS'
export const UPDATE_SUBSCRIBER_CLIENT_DATA_ERROR = 'personalAccount/UPDATE_SUBSCRIBER_DATA_ERROR'
export const UPDATE_SUBSCRIBER_CLIENT_DATA_FAILURE = 'personalAccount/UPDATE_SUBSCRIBER_DATA_FAILURE'

export const DELETE_FROM_SPACE = 'personalAccount/DELETE_FROM_SPACE'
export const DELETE_FROM_SPACE_SUCCESS = 'personalAccount/DELETE_FROM_SPACE_SUCCESS'
export const DELETE_FROM_SPACE_ERROR = 'personalAccount/DELETE_FROM_SPACE_ERROR'
export const DELETE_FROM_SPACE_FAILURE = 'personalAccount/DELETE_FROM_SPACE_FAILURE'

export const POST_SEND_AGREE = 'personalAccount/POST_SEND_AGREE'
export const POST_SEND_AGREE_SUCCESS = 'personalAccount/POST_SEND_AGREE_SUCCESS'
export const POST_SEND_AGREE_ERROR = 'personalAccount/POST_SEND_AGREE_ERROR'
export const POST_SEND_AGREE_FAILURE = 'personalAccount/POST_SEND_AGREE_FAILURE'

const initalState = {
  dataSubscriber: null,
  isLoadingDataSubscriber: false,
  errorSubscriber: false,

  dataClient: null,
  isLoadingDataClient: false,
  errorDataClient: false,

  paymentDeliveryTypes: [],
  isPaymentDeliveryTypesLoading: false,
  isPaymentDeliveryTypesError: false,

  isRevokeLoading: false,
  isRevokeError: false,

  vipSegmentation: null,
  isVipSegmentationLoading: false,
  isVipSegmentationError: false,

  isUpdateSubscriberClientDataLoading: false,
  isUpdateSubscriberClientDataError: false,

  isDeleteFromSpaceLoading: false,
  isDeleteFromSpaceError: false,

  isPepSendAgreeLoading: false,
  isPepSendAgreeError: false
}

export const fetchDataSubscriber = createAction(FETCH_DATA_SUBSCRIBER)
export const fetchDataClient = createAction(FETCH_DATA_CLIENT)
export const updateSubscriberData = createAction(UPDATE_SUBSCRIBER_DATA)
export const updateClientData = createAction(UPDATE_CLIENT_DATA)
export const revoke = createAction(FETCH_REVOKE)
export const fetchVipSegmentation = createAction(FETCH_VIP_SEGMENTATION)
export const deleteFromSpace = createAction(DELETE_FROM_SPACE)
export const postSendAgree = createAction(POST_SEND_AGREE)

export default handleActions({
  [FETCH_DATA_SUBSCRIBER]: (state, payload) => {
    return {
      ...state,
      isLoadingDataSubscriber: true,
      errorSubscriber: false
    }
  },

  [FETCH_DATA_SUBSCRIBER_SUCCESS]: (state, { payload: { data } }) => {
    return {
      ...state,
      dataSubscriber: data,
      isLoadingDataSubscriber: false,
      errorSubscriber: false
    }
  },

  [combineActions(FETCH_DATA_SUBSCRIBER_ERROR, FETCH_DATA_SUBSCRIBER_FAILURE)]:
  (state, { payload: { error } }) => {
    return {
      ...state,
      isLoadingDataSubscriber: false,
      errorSubscriber: error
    }
  },

  [FETCH_REVOKE]: (state, payload) => {
    return {
      ...state,
      isRevokeLoading: true,
      isRevokeError: false
    }
  },

  [FETCH_REVOKE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      isRevokeLoading: false,
      isRevokeError: false
    }
  },

  [combineActions(FETCH_REVOKE_ERROR, FETCH_REVOKE_FAILURE)]:
  (state, payload) => {
    return {
      ...state,
      isRevokeLoading: false,
      isRevokeError: true
    }
  },

  [FETCH_VIP_SEGMENTATION]: (state, payload) => {
    return {
      ...state,
      isVipSegmentationLoading: true,
      isVipSegmentationError: false
    }
  },

  [FETCH_VIP_SEGMENTATION_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      vipSegmentation: payload,
      isVipSegmentationLoading: false,
      isVipSegmentationError: false
    }
  },

  [combineActions(FETCH_VIP_SEGMENTATION_ERROR, FETCH_VIP_SEGMENTATION_FAILURE)]:
  (state, payload) => {
    return {
      ...state,
      isVipSegmentationLoading: false,
      isVipSegmentationError: true
    }
  },

  [FETCH_DATA_CLIENT]: (state) => ({
    ...state,
    isLoadingDataClient: true,
    errorDataClient: false
  }),

  [FETCH_DATA_CLIENT_SUCCESS]: (state, { payload: { data } }) => {
    return {
      ...state,
      dataClient: data,
      isLoadingDataClient: false,
      errorDataClient: false
    }
  },

  [FETCH_DATA_CLIENT_ERROR]: (state, { payload: { error } }) => {
    return {
      ...state,
      isLoadingDataClient: false,
      errorDataClient: true
    }
  },

  [FETCH_DATA_CLIENT_FAILURE]: (state) => ({
    ...state,
    isLoadingDataClient: false,
    errorDataClient: true
  }),
  // Fetch payments delivery types
  [PAYMENT_DELIVERY_TYPES_FETCH]: produce((state) => {
    state.isPaymentDeliveryTypesLoading = true
  }),
  [PAYMENT_DELIVERY_TYPES_FETCH_SUCCESS]: produce((state, { payload }) => {
    state.paymentDeliveryTypes = payload
    state.isPaymentDeliveryTypesLoading = false
  }),
  [combineActions(PAYMENT_DELIVERY_TYPES_FETCH_ERROR, PAYMENT_DELIVERY_TYPES_FETCH_FAILURE)]: produce((state) => {
    state.isPaymentDeliveryTypesError = true
    state.isPaymentDeliveryTypesLoading = false
  }),
  // Update subscriber and client data
  [UPDATE_SUBSCRIBER_DATA]: produce((state) => {
    state.isUpdateSubscriberClientDataLoading = true
  }),
  // Update client data
  [UPDATE_CLIENT_DATA]: produce((state) => {
    state.isUpdateSubscriberClientDataLoading = true
  }),
  [UPDATE_SUBSCRIBER_CLIENT_DATA_SUCCESS]: produce((state, { payload }) => {
    state.isUpdateSubscriberClientDataLoading = false
  }),
  [combineActions(UPDATE_SUBSCRIBER_CLIENT_DATA_ERROR, UPDATE_SUBSCRIBER_CLIENT_DATA_FAILURE)]: produce((state) => {
    state.isUpdateSubscriberClientDataError = true
    state.isUpdateSubscriberClientDataLoading = false
  }),
  [DELETE_FROM_SPACE]: produce(state => {
    state.isDeleteFromSpaceLoading = true
  }),
  [DELETE_FROM_SPACE_SUCCESS]: produce(state => {
    state.isDeleteFromSpaceLoading = false
  }),
  [combineActions(DELETE_FROM_SPACE_ERROR, DELETE_FROM_SPACE_FAILURE)]: produce(state => {
    state.isDeleteFromSpaceLoading = false
    state.isDeleteFromSpaceError = true
  }),
  [POST_SEND_AGREE]: produce(state => {
    state.isPepSendAgreeLoading = true
  }),
  [POST_SEND_AGREE_SUCCESS]: produce(state => {
    state.isPepSendAgreeLoading = false
    state.isPepSendAgreeError = false
  }),
  [combineActions(POST_SEND_AGREE_ERROR, POST_SEND_AGREE_FAILURE)]: produce(state => {
    state.isPepSendAgreeLoading = false
    state.isPepSendAgreeError = true
  })
}, initalState)
