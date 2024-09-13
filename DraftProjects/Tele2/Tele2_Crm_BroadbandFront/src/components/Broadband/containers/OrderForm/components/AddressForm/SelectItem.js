import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Form, Select } from 'antd'
import DisabledTooltip from './DisabledTooltip'

const { Item } = Form

const SelectItem = (props) => {
  const {
    className,
    itemName,
    label,
    gridColumn,
    dataTid,
    onSearch,
    disabled,
    options,
    keyInValue,
    tooltipDisabled,
    ...otherProps
  } = props

  const optionsItems = useMemo(() => options.map(option =>
    <Select.Option key={option.Key} value={keyInValue ? option.Key : option.Value}>{option.Value}</Select.Option>
  ), [options])

  return (
    <DisabledTooltip disabled={tooltipDisabled}>
      <StyledItem
        className={className}
        name={itemName}
        label={label}
        gridColumn={gridColumn}
        {...otherProps}
      >
        <Select
          data-tid={dataTid}
          allowClear
          showSearch
          onSearch={onSearch}
          notFoundContent={null}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          labelInValue
          disabled={disabled}
        >
          {optionsItems}
        </Select>
      </StyledItem>
    </DisabledTooltip>)
}

SelectItem.propTypes = {
  className: PropTypes.string,
  itemName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  gridColumn: PropTypes.string,
  dataTid: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ Key: PropTypes.string, Value: PropTypes.string })).isRequired,
  tooltipDisabled: PropTypes.bool,
  keyInValue: PropTypes.bool
}

export default SelectItem

const StyledItem = styled(Item)`
  grid-column: ${props => props.gridColumn}
`
