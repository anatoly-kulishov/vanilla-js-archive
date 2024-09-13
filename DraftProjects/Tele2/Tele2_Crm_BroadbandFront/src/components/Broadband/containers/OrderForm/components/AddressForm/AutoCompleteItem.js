import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Form, AutoComplete } from 'antd'
import DisabledTooltip from './DisabledTooltip'

const { Item } = Form

const AutoCompleteItem = props => {
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
    onSelect,
    ...otherProps
  } = props

  const handleSelect = useCallback(
    value => {
      onSelect?.(itemName, value)
    },
    [itemName]
  )

  const optionsItems = useMemo(
    () =>
      options.map(option => (
        <AutoComplete.Option key={option.Key} value={keyInValue ? option.Key : option.Value}>
          {option.Value}
        </AutoComplete.Option>
      )),
    [options]
  )

  return (
    <DisabledTooltip disabled={tooltipDisabled}>
      <StyledItem className={className} name={itemName} label={label} gridColumn={gridColumn} {...otherProps}>
        <AutoComplete
          onChange={null}
          data-tid={dataTid}
          allowClear
          showSearch
          onSelect={handleSelect}
          onSearch={onSearch}
          notFoundContent={null}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          labelInValue
          disabled={disabled}
        >
          {optionsItems}
        </AutoComplete>
      </StyledItem>
    </DisabledTooltip>
  )
}

AutoCompleteItem.propTypes = {
  className: PropTypes.string,
  itemName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  gridColumn: PropTypes.string,
  dataTid: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ Key: PropTypes.string, Value: PropTypes.string })).isRequired,
  tooltipDisabled: PropTypes.bool,
  keyInValue: PropTypes.bool,
  onSelect: PropTypes.func
}

export default AutoCompleteItem

const StyledItem = styled(Item)`
  width: 100%;

  grid-column: ${props => props.gridColumn};
`
