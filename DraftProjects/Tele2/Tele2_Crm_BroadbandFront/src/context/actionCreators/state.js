import {
  CHANGE_AUTO_ACTIONS_STATE,
  CHANGE_CHECK_ADDRESS_STATUS,
  CHANGE_CONTEXT_STATE,
  CHANGE_MANUAL_UPSALE_MODAL_VISIBILITY,
  CHANGE_MAIN_FORM,
  CHANGE_NUMBER_MODAL_TYPE,
  CHANGE_NUMBER_MODAL_VISIBILITY,
  CHANGE_ORDER_LOADING_STATUS,
  CHANGE_PERSONAL_FORM,
  CHANGE_REASONS_FORM,
  CHANGE_RESCHEDULE_MODAL_VISIBILITY,
  CHANGE_TARIFF_MODAL_VISIBILITY,
  SET_CONSTRUCTOR_PRICE,
  CHANGE_AUTO_UPSALE_MODAL_VISIBILITY,
  CHANGE_CANCEL_AUTO_UPSALE_MODAL_VISIBILITY
} from '../constants/actionTypes'

export function changeMainFormAC (dispatch, payload) {
  dispatch({ type: CHANGE_MAIN_FORM, payload: payload })
}

export function changeReasonsStateAC (dispatch, payload) {
  dispatch({ type: CHANGE_REASONS_FORM, payload: payload })
}

export function changePersonalFormAC (dispatch, payload) {
  dispatch({ type: CHANGE_PERSONAL_FORM, payload: payload })
}

export function changeOrderLoadingStatusAC (dispatch, payload) {
  dispatch({ type: CHANGE_ORDER_LOADING_STATUS, payload: payload })
}

export function setConstructorPriceAC (dispatch, payload) {
  dispatch({ type: SET_CONSTRUCTOR_PRICE, payload: payload })
}

export function changeCheckAddressStatusAC (dispatch, payload) {
  dispatch({ type: CHANGE_CHECK_ADDRESS_STATUS, payload: payload })
}

export function changeContextStateAC (dispatch, payload) {
  dispatch({ type: CHANGE_CONTEXT_STATE, payload: payload })
}

export function changeAutoActionsStateAC (dispatch, payload) {
  dispatch({ type: CHANGE_AUTO_ACTIONS_STATE, payload: payload })
}

export function changeTariffModalVisibilityAC (dispatch, payload) {
  dispatch({ type: CHANGE_TARIFF_MODAL_VISIBILITY, payload: payload })
}

export function changeNumberModalVisibilityAC (dispatch, payload) {
  dispatch({ type: CHANGE_NUMBER_MODAL_VISIBILITY, payload: payload })
}

export function changeNumberModalTypeAC (dispatch, payload) {
  dispatch({ type: CHANGE_NUMBER_MODAL_TYPE, payload: payload })
}

export function changeManualUpSaleModalVisibilityAC (dispatch, payload) {
  dispatch({ type: CHANGE_MANUAL_UPSALE_MODAL_VISIBILITY, payload: payload })
}

export function changeAutoUpSaleModalVisibilityAC (dispatch, payload) {
  dispatch({ type: CHANGE_AUTO_UPSALE_MODAL_VISIBILITY, payload: payload })
}

export function changeCancelAutoUpSaleModalVisibilityAC (dispatch, payload) {
  dispatch({ type: CHANGE_CANCEL_AUTO_UPSALE_MODAL_VISIBILITY, payload: payload })
}

export function changeRescheduleModalVisibilityAC (dispatch, payload) {
  dispatch({ type: CHANGE_RESCHEDULE_MODAL_VISIBILITY, payload: payload })
}
