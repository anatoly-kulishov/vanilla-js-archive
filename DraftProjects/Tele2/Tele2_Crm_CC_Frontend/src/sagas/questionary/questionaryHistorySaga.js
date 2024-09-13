import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'

import { getPersonalAccountState } from 'selectors'

import {
  FETCH_QUESTIONARY_HISTORY_SUCCESS,
  FETCH_QUESTIONARY_HISTORY_ERROR,
  FETCH_QUESTIONARY_HISTORY_FAILURE,

  FETCH_QUESTIONS_HISTORY_SUCCESS,
  FETCH_QUESTIONS_HISTORY_ERROR,
  FETCH_QUESTIONS_HISTORY_FAILURE,

  FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_SUCCESS,
  FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_ERROR,
  FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_FAILURE
} from 'reducers/questionary/questionaryHistoryReducer'
import moment from 'moment'

export function * fetchQuestionaryHistorySaga ({ payload }) {
  const { fetchQuestionaryHistory } = api
  const { Msisdn } = yield select(getPersonalAccountState)

  const errorMessage = 'Ошибка получения истории анкет'
  try {
    const {
      data: {
        Data,
        IsSuccess,
        MessageText
      }
    } = yield call(fetchQuestionaryHistory, { Msisdn, ...payload })

    if (IsSuccess) {
      const { Questionaries } = Data

      const dateFormat = 'DD.MM.YYYY HH:mm:ss'

      for (const questionary of Questionaries) {
        const { CreatedOn } = questionary
        questionary.CreatedOn = moment.utc(CreatedOn).local().format(dateFormat)
      }

      yield put({ type: FETCH_QUESTIONARY_HISTORY_SUCCESS, payload: Questionaries })
    } else {
      yield put({ type: FETCH_QUESTIONARY_HISTORY_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_QUESTIONARY_HISTORY_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchQuestionsHistorySaga ({ payload }) {
  const { fetchQuestionsHistory } = api

  const { isMarker, isMnp, ...params } = payload

  const errorMessage = 'Ошибка получения формы истории анкеты'
  try {
    const {
      data: {
        Data,
        IsSuccess,
        MessageText
      }
    } = yield call(fetchQuestionsHistory, { ...params })

    if (IsSuccess) {
      const questions = Data.Questions

      const formattedQuestions = questions.map(question => {
        const controlData = JSON.parse(question.ControlData)
        const fullQuestionHistory = Object.assign({}, question, ...controlData)

        return fullQuestionHistory
      })

      const dateFormat = 'DD.MM.YYYY HH:mm:ss'

      Data.CreatedOn = moment.utc(Data.CreatedOn).local().format(dateFormat)

      const questionsHistory = {
        ...Data,
        Questions: formattedQuestions
      }

      yield put({ type: FETCH_QUESTIONS_HISTORY_SUCCESS, payload: { questionsHistory, isMarker, isMnp } })
    } else {
      yield put({ type: FETCH_QUESTIONS_HISTORY_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_QUESTIONS_HISTORY_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchQuestionaryUseListWithoutCheckSaga () {
  const { fetchQuestionaryUseListWithoutCheck } = api

  const { Msisdn } = yield select(getPersonalAccountState)

  const errorMessage = 'Ошибка получения списка анкет'
  try {
    const {
      data: {
        Data,
        IsSuccess,
        MessageText
      }
    } = yield call(fetchQuestionaryUseListWithoutCheck, { Msisdn })

    if (IsSuccess) {
      const { Questionaries } = Data
      yield put({ type: FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_SUCCESS, payload: Questionaries })
    } else {
      yield put({ type: FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_ERROR })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_FAILURE })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}
