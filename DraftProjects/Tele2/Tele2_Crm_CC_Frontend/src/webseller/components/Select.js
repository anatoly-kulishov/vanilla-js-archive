import React from 'react'
import { Select } from 'antd'
import styled from 'styled-components'

const CustomSelect = props => {
  return <SelectStyled options={props?.options || []} {...props} />
}

const SelectStyled = styled(Select)`
  & .ant-select-selector {
    border-radius: 12px !important;
    height: auto !important;
    padding: 8px 16px !important;
    font-size: 14px !important;
  }
`

export default CustomSelect
