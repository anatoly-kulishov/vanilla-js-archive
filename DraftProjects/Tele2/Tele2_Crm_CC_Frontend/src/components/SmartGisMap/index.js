import React, { useRef, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { torusGeocoderConfig } from './constants'

import { Button, Input } from 'antd'

import './components/TorusGeocoder/torus-geocoder.css'
import { SearchOutlined, GlobalOutlined } from '@ant-design/icons'

export default function SmartGisMap (props) {
  const {
    initSmartGis,
    isSmartGisReady,
    mapHeight,
    onSearch,
    inputValue,
    isLoading,
    hideSearchButton,
    isSearchDisabled
  } = props

  const handleFocus = useCallback(() => {
    initSmartGis()
  }, [])

  const mapWrapper = useRef(null)

  useEffect(() => {
    if (!!mapWrapper && !!inputValue) {
      const inputElement = mapWrapper.current.getElementsByTagName('input')[0]
      inputElement.value = inputValue
    }
  }, [inputValue])

  useEffect(() => {
    const geocoderInput = document.querySelector('.geocoder-control-input')
    if (geocoderInput && isSmartGisReady) {
      geocoderInput.focus()
    }
  }, [isSmartGisReady])

  return (
    <Wrapper id={torusGeocoderConfig.wrapperId} mapHeight={mapHeight} ref={mapWrapper} hideSearchButton={hideSearchButton}>
      {!isSmartGisReady && <FakeInput onFocus={handleFocus} placeholder='Поиск по адресу' />}
      {!hideSearchButton && (
        <SearchButton disabled={isSearchDisabled} icon={<SearchOutlined />} type='primary' onClick={onSearch} loading={isLoading}>Найти</SearchButton>
      )}
      <SearchIcon />
    </Wrapper>
  )
}

SmartGisMap.propTypes = {
  initSmartGis: PropTypes.func,
  isSmartGisReady: PropTypes.bool,
  mapHeight: PropTypes.string,
  inputValue: PropTypes.string,
  onSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  hideSearchButton: PropTypes.bool,
  isSearchDisabled: PropTypes.bool
}

SmartGisMap.defaultProps = {
  mapHeight: '400px',
  inputValue: '',
  isLoading: false
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  font-family: 'T2_Rooftop_Regular';
  font-size: 14px;
  .geocoder-control {
    z-index: 1;
    height: 32px;
  }
  .geocoder-control-input {
    cursor: text;
  }
  .leaflet-control{
    width: 100%;
  }
  .leaflet-control-zoom {
    width: initial;
  }
  .leaflet-touch-drag {
    margin: 0 -16px;
    width: calc(100% + 32px);
    height: ${({ mapHeight }) => mapHeight};
  }
  .torus-geocoder-map {
    margin-top: 20px;
    z-index: 0;
  }
  input {
    box-shadow: none;
    border: 1px solid #d9d9d9;
    width: ${props => props.hideSearchButton ? '100%' : 'calc(100% - 80px)'};
    font-size: 14px;
    padding: 0 !important;
    padding-left: 30px !important;
    height: 32px !important;
  }
  .geocoder-control-suggestions {
    width: calc(100% - 80px);
  }
  .geocoder-control-input-ico {
    display: none;
  }
`

const inputAccessoriesStyles = css`
  position: absolute !important;
  z-index: 2;
`

const SearchButton = styled(Button)`
  ${inputAccessoriesStyles}
  right: 0;
`

const SearchIcon = styled(GlobalOutlined)`
  ${inputAccessoriesStyles}
  font-size: 14px;
  top: 8px;
  left: 10px;
  color: #7f8285;
`

const FakeInput = styled(Input)`
  padding-left: 32px;
  color: rgba(0, 0, 0, 0.85);

  &:hover {
    border: 1px solid rgb(217, 217, 217);
  }
`
