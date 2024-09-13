import { createAction, handleActions, combineActions } from 'redux-actions'

export const FETCH_DESTINATION_GROUPS_TREE_SUCCESS = 'escalation/settings/FETCH_DESTINATION_GROUPS_TREE_SUCCESS'
export const FETCH_DESTINATION_GROUPS_TREE_ERROR = 'escalation/settings/FETCH_DESTINATION_GROUPS_TREE_ERROR'
export const FETCH_DESTINATION_GROUPS_TREE_FAILURE = 'escalation/settings/FETCH_DESTINATION_GROUPS_TREE_FAILURE'
export const FETCH_DESTINATION_GROUPS_TREE = 'escalation/settings/FETCH_DESTINATION_GROUPS_TREE'

export const LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS = 'escalation/settings/LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS'
export const LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR = 'escalation/settings/LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR'
export const LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE = 'escalation/settings/LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE'
export const LINK_DESTINATION_GROUP_TO_REASON_CATEGORY = 'escalation/settings/LINK_DESTINATION_GROUP_TO_REASON_CATEGORY'

export const UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS = 'escalation/settings/UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS'
export const UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR = 'escalation/settings/UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR'
export const UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE = 'escalation/settings/UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE'
export const UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY = 'escalation/settings/UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY'

export const FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_SUCCESS = 'escalation/settings/FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_SUCCESS'
export const FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_ERROR = 'escalation/settings/FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_ERROR'
export const FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_FAILURE = 'escalation/settings/FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_FAILURE'
export const FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY = 'escalation/settings/FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY'

export const FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_SUCCESS = 'escalation/settings/FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_SUCCESS'
export const FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_ERROR = 'escalation/settings/FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_ERROR'
export const FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_FAILURE = 'escalation/settings/FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_FAILURE'
export const FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY = 'escalation/settings/FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY'

export const FETCH_BPM_ONLINE_SERVICES_SUCCESS = 'escalation/settings/FETCH_BPM_ONLINE_SERVICES_SUCCESS'
export const FETCH_BPM_ONLINE_SERVICES_ERROR = 'escalation/settings/FETCH_BPM_ONLINE_SERVICES_ERROR'
export const FETCH_BPM_ONLINE_SERVICES_FAILURE = 'escalation/settings/FETCH_BPM_ONLINE_SERVICES_FAILURE'
export const FETCH_BPM_ONLINE_SERVICES = 'escalation/settings/FETCH_BPM_ONLINE_SERVICES'

export const FETCH_SMS_TEMPLATES_SUCCESS = 'escalation/settings/FETCH_SMS_TEMPLATES_SUCCESS'
export const FETCH_SMS_TEMPLATES_ERROR = 'escalation/settings/FETCH_SMS_TEMPLATES_ERROR'
export const FETCH_SMS_TEMPLATES_FAILURE = 'escalation/settings/FETCH_SMS_TEMPLATES_FAILURE'
export const FETCH_SMS_TEMPLATES = 'escalation/settings/FETCH_SMS_TEMPLATES'

export const MODIFY_ESCALATION_PARAMS_SUCCESS = 'escalation/settings/MODIFY_ESCALATION_PARAMS_SUCCESS'
export const MODIFY_ESCALATION_PARAMS_ERROR = 'escalation/settings/MODIFY_ESCALATION_PARAMS_ERROR'
export const MODIFY_ESCALATION_PARAMS_FAILURE = 'escalation/settings/MODIFY_ESCALATION_PARAMS_FAILURE'
export const MODIFY_ESCALATION_PARAMS = 'escalation/settings/MODIFY_ESCALATION_PARAMS'

export const CREATE_ESCALATION_PARAMS_SUCCESS = 'escalation/settings/CREATE_ESCALATION_PARAMS_SUCCESS'
export const CREATE_ESCALATION_PARAMS_ERROR = 'escalation/settings/CREATE_ESCALATION_PARAMS_ERROR'
export const CREATE_ESCALATION_PARAMS_FAILURE = 'escalation/settings/CREATE_ESCALATION_PARAMS_FAILURE'
export const CREATE_ESCALATION_PARAMS = 'escalation/settings/CREATE_ESCALATION_PARAMS'

export const DELETE_ESCALATION_PARAMS_SUCCESS = 'escalation/settings/DELETE_ESCALATION_PARAMS_SUCCESS'
export const DELETE_ESCALATION_PARAMS_ERROR = 'escalation/settings/DELETE_ESCALATION_PARAMS_ERROR'
export const DELETE_ESCALATION_PARAMS_FAILURE = 'escalation/settings/DELETE_ESCALATION_PARAMS_FAILURE'
export const DELETE_ESCALATION_PARAMS = 'escalation/settings/DELETE_ESCALATION_PARAMS'

export const TOGGLE_ESCALATION_SETTINGS_MODAL = 'escalation/settings/TOGGLE_ESCALATION_SETTINGS_MODAL'

const initialState = {
  isToggled: false,
  reason: null,
  category: null,
  isDestinationGroupsLoading: false,
  isDestinationGroupLink: false,
  isDestinationGroupUnlink: false,
  isLinkedDestinationGroupsLoading: false,
  isBpmOnlineServicesLoading: false,
  destinationGroups: null,
  linkedDestinationGroups: null,
  escalationParams: null,
  isEscalationParamsLoading: false,
  isEscalationParamsError: false,
  isDeleteEscalationLoading: false,
  bpmOnlineServices: null,
  isBpmOnlineServiceLoading: false,
  smsGeneralTemplate: null
}

export const fetchDestinationGroupsTree = createAction(FETCH_DESTINATION_GROUPS_TREE)
export const fetchBpmOnlineServices = createAction(FETCH_BPM_ONLINE_SERVICES)
export const fetchSmsTemplates = createAction(FETCH_SMS_TEMPLATES)
export const fetchDestinationGroupsTreeByReasonCategory = createAction(FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY)
export const fetchEscalationParamsByReasonCategory = createAction(FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY)
export const toggleEscalationSettingsModal = createAction(TOGGLE_ESCALATION_SETTINGS_MODAL)
export const linkDestinationGroupToReasonCategory = createAction(LINK_DESTINATION_GROUP_TO_REASON_CATEGORY)
export const unlinkDestinationGroupToReasonCategory = createAction(UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY)
export const modifyEscalationsParams = createAction(MODIFY_ESCALATION_PARAMS)
export const createEscalationsParams = createAction(CREATE_ESCALATION_PARAMS)
export const deleteEscalationsParams = createAction(DELETE_ESCALATION_PARAMS)

export default handleActions({
  [TOGGLE_ESCALATION_SETTINGS_MODAL]: (state, { payload: { reason, category } }) => {
    if (state.isToggled) {
      return {
        ...state,
        isToggled: !state.isToggled,
        reason: null,
        category: null,
        destinationGroups: null,
        linkedDestinationGroups: null,
        escalationParams: null,
        bpmOnlineServices: null,
        smsGeneralTemplate: null
      }
    } else {
      return {
        ...state,
        isToggled: !state.isToggled,
        reason,
        category
      }
    }
  },

  [FETCH_DESTINATION_GROUPS_TREE]: (state) => ({
    ...state,
    destinationGroups: null,
    isDestinationGroupsLoading: true
  }),

  [FETCH_DESTINATION_GROUPS_TREE_SUCCESS]: (state, { payload: { destinationGroups } }) => ({
    ...state,
    destinationGroups,
    isDestinationGroupsLoading: false
  }),

  [FETCH_DESTINATION_GROUPS_TREE_ERROR]: (state) => ({
    ...state,
    isDestinationGroupsLoading: false
  }),

  [FETCH_DESTINATION_GROUPS_TREE_FAILURE]: (state) => ({
    ...state,
    isDestinationGroupsLoading: false
  }),

  [FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY]: (state) => ({
    ...state,
    linkedDestinationGroups: null,
    isLinkedDestinationGroupsLoading: true
  }),

  [FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_SUCCESS]: (state, { payload: { linkedDestinationGroups } }) => ({
    ...state,
    linkedDestinationGroups,
    isLinkedDestinationGroupsLoading: false
  }),

  [FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_ERROR]: (state) => ({
    ...state,
    isLinkedDestinationGroupsLoading: false
  }),

  [FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_FAILURE]: (state) => ({
    ...state,
    isLinkedDestinationGroupsLoading: false
  }),

  [FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY]: (state) => ({
    ...state,
    escalationParams: null,
    isEscalationParamsLoading: true,
    isEscalationParamsError: false
  }),

  [FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_SUCCESS]: (state, { payload: { escalationParams } }) => ({
    ...state,
    escalationParams,
    isEscalationParamsLoading: false,
    isEscalationParamsError: false
  }),

  [combineActions(FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_ERROR, FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_FAILURE)]: (state) => ({
    ...state,
    isEscalationParamsLoading: false,
    isEscalationParamsError: true
  }),

  [LINK_DESTINATION_GROUP_TO_REASON_CATEGORY]: (state) => ({
    ...state,
    isDestinationGroupLink: true
  }),

  [LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS]: (state) => ({
    ...state,
    isDestinationGroupLink: false
  }),

  [LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR]: (state) => ({
    ...state,
    isDestinationGroupLink: false
  }),

  [LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE]: (state) => ({
    ...state,
    isDestinationGroupLink: false
  }),

  [UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY]: (state) => ({
    ...state,
    isDestinationGroupUnlink: true
  }),

  [UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS]: (state) => ({
    ...state,
    isDestinationGroupUnlink: false
  }),

  [UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR]: (state) => ({
    ...state,
    isDestinationGroupUnlink: false
  }),

  [UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE]: (state) => ({
    ...state,
    isDestinationGroupUnlink: false
  }),

  [FETCH_BPM_ONLINE_SERVICES]: (state) => ({
    ...state,
    isBpmOnlineServicesLoading: true
  }),

  [FETCH_BPM_ONLINE_SERVICES_SUCCESS]: (state, { payload: { bpmOnlineServices } }) => ({
    ...state,
    bpmOnlineServices,
    isBpmOnlineServicesLoading: false
  }),

  [FETCH_BPM_ONLINE_SERVICES_ERROR]: (state) => ({
    ...state,
    isBpmOnlineServicesLoading: false
  }),

  [FETCH_BPM_ONLINE_SERVICES_FAILURE]: (state) => ({
    ...state,
    isBpmOnlineServicesLoading: false
  }),

  [FETCH_SMS_TEMPLATES]: (state) => ({
    ...state,
    isSmsTemplatesLoading: true
  }),

  [FETCH_SMS_TEMPLATES_SUCCESS]: (state, { payload: { smsTemplates } }) => ({
    ...state,
    smsTemplates,
    isSmsTemplatesLoading: false
  }),

  [FETCH_SMS_TEMPLATES_ERROR]: (state) => ({
    ...state,
    isSmsTemplatesLoading: false
  }),

  [FETCH_SMS_TEMPLATES_FAILURE]: (state) => ({
    ...state,
    isSmsTemplatesLoading: false
  }),

  [MODIFY_ESCALATION_PARAMS]: (state) => ({
    ...state,
    isModifyEscalationLoading: true
  }),

  [MODIFY_ESCALATION_PARAMS_SUCCESS]: (state) => ({
    ...state,
    isModifyEscalationLoading: false
  }),

  [MODIFY_ESCALATION_PARAMS_ERROR]: (state) => ({
    ...state,
    isModifyEscalationLoading: false
  }),

  [MODIFY_ESCALATION_PARAMS_FAILURE]: (state) => ({
    ...state,
    isModifyEscalationLoading: false
  }),

  [CREATE_ESCALATION_PARAMS]: (state) => ({
    ...state,
    isCreateEscalationLoading: true
  }),

  [CREATE_ESCALATION_PARAMS_SUCCESS]: (state) => ({
    ...state,
    isCreateEscalationLoading: false
  }),

  [CREATE_ESCALATION_PARAMS_ERROR]: (state) => ({
    ...state,
    isCreateEscalationLoading: false
  }),

  [CREATE_ESCALATION_PARAMS_FAILURE]: (state) => ({
    ...state,
    isCreateEscalationLoading: false
  }),

  [DELETE_ESCALATION_PARAMS]: (state) => ({
    ...state,
    isDeleteEscalationLoading: true
  }),

  [DELETE_ESCALATION_PARAMS_SUCCESS]: (state) => ({
    ...state,
    isDeleteEscalationLoading: false
  }),

  [DELETE_ESCALATION_PARAMS_ERROR]: (state) => ({
    ...state,
    isDeleteEscalationLoading: false
  }),

  [DELETE_ESCALATION_PARAMS_FAILURE]: (state) => ({
    ...state,
    isDeleteEscalationLoading: false
  })

}, initialState)
