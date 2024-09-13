import { camelCase, groupBy } from 'lodash'
import moment from 'moment'
import { all, call, put, select, take } from 'redux-saga/effects'

import { editCoordinatesFormat } from 'utils/helpers'
import { countdown } from 'utils/helpers/sagaHelper'
import { colorTypes } from 'utils/helpers/theme'

import { v4 as uuid } from 'uuid'

import api from 'utils/api'
import open from 'utils/helpers/windowOpener'

import {
  FETCH_ABONENT_COORDINATES_ERROR,
  FETCH_ABONENT_COORDINATES_FAILURE,
  FETCH_ABONENT_COORDINATES_SUCCESS,
  FETCH_COVERAGES_AND_OFFICES_ERROR,
  FETCH_COVERAGES_AND_OFFICES_FAILURE,
  FETCH_COVERAGES_AND_OFFICES_SUCCESS,
  FETCH_DEVIATION_LEVEL_ERROR,
  FETCH_DEVIATION_LEVEL_FAILURE,
  FETCH_DEVIATION_LEVEL_SUCCESS,
  FETCH_PARAMETERS_ERROR,
  FETCH_PARAMETERS_FAILURE,
  FETCH_PARAMETERS_SUCCESS,
  FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_ERROR,
  FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_FAILURE,
  FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_SUCCESS
} from 'reducers/diagnostics/diagnosticsReducer'

import { notification } from 'antd'
import {
  FETCH_LOCATION_HISTORY,
  FETCH_LOCATION_HISTORY_SUCCESS
} from 'reducers/reasonsCategories/reasonCategoryDiagnosticsReducer'
import { FETCH_INTERACTIONS } from 'reducers/reasonsRegisteringReducer'
import { getPersonalAccountState } from 'selectors'
import fromEnv from 'config/fromEnv'

export function * fetchCoveragesAndOfficesSaga ({ payload }) {
  try {
    const { fetchCoveragesAndOffices } = api
    const { dateFrom, dateTo, address, ...rest } = payload

    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchCoveragesAndOffices, {
      ...rest,
      address,
      ...(dateFrom && {
        DateFrom: moment(dateFrom).utc().format()
      }),
      ...(dateTo && {
        DateTo: moment(dateTo).utc().format()
      })
    })

    if (IsSuccess) {
      yield put({ type: FETCH_INTERACTIONS })

      const coverageData = {}
      for (const flag of Data.Flags) {
        const { Items, Name } = flag
        const name = camelCase(Name)
        for (const item of Items) {
          // Bring all UTC dates/time to one standart
          for (const key in item) {
            if (item[key] && item.hasOwnProperty(key) && (key.includes('Time') || key.includes('Date'))) {
              // WorkTime isn't a UTC date (don't need to format)
              if (key !== 'WorkTime') {
                item[key] = moment(item[key]).format('DD.MM.YYYY HH:mm')
              }
            }
          }
        }
        coverageData[name] = Items
      }

      const flags = Data.Flags.reduce((acc, cur, idx) => {
        const items = cur.Items.map(item => ({
          ...item,
          RelationType: cur.Name,
          key: uuid()
        }))
        return {
          ...acc,
          [camelCase(cur.Name)]: items
        }
      }, {})

      const flagCoverage = Object.values(flags?.flagCoverage ?? {}).map(item => ({
        flagName: item.FlagValue,
        flagValueComment: item.FlagValueComment,
        flagStatus: {
          indicator: colorTypes[item.Indicator],
          message: item.FlagDescription
        },
        addittionInfo: item.FlagComment
      }))

      yield put({ type: FETCH_COVERAGES_AND_OFFICES_SUCCESS, payload: { ...flags, flagCoverage } })
    } else {
      yield put({ type: FETCH_COVERAGES_AND_OFFICES_ERROR, payload: MessageText })
      notification.open({
        message: `Получение покрытий и офисов`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_COVERAGES_AND_OFFICES_FAILURE, payload: message })
    notification.open({
      message: `Получение покрытий и офисов`,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchAbonentCoordinatesSaga (payload) {
  const { Msisdn } = yield select(getPersonalAccountState)
  const { fetchAbonentCoordinates } = api
  try {
    const msisdn = payload.msisdn || Msisdn
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchAbonentCoordinates, { msisdn })

    if (IsSuccess) {
      const { Lat, Lng, Address, Deviation, DeviationLevel } = Data

      const { latitude, longitude } = editCoordinatesFormat(Lat, Lng)

      const deviationData = {
        deviation: Deviation,
        deviationLevel: DeviationLevel
      }
      const locationData = {
        latitude,
        longitude,
        address: Address
      }

      yield all([put({ type: FETCH_ABONENT_COORDINATES_SUCCESS, payload: { locationData, deviationData } })])
    } else {
      yield put({ type: FETCH_ABONENT_COORDINATES_ERROR, payload: MessageText })
      notification.open({
        message: `Получение координат абонента`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_ABONENT_COORDINATES_FAILURE, payload: message })
    notification.open({
      message: `Получение координат абонента`,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchTechnologySubtechnologyLinkSaga () {
  const { fetchTechnologySubtechnologyLink } = api

  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchTechnologySubtechnologyLink)

    if (IsSuccess) {
      const technologiesGroups = groupBy(Data, 'TechnologyCode')

      for (const key in technologiesGroups) {
        if (technologiesGroups.hasOwnProperty(key)) {
          const technologyGroup = technologiesGroups[key]
          const subtechnologiesGroup = technologyGroup.map(({ SubtechnologyCode }) => SubtechnologyCode)
          technologiesGroups[key] = subtechnologiesGroup
        }
      }

      yield put({ type: FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_SUCCESS, payload: technologiesGroups })
    } else {
      yield put({ type: FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_ERROR, payload: MessageText })
      notification.open({
        message: `Получение связи технология-подтехнологии`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_FAILURE, payload: message })
    notification.open({
      message: `Получение связи технология-подтехнологии`,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchParametersSaga ({ payload }) {
  const { fetchParameters } = api
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchParameters, payload)

    if (IsSuccess) {
      const parameters = {}
      for (const item of Data) {
        const { ParamName, Value } = item
        const name = camelCase(ParamName)
        parameters[name] = Value
      }

      yield put({ type: FETCH_PARAMETERS_SUCCESS, payload: parameters })
    } else {
      yield put({ type: FETCH_PARAMETERS_ERROR, payload: MessageText })
      notification.open({
        message: `Получение параметров фильтров`,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_PARAMETERS_FAILURE, payload: message })
    notification.open({
      message: `Получение параметров фильтров`,
      description: message,
      type: 'error'
    })
  }
}

export function * redirectToSmartGisSaga ({ payload }) {
  const messageTitle = 'Переход на карту SmartGIS'

  try {
    const redirectDuration = 3
    const smartGisBaseUrl = fromEnv('REACT_APP_SMART_GIS_REDIRECT_MAP')

    const smartGisDateFormat = 'YYYY:MM:DD HH:mm:ss'
    const currentDate = moment().format(smartGisDateFormat)
    const smartGisMapScale = 17
    let smartGisLink = ''

    if (payload) {
      const { latitude, longitude } = payload
      smartGisLink = `curdate=${currentDate}&center=${latitude},${longitude},${smartGisMapScale}`

      open(`${smartGisBaseUrl}/?${smartGisLink}`)
    } else {
      yield put({ type: FETCH_LOCATION_HISTORY })
      const { payload: coordinates } = yield take(FETCH_LOCATION_HISTORY_SUCCESS)

      if (coordinates.length) {
        const lastSeenLocation = coordinates[0]

        smartGisLink = `curdate=${currentDate}&center=${lastSeenLocation.Latitude},${lastSeenLocation.Longitude},${smartGisMapScale}`

        const countdownSaga = yield call(countdown, redirectDuration)

        const notificationProps = {
          key: 'redirect-notification',
          icon: redirectDuration,
          message: messageTitle,
          description: 'Переход будет осуществлен по последним найденым координатам из истории местоположений абонента',
          duration: redirectDuration
        }

        notification.warning({ ...notificationProps })

        try {
          while (true) {
            const seconds = yield take(countdownSaga)
            notification.warning({ ...notificationProps, icon: seconds })
          }
        } finally {
          open(`${smartGisBaseUrl}/?${smartGisLink}`)
        }
      } else {
        const countdownSaga = yield call(countdown, redirectDuration)

        const notificationProps = {
          key: 'redirect-notification',
          icon: redirectDuration,
          message: messageTitle,
          description: 'Координаты не определены. Будет осуществлен переход на стартовую страницу SmartGIS',
          duration: redirectDuration
        }

        notification.warning({ ...notificationProps })

        try {
          while (true) {
            const seconds = yield take(countdownSaga)
            notification.warning({ ...notificationProps, icon: seconds })
          }
        } finally {
          open(`${smartGisBaseUrl}/`)
        }
      }
    }
  } catch ({ message }) {
    notification.open({
      message: messageTitle,
      description: message,
      type: 'error'
    })
  }
}

export function * fetchDeviationLevelSaga ({ payload }) {
  const { fetchDeviationLevel } = api
  const errorMessage = 'Ошибка полученя уровня отклонения расстояния'

  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchDeviationLevel, payload)

    if (IsSuccess) {
      const deviationData = {
        deviation: payload.deviation,
        deviationLevel: Data
      }

      yield put({ type: FETCH_DEVIATION_LEVEL_SUCCESS, payload: deviationData })
    } else {
      yield put({ type: FETCH_DEVIATION_LEVEL_ERROR })
      notification.error({
        message: errorMessage,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_DEVIATION_LEVEL_FAILURE })
    notification.error({
      message: errorMessage,
      description: message
    })
  }
}
