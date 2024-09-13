import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip as Wrapper } from 'antd'

const Tooltip = ({ title, children }) => {
  Tooltip.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element
  }

  return (
    <Wrapper title={title}>
      { children }
    </Wrapper>
  )
}

export { Tooltip }
