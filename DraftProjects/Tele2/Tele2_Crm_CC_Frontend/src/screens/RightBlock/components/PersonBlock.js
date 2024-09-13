import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import { bool, func, number, object } from 'prop-types'

import LoadingSpinner from 'components/LoadingSpinner'
import PersonBlockMarkers from './PersonBlockMarkers'

const defaultProps = { clickable: false, areMarkersClickable: false }

const propTypes = {
  isVisiblePersonModal: bool,
  handleVisiblePersonModal: func,
  clickable: bool,
  onClickMarker: func,
  record: object,
  customersCount: number,
  areMarkersClickable: bool,
  isLoading: bool
}

const PersonBlock = props => {
  const {
    isVisiblePersonModal,
    handleVisiblePersonModal,
    clickable,
    onClickMarker,
    record,
    customersCount,
    areMarkersClickable,
    isLoading
  } = props

  const { Markers } = record ?? {}

  const handleVisibleModal = useCallback(() => {
    if (!isVisiblePersonModal && clickable) {
      handleVisiblePersonModal?.()
    }
  }, [isVisiblePersonModal, clickable])

  const subheaderText = `Персона ${typeof customersCount === 'number' ? `(${customersCount})` : ''}`

  return (
    <Wrapper clickable={clickable} onClick={handleVisibleModal}>
      <Subheader>{subheaderText}</Subheader>
      {isLoading ? (
        <Spin indicator={<LoadingSpinner spin />} />
      ) : (
        <PersonBlockMarkers
          markers={Markers}
          areMarkersClickable={areMarkersClickable}
          onClickMarker={onClickMarker}
          record={record}
        />
      )}
    </Wrapper>
  )
}

PersonBlock.defaultProps = defaultProps
PersonBlock.propTypes = propTypes

export default PersonBlock

const Wrapper = styled.div`
  margin-top: 5px;
  padding: 10px 20px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  cursor: ${props => props.clickable && 'pointer'};
`
const Subheader = styled.div`
  margin-right: 5px;

  font-weight: 600;
`
