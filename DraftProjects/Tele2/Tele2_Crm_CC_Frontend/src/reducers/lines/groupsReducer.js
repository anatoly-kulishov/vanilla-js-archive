import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_GROUP_LIST = 'lines/FETCH_GROUP_LIST'
export const FETCH_GROUP_LIST_SUCCESS = 'lines/FETCH_GROUP_LIST_SUCCESS'
export const FETCH_GROUP_LIST_ERROR = 'lines/FETCH_GROUP_LIST_ERROR'
export const FETCH_GROUP_LIST_FAILURE = 'lines/FETCH_GROUP_LIST_FAILURE'

export const VALIDATE_AUTOPAY_SERVICE = 'lines/VALIDATE_AUTOPAY_SERVICE'
export const VALIDATE_AUTOPAY_SERVICE_SUCCESS = 'lines/VALIDATE_AUTOPAY_SERVICE_SUCCESS'
export const VALIDATE_AUTOPAY_SERVICE_ERROR = 'lines/VALIDATE_AUTOPAY_SERVICE_ERROR'
export const VALIDATE_AUTOPAY_SERVICE_FAILURE = 'lines/VALIDATE_AUTOPAY_SERVICE_FAILURE'

export const FETCH_DELETE_GROUP = 'lines/FETCH_DELETE_GROUP'
export const FETCH_DELETE_GROUP_SUCCESS = 'lines/FETCH_DELETE_GROUP_SUCCESS'
export const FETCH_DELETE_GROUP_ERROR = 'lines/FETCH_DELETE_GROUP_ERROR'
export const FETCH_DELETE_GROUP_FAILURE = 'lines/FETCH_DELETE_GROUP_FAILURE'

const initialState = {
  groupList: null,
  isGroupListLoading: false,
  groupListError: '',

  isValidateAutopayServiceLoading: false,
  validateAutopayServiceError: '',

  deleteGroup: null,
  isDeleteGroupLoading: false,
  isDeleteGroupSuccess: false,
  deleteGroupMessage: ''
}

export const fetchGroupList = createAction(FETCH_GROUP_LIST)
export const validateAutopayService = createAction(VALIDATE_AUTOPAY_SERVICE)
export const deleteGroup = createAction(FETCH_DELETE_GROUP)

export default handleActions({
  [FETCH_GROUP_LIST]: produce((state, action) => {
    state.isGroupListLoading = true
    state.groupListError = ''
  }),
  [FETCH_GROUP_LIST_SUCCESS]: produce((state, { payload: { GroupList, groupInfo } }) => {
    state.groupList = GroupList
    state.groupInfo = groupInfo
    state.isGroupListLoading = false
    state.groupListError = ''
  }),
  [combineActions(FETCH_GROUP_LIST_ERROR, FETCH_GROUP_LIST_FAILURE)]:
    produce((state, { payload }) => {
      state.isGroupListLoading = payload
      state.groupListError = false
    }),

  [VALIDATE_AUTOPAY_SERVICE]: produce((state, action) => {
    state.isValidateAutopayServiceLoading = true
    state.validateAutopayServiceError = ''
  }),
  [VALIDATE_AUTOPAY_SERVICE_SUCCESS]: produce((state) => {
    state.isValidateAutopayServiceLoading = false
    state.validateAutopayServiceError = ''
  }),
  [combineActions(VALIDATE_AUTOPAY_SERVICE_ERROR, VALIDATE_AUTOPAY_SERVICE_FAILURE)]:
    produce((state, { payload }) => {
      state.isValidateAutopayServiceLoading = false
      state.validateAutopayServiceError = payload
    }),

  // Delete from group
  [FETCH_DELETE_GROUP]: (state) => ({
    ...state,
    deleteGroup: null,
    isDeleteGroupLoading: true,
    isDeleteGroupSuccess: false,
    deleteGroupMessage: ''
  }),
  [combineActions(FETCH_DELETE_GROUP_SUCCESS, FETCH_DELETE_GROUP_ERROR)]:
  (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    deleteGroup: Data,
    isDeleteGroupLoading: false,
    isDeleteGroupSuccess: IsSuccess,
    deleteGroupMessage: MessageText
  }),
  [FETCH_DELETE_GROUP_FAILURE]: state => ({
    ...state,
    deleteGroup: null,
    isDeleteGroupLoading: false,
    isDeleteGroupSuccess: false,
    deleteGroupMessage: 'При получении групп абонента произошла ошибка'
  })
}, initialState)
