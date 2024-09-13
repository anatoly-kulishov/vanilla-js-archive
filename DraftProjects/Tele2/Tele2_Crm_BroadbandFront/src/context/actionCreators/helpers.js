import { defaults } from 'lodash-es'
import { notification } from 'antd'
import servicesMessageTypes from '../../constants/servicesMessageTypes'

// Notifications
export const showErrorNotification = (description, msg) => {
  if (!msg) {
    msg = 'Заявка на подключение ШПД'
  }
  notification.error({
    message: msg,
    description: description,
    style: { whiteSpace: 'pre-wrap' }
  })
}

export const showSuccessNotification = (description, msg) => {
  if (!msg) {
    msg = 'Заявка на подключение ШПД'
  }
  notification.success({
    message: msg,
    description: description,
    style: { whiteSpace: 'pre-wrap' }
  })
}

export const showWarnNotification = (description, msg) => {
  if (!msg) {
    msg = 'Заявка на подключение ШПД'
  }
  notification.warn({
    message: msg,
    description: description,
    style: { whiteSpace: 'pre-wrap' }
  })
}

const NotificationType = {
  Success: 'Success',
  Warning: 'Warning',
  Error: 'Error'
}

function showNotification (type, data) {
  if (!data) return
  const isSimpleNotification = typeof data === 'string'
  switch (type) {
    case NotificationType.Success:
      isSimpleNotification ? showSuccessNotification(data) : showSuccessNotification(data?.description, data?.msg)
      break
    case NotificationType.Warning:
      isSimpleNotification ? showWarnNotification(data) : showWarnNotification(data?.description, data?.msg)
      break
    case NotificationType.Error:
      isSimpleNotification ? showErrorNotification(data) : showErrorNotification(data?.description, data?.msg)
      break
    default:
      break
  }
}

// Request result processor
/**
 * Process request result by ResultType property
 * @param {Object} data Response data.
 * @param {string} actionType Request action type.
 * @param {Object} options Processing options. Passed properties will replace default values.
 * @param {Object} options.types Custom action types.
 * @param {string} options.types.success Action type for success action. Default: `${actionType}_SUCCESS`
 * @param {string} options.types.warning Action type for warning action. Default: `${actionType}_ERROR`
 * @param {string} options.types.error Action type for error action. Default: `${actionType}_ERROR`
 * @param {string} options.types.failure Action type for failure action. Default: `${actionType}_FAILURE`
 * @param {Object} options.notifications Custom notification showing options.
 * @param {boolean} options.notifications.success Show notification on success. Default: `false`
 * @param {boolean} options.notifications.warning Show notification on warning. Default: `false`
 * @param {boolean} options.notifications.error Show notification on error. Default: `true`
 * @param {boolean} options.notifications.failure Show notification on failure. Default: `true`
 * @param {Object} options.payloads Custom action payloads.
 * @param {*} options.payloads.success Payload on success. Default: `data.Data`
 * @param {*} options.payloads.warning Payload on warning. Default: `data.Data`
 * @param {*} options.payloads.error Payload on error. Default: `data.Data`
 * @param {*} options.payloads.failure Payload on failure. Default: `null`
 * @returns {{ result: Object, action: { type: string, payload: Object }}} Response data and action for dispatching.
 */
export function processRequestResult (data, actionType, options) {
  const defaultOptions = {
    types: {
      success: `${actionType}_SUCCESS`,
      warning: `${actionType}_SUCCESS`,
      error: `${actionType}_ERROR`,
      failure: `${actionType}_FAILURE`
    },
    notifications: {
      success: false,
      warning: false,
      error: data?.MessageText ?? '',
      failure: data?.MessageText ?? ''
    },
    areNotificationsEnabled: true,
    payloads: {
      success: data.Data,
      warning: data.Data,
      error: data.Data,
      failure: null
    }
  }
  options = {
    types: defaults(options?.types, defaultOptions.types),
    notifications: defaults(options?.notifications, defaultOptions.notifications),
    areNotificationsEnabled: options?.areNotificationsEnabled ?? defaultOptions.areNotificationsEnabled,
    payloads: defaults(options?.payloads, defaultOptions.payloads)
  }
  let result
  let action

  const areNotificationsEnabled = options.areNotificationsEnabled

  switch (data.ResultType) {
    case servicesMessageTypes.success:
      action = { type: options.types.success, payload: options.payloads.success }
      result = options.payloads.success
      areNotificationsEnabled && showNotification(NotificationType.Success, options.notifications.success)
      break
    case servicesMessageTypes.warning:
      action = { type: options.types.warning, payload: options.payloads.warning }
      result = options.payloads.warning
      areNotificationsEnabled && showNotification(NotificationType.Warning, options.notifications.warning)
      break
    case servicesMessageTypes.error:
      action = { type: options.types.error, payload: options.payloads.error }
      result = options.payloads.error
      areNotificationsEnabled && showNotification(NotificationType.Error, options.notifications.error)
      break
    default:
      action = { type: options.types.failure, payload: options.payloads.failure }
      result = options.payloads.failure
      areNotificationsEnabled && showNotification(NotificationType.Error, options.notifications.failure)
      break
  }
  return { result, action }
}

export function processRestRequestResult (data, status, actionType, options) {
  const defaultOptions = {
    types: {
      success: `${actionType}_SUCCESS`,
      warning: `${actionType}_SUCCESS`,
      error: `${actionType}_ERROR`,
      failure: `${actionType}_FAILURE`
    },
    notifications: {
      success: false,
      warning: false,
      error: data?.message ?? '',
      failure: data?.message ?? ''
    },
    areNotificationsEnabled: true,
    payloads: {
      success: data,
      warning: data,
      error: data,
      failure: null
    }
  }
  options = {
    types: defaults(options?.types, defaultOptions.types),
    notifications: defaults(options?.notifications, defaultOptions.notifications),
    areNotificationsEnabled: options?.areNotificationsEnabled ?? defaultOptions.areNotificationsEnabled,
    payloads: defaults(options?.payloads, defaultOptions.payloads)
  }
  let result
  let action

  const areNotificationsEnabled = options.areNotificationsEnabled

  if (status >= 200 && status < 300) {
    action = { type: options.types.success, payload: options.payloads.success }
    result = options.payloads.success
    areNotificationsEnabled && showNotification(NotificationType.Success, options.notifications.success)
  } else if (status >= 300 && status < 400) {
    action = { type: options.types.warning, payload: options.payloads.warning }
    result = options.payloads.warning
    areNotificationsEnabled && showNotification(NotificationType.Warning, options.notifications.warning)
  } else if (status >= 400 && status < 500) {
    action = { type: options.types.error, payload: options.payloads.error }
    result = options.payloads.error
    areNotificationsEnabled && showNotification(NotificationType.Error, options.notifications.error)
  } else {
    action = { type: options.types.failure, payload: options.payloads.failure }
    result = options.payloads.failure
    areNotificationsEnabled && showNotification(NotificationType.Error, options.notifications.failure)
  }
  return { result, action }
}
