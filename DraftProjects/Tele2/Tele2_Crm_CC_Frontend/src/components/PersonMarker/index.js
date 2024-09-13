import React from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'
import { bool, func, number, string } from 'prop-types'

import { getMarkerBorderColor, getMarkerColor } from './helpers/getMarkerColors'

const propTypes = { type: string, count: number, isBig: bool, name: string, onClick: func, showCount: bool }

export default function PersonMarker (props) {
  const { count, type, isBig, name, onClick, showCount } = props

  const message = showCount && count ? `${name} (${count})` : name

  return <StyledAlert message={message} type={type} isBig={isBig} onClick={onClick} />
}

PersonMarker.propTypes = propTypes

const StyledAlert = styled(Alert)`
  min-height: 24px;
  padding: ${props => (props.isBig ? '3px 8px' : '0 5px')};
  border: 1px solid;
  white-space: pre-wrap;
  border-radius: 20px;
  max-width: fit-content;
  border-color: ${props => getMarkerBorderColor(props.type)};
  background-color: ${props => getMarkerColor(props.type)};
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  .ant-alert-message {
    font-size: 12px;
    color: #fff;
  }
`
