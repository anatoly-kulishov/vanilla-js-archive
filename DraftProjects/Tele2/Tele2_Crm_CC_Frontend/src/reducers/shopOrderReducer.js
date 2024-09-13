import produce from 'immer'
import { combineActions, createAction, handleActions } from 'redux-actions'

export const GET_SHOP_REGIONS = 'shopOrder/GET_SHOP_REGIONS'
export const GET_SHOP_REGIONS_SUCCESS = 'shopOrder/GET_SHOP_REGIONS_SUCCESS'
export const GET_SHOP_REGIONS_ERROR = 'shopOrder/GET_SHOP_REGIONS_ERROR'
export const GET_SHOP_REGIONS_FAILURE = 'shopOrder/GET_SHOP_REGIONS_FAILURE'

export const CREATE_SHOP_ORDER = 'shopOrder/CREATE_SHOP_ORDER'
export const CREATE_SHOP_ORDER_SUCCESS = 'shopOrder/CREATE_SHOP_ORDER_SUCCESS'
export const CREATE_SHOP_ORDER_ERROR = 'shopOrder/CREATE_SHOP_ORDER_ERROR'
export const CREATE_SHOP_ORDER_FAILURE = 'shopOrder/CREATE_SHOP_ORDER_FAILURE'

export const GET_SHOP_ACTIONS = 'shopOrder/GET_SHOP_ACTIONS'
export const GET_SHOP_ACTIONS_SUCCESS = 'shopOrder/GET_SHOP_ACTIONS_SUCCESS'
export const GET_SHOP_ACTIONS_ERROR = 'shopOrder/GET_SHOP_ACTIONS_ERROR'
export const GET_SHOP_ACTIONS_FAILURE = 'shopOrder/GET_SHOP_ACTIONS_FAILURE'

export const CLEAR_SHOP_ORDER = 'shopOrder/CLEAR_SHOP_ORDER'

const initialState = {
  isRegionsLoading: false,
  isRegionsError: false,
  regions: [],

  isShopOrderLoading: false,
  isShopOrderError: false,
  shopOrder: null,

  isActionsLoading: false,
  actions: []
}

export const getShopOrderRegions = createAction(GET_SHOP_REGIONS)
export const createShopOrder = createAction(CREATE_SHOP_ORDER)
export const clearShopOrder = createAction(CLEAR_SHOP_ORDER)
export const getShopOrderActions = createAction(GET_SHOP_ACTIONS)

export default handleActions({
  [GET_SHOP_REGIONS]: produce((state) => {
    state.isRegionsLoading = true
  }),
  [GET_SHOP_REGIONS_SUCCESS]: produce((state, { payload }) => {
    state.isRegionsLoading = false
    state.regions = payload
  }),
  [combineActions(GET_SHOP_REGIONS_FAILURE, GET_SHOP_REGIONS_ERROR)]: produce((state) => {
    state.isRegionsLoading = false
    state.isRegionsError = true
  }),
  [CREATE_SHOP_ORDER]: produce((state) => {
    state.isShopOrderLoading = true
  }),
  [CREATE_SHOP_ORDER_SUCCESS]: produce((state, { payload }) => {
    state.isShopOrderLoading = false
    state.shopOrder = payload
  }),
  [combineActions(CREATE_SHOP_ORDER_FAILURE, CREATE_SHOP_ORDER_ERROR)]: produce((state) => {
    state.isShopOrderLoading = false
    state.isShopOrderError = true
  }),
  [CLEAR_SHOP_ORDER]: produce((state) => {
    state.shopOrder = null
  }),
  [GET_SHOP_ACTIONS]: produce((state) => {
    state.isActionsLoading = true
  }),
  [GET_SHOP_ACTIONS_SUCCESS]: produce((state, { payload }) => {
    state.actions = payload
  })
}, initialState)
