import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Form, Input } from 'antd'
import DisabledTooltip from './DisabledTooltip'

const { Item } = Form

function InputItem (props) {
  const {
    className,
    itemName,
    label,
    gridColumn,
    dataTid,
    disabled,
    tooltipDisabled,
    ...otherProps
  } = props

  const innerContent = (
    <StyledItem className={className} gridColumn={gridColumn} name={itemName} label={label} {...otherProps}>
      <Input data-tid={dataTid} disabled={disabled} />
    </StyledItem>
  )

  return <DisabledTooltip disabled={tooltipDisabled} >{innerContent}</DisabledTooltip>
}

InputItem.propTypes = {
  className: PropTypes.string,
  itemName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  gridColumn: PropTypes.string,
  dataTid: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipDisabled: PropTypes.bool
}

export default InputItem

const StyledItem = styled(Item)`
  grid-column: ${props => props.gridColumn}
`
