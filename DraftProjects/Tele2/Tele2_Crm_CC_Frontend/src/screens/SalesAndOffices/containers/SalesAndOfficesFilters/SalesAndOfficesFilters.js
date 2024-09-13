/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { func, string, objectOf, shape } from 'prop-types'
import SmartGisPanel from 'containers/SmartGisPanel'
import { InputNumber } from 'antd'
import SmartGisSection from 'containers/SmartGisPanel/components/SmartGisSection'
import useDiagnostics from 'containers/SmartGisPanel/diagnosticsContext/useDiagnostics'
import { diagnosticsLocationSearchTypes } from 'containers/SmartGisPanel/diagnosticsContext/constants'
import styled from 'styled-components'

export default function SalesAndOfficesFilters (props) {
  const {
    fetchCoveragesAndOffices,
    fetchParameters,
    handlingId,
    parameters
  } = props

  const [salesAndOfficesData, setSalesAndOfficesData] = useState({})

  const onRefresh = (internalParams) => {
    const { locationSearchType } = watchers.flags
    const { latitude, longitude, address } = watchers.currentLocation
    const { deviation } = watchers.deviationInfo

    const hasLocationByNumber = locationSearchType === diagnosticsLocationSearchTypes.byPhoneNumber

    fetchCoveragesAndOffices({
      deviation,
      poiCount: salesAndOfficesData.officesCount,
      radius: +salesAndOfficesData.searchRadius,
      pstName: ['работает', 'закрыто', 'временно закрыто'],
      isPoi: true,
      lng: internalParams?.lng ?? longitude,
      lat: internalParams?.lat ?? latitude,
      address: internalParams?.address ?? address,
      IsGetByLBS: internalParams?.isGetByLBS ?? hasLocationByNumber,
      handlingId
    })
  }

  const { watchers } = useDiagnostics({ onRefresh })

  const currentOfficeExplorationRadius = parameters?.officeExplorationRadius ?? null
  const currentOfficeExplorationCount = parameters?.officeExplorationCount ?? null

  useLayoutEffect(() => {
    const paramNames = ['OfficeExplorationRadius', 'OfficeExplorationCount']
    fetchParameters({ paramNames })
  }, [])

  useEffect(() => {
    if (currentOfficeExplorationRadius && currentOfficeExplorationCount) {
      setSalesAndOfficesData({
        searchRadius: parameters.officeExplorationRadius,
        officesCount: parameters.officeExplorationCount
      })
    }
  }, [currentOfficeExplorationRadius, currentOfficeExplorationCount])

  return (
    <SmartGisPanel onSearch={onRefresh}>
      <SalesAndOfficesParameters>
        <SmartGisSection title='Радиус'>
          <InputNumber
            value={salesAndOfficesData.searchRadius}
            onChange={radius => setSalesAndOfficesData(value => ({ ...value, searchRadius: radius }))}
          />
        </SmartGisSection>
        <SmartGisSection title='Количество офисов'>
          <OfficesCountInput
            value={salesAndOfficesData.officesCount}
            onChange={count => setSalesAndOfficesData(value => ({ ...value, officesCount: count }))}
          />
        </SmartGisSection>
      </SalesAndOfficesParameters>
    </SmartGisPanel>
  )
}

SalesAndOfficesFilters.propTypes = {
  fetchCoveragesAndOffices: func.isRequired,
  fetchParameters: func.isRequired,
  handlingId: string,
  parameters: objectOf(
    shape({
      officeExplorationRadius: string,
      officeExplorationCount: string
    })
  )
}

const SalesAndOfficesParameters = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  > :not(:last-child) {
    margin-right: 20px;
  }
`

const OfficesCountInput = styled(InputNumber)`
  width: 140px;
`
