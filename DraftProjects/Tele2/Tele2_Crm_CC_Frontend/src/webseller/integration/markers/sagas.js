import { notification } from 'antd'
import { all, call, put, select } from 'redux-saga/effects'

import api from 'utils/api'
import { addNotification } from 'reducers/internal/notifications'
import {
  fetchMarkersError,
  fetchMarkersSuccess,
  getWebSellerMarkersError,
  getWebSellerMarkersSuccess,
  setCorrectionDataMarker,
  setHasRequiredMarkers
} from 'reducers/mnp/mnpMarkersReducer'
import * as redirectTypes from 'constants/redirectTypes'
import { getPersonalAccountState, getQueryParamsState, getUserState } from 'selectors/index'
import { selectHandlingState } from 'reducers/internal/selectors'

import { isSuccessfulResponse } from 'webseller/helpers/api'
import BussinessLogicError, { isBussinessLogicError } from 'webseller/helpers/BussinessLogicError'
import { checkRightWithOperations } from 'webseller/helpers'

import {
  isCorrectionDataMarker as isCorrectionDataMarkerHelper,
  isOperationMarker as isOperationMarkerHelper
} from './helpers'

export function * getWebSellerMarkersSaga ({ payload }) {
  const { handlingId } = payload || {}

  const { fetchMarkersV2: fetchMarkers, fetchTaskCatalog } = api

  try {
    const user = yield select(getUserState)
    const hasBlockingPermission = checkRightWithOperations({
      permissions: user.Permissions,
      permissionName: 'AS.Task',
      operationName: 'B'
    })

    const requestBody = yield call(mapToRequestFetchMarkers, { handlingId })

    if (!requestBody.HandlingId) {
      throw new BussinessLogicError('Отсутствует handlingId')
    }

    const { data: markers, status } = yield call(fetchMarkers, requestBody)

    const anonymousMarker = yield call(getAnonymousMarker)

    if (isSuccessfulResponse(status)) {
      yield put(getWebSellerMarkersSuccess())
      yield put(fetchMarkersSuccess(markers))

      const { data: requiredTasks } = yield call(fetchTaskCatalog)

      let hasCorrectionDataMarker = false
      let hasRequiredMarkers = false
      let tasksMap = []
      if (Array.isArray(requiredTasks)) {
        tasksMap = Object.fromEntries(requiredTasks.map(task => [task.markerId, task]))
      }

      if (Array.isArray(markers.DiagnosticParams)) {
        const filteredMarkers = markers.DiagnosticParams.filter(
          marker => !marker.Type?.toLowerCase().startsWith('birthday')
        )

        const markersEntries = filteredMarkers.map(marker => [marker.MarkerId, marker])
        const markersWithTasks = markersEntries.map(([markerId, marker]) => {
          const isCorrectionDataMarker = isCorrectionDataMarkerHelper(markerId)

          const taskMarker = tasksMap[markerId]
          const required = taskMarker?.required || false
          const priority = taskMarker?.priority

          const isRequiredMarker = Boolean(required)

          if (isCorrectionDataMarker) {
            hasCorrectionDataMarker = true
          }
          if (isRequiredMarker) {
            hasRequiredMarkers = true
          }

          return {
            ...marker,
            required,
            priority
          }
        })

        if (anonymousMarker) {
          markersWithTasks.push(anonymousMarker)
        }

        const sortedMarkersWithTasks = markersWithTasks.sort((markerA, markerB) => {
          if (!markerA.priority && !markerB.priority) {
            return 0
          }

          if (!markerA.priority) {
            return 1
          }

          if (!markerB.priority) {
            return -1
          }

          return markerA.priority - markerB.priority
        })

        yield put(setCorrectionDataMarker(hasCorrectionDataMarker))
        if (hasBlockingPermission) {
          yield put(setHasRequiredMarkers(hasRequiredMarkers))
        }

        const namePriorityMarker = sortedMarkersWithTasks[0].Value

        yield all(
          sortedMarkersWithTasks.map((marker, markerIdx) => {
            const isPriorityMarker = markerIdx === 0
            const markerId = marker.MarkerId
            const isOperationMarker = isOperationMarkerHelper(markerId)
            const url = marker.Url
            const type = marker.ColorType?.toLowerCase()
            const redirectType = isOperationMarker
              ? redirectTypes.WEBSELLER_OPERATION
              : url
                ? redirectTypes.GLOBAL
                : redirectTypes.NONE

            return put(
              addNotification({
                message: null,
                description: marker.Value,
                pathName: url || undefined,
                type: url ? type || 'info' : 'info',
                redirectType,
                markerId,
                disabled: !isPriorityMarker,
                disabledText:
                  !isPriorityMarker && isOperationMarker
                    ? `Задача с более высоким приоритетом должна быть выполнена первой: ${namePriorityMarker}`
                    : null
              })
            )
          })
        )
      }

      if (Array.isArray(markers.MnpParams)) {
        yield all(
          markers.MnpParams.map(marker => {
            const type = marker.ColorType?.toLowerCase()

            return put(
              addNotification({
                message: marker.Title,
                description: marker.Message,
                type: type || 'info',
                redirectType: redirectTypes.NONE,
                disabled: hasRequiredMarkers
              })
            )
          })
        )
      }
    } else {
      throw new BussinessLogicError()
    }
  } catch (err) {
    yield put(getWebSellerMarkersError())
    yield put(fetchMarkersError())
    notification.error({
      message: 'Ошибка получения информации по маркерам абонента',
      description: isBussinessLogicError(err) ? err.message : undefined
    })
  }
}

function * mapToRequestFetchMarkers ({ handlingId }) {
  const {
    BillingBranchId: BranchId,
    Msisdn,
    ClientId,
    SubscriberFullInfo,
    BaseFunctionalParams
  } = yield select(getPersonalAccountState)
  const { Id: storedHandlingId } = yield select(selectHandlingState)
  const queryParams = yield select(getQueryParamsState)

  return {
    Msisdn,
    BranchId,
    ClientId,
    SubscriberStatus: SubscriberFullInfo?.SubscriberInfo?.SubscriberStatusId || undefined,
    AppMode: BaseFunctionalParams?.AppMode || undefined,
    HandlingId: handlingId || storedHandlingId,
    IvrNodeName: queryParams?.ivrHistory || undefined
  }
}

function * getAnonymousMarker () {
  try {
    const { BillingBranchId: BranchId, Msisdn } = yield select(getPersonalAccountState)

    const { data: anonymousMarkers, status } = yield call(api.fetchAnonymousMarker, { Msisdn, BranchId })

    if (isSuccessfulResponse(status)) {
      if (Array.isArray(anonymousMarkers) && anonymousMarkers.length > 0) {
        const [anonymousMarker] = anonymousMarkers

        return {
          Value: anonymousMarker.Name,
          priority: anonymousMarker.Priority
        }
      } else {
        return null
      }
    } else {
      throw new BussinessLogicError()
    }
  } catch {
    notification.error({
      message: 'Не удалось получить информацию по маркеру Анонимная карточка'
    })
    return null
  }
}
