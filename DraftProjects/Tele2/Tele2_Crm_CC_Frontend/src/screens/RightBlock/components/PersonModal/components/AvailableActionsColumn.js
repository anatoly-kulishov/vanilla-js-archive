import React, { useCallback } from 'react'
import { Skeleton } from 'antd'
import { func, object } from 'prop-types'
import styled from 'styled-components'

import SkeletonLoaderList from 'components/SkeletonLoaderList'
import { markerTypesCount } from 'constants/markerTypes'
import { getRandomIntInRange } from 'utils/helpers'
import AvailableActionMarker from './AvailableActionMarker'

const getSkeletonLoaderList = () => {
  const length = getRandomIntInRange(0, markerTypesCount)
  const getWidth = useCallback(() => getRandomIntInRange(50, 100), [])
  return (
    <SkeletonLoaderList
      length={length}
      getWidth={getWidth}
      component={<Skeleton.Button active shape='round' size='small' />}
    />
  )
}

const propTypes = { record: object, onClickMarker: func }

const AvailableActionsColumn = props => {
  const { record, onClickMarker } = props
  const { Markers, isLoading } = record

  if (isLoading) return getSkeletonLoaderList()

  if (!Markers?.length) return null

  return (
    <Wrapper>
      {Markers?.map((marker, index) => (
        <AvailableActionMarker marker={marker} record={record} onClickMarker={onClickMarker} key={index} />
      ))}
    </Wrapper>
  )
}

AvailableActionsColumn.propTypes = propTypes

export default AvailableActionsColumn

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
