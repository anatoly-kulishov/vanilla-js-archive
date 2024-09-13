import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingSpinner = ({ size = 24, ...nestedProps }) => {
  LoadingSpinner.propTypes = {
    size: PropTypes.number
  }

  return (
    <LoadingOutlinedStyled size={size} {...nestedProps} />
  )
}

export default LoadingSpinner

const LoadingOutlinedStyled = styled(LoadingOutlined)`
  font-size: ${props => props.size}px;
`
