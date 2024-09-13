import { call, put, select } from 'redux-saga/effects'
import store from 'utils/createdStore'
import history from 'utils/createdHistory'
import api from 'utils/api'
import passHandlingTechId from 'utils/helpers/passHandlingTechIdToUrl'
import { Modal, notification } from 'antd'

import {
  CHECK_REPEATED_HANDLING,
  CHECK_REPEATED_HANDLING_ERROR,
  CHECK_REPEATED_HANDLING_FAILURE,
  CHECK_REPEATED_HANDLING_SUCCESS,
  CLOSE_HANDLING_FETCH,
  CLOSE_HANDLING_FETCH_ERROR,
  CLOSE_HANDLING_FETCH_FAILURE,
  CLOSE_HANDLING_FETCH_SUCCESS,
  CREATE_HANDLING_ERROR,
  CREATE_HANDLING_FAILURE,
  CREATE_HANDLING_SUCCESS,
  FETCH_HANDLING_STATUS_ERROR,
  FETCH_HANDLING_STATUS_FAILURE,
  FETCH_HANDLING_STATUS_SUCCESS,
  FETCH_LINKED_INTERACTIONS_ERROR,
  FETCH_LINKED_INTERACTIONS_FAILURE,
  FETCH_LINKED_INTERACTIONS_SUCCESS,
  GET_HANDLING_COORDINATES_ERROR,
  GET_HANDLING_COORDINATES_FAILURE,
  GET_HANDLING_COORDINATES_SUCCESS,
  GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_ERROR,
  GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_FAILURE,
  GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_SUCCESS,
  LAST_HANDLINGS_ERROR,
  LAST_HANDLINGS_FAILURE,
  LAST_HANDLINGS_SUCCESS,
  SET_HANDLING_COORDINATES_ERROR,
  SET_HANDLING_COORDINATES_FAILURE,
  SET_HANDLING_COORDINATES_SUCCESS
} from 'reducers/internal/handlingReducer'

import { CREATE_INTERACTION, FETCH_INTERACTIONS, FETCH_REASONS } from 'reducers/reasonsRegisteringReducer'
import { FETCH_TEMPLATES } from 'reducers/smsSendingReducer'

import { ADD_NOTIFICATION } from 'reducers/internal/notifications'
import { CARD } from 'constants/redirectTypes'

import { PASS_HANDLING_TECH_ID } from 'reducers/internal/parameters'

import { HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL } from 'reducers/changeSim/replacementSimCardReducer'

import {
  getHandlingState,
  getPersonalAccountState,
  getProcessingParametersState,
  getQueryParamsState,
  getUserState,
  getWhoIsIt
} from 'selectors'
import { routeMatch } from 'utils/helpers'
import servicesMessageTypes from 'constants/servicesMessageTypes'
import { modifyCurrentScenarioSaga } from 'sagas/person/scenariosSaga'
import fromEnv from 'config/fromEnv'

import { getWebSellerMarkers } from 'reducers/mnp/mnpMarkersReducer'
import { deleteWebSellerCurrentSessionSaga } from 'webseller/features/webSellerSearch/sagas/customersCheckSaga'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { HANDLING_SYSTEM_ID_WEBSELLER } from 'webseller/constants'

const confirm = Modal.confirm

export function * createHandlingSaga ({ payload: { permission } }) {
  let handling = null

  const user = yield select(getUserState)
  const queryParams = yield select(getQueryParamsState)
  const personalAccount = yield select(getPersonalAccountState)
  const processingParameters = yield select(getProcessingParametersState)
  const whoIsIt = yield select(getWhoIsIt)
  const isWebSeller = yield select(selectIsWebSeller)

  const isPermission = !permission || !!user.Permissions.includes(permission)

  if (processingParameters && isPermission) {
    const {
      ClientId,
      ClientCategory,
      BillingBranchId,
      PersonalAccountId,
      Email,
      ClientTypeId,
      ClientStatusId,
      Msisdn
    } = personalAccount
    const SubscriberClientInfo = personalAccount?.SubscriberFullInfo?.SubscriberClientInfo ?? {}
    const BaseFunctionalParams = personalAccount?.BaseFunctionalParams ?? {}
    const ParentClientInfo = personalAccount?.ParentClientInfo ?? {}
    const { ClientCategoryId, AppMode } = BaseFunctionalParams
    const { ParentJurClientTypeId } = ParentClientInfo
    const { JurClientTypeId, Enviroment } = SubscriberClientInfo

    const currentJurClientTypeId = ClientCategory === 'B2B' ? ParentJurClientTypeId : JurClientTypeId

    const { InteractionDirection, HandlingBranchId, ServiceChannel, ClientHandlingIdentity } = processingParameters
    const hasWebSellerHandlingIdentity = isWebSeller && ClientHandlingIdentity
    const clientInfo = Msisdn || Email || queryParams?.email
    if (clientInfo || queryParams?.dialogNickname || hasWebSellerHandlingIdentity) {
      const {
        interactionType,
        interactionId,
        vdnIvr,
        ivrHistory,
        serviceId,
        serviceName,
        regionName,
        handlingTechId,
        linkedHandlingTechId,
        linkedHandlingId,
        email,
        eduId,
        dialogId,
        dialogChannel,
        dialogNickname,
        theme,
        segmentId
      } = queryParams
      const channelId = ServiceChannel.Id
      const lastIvrNode = ivrHistory && ivrHistory.replace('#', '')
      const lastServiceName = serviceName && serviceName.replace('#', '')

      handling = {
        vdnIvr,
        channelId,
        lastIvrNode,

        handlingTechId,
        callAdminInteractionType: interactionType,
        callAdminInteractionId: interactionId,
        callAdminInteractionAddress: ClientHandlingIdentity,
        directionId: InteractionDirection.Id,
        clientId: ClientId,
        clientBranchId: BillingBranchId,
        clientTypeId: ClientTypeId,
        clientJurTypeId: currentJurClientTypeId,
        clientCategoryId: ClientCategoryId,
        clientStatusId: ClientStatusId,
        personalAccountNumber: PersonalAccountId,
        clientServiceMethod: Enviroment,
        serviceLineId: serviceId,
        serviceLineName: lastServiceName,
        callAdminRegionName: regionName,
        handlingBranchId: HandlingBranchId,
        linkedHandlingTechId: linkedHandlingTechId,
        linkedHandlingId: linkedHandlingId,
        email: email || Email,
        eduId,
        dialogId,
        dialogChannel,
        dialogNickname,
        theme,
        segmentId
      }
      if (AppMode === 'MixxCustomer') {
        // Leon Mode
        handling.factualRegion = whoIsIt?.BillingBranchId
      }
      if (isWebSeller) {
        const activeSalesOffice = yield select(selectActiveSalesOffice)
        handling.salePointId = activeSalesOffice?.salesOfficeId || user.officeId
      }
    }
  }

  const errorMessage = 'Не удалось создать обращение'

  if (handling) {
    const { createHandling } = api

    try {
      if (isWebSeller) {
        handling.systemId = HANDLING_SYSTEM_ID_WEBSELLER
      }

      const { data } = yield call(createHandling, handling)
      const interactionAddress = personalAccount.Msisdn || personalAccount.Email

      if (data.IsSuccess) {
        yield put({ type: CREATE_HANDLING_SUCCESS, payload: { handling: data.Data } })
        yield put({ type: FETCH_REASONS })
        yield put({ type: FETCH_INTERACTIONS })
        if (personalAccount && personalAccount.ClientCategory !== 'Анонимный') {
          yield put({ type: FETCH_TEMPLATES })
        }
        const { Id, HandlingTechId } = data.Data
        // If HandlingTechId returns from CreateHandling method replace old with new
        if (HandlingTechId) {
          passHandlingTechId(HandlingTechId, true)
          yield put({ type: PASS_HANDLING_TECH_ID, payload: HandlingTechId })
        }
        if (interactionAddress || !handling.dialogNickname) {
          yield put({
            type: CHECK_REPEATED_HANDLING,
            payload: { msisdnOrEmail: interactionAddress, handlingId: Id }
          })
        }
        if (queryParams.scenarioName) {
          yield call(modifyCurrentScenarioSaga)
        }

        // Маркеры для WebSeller вызываются своим action и ТОЛЬКО после createHandling
        if (isWebSeller) {
          yield put(getWebSellerMarkers({ handlingId: Id }))
        }
      } else {
        yield put({ type: CREATE_HANDLING_ERROR, payload: { handling: data.Data } })

        notification.error({
          message: errorMessage,
          description: ` ${data.MessageText}`
        })
      }
    } catch (exception) {
      yield put({ type: CREATE_HANDLING_FAILURE, payload: { data: exception.message } })

      notification.error({
        message: errorMessage,
        description: ` ${exception.message}`
      })
    }
  } else {
    notification.warn({
      message: errorMessage,
      description: 'Для создания обращения необходимо выбрать абонента'
    })
  }
}

export function * closeHandlingSaga ({ payload }) {
  const { isASSeller, msisdn, ...payloadForApi } = payload
  const { handlingId } = payloadForApi
  const { closeHandling } = api
  const { error, closedHandling } = servicesMessageTypes

  const redirectPath = isASSeller ? '/web-seller/dashboard' : '/empty/manual-search'

  try {
    const { data } = yield call(closeHandling, payloadForApi)

    const closedHandlingError = data?.ResultCode === closedHandling && data?.ResultType === error
    if (data.IsSuccess) {
      if (isASSeller) {
        yield call(deleteWebSellerCurrentSessionSaga)
      }
      yield put({ type: CLOSE_HANDLING_FETCH_SUCCESS, payload: data })
      yield call(history.push(redirectPath))
    } else {
      yield put({ type: CLOSE_HANDLING_FETCH_ERROR, payload: { error: data } })
      if (closedHandlingError) {
        if (isASSeller) {
          yield call(deleteWebSellerCurrentSessionSaga)
        }
        notification.error({
          message: 'Закрытие обращения',
          description: data.MessageText
        })
        yield call(history.push(redirectPath))
      } else {
        confirm({
          title: 'Закрыть карточку?',
          content: `Для данного клиента не отмечено ни одной причины обращения.
          Необходимо вернуться в карточку клиента и отметить по крайней мере одну причину`,
          okText: 'Ошибочное открытие',
          okType: 'danger',
          cancelText: 'Вернуться',
          onOk () {
            store.dispatch({
              type: CLOSE_HANDLING_FETCH,
              payload: { handlingId: handlingId, isEmptinessCheckNeeded: false, isFalse: true, isASSeller }
            })
          }
        })
      }
    }
  } catch (exception) {
    yield put({ type: CLOSE_HANDLING_FETCH_FAILURE, payload: { error: exception.message } })
  }
}

export function * checkRepeatedHandlingSaga ({ payload }) {
  const handling = yield select(getHandlingState)

  const { checkRepeatedHandling } = api
  const { isRepeatedHandlingChecked } = handling

  if (!isRepeatedHandlingChecked) {
    try {
      const { data } = yield call(checkRepeatedHandling, payload)
      if (data.IsSuccess) {
        yield put({ type: CHECK_REPEATED_HANDLING_SUCCESS, payload: data })
        if (data.Data.IsRepeated) {
          yield put({
            type: ADD_NOTIFICATION,
            payload: {
              message: '',
              description: data.Data.DisplayMessage,
              type: 'error',
              pathName: `${routeMatch(location.pathname, 'history/appeals')}`,
              redirectType: CARD
            }
          })
        }
      } else {
        yield put({ type: CHECK_REPEATED_HANDLING_ERROR, payload: data })
      }
    } catch (exception) {
      yield put({ type: CHECK_REPEATED_HANDLING_FAILURE, message: exception.message })
    }
  }
}

export function * fetchLastHandligsSaga ({ payload }) {
  const { fetchLastHandlings } = api
  const message = 'Список карточек'

  try {
    const { data } = yield call(fetchLastHandlings, payload)
    if (data.IsSuccess) {
      yield put({ type: LAST_HANDLINGS_SUCCESS, payload: data })
    } else {
      yield put({ type: LAST_HANDLINGS_ERROR, payload: data })
      notification.error({
        message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: LAST_HANDLINGS_FAILURE, message: exception.message })
    notification.error({
      message,
      description: exception.message
    })
  }
}

export function * fetchHandligCoordinatesSaga ({ payload }) {
  const { fetchHandlingCoordinates } = api
  const message = 'Получение координат обращения'
  try {
    const {
      data: { IsSuccess, Data, MessageText }
    } = yield call(fetchHandlingCoordinates, payload)

    if (IsSuccess) {
      const { Coordinates } = Data
      yield put({ type: GET_HANDLING_COORDINATES_SUCCESS, payload: { Coordinates } })
    } else {
      yield put({ type: GET_HANDLING_COORDINATES_ERROR })
      notification.error({
        message,
        description: MessageText
      })
    }
  } catch (exception) {
    yield put({ type: GET_HANDLING_COORDINATES_FAILURE })
    notification.error({
      message,
      description: exception.message
    })
  }
}

export function * setHandligCoordinatesSaga ({ payload }) {
  const { setHandlingCoordinates } = api
  const message = 'Сохранение координат обращения'
  try {
    const {
      data: { IsSuccess, MessageText }
    } = yield call(setHandlingCoordinates, payload)

    if (IsSuccess) {
      yield put({ type: SET_HANDLING_COORDINATES_SUCCESS })
    } else {
      yield put({ type: SET_HANDLING_COORDINATES_ERROR })
      notification.error({
        message,
        description: MessageText
      })
    }
  } catch (exception) {
    yield put({ type: SET_HANDLING_COORDINATES_FAILURE })
    notification.error({
      message,
      description: exception.message
    })
  }
}

export function * fetchInteractionParamsForLinkedHandlingSaga ({ payload }) {
  const message = 'Открытие карточки другого абонента'
  const { fetchInteractionParamsForLinkedHandling } = api
  const handling = yield select(getHandlingState)
  const personalAccount = yield select(getPersonalAccountState)
  const queryParams = yield select(getQueryParamsState)
  const processingParameters = yield select(getProcessingParametersState)
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchInteractionParamsForLinkedHandling, payload)

    if (IsSuccess) {
      yield put({ type: GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_SUCCESS, payload: Data })
      const { ClientId, BillingBranchId, Msisdn, SubscriberId } = personalAccount
      const SubscriberInfo = personalAccount?.SubscriberId?.SubscriberInfo ?? {}
      const { SubscriberTypeId, SubscriberStatusId } = SubscriberInfo

      const interactionData = {
        handlingId: handling.Id,
        clientId: ClientId,
        clientBranchId: BillingBranchId,
        msisdn: Msisdn,
        subscriberId: SubscriberId,
        subscriberBranchId: BillingBranchId,
        subscriberTypeId: SubscriberTypeId,
        subscriberStatusId: SubscriberStatusId,
        interactionTemplateId: Data
      }
      yield put({ type: CREATE_INTERACTION, payload: { interactionData } })
      const url =
        `${fromEnv('REACT_APP_SEARCH')}/main/balance?` +
        `msisdn=${payload.msisdn}&` +
        `serviceChannelId=${processingParameters.ServiceChannel.Id}&` +
        `linkedHandlingTechId=${queryParams.handlingTechId}&` +
        `linkedHandlingId=${handling.Id}`
      window.open(url)
    } else {
      yield put({ type: GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_ERROR })
      notification.error({
        message,
        description: MessageText
      })
    }
  } catch (exception) {
    yield put({ type: GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_FAILURE })
    notification.error({
      message,
      description: exception.message
    })
  }
}

export function * fetchHandlingStatusSaga ({ payload }) {
  const errorMessage = 'Ошибка получения статуса обращения'

  try {
    const { fetchHandlingStatus } = api
    const queryParamsState = yield select(getQueryParamsState)
    const handlingStatusPayload = {
      handlingId: queryParamsState?.linkedHandlingId
    }

    const { data } = yield call(fetchHandlingStatus, handlingStatusPayload)

    const { IsSuccess } = data
    if (IsSuccess) {
      const { HandlingStatusIsOpened: isHandlingStatusOpened } = data.Data
      if (isHandlingStatusOpened) {
        const shouldToggleReplacementSimModal = payload?.shouldToggleReplacementSimModal ?? false
        yield put({ type: FETCH_HANDLING_STATUS_SUCCESS, payload: isHandlingStatusOpened })
        if (shouldToggleReplacementSimModal) {
          yield put({ type: HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL })
        }
      } else {
        const linkedMsisdn = queryParamsState?.linkedMsisdn

        yield put({ type: FETCH_HANDLING_STATUS_SUCCESS, payload: isHandlingStatusOpened })
        if (linkedMsisdn) {
          notification.warn({
            message: 'Замена SIM',
            description: `Обращение на номере дилера ${linkedMsisdn} закрыто.`
          })
        }
      }
    } else {
      yield put({ type: FETCH_HANDLING_STATUS_ERROR })
      notification.error({
        message: errorMessage,
        description: data?.MessageText
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_HANDLING_STATUS_FAILURE })
    notification.error({
      message: errorMessage,
      description: message
    })
  }
}

export function * fetchLinkedInteractionsSaga ({ payload }) {
  const { fetchLinkedInteractions } = api
  const message = 'Получение координат обращения'
  try {
    const {
      data: { IsSuccess, Data, MessageText }
    } = yield call(fetchLinkedInteractions, payload)

    if (IsSuccess) {
      yield put({ type: FETCH_LINKED_INTERACTIONS_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_LINKED_INTERACTIONS_ERROR })
      notification.error({
        message: message,
        description: MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_LINKED_INTERACTIONS_FAILURE })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}

// function * deleteWebSellerSession () {
//   const { fetchDeleteSession } = api
//   const { clientMsisdn, sessionId } = getWebsellerSessionAccessData()
//
//   yield call(fetchDeleteSession, { msisdn: clientMsisdn, sessionId })
// }
