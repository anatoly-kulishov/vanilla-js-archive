import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'
import sseStatus from 'constants/sseStatus'

export const GET_PROMOCODE_SERVICE_TYPE = 'compensations/GET_PROMOCODE_SERVICE_TYPE'
export const GET_PROMOCODE_SERVICE_TYPE_SUCCESS = 'compensations/GET_PROMOCODE_SERVICE_TYPE_SUCCESS'
export const GET_PROMOCODE_SERVICE_TYPE_ERROR = 'compensations/GET_PROMOCODE_SERVICE_TYPE_ERROR'
export const GET_PROMOCODE_SERVICE_TYPE_FAILURE = 'compensations/GET_PROMOCODE_SERVICE_TYPE_FAILURE'

export const GET_PROMOCODE_TYPE = 'compensations/GET_PROMOCODE_TYPE'
export const GET_PROMOCODE_TYPE_SUCCESS = 'compensations/GET_PROMOCODE_TYPE_SUCCESS'
export const GET_PROMOCODE_TYPE_ERROR = 'compensations/GET_PROMOCODE_TYPE_ERROR'
export const GET_PROMOCODE_TYPE_FAILURE = 'compensations/GET_PROMOCODE_TYPE_FAILURE'

export const COMPENSATION_FORM_PROMOCODE_SUCCESS = 'compensation/COMPENSATION_FORM_PROMOCODE_SUCCESS'
export const COMPENSATION_FORM_PROMOCODE_WARNING = 'compensation/COMPENSATION_FORM_PROMOCODE_WARNING'
export const COMPENSATION_FORM_PROMOCODE_ERROR = 'compensation/COMPENSATION_FORM_PROMOCODE_ERROR'
export const COMPENSATION_FORM_PROMOCODE_FAILURE = 'compensation/COMPENSATION_FORM_PROMOCODE_FAILURE'

export const ADD_PROMOCODE_COMPENSATION = 'compensations/ADD_PROMOCODE_COMPENSATION'
export const ADD_PROMOCODE_COMPENSATION_SUCCESS = 'compensations/ADD_PROMOCODE_COMPENSATION_SUCCESS'
export const ADD_PROMOCODE_COMPENSATION_WARNING = 'compensations/ADD_PROMOCODE_COMPENSATION_WARNING'
export const ADD_PROMOCODE_COMPENSATION_ERROR = 'compensations/ADD_PROMOCODE_COMPENSATION_ERROR'
export const ADD_PROMOCODE_COMPENSATION_FAILURE = 'compensations/ADD_PROMOCODE_COMPENSATION_FAILURE'

export const CANCEL_PROMOCODE_COMPENSATION = 'compensations/CANCEL_PROMOCODE_COMPENSATION'
export const CANCEL_PROMOCODE_SUCCESS = 'compensations/CANCEL_PROMOCODE_SUCCESS'
export const CANCEL_PROMOCODE_ERROR = 'compensations/CANCEL_PROMOCODE_ERROR'
export const CANCEL_PROMOCODE_FAILURE = 'compensations/CANCEL_PROMOCODE_FAILURE'
export const CANCEL_COMPENSATION_SUCCESS = 'compensations/CANCEL_COMPENSATION_SUCCESS'
export const CANCEL_COMPENSATION_ERROR = 'compensations/CANCEL_PROMOCODE_COMPENSATION_ERROR'
export const CANCEL_COMPENSATION_FAILURE = 'compensations/CANCEL_PROMOCODE_COMPENSATION_FAILURE'

export const CANCEL_PROMOCODE_COMPENSATION_CONNECT = 'compensations/CANCEL_PROMOCODE_COMPENSATION_CONNECT'
export const CANCEL_PROMOCODE_COMPENSATION_CONNECT_SUCCESS = 'compensations/CANCEL_PROMOCODE_COMPENSATION_CONNECT_SUCCESS'
export const CANCEL_PROMOCODE_COMPENSATION_CONNECT_ERROR = 'compensations/CANCEL_PROMOCODE_COMPENSATION_CONNECT_ERROR'

export const CANCEL_PROMOCODE_COMPENSATION_DATA_RECIEVED = 'compensations/CANCEL_PROMOCODE_COMPENSATION_DATA_RECIEVED'

export const GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO'
export const GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_SUCCESS = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_SUCCESS'
export const GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_ERROR = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_ERROR'
export const GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_FAILURE = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_FAILURE'

export const getPromocodeServiceType = createAction(GET_PROMOCODE_SERVICE_TYPE)
export const getPromocodeType = createAction(GET_PROMOCODE_TYPE)
export const addPromocodeCompensation = createAction(ADD_PROMOCODE_COMPENSATION)
export const cancelPromocodeCompensation = createAction(CANCEL_PROMOCODE_COMPENSATION)
export const cancelPromocodeCompensationConnect = createAction(CANCEL_PROMOCODE_COMPENSATION_CONNECT)
export const getMarginServiceSizeRelateInPromo = createAction(GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO)

const emptyError = {
  data: '',
  createdOn: null,
  shouldDisable: false
}

const initialState = {
  promocodes: {
    data: [],
    isLoading: false,
    error: emptyError
  },
  promocodeServiceTypes: {
    data: [],
    isLoading: false,
    error: emptyError
  },
  promocodeTypes: {
    data: [],
    isLoading: false,
    error: emptyError
  },
  compensationFormPromocode: {
    data: [],
    error: emptyError
  },
  addPromocode: {
    data: null,
    isLoading: false,
    isError: false,
    error: emptyError
  },
  cancelCompensation: {
    data: null,
    isLoading: false,
    isError: false,
    error: emptyError
  },

  cancelPromocode: {
    data: null,
    isLoading: false,
    isError: false,
    error: emptyError
  },

  marginServiceSizeRelateInPromo: {
    data: [],
    isLoading: false,
    error: emptyError
  }
}

export default handleActions({
  [GET_PROMOCODE_SERVICE_TYPE]: produce(state => {
    state.promocodeServiceTypes.isLoading = true
    state.promocodeServiceTypes.error = emptyError
  }),
  [GET_PROMOCODE_SERVICE_TYPE_SUCCESS]: produce((state, { payload }) => {
    state.promocodeServiceTypes.isLoading = false
    state.promocodeServiceTypes.data = payload.data
    if (payload.error) state.promocodeServiceTypes.error = payload.error
  }),
  [combineActions(GET_PROMOCODE_SERVICE_TYPE_ERROR, GET_PROMOCODE_SERVICE_TYPE_FAILURE)]:
  produce((state, { payload }) => {
    state.promocodeServiceTypes.isLoading = false
    if (payload.error) state.promocodeServiceTypes.error = payload.error
  }),

  [GET_PROMOCODE_TYPE]: produce(state => {
    state.promocodeTypes.isLoading = true
    state.promocodeTypes.error = emptyError
  }),
  [GET_PROMOCODE_TYPE_SUCCESS]: produce((state, { payload }) => {
    state.promocodeTypes.isLoading = false
    state.promocodeTypes.data = payload.data
    if (payload.error) state.promocodeTypes.error = payload.error
  }),
  [combineActions(GET_PROMOCODE_TYPE_ERROR, GET_PROMOCODE_TYPE_FAILURE)]:
  produce((state, { payload }) => {
    state.promocodeTypes.isLoading = false
    if (payload.error) state.promocodeTypes.error = payload.error
  }),
  // Compensation promocode form
  [COMPENSATION_FORM_PROMOCODE_SUCCESS]: produce((state, { payload }) => {
    state.compensationFormPromocode.data = payload.data
    if (payload.error) {
      state.compensationFormPromocode.error = payload.error
    } else {
      state.compensationFormPromocode.error = emptyError
    }
  }),
  [combineActions(COMPENSATION_FORM_PROMOCODE_ERROR, COMPENSATION_FORM_PROMOCODE_WARNING, COMPENSATION_FORM_PROMOCODE_FAILURE)]:
  produce((state, { payload }) => {
    if (payload.error) {
      state.compensationFormPromocode.error = payload.error
    } else {
      state.compensationFormPromocode.error = emptyError
    }
  }),
  // Add promocode
  [ADD_PROMOCODE_COMPENSATION]: produce((state) => {
    state.addPromocode.isLoading = true
  }),
  [ADD_PROMOCODE_COMPENSATION_SUCCESS]: produce((state, { payload: { data, error } }) => {
    state.addPromocode.isLoading = false
    state.addPromocode.data = data
    state.addPromocode.error = error
  }),
  [combineActions(ADD_PROMOCODE_COMPENSATION_ERROR, ADD_PROMOCODE_COMPENSATION_WARNING, ADD_PROMOCODE_COMPENSATION_FAILURE)]:
  produce((state, { payload: { data, error } }) => {
    state.addPromocode.data = data
    state.addPromocode.isError = true
    state.addPromocode.isLoading = false
    state.addPromocode.error = error
  }),
  // Cancel promocode and compensation
  [CANCEL_PROMOCODE_COMPENSATION_CONNECT]: produce((state) => {
    state.sseStatus = sseStatus.connecting
  }),
  [CANCEL_PROMOCODE_COMPENSATION_CONNECT_SUCCESS]: produce((state) => {
    state.sseStatus = sseStatus.connected
  }),
  [combineActions(CANCEL_PROMOCODE_COMPENSATION_CONNECT_ERROR)]: produce((state) => {
    state.sseStatus = sseStatus.connecting
  }),
  [CANCEL_PROMOCODE_COMPENSATION_DATA_RECIEVED]: produce((state, { payload }) => {
    state.compensationData = payload
  }),
  [CANCEL_PROMOCODE_COMPENSATION]: produce((state) => {
    state.cancelPromocode.isLoading = true
  }),
  [combineActions(CANCEL_PROMOCODE_ERROR, CANCEL_PROMOCODE_FAILURE)]:
  produce((state, { payload: { data, error } }) => {
    state.cancelPromocode.data = data
    state.cancelPromocode.isError = true
    state.cancelPromocode.isLoading = false
    state.cancelPromocode.error = error
  }),
  [CANCEL_PROMOCODE_SUCCESS]: produce((state, { payload: { data, error } }) => {
    state.cancelPromocode.isLoading = false
    state.cancelPromocode.data = data
    state.cancelPromocode.error = error
  }),
  [CANCEL_COMPENSATION_SUCCESS]: produce((state, { payload: { data, error } }) => {
    state.cancelCompensation.isLoading = false
    state.cancelCompensation.data = data
    state.cancelCompensation.error = error
  }),
  [combineActions(CANCEL_COMPENSATION_ERROR, CANCEL_COMPENSATION_FAILURE)]:
  produce((state, { payload: { data, error } }) => {
    state.cancelCompensation.isLoading = false
    state.cancelCompensation.isError = true
    state.cancelCompensation.data = data
    state.cancelCompensation.error = error
  }),

  [GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO]: produce(state => {
    state.marginServiceSizeRelateInPromo.isLoading = true
    state.marginServiceSizeRelateInPromo.error = emptyError
  }),
  [GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_SUCCESS]: produce((state, { payload }) => {
    state.marginServiceSizeRelateInPromo.isLoading = false
    state.marginServiceSizeRelateInPromo.data = payload.data
    if (payload.error) state.marginServiceSizeRelateInPromo.error = payload.error
  }),
  [combineActions(GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_ERROR, GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_FAILURE)]:
  produce((state, { payload }) => {
    state.marginServiceSizeRelateInPromo.isLoading = false
    if (payload.error) state.marginServiceSizeRelateInPromo.error = payload.error
  })
}, initialState)
