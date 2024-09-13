import React, { useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import useDiagnostics from 'containers/SmartGisPanel/diagnosticsContext/useDiagnostics'
import { diagnosticsLocationSearchTypes } from 'containers/SmartGisPanel/diagnosticsContext/constants'
import SmartGisPanel from 'containers/SmartGisPanel'

import { HANDLE_CONTROL_UPDATE } from '../constants/ControlContextActions'
import { useControlContext } from '../ControlContext'
import { GEOPOSITION } from '../constants/ManagerControlTypes'

export default function Geoposition ({ item, technologiesGroups, fetchTechnologySubtechnologyLink }) {
  Geoposition.propTypes = {
    item: PropTypes.shape({
      Data: PropTypes.object,
      Name: PropTypes.string,
      IsRequired: PropTypes.bool
    }),
    technologiesGroups: PropTypes.arrayOf(PropTypes.object),
    fetchTechnologySubtechnologyLink: PropTypes.function
  }

  const { setInitialDiagnosticsValues, setSearchInputValueManually, watchers } = useDiagnostics()
  const { deviationInfo } = watchers

  const {
    state: { controls },
    dispatch: dispatchControlsAction
  } = useControlContext()

  useEffect(() => {
    updateGeoControlContext()
  }, [watchers.currentLocation.address])

  useLayoutEffect(() => {
    fetchTechnologySubtechnologyLink()
  }, [])

  const setGeoDefaultValues = data => {
    const { Latitude, Longitude, Address, Deviation } = data
    const { byInitialValue } = diagnosticsLocationSearchTypes

    setInitialDiagnosticsValues({
      currentLocation: {
        latitude: Latitude,
        longitude: Longitude,
        address: Address
      },
      flags: {
        locationSearchType: byInitialValue
      },
      deviationInfo: {
        deviation: Deviation
      }
    })
  }

  // Set default control value
  useEffect(() => {
    const { Data: data, Name: name, IsRequired: isRequired } = item
    if (name.toUpperCase() === GEOPOSITION) {
      const hasInitialGeoData = !!data.Latitude
      hasInitialGeoData && setGeoDefaultValues(data)
    }
    dispatchControlsAction({ type: HANDLE_CONTROL_UPDATE, payload: { name, params: { value: data, isRequired } } })
    setSearchInputValueManually(data.Address)
  }, [item])

  const updateGeoControlContext = () => {
    const { Name: name, IsRequired: isRequired } = item
    const { byPhoneNumber } = diagnosticsLocationSearchTypes
    const { latitude, longitude, address } = watchers.currentLocation
    const { locationSearchType } = watchers.flags
    const { deviation } = deviationInfo

    const hasLocationByPhoneNumber = locationSearchType === byPhoneNumber

    if (controls[name]) {
      const value = {
        ...controls[name].value,
        Latitude: latitude,
        Longitude: longitude,
        Address: address,
        Deviation: deviation,
        IsGetByLBS: hasLocationByPhoneNumber
      }
      dispatchControlsAction({ type: HANDLE_CONTROL_UPDATE, payload: { name: name, params: { value, isRequired } } })
    }
  }

  return <SmartGisPanel mapHeight={'200px'} hideSearchButton hideFilters />
}
