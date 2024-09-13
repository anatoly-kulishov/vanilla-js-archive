import { createAction, handleActions, combineActions } from 'redux-actions'
import { isWebSellerApp } from 'webseller/helpers'
import { storeWebsellerUserName } from 'webseller/helpers/api/sessionAccessKey'

export const CHANGE_AUTH_MODE = 'user/CHANGE_AUTH_MODE'

export const UPDATE_USER_DATA = 'user/UPDATE_USER_DATA'

export const TOKEN_FETCH = 'user/TOKEN_FETCH'
export const TOKEN_REFRESH = 'user/TOKEN_REFRESH'
export const TOKEN_GET_FROM_LS_SUCCESS = 'user/TOKEN_FETCH_SUCCESS'
export const TOKEN_FETCH_SUCCESS = 'user/TOKEN_FETCH_SUCCESS'
export const TOKEN_FETCH_ERROR = 'user/TOKEN_FETCH_ERROR'
export const TOKEN_FETCH_FAILURE = 'user/TOKEN_FETCH_FAILURE'

const initalState = {
  // TODO for demo
  isOidcAuth: true,

  user: null,
  userError: false,
  isUserLoading: false,

  isTokenOk: false,
  tokenError: false,
  isTokenLoading: false
}

export const changeAuthMode = createAction(CHANGE_AUTH_MODE)

export const updateUserData = createAction(UPDATE_USER_DATA)

export const fetchToken = createAction(TOKEN_FETCH)
export const refreshToken = createAction(TOKEN_REFRESH)
export const fetchTokenSuccess = createAction(TOKEN_FETCH_SUCCESS)

export default handleActions(
  {
    [CHANGE_AUTH_MODE]: (state, { payload: { isOidcAuth } }) => {
      return {
        ...state,
        isOidcAuth
      }
    },

    [UPDATE_USER_DATA]: (state, { payload }) => {
      const { contactCenter, isBirthday, email, role, OfficesIDs, name, userId, userName } = payload
      const DisplayName = payload.displayName || payload.display_name
      // const roles = crmRoles || role
      // TODO for demo return crmRoles in payload
      const roles = role

      if (isWebSellerApp()) {
        const websellerUserName =
          payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
          name ||
          userName

        storeWebsellerUserName(websellerUserName)
      }

      return {
        ...state,
        user: {
          Permissions: roles,
          Name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          DisplayName,
          isBirthday,
          contactCentreName: contactCenter,
          email,
          login: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          isASSeller: roles.includes('AS:Seller'),
          officeId: OfficesIDs,
          msisdn: name,
          userId: userId
        },
        userError: false,
        isUserLoading: false
      }
    },

    [TOKEN_FETCH]: state => ({
      ...state,
      isTokenOk: false,
      tokenError: false,
      isTokenLoading: true
    }),
    [combineActions(TOKEN_GET_FROM_LS_SUCCESS, TOKEN_FETCH_SUCCESS)]: (state, { payload: { isTokenOk } }) => ({
      ...state,
      isTokenOk: isTokenOk,
      tokenError: false,
      isTokenLoading: false
    }),
    [combineActions(TOKEN_FETCH_ERROR, TOKEN_FETCH_FAILURE)]: state => ({
      ...state,
      isTokenOk: false,
      tokenError: true,
      isTokenLoading: false
    })
  },
  initalState
)
