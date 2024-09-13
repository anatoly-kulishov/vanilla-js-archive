import { call, put } from 'redux-saga/effects'
import {
  PARAMETERS_PROCESSING_FETCH_SUCCESS,
  PARAMETERS_PROCESSING_FETCH_ERROR,
  PARAMETERS_PROCESSING_FETCH_FAILURE
} from 'reducers/internal/requestParametersProcessingReducer'

import { ADD_NOTIFICATION } from 'reducers/internal/notifications'

import { NONE } from 'constants/redirectTypes'

import { fetchParametersProcessing } from 'utils/api'

const serviceChannels = {
  MagnitMobile: {
    id: 'd1f4c7ee-4a2c-41af-94eb-42b7862a4d9f',
    message: 'Клиент Магнит Мобайл',
    description: 'Для консультации используй EMC и статьи в КМС с пометкой "Магнит"'
  },
  EagleMobile: {
    id: '3bb5e212-dfb6-4c9d-8227-2c8c4913e609',
    message: 'Клиент Eagle Mobile',
    description: 'Для консультации используй EMC и статьи в КМС с пометкой Eagle'
  },
  ProstoMobile: {
    id: '0d689ec2-49fc-4662-8a9f-62183ae5eda4',
    message: 'Клиент Просто Mobile',
    description: 'Для консультации используй EMC и статьи в КМС с пометкой Просто'
  }
}

const addMarker = (message, description) => {
  return put({
    type: ADD_NOTIFICATION,
    payload: {
      message: message,
      description: description,
      type: 'warning',
      redirectType: NONE
    }
  })
}

export function * fetchParametersProcessingPaySaga ({ payload }) {
  try {
    const { data } = yield call(fetchParametersProcessing, payload)
    if (data.IsSuccess) {
      yield put({ type: PARAMETERS_PROCESSING_FETCH_SUCCESS, payload: { processingParameters: data.Data } })

      const serviceChannelId = data.Data?.ServiceChannel?.Id?.toLowerCase()

      if (serviceChannelId === serviceChannels.MagnitMobile.id) {
        const { message, description } = serviceChannels.MagnitMobile
        yield addMarker(message, description)
      } else if (serviceChannelId === serviceChannels.EagleMobile.id) {
        const { message, description } = serviceChannels.EagleMobile
        yield addMarker(message, description)
      } else if (serviceChannelId === serviceChannels.ProstoMobile.id) {
        const { message, description } = serviceChannels.ProstoMobile
        yield addMarker(message, description)
      }
    } else {
      yield put({ type: PARAMETERS_PROCESSING_FETCH_ERROR })
    }
  } catch (exception) {
    yield put({ type: PARAMETERS_PROCESSING_FETCH_FAILURE, message: exception.message })
  }
}
