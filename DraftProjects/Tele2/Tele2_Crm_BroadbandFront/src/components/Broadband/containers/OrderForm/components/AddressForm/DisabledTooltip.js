import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

export const TooltipText = 'Для изменения адреса, необходимо отменить действующий таймслот'

const DisabledTooltip = (props) => {
  const { children, text, disabled, defaultPosition } = props

  const className = defaultPosition ? 'broadband-form__address__tooltip-default' : 'broadband-form__address__tooltip'

  if (disabled) {
    return children
  }
  return (
    <Tooltip overlayClassName={className} title={text ?? TooltipText}>
      {children}
    </Tooltip>
  )
}

DisabledTooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  text: PropTypes.string,
  disabled: PropTypes.bool,
  defaultPosition: PropTypes.bool
}

export default DisabledTooltip
