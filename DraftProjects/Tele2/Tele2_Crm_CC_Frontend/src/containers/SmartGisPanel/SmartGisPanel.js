/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useRef, useEffect, Fragment, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes, { instanceOf, oneOfType, arrayOf, bool, func } from 'prop-types'

import SmartGisSection from './components/SmartGisSection'

import { CopyOutlined, PhoneOutlined, InfoCircleOutlined, CompassOutlined, AimOutlined } from '@ant-design/icons'

import useDiagnostics from './diagnosticsContext/useDiagnostics'
import UnderlineButton from 'components/Buttons/UnderlineButton'
import SmartGisMap from 'components/SmartGisMap'
import ExpandableList from 'components/ExpandableList'
import { copyElementTextToClipboard } from 'utils/helpers'
import { diagnosticsLocationSearchTypes } from './diagnosticsContext/constants'

export default function SmartGisPanel (props) {
  const {
    children,
    additionalSections,

    onSearch,

    hideSearchButton,
    hideFilters,

    locationHistory,
    isLocationHistoryLoading,
    fetchLocationHistory,

    abonentCoordinates,
    isAbonentCoordinatesLoading,

    isCoveragesAndOfficesLoading,

    redirectToSmartGis,
    shouldResetDataOnUnmout = false
  } = props

  const [isFiltersExpanded, setFiltersExpanded] = useState(false)
  const [isMapExpanded, setMapExpanded] = useState(false)

  useEffect(() => {
    const shouldSearch = onSearch && abonentCoordinates.latitude

    const { latitude, longitude, address } = abonentCoordinates
    setSearchInputValueManually(address)
    if (shouldSearch) {
      onSearch({ lat: latitude, lng: longitude, address, isGetByLBS: true })
    }
  }, [abonentCoordinates])

  const coordinatesRef = useRef(null)

  const {
    watchers,
    initSmartGis,
    isSmartGisReady,
    updateDiagnosticsLocation,
    resetDiagnosticsState,
    setDiagnosticsParametersAsNew,
    fetchAbonentCoordinatesByMsisdn,
    toggleMap,
    setSearchInputValueManually
  } = useDiagnostics()

  const { latitude, longitude } = watchers.currentLocation

  useEffect(() => {
    fetchLocationHistory()
  }, [])

  useEffect(() => {
    if (shouldResetDataOnUnmout) {
      return () => {
        resetDiagnosticsState()
      }
    }
  }, [coordinatesRef])

  const handleSearch = () => {
    if (onSearch) {
      onSearch()
      setDiagnosticsParametersAsNew({ hasNewParameters: false })
    }
  }

  const handleFilters = useCallback(() => {
    setFiltersExpanded(value => !value)
  }, [])

  const handleMap = useCallback(() => {
    toggleMap()
    setMapExpanded(value => !value)
  }, [])

  const searchActions = [
    <UnderlineButton key='SmartGIS' onClick={() => redirectToSmartGis(latitude ? { latitude, longitude } : null)} icon={<AimOutlined />}>SmartGIS</UnderlineButton>,
    <UnderlineButton key='Найти на карте' onClick={handleMap} icon={<CompassOutlined />} isActive={isMapExpanded}>Найти на карте</UnderlineButton>,
    !hideFilters && <UnderlineButton key='Уточнить поиск' onClick={handleFilters} icon={<InfoCircleOutlined />} isActive={isFiltersExpanded}>Уточнить поиск</UnderlineButton>,
    <UnderlineButton
      key='Найти по номеру'
      icon={<PhoneOutlined />}
      loading={isAbonentCoordinatesLoading}
      onClick={fetchAbonentCoordinatesByMsisdn}
    >
      Найти по номеру
    </UnderlineButton>
  ]

  const locationHistoryList = locationHistory?.map(location => ({
    labelText: location.address,
    value: location.coordinates
  }))

  const chooseLocationHistory = ({ labelText, value }) => {
    setSearchInputValueManually(labelText)
    updateDiagnosticsLocation({
      latitude: value.latitude,
      longitude: value.longitude,
      address: labelText
    }, { locationSearchType: diagnosticsLocationSearchTypes.byLocationHistory })
  }

  const isSearchDisabled = useMemo(() => {
    return !watchers.hasCoordinates
  }, [watchers.hasCoordinates])

  return (
    <div>
      <SmartGisSection title='Адрес Диагностики' actions={searchActions}>
        <SmartGisMap
          initSmartGis={initSmartGis}
          isSmartGisReady={isSmartGisReady}
          hideSearchButton={hideSearchButton}
          isSearchDisabled={isSearchDisabled}
          isLoading={isCoveragesAndOfficesLoading}
          onSearch={handleSearch}
          inputValue={watchers.searchInputValue}
        />
      </SmartGisSection>
      {additionalSections}
      <SmartGisSection hidden={!isFiltersExpanded}>{children}</SmartGisSection>
      <PanelFooter>
        <SmartGisSection title='Последние запросы' isLoading={isLocationHistoryLoading}>
          <ExpandableList items={locationHistoryList} onItemClick={chooseLocationHistory} />
        </SmartGisSection>
        <SmartGisSection title='Координаты'>
          <CoordinatesField
            onClick={event =>
              watchers.hasCoordinates
                ? copyElementTextToClipboard(event.currentTarget, 'Координаты скопированы в буфер обмена')
                : null
            }
          >
            {watchers.hasCoordinates ? (
              <Fragment>
                <Fragment>
                  {watchers.currentLocation.latitude}, {watchers.currentLocation.longitude}
                </Fragment>
                <ClipboardIcon />
              </Fragment>
            ) : (
              'Пусто'
            )}
          </CoordinatesField>
        </SmartGisSection>
      </PanelFooter>
    </div>
  )
}

SmartGisPanel.propTypes = {
  children: PropTypes.element,

  additionalSections: oneOfType([instanceOf(SmartGisSection), arrayOf(instanceOf(SmartGisSection))]),

  onSearch: func,
  hideSearchButton: bool,
  hideFilters: bool,

  locationHistory: PropTypes.array,
  fetchLocationHistory: func.isRequired,
  isLocationHistoryLoading: bool,

  abonentCoordinates: PropTypes.object,
  isAbonentCoordinatesLoading: bool,

  isCoveragesAndOfficesLoading: bool,

  redirectToSmartGis: func.isRequired,
  shouldResetDataOnUnmout: bool
}

const PanelFooter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  section:first-child {
    max-width: 60%;
  }
  > :last-child {
    padding: 0 54px;
  }
  section {
    margin-bottom: 0;
  }
  border-radius: 10px;
`

const CoordinatesField = styled.p`
  display: flex;
  align-items: baseline;
  white-space: nowrap;
  margin-bottom: 0;
  min-width: 150px;
  line-height: 2.3;
  color: #7f8285;
  cursor: pointer;
`

const ClipboardIcon = styled(CopyOutlined)`
  margin-left: 4px;
  color: #7f8285;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${CoordinatesField}:hover & {
    color: #44caff;
  }
`
