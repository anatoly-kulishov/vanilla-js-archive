import { createAction, handleActions } from 'redux-actions'

import {
  getSearchFormDataFromStorage,
  getSearchParamsFromStorage,
  getSessionParamsFromStorage,
  handleSearchParams,
  handleSessionParams
} from 'webseller/features/webSellerSearch/helpers'

export const CREATE_NEW_SESSION = 'customersCheck/CREATE_NEW_SESSION'
export const CREATE_NEW_SESSION_SUCCESS = 'customersCheck/CREATE_NEW_SESSION_SUCCESS'
export const CREATE_NEW_SESSION_ERROR = 'customersCheck/CREATE_NEW_SESSION_ERROR'
export const CREATE_NEW_SESSION_FAILURE = 'customersCheck/CREATE_NEW_SESSION_FAILURE'

export const createNewSession = createAction(CREATE_NEW_SESSION)
export const createNewSessionSuccess = createAction(CREATE_NEW_SESSION_SUCCESS)
export const createNewSessionError = createAction(CREATE_NEW_SESSION_ERROR)

export const DELETE_CURRENT_SESSION = 'customersCheck/DELETE_CURRENT_SESSION'

export const deleteCurrentSession = createAction(DELETE_CURRENT_SESSION)

const initialState = {
  searchFormData: getSearchFormDataFromStorage(),
  sessionParams: getSessionParamsFromStorage(),
  searchParams: getSearchParamsFromStorage(),
  isCreateNewSessionLoading: false,
  createNewSessionError: null
}

export default handleActions({
  [CREATE_NEW_SESSION]: (state) => ({
    ...state,
    searchFormData: null,
    sessionParams: null,
    searchParams: null,
    isCreateNewSessionLoading: true,
    createNewSessionError: null
  }),
  [CREATE_NEW_SESSION_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      searchFormData: payload?.formData,
      sessionParams: handleSessionParams(payload?.sessionParams),
      searchParams: handleSearchParams(payload?.searchParams),
      isCreateNewSessionLoading: false,
      createNewSessionError: null
    }
  },
  [CREATE_NEW_SESSION_ERROR]: (state, { payload }) => ({
    ...state,
    searchFormData: null,
    sessionParams: null,
    searchParams: null,
    isCreateNewSessionLoading: false,
    createNewSessionError: payload?.messageText
  }),
  [CREATE_NEW_SESSION_FAILURE]: (state) => ({
    ...state,
    searchFormData: null,
    sessionParams: null,
    searchParams: null,
    isCreateNewSessionLoading: false,
    createNewSessionError: 'При получении типа открываемой карточки произошла ошибка'
  }),

  [DELETE_CURRENT_SESSION]: () => ({
    searchFormData: null,
    sessionParams: null,
    searchParams: null,
    isCreateNewSessionLoading: false,
    createNewSessionError: null
  })
}, initialState)
