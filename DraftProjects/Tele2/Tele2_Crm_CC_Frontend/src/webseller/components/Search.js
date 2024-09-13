import React from 'react'
import { AutoComplete } from 'antd'
import styled from 'styled-components'

const SearchInput = ({ isCustomInput = false, ...props }) => {
  return (
    <AutoCompleteStyled
      showSearch
      isCustomInput={isCustomInput}
      filterOption={false}
      notFoundContent={null}
      defaultActiveFirstOption={false}
      options={props?.options || []}
      {...props}
    />
  )
}

const AutoCompleteStyled = styled(AutoComplete)`
  & .ant-select-selection-search {
    display: flex;
    align-items: center;

    & input {
      height: auto !important;
      width: 100% !important;
      line-height: normal !important;
      text-align: center !important;
    }
  }

  & .ant-select-selector {
    border-radius: 12px !important;
    height: auto !important;
    ${({ isCustomInput }) => !isCustomInput ? 'padding: 5.5px 16px !important;' : ''} 
    font-size: 14px !important;
  }
`

export default SearchInput
