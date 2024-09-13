import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'antd'
import styled from 'styled-components'

export default function LongValueWrapper ({ value, placement }) {
  LongValueWrapper.propTypes = {
    value: PropTypes.string,
    placement: PropTypes.string
  }

  LongValueWrapper.defaultProps = {
    placement: 'top'
  }

  return (
    <Tooltip placement={placement} title={value}>
      <Value>{value}</Value>
    </Tooltip>
  )
}

const Value = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
