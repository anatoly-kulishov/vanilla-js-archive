import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'

import { createInteractionNumberRoleManagment, executeNumberRoleManagmentError, executeNumberRoleManagmentSuccess, initNumberRoleManagmentError, initNumberRoleManagmentSuccess } from '../reducer'
import { selectHandlingState } from 'reducers/internal/selectors'
import { getPaperDocumentsSagaDecorator } from 'webseller/common/signing/sagas/sagas'
import { createDocumentRequestBodyNumberRoleManagment, createErrorParamsCreateInteractionNumberRoleManagment, createExecuteOperationRequestBodyNumberRoleManagment } from './helpers'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { selectSubscriberId, selectSubscriberMainData } from 'webseller/common/crmIntegration/selectors'

export function * initNumberRoleManagmentSaga () {
  const { fetchNumberRoles } = api

  try {
    const { data: numberRoles } = yield call(fetchNumberRoles)

    const hasRolesInResponse = numberRoles?.length > 0
    if (hasRolesInResponse) {
      const {
        WebCareLevelAccessTypeId: roleName,
        EmailAdmin: clientEmail
      } = yield select(selectSubscriberMainData)
      const { id: roleId } = numberRoles.find(({ name }) => name === roleName) || {}

      yield put(initNumberRoleManagmentSuccess({
        numberRoles,
        numberRole: {
          roleId,
          roleName,
          clientEmail
        }
      }))
    } else {
      // TODO заменить на BussinessLogicError
      throw new Error()
    }
  } catch {
    yield put(initNumberRoleManagmentError())
    notification.error({
      message: 'Что-то пошло не так',
      description: 'Изменение роли в данный момент недоступно'
    })
  }
}

export function * getPaperDocumentsSaga () {
  function * preflightGetPaperDocuments () {
    const { fetchCreateDocument } = api

    const { Id: handlingId } = yield select(selectHandlingState)

    const documentRequestBody = yield call(createDocumentRequestBodyNumberRoleManagment)

    return [
      {
        title: 'Заявление на подключение/изменение/отключение услуги "Дистанционное обслуживание" и "Личного кабинета для бизнес-клиентов"',
        request: fetchCreateDocument,
        params: [handlingId, documentRequestBody]
      }
    ]
  }

  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

export function * executeNumberRoleManagmentSaga () {
  const { fetchChangeNumberRole } = api

  try {
    const subscriberId = yield select(selectSubscriberId)
    const body = yield call(createExecuteOperationRequestBodyNumberRoleManagment)

    const { status } = yield call(fetchChangeNumberRole, { subscriberId, body })

    if (isSuccessfulResponse(status)) {
      yield put(executeNumberRoleManagmentSuccess())
    } else {
      // TODO заменить на BussinessLogicError
      throw new Error()
    }
  } catch {
    yield put(executeNumberRoleManagmentError())
    yield put(createInteractionNumberRoleManagment())
  }
}

export function * createInteractionNumberRoleManagmentSaga () {
  const { createInteraction } = api

  const params = yield call(createErrorParamsCreateInteractionNumberRoleManagment)

  yield call(createInteraction, params)
}
