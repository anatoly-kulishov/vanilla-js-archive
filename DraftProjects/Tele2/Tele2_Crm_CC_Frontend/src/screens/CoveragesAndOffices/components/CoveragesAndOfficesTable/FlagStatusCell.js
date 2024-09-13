import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function FlagStatusCell ({ color, children }) {
  FlagStatusCell.propTypes = {
    color: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
  }

  return (
    <div>
      <Indicator color={color} />
      {children}
    </div>
  )
}

const Indicator = styled.div`
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`
