import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  FETCH_DESTINATION_GROUPS_TREE_SUCCESS,
  FETCH_DESTINATION_GROUPS_TREE_ERROR,
  FETCH_DESTINATION_GROUPS_TREE_FAILURE,
  LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS,
  LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR,
  LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE,
  UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS,
  UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR,
  UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE,
  FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_SUCCESS,
  FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_ERROR,
  FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_FAILURE,
  FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_SUCCESS,
  FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_ERROR,
  FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_FAILURE,
  FETCH_BPM_ONLINE_SERVICES_SUCCESS,
  FETCH_BPM_ONLINE_SERVICES_ERROR,
  FETCH_BPM_ONLINE_SERVICES_FAILURE,
  FETCH_SMS_TEMPLATES_SUCCESS,
  FETCH_SMS_TEMPLATES_ERROR,
  FETCH_SMS_TEMPLATES_FAILURE,
  MODIFY_ESCALATION_PARAMS_SUCCESS,
  MODIFY_ESCALATION_PARAMS_ERROR,
  MODIFY_ESCALATION_PARAMS_FAILURE,
  CREATE_ESCALATION_PARAMS_SUCCESS,
  CREATE_ESCALATION_PARAMS_ERROR,
  CREATE_ESCALATION_PARAMS_FAILURE,
  DELETE_ESCALATION_PARAMS_SUCCESS,
  DELETE_ESCALATION_PARAMS_ERROR,
  DELETE_ESCALATION_PARAMS_FAILURE
} from 'reducers/escalationSettingsModalReducer'

const {
  linkDestinationGroupToReasonCategory,
  unlinkDestinationGroupToReasonCategory,
  fetchDestinationGroupsTreeByReasonCategory,
  fetchDestinationGroupsTree,

  fetchEscalationParamsByReasonCategory,
  fetchBpmOnlineServices,
  fetchSmsServiceTemplates,
  modifyEscalationParams,
  createEscalationParams,
  deleteEscalationParams
} = api

export function * fetchDestinationGroupsTreeSaga () {
  try {
    const { data } = yield call(fetchDestinationGroupsTree)

    if (data.IsSuccess) {
      const { Data: destinationGroups } = data

      yield put({
        type: FETCH_DESTINATION_GROUPS_TREE_SUCCESS,
        payload: {
          destinationGroups
        }
      })
    } else {
      yield put({ type: FETCH_DESTINATION_GROUPS_TREE_ERROR })

      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_DESTINATION_GROUPS_TREE_FAILURE })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * fetchDestinationGroupsTreeByReasonCategorySaga ({ payload: { reasonId, categoryId } }) {
  try {
    const { data } = yield call(fetchDestinationGroupsTreeByReasonCategory, reasonId, categoryId)

    if (data.IsSuccess) {
      const { Data: destinationGroups } = data

      yield put({
        type: FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_SUCCESS,
        payload: {
          linkedDestinationGroups: destinationGroups
        }
      })
    } else {
      yield put({ type: FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_ERROR })

      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_DESTINATION_GROUPS_BY_REASON_CATEGORY_FAILURE })

    notification.error({
      message: `Ошибка `,
      description: exception.message
    })
  }
}

export function * fetchEscalationParamsByReasonCategorySaga ({ payload: { reasonId, categoryId } }) {
  try {
    const { data } = yield call(fetchEscalationParamsByReasonCategory, reasonId, categoryId)

    if (data.IsSuccess) {
      const { Data: escalationParams } = data

      yield put({ type: FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_SUCCESS, payload: { escalationParams } })
    } else {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })

      yield put({ type: FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_ERROR })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: FETCH_ESCALATION_PARAMS_BY_REASON_CATEGORY_FAILURE })
  }
}

export function * linkDestinationGroupToReasonCategorySaga ({ payload: { reasonId, categoryId, adminUnit } }) {
  try {
    const { data } = yield call(linkDestinationGroupToReasonCategory, reasonId, categoryId, adminUnit)

    if (data.IsSuccess) {
      yield put({ type: LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS })
      notification.success({
        message: 'Успешно',
        description: 'Группа назначения привязана'
      })
    } else {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })

      yield put({ type: LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: LINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE })
  }
}

export function * unlinkDestinationGroupToReasonCategorySaga ({ payload: { reasonId, categoryId, adminUnit } }) {
  try {
    const { data } = yield call(unlinkDestinationGroupToReasonCategory, reasonId, categoryId, adminUnit)

    if (data.IsSuccess) {
      yield put({ type: UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_SUCCESS })
      notification.success({
        message: 'Успешно',
        description: 'Группа назначения отвязана'
      })
    } else {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })

      yield put({ type: UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_ERROR })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: UNLINK_DESTINATION_GROUP_TO_REASON_CATEGORY_FAILURE })
  }
}

export function * fetchBpmOnlineServicesSaga () {
  try {
    const { data } = yield call(fetchBpmOnlineServices)

    if (data.IsSuccess) {
      const { Data: { Services: bpmOnlineServices } } = data

      yield put({ type: FETCH_BPM_ONLINE_SERVICES_SUCCESS, payload: { bpmOnlineServices } })
    } else {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })

      yield put({ type: FETCH_BPM_ONLINE_SERVICES_ERROR })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: FETCH_BPM_ONLINE_SERVICES_FAILURE })
  }
}

export function * fetchSmsTemplatesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchSmsServiceTemplates, payload)

    if (data.IsSuccess) {
      const { Data: smsTemplatesGroups } = data
      let smsTemplates = []

      smsTemplatesGroups.map(group => {
        smsTemplates = [...smsTemplates, ...group.Templates]
        return group
      })

      yield put({ type: FETCH_SMS_TEMPLATES_SUCCESS, payload: { smsTemplates } })
    } else {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })

      yield put({ type: FETCH_SMS_TEMPLATES_ERROR })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: FETCH_SMS_TEMPLATES_FAILURE })
  }
}

export function * modifyEscalationParamsSaga ({ payload }) {
  const isB2bService = payload.B2bServiceId && payload.B2bServiceId !== ''
  const isGeneralService = payload.GeneralServiceId && payload.GeneralServiceId !== ''
  const { callback, ...otherPayload } = payload

  try {
    if (isB2bService || isGeneralService) {
      const { data } = yield call(modifyEscalationParams, otherPayload)

      if (data.IsSuccess) {
        yield put({ type: MODIFY_ESCALATION_PARAMS_SUCCESS })
        notification.success({
          message: 'Успешно',
          description: 'Настройка эскалации изменена'
        })
        callback()
      } else {
        notification.error({
          message: `Ошибка `,
          description: data.MessageText
        })

        yield put({ type: MODIFY_ESCALATION_PARAMS_ERROR })
      }
    } else {
      notification.error({
        message: 'Выберите хотя бы один сервис',
        description: ''
      })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: MODIFY_ESCALATION_PARAMS_FAILURE })
  }
}

export function * createEscalationParamsSaga ({ payload }) {
  const isB2bService = payload.B2bServiceId && payload.B2bServiceId !== ''
  const isGeneralService = payload.GeneralServiceId && payload.GeneralServiceId !== ''
  const { callback, ...otherPayload } = payload

  try {
    if (isB2bService || isGeneralService) {
      const { data } = yield call(createEscalationParams, otherPayload)

      if (data.IsSuccess) {
        yield put({ type: CREATE_ESCALATION_PARAMS_SUCCESS })
        notification.success({
          message: 'Успешно',
          description: 'Настройка эскалации создана'
        })
        callback()
      } else {
        notification.error({
          message: `Ошибка `,
          description: data.MessageText
        })

        yield put({ type: CREATE_ESCALATION_PARAMS_ERROR })
      }
    } else {
      notification.error({
        message: 'Выберите хотя бы один сервис',
        description: ''
      })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: CREATE_ESCALATION_PARAMS_FAILURE })
  }
}

export function * deleteEscalationParamsSaga ({ payload }) {
  const { callback, ...otherPayload } = payload

  try {
    const { data } = yield call(deleteEscalationParams, otherPayload)

    if (data.IsSuccess) {
      yield put({ type: DELETE_ESCALATION_PARAMS_SUCCESS })
      notification.success({
        message: 'Успешно',
        description: 'Настройка эскалации удалена'
      })
      callback()
    } else {
      notification.error({
        message: `Ошибка `,
        description: data.MessageText
      })

      yield put({ type: DELETE_ESCALATION_PARAMS_ERROR })
    }
  } catch (exception) {
    notification.error({
      message: `Ошибка `,
      description: exception.message
    })

    yield put({ type: DELETE_ESCALATION_PARAMS_FAILURE })
  }
}
