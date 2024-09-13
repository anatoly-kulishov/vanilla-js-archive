import { useContext, useEffect, useState } from 'react'

import { DiagnosticsContext } from './index'
import { initialDiagnosticsState, diagnosticsLocationSearchTypes } from './constants'
import { editCoordinatesFormat, listenToMultipleEvents } from 'utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAbonentCoordinates, fetchDeviationLevel } from 'reducers/diagnostics/diagnosticsReducer'
import { getDiagnosticsState } from 'selectors'

const useDiagnostics = extensions => {
  const [diagnosticsState, setDiagnosticsState, SmartGisController, initSmartGisController] = useContext(DiagnosticsContext)

  const [isSmartGisReady, setSmartGisReady] = useState(false)

  const initSmartGis = () => {
    setSmartGisReady(true)
    return initSmartGisController()
  }

  const watchers = {
    get flags () {
      return diagnosticsState.flags
    },
    get currentLocation () {
      const { latitude, longitude } = diagnosticsState.currentLocation
      const formattedCoordinates = latitude ? editCoordinatesFormat(latitude, longitude) : { latitude, longitude }

      return {
        ...diagnosticsState.currentLocation,
        ...formattedCoordinates
      }
    },
    get deviationInfo () {
      return diagnosticsState.deviationInfo
    },
    get salesAndOfficesParameters () {
      return diagnosticsState.salesAndOfficesParameters
    },
    get hasCoordinates () {
      return !!diagnosticsState.currentLocation.latitude
    },
    get searchInputValue () {
      return diagnosticsState.searchInputValue
    }
  }

  const dispatch = useDispatch()
  const { deviationData, abonentCoordinates } = useSelector(getDiagnosticsState)

  useEffect(() => {
    dispatch(fetchDeviationLevel({ deviation: diagnosticsState.deviationInfo.deviation }))
  }, [diagnosticsState.deviationInfo.deviation])

  useEffect(() => {
    updateDeviationParameters(deviationData)
  }, [deviationData.deviationLevel])

  useEffect(() => {
    if (abonentCoordinates.latitude) {
      updateDiagnosticsLocation(abonentCoordinates, { locationSearchType: diagnosticsLocationSearchTypes.byPhoneNumber })
    }
  }, [abonentCoordinates.latitude])

  const _handleReverseSearch = ({ Address, Deviation, LAT, LNG }) => {
    if (Address) {
      const newAddress = {
        latitude: LAT,
        longitude: LNG,
        address: Address
      }
      updateDeviationParameters({ deviation: Deviation })

      updateDiagnosticsLocation(newAddress, { locationSearchType: diagnosticsLocationSearchTypes.byInitialValue })
    }
  }

  const _handleSearch = ({ Address, LAT, LNG }) => {
    const newAddress = {
      latitude: LAT,
      longitude: LNG,
      address: Address
    }
    updateDiagnosticsLocation(newAddress, { locationSearchType: diagnosticsLocationSearchTypes.byInitialValue })
    updateDeviationParameters({
      deviation: 0,
      deviationLevel: 0
    })
  }

  const _mapSearchHandler = ({ type, ...rest }) => {
    switch (type) {
      case 'geocoder-reverse-results':
        _handleReverseSearch(rest)
        break
      case 'geocoder-result':
        _handleSearch(rest)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (isSmartGisReady) {
      listenToMultipleEvents(
        SmartGisController,
        ['geocoder-reverse-results', 'geocoder-result', 'geocoder-suggest', 'geocoder-reverse-results', 'geocoder-result-error'],
        _mapSearchHandler
      )
    }
  }, [isSmartGisReady])

  /**
   * Fetch abonent's coordinates by phone number (msisdn)
   * @param {string} msisdn - Abonent's phone number
   * @return {void}
  */
  const fetchAbonentCoordinatesByMsisdn = msisdn => {
    dispatch(fetchAbonentCoordinates({ msisdn }))
  }

  /**
   * Toggles visibilty of the map.
   * @return {void}
  */
  const toggleMap = () => {
    const SmartGisController = initSmartGis()
    SmartGisController.toggleMap()
  }
  /**
   * Toggles visibilty of the filters.
   * @return {void}
  */
  const setSearchInputValueManually = value => {
    if (value === null) return
    setDiagnosticsState(currentState => {
      currentState.searchInputValue = value
    })
  }

  /**
   * Updates currentLocation parameters.
   * Sets hasNewParameters to true.
   * @param {Object.<String>} newLocation - An object containing all of the location parameters.
   * @param {String} newLocation.latitude - Latitude parameter.
   * @param {String} newLocation.longitude - Longitude parameter.
   * @param {String} newLocation.address - Address parameter.
   * @param {Number} newLocation.deviation - Distance between requested point and actual location result.
   * @param {Object<any>} options - Additional info/events.
   * @param {String} options.locationSearchType - An interaction type that was used to get location information.
  */
  const updateDiagnosticsLocation = (newLocation, options = {}) => {
    const { latitude, longitude, address } = newLocation
    const { locationSearchType, hasNewParameters } = options

    setDiagnosticsState(currentState => {
      currentState.currentLocation.latitude = latitude
      currentState.currentLocation.longitude = longitude
      currentState.currentLocation.address = address
      if (locationSearchType) currentState.flags.locationSearchType = locationSearchType
      if (hasNewParameters) currentState.flags.hasNewParameters = hasNewParameters || false
    })
  }

  /**
   * Define if controls should highlight the change of the parameters.
   * Highlights search button.
   * @param {Boolean} hasNewParameters
  */
  const setDiagnosticsParametersAsNew = ({ hasNewParameters }) => {
    setDiagnosticsState(currentState => {
      currentState.flags.hasNewParameters = hasNewParameters
    })
  }
  /**
   * Deviation information.
   * @param {number} deviation
   * @param {number} deviationLevel
  */
  const updateDeviationParameters = ({ deviation, deviationLevel }) => {
    if (deviation === null && deviationLevel === null) return
    setDiagnosticsState(currentState => {
      if (deviation !== null) currentState.deviationInfo.deviation = deviation
      if (deviationLevel !== null) currentState.deviationInfo.deviationLevel = deviationLevel || currentState.deviationInfo.deviationLevel
    })
  }
  /**
   * Override initial diagnostics values if there're default once.
   * @param {Object} initialValues - Object contains flags and/or currentLocation to override default values.
   * @param {Object} initialValues.currentLocation - Default currentLocation.
   * @param {String} initialValues.currentLocation.latitude - Latitude parameter.
   * @param {String} initialValues.currentLocation.longitude - Longitude parameter.
   * @param {String} initialValues.currentLocation.address - Address parameter.
   * @param  {Object} initialValues.flags - New flags to override default once.
   * @param  {Boolean} initialValues.flags.hasNewParameters - Whether to highlight search button by default or not.
   * @param  {Object} initialValues.deviationInfo - Set initial deviation information.
   * @param  {Number} initialValues.deviationInfo.deviation - Deviation value.
   * @param  {Number} initialValues.deviationInfo.deviationLevel - Deviation grade.
  */
  const setInitialDiagnosticsValues = initialValues => {
    const { flags, currentLocation, deviationInfo } = initialValues
    setDiagnosticsState(currentState => {
      if (currentLocation) currentState.currentLocation = currentLocation
      if (flags) currentState.flags = flags
      if (deviationInfo) currentState.deviationInfo = deviationInfo
    })
  }

  const resetDiagnosticsState = () => {
    setDiagnosticsState(() => {
      return initialDiagnosticsState
    })
  }

  return {
    toggleMap,
    watchers,
    initSmartGis,
    isSmartGisReady,

    updateDiagnosticsLocation,
    setDiagnosticsParametersAsNew,
    setInitialDiagnosticsValues,
    resetDiagnosticsState,
    updateDeviationParameters,
    setSearchInputValueManually,
    fetchAbonentCoordinatesByMsisdn
  }
}

export default useDiagnostics
