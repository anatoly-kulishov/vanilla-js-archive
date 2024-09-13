import { combineActions, createAction, handleActions } from 'redux-actions'
import produce from 'immer'

export const GET_PERSON_ID = 'person/GET_PERSON_ID'
export const GET_PERSON_ID_SUCCESS = 'person/GET_PERSON_ID_SUCCESS'
export const GET_PERSON_ID_ERROR = 'person/GET_PERSON_ID_ERROR'
export const GET_PERSON_ID_FAILURE = 'person/GET_PERSON_ID_FAILURE'

export const getPersonId = createAction(GET_PERSON_ID)

const initialState = {
  personId: null,
  isPersonIdLoading: false,
  isPersonIdError: false
}

export default handleActions({
  [GET_PERSON_ID]: produce((state) => {
    state.personId = null
    state.isPersonIdLoading = true
    state.isPersonIdError = false
  }),
  [GET_PERSON_ID_SUCCESS]: produce((state, { payload }) => {
    state.personId = payload
    state.isPersonIdLoading = false
  }),
  [combineActions(GET_PERSON_ID_ERROR, GET_PERSON_ID_FAILURE)]: produce(state => {
    state.isPersonIdLoading = false
    state.isPersonIdError = true
  })
}, initialState)
