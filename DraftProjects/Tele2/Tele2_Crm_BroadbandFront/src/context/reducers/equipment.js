import { parseSpeedToState, recalculateFullPrice } from 'context/helpers/order'
import { OrderLoadingStatus } from '../../constants/form'
import {
  GET_UPSALE_EQUIPMENT_TYPE,
  GET_UPSALE_EQUIPMENT_TYPE_ERROR,
  GET_UPSALE_EQUIPMENT_TYPE_FAILURE,
  GET_UPSALE_EQUIPMENT_TYPE_SUCCESS,
  GET_UPSALE_SPEED_TO_TECHNOLOGY_ERROR,
  GET_UPSALE_SPEED_TO_TECHNOLOGY_FAILURE,
  GET_UPSALE_SPEED_TO_TECHNOLOGY_SUCCESS,
  GET_EQUIPMENT_TYPE,
  GET_EQUIPMENT_TYPE_ERROR,
  GET_EQUIPMENT_TYPE_FAILURE,
  GET_EQUIPMENT_TYPE_SUCCESS,
  GET_SPEED_TO_TECHNOLOGY_ERROR,
  GET_SPEED_TO_TECHNOLOGY_FAILURE,
  GET_SPEED_TO_TECHNOLOGY_SUCCESS
} from '../constants/actionTypes'
import { StateStatus } from 'context/constants/initialState'

function changeStatusOnSpeedTechLoad (state) {
  if (state.orderLoadingStatus !== OrderLoadingStatus.Finished) {
    state.orderLoadingStatus = OrderLoadingStatus.SpeedTechnologyReady
  }
}

function changeStatusOnEquipmentLoad (state) {
  if (state.orderLoadingStatus !== OrderLoadingStatus.Finished) {
    state.orderLoadingStatus = OrderLoadingStatus.EquipmentTypesReady
  }
}

export function getSpeedToTechnologyReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_SPEED_TO_TECHNOLOGY_SUCCESS:
      state.speedToTechnology = payload
      state.orderState = parseSpeedToState(state, payload)
      state.prices = recalculateFullPrice(state)
      changeStatusOnSpeedTechLoad(state)
      state.autoActions.afterSpeedToTechnology = StateStatus.NeedAction
      break
    case GET_SPEED_TO_TECHNOLOGY_ERROR:
    case GET_SPEED_TO_TECHNOLOGY_FAILURE:
      break
    default:
      break
  }
}

export function getUpSaleSpeedToTechnologyReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_UPSALE_SPEED_TO_TECHNOLOGY_SUCCESS:
      state.upSaleSpeedToTechnology = payload
      break
    case GET_UPSALE_SPEED_TO_TECHNOLOGY_ERROR:
    case GET_UPSALE_SPEED_TO_TECHNOLOGY_FAILURE:
      break
    default:
      break
  }
}

export function getEquipmentTypeReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_EQUIPMENT_TYPE:
      state.equipmentTypes = null
      break
    case GET_EQUIPMENT_TYPE_SUCCESS:
      state.equipmentTypes = payload
      state.prices = recalculateFullPrice(state)
      changeStatusOnEquipmentLoad(state)
      break
    case GET_EQUIPMENT_TYPE_ERROR:
    case GET_EQUIPMENT_TYPE_FAILURE:
      break
    default:
      break
  }
}

export function getUpSaleEquipmentTypeReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_UPSALE_EQUIPMENT_TYPE:
      state.upSaleEquipmentTypes = null
      break
    case GET_UPSALE_EQUIPMENT_TYPE_SUCCESS:
      state.upSaleEquipmentTypes = payload
      break
    case GET_UPSALE_EQUIPMENT_TYPE_ERROR:
    case GET_UPSALE_EQUIPMENT_TYPE_FAILURE:
      break
    default:
      break
  }
}
