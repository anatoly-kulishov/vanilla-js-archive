import React from 'react'
import { array, bool, func, object } from 'prop-types'

import PersonBlockMarker from './PersonBlockMarker'

const propTypes = { markers: array, areMarkersClickable: bool, onClickMarker: func, record: object }

const PersonBlockMarkers = props => {
  const { markers, areMarkersClickable, onClickMarker, record } = props

  if (!markers?.length) return null

  return markers.map((marker, index) => (
    <PersonBlockMarker
      marker={marker}
      key={index}
      areMarkersClickable={areMarkersClickable}
      onClickMarker={onClickMarker}
      record={record}
    />
  ))
}

PersonBlockMarkers.propTypes = propTypes

export default PersonBlockMarkers
