import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const CHECK_MNP_HANDLING = 'mnp/CHECK_MNP_HANDLING'
export const CHECK_MNP_HANDLING_SUCCESS = 'mnp/CHECK_MNP_HANDLING_SUCCESS'
export const CHECK_MNP_HANDLING_ERROR = 'mnp/CHECK_MNP_HANDLING_ERROR'
export const CHECK_MNP_HANDLING_FAILURE = 'mnp/CHECK_MNP_HANDLING_FAILURE'

export const SET_MNP_INFO = 'mnp/SET_MNP_INFO'

export const TOGGLE_MNP_INFO_CARDS = 'mnp/TOGGLE_MNP_INFO_CARDS'

export const TOGGLE_CHECK_MNP_PASSED = 'mnp/TOGGLE_CHECK_MNP_PASSED'

export const GET_MNP_ORDER = 'mnp/GET_MNP_ORDER'
export const GET_MNP_ORDER_SUCCESS = 'mnp/GET_MNP_ORDER_SUCCESS'
export const GET_MNP_ORDER_ERROR = 'mnp/GET_MNP_ORDER_ERROR'
export const GET_MNP_ORDER_FAILURE = 'mnp/GET_MNP_ORDER_FAILURE'

export const CANCEL_MNP_ORDER = 'mnp/CANCEL_MNP_ORDER'
export const CANCEL_MNP_ORDER_SUCCESS = 'mnp/CANCEL_MNP_ORDER_SUCCESS'
export const CANCEL_MNP_ORDER_ERROR = 'mnp/CANCEL_MNP_ORDER_ERROR'
export const CANCEL_MNP_ORDER_FAILURE = 'mnp/CANCEL_MNP_ORDER_FAILURE'

export const GET_ORDER_HISTORY = 'mnp/GET_ORDER_HISTORY'
export const GET_ORDER_HISTORY_SUCCESS = 'mnp/GET_ORDER_HISTORY_SUCCESS'
export const GET_ORDER_HISTORY_ERROR = 'mnp/GET_ORDER_HISTORY_ERROR'
export const GET_ORDER_HISTORY_FAILURE = 'mnp/GET_ORDER_HISTORY_FAILURE'

export const GET_CANCELLATIONS_NUMBER = 'mnp/GET_CANCELLATIONS_NUMBER'
export const GET_CANCELLATIONS_NUMBER_SUCCESS = 'mnp/GET_CANCELLATIONS_NUMBER_SUCCESS'
export const GET_CANCELLATIONS_NUMBER_ERROR = 'mnp/GET_CANCELLATIONS_NUMBER_ERROR'
export const GET_CANCELLATIONS_NUMBER_FAILURE = 'mnp/GET_CANCELLATIONS_NUMBER_FAILURE'

export const GET_CLOSED_ORDERS = 'mnp/GET_CLOSED_ORDERS'
export const GET_CLOSED_ORDERS_SUCCESS = 'mnp/GET_CLOSED_ORDERS_SUCCESS'
export const GET_CLOSED_ORDERS_ERROR = 'mnp/GET_CLOSED_ORDERS_ERROR'
export const GET_CLOSED_ORDERS_FAILURE = 'mnp/GET_CLOSED_ORDERS_FAILURE'

export const TOGGLE_MNP_QUESTIONARY = 'mnp/TOGGLE_MNP_QUESTIONARY'

export const GET_HISTORY_ORDER_ID_LIST = 'mnp/GET_HISTORY_ORDER_ID_LIST'
export const GET_HISTORY_ORDER_ID_LIST_SUCCESS = 'mnp/GET_HISTORY_ORDER_ID_LIST_SUCCESS'
export const GET_HISTORY_ORDER_ID_LIST_ERROR = 'mnp/GET_HISTORY_ORDER_ID_LIST_ERROR'
export const GET_HISTORY_ORDER_ID_LIST_FAILURE = 'mnp/GET_HISTORY_ORDER_ID_LIST_FAILURE'

export const checkMnpHandling = createAction(CHECK_MNP_HANDLING)
export const getMnpOrder = createAction(GET_MNP_ORDER)
export const toggleMnpInfoCards = createAction(TOGGLE_MNP_INFO_CARDS)
export const cancelMnpOrder = createAction(CANCEL_MNP_ORDER)
export const getOrderHistory = createAction(GET_ORDER_HISTORY)
export const toggleCheckMnpPassed = createAction(TOGGLE_CHECK_MNP_PASSED)
export const getCancellationsNumber = createAction(GET_CANCELLATIONS_NUMBER)
export const getClosedOrders = createAction(GET_CLOSED_ORDERS)
export const toggleMnpQuestionary = createAction(TOGGLE_MNP_QUESTIONARY)
export const getHistoryOrderIdList = createAction(GET_HISTORY_ORDER_ID_LIST)

const initialState = {
  abonentData: {
    donorOperatorName: '',
    recipientOperatorName: '',
    portingDate: null,
    transferStatus: ''
  },
  markerData: {
    isSetted: false,
    title: '',
    message: '',
    colorType: null
  },
  isMnpLoading: false,
  mnpError: false,

  isMnpOrderVisible: false,
  isCheckMnpPressed: false,

  mnpHandlingData: null,
  isCheckMNPHandlingLoading: false,
  сheckMNPHandlingError: '',
  isCheckMNPHandlingError: false,

  mnpOrder: null,
  isMnpOrderLoading: false,
  mnpOrderError: '',
  isMnpOrderError: false,

  cancelationMnpOrderResult: null,
  isCancelationMnpOrderLoading: false,
  cancelationMnpOrderError: '',
  isCancelationMnpOrderError: false,

  isOrderHistoryLoading: false,
  orderHistoryData: null,
  isOrderHistoryError: false,
  orderHistoryError: '',

  isCancellationsNumberLoading: false,
  cancellationsNumberData: null,
  isCancellationsNumberError: false,
  cancellationsNumberError: '',

  closedOrdersData: {
    closedOrders: null,
    isClosedOrdersLoading: false,
    isClosedOrdersError: false,
    closedOrdersError: ''
  },

  historyOrderIdsDataList: {},

  isMnpQuestionaryVisible: false
}

export default handleActions(
  {
    // Protocol
    [CHECK_MNP_HANDLING]: produce(state => {
      state.mnpHandlingData = null
      state.isCheckMNPHandlingLoading = true
    }),
    [CHECK_MNP_HANDLING_SUCCESS]: produce((state, { payload }) => {
      state.isCheckMNPHandlingLoading = false
      state.mnpHandlingData = payload
      state.isCheckMNPHandlingSuccess = true
    }),
    [combineActions(CHECK_MNP_HANDLING_ERROR, CHECK_MNP_HANDLING_FAILURE)]: produce((state, { payload }) => {
      state.isCheckMNPHandlingLoading = false
      state.isCheckMNPHandlingError = true
      state.сheckMNPHandlingError = payload
    }),
    [SET_MNP_INFO]: produce((state, { payload: { abonentData, markerData } }) => {
      state.isMnpLoading = false
      state.abonentData = abonentData
      state.markerData = markerData
    }),
    [TOGGLE_MNP_INFO_CARDS]: produce((state, { payload: isMnpOrderVisible }) => {
      state.isMnpOrderVisible = isMnpOrderVisible || !state.isMnpOrderVisible
    }),
    [TOGGLE_CHECK_MNP_PASSED]: produce((state, { payload: isCheckMnpPressed }) => {
      state.isCheckMnpPressed = isCheckMnpPressed || !state.isCheckMnpPressed
    }),
    // Order
    [GET_MNP_ORDER]: produce(state => {
      state.isMnpOrderLoading = true
    }),
    [GET_MNP_ORDER_SUCCESS]: produce((state, { payload }) => {
      state.isMnpOrderLoading = false
      state.mnpOrder = payload
    }),
    [combineActions(GET_MNP_ORDER_ERROR, GET_MNP_ORDER_FAILURE)]: produce((state, { payload }) => {
      state.isMnpOrderLoading = false
      state.isMnpOrderError = true
      state.mnpOrderError = payload
      state.mnpOrder = null
    }),
    [CANCEL_MNP_ORDER]: produce(state => {
      state.isCancelationMnpOrderLoading = true
    }),
    [CANCEL_MNP_ORDER_SUCCESS]: produce((state, { payload }) => {
      state.isCancelationMnpOrderLoading = false
      state.cancelationMnpOrderResult = payload
    }),
    [combineActions(CANCEL_MNP_ORDER_ERROR, CANCEL_MNP_ORDER_FAILURE)]: produce((state, { payload }) => {
      state.isCancelationMnpOrderLoading = false
      state.isCancelationMnpOrderError = true
      state.cancelationMnpOrderError = payload
      state.cancelationMnpOrderResult = null
    }),
    [GET_ORDER_HISTORY]: produce(state => {
      state.isOrderHistoryLoading = true
    }),
    [GET_ORDER_HISTORY_SUCCESS]: produce((state, { payload }) => {
      state.isOrderHistoryLoading = false
      state.orderHistoryData = payload
    }),
    [combineActions(GET_ORDER_HISTORY_ERROR, GET_ORDER_HISTORY_FAILURE)]: produce((state, { payload }) => {
      state.isOrderHistoryLoading = false
      state.isOrderHistoryError = true
      state.orderHistoryError = payload
    }),
    [GET_CANCELLATIONS_NUMBER]: produce(state => {
      state.isCancellationsNumberLoading = true
    }),
    [GET_CANCELLATIONS_NUMBER_SUCCESS]: produce((state, { payload }) => {
      state.isCancellationsNumberLoading = false
      state.cancellationsNumberData = payload
    }),
    [combineActions(GET_CANCELLATIONS_NUMBER_ERROR, GET_CANCELLATIONS_NUMBER_FAILURE)]: produce((state, { payload }) => {
      state.isCancellationsNumberLoading = false
      state.isCancellationsNumberError = true
      state.cancellationsNumberError = payload
    }),

    [GET_CLOSED_ORDERS]: produce(state => {
      state.closedOrdersData.isClosedOrdersLoading = true
    }),
    [GET_CLOSED_ORDERS_SUCCESS]: produce((state, { payload }) => {
      state.closedOrdersData.closedOrders = payload
      state.closedOrdersData.isClosedOrdersLoading = false
      state.closedOrdersData.isClosedOrdersError = false
    }),
    [combineActions(GET_CLOSED_ORDERS_ERROR, GET_CLOSED_ORDERS_FAILURE)]: produce((state, { payload }) => {
      state.closedOrdersData.isClosedOrdersLoading = false
      state.closedOrdersData.closedOrders = null
      state.closedOrdersData.isClosedOrdersError = true
      state.closedOrdersData.closedOrdersError = payload
    }),

    [GET_HISTORY_ORDER_ID_LIST]: produce((state, { payload }) => {
      payload.forEach(({ OrderId }) => { state.historyOrderIdsDataList[OrderId] = { isLoading: true, isError: false } })
    }),
    [GET_HISTORY_ORDER_ID_LIST_SUCCESS]: produce((state, { payload }) => {
      state.historyOrderIdsDataList[payload.OrderId].historyOrderIds = payload
      state.historyOrderIdsDataList[payload.OrderId].isLoading = false
    }),
    [combineActions(GET_HISTORY_ORDER_ID_LIST_ERROR, GET_HISTORY_ORDER_ID_LIST_FAILURE)]: produce((state, { payload: { orders, message } }) => {
      orders.forEach(({ OrderId }) => {
        state.historyOrderIdsDataList[OrderId] = { isLoading: false, isError: true, error: message
        }
      })
    }),

    [TOGGLE_MNP_QUESTIONARY]: produce((state, { payload: isMnpQuestionaryVisible }) => {
      state.isMnpQuestionaryVisible = isMnpQuestionaryVisible || !state.isMnpQuestionaryVisible
    })
  },
  initialState
)
