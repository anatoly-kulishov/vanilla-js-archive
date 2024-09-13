import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

const message = 'При получении доступных подписок произошла ошибка'
const clientProductOfferingProfileMessage = 'Информация по количеству замен сервиса отсутствует'

export const GET_CHARGE_SERVICE_LIST_FETCH = 'services/GET_CHARGE_SERVICE_LIST'
export const GET_CHARGE_SERVICE_LIST_FETCH_SUCCESS = 'services/GET_CHARGE_SERVICE_LIST_SUCCESS'
export const GET_CHARGE_SERVICE_LIST_FETCH_ERROR = 'services/GET_CHARGE_SERVICE_LIST_ERROR'
export const GET_CHARGE_SERVICE_LIST_FETCH_FAILURE = 'services/GET_CHARGE_SERVICE_LIST_FAILURE'

export const GET_AVAILABLE_SERVICES_FETCH = 'services/GET_AVAILABLE_SERVICES'
export const GET_AVAILABLE_SERVICES_FETCH_SUCCESS = 'services/GET_AVAILABLE_SERVICES_SUCCESS'
export const GET_AVAILABLE_SERVICES_FETCH_ERROR = 'services/GET_AVAILABLE_SERVICES_ERROR'
export const GET_AVAILABLE_SERVICES_FETCH_FAILURE = 'services/GET_AVAILABLE_SERVICES_FAILURE'

export const HANDLE_TOGGLE_SERVICES_PENDING_ORDERS = 'services/HANDLE_TOGGLE_SERVICES_PENDING_ORDERS'

export const FETCH_SERVICES_PENDING_ORDERS = 'services/FETCH_SERVICES_PENDING_ORDERS'
export const FETCH_SERVICES_PENDING_ORDERS_SUCCESS = 'services/FETCH_SERVICES_PENDING_ORDERS_SUCCESS'
export const FETCH_SERVICES_PENDING_ORDERS_ERROR = 'services/FETCH_SERVICES_PENDING_ORDERS_ERROR'
export const FETCH_SERVICES_PENDING_ORDERS_FAILURE = 'services/FETCH_SERVICES_PENDING_ORDERS_FAILURE'

export const DELETE_SERVICES_PENDING_ORDERS = 'services/DELETE_SERVICES_PENDING_ORDERS'
export const DELETE_SERVICES_PENDING_ORDERS_SUCCESS = 'services/DELETE_SERVICES_PENDING_ORDERS_SUCCESS'
export const DELETE_SERVICES_PENDING_ORDERS_ERROR = 'services/DELETE_SERVICES_PENDING_ORDERS_ERROR'
export const DELETE_SERVICES_PENDING_ORDERS_FAILURE = 'services/DELETE_SERVICES_PENDING_ORDERS_FAILURE'

export const CHANGE_SERVICE_STATUS_FETCH = 'services/CHANGE_SERVICE_STATUS_FETCH'
export const CHANGE_SERVICE_STATUS_FETCH_SUCCESS = 'services/CHANGE_SERVICE_STATUS_FETCH_SUCCESS'
export const CHANGE_SERVICE_STATUS_FETCH_ERROR = 'services/CHANGE_SERVICE_STATUS_FETCH_ERROR'
export const CHANGE_SERVICE_STATUS_FETCH_FAILURE = 'services/CHANGE_SERVICE_STATUS_FETCH_FAILURE'

export const GET_CONNECTED_SERVICES_FETCH = 'services/GET_CONNECTED_SERVICES_FETCH'
export const GET_CONNECTED_SERVICES_FETCH_SUCCESS = 'services/GET_CONNECTED_SERVICES_FETCH_SUCCESS'
export const GET_CONNECTED_SERVICES_FETCH_ERROR = 'services/GET_CONNECTED_SERVICES_FETCH_ERROR'
export const GET_CONNECTED_SERVICES_FETCH_FAILURE = 'services/GET_CONNECTED_SERVICES_FETCH_FAILURE'

export const RESEND_SERVICE_ORDER = 'services/RESEND_SERVICE_ORDER'
export const RESEND_SERVICE_ORDER_SUCCESS = 'services/RESEND_SERVICE_ORDER_SUCCESS'
export const RESEND_SERVICE_ORDER_ERROR = 'services/RESEND_SERVICE_ORDER_ERROR'
export const RESEND_SERVICE_ORDER_FAILURE = 'services/RESEND_SERVICE_ORDER_FAILURE'

export const OPEN_MULTISUBSCRIPTION_MODAL = 'services/OPEN_MULTISUBSCRIPTION_MODAL'
export const CLOSE_MULTISUBSCRIPTION_MODAL = 'services/CLOSE_MULTISUBSCRIPTION_MODAL'

export const FETCH_MULTISUBSCRIPTION_SERVICE = 'services/FETCH_MULTISUBSCRIPTION_SERVICE'
export const FETCH_MULTISUBSCRIPTION_SERVICE_SUCCESS = 'services/FETCH_MULTISUBSCRIPTION_SERVICE_SUCCESS '
export const FETCH_MULTISUBSCRIPTION_SERVICE_ERROR = 'services/FETCH_MULTISUBSCRIPTION_SERVICE_ERROR'
export const FETCH_MULTISUBSCRIPTION_SERVICE_FAILURE = 'services/FETCH_MULTISUBSCRIPTION_SERVICE_FAILURE'

export const FETCH_CLIENT_OFFERING_PROFILE = 'services/FETCH_CLIENT_OFFERING_PROFILE'
export const FETCH_CLIENT_OFFERING_PROFILE_SUCCESS = 'services/FETCH_CLIENT_OFFERING_PROFILE_SUCCESS'
export const FETCH_CLIENT_OFFERING_PROFILE_ERROR = 'services/FETCH_CLIENT_OFFERING_PROFILE_ERROR'
export const FETCH_CLIENT_OFFERING_PROFILE_FAILURE = 'services/FETCH_CLIENT_OFFERING_PROFILE_FAILURE'

export const CHANGE_MULTISUBSCRIPTION_SERVICE = 'services/CHANGE_MULTISUBSCRIPTION_SERVICE'
export const CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER = 'services/CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER'
export const CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_SUCCESS = 'services/CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_SUCCESS'
export const CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_ERROR = 'services/CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_ERROR'

export const getChargeServiceList = createAction(GET_CHARGE_SERVICE_LIST_FETCH)
export const getAvailableServices = createAction(GET_AVAILABLE_SERVICES_FETCH)
export const handleToggleServicesPendingOrders = createAction(HANDLE_TOGGLE_SERVICES_PENDING_ORDERS)
export const fetchServicesPendingOrders = createAction(FETCH_SERVICES_PENDING_ORDERS)
export const deleteServicesPendingOrders = createAction(DELETE_SERVICES_PENDING_ORDERS)
export const changeServiceStatus = createAction(CHANGE_SERVICE_STATUS_FETCH)
export const getConnectedServices = createAction(GET_CONNECTED_SERVICES_FETCH)
export const resendServiceOrder = createAction(RESEND_SERVICE_ORDER)
export const fetchMultisubscriptionService = createAction(FETCH_MULTISUBSCRIPTION_SERVICE)
export const openMultisubscriptionModal = createAction(OPEN_MULTISUBSCRIPTION_MODAL)
export const closeMultisubscriptionModal = createAction(CLOSE_MULTISUBSCRIPTION_MODAL)
export const fetchClientOfferingProfile = createAction(FETCH_CLIENT_OFFERING_PROFILE)
export const сhangeMultisubscriptionService = createAction(CHANGE_MULTISUBSCRIPTION_SERVICE)
export const changeMultisubscriptionServiceWebSeller = createAction(CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER)
export const changeMultisubscriptionServiceWebSellerSuccess = createAction(CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_SUCCESS)
export const changeMultisubscriptionServiceWebSellerError = createAction(CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_ERROR)

const initialState = {
  chargeServiceList: null,
  isChargeServiceListLoading: false,
  isChargeServiceListError: null,

  availableServices: null,
  isAvailableServicesLoading: false,
  availableServicesError: null,

  isVisibleServicesPendingOrders: false,
  servicesPendingOrders: null,
  servicesPendingOrdersLoading: false,
  servicesPendingOrdersError: false,
  deletePendingOrdersLoading: false,
  deletePendingOrdersError: false,

  changeServiceStatus: null,
  isChangeServiceStatusLoading: false,
  changeServiceStatusError: null,

  connectedServices: null,
  isConnectedServicesLoading: false,
  connectedServicesError: null,

  virtualNumbers: null,
  IsActiveVirtualNumber: false,

  isFetchResendingServiceError: false,
  fetchResendingServiceError: null,

  isMultisubscriptionModalOpen: false,
  shouldBeServiceLoaded: false,

  multisubscriptionService: [],
  isMultisubscriptionServiceLoading: false,
  multisubscriptionServiceErrorMessage: null,

  isClientProductOfferingProfileLoading: false,
  clientProductOfferingProfileMessage: null,
  clientProductOfferingProfileError: false,
  clientProductOfferingProfileCount: null,

  isChangeMultisubscriptionServiceLoading: false,
  isChangeMultisubscriptionServiceError: false,
  isChangeMultisubscriptionServiceSuccess: false
}

export default handleActions({
  [OPEN_MULTISUBSCRIPTION_MODAL]: (state, { payload = false }) => ({
    ...state,
    isMultisubscriptionModalOpen: true,
    shouldBeServiceLoaded: payload
  }),
  [CLOSE_MULTISUBSCRIPTION_MODAL]: (state) => ({
    ...state,
    isMultisubscriptionModalOpen: false,
    shouldBeServiceLoaded: false,
    clientProductOfferingProfileMessage: null
  }),
  [FETCH_CLIENT_OFFERING_PROFILE]: (state) => ({
    ...state,
    isClientProductOfferingProfileLoading: true
  }),
  [FETCH_CLIENT_OFFERING_PROFILE_SUCCESS]: (state, { payload: { Count, Message } }) => ({
    ...state,
    isClientProductOfferingProfileLoading: false,
    clientProductOfferingProfileCount: Count,
    clientProductOfferingProfileMessage: Message,
    clientProductOfferingProfileError: false
  }),
  [FETCH_CLIENT_OFFERING_PROFILE_ERROR]: (state) => ({
    ...state,
    isClientProductOfferingProfileLoading: false,
    clientProductOfferingProfileMessage,
    clientProductOfferingProfileError: true
  }),
  [FETCH_CLIENT_OFFERING_PROFILE_FAILURE]: (state) => ({
    ...state,
    clientProductOfferingProfileError: true,
    clientProductOfferingProfileMessage,
    isMultisubscriptionServiceLoading: false
  }),
  [FETCH_MULTISUBSCRIPTION_SERVICE]: (state) => ({
    ...state,
    isMultisubscriptionServiceLoading: true
  }),
  [FETCH_MULTISUBSCRIPTION_SERVICE_SUCCESS]: produce((state, { payload }) => {
    state.multisubscriptionService = payload
    state.isMultisubscriptionServiceLoading = false
    state.multisubscriptionServiceErrorMessage = null
  }),
  [FETCH_MULTISUBSCRIPTION_SERVICE_ERROR]: (state, { payload: { MessageText } }) => ({
    ...state,
    multisubscriptionService: [],
    multisubscriptionServiceErrorMessage: MessageText,
    isMultisubscriptionServiceLoading: false
  }),
  [FETCH_MULTISUBSCRIPTION_SERVICE_FAILURE]: (state, { payload }) => ({
    ...state,
    multisubscriptionService: [],
    multisubscriptionServiceErrorMessage: payload,
    isMultisubscriptionServiceLoading: false
  }),
  [GET_CHARGE_SERVICE_LIST_FETCH]: (state) => ({
    ...state,
    isChargeServiceListLoading: true
  }),
  [GET_CHARGE_SERVICE_LIST_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    chargeServiceList: payload,
    isChargeServiceListLoading: false,
    isChargeServiceListError: null
  }),
  [GET_CHARGE_SERVICE_LIST_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    chargeServiceList: null,
    isChargeServiceListLoading: false,
    isChargeServiceListError: MessageText
  }),
  [GET_CHARGE_SERVICE_LIST_FETCH_FAILURE]: (state) => ({
    ...state,
    chargeServiceList: null,
    isChargeServiceListLoading: false,
    isChargeServiceListError: message
  }),

  [GET_AVAILABLE_SERVICES_FETCH]: (state) => ({
    ...state,
    isAvailableServicesLoading: true
  }),
  [GET_AVAILABLE_SERVICES_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    availableServices: payload,
    isAvailableServicesLoading: false,
    availableServicesError: null
  }),
  [GET_AVAILABLE_SERVICES_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    availableServices: null,
    isAvailableServicesLoading: false,
    availableServicesError: MessageText
  }),
  [GET_AVAILABLE_SERVICES_FETCH_FAILURE]: (state) => ({
    ...state,
    availableServices: null,
    isAvailableServicesLoading: false,
    availableServicesError: message
  }),

  [HANDLE_TOGGLE_SERVICES_PENDING_ORDERS]: (state) => ({
    ...state,
    isVisibleServicesPendingOrders: !state.isVisibleServicesPendingOrders
  }),

  [FETCH_SERVICES_PENDING_ORDERS]: (state) => ({
    ...state,
    servicesPendingOrders: null,
    servicesPendingOrdersLoading: true,
    servicesPendingOrdersError: false
  }),

  [FETCH_SERVICES_PENDING_ORDERS_SUCCESS]: (state, { payload }) => ({
    ...state,
    servicesPendingOrders: payload,
    servicesPendingOrdersLoading: false,
    servicesPendingOrdersError: false
  }),

  [FETCH_SERVICES_PENDING_ORDERS_ERROR]: (state, { payload }) => ({
    ...state,
    servicesPendingOrdersLoading: false,
    servicesPendingOrdersError: payload
  }),

  [FETCH_SERVICES_PENDING_ORDERS_FAILURE]: (state) => ({
    ...state,
    servicesPendingOrdersLoading: false,
    servicesPendingOrdersError: true
  }),

  [DELETE_SERVICES_PENDING_ORDERS]: (state) => ({
    ...state,
    deletePendingOrdersLoading: true,
    deletePendingOrdersError: false
  }),

  [DELETE_SERVICES_PENDING_ORDERS_SUCCESS]: (state) => ({
    ...state,
    deletePendingOrdersLoading: false,
    deletePendingOrdersError: false
  }),

  [combineActions(DELETE_SERVICES_PENDING_ORDERS_ERROR, DELETE_SERVICES_PENDING_ORDERS_FAILURE)]:
    (state) => ({
      ...state,
      deletePendingOrdersLoading: false,
      deletePendingOrdersError: true
    }),

  [CHANGE_SERVICE_STATUS_FETCH]: (state) => ({
    ...state,
    isChangeServiceStatusLoading: true
  }),
  [CHANGE_SERVICE_STATUS_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    changeServiceStatus: Data,
    isChangeServiceStatusLoading: false,
    changeServiceStatusError: null
  }),
  [CHANGE_SERVICE_STATUS_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    changeServiceStatus: null,
    isChangeServiceStatusLoading: false,
    changeServiceStatusError: MessageText
  }),
  [CHANGE_SERVICE_STATUS_FETCH_FAILURE]: (state) => ({
    ...state,
    changeServiceStatus: null,
    isChangeServiceStatusLoading: false,
    changeServiceStatusError: 'При отключении услуги произошла ошибка'
  }),
  [GET_CONNECTED_SERVICES_FETCH]: produce((state, action) => {
    state.isConnectedServicesLoading = true
  }),

  [GET_CONNECTED_SERVICES_FETCH_SUCCESS]: produce((state, { payload: { Services, MultisubscriptionService, VirtualNumbers, IsActiveVirtualNumber } }) => {
    state.connectedServices = [...MultisubscriptionService, ...Services]
    state.virtualNumbers = VirtualNumbers
    state.IsActiveVirtualNumber = IsActiveVirtualNumber
    state.isConnectedServicesLoading = false
    state.connectedServicesError = null
  }),

  [GET_CONNECTED_SERVICES_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
    ...state,
    connectedServices: null,
    isConnectedServicesLoading: false,
    connectedServicesError: MessageText
  }),
  [GET_CONNECTED_SERVICES_FETCH_FAILURE]: (state) => ({
    ...state,
    connectedServices: null,
    isConnectedServicesLoading: false,
    connectedServicesError: message
  }),

  [CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER]: (state) => ({
    ...state,
    isChangeMultisubscriptionServiceError: false,
    isChangeMultisubscriptionServiceSuccess: false,
    isChangeMultisubscriptionServiceLoading: true
  }),
  [CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_SUCCESS]: (state) => ({
    ...state,
    isChangeMultisubscriptionServiceSuccess: true,
    isChangeMultisubscriptionServiceLoading: false
  }),
  [CHANGE_MULTISUBSCRIPTION_SERVICE_WEBSELLER_ERROR]: (state) => ({
    ...state,
    isChangeMultisubscriptionServiceSuccess: false,
    isChangeMultisubscriptionServiceLoading: false,
    isChangeMultisubscriptionServiceError: true
  }),

  // resending service
  [RESEND_SERVICE_ORDER_SUCCESS]: state => ({
    ...state,
    isFetchResendingServiceError: false
  }),

  [combineActions(RESEND_SERVICE_ORDER_ERROR, RESEND_SERVICE_ORDER_FAILURE)]:
    (state) => ({
      ...state,
      isFetchResendingServiceError: true,
      fetchResendingServiceError: message
    })
}, initialState)
