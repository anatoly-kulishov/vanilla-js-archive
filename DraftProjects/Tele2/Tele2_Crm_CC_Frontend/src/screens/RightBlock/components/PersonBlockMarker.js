import React, { useMemo } from 'react'
import { Skeleton } from 'antd'
import { bool, func, object } from 'prop-types'

import PersonMarker from 'components/PersonMarker'
import SkeletonLoader from 'components/SkeletonLoader'

import { markerTypes } from 'constants/markerTypes'
import { getRandomIntInRange } from 'utils/helpers'

const { Button: SkeletonButton } = Skeleton

const propTypes = { marker: object, areMarkersClickable: bool, onClickMarker: func, record: object }

const PersonBlockMarker = props => {
  const { marker, areMarkersClickable, onClickMarker, record } = props
  const { ScenarioCode, Check, Value } = marker

  const width = useMemo(() => getRandomIntInRange(50, 100), [])

  const isCLSUpgrade = ScenarioCode === markerTypes.CLSUpgrade
  const handleClick =
    areMarkersClickable && isCLSUpgrade ? () => onClickMarker({ record, marker, markerType: ScenarioCode }) : undefined

  if (!Check) {
    return <SkeletonLoader width={width} component={<SkeletonButton active shape='round' size='small' />} />
  }

  return Value ? (
    <PersonMarker
      type={ScenarioCode}
      name={ScenarioCode}
      count={Value}
      showCount={!isCLSUpgrade}
      onClick={handleClick}
    />
  ) : null
}

PersonBlockMarker.propTypes = propTypes

export default PersonBlockMarker
