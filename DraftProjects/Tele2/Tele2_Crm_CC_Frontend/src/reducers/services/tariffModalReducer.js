import { combineActions, createAction, handleActions } from 'redux-actions'
import { OperationStatus } from 'webseller/helpers'

export const HANDLE_VISIBLE_MODAL = 'tariffModal/HANDLE_VISIBLE_MODAL'

export const OPEN_TARIFF_CONSTRUCTOR_MODAL = 'tariffModal/OPEN_TARIFF_CONSTRUCTOR_MODAL'

export const FETCH_TARIFF_INFO = 'tariffModal/FETCH_TARIFF_INFO'
export const FETCH_TARIFF_INFO_SUCCESS = 'tariffModal/FETCH_TARIFF_INFO_SUCCESS'
export const FETCH_TARIFF_INFO_ERROR = 'tariffModal/FETCH_TARIFF_INFO_ERROR'
export const FETCH_TARIFF_INFO_FAILURE = 'tariffModal/FETCH_TARIFF_INFO_FAILURE'

export const FETCH_AVAILABLE_TARIFFS = 'tariffModal/FETCH_AVAILABLE_TARIFFS'
export const FETCH_AVAILABLE_TARIFFS_SUCCESS = 'tariffModal/FETCH_AVAILABLE_TARIFFS_SUCCESS'
export const FETCH_AVAILABLE_TARIFFS_ERROR = 'tariffModal/FETCH_AVAILABLE_TARIFFS_ERROR'
export const FETCH_AVAILABLE_TARIFFS_FAILURE = 'tariffModal/FETCH_AVAILABLE_TARIFFS_FAILURE'

export const CHANGE_TARIFF = 'tariffModal/CHANGE_TARIFF'
export const CHANGE_TARIFF_SUCCESS = 'tariffModal/CHANGE_TARIFF_SUCCESS'
export const CHANGE_TARIFF_ERROR = 'tariffModal/CHANGE_TARIFF_ERROR'
export const CHANGE_TARIFF_FAILURE = 'tariffModal/CHANGE_TARIFF_FAILURE'

export const CHANGE_SERVICES = 'tariffModal/CHANGE_SERVICES'
export const CHANGE_SERVICES_SUCCESS = 'tariffModal/CHANGE_SERVICES_SUCCESS'
export const CHANGE_SERVICES_ERROR = 'tariffModal/CHANGE_SERVICES_ERROR'
export const CHANGE_SERVICES_FAILURE = 'tariffModal/CHANGE_SERVICES_FAILURE'

export const FETCH_AVAILABLE_TARIFF_DETAILS = 'tariffModal/FETCH_AVAILABLE_TARIFF_DETAILS'
export const FETCH_AVAILABLE_TARIFF_DETAILS_SUCCESS = 'tariffModal/FETCH_AVAILABLE_TARIFF_DETAILS_SUCCESS'
export const FETCH_AVAILABLE_TARIFF_DETAILS_ERROR = 'tariffModal/FETCH_AVAILABLE_TARIFF_DETAILS_ERROR'
export const FETCH_AVAILABLE_TARIFF_DETAILS_FAILURE = 'tariffModal/FETCH_AVAILABLE_TARIFF_DETAILS_FAILURE'

export const FETCH_ENABLED_TARIFF_DETAILS = 'tariffModal/FETCH_ENABLED_TARIFF_DETAILS'
export const FETCH_ENABLED_TARIFF_DETAILS_SUCCESS = 'tariffModal/FETCH_ENABLED_TARIFF_DETAILS_SUCCESS'
export const FETCH_ENABLED_TARIFF_DETAILS_ERROR = 'tariffModal/FETCH_ENABLED_TARIFF_DETAILS_ERROR'
export const FETCH_ENABLED_TARIFF_DETAILS_FAILURE = 'tariffModal/FETCH_ENABLED_TARIFF_DETAILS_FAILURE'

const initalState = {
  isVisible: false,

  initSelectedTariffId: 0,

  tariffInfo: null,
  tariffInfoError: false,
  tariffInfoLoading: false,

  availableTariffs: null,
  availableTariffsError: false,
  availableTariffsLoading: false,

  changeTariffStatus: OperationStatus.NONE,
  changeTariffError: false,
  changeTariffLoading: false,

  tariffSettings: null,
  tariffSettingsError: false,
  tariffSettingsLoading: false,

  changeServicesError: false,
  changeServicesLoading: false
}

export const handleVisibleModal = createAction(HANDLE_VISIBLE_MODAL)
export const openTariffConstructorModal = createAction(OPEN_TARIFF_CONSTRUCTOR_MODAL)
export const fetchTariffInfo = createAction(FETCH_TARIFF_INFO)
export const fetchAvailableTariffs = createAction(FETCH_AVAILABLE_TARIFFS)
export const changeTariff = createAction(CHANGE_TARIFF)
export const changeServices = createAction(CHANGE_SERVICES)
export const fetchAvailableTariffDetails = createAction(FETCH_AVAILABLE_TARIFF_DETAILS)
export const fetchEnabledTariffDetails = createAction(FETCH_ENABLED_TARIFF_DETAILS)

export default handleActions({
  [HANDLE_VISIBLE_MODAL]: (state) => ({
    ...state,
    isVisible: !state.isVisible
  }),

  [OPEN_TARIFF_CONSTRUCTOR_MODAL]: (state, { payload }) => ({
    ...state,
    isVisible: true,
    initSelectedTariffId: payload
  }),

  [FETCH_TARIFF_INFO]: (state) => ({
    ...state,
    tariffInfo: null,
    tariffInfoError: false,
    tariffInfoLoading: true
  }),

  [FETCH_TARIFF_INFO_SUCCESS]: (state, { payload }) => ({
    ...state,
    tariffInfo: payload,
    tariffInfoError: false,
    tariffInfoLoading: false
  }),

  [FETCH_TARIFF_INFO_ERROR]: (state) => ({
    ...state,
    tariffInfo: null,
    tariffInfoLoading: false
  }),

  [FETCH_TARIFF_INFO_FAILURE]: (state) => ({
    ...state,
    tariffInfo: null,
    tariffInfoError: true,
    tariffInfoLoading: false
  }),

  [FETCH_AVAILABLE_TARIFFS]: (state) => ({
    ...state,
    availableTariffs: null,
    availableTariffsError: false,
    availableTariffsLoading: true
  }),

  [FETCH_AVAILABLE_TARIFFS_SUCCESS]: (state, { payload }) => ({
    ...state,
    availableTariffs: { Tariffs: payload },
    availableTariffsError: false,
    availableTariffsLoading: false
  }),

  [FETCH_AVAILABLE_TARIFFS_ERROR]: (state) => ({
    ...state,
    availableTariffs: null,
    availableTariffsLoading: false
  }),

  [FETCH_AVAILABLE_TARIFFS_FAILURE]: (state, { message }) => ({
    ...state,
    availableTariffs: null,
    availableTariffsError: message,
    availableTariffsLoading: false
  }),

  [CHANGE_TARIFF]: (state) => ({
    ...state,
    changeTariffStatus: OperationStatus.NONE,
    changeTariffError: false,
    changeTariffLoading: true
  }),

  [CHANGE_TARIFF_SUCCESS]: (state) => ({
    ...state,
    isVisible: false,
    changeTariffStatus: OperationStatus.SUCCESSFUL,
    changeTariffError: false,
    changeTariffLoading: false
  }),

  [combineActions(CHANGE_TARIFF_ERROR, CHANGE_TARIFF_FAILURE)]:
  (state) => ({
    ...state,
    changeTariffStatus: OperationStatus.FAILURE,
    changeTariffError: true,
    changeTariffLoading: false
  }),

  [combineActions(FETCH_AVAILABLE_TARIFF_DETAILS, FETCH_ENABLED_TARIFF_DETAILS)]:
  (state) => ({
    ...state,
    tariffSettings: null,
    tariffSettingsError: false,
    tariffSettingsLoading: true
  }),

  [combineActions(FETCH_AVAILABLE_TARIFF_DETAILS_SUCCESS, FETCH_ENABLED_TARIFF_DETAILS_SUCCESS)]:
  (state, { payload }) => ({
    ...state,
    tariffSettings: payload,
    tariffSettingsError: false,
    tariffSettingsLoading: false
  }),

  [combineActions(FETCH_AVAILABLE_TARIFF_DETAILS_ERROR, FETCH_ENABLED_TARIFF_DETAILS_ERROR)]:
  (state) => ({
    ...state,
    tariffSettings: null,
    tariffSettingsLoading: false
  }),

  [combineActions(FETCH_AVAILABLE_TARIFF_DETAILS_FAILURE, FETCH_ENABLED_TARIFF_DETAILS_FAILURE)]:
  (state, { message }) => ({
    ...state,
    tariffSettings: null,
    tariffSettingsError: message,
    tariffSettingsLoading: false
  }),

  [CHANGE_SERVICES]: (state) => ({
    ...state,
    changeServicesError: false,
    changeServicesLoading: true
  }),

  [CHANGE_SERVICES_SUCCESS]: (state) => ({
    ...state,
    isVisible: false,
    changeServicesError: false,
    changeServicesLoading: false
  }),

  [combineActions(CHANGE_SERVICES_ERROR, CHANGE_SERVICES_FAILURE)]:
  (state) => ({
    ...state,
    changeServicesError: true,
    changeServicesLoading: false
  })
}, initalState)
