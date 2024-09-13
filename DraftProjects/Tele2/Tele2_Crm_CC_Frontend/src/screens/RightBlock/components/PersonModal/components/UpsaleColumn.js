import React, { useCallback } from 'react'
import { Col, Row, Skeleton } from 'antd'
import { func, object } from 'prop-types'
import styled from 'styled-components'

import SkeletonLoaderList from 'components/SkeletonLoaderList'
import UpsaleMarker from './UpsaleMarker'

import { markerTypes } from 'constants/markerTypes'
import { getRandomIntInRange } from 'utils/helpers'

const maxUpsaleMarkersCount = 3

const getSkeletonLoaderList = () => {
  const length = getRandomIntInRange(0, maxUpsaleMarkersCount)

  return (
    <Row align='middle' gutter={10} wrap={false}>
      <Col>{length > 0 ? <Skeleton.Avatar size='small' active /> : null}</Col>
      <Col>
        <SkeletonLoaderList
          length={length}
          getWidth={() => getRandomIntInRange(100, 200)}
          component={<Skeleton.Button active shape='round' size='small' />}
        />
      </Col>
    </Row>
  )
}

const propTypes = { record: object, onClickMarker: func }

const UpsaleColumn = props => {
  const { record, onClickMarker } = props
  const { Upsale, isLoading, Check } = record

  const handleClick = useCallback(() => {
    onClickMarker({ record, markerType: markerTypes.Upsale })
  }, [record, onClickMarker])

  if (isLoading) return getSkeletonLoaderList()

  if (!Upsale?.Value?.length) return null

  return (
    <Row align='middle' gutter={10} wrap={false}>
      <StyledCol>{Check ? <Skeleton.Avatar size='small' active /> : <MarkerButton onClick={handleClick} />}</StyledCol>
      <StyledCol>
        <Wrapper>
          {Upsale.Value.map((marker, index) => (
            <UpsaleMarker marker={marker} key={index} record={Upsale} />
          ))}
        </Wrapper>
      </StyledCol>
    </Row>
  )
}

UpsaleColumn.propTypes = propTypes

export default UpsaleColumn

const MarkerButton = styled.button`
  width: 20px;
  height: 20px;

  border-radius: 100%;
  border: 0;
  background-color: #44caff;
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.3);

  cursor: pointer;

  transition-duration: 0.3s;

  :hover {
    filter: brightness(1.1);
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.4);
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledCol = styled(Col)`
  display: flex;
`
