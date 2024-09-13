import React from 'react'
import { call, put, select, all, take } from 'redux-saga/effects'
import api from 'utils/api'

import { notification } from 'antd'
import get from 'lodash/get'

import FormModal from 'containers/Questionary/components/FormModal'

import { getHandlingState, getPersonalAccountState } from 'selectors'

import {
  FETCH_QUESTIONARY_USE_LIST_SUCCESS,
  FETCH_QUESTIONARY_USE_LIST_ERROR,
  FETCH_QUESTIONARY_USE_LIST_FAILURE,
  FETCH_QUESTIONS_LIST_SUCCESS,
  FETCH_QUESTIONS_LIST_ERROR,
  FETCH_QUESTIONS_LIST_FAILURE,
  FETCH_MNP_QUESTIONS_LIST_SUCCESS,
  FETCH_MNP_QUESTIONS_LIST_ERROR,
  FETCH_MNP_QUESTIONS_LIST_FAILURE,
  WRITE_NEW_QUESTIONARY_SUCCESS,
  WRITE_NEW_QUESTIONARY_ERROR,
  WRITE_NEW_QUESTIONARY_FAILURE,
  FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_SUCCESS,
  FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_ERROR,
  FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_FAILURE
} from 'reducers/questionary/questionaryReducer'

import {
  FETCH_QUESTIONS_HISTORY,
  FETCH_QUESTIONS_HISTORY_SUCCESS
} from 'reducers/questionary/questionaryHistoryReducer'

import { ADD_NOTIFICATION } from 'reducers/internal/notifications'

import { MODAL } from 'constants/redirectTypes'
import QuestionaryHistoryFooter from 'screens/History/components/QuestionaryHistoryFooter'
import { PERSONAL_ACCOUNT_FETCH_SUCCESS } from 'reducers/personalInfo/personalInfoReducer'

export function * fetchQuestionaryUseListSaga () {
  const { fetchQuestionaryUseList } = api

  const [handlingState, personalAccountState] = yield all([select(getHandlingState), select(getPersonalAccountState)])

  const { Id: handlingId } = handlingState
  const { Msisdn } = personalAccountState

  const errorMessage = 'Ошибка получения списка анкет'
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchQuestionaryUseList, { handlingId, Msisdn })
    if (IsSuccess) {
      const { Questionaries } = Data
      yield put({ type: FETCH_QUESTIONARY_USE_LIST_SUCCESS, payload: Questionaries })
    } else {
      yield put({ type: FETCH_QUESTIONARY_USE_LIST_ERROR, payload: MessageText })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_QUESTIONARY_USE_LIST_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchQuestionsListSaga ({ payload }) {
  const { fetchQuestionsList } = api

  const errorMessage = 'Ошибка получения списка вопросов анкеты'
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchQuestionsList, { ...payload })
    if (IsSuccess) {
      yield put({ type: FETCH_QUESTIONS_LIST_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_QUESTIONS_LIST_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_QUESTIONS_LIST_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchMnpQuestionsListSaga ({ payload }) {
  const { fetchQuestionsList } = api

  const errorMessage = 'Ошибка получения списка вопросов анкеты MNP'
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchQuestionsList, { ...payload })
    if (IsSuccess) {
      yield put({ type: FETCH_MNP_QUESTIONS_LIST_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_MNP_QUESTIONS_LIST_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_MNP_QUESTIONS_LIST_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * writeNewQuestionarySaga ({ payload }) {
  const { writeNewQuestionary } = api

  const errorMessage = 'Ошибка создания анкеты'
  const successMessage = 'Анкета успешно создана'

  try {
    const [handlingState, personalAccountState] = yield all([select(getHandlingState), select(getPersonalAccountState)])

    const { Id: handlingId } = handlingState
    const { Msisdn, Email, BillingBranchId } = personalAccountState

    const clientData = {
      Msisdn,
      handlingId,
      ClientId: personalAccountState?.ClientId,
      Email,
      SubscriberId: personalAccountState?.SubscriberId,
      subscriberTypeId: +personalAccountState?.SubscriberFullInfo?.SubscriberInfo.SubscriberTypeId,
      SubscriberStatusId: personalAccountState?.SubscriberFullInfo?.SubscriberInfo.SubscriberStatusId,
      subscriberBranchId: BillingBranchId
    }
    const {
      data: { IsSuccess, MessageText }
    } = yield call(writeNewQuestionary, {
      ...clientData,
      ...payload
    })
    if (IsSuccess) {
      yield put({ type: WRITE_NEW_QUESTIONARY_SUCCESS })
      notification.open({
        message: successMessage,
        type: 'success'
      })
    } else {
      yield put({ type: WRITE_NEW_QUESTIONARY_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: WRITE_NEW_QUESTIONARY_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchQuestionaryForRedirectedAbonentSaga ({ payload }) {
  const { fetchQuestionaryForRedirectedAbonent } = api

  const personalAccountState = yield select(getPersonalAccountState)

  let Msisdn = get(personalAccountState, 'Msisdn', null)

  if (!Msisdn) {
    const { payload: personalAccountPayload } = yield take(PERSONAL_ACCOUNT_FETCH_SUCCESS)
    Msisdn = get(personalAccountPayload, 'Data.Msisdn', null)
  }

  const errorMessage = 'Ошибка получения комментария-маркера анкеты абонента'
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchQuestionaryForRedirectedAbonent, { ...payload, Msisdn })
    if (IsSuccess) {
      const { Message, QuestionaryHistoryId } = Data

      yield put({
        type: QuestionaryHistoryId ? FETCH_QUESTIONS_HISTORY : null,
        payload: { QuestionaryHistoryId, isMarker: true }
      })
      const {
        payload: { questionsHistory, isMarker }
      } = yield take(FETCH_QUESTIONS_HISTORY_SUCCESS)

      if (isMarker) {
        yield all([
          put({
            type: FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_SUCCESS
          }),
          put({
            type: Message ? ADD_NOTIFICATION : null,
            payload: {
              message: Message,
              description: 'Нажмите здесь, чтобы просмотреть анкету',
              type: 'info',
              ModalComponent: FormModal,
              modalName: 'formModal',
              modalProps: {
                dataSource: questionsHistory.Questions,
                title: questionsHistory?.QuestionaryName,
                isEditable: false,
                hasInitialValues: true,
                footer: <QuestionaryHistoryFooter createdFio={questionsHistory?.CreatedFIO} createdOn={questionsHistory?.CreatedOn} />
              },
              redirectType: MODAL
            }
          })
        ])
      }
    } else {
      yield put({ type: FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}
