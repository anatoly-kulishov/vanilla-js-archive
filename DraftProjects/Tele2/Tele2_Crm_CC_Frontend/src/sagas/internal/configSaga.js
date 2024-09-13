import { call } from 'redux-saga/effects'
import api from 'utils/api'

export function * fetchConfigurationsSaga () {
  const { fetchYandexMetrikaConfig } = api
  try {
    const { data } = yield call(fetchYandexMetrikaConfig)
    if (data.IsSuccess) {
      localStorage.setItem('YandexMetrikaConfig', JSON.stringify(data.Data))
    } else {
      localStorage.removeItem('YandexMetrikaConfig')
    }
  } catch (exception) {
    localStorage.removeItem('YandexMetrikaConfig')
  }
}
