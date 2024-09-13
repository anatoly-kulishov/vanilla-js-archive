/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import Cascader from '../../components/Cascader'

import SmartGisPanel from 'containers/SmartGisPanel'
import useDiagnostics from 'containers/SmartGisPanel/diagnosticsContext/useDiagnostics'

import { diagnosticsLocationSearchTypes } from 'containers/SmartGisPanel/diagnosticsContext/constants'
import CompoundDatePicker from 'components/СompoundDatePicker'
import SnackBar from 'components/SnackBar'
import SmartGisSection from 'containers/SmartGisPanel/components/SmartGisSection'
import useHslColors from 'hocs/useHlsColors'
import UnderlineButton from 'components/Buttons/UnderlineButton'

export default function CoverageFilters (props) {
  const {
    handlingId,
    technologiesGroups,

    fetchCoveragesAndOffices,
    fetchTechnologySubtechnologyLink
  } = props

  const [techAndDate, setTechAndDate] = useState({ date: { from: {}, to: {} }, tech: { technologies: {}, services: {} } })

  const onRefresh = (internalParams) => {
    const { date, tech } = techAndDate
    const { latitude, longitude, address } = watchers.currentLocation
    const { locationSearchType } = watchers.flags
    const { deviation } = watchers.deviationInfo

    const hasLocationByPhoneNumber = locationSearchType === diagnosticsLocationSearchTypes.byPhoneNumber

    fetchCoveragesAndOffices({
      ...tech,
      deviation,
      lng: internalParams?.lng ?? longitude,
      lat: internalParams?.lat ?? latitude,
      address: internalParams?.address ?? address,
      IsGetByLBS: internalParams?.isGetByLBS ?? hasLocationByPhoneNumber,
      radius: 250,
      handlingId,
      dateFrom: date.from,
      dateTo: date.to,
      isPw: true,
      isSpa: true,
      isCoverage: true,
      isCoveragePlan: true,
      isFaults: true,
      isLimits: true,
      isMp: true,
      coverageType: 'actual'
    })
  }

  const { watchers, toggleMap } = useDiagnostics({ onRefresh })

  useLayoutEffect(() => {
    fetchTechnologySubtechnologyLink()
  }, [])

  const color = useHslColors(watchers.deviationInfo.deviationLevel * 10, 120, 0, 80)
  return (
    <Wrapper>
      <SmartGisPanel
        onSearch={onRefresh}
        mapHeight={'320px'}
        additionalSections={
          <SmartGisSection isVisible={!!watchers.deviationInfo.deviation}>
            <StyledSnackBar color={color}>
              <SnackBarContent>
                <span>В координатах есть погрешность <span>{watchers.deviationInfo.deviation} метров</span></span>
                <UnderlineButton onClick={toggleMap}>Уточнить на карте</UnderlineButton>
              </SnackBarContent>
            </StyledSnackBar>
          </SmartGisSection>
        }
      >
        <CoverageParameters>
          <Cascader
            data={technologiesGroups}
            onChange={(technologies, services) => setTechAndDate(currentData => ({ ...currentData, tech: { technologies, services } }))}
            mainTextLabel='Стандарт связи'
            subTextLabel='Тип трафика'
          />
          <CoverageTime>
            <CompoundDatePicker
              onChange={(from, to) => setTechAndDate(currentData => ({ ...currentData, date: { from, to } }))}
              defaultTimeFromValue={moment().minute(0).subtract(1, 'hours')}
              defaultTimeToValue={moment().minute(59)}
            />
          </CoverageTime>
        </CoverageParameters>
      </SmartGisPanel>
    </Wrapper>
  )
}

CoverageFilters.propTypes = {
  technologiesGroups: PropTypes.object,
  fetchCoveragesAndOffices: PropTypes.func.isRequired,
  fetchTechnologySubtechnologyLink: PropTypes.func.isRequired,
  handlingId: PropTypes.number.isRequired
}

const Wrapper = styled.div`
  padding: 12px 16px;
  font-family: T2_Rooftop_Regular;
  background-color: white;
`

const CoverageParameters = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  > :not(:last-child) {
    margin-right: 20px;
  }
`

const CoverageTime = styled.div`
  display: flex;
  flex-flow: row wrap;
  > :first-child {
    margin-right: 20px;
  }
  > div {
    margin-bottom: 5px;
    margin-right: 5px;
  }
`

const StyledSnackBar = styled(SnackBar)`
  margin: 0 -20px;
`

const SnackBarContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  > :not(:last-child) {
    margin-right: 25px;
    > span {
      font-weight: bolder;
    }
  }
`
