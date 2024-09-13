import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import useDiagnostics from 'containers/SmartGisPanel/diagnosticsContext/useDiagnostics'
import SmartGisPanel from 'containers/SmartGisPanel'
import SmartGisSection from 'containers/SmartGisPanel/components/SmartGisSection'

import { InputNumber } from 'antd'
import { diagnosticsLocationSearchTypes } from 'containers/SmartGisPanel/diagnosticsContext/constants'

const formatter = value => `${value} м`

export default function SalesOfficesFilters ({
  fetchCoveragesAndOffices,
  fetchParameters,

  handlingId,
  parameters,

  isParametersLoading
}) {
  SalesOfficesFilters.propTypes = {
    fetchCoveragesAndOffices: PropTypes.func.isRequired,
    fetchParameters: PropTypes.func.isRequired,

    handlingId: PropTypes.string.isRequired,
    parameters: PropTypes.object,

    isParametersLoading: PropTypes.bool
  }

  const { setDiagnosticsParametersAsNew, watchers } = useDiagnostics()

  const [officesCount, setOfficesCount] = useState(null)
  const [searchRadius, setSearchRadius] = useState(null)

  useEffect(() => {
    setDiagnosticsParametersAsNew({ hasNewParameters: true })
  }, [officesCount, searchRadius, watchers.currentLocation.address])

  useEffect(() => {
    const paramNames = ['OfficeExplorationRadius', 'OfficeExplorationCount']
    fetchParameters({ paramNames })
  }, [])

  useEffect(() => {
    if (parameters) {
      const { officeExplorationRadius, officeExplorationCount } = parameters
      setSearchRadius(officeExplorationRadius)
      setOfficesCount(officeExplorationCount)
    }
  }, [parameters])

  const onRefresh = () => {
    const { locationSearchType } = watchers.flags
    const { latitude, longitude, address } = watchers.currentLocation
    const { deviation } = watchers.deviationInfo

    const hasLocationByNumber = locationSearchType === diagnosticsLocationSearchTypes.byPhoneNumber

    fetchCoveragesAndOffices({
      deviation,
      poiCount: officesCount,
      radius: searchRadius,
      pstName: ['работает', 'закрыто', 'временно закрыто'],
      isPoi: true,
      lat: latitude,
      lng: longitude,
      address,
      IsGetByLBS: hasLocationByNumber,
      handlingId
    })
  }

  return (
    <Wrapper>
      <SmartGisPanel onSearch={onRefresh} mapHeight={'320px'}>
        <SmartGisSection title='Радиус' isLoading={isParametersLoading}>
          <InputCount value={searchRadius} formatter={formatter} onChange={setSearchRadius} />
        </SmartGisSection>

        <SmartGisSection title='Количество офисов' isLoading={isParametersLoading}>
          <InputCount value={officesCount} onChange={setOfficesCount} />
        </SmartGisSection>
      </SmartGisPanel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  padding-top: 0;
  font-family: T2_Rooftop_Regular;
  background-color: white;
`

const InputCount = styled(InputNumber)`
  width: 150px;
  margin-right: 10px;
  margin-bottom: 5px;
`
